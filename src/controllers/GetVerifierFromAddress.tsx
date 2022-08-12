import { useState } from "react";
import { useContractRead } from "wagmi";
import useVerificationRegistryData from "../hooks/useVerificationRegistryData";
import { VerifierInfoView } from "../views";


const GetVerifierFromAddressController = () => {

    const [verifierAddress, setVerifierAddress] = useState("");

    const [vr_address, vr_abi] = useVerificationRegistryData();

    const { data: verifierInfo, isError, isLoading } = useContractRead({
        addressOrName: vr_address,
        contractInterface: vr_abi,
        functionName: 'getVerifier',
        args: [verifierAddress]
    })

    return <VerifierInfoView verifierInfo={verifierInfo} setVerifierAddress={setVerifierAddress} />
};

export default GetVerifierFromAddressController;