import { useState } from "react";
import { useContractRead } from "wagmi";
import useVerificationRegistryData from "../hooks/useVerificationRegistryData";
import {SearchVerificationRecordsView} from "../views";


const SearchVerificationRecordsController = () => {

    /**
     * State
     */

    const [verifierAddress, setVerifierAddress] = useState("");
    const [uuid, setUuid] = useState("");
    const [subjectAddress, setSubjectAddress] = useState("");

    /**
     * Contract Data
     */


    const [vr_address, vr_abi] = useVerificationRegistryData();
    const contract = {
        addressOrName: vr_address,
        contractInterface: vr_abi,
    }

    /**
     * Contract Reads
     */

    // Take care! This read function returns a Result and not a Result[]
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
    if (uuid) {
        // this is a Result so we have to wrap it in an array.
        verificationRecords = [verificationRecords1];
    }
    if (subjectAddress) {
        verificationRecords = verificationRecords2;
    }
    if (verifierAddress) {
        verificationRecords = verificationRecords3;
    }

    return <SearchVerificationRecordsView 
        verificationRecords={verificationRecords} 
        setUuid={setUuid} 
        setSubjectAddress={setSubjectAddress} 
        setVerifierAddress={setVerifierAddress} 
    />;
}


export default SearchVerificationRecordsController;