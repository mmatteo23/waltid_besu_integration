
import { 
    SearchTrustedContractFromAddressController,
    AddTrustedContract
} from '../controllers';

export function TrustedContracts(){
    
    return <>
        <AddTrustedContract />
        <SearchTrustedContractFromAddressController />
    </>;

}


export default TrustedContracts;