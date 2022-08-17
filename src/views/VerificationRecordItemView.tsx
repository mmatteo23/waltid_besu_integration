import { CloseIcon, DeleteIcon } from "@chakra-ui/icons";
import { Badge, Button, ButtonGroup } from "@chakra-ui/react";
import { Result } from "ethers/lib/utils";
import Moment from 'react-moment';
Moment.globalFormat = 'YYYY-MM-DD HH:mm:ss';

const VerificationRecordItemView = ({
    record,
    index,
    handleClickRevoke, 
    isLoadingRevoke, 
    isSuccessRevoke,
    isPrepareRevokeError,
    isRevokeError,
    prepareRevokeError, 
    revokeError,
    handleClickRemove, 
    isLoadingRemove, 
    isSuccessRemove,
    isPrepareRemoveError,
    isRemoveError,
    prepareRemoveError, 
    removeError
}: {
    record: Result,
    index: number,
    handleClickRevoke: () => void,
    isLoadingRevoke: boolean,
    isSuccessRevoke: boolean,
    isPrepareRevokeError: boolean,
    isRevokeError: boolean,
    prepareRevokeError: Error | null,
    revokeError: Error | null,
    handleClickRemove: () => void,
    isLoadingRemove: boolean,
    isSuccessRemove: boolean,
    isPrepareRemoveError: boolean,
    isRemoveError: boolean,
    prepareRemoveError: Error | null,
    removeError: Error | null
}) => {
    return <li key={index} className="card-item">
        <div className="verification-record-box">
            <div className="card-header">
                <span className="uuid">{record.uuid}</span>
                <Badge variant="solid" colorScheme={record.revoked ? 'red' : 'green'} fontSize='1em'>{record.revoked ? "REVOKED" : "VALID"}</Badge>
            </div>
            <div className="verification-record-data">
                <p>
                    <span className="fieldname">Verifier:</span> {record.verifier}
                </p>
                <p>
                    <span className="fieldname">Subject:</span>  {record.subject}
                </p>
            </div>
            <div>
                <p>
                    <span className="fieldname">Entry time: </span> <Moment unix>{record.entryTime}</Moment>
                    <span className="fieldname">Expiration time: </span> <Moment unix>{(record.expirationTime)}</Moment>
                </p>
            </div>


            <ButtonGroup variant='outline' spacing='6' mt='1em'>
                {!record.revoked ?
                    <Button isLoading={isLoadingRevoke} loadingText="Revoking" leftIcon={<CloseIcon />} colorScheme='yellow' variant='solid' disabled={isLoadingRevoke || isLoadingRemove} onClick={() => {      
                        handleClickRevoke()
                    }}>
                        Revoke
                    </Button>
                    : null}


                <Button isLoading={isLoadingRemove} loadingText="Removing" leftIcon={<DeleteIcon />} colorScheme='red' variant='solid' disabled={isLoadingRevoke || isLoadingRemove} onClick={() => {
                    handleClickRemove()
                }}>
                    Remove
                </Button>
            </ButtonGroup>
            {(isRevokeError || isRemoveError) && (
                <div>Error: {(revokeError || removeError)?.message}</div>
            )}
        </div>
    </li>
};

export default VerificationRecordItemView;