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
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BiImport } from 'react-icons/bi';
import { Custodian } from 'ssikit-sdk';

export function ImportKeyModal(props: {updateKeys: Promise<void>}) {

    const custodian = Custodian.Custodian;

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ keyToImport, setKeyToImport ] = useState<string>("");

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            await custodian.importKey(keyToImport as unknown as object);
            onClose();
            await props.updateKeys;
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        setKeyToImport("");
    } , [isOpen]);

    return (
        <>
            <Button onClick={onOpen} leftIcon={<BiImport/>} colorScheme='orange' variant='solid'>
                Import JWK Key
            </Button>

            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Import a key</ModalHeader>
                    <ModalCloseButton />
                    <form method='post' onSubmit={handleSubmit}>
                        <ModalBody>
                                <FormControl isRequired>
                                    <FormLabel>Key to import</FormLabel>
                                    <Textarea
                                        value={keyToImport}
                                        onChange={ e => setKeyToImport(e.target.value) }
                                        placeholder='Place here your key'
                                        size='sm'
                                    />
                                </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button onClick={onClose} size='sm' colorScheme='red' mr={3}>
                                Close
                            </Button>
                            <Button onClick={onClose} type='submit' size='sm' colorScheme='green'>
                                Import
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}