import AddVerifierModal from './modals/AddVerifierModal'

import { VerificationRecordCountController, VerifierCountController } from '../controllers';
import { AddVerificationModalController, GetVerifierFromAddressController, SearchVerificationRecordsController } from '../controllers';

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
            <VerificationRecordsController />
        */}
        <div>
            <AddVerificationModalController />
            <SearchVerificationRecordsController />
        </div>
    </>;

}


export default Verifier