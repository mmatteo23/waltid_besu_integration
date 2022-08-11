import { ContractInterface } from "ethers";
import VR from '../abis/VerificationRegistry.json';

const useVerificationRegistryData = (): [
    string,
    ContractInterface
] => {

    const verificationRegistryAddress = "0xE9a5A31088DFe5d64C1783aCD154D1484A99ff56";
    const abi = VR as unknown as ContractInterface;

    return [verificationRegistryAddress, abi];

}

export default useVerificationRegistryData;