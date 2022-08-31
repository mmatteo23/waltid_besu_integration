import { Result } from "ethers/lib/utils";
import { useState } from "react";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import useVerificationRegistryData from "../hooks/useVerificationRegistryData";
import VerificationRecordItemView from "../views/VerificationRecordItemView";


const VerificationRecordItemController = ({
    record
} : {
    record: Result
}) => {

    const [prepareRevokeErrorShort, setPrepareRevokeErrorShort] = useState("");
    const [prepareRemoveErrorShort, setPrepareRemoveErrorShort] = useState("");

    /**
     * Contract Data
    **/

    const [vr_address, vr_abi] = useVerificationRegistryData();
    const contract = {
        addressOrName: vr_address,
        contractInterface: vr_abi,
    }

    /**
     * Contract Writes
    **/

    // REVOKE
    const { config: revokeConfig, error: prepareRevokeError, isError: isPrepareRevokeError } = usePrepareContractWrite({
        ...contract,
        functionName: 'revokeVerification',
        args: [record.uuid, "diploma"],
        onError(error) {
            console.log(error);
            setPrepareRevokeErrorShort(error.message.split('(reason="execution reverted: ')[1].split('", method')[0])
        }
    });

    const { data: revokeData, error: revokeError, isError: isRevokeError, write: revokeWrite } = useContractWrite(revokeConfig);

    // using the useWaitForTransaction we can show feedback on the status of the transaction
    const { isLoading: isLoadingRevoke, isSuccess: isSuccessRevoke } = useWaitForTransaction({
        hash: revokeData?.hash,
    });

    // using the useWaitForTransaction we can show feedback on the status of the transaction
    const { isLoading: isLoadingRevokeTx, isSuccess: isSuccessRevokeTx } = useWaitForTransaction({
        hash: revokeData?.hash,
    });

    function handleClickRevoke() {
        revokeWrite?.();
    }

    // REMOVE

    const { config: removeConfig, error: prepareRemoveError, isError: isPrepareRemoveError } = usePrepareContractWrite({
        ...contract,
        functionName: 'removeVerification',
        args: [record.uuid, "diploma"],
        onError(error) {
            setPrepareRemoveErrorShort(error.message.split('(reason="execution reverted: ')[1].split('", method')[0])
        }
    });

    const { data: removeData, error: removeError, isError: isRemoveError, write: removeWrite } = useContractWrite(removeConfig);

    // using the useWaitForTransaction we can show feedback on the status of the transaction
    const { isLoading: isLoadingRemove, isSuccess: isSuccessRemove } = useWaitForTransaction({
        hash: removeData?.hash,
    });

    // using the useWaitForTransaction we can show feedback on the status of the transaction
    const { isLoading: isLoadingRemoveTx, isSuccess: isSuccessRemoveTx } = useWaitForTransaction({
        hash: removeData?.hash,
    });

    function handleClickRemove() {
        removeWrite?.();
    }

    return <VerificationRecordItemView 
        record={record}
        handleClickRevoke={handleClickRevoke}
        isLoadingRevoke={isLoadingRevoke}
        isSuccessRevoke={isSuccessRevoke}
        isPrepareRevokeError={isPrepareRevokeError}
        isRevokeError={isRevokeError}
        prepareRevokeError={prepareRevokeError}
        prepareRevokeErrorShort={prepareRevokeErrorShort}
        revokeError={revokeError}
        txHashRevoke={revokeData?.hash}
        isLoadingRevokeTx={isLoadingRevokeTx}
        isSuccessRevokeTx={isSuccessRevokeTx}
        handleClickRemove={handleClickRemove}
        isLoadingRemove={isLoadingRemove}
        isSuccessRemove={isSuccessRemove}
        isPrepareRemoveError={isPrepareRemoveError}
        isRemoveError={isRemoveError}
        prepareRemoveError={prepareRemoveError}
        prepareRemoveErrorShort={prepareRemoveErrorShort}
        removeError={removeError}
        txHashRemove={removeData?.hash}
        isLoadingRemoveTx={isLoadingRemoveTx}
        isSuccessRemoveTx={isSuccessRemoveTx}
    />
}

export default VerificationRecordItemController;