import AddVerifierModal from './modals/AddVerifierModal'

import { 
    SearchVerifierFromAddressController, 
    VerificationRecordCountController, 
    VerifierCountController, 
    AddVerificationModalController, 
    SearchVerificationRecordsController 
} from '../controllers';

export function Verifier(){
    
    return <>
        <AddVerifierModal />
        <div className="widget-box">
            <VerifierCountController />
            <VerificationRecordCountController />
        </div>
        <SearchVerifierFromAddressController />
        <AddVerificationModalController />
        <SearchVerificationRecordsController />
    </>;

}


export default Verifier