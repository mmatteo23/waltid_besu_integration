import { Result } from "ethers/lib/utils";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import useVerificationRegistryData from "../hooks/useVerificationRegistryData";
import VerificationRecordItemView from "../views/VerificationRecordItemView";


const VerificationRecordItemController = ({
    record
} : {
    record: Result
}) => {

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
        args: [record.uuid],
    });

    const { data: revokeData, error: revokeError, isError: isRevokeError, write: revokeWrite } = useContractWrite(revokeConfig);

    // using the useWaitForTransaction we can show feedback on the status of the transaction
    const { isLoading: isLoadingRevoke, isSuccess: isSuccessRevoke } = useWaitForTransaction({
        hash: revokeData?.hash,
    });

    function handleClickRevoke() {
        revokeWrite?.();
    }

    // REMOVE

    const { config: removeConfig, error: prepareRemoveError, isError: isPrepareRemoveError } = usePrepareContractWrite({
        ...contract,
        functionName: 'removeVerification',
        args: [record.uuid],
    });

    const { data: removeData, error: removeError, isError: isRemoveError, write: removeWrite } = useContractWrite(removeConfig);

    // using the useWaitForTransaction we can show feedback on the status of the transaction
    const { isLoading: isLoadingRemove, isSuccess: isSuccessRemove } = useWaitForTransaction({
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
        revokeError={revokeError}
        handleClickRemove={handleClickRemove}
        isLoadingRemove={isLoadingRemove}
        isSuccessRemove={isSuccessRemove}
        isPrepareRemoveError={isPrepareRemoveError}
        isRemoveError={isRemoveError}
        prepareRemoveError={prepareRemoveError}
        removeError={removeError}
    />
}

export default VerificationRecordItemController;