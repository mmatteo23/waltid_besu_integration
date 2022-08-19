
import { VStack } from '@chakra-ui/react';
import { 
    SearchTrustedContractFromAddressController,
    AddTrustedContract
} from '../controllers';
import Nav from './Nav';

export function TrustedContracts(){
    
    return (
        <VStack>
            <Nav/>
            <VStack id='main-container'>
                <AddTrustedContract />
                <SearchTrustedContractFromAddressController />
            </VStack>
        </VStack>
    )

}


export default TrustedContracts;