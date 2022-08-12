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
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { Result } from "ethers/lib/utils";
import { BiExport } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";

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

        {verificationRecords?.length ?
            <TableContainer>
                <Table variant='simple' colorScheme='teal' size="sm">
                    <TableCaption>Caption</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>UUID</Th>
                            <Th>Verifier</Th>
                            <Th>Subject</Th>
                            <Th>Entry Time</Th>
                            <Th>Expiration Time</Th>
                            <Th>State</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <tbody>
                        <>
                        {verificationRecords.forEach(record => {
                            console.log(record.uuid);
                            return <Tr key={record?.uuid}>
                                    <Td>{record?.uuid}</Td>
                                    <Td>{record?.verifier}</Td>
                                    <Td>{record?.subject}</Td>
                                    <Td>{record?.entryTime}</Td>
                                    <Td>{record?.expirationTime}</Td>
                                    <Td>{record?.revoked}</Td>
                                    <Td>
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
                                    </Td>
                                </Tr>
                        })};
                    </>
                    </tbody>
                </Table>
            </TableContainer>
            : null
        }
    </>
};

export default VerificationInfoView;