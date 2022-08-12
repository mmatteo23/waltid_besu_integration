import { useState, useEffect, ChangeEventHandler } from 'react';
import { Custodian, utils } from "ssikit-sdk";
import { AddKeyModal } from './modals/AddKeyModal';
import { ImportKeyModal } from './modals/ImportKeyModal';
import { DeleteAllKeysModal } from './modals/DeleteAllKeysModal';
import { KeysTable } from './KeysTable';
import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { TabBox } from './TabBox';

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
            <Tabs size='lg' isFitted>
                <TabList mb='1em'>
                    <Tab>Keys</Tab>
                    <Tab>DIDs</Tab>
                    <Tab>Credentials</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <TabBox>
                        <Box id="KeyManagement">
                            <Heading as='h2' mb='1em'>
                                Key Management
                            </Heading>
                            <Box display='flex' justifyContent='space-between' mb='2em'>
                                <Box>
                                    <AddKeyModal updateKeys={updateKeys()}/>
                                    <ImportKeyModal updateKeys={updateKeys()}/>
                                </Box>             
                                <DeleteAllKeysModal updateKeys={updateKeys()}/>
                            </Box>
                            <KeysTable data={keys} updateKeys={updateKeys()} caption='Your keys'/>
                        </Box>
                        </TabBox>
                    </TabPanel>
                    <TabPanel>
                        <TabBox>
                        </TabBox>
                    </TabPanel>
                    <TabPanel>
                        <TabBox>
                        </TabBox>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            
        </>
    );
}
