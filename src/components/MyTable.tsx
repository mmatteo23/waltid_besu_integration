import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    IconButton,
} from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';
import { BiExport } from 'react-icons/bi';

function MyTable(props: { data: IKey[], caption: string }) {

    return <TableContainer>
        <Table variant='striped' colorScheme='teal'>
            <TableCaption>{props.caption}</TableCaption>
            <Thead>
                <Tr>
                    <Th>Id</Th>
                    <Th>Algorithm</Th>
                    <Th>Action</Th>
                </Tr>
            </Thead>
            <Tbody>
                {props.data.map(key => {
                    return (
                        <Tr key={key.id}>
                            <Td>{key.id}</Td>
                            <Td>{key.algorithm}</Td>
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


export default MyTable;