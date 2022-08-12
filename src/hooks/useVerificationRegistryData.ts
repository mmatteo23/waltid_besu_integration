import { ContractInterface } from "ethers";
import { domAnimation } from "framer-motion";
import { useNetwork } from "wagmi";
import VR from '../abis/VerificationRegistry.json';

const useVerificationRegistryData = (): [
    string,
    ContractInterface,
    {},
    {}
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

    const types = {
        VerificationResult: [
            { name: "schema", type: "string" },
            { name: "subject", type: "address" },
            { name: "expiration", type: "uint256" }
        ]
    }

    return [verificationRegistryAddress, abi, domain, types];

}

export default useVerificationRegistryData;