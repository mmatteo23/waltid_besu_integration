import { 
    Select, Textarea, Heading, Input, Text, Editable, EditablePreview, EditableTextarea,
} from '@chakra-ui/react';
import { useState, useEffect, ChangeEventHandler } from 'react';
import { Signatory, utils } from "ssikit-sdk";

export function Issuer() {

    const signatory = Signatory.Signatory;

    let proofConfig = {
        verifierDid: '',
        issuerVerificationMethod: '',
    }
    const proofConfigTemplate = JSON.stringify(proofConfig, null, 2);
    let credentialData = {
        id: `http://localhost:${utils.apiPortSignatory}/v1/revocations/yourRevocationToken`, 
        type: "SimpleCredentialStatus2022"
    }
    const credentialDataTemplate = JSON.stringify(credentialData, null, 2);

    let [templates, setTemplates] = useState<string[]>([]);
    let [template, setTemplate] = useState<string>();

    const setVCTemplate = async (templateId: string) => {
        let template = await signatory.getVCTemplate(templateId);
        setTemplate(JSON.stringify(template, null, 4));
    }

    const setVCTemplates = async () => {
        let vcTemplates = await signatory.getVCTemplateIDs();
        setTemplates(vcTemplates);
        setVCTemplate(vcTemplates[0]);
    }

    let handleInputChangeGetTemplate = async (e: any) => {
        console.log(typeof e)
        let index = e.target.selectedIndex;
        let templateId = templates[index];
        await setVCTemplate(templateId);
    }

    const selectTemplate = (onChangeHandlder?: ChangeEventHandler<HTMLSelectElement>) => {
        return (
            <Select 
                w='25%'
                mt='0.5em'
                onChange={onChangeHandlder}
            >
                {templates.map((template, index) => (
                    <option key={index} value={template}>{template}</option>
                ))}
            </Select>
        );
    }

    useEffect(() => {
        setVCTemplates();
    } ,[])

    return (
        <>
            <Heading as='h3' mb='0.5em'>
                Get a VC Template
            </Heading>
            {selectTemplate(handleInputChangeGetTemplate)}
            <Textarea defaultValue={template}
                mt='0.5em' mb='3em' h='30em'
            />

            <Heading as='h3' mb='0.5em'>
                Issue a credential
            </Heading>
            <Text mt='1em'>* Select Template ID:</Text>
            {selectTemplate()}
            <Text mt='1em'>* Your DID:</Text>
            <Input placeholder='did:example:123456789' 
                mt='0.5em' width='25%'
            />
            <Text mt='1em'>* Subject DID:</Text>
            <Input placeholder='did:example:123456789' 
                mt='0.5em'width='25%'
            />
            <Text mt='1em'>* Select a Proof Type:</Text>
            <Select w='25%' mt='0.5em'>
                <option value='LD_PROOF'>LD_PROOF</option>
                <option value='JWT'>JWT</option>
            </Select>
            <Text mt='1em'>Other Proof Config parameters:</Text>
            <Textarea defaultValue={proofConfigTemplate}
                mt='0.5em' mb='3em' w='50%' h='8em'
            />
            <Text mt='1em'>Other Credential Data:</Text>
            <Textarea defaultValue={credentialDataTemplate}
                mt='0.5em' mb='3em' w='50%' h='8em'
            />
        </>
    );
}

