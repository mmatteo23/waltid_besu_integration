import { useState, useEffect } from 'react';
import { Custodian, utils } from "ssikit-sdk";
import { AddKeyModal } from './modals/AddKeyModal';
import { AddDidModal } from './modals/AddDidModal';
import { ImportKeyModal } from './modals/ImportKeyModal';
import { ImportDidModal } from './modals/ImportDidModal';
import { ImportVcModal } from './modals/ImportVcModal';
import { PresentVcsModal } from './modals/PresentVcsModal';
import { DeleteAllKeysModal } from './modals/DeleteAllKeysModal';
import { DeleteAllDidsModal } from './modals/DeleteAllDidsModal';
import { DeleteAllVcsModal } from './modals/DeleteAllVcsModal';
import { ResolveDidModal } from './modals/ResolveDidModal';
import { KeysTable } from './KeysTable';
import { DidsTable } from './DidsTable';
import { VcsTable } from './VcsTable';
import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { TabBox } from './TabBox';

export function Holder() {

    const custodian = Custodian.Custodian;

    const [keys, setKeys] = useState<utils.IKey[]>([]);
    const [dids, setDids] = useState<string[]>([]);
    const [vcs, setVcs] = useState<string[]>([]);
    
    const updateKeys = async () => {
        let keys = await custodian.getKeys();
        setKeys(keys.reverse());
    }

    const updateDids = async () => {
        let dids = await custodian.getDIDs();
        setDids(dids.reverse());
    }

    const updateVcs = async () => {
        let vcs = await custodian.getCredentialIDs();
        setVcs(vcs.reverse());
    }

    useEffect(() => {
        updateKeys();
        updateDids();
        updateVcs();
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
                            <Box id="CredentialsManagement">
                                <Heading as='h2' mb='1em'>
                                    Credentials Management
                                </Heading>
                                <Box display='flex' justifyContent='space-between' mb='2em'>
                                    <Box>
                                        <ImportVcModal updateVcs={updateVcs()}/>
                                        <PresentVcsModal updateVcs={updateVcs()}/>
                                    </Box>             
                                    <DeleteAllVcsModal updateVcs={updateVcs()}/>
                                </Box>
                                <VcsTable data={vcs} updateVcs={updateVcs()} caption='Your Credentials'/>
                            </Box>
                        </TabBox>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            
        </>
    );
}
