import AddVerifierModal from './modals/AddVerifierModal'
import { 
    SearchVerifierFromAddressController, 
    VerificationRecordCountController, 
    VerifierCountController, 
    AddVerificationModalController, 
    SearchVerificationRecordsController 
} from '../controllers';
import { Box, HStack, VStack } from '@chakra-ui/react';

export function Verifier(){
    
    return (
            <VStack id='main-container'>
                <HStack mr="auto">
                    <AddVerifierModal />
                    <AddVerificationModalController />
                </HStack>
                <Box className="widget-box">
                    <VerifierCountController />
                    <VerificationRecordCountController />
                </Box>
                <SearchVerifierFromAddressController />
                <SearchVerificationRecordsController />
            </VStack>
    );

}


export default Verifier