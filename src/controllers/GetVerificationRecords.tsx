import { useState } from "react";
import { useContractRead, useContractReads } from "wagmi";
import useVerificationRegistryData from "../hooks/useVerificationRegistryData";
import { VerificationInfoView, VerifierInfoView } from "../views";

const GetVerificationRecordsController = () => {

    const [verifierAddress, setVerifierAddress] = useState("");
    const [uuid, setUuid] = useState("");
    const [subjectAddress, setSubjectAddress] = useState("");

    const [vr_address, vr_abi] = useVerificationRegistryData();

    const contract = {
        addressOrName: vr_address,
        contractInterface: vr_abi,
    }

    const { data: verificationRecords1 } = useContractRead({
        ...contract,
        functionName: 'getVerification',
        args: [uuid]
    });



    const { data: verificationRecords2 } = useContractRead({
        ...contract,
        functionName: 'getVerificationsForSubject',
        args: [subjectAddress]
    });



    const { data: verificationRecords3 } = useContractRead({
        ...contract,
        functionName: 'getVerificationsForVerifier',
        args: [verifierAddress],
    });

    let verificationRecords;
    if(uuid) {
        verificationRecords = verificationRecords1;
    }
    if(subjectAddress) {
        verificationRecords = verificationRecords2;
    }
    if(verifierAddress) {
        verificationRecords = verificationRecords3;
    }

    console.log(verificationRecords1, verificationRecords2, verificationRecords3);

    return <VerificationInfoView verificationRecords={verificationRecords} setUuid={setUuid} setSubjectAddress={setSubjectAddress} setVerifierAddress={setVerifierAddress} />
};

export default GetVerificationRecordsController;