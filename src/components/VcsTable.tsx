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
import { DeleteVcModal } from './modals/DeleteVcModal';
import { ViewVcModal } from './modals/ViewVcModal';

export function VcsTable(props: { data: string[], updateVcs: Promise<void>, caption: string }) {

    return <TableContainer>
        <Table variant='simple' colorScheme='teal'>
            <TableCaption>{props.caption}</TableCaption>
            <Thead>
                <Tr>
                    <Th>Alias</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {props.data.map(vcId => {
                    return (
                        <Tr key={vcId}>
                            <Td>{vcId}</Td>
                            <Td>
                                <ViewVcModal vcToView={vcId}/>
                                <DeleteVcModal vcToDelete={vcId} updateVcs={props.updateVcs}/>
                            </Td>
                        </Tr>
                    )
                })}
            </Tbody>
        </Table>
    </TableContainer>
}