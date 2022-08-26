import { ethers } from "ethers";
import { useState } from "react";
import { useContractRead } from "wagmi";
import useVerificationRegistryData from "../hooks/useVerificationRegistryData";
import { SearchVerifierView } from "../views";


const SearchVerifierFromAddressController = () => {

    const [verifierAddress, setVerifierAddress] = useState("");

    const [vr_address, vr_abi] = useVerificationRegistryData();

    const { data: verifierInfo, isError, isLoading } = useContractRead({
        addressOrName: vr_address,
        contractInterface: vr_abi,
        functionName: 'getVerifier',
        args: [verifierAddress],
        enabled: (ethers.utils.isAddress(verifierAddress)),
        onError(error) {
            console.log(error);
        }
    })

    return <SearchVerifierView verifier={verifierInfo} setVerifierAddress={setVerifierAddress} />
};

export default SearchVerifierFromAddressController;