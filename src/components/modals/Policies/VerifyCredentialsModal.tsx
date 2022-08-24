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
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { Auditor, utils } from 'ssikit-sdk';

export default function VerifyCredentialsModal(props: {policiesToUse: string[]}) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [credentialsToVerify, setCredentialsToVerify] = useState<string>("[\n\n]");
    const [result, setResult] = useState<string>("");

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
                setResult(JSON.stringify(result, null, 4));
            }
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        setCredentialsToVerify("[\n\n]");
    }, [isOpen]);

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
                                    h='20em'
                                    variant="filled"
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter display="flex" flexDir="column">
                            <Box ml="auto">
                                <Button onClick={onClose} size='sm' colorScheme='red' mr={3}>
                                    Close
                                </Button>
                                <Button type='submit' size='sm' colorScheme='green'>
                                    Verify
                                </Button>
                            </Box>
                            <Box w="100%">                         
                                <Text mt='2em'>Verification result:</Text>
                                <Textarea isDisabled={result.length===0}
                                    mt='0.5em' mb="1em" 
                                    height="15em" value={result} variant="filled"
                                />
                            </Box>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}