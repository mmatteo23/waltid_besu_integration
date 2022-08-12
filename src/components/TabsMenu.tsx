
import {
    Tabs, TabList, TabPanels, Tab, TabPanel, Button,
    Select, Box,
} from '@chakra-ui/react'
import { Component } from 'react'
import { TabBox } from './TabBox'
import { Holder } from './Holder'
import { Issuer } from './Issuer'
import { Verifier } from './Verifier'
class TabsMenu extends Component {
    render() {
        return <Tabs isFitted size='lg'>
            <TabList mb='1em'>
                <Tab>Holder</Tab>
                <Tab>Issuer/Revoker</Tab>
                <Tab>Verifier</Tab>
                <Tab>Trusted Contracts</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <TabBox>
                        <Holder/>
                    </TabBox>
                </TabPanel>
                <TabPanel>
                    <TabBox>
                        <Issuer/>
                    </TabBox>
                </TabPanel>
                <TabPanel>
                    <TabBox>
                        <Verifier/>
                    </TabBox>
                </TabPanel>
            </TabPanels>
        </Tabs>
    }
}

export default TabsMenu;