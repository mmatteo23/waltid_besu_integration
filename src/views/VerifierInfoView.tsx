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

const VerifierInfoView = ({ verifierInfo, setVerifierAddress }: {
    verifierInfo: Result | undefined,
    setVerifierAddress: (arg0: string) => void
}) => {
    return <>
        <FormControl width="50%" ml="25%" mt="2em" mb="2em" isRequired>
            <FormLabel htmlFor="address">Search a verifier by address:</FormLabel>
            <Input name="address" variant='filled' placeholder='0x123...' onChange={event =>
                setVerifierAddress(event.currentTarget.value)
            } />

        </FormControl>
        {verifierInfo ?
            <TableContainer>
                <Table variant='simple' colorScheme='teal' size="sm">
                    <TableCaption>Caption</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>DID</Th>
                            <Th>url</Th>
                            <Th>Signer</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr key="1">
                            <Td>{ethers.utils.parseBytes32String(verifierInfo?.name)}</Td>
                            <Td>{verifierInfo?.did}</Td>
                            <Td>{verifierInfo?.url}</Td>
                            <Td>{verifierInfo?.signer}</Td>
                            <Td>
                                <IconButton
                                    colorScheme='red'
                                    aria-label='Delete Verifier'
                                    size='sm'
                                    icon={<FaTimes />}
                                    mr='0.5em'
                                />
                                <IconButton
                                    colorScheme='blue'
                                    aria-label='Update Verifier'
                                    size='sm'
                                    icon={<BiExport />}
                                />
                            </Td>
                        </Tr>

                    </Tbody>
                </Table>
            </TableContainer>
            : null
        }
    </>;
};

export default VerifierInfoView;