
import MyDidTable from './MyDidTable';
import AddVerifierModal from './AddVerifierModal'

import useVerificationRegistry from '../hooks/useVerificationRegistry';
import { useEffect } from 'react';
import { VerificationRecordCountController, VerifierCountController } from '../controllers';
import AddVerificationModal from '../controllers/AddVerificationModal';

const verifier: IVerifier = {
    name: "Monokee",
    did: "did:web:123456",
    url: "https://monokee.it",
    signer: "0x123456789"
}

const verifiers: Array<IVerifier> = [verifier];

export function Verifier(){
    
    return <>
        <AddVerifierModal />
        <div className="widget-box">
            <VerifierCountController />
            <VerificationRecordCountController />
        </div>
        <MyDidTable columns={["Address", "DID", "Url", "Signer", "Action"]} data={verifiers} caption="Table of verifiers" />
        <div>
            <AddVerificationModal />
        </div>
    </>;

}


export default Verifier