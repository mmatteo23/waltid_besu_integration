import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react';
import { utils } from 'ssikit-sdk';

export function PoliciesTable(props: { data: utils.VerificationPolicy[], updatePolicies: Promise<void>, caption: string }) {    
    return <TableContainer>
        <Table variant='simple' colorScheme='teal'>
            <TableCaption>{props.caption}</TableCaption>
            <Thead>
                <Tr>
                    <Th>Id</Th>
                    <Th>Description</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {props.data.map(key => {
                    return (
                        <Tr key={key.id}>
                            <Td w='50%'>{key.id}</Td>
                            <Td>{key.description}</Td>
                            <Td>
                                {/* <ExportKeyModal keyToExport={key}/> */}
                                {/* <DeleteKeyModal keyToDelete={key} updateKeys={props.updateKeys}/> */}
                            </Td>
                        </Tr>
                    )
                })}
            </Tbody>
        </Table>
    </TableContainer>
}