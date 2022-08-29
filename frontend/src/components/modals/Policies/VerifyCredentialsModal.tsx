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
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { Auditor, utils } from 'ssikit-sdk';
import axios from 'axios';
import { Request } from 'express';

export default function VerifyCredentialsModal(props: {policiesToUse: string[]}) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [credentialsToVerify, setCredentialsToVerify] = useState<string>("[\n\n]");
    const [result, setResult] = useState<string>("");
    const [verified, setVerified] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            if (props.policiesToUse.length !== 0 && credentialsToVerify !== "[\n\n]") {
                let policies = props.policiesToUse.map(policy => {
                    return { policy: policy };
                });
                let credentials = JSON.parse(credentialsToVerify);
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
        } catch (error) {
            alert(error);
        }
    };

    interface signatureRequest {
        verifierDid: string;
        keyId: string;
        message: string;
    }

    const crypto = async () => {
        const data: signatureRequest = {
            message: "Hello Dio",
            verifierDid: "did:ebsi:zjj7Uqib2dZGU9vJSZFR9TG",
            keyId: "5e2ae8c7b65e4a26b3b860d43da6a732"
        }
        let result = await axios.post("/createSignature", {data:data});
        console.log(result.data)
    }

    const reset = () => {
        setCredentialsToVerify("[\n\n]");
    }

    useEffect(() => {
        setCredentialsToVerify("[\n\n]");
        setResult("");
        setError("");
        setVerified(false);
    }, [isOpen]);

    useEffect(() => {
        setError("");
        setResult("");
        setVerified(false);
    }, [credentialsToVerify]);

    useEffect(() => {
        crypto();
    }, []);

    return (
        <>
            <Button isDisabled={props.policiesToUse.length===0}
                onClick={onOpen} leftIcon={<CheckIcon/>} colorScheme='orange' variant='solid' alignSelf='right' mr='1em'
            >
                Verify Credentials
            </Button>

            <Modal size="xl" blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Verify credentials</ModalHeader>
                    <ModalCloseButton />
                    <form method='post' onSubmit={handleSubmit}>
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
                                    <Button onClick={onClose} size='sm' colorScheme='red' mr={3}>
                                        Close
                                    </Button>
                                    <Button type='submit' size='sm' colorScheme='green'>
                                        Verify
                                    </Button>
                                </Box>
                            </HStack>
                            <Box w="100%">                         
                                <Text mt='2em'>Verification result:</Text>
                                <Textarea isDisabled={result.length===0}
                                    mt='0.5em' mb="1em" 
                                    height="15em" value={result} variant="filled"
                                />
                            </Box>
                            <Box ml="auto">
                                <Button onClick={crypto} isDisabled={!verified}
                                    size='sm' colorScheme='green'
                                >
                                    Register On-chain
                                </Button>
                            </Box>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}