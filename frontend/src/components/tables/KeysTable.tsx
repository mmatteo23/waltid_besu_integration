import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
} from '@chakra-ui/react';
import { utils } from 'ssikit-sdk';
import { DeleteKeyModal, ExportKeyModal } from '../modals/Keys';
import axios from 'axios';
import { useEffect } from 'react';

export default function KeysTable(props: { data: utils.Key[], updateKeys: () => Promise<void>, caption: string }) {

    const callBackEnd = async () => {
        await axios.post("/post");
    }

    useEffect(() => {
        callBackEnd();
    } , []);

    return <TableContainer>
        <Table variant='simple' colorScheme='teal'>
            <TableCaption>{props.caption}</TableCaption>
            <Thead>
                <Tr>
                    <Th>Id</Th>
                    <Th>Algorithm</Th>
                    <Th>Actions</Th>
                    {/* <Th>New</Th> */}
                </Tr>
            </Thead>
            <Tbody>
                {props.data.map(key => {
                    return (
                        <Tr key={key.keyId.id}>
                            <Td w='50%'>{key.keyId.id}</Td>
                            <Td>{key.algorithm}</Td>
                            <Td>
                                <ExportKeyModal keyToExport={key}/>
                                <DeleteKeyModal keyToDelete={key} updateKeys={props.updateKeys}/>
                            </Td>
                            {/* <Td> */}
                                {/* <form action="../../post" method="post" className="form"> */}
                                    {/* <Button onClick={callBackEnd}></Button> */}
                                {/* </form> */}
                            {/* </Td> */}
                        </Tr>
                    )
                })}
            </Tbody>
        </Table>
    </TableContainer>
}