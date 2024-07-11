import { ethers } from 'ethers';

interface WalletConnectPayload {
  contractAddress: string;
  methodName: string;
  parameters: any[];
  signature: string;
}

export function decodeWalletConnectPayload(payload: string): WalletConnectPayload {
  try {
    const decodedPayload = JSON.parse(payload);
    console.log(decodedPayload);

    const { contractAddress, methodName, parameters, signature } = decodedPayload;
    console.log("contractAddress", contractAddress);
    console.log("methodName", methodName);
    console.log("parameters", parameters);

    if (typeof contractAddress !== 'string' ||
      typeof methodName !== 'string' ||
      !Array.isArray(parameters) ||
      typeof signature !== 'string') {
      throw new Error("Invalid WalletConnect payload structure.");
    }

    return {
      contractAddress,
      methodName,
      parameters,
      signature
    };
  } catch (error) {
    console.log(error);
    // throw new Error("Invalid WalletConnect payload.");
  }
}
