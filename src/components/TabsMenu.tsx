
import {
    Tabs, TabList, TabPanels, Tab, TabPanel, Button,
    Select, Box,
} from '@chakra-ui/react'
import { Component } from 'react'
import { TabBox } from './TabBox'
import { Holder } from './Holder'
import { Issuer } from './Issuer'
import { Verifier } from './Verifier'
import { TrustedContracts } from './TrustedContracts'
import DiplomaUseCase from './DiplomaUseCase'

class TabsMenu extends Component {
    render() {
        return <Tabs isFitted size='lg'>
            <TabList mb='1em'>
                <Tab>Holder</Tab>
                <Tab>Issuer/Revoker</Tab>
                <Tab>Verifier</Tab>
                <Tab>Trusted Contracts</Tab>
                <Tab>Diploma Use Case</Tab>
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
                {/*
                <TabPanel>
                    <TabBox>
                        <TrustedContracts/>
                    </TabBox>
                </TabPanel>
                <TabPanel>
                    <TabBox>
                        <DiplomaUseCase/>
                    </TabBox>
                </TabPanel>
                */}
            </TabPanels>
        </Tabs>
    }
}

export default TabsMenu;