import AddVerifierModal from './modals/AddVerifierModal'
import { 
    SearchVerifierFromAddressController, 
    VerificationRecordCountController, 
    VerifierCountController, 
    AddVerificationModalController, 
    SearchVerificationRecordsController 
} from '../controllers';
import { Box, Heading, HStack } from '@chakra-ui/react';

export default function VerifierOnChain(){
    
    return (
        <Box id='main-container' className="with-navbar">
            <Heading as="h2" mb="1em">
                On-chain Verification
            </Heading>
            <HStack>
                <AddVerifierModal />
                <AddVerificationModalController />
            </HStack>
            <Box className="widget-box">
                <VerifierCountController />
                <VerificationRecordCountController />
            </Box>
            <SearchVerifierFromAddressController />
            <SearchVerificationRecordsController />
        </Box>
    );

}
