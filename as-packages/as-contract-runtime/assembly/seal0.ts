export type Ptr = usize;
export type SizeT = u32;

/// Every error that can be returned to a contract when it calls any of the host functions.
///
/// # Note
///
/// This enum can be extended in the future: New codes can be added but existing codes
/// will not be changed or removed. This means that any contract **must not** exhaustively
/// match return codes. Instead, contracts should prepare for unknown variants and deal with
/// those errors gracefuly in order to be forward compatible.
export enum ReturnCode {
    /// API call successful.
    Success = 0,
    /// The called function trapped and has its state changes reverted.
    /// In this case no output buffer is returned.
    CalleeTrapped = 1,
    /// The called function ran to completion but decided to revert its state.
    /// An output buffer is returned when one was supplied.
    CalleeReverted = 2,
    /// The passed key does not exist in storage.
    KeyNotFound = 3,
    /// Transfer failed because it would have brought the sender's total balance below the
    /// subsistence threshold.
    BelowSubsistenceThreshold = 4,
    /// Transfer failed for other reasons. Most probably reserved or locked balance of the
    /// sender prevents the transfer.
    TransferFailed = 5,
    /// The newly created contract is below the subsistence threshold after executing
    /// its constructor.
    NewContractNotFunded = 6,
    /// No code could be found at the supplied code hash.
    CodeNotFound = 7,
    /// The contract that was called is either no contract at all (a plain account)
    /// or is a tombstone.
    NotCallable = 8,
    /// The call to `seal_debug_message` had no effect because debug message
    /// recording was disabled.
    LoggingDisabled = 9,
}

// Set the value specified by the given key in the storage.
export declare function seal_set_storage(
    keyPtr: Ptr,
    valuePtr: Ptr,
    valueSize: SizeT
): void;

// Clear the value under the given key in the storage.
export declare function seal_clear_storage(keyPtr: Ptr): void;

// Read the value under the given key in the storage.
export declare function seal_get_storage(
    keyPtr: Ptr,
    outPtr: Ptr,
    outSizePtr: Ptr
): ReturnCode;

// Transfer some value to another account.
export declare function seal_transfer(
    accountPtr: Ptr,
    accountSize: SizeT,
    valuePtr: Ptr,
    valueSize: SizeT
): ReturnCode;

// Make a call to another contract.
//
// The callees output buffer is copied to `output_ptr` and its length to `output_len_ptr`.
// The copy of the output buffer can be skipped by supplying the sentinel value
// of `u32::max_value()` to `output_ptr`.
//
// # Parameters
//
// - callee_ptr: a pointer to the address of the callee contract.
//   Should be decodable as an `T::AccountId`. Traps otherwise.
// - callee_len: length of the address buffer.
// - gas: how much gas to devote to the execution.
// - value_ptr: a pointer to the buffer with value, how much value to send.
//   Should be decodable as a `T::Balance`. Traps otherwise.
// - value_len: length of the value buffer.
// - input_data_ptr: a pointer to a buffer to be used as input data to the callee.
// - input_data_len: length of the input data buffer.
// - output_ptr: a pointer where the output buffer is copied to.
// - output_len_ptr: in-out pointer to where the length of the buffer is read from
//   and the actual length is written to.
//
// # Errors
//
// An error means that the call wasn't successful output buffer is returned unless
// stated otherwise.
//
// `ReturnCode::CalleeReverted`: Output buffer is returned.
// `ReturnCode::CalleeTrapped`
// `ReturnCode::BelowSubsistenceThreshold`
// `ReturnCode::TransferFailed`
// `ReturnCode::NotCallable`
export declare function seal_call(
    calleePtr: Ptr,
    calleeSize: SizeT,
    gas: u64,
    valuePtr: Ptr,
    valueSize: SizeT,
    inputDataPtr: Ptr,
    inputDataSize: SizeT,
    outputPtr: Ptr,
    outputLenPtr: Ptr
): ReturnCode;

// Instantiate a contract with the specified code hash.
//
// This function creates an account and executes the constructor defined in the code specified
// by the code hash. The address of this new account is copied to `address_ptr` and its length
// to `address_len_ptr`. The constructors output buffer is copied to `output_ptr` and its
// length to `output_len_ptr`. The copy of the output buffer and address can be skipped by
// supplying the sentinel value of `u32::max_value()` to `output_ptr` or `address_ptr`.
//
// After running the constructor it is verfied that the contract account holds at
// least the subsistence threshold. If that is not the case the instantion fails and
// the contract is not created.
//
// # Parameters
//
// - code_hash_ptr: a pointer to the buffer that contains the initializer code.
// - code_hash_len: length of the initializer code buffer.
// - gas: how much gas to devote to the execution of the initializer code.
// - value_ptr: a pointer to the buffer with value, how much value to send.
//   Should be decodable as a `T::Balance`. Traps otherwise.
// - value_len: length of the value buffer.
// - input_data_ptr: a pointer to a buffer to be used as input data to the initializer code.
// - input_data_len: length of the input data buffer.
// - address_ptr: a pointer where the new account's address is copied to.
// - address_len_ptr: in-out pointer to where the length of the buffer is read from
//		and the actual length is written to.
// - output_ptr: a pointer where the output buffer is copied to.
// - output_len_ptr: in-out pointer to where the length of the buffer is read from
//   and the actual length is written to.
// - salt_ptr: Pointer to raw bytes used for address deriviation. See `fn contract_address`.
// - salt_len: length in bytes of the supplied salt.
//
// # Errors
//
// Please consult the `ReturnCode` enum declaration for more information on those
// errors. Here we only note things specific to this function.
//
// An error means that the account wasn't created and no address or output buffer
// is returned unless stated otherwise.
//
// `ReturnCode::CalleeReverted`: Output buffer is returned.
// `ReturnCode::CalleeTrapped`
// `ReturnCode::BelowSubsistenceThreshold`
// `ReturnCode::TransferFailed`
// `ReturnCode::NewContractNotFunded`
// `ReturnCode::CodeNotFound`
export declare function seal_instantiate(
    codeHashPtr: Ptr,
    codeHashSize: SizeT,
    gas: u64,
    valuePtr: Ptr,
    valueSize: SizeT,
    inputDataPtr: Ptr,
    inputDataSize: SizeT,
    addressPtr: Ptr,
    addressLenPtr: Ptr,
    outputPtr: Ptr,
    outputLenPtr: Ptr,
    saltPtr: Ptr,
    saltLen: SizeT
): ReturnCode;

// Remove the calling account and transfer remaining balance.
// This export declare function never returns. Either the termination was successful and the
// execution of the destroyed contract is halted. Or it failed during the termination
// which is considered fatal and results in a trap + rollback.
//
// - beneficiary_ptr: a pointer to the address of the beneficiary account where all
//   where all remaining funds of the caller are transfered.
//   Should be decodable as an `T::AccountId`. Traps otherwise.
// - beneficiary_len: length of the address buffer.
//
// # Traps
//
// - The contract is live i.e is already on the call stack.
export declare function seal_terminate(
    beneficiaryPtr: Ptr,
    beneficiarySize: SizeT
): void;

// Read message's input from host.
export declare function seal_input(bufPtr: Ptr, bufLenPtr: Ptr): void;

// Cease contract execution and save a data buffer as a result of the execution.
//
// This function never returns as it stops execution of the caller.
// This is the only way to return a data buffer to the caller. Returning from
// execution without calling this function is equivalent to calling:
// ```
// seal_return(0, 0, 0);
// ```
//
// The flags argument is a bitfield that can be used to signal special return
// conditions to the supervisor:
// --- lsb ---
// bit 0      : REVERT - Revert all storage changes made by the caller.
// bit [1, 31]: Reserved for future use.
// --- msb ---
//
// Using a reserved bit triggers a trap.
export declare function seal_return(
    flags: u32,
    dataPtr: Ptr,
    dataSize: SizeT
): void;

// Stores the address of the caller into the supplied buffer.
//
// The value is stored to linear memory at the address pointed to by `outPtr`.
// `outLenPtr` must point to a u32 value that describes the available space at
// `outPtr`. This call overwrites it with the size of the value. If the available
// space at `outPtr` is less than the size of the value a trap is triggered.
//
// If this is a top-level call (i.e. initiated by an extrinsic) the origin address of the
// extrinsic will be returned. Otherwise, if this call is initiated by another contract then the
// address of the contract will be returned. The value is encoded as T::AccountId.
export declare function seal_caller(outPtr: Ptr, outLenPtr: Ptr): void;

// Stores the address of the current contract into the supplied buffer.
//
// The value is stored to linear memory at the address pointed to by `outPtr`.
// `outLenPtr` must point to a u32 value that describes the available space at
// `outPtr`. This call overwrites it with the size of the value. If the available
// space at `outPtr` is less than the size of the value a trap is triggered.
export declare function seal_address(outPtr: Ptr, outLenPtr: Ptr): void;

// Stores the price for the specified amount of gas into the supplied buffer.
//
// The value is stored to linear memory at the address pointed to by `outPtr`.
// `outLenPtr` must point to a u32 value that describes the available space at
// `outPtr`. This call overwrites it with the size of the value. If the available
// space at `outPtr` is less than the size of the value a trap is triggered.
//
// The data is encoded as T::Balance.
//
// # Note
//
// It is recommended to avoid specifying very small values for `gas` as the prices for a single
// gas can be smaller than one.
export declare function seal_weight_to_fee(
    gas: u64,
    outPtr: Ptr,
    outLenPtr: Ptr
): void;
// Stores the amount of gas left into the supplied buffer.
//
// The value is stored to linear memory at the address pointed to by `outPtr`.
// `outLenPtr` must point to a u32 value that describes the available space at
// `outPtr`. This call overwrites it with the size of the value. If the available
// space at `outPtr` is less than the size of the value a trap is triggered.
//
// The data is encoded as Gas.
export declare function seal_gas_left(outPtr: Ptr, outLenPtr: Ptr): void;

// Stores the balance of the current account into the supplied buffer.
//
// The value is stored to linear memory at the address pointed to by `outPtr`.
// `outLenPtr` must point to a u32 value that describes the available space at
// `outPtr`. This call overwrites it with the size of the value. If the available
// space at `outPtr` is less than the size of the value a trap is triggered.
//
// The data is encoded as T::Balance.
export declare function seal_balance(outPtr: Ptr, outLenPtr: Ptr): void;

// Stores the value transferred along with this call or as endowment into the supplied buffer.
//
// The value is stored to linear memory at the address pointed to by `outPtr`.
// `outLenPtr` must point to a u32 value that describes the available space at
// `outPtr`. This call overwrites it with the size of the value. If the available
// space at `outPtr` is less than the size of the value a trap is triggered.
//
// The data is encoded as T::Balance.
export declare function seal_value_transferred(
    outPtr: Ptr,
    outLenPtr: Ptr
): void;

// Stores a random number for the current block and the given subject into the supplied buffer.
//
// The value is stored to linear memory at the address pointed to by `outPtr`.
// `outLenPtr` must point to a u32 value that describes the available space at
// `outPtr`. This call overwrites it with the size of the value. If the available
// space at `outPtr` is less than the size of the value a trap is triggered.
//
// The data is encoded as T::Hash.
export declare function seal_random(
    subjectPtr: Ptr,
    subjectSize: SizeT,
    outPtr: Ptr,
    outLenPtr: Ptr
): void;

// Load the latest block timestamp into the supplied buffer
//
// The value is stored to linear memory at the address pointed to by `outPtr`.
// `outLenPtr` must point to a u32 value that describes the available space at
// `outPtr`. This call overwrites it with the size of the value. If the available
// space at `outPtr` is less than the size of the value a trap is triggered.
export declare function seal_now(outPtr: Ptr, outLenPtr: Ptr): void;

// Stores the minimum balance (a.k.a. existential deposit) into the supplied buffer.
//
// The data is encoded as T::Balance.
export declare function seal_minimum_balance(outPtr: Ptr, outLenPtr: Ptr): void;

// Stores the tombstone deposit into the supplied buffer.
//
// The value is stored to linear memory at the address pointed to by `outPtr`.
// `outLenPtr` must point to a u32 value that describes the available space at
// `outPtr`. This call overwrites it with the size of the value. If the available
// space at `outPtr` is less than the size of the value a trap is triggered.
//
// The data is encoded as T::Balance.
//
// # Note
//
// The tombstone deposit is on top of the existential deposit. So in order for
// a contract to leave a tombstone the balance of the contract must not go
// below the sum of existential deposit and the tombstone deposit. The sum
// is commonly referred as subsistence threshold in code.
export declare function seal_tombstone_deposit(
    outPtr: Ptr,
    outLenPtr: Ptr
): void;

// Stores the contract deposit into the supplied buffer.
//
// The value is stored to linear memory at the address pointed to by `out_ptr`.
// `out_len_ptr` must point to a u32 value that describes the available space at
// `out_ptr`. This call overwrites it with the size of the value. If the available
// space at `out_ptr` is less than the size of the value a trap is triggered.
//
// The data is encoded as T::Balance.
//
// # Note
//
// The contract deposit is on top of the existential deposit. The sum
// is commonly referred as subsistence threshold in code. No contract initiated
// balance transfer can go below this threshold.
export declare function seal_contract_deposit(outPtr: Ptr, outLenPtr: SizeT): void;

// Try to restore the given destination contract sacrificing the caller.
//
// This export declare function will compute a tombstone hash from the caller's storage and the given code hash
// and if the hash matches the hash found in the tombstone at the specified address - kill
// the caller contract and restore the destination contract and set the specified `rent_allowance`.
// All caller's funds are transfered to the destination.
//
// If there is no tombstone at the destination address, the hashes don't match or this contract
// instance is already present on the contract call stack, a trap is generated.
//
// Otherwise, the destination contract is restored. This export declare function is diverging and stops execution
// even on success.
//
// `dest_ptr`, `dest_len` - the pointer and the length of a buffer that encodes `T::AccountId`
// with the address of the to be restored contract.
// `code_hash_ptr`, `code_hash_len` - the pointer and the length of a buffer that encodes
// a code hash of the to be restored contract.
// `rent_allowance_ptr`, `rent_allowance_len` - the pointer and the length of a buffer that
// encodes the rent allowance that must be set in the case of successful restoration.
// `delta_ptr` is the pointer to the start of a buffer that has `delta_count` storage keys
// laid out sequentially.
//
// # Traps
//
// - Tombstone hashes do not match
// - Calling cantract is live i.e is already on the call stack.
export declare function seal_restore_to(
    destPtr: Ptr,
    destSize: SizeT,
    codeHashPtr: Ptr,
    codeHashSize: SizeT,
    rentAllowancePtr: Ptr,
    rentAllowanceSize: SizeT,
    deltaPtr: Ptr,
    deltaCount: SizeT
): void;

// Deposit a contract event with the data buffer and optional list of topics. There is a limit
// on the maximum number of topics specified by `event_topics`.
//
// - topicsPtr - a pointer to the buffer of topics encoded as `Vec<T::Hash>`. The value of this
//   is ignored if `topicsLen` is set to 0. The topics list can't contain duplicates.
// - topicsLen - the length of the topics buffer. Pass 0 if you want to pass an empty vector.
// - dataPtr - a pointer to a raw data buffer which will saved along the event.
// - dataLen - the length of the data buffer.
export declare function seal_deposit_event(
    topicsPtr: Ptr,
    topicsLen: SizeT,
    dataPtr: Ptr,
    dataLen: SizeT
): void;

// Set rent allowance of the contract
//
// - valuePtr: a pointer to the buffer with value, how much to allow for rent
//   Should be decodable as a `T::Balance`. Traps otherwise.
// - valueLen: length of the value buffer.
export declare function seal_set_rent_allowance(
    valuePtr: Ptr,
    valueLen: SizeT
): void;

// Stores the rent allowance into the supplied buffer.
//
// The value is stored to linear memory at the address pointed to by `outPtr`.
// `outLenPtr` must point to a u32 value that describes the available space at
// `outPtr`. This call overwrites it with the size of the value. If the available
// space at `outPtr` is less than the size of the value a trap is triggered.
//
// The data is encoded as T::Balance.
export declare function seal_rent_allowance(outPtr: Ptr, outLenPtr: Ptr): void;

// Prints utf8 encoded string from the data buffer.
// Only available on `--dev` chains.
// This export declare function may be removed at any time, superseded by a more general contract debugging feature.
export declare function seal_println(strPtr: Ptr, strLen: SizeT): void;

// Emit a custom debug message.
//
// No newlines are added to the supplied message.
// Specifying invalid UTF-8 triggers a trap.
//
// This is a no-op if debug message recording is disabled which is always the case
// when the code is executing on-chain. The message is interpreted as UTF-8 and
// appended to the debug buffer which is then supplied to the calling RPC client.
//
// # Note
//
// Even though no action is taken when debug message recording is disabled there is still
// a non trivial overhead (and weight cost) associated with calling this function. Contract
// languages should remove calls to this function (either at runtime or compile time) when
// not being executed as an RPC. For example, they could allow users to disable logging
// through compile time flags (cargo features) for on-chain deployment. Additionally, the
// return value of this function can be cached in order to prevent further calls at runtime.
export declare function seal_debug_message(strPtr: Ptr, strLen: SizeT): ReturnCode;

// Stores the current block number of the current contract into the supplied buffer.
//
// The value is stored to linear memory at the address pointed to by `outPtr`.
// `outLenPtr` must point to a u32 value that describes the available space at
// `outPtr`. This call overwrites it with the size of the value. If the available
// space at `outPtr` is less than the size of the value a trap is triggered.
export declare function seal_block_number(outPtr: Ptr, outLenPtr: Ptr): void;

// Computes the SHA2 256-bit hash on the given input buffer.
//
// Returns the result directly into the given output buffer.
//
// # Note
//
// - The `input` and `output` buffer may overlap.
// - The output buffer is expected to hold at least 32 bytes (256 bits).
// - It is the callers responsibility to provide an output buffer that
//   is large enough to hold the expected amount of bytes returned by the
//   chosen hash export declare function.
//
// # Parameters
//
// - `inputPtr`: the pointer into the linear memory where the input
//                data is placed.
// - `inputSize`: the length of the input data in bytes.
// - `outputPtr`: the pointer into the linear memory where the output
//                 data is placed. The export declare function will write the result
//                 directly into this buffer.
export declare function seal_hash_sha2_256(
    inputPtr: Ptr,
    inputSize: SizeT,
    outputPtr: Ptr
): void;

// Computes the KECCAK 256-bit hash on the given input buffer.
//
// Returns the result directly into the given output buffer.
//
// # Note
//
// - The `input` and `output` buffer may overlap.
// - The output buffer is expected to hold at least 32 bytes (256 bits).
// - It is the callers responsibility to provide an output buffer that
//   is large enough to hold the expected amount of bytes returned by the
//   chosen hash export declare function.
//
// # Parameters
//
// - `inputPtr`: the pointer into the linear memory where the input
//                data is placed.
// - `inputSize`: the length of the input data in bytes.
// - `outputPtr`: the pointer into the linear memory where the output
//                 data is placed. The export declare function will write the result
//                 directly into this buffer.
export declare function seal_hash_keccak_256(
    inputPtr: Ptr,
    inputSize: SizeT,
    outputPtr: Ptr
): void;

// Computes the BLAKE2 256-bit hash on the given input buffer.
//
// Returns the result directly into the given output buffer.
//
// # Note
//
// - The `input` and `output` buffer may overlap.
// - The output buffer is expected to hold at least 32 bytes (256 bits).
// - It is the callers responsibility to provide an output buffer that
//   is large enough to hold the expected amount of bytes returned by the
//   chosen hash export declare function.
//
// # Parameters
//
// - `inputPtr`: the pointer into the linear memory where the input
//                data is placed.
// - `inputSize`: the length of the input data in bytes.
// - `outputPtr`: the pointer into the linear memory where the output
//                 data is placed. The export declare function will write the result
//                 directly into this buffer.
export declare function seal_hash_blake2_256(
    inputPtr: Ptr,
    inputSize: SizeT,
    outputPtr: Ptr
): void;

// Computes the BLAKE2 128-bit hash on the given input buffer.
//
// Returns the result directly into the given output buffer.
//
// # Note
//
// - The `input` and `output` buffer may overlap.
// - The output buffer is expected to hold at least 16 bytes (128 bits).
// - It is the callers responsibility to provide an output buffer that
//   is large enough to hold the expected amount of bytes returned by the
//   chosen hash export declare function.
//
// # Parameters
//
// - `inputPtr`: the pointer into the linear memory where the input
//                data is placed.
// - `inputSize`: the length of the input data in bytes.
// - `outputPtr`: the pointer into the linear memory where the output
//                 data is placed. The export declare function will write the result
//                 directly into this buffer.
export declare function seal_hash_blake2_128(
    inputPtr: Ptr,
    inputSize: SizeT,
    outputPtr: Ptr
): void;

// Call into the chain extension provided by the chain if any.
//
// Handling of the input values is up to the specific chain extension and so is the
// return value. The extension can decide to use the inputs as primitive inputs or as
// in/out arguments by interpreting them as pointers. Any caller of this function
// must therefore coordinate with the chain that it targets.
//
// # Note
//
// If no chain extension exists the contract will trap with the `NoChainExtension`
// module error.
export declare function seal_call_chain_extension(
    func_id: u32,
    input_ptr: Ptr,
    input_len: u32,
    output_ptr: Ptr,
    output_len_ptr: Ptr
): u32;
