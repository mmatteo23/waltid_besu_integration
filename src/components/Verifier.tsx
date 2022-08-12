import AddVerifierModal from './AddVerifierModal'

import { VerificationRecordCountController, VerifierCountController } from '../controllers';
import AddVerificationModal from '../controllers/AddVerificationModal';
import GetVerifierFromAddressController from '../controllers/GetVerifierFromAddress';
import GetVerificationRecordsController from '../controllers/GetVerificationRecords';


export function Verifier(){
    
    return <>
        <AddVerifierModal />
        <div className="widget-box">
            <VerifierCountController />
            <VerificationRecordCountController />
        </div>
        <GetVerifierFromAddressController />
        {/*
        <MyDidTable columns={["Address", "DID", "Url", "Signer", "Action"]} data={verifiers} caption="Table of verifiers" />
        */}
        <div>
            <AddVerificationModal />
            <GetVerificationRecordsController />
        </div>
    </>;

}


export default Verifier