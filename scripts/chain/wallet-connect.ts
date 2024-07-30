import { ethers } from 'ethers';

type WalletConnectPayload = {
  contractAddress: string;
  methodName: string;
  parameters: any[];
  signature: string;
}


export function decodeWalletConnectPayload(payload: string): WalletConnectPayload {
  try {
    const decodedPayload = JSON.parse(payload);
    console.log('Decoded Payload:', decodedPayload);

    const { contractAddress, methodName, parameters, signature } = decodedPayload;

    if (typeof contractAddress !== 'string') {
      throw new Error('Invalid type for contractAddress. Expected a string.');
    }

    if (typeof methodName !== 'string') {
      throw new Error('Invalid type for methodName. Expected a string.');
    }

    if (!Array.isArray(parameters)) {
      throw new Error('Invalid type for parameters. Expected an array.');
    }

    if (typeof signature !== 'string') {
      throw new Error('Invalid type for signature. Expected a string.');
    }

    return {
      contractAddress,
      methodName,
      parameters,
      signature
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to decode WalletConnect payload:', error.message);
      throw new Error('Invalid WalletConnect payload.');
    } else {
      console.error('Unknown error:', error);
      throw new Error('An unknown error occurred while decoding the WalletConnect payload.');
    }
  }
}
