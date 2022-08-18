import { ContractInterface } from "ethers";
import { domAnimation } from "framer-motion";
import { useNetwork } from "wagmi";
import VR from '../abis/DiplomaIssuerManager.json';

const useDiplomaIssuerManagerData = (): [
    string,
    ContractInterface,
    {
        addressOrName: string;
        contractInterface: ContractInterface;
    },
] => {

    const contract_address = "0x7e3E8dFfb775D533d401Aa30621F783cEA83A747";
    const abi = VR as unknown as ContractInterface;

    const contract = {
        addressOrName: contract_address,
        contractInterface: abi,
    }

    return [contract_address, abi, contract];

}

export default useDiplomaIssuerManagerData;