import { useState, useEffect } from 'react';
import { Custodian, utils } from "ssikit-sdk";
import { Navigate, Route, Routes } from 'react-router-dom';
import Keys from './Keys';
import Dids from './Dids';
import Credentials from './Credentials';
import NavHolder from './NavHolder';

export default function Holder() {

    const custodian = Custodian.Custodian;

    const [keys, setKeys] = useState<utils.Key[]>([]);
    const [dids, setDids] = useState<string[]>([]);
    const [vcs, setVcs] = useState<string[]>([]);
    const [vcsToPresent, setVcsToPresent] = useState<string[]>([]);
    
    const updateKeys = async () => {
        let keys = await custodian.getKeys();
        setKeys(keys.reverse());
    }

    const updateDids = async () => {
        let dids = await custodian.getDIDs();
        setDids(dids.reverse());
    }

    const updateVcs = async () => {
        let vcs = await custodian.getCredentialIDs();
        setVcs(vcs.reverse());
    }

    useEffect(() => {
        updateKeys();
        updateDids();
        updateVcs();
    }, []);

    return (
        <Routes>
            <Route path="/" element={<NavHolder/>}>
                <Route path="*" element={<Navigate to="keys" replace={true} />}/>
                <Route path="" element={<Navigate to="keys" replace={true} />} />
                <Route path="keys" element={<Keys updateKeys={updateKeys} keys={keys} />}/>
                <Route path="dids" element={<Dids updateDids={updateDids} keys={keys} dids={dids} />} />
                <Route path="credentials" element={
                    <Credentials 
                        updateVcs={updateVcs}
                        dids={dids}
                        vcs={vcs}
                        vcsToPresent={vcsToPresent}
                        setVcsToPresent={setVcsToPresent}
                    />
                } />
            </Route>
        </Routes>
    );
}
