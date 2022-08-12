import { DeleteIcon } from '@chakra-ui/icons';
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
    IconButton,
} from '@chakra-ui/react'
import { Custodian, utils } from 'ssikit-sdk';

export function DeleteKeyModal(props: {keyToDelete: utils.IKey, updateKeys: Promise<void>}) {

    const custodian = Custodian.Custodian;

    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            await custodian.deleteKey(props.keyToDelete);
            await props.updateKeys;
            onClose();
        } catch (error) {
            alert(error);
        }
    };

    return (
        <>
            <IconButton
                onClick={onOpen}
                colorScheme='red'
                aria-label='Delete key'
                size='sm'
                icon={<DeleteIcon/>}
            />
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>ATTENTION:</ModalHeader>
                    <ModalCloseButton/>
                    <form method='post' onSubmit={handleSubmit}>
                        <ModalBody>
                            <Text>Are you sure you want to delete this key?</Text>
                            <Text>This action is not reversible.</Text>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={onClose} size='sm' colorScheme='green' mr={3}>
                                Abort
                            </Button>
                            <Button onClick={onClose} type='submit' size='sm' colorScheme='red'>
                                Delete Key
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}