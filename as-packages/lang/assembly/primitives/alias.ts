/**
 * All Rights Reserved by Patract Labs.
 * @author liangqin.fan@gmail.com
 */

/**
 * ReturnCode stands for the status when you call a host api.
 */
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
}
