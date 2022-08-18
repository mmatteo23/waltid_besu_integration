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
    FormControl,
    FormLabel,
    Textarea,
    Input
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BiExport } from 'react-icons/bi';
import { Custodian } from 'ssikit-sdk';

// TODO
export function PresentVcsModal(props: {updateVcs: Promise<void>}) {

    const custodian = Custodian.Custodian;

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ credentialAlias, setCredentialAlias ] = useState<string>("");
    const [ credentialToImport, setCredentialToImport ] = useState<string>("");

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            await custodian.storeCredential(credentialAlias, JSON.parse(credentialToImport));
            onClose();
            await props.updateVcs;
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        setCredentialAlias("");
        setCredentialToImport("");
    } , [isOpen]);

    return (
        <>
            <Button onClick={onOpen} leftIcon={<BiExport/>} colorScheme='cyan' variant='solid'>
                Present Credential(s)
            </Button>

            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Present one or more credentials</ModalHeader>
                    <ModalCloseButton />
                    <form method='post' onSubmit={handleSubmit}>
                        <ModalBody>
                                <FormControl isRequired>
                                    <FormLabel>Alias (name) of your credential</FormLabel>
                                    <Input 
                                        value={credentialAlias}
                                        onChange={ e => setCredentialAlias(e.target.value) }
                                        placeholder='E.g. Passport'
                                        variant="filled"
                                    />
                                    <FormLabel mt="1em">Credential to import</FormLabel>
                                    <Textarea
                                        value={credentialToImport}
                                        onChange={ e => setCredentialToImport(e.target.value) }
                                        placeholder='Place here your credential'
                                        size='sm'
                                        variant="filled"
                                    />
                                </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button onClick={onClose} size='sm' colorScheme='red' mr={3}>
                                Close
                            </Button>
                            <Button type='submit' size='sm' colorScheme='green'>
                                Import
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}