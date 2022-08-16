import { useState, useEffect, ChangeEventHandler } from 'react';
import { Custodian, utils } from "ssikit-sdk";
import { AddKeyModal } from './modals/AddKeyModal';
import { AddDidModal } from './modals/AddDidModal';
import { ImportKeyModal } from './modals/ImportKeyModal';
import { ImportDidModal } from './modals/ImportDidModal';
import { DeleteAllKeysModal } from './modals/DeleteAllKeysModal';
import { DeleteAllDidsModal } from './modals/DeleteAllDidsModal';
import { ResolveDidModal } from './modals/ResolveDidModal';
import { KeysTable } from './KeysTable';
import { DidsTable } from './DidsTable';
import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { TabBox } from './TabBox';

export function Holder() {

    const custodian = Custodian.Custodian;

    const [keys, setKeys] = useState<utils.IKey[]>([]);
    const [dids, setDids] = useState<string[]>([]);
    
    const updateKeys = async () => {
        let keys = await custodian.getKeys();
        setKeys(keys.reverse());
    }

    const updateDids = async () => {
        let dids = await custodian.getDIDs();
        setDids(dids.reverse());
    }

    useEffect(() => {
        updateKeys();
        updateDids();
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
                            <Box id="KeysManagement">
                                <Heading as='h2' mb='1em'>
                                    Keys Management
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
                            <Box id="DIDsManagement">
                                <Heading as='h2' mb='1em'>
                                    DIDs Management
                                </Heading>
                                <Box display='flex' justifyContent='space-between' mb='2em'>
                                    <Box>
                                        <AddDidModal keys={keys} dids={dids} updateDids={updateDids()}/>
                                        <ImportDidModal updateDids={updateDids()}/>
                                        <ResolveDidModal/>
                                    </Box>             
                                    <DeleteAllDidsModal updateDids={updateDids()}/>
                                </Box>
                                <DidsTable data={dids} updateDids={updateDids()} caption='Your DIDs'/>
                            </Box>
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
