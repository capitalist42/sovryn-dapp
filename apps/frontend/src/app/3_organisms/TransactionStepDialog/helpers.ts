import {
  SignMessageRequest,
  SignPermitRequest,
  SignTransactionRequest,
  SignTypedDataRequest,
  TransactionRequest,
  TransactionType,
} from './TransactionStepDialog.types';

export const isMessageSignatureRequest = (
  request: TransactionRequest,
): request is SignMessageRequest =>
  request.type === TransactionType.signMessage;

export const isTypedDataRequest = (
  request: TransactionRequest,
): request is SignTypedDataRequest =>
  request.type === TransactionType.signTypedData;

export const isTransactionRequest = (
  request: TransactionRequest,
): request is SignTransactionRequest =>
  request.type === TransactionType.signTransaction;

export const isPermitRequest = (
  request: TransactionRequest,
): request is SignPermitRequest => request.type === TransactionType.signPermit;