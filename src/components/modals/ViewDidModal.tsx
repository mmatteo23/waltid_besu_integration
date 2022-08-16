import { ViewIcon } from '@chakra-ui/icons';
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
    IconButton,
    RadioGroup,
    Radio,
    Stack,
    Textarea,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Custodian, utils } from 'ssikit-sdk';

export function ViewDidModal(props: {didToView: string}) {

    const custodian = Custodian.Custodian;

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ did, setDid ] = useState<string>(props.didToView);

    const loadDid = async () => {
        try {
            let didData = await custodian.getDID(props.didToView);
            setDid(JSON.stringify(didData, null, 4));
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        loadDid();
    } , [isOpen]);

    return (
        <>
            <IconButton
                onClick={onOpen}
                colorScheme='blue'
                aria-label='View DID'
                size='sm'
                icon={<ViewIcon/>}
                mr='1em'
            />
            <Modal size="full" blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>View DID</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Textarea height="50em" value={did} variant="filled"/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose} size='sm' colorScheme='red' mr={3}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}