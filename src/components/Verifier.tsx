import { Navigate, Route, Routes } from 'react-router-dom';
import SideNav from './SideNav';
import VerifierOnChain from './VerifierOnChain';
import VerifierOffChain from './VerifierOffChain';

export default function Issuer() {

    const links: {[key: string]: string;} = {
        "verifier-offchain": "Off-Chain",
        "verifier-onchain": "On-Chain"
    }

    return (
        <Routes>
            <Route path="/" element={<SideNav links={links}/>}>
                <Route path="*" element={<Navigate to="verifier-offchain" replace={true} />}/>
                <Route path="" element={<Navigate to="verifier-offchain" replace={true} />} />
                <Route path="verifier-offchain" element={<VerifierOffChain />} />
                <Route path="verifier-onchain" element={<VerifierOnChain />}/>
            </Route>
        </Routes>
    );
}
