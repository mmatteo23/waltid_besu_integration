import { ContractInterface } from "ethers";
import { useNetwork } from "wagmi";
import VR from '../abis/VerificationRegistry.json';

declare type WagmiContract = {
    addressOrName: string,
    contractInterface: ContractInterface
}

const useVerificationRegistryData = (): [
    string,
    ContractInterface,
    {},
    {},
    WagmiContract,
] => {

    const { chain } = useNetwork();

    const verificationRegistryAddress = "0xE9a5A31088DFe5d64C1783aCD154D1484A99ff56";
    const abi = VR as unknown as ContractInterface;

    const domain = {
        name: "VerificationRegistry",
        version: "1.0",
        chainId: chain?.id,
        verifyingContract: verificationRegistryAddress
    }

    // const types = {
    //     VerificationResult: [
    //         { name: "schema", type: "string" },
    //         { name: "subject", type: "address" },
    //         { name: "expiration", type: "uint256" }
    //     ]
    // }

    const types = {
        VerificationResult: [
            { name: "subject", type: "address" },
            { name: "expiration", type: "uint256" },
            { name: "signature", type: "string"},
            { name: "jsonResult", type: "string" },
            { name: "useCase", type: "string" }
        ] 
    }

    const contract = {
        addressOrName: verificationRegistryAddress,
        contractInterface: abi,
    }

    return [verificationRegistryAddress, abi, domain, types, contract];

}

export default useVerificationRegistryData;