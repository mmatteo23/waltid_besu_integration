
import MyTable from './MyTable';
import {
    Tabs, TabList, TabPanels, Tab, TabPanel, Button,
    Select, Box,
} from '@chakra-ui/react'
import { Component } from 'react'
import { AddKeyModal } from './AddKeyModal'
import { TabBox } from './TabBox'
import { Issuer } from './Issuer'

const chiave: IKey = {
    id: '1',
    algorithm: 'ALDORITMO'
}

const data1: Array<IKey> = [chiave];

class TabsMenu extends Component {
    render() {
        return <Tabs isFitted variant='enclosed'>
            <TabList mb='1em'>
                <Tab>Custodian</Tab>
                <Tab>Issuer/Revoker</Tab>
                <Tab>Verifier</Tab>
                <Tab>Trusted Contracts</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <TabBox>
                        <AddKeyModal />
                        <MyTable data={data1} caption="Table of this custodian keys" />
                    </TabBox>
                </TabPanel>
                <TabPanel>
                    <TabBox>
                        <Issuer/>
                    </TabBox>
                </TabPanel>
            </TabPanels>
        </Tabs>
    }
}

export default TabsMenu;