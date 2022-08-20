import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    IconButton,
} from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';
import { BiExport } from 'react-icons/bi';

function MyDidTable(props: { columns: string[], data: IVerifier[], caption: string }) {

    return <TableContainer>
        <Table variant='striped' colorScheme='teal'>
            <TableCaption>{props.caption}</TableCaption>
            <Thead>
                <Tr>
                    {props.columns.map(col => {
                        return <Th>{col}</Th>
                    })}
                </Tr>
            </Thead>
            <Tbody>
                {props.data.map(key => {
                    return (
                        <Tr key={key.did}>
                            <Td>{key.name}</Td>
                            <Td>{key.did}</Td>
                            <Td>{key.url}</Td>
                            <Td>{key.signer}</Td>
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
                    )
                })}
            </Tbody>
        </Table>
    </TableContainer>
}


export default MyDidTable;