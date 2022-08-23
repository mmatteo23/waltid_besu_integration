import { Box, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { PoliciesTable } from './PoliciesTable';
import { Auditor, utils } from 'ssikit-sdk';

export default function VerifierOffChain(){

    const [policies, setPolicies] = useState<utils.VerificationPolicy[]>([]);

    const updatePolicies = async () => {
        let policies = await Auditor.getVerificationPolicies();
        setPolicies(policies.reverse());
    }

    useEffect(() => {
        updatePolicies();
    }, []);
    
    return (
        <Box id='main-container' className="with-navbar">
           <Heading as="h2" mb="1em">
                Off-chain Verification
            </Heading>
            <Heading as="h3" size="md" mb="1em">List of verification policies</Heading>
            <PoliciesTable data={policies} updatePolicies={updatePolicies()} caption='Verification Policies'/>
        </Box>
    );

}
