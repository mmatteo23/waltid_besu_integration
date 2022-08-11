
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import useVerificationRegistryData from "../hooks/useVerificationRegistryData";
import WidgetCountView from "../views/WidgetCountView";
import { FaUserCheck } from 'react-icons/fa';

const VerificationRecordCountController = () => {

    const [ vr_address, vr_abi] = useVerificationRegistryData();

    const { data, isError, isLoading } = useContractRead({
        addressOrName: vr_address,
        contractInterface: vr_abi,
        functionName: 'getVerificationCount',
    })

    return <WidgetCountView count={data?.toString()} description={"# Verification Record"} icon={undefined} />;
};

export default VerificationRecordCountController;