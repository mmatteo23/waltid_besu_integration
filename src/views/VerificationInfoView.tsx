import {
    FormControl, FormLabel, Input,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    IconButton,
    Badge,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { Result } from "ethers/lib/utils";
import { BiExport } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import Moment from 'react-moment';
Moment.globalFormat = 'YYYY-MM-DD HH:mm:ss';

const VerificationInfoView = ({ verificationRecords, setUuid, setSubjectAddress, setVerifierAddress }: {
    verificationRecords: Result | undefined,
    setUuid: (arg0: string) => void,
    setSubjectAddress: (arg0: string) => void,
    setVerifierAddress: (arg0: string) => void
}) => {
    return <>
        <FormControl mt="2em" mb="2em">
            <FormLabel htmlFor="uuid">UUID:</FormLabel>
            <Input name="uuid" variant='filled' placeholder='000-0000-0000' onChange={event =>
                setUuid(event.currentTarget.value)
            } />
        </FormControl>
        <FormControl mt="2em" mb="2em">
            <FormLabel htmlFor="subject">Subject address:</FormLabel>
            <Input name="subject" variant='filled' placeholder='0x123...' onChange={event =>
                setSubjectAddress(event.currentTarget.value)
            } />
        </FormControl>
        <FormControl mt="2em" mb="2em">
            <FormLabel htmlFor="verifier">Verifier address:</FormLabel>
            <Input name="verifier" variant='filled' placeholder='0x123...' onChange={event =>
                setVerifierAddress(event.currentTarget.value)
            } />
        </FormControl>

        {(verificationRecords?.length && verificationRecords?.[0]) ? 
            <>
                <h1>Verification Records list</h1>
                <ul>
                    {verificationRecords.map((record, index) => {
                        return <li key={index} className="verification-record-item">
                            <div className="verification-record-box">
                                <div>
                                    <span className="uuid">{record.uuid}</span>
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
                                        <span className="fieldname">Expiration time: </span> <Moment unix>{(record.expirationTime / 1000)}</Moment>
                                    </p>
                                    <Badge colorScheme={record.revoked ? 'red' : 'green'}>{record.revoked ? "REVOKED" : "VALID"}</Badge>
                                </div>
                                <div>
                                        <IconButton
                                            colorScheme='red'
                                            aria-label='Delete key'
                                            size='sm'
                                            icon={<FaTimes />}
                                            mr='0.5em'
                                        />
                                        <IconButton
                                            colorScheme='blue'
                                            aria-label='Export key'
                                            size='sm'
                                            icon={<BiExport />}
                                        />
                                </div>
                            </div>
                        </li>
                    })}
                </ul>
            </>
            : null}
    </>
};

export default VerificationInfoView;