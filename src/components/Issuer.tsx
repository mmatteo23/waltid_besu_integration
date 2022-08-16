import { 
    Select, Textarea, Heading, Input, Text, Button, Box,
} from '@chakra-ui/react';
import { useState, useEffect, ChangeEventHandler } from 'react';
import { Custodian, Signatory, utils } from "ssikit-sdk";

export function Issuer() {

    const signatory = Signatory.Signatory;
    const custodian = Custodian.Custodian;

    let [privateRevocationToken, setPrivateRevocationToken] = useState<string>("");
    let [publicRevocationToken, setPublicRevocationToken] = useState<string>("");

    let emptyProofConfig: any = new utils.ProofConfig("", "", undefined, "", "", "", "", "", "", "", "", "", "");
    emptyProofConfig =
        Object
            .keys(emptyProofConfig)
            .slice(3)
            .reduce((acc: any, field) => {
                acc[field] = "";
                return acc;
            } , {});

    let proofConfigDefault = JSON.stringify(emptyProofConfig, null, 2);
    let credentialDataDefault = JSON.stringify({
        credentialStatus: {
            id: `http://localhost:${utils.apiPortSignatory}/v1/revocations/${publicRevocationToken}}`, 
            type: "SimpleCredentialStatus2022"
        }
    }, null, 2)

    let [templates, setTemplates] = useState<string[]>([]);
    let [templateGet, setTemplateGet] = useState<string>("");
    let [templateForm, setTemplateForm] = useState<string>("");
    let [issuerDID, setIssuerDID] = useState<string>("");
    let [subjectDID, setSubjectDID] = useState<string>("");
    let [proofType, setProofType] = useState<utils.ProofType>("LD_PROOF");
    let [proofConfig, setProofConfig] = useState<string>(proofConfigDefault);
    let [credentialData, setCredentialData] = useState<string>(credentialDataDefault);
    let [issuedCredential, setIssuedCredential] = useState<string>("");

    const mySetVCTemplate = async (templateId: string) => {
        let template = await signatory.getVCTemplate(templateId);
        setTemplateGet(JSON.stringify(template, null, 4));
    }

    const initTemplates = async () => {
        let vcTemplates = await signatory.getVCTemplateIDs();
        setTemplates(vcTemplates);
        setTemplateForm(vcTemplates[0]);
        await mySetVCTemplate(vcTemplates[0]);
    }

    const handleInputChangeGetTemplate = async (e: any) => {
        let index = e.target.selectedIndex;
        let templateId = templates[index];
        setTemplateForm(templateId);
        await mySetVCTemplate(templateId);
    }

    const selectTemplate = (onChangeHandlder?: ChangeEventHandler<HTMLSelectElement>) => {
        return (
            <Select 
                w='50%'
                mt='0.5em'
                onChange={onChangeHandlder}
                variant="filled"
            >
                {templates.map((template, index) => (
                    <option key={index} value={template}>{template}</option>
                ))}
            </Select>
        );
    }

    const createRevocationTokens = () => {
        let privateToken = utils.createBaseToken();
        setPrivateRevocationToken(privateToken);
        let publicToken = utils.deriveRevocationToken(privateToken);
        setPublicRevocationToken(publicToken);
    }

    const issueCredential = async () => {
        let pcfields = JSON.parse(proofConfig);
        let proofConfigField = new utils.ProofConfig(
            issuerDID, subjectDID, proofType, 
            pcfields.verifierDid, pcfields.issuerVerificationMethod,
            pcfields.domain, pcfields.nonce,
            pcfields.proofPurpose, pcfields.credentialId,
            pcfields.issueDate, pcfields.validDate,
            pcfields.expirationDate, pcfields.dataProviderIdentifier            
        );
        let credentialDataField = JSON.parse(credentialData)
        let request = new utils.IssueCredentialRequest(
            templateForm,
            proofConfigField,
            credentialDataField,
        );
        let issuedCredential = await signatory.issueCredential(request);
        setIssuedCredential(JSON.stringify(issuedCredential, null, 4));
    }

    const createDIDs = async () => {
        let issuerKey = await custodian.generateKey("ECDSA_Secp256k1");
        let issuerDID = await custodian.createDID("key", issuerKey);
        let subjectKey = await custodian.generateKey("ECDSA_Secp256k1");
        let subjectDID = await custodian.createDID("key", subjectKey);
        setIssuerDID(issuerDID);
        setSubjectDID(subjectDID);
    }

    useEffect(() => {
        initTemplates();
    } ,[])

    useEffect(() => {
        setCredentialData(credentialDataDefault)
    } ,[publicRevocationToken])

    return (
        <>
            <Box id='IssueCredential' mb='2em' display='flex'>
                <Box id='IssueCredentialForm' float='left' w='100%' mr='1em'>
                    <Heading as='h3' mb='0.5em'>
                        Issue a credential
                    </Heading>
                    <Text mt='1em'>* Select Template ID:</Text>
                    {selectTemplate(handleInputChangeGetTemplate)}
                    <Button onClick={() => createDIDs()}
                        colorScheme='blue' mt='1em' w='8em' size='lg'
                    >
                        Create DIDs
                    </Button>
                    <Text mt='1em'>* Your DID:</Text>
                    <Input 
                        value={issuerDID}
                        onChange={(e) => setIssuerDID(e.target.value)}
                        placeholder='did:example:123456789' 
                        mt='0.5em' width='50%'
                        variant="filled"
                    />
                    <Text mt='1em'>* Subject DID:</Text>
                    <Input 
                        value={subjectDID}
                        onChange={(e) => setSubjectDID(e.target.value)}
                        placeholder='did:example:123456789' 
                        mt='0.5em'width='50%'
                        variant="filled"
                    />
                    <Text mt='1em'>* Select a Proof Type:</Text>
                    <Select
                        value={proofType}
                        onChange={(e) => setProofType(e.target.value as utils.ProofType)}
                        w='50%' mt='0.5em'
                        variant="filled"
                    >
                        <option value='LD_PROOF'>LD_PROOF</option>
                        <option value='JWT'>JWT</option>
                    </Select>
                    <Text mt='1em'>Proof Config parameters:</Text>
                    <Textarea
                        value={proofConfig}
                        onChange={(e) => setProofConfig(e.target.value)}
                        mt='0.5em' h='21em'
                        variant="filled"
                    />
                    <Text mt='1em'>Enable CredentialStatus (for revocations):</Text>
                    <Button onClick={() => createRevocationTokens()}
                        mt='0.5em'
                    >
                        Create revocation tokens
                    </Button>
                    <Input 
                        isReadOnly 
                        value={privateRevocationToken}
                        placeholder='Your private revocation token (save it)'
                        isDisabled={privateRevocationToken?false:true}
                        mt='0.5em'
                        variant="filled"
                    />
                    <Textarea
                        value={credentialData}
                        onChange={(e) => setCredentialData(e.target.value)}
                        mt='0.5em' h='20em'
                        variant="filled"
                    />
                </Box>
                <Box id='IssuedCredential' float='right' w='100%' ml='1em'>
                    <Heading as='h3' mb='0.5em'>
                        Selected template
                    </Heading>
                    <Textarea defaultValue={templateGet}
                        mt='0.5em' h='30em'
                        variant="filled"
                    />
                    <Heading as='h3' mb='0.5em' mt='1em'>
                        Issued credential:
                    </Heading>
                    <Textarea defaultValue={issuedCredential} variant="filled" h='47%'/>
                </Box>
            </Box>
            <Box display='flex'>
                <Button onClick={() => issueCredential()}
                    colorScheme='blue' display='block' mb='3em' mr='1em' w='8em' size='lg'
                >
                    Issue
                </Button>
            </Box>
        </>
    );
}
