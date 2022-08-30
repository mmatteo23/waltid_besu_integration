import { CheckIcon } from '@chakra-ui/icons';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Text,
    FormControl,
    FormLabel,
    Textarea,
    Box,
    HStack,
    Select,
    Input,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { Custodian, Auditor, Signatory, utils } from 'ssikit-sdk';
import axios from 'axios';
import * as jose from 'jose';
import { Buffer } from "buffer";

export default function VerifyCredentialsModal(props: {policiesToUse: string[]}) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [credentialsToVerify, setCredentialsToVerify] = useState<string>("[\n\n]");
    const [result, setResult] = useState<string>("");
    const [verified, setVerified] = useState<boolean>(false);
    const [keys, setKeys] = useState<utils.Key[]>([]);
    const [subject, setSubject] = useState<string>("");
    const [verifierKey, setVerifierKey] = useState<string>("");
    const [expiration, setExpiration] = useState<string>("");
    const [error, setError] = useState<string>("");

    const checkIfCredsRevoked = async (credentials: any[]) => {
        let revoked = await Promise.all(credentials.map(async cred => {
            if (cred?.credentialStatus && cred?.credentialStatus?.type === "SimpleCredentialStatus2022") {
                let id = cred?.credentialStatus?.id
                let index = id?.indexOf("/revocations/")
                let token = ""
                if (index !== -1) {
                    token = id?.substring(index + "/revocations/".length)
                }
                let isRevoked = (await Signatory.isRevoked(token)).isRevoked;
                if (isRevoked) {
                    return cred
                }
            }
        }));
        return revoked;
    }

    const checkIfValid = async (event: any) => {
        event.preventDefault();
        try {
            let credentials: any[] = JSON.parse(credentialsToVerify);
            let revoked = await checkIfCredsRevoked(credentials);
            if (revoked.some(cred => cred !== undefined)) {
                throw new Error("Error: one or more credentials are revoked")
            } else {
                if (props.policiesToUse.length !== 0 && credentialsToVerify !== "[\n\n]") {
                    let policies = props.policiesToUse.map(policy => {
                        return { policy: policy };
                    });
                    let request: utils.VerificationRequest = {
                        credentials,
                        policies
                    };
                    let result = await Auditor.verifyCredential(request);
                    if (result) {
                        setResult(JSON.stringify(result, null, 4));
                        result?.valid ? setVerified(true) : setVerified(false);
                    } else {
                        setError("Error: couldn't verify credentials (probably not valid)")
                    }
                }
            }
        } catch (error) {
            alert(error);
        }
    };

    interface signatureRequest {
        keyId: string;
        message: string;
    }

    interface verificationRequest {
        verifierDid: string;
        message: jose.GeneralJWSInput;
    }

    const registerVerificationRecord = async (e:any) => {
        e.preventDefault();
        let messageString = JSON.stringify({
            subject: subject,
            expiration: expiration,
            jsonResult: JSON.parse(result),
            useCase: "diploma"
        });
        let encoded = Buffer.from(messageString).toString('base64');
        const request: signatureRequest = {
            keyId: verifierKey,
            message: encoded
        }
        let signature = (await axios.post("/createSignature", {data:request})).data;
        const verifyRequest: verificationRequest = {
            verifierDid: "did:ebsi:zzavU6gDCnf4U3bX2gfn6qs",
            message: signature
        }
        let verify = (await axios.post("/verifySignature", {data:verifyRequest})).data;
        let decoded = Buffer.from(verify, 'base64').toString('ascii');
        console.log(JSON.stringify(JSON.parse(decoded),null,4))
    }

    const reset = () => {
        setCredentialsToVerify("[\n\n]");
    }

    const initKeys = async () => {
        let keys = await Custodian.getKeys();
        setKeys(keys);
        setVerifierKey(keys[0].keyId.id);
    }

    useEffect(() => {
        setCredentialsToVerify("[\n\n]");
        setResult("");
        setError("");
        setVerified(false);
        initKeys();
    }, [isOpen]);

    useEffect(() => {
        setError("");
        setResult("");
        setVerified(false);
    }, [credentialsToVerify]);

    return (
        <>
            <Button isDisabled={props.policiesToUse.length===0}
                onClick={onOpen} leftIcon={<CheckIcon/>} colorScheme='orange' variant='solid' alignSelf='right' mr='1em'
            >
                Verify Credentials
            </Button>

            <Modal size="2xl" blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Verify credentials</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={registerVerificationRecord}>
                        <ModalBody>
                            <FormControl isRequired>
                                <FormLabel>Credential(s) to verify (VCs/VPs)</FormLabel>
                                <Text mb="0.5em">Paste here your VC, VP or list of them separated with comma:</Text>
                                <Textarea
                                    value={credentialsToVerify}
                                    onChange={(e) => setCredentialsToVerify(e.target.value)}
                                    h='15em'
                                    variant="filled"
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter display="flex" flexDir="column">
                            <HStack w="100%">
                                {error && <Text mr="auto" color="red.200">{error}</Text>}
                                <Box mr="auto">
                                    {
                                        !error &&
                                        <Button onClick={reset} size='sm' colorScheme='orange'>
                                            Reset
                                        </Button>
                                    }
                                </Box>
                                <Box ml="auto">
                                    <Button onClick={checkIfValid} size='sm' colorScheme='green'>
                                        Verify
                                    </Button>
                                </Box>
                            </HStack>
                            <Box w="100%">
                                <FormControl isRequired>              
                                    <FormLabel mt='2em'>Verification result:</FormLabel>
                                    <Textarea isDisabled={result.length===0}
                                        mt='0.5em' mb="1em" 
                                        height="15em" value={result} variant="filled"
                                    />
                                </FormControl>
                            </Box>
                            <Box w="100%">
                                <FormControl isRequired>
                                    <FormLabel mt="1em">Subject address</FormLabel>
                                    <Input
                                        isDisabled={!verified}
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className="monospace"
                                        w="60%"
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel mt="1em">Key linked to the Verifier DID</FormLabel>
                                    <Select
                                        isDisabled={!verified}
                                        value={verifierKey}
                                        onChange={(e) => setVerifierKey(e.target.value)}
                                        className="monospace"
                                        w="60%"
                                    >
                                        {keys.map(myKey => {
                                            return <option className="monospace" key={myKey.keyId.id} value={myKey.keyId.id}>
                                                {myKey.keyId.id}
                                            </option>
                                        })}
                                    </Select>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel mt="1em">Expiration date</FormLabel>
                                    <Input type="date"
                                        isDisabled={!verified}
                                        value={expiration}
                                        onChange={(e) => setExpiration(e.target.value)}
                                        className="monospace"
                                        w="60%"
                                    />
                                </FormControl>
                            </Box>
                            <HStack ml="auto" mt="1.5em">
                                <Button onClick={onClose} size='md' colorScheme='red' mr={3}>
                                    Close
                                </Button>
                                <Button type="submit" isDisabled={!verified}
                                    size='md' colorScheme='green' 
                                >
                                    Register On-chain
                                </Button>
                            </HStack>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}