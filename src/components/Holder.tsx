import { useState, useEffect, ChangeEventHandler } from 'react';
import { Custodian, utils } from "ssikit-sdk";
import { AddKeyModal } from './AddKeyModal';
import { ImportKeyModal } from './ImportKeyModal';
import { DeleteAllKeysModal } from './DeleteAllKeysModal';
import { KeysTable } from './KeysTable';
import { Box } from '@chakra-ui/react';

export function Holder() {

    const custodian = Custodian.Custodian;

    const [keys, setKeys] = useState<utils.IKey[]>([]);
    
    const updateKeys = async () => {
        let keys = await custodian.getKeys();
        setKeys(keys.reverse());
    }

    useEffect(() => {
        updateKeys();
    }, []);

    return (
        <>  
            <Box display='flex' justifyContent='space-between' mb='2em'>
                <Box>
                    <AddKeyModal updateKeys={updateKeys()}/>
                    <ImportKeyModal updateKeys={updateKeys()}/>
                </Box>             
                <DeleteAllKeysModal updateKeys={updateKeys()}/>
            </Box>
            <KeysTable data={keys} updateKeys={updateKeys()} caption='Your keys'/>
        </>
    );
}
