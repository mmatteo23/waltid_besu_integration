import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Result } from "ethers/lib/utils";
import { VerificationRecordItemController } from "../controllers";

const SearchVerificationRecordsView = ({ 
    verificationRecords, 
    setUuid, 
    setSubjectAddress, 
    setVerifierAddress
}: {
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
                    {verificationRecords.map((record, index) => 
                        
                        <VerificationRecordItemController record={record} index={index} />
                    
                    )}
                </ul>
            </>
            : null}
    </>;
};

export default SearchVerificationRecordsView;