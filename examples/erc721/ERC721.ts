import { Account, Bool, msg, ScaleString, SpreadStorableArray, SpreadStorableMap, u128, UInt128 } from "ask-lang";

@storage
class ERC721Storage {
  // Mapping from holder address to their (enumerable) set of owned tokens
  _holderTokens: SpreadStorableMap<Account, SpreadStorableArray<UInt128>>;
  // Enumerable mapping from token ids to their owners
  _tokenOwners: SpreadStorableMap<UInt128, Account>;
  // Mapping from token ID to approved address
  _tokenApprovals: SpreadStorableMap<UInt128, Account>;
  // Mapping from owner to operator approvals
  _operatorApprovals: SpreadStorableMap<Account, SpreadStorableMap<Account, Bool>>;
  // Token name
  _name: string;
  // Token symbol
  _symbol: string;
  // Optional mapping for token URIs
  _tokenURIs: SpreadStorableMap<UInt128, ScaleString>;
  // Base URI
  _baseURI: string;
}

/**
  * @dev Emitted when `tokenId` token is transferred from `from` to `to`.
  */
@event class Transfer {
  @topic from: Account = Account.Null;
  @topic to: Account = Account.Null;
  @topic tokenId: u128 = u128.Zero;

  constructor(from: Account, to: Account, tokenId: u128) {
    this.from = from;
    this.to = to;
    this.tokenId = tokenId;
  }
};

/**
 * @dev Emitted when `owner` enables `approved` to manage the `tokenId` token.
 */
@event class Approval {
  @topic owner: Account;
  @topic approved: Account;
  @topic tokenId: u128;

  constructor(owner: Account, approved: Account, tokenId: u128) {
    this.owner = owner;
    this.approved = approved;
    this.tokenId = tokenId;
  }
}

/**
 * @dev Emitted when `owner` enables or disables (`approved`) `operator` to manage all of its assets.
 */
@event class ApprovalForAll {
  @topic owner: Account;
  @topic operator: Account;

  approved: bool;

  constructor(owner: Account, operator: Account, approved: bool) {
    this.owner = owner;
    this.operator = operator;
    this.approved = approved;
  }
}

@contract
export class ERC721 {
  storage: ERC721Storage;

  constructor() {
    this.storage = new ERC721Storage();
  }

  private _exists(tokenId: u128): bool {
    let id = new UInt128(tokenId);
    return this.storage._tokenOwners.has(id);
  }

  @constructor
  default(name: string = "", symbol: string = ""): void {
    this.storage._name = name;
    this.storage._symbol = symbol;
  }

  @message(mutates = false)
  balanceOf(owner: Account): i32 {
    assert(owner.notEq(Account.Null), "ERC721: balance query for the zero address");

    return this.storage._holderTokens.get(owner).length;
  }

  /**
   * @dev See {IERC721-ownerOf}.
   */
  @message(mutates = false)
  ownerOf(tokenId: u128): Account {
    assert(this._exists(tokenId), "ERC721: owner query for nonexistent token")
    return this.storage._tokenOwners.get(new UInt128(tokenId));
  }

  /**
   * @dev See {IERC721Metadata-name}.
   */
  @message(mutates = false)
  name(): string {
    return this.storage._name;
  }

  /**
   * @dev See {IERC721Metadata-symbol}.
   */
  @message(mutates = false)
  symbol(): string {
    return this.storage._symbol;
  }

  /**
   * @dev See {IERC721Metadata-tokenURI}.
   */
  @message(mutates = false)
  tokenURI(tokenId: u128): string {
    assert(this._exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

    let id = new UInt128(tokenId);
    let tokenURI = this.storage._tokenURIs.get(id).toString();

    // If there is no base URI, return the token URI.
    if (this.storage._baseURI.length == 0) return tokenURI;
    // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
    if (tokenURI.length > 0) return this.storage._baseURI + tokenURI;
    // If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
    return this.storage._baseURI + id.toString();
  }

  /**
  * @dev Returns the base URI set via {_setBaseURI}. This will be
  * automatically added as a prefix in {tokenURI} to each token's URI, or
  * to the token ID if no specific URI is set for that token ID.
  */
  @message(mutates = false)
  baseURI(): string {
    return this.storage._baseURI;
  }

  /**
   * @dev See {IERC721Enumerable-tokenOfOwnerByIndex}.
   */
  @message(mutates = false)
  tokenOfOwnerByIndex(owner: Account, index: i32): u128 {
    return this.storage._holderTokens.get(owner).at(index).unwrap();
  }

  /**
   * @dev See {IERC721Enumerable-totalSupply}.
   */
  @message(mutates = false)
  totalSupply(): i32 {
    // _tokenOwners are indexed by tokenIds, so .length() returns the number of tokenIds
    return this.storage._tokenOwners.keys().length;
  }

  /**
   * @dev See {IERC721Enumerable-tokenByIndex}.
   */
  @message(mutates = false)
  tokenByIndex(index: i32): u128 {
    return this.storage._tokenOwners.keys().at(index).unwrap();
  }
  /**
     * @dev See {IERC721-approve}.
     */
  @message
  approve(to: Account, tokenId: u128): void {
    let owner = this.ownerOf(tokenId);
    assert(to.notEq(owner), "ERC721: approval to current owner");

    assert(msg.sender.eq(owner) || this.isApprovedForAll(owner, msg.sender),
      "ERC721: approve caller is not owner nor approved for all"
    );

    this._approve(to, tokenId);
  }

  /**
   * @dev See {IERC721-getApproved}.
   */
  @message(mutates = false)
  getApproved(tokenId: u128): Account {
    assert(this._exists(tokenId), "ERC721: approved query for nonexistent token");

    return this.storage._tokenApprovals.get(new UInt128(tokenId));
  }

  /**
   * @dev See {IERC721-setApprovalForAll}.
   */
  private _getOperatorApprovals(operator: Account): SpreadStorableMap<Account, Bool> {
    let approvals = this.storage._operatorApprovals.get(operator);
    if (approvals.entryKey == "") {
      let key = this.storage._operatorApprovals.entryKey + operator.toString();
      approvals = new SpreadStorableMap<Account, Bool>(key);
      this.storage._operatorApprovals.set(operator, approvals);
    }
    return approvals;
  }

  @message setApprovalForAll(operator: Account, approved: bool): void {
    assert(operator.notEq(msg.sender), "ERC721: approve to caller");

    let approvals = this._getOperatorApprovals(msg.sender);
    approvals.set(operator, new Bool(approved));
    (new ApprovalForAll(msg.sender, operator, approved));
  }

  /**
   * @dev See {IERC721-isApprovedForAll}.
   */
  @message(mutates = false)
  isApprovedForAll(owner: Account, operator: Account): bool {
    return this.storage._operatorApprovals.get(owner).get(operator).unwrap();
  }

  /**
   * @dev See {IERC721-transferFrom}.
   */
  @message
  transferFrom(from: Account, to: Account, tokenId: u128): void {
    //solhint-disable-next-line max-line-length
    let isApproved = this._isApprovedOrOwner(msg.sender, tokenId);
    assert(isApproved, "ERC721: transfer caller is not owner nor approved");

    this._transfer(from, to, tokenId);
  }

  /**
   * @dev See {IERC721-safeTransferFrom}.
   */
  @message
  safeTransferFrom(from: Account, to: Account, tokenId: u128, _data: string): void {
    let isApproved = this._isApprovedOrOwner(msg.sender, tokenId);
    assert(isApproved, "ERC721: transfer caller is not owner nor approved");
    this._safeTransfer(from, to, tokenId, _data);
  }

  protected _safeTransfer(from: Account, to: Account, tokenId: u128, _data: string): void {
    this._transfer(from, to, tokenId);
  }
  /**
   * @dev Returns whether `spender` is allowed to manage `tokenId`.
   *
   * Requirements:
   *
   * - `tokenId` must exist.
   */
  protected _isApprovedOrOwner(spender: Account, tokenId: u128): bool {
    assert(this._exists(tokenId), "ERC721: operator query for nonexistent token");
    let owner = this.ownerOf(tokenId);
    return (spender.eq(owner) || this.getApproved(tokenId).eq(spender) || this.isApprovedForAll(owner, spender));
  }

  /**
   * @dev Safely mints `tokenId` and transfers it to `to`.
   *
   * Requirements:
   d*
   * - `tokenId` must not exist.
   * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
   *
   * Emits a {Transfer} event.
   */
  protected _safeMint(to: Account, tokenId: u128, data: string): void {
    this._mint(to, tokenId);
    // require(_checkOnERC721Received(address(0), to, tokenId, _data), "ERC721: transfer to non ERC721Receiver implementer");
  }

  /**
   * @dev Mints `tokenId` and transfers it to `to`.
   *
   * WARNING: Usage of this method is discouraged, use {_safeMint} whenever possible
   *
   * Requirements:
   *
   * - `tokenId` must not exist.
   * - `to` cannot be the zero address.
   *
   * Emits a {Transfer} event.
   */
  protected _mint(to: Account, tokenId: u128): void {
    assert(to.notEq(Account.Null), "ERC721: mint to the zero address");
    assert(!this._exists(tokenId), "ERC721: token already minted");

    this._getHolderTokens(to).push(new UInt128(tokenId));
    this.storage._tokenOwners.set(new UInt128(tokenId), to);

    (new Transfer(Account.Null, to, tokenId));
  }

  /**
   * @dev Destroys `tokenId`.
   * The approval is cleared when the token is burned.
   *
   * Requirements:
   *
   * - `tokenId` must exist.
   *
   * Emits a {Transfer} event.
   */
  protected _burn(tokenId: u128): void {
    let owner = this.ownerOf(tokenId);

    // Clear approvals
    this._approve(Account.Null, tokenId);

    // Clear metadata (if any)
    let tid = new UInt128(tokenId);
    let uri = this.storage._tokenURIs.get(tid).toString();
    if (uri.length != 0) {
      this.storage._tokenURIs.delete(tid);
    }

    let tokensOfOwner = this._getHolderTokens(owner);
    for (let i = 0; i < tokensOfOwner.length; i++) {
      if (tokensOfOwner[i].eq(tid)) {
        tokensOfOwner.delete(i);
        break;
      }
    }

    this.storage._tokenOwners.delete(tid);

    (new Transfer(owner, Account.Null, tokenId));
  }


  /**
   * @dev Transfers `tokenId` from `from` to `to`.
   *  As opposed to {transferFrom}, this imposes no restrictions on msg.sender.
   *
   * Requirements:
   *
   * - `to` cannot be the zero address.
   * - `tokenId` token must be owned by `from`.
   *
   * Emits a {Transfer} event.
   */
  private _getHolderTokens(to: Account): SpreadStorableArray<UInt128> {
    let list = this.storage._holderTokens.get(to);
    if (list.entryKey == "") {
      let key = this.storage._holderTokens.entryKey + to.toString();
      list = new SpreadStorableArray<UInt128>(key);
      this.storage._holderTokens.set(to, list);
    }
    return list;
  }

  protected _transfer(from: Account, to: Account, tokenId: u128): void {
    assert(this.ownerOf(tokenId).eq(from), "ERC721: transfer of token that is not own");
    assert(to.notEq(Account.Null), "ERC721: transfer to the zero address");

    // Clear approvals from the previous owner
    this._approve(Account.Null, tokenId);

    let tid = new UInt128(tokenId);
    let tokensOfOwner = this._getHolderTokens(from);
    for (let i = 0; i < tokensOfOwner.length; i++) {
      if (tokensOfOwner[i].eq(tid)) {
        tokensOfOwner.delete(i);
        break;
      }
    }

    let holderTokens = this._getHolderTokens(to);
    holderTokens.push(tid);

    this.storage._tokenOwners.set(tid, to);

    (new Transfer(from, to, tokenId));
  }

  /**
   * @dev Sets `_tokenURI` as the tokenURI of `tokenId`.
   *
   * Requirements:
   *
   * - `tokenId` must exist.
   */
  protected _setTokenURI(tokenId: u128, _tokenURI: string): void {
    assert(this._exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
    this.storage._tokenURIs.set(new UInt128(tokenId), new ScaleString(_tokenURI));
  }

  /**
   * @dev Internal function to set the base URI for all token IDs. It is
   * automatically added as a prefix to the value returned in {tokenURI},
   * or to the token ID if {tokenURI} is empty.
   */
  protected _setBaseURI(baseURI_: string): void {
    this.storage._baseURI = baseURI_;
  }

  protected _approve(to: Account, tokenId: u128): void {
    this.storage._tokenApprovals.set(new UInt128(tokenId), to);
    (new Approval(this.ownerOf(tokenId), to, tokenId));
  }
}