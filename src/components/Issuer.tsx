import { 
    Select, Textarea, Heading, Input, Text, Button, Box,
} from '@chakra-ui/react';
import { useState, useEffect, ChangeEventHandler } from 'react';
import { Signatory, utils } from "ssikit-sdk";

export function Issuer() {

    const signatory = Signatory.Signatory;

    const proofConfigDefault = JSON.stringify({
        verifierDid: '',
        issuerVerificationMethod: '',
    }, null, 2);
    const credentialDataDefault = JSON.stringify({
        id: `http://localhost:${utils.apiPortSignatory}/v1/revocations/yourRevocationToken`, 
        type: "SimpleCredentialStatus2022"
    }, null, 2);

    let [templates, setTemplates] = useState<string[]>([]);
    let [templateGet, setTemplateGet] = useState<string>("");
    let [templateForm, setTemplateForm] = useState<string>("");
    let [issuerDID, setIssuerDID] = useState<string>("");
    let [subjectDID, setSubjectDID] = useState<string>("");
    let [proofType, setProofType] = useState<string>("LD_PROOF");
    let [proofConfig, setProofConfig] = useState<string>(proofConfigDefault);
    let [credentialData, setCredentialData] = useState<string>(credentialDataDefault);

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
        await mySetVCTemplate(templateId);
    }

    const selectTemplate = (onChangeHandlder?: ChangeEventHandler<HTMLSelectElement>) => {
        return (
            <Select 
                w='50%'
                mt='0.5em'
                onChange={onChangeHandlder}
            >
                {templates.map((template, index) => (
                    <option key={index} value={template}>{template}</option>
                ))}
            </Select>
        );
    }

    const issueCredential = async () => {
        console.table({
            templateForm,
            issuerDID,
            subjectDID,
            proofType,
            proofConfig,
            credentialData,
        });
    }

    useEffect(() => {
        initTemplates();
    } ,[])

    return (
        <>
            <Box mb='3em'>                
                <Heading as='h3' mb='0.5em'>
                    Get a VC Template
                </Heading>
                {selectTemplate(handleInputChangeGetTemplate)}
                <Textarea defaultValue={templateGet}
                    mt='0.5em' h='30em'
                />
            </Box>

            <Box mb='2em' display='flex'>
                <Box id='IssueCredentialForm' float='left' w='100%' mr='1em'>
                    <Heading as='h3' mb='0.5em'>
                        Issue a credential
                    </Heading>
                    <Text mt='1em'>* Select Template ID:</Text>
                    {selectTemplate((e) => setTemplateForm(e.target.value))}
                    <Text mt='1em'>* Your DID:</Text>
                    <Input 
                        value={issuerDID}
                        onChange={(e) => setIssuerDID(e.target.value)}
                        placeholder='did:example:123456789' 
                        mt='0.5em' width='50%'
                    />
                    <Text mt='1em'>* Subject DID:</Text>
                    <Input 
                        value={subjectDID}
                        onChange={(e) => setSubjectDID(e.target.value)}
                        placeholder='did:example:123456789' 
                        mt='0.5em'width='50%'
                    />
                    <Text mt='1em'>* Select a Proof Type:</Text>
                    <Select
                        value={proofType}
                        onChange={(e) => setProofType(e.target.value)}
                        w='50%' mt='0.5em'
                    >
                        <option value='LD_PROOF'>LD_PROOF</option>
                        <option value='JWT'>JWT</option>
                    </Select>
                    <Text mt='1em'>Other Proof Config parameters:</Text>
                    <Textarea
                        value={proofConfig}
                        onChange={(e) => setProofConfig(e.target.value)}
                        mt='0.5em' h='8em'
                    />
                    <Text mt='1em'>Other Credential Data:</Text>
                    <Textarea 
                        value={credentialData}
                        onChange={(e) => setCredentialData(e.target.value)}
                        mt='0.5em' h='8em'
                    />
                </Box>
                <Box id='TextAreaBox' float='right' w='100%' ml='1em'>
                    <Textarea defaultValue='Issued Credential' h='100%'/>
                </Box>
            </Box>

            <Button onClick={() => issueCredential()}
                colorScheme='blue' display='block' mt='1em' mb='3em' w='8em' size='lg'
            >
                Issue
            </Button>
        </>
    );
}

