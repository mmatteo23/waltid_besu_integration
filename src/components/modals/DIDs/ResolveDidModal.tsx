import { SearchIcon } from '@chakra-ui/icons';
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
    IconButton,
    Textarea,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Custodian, utils } from 'ssikit-sdk';

// TODO
export default function ResolveDidModal() {

    const custodian = Custodian.Custodian;

    const { isOpen, onOpen, onClose } = useDisclosure()

    const loadDid = async () => {
        try {
            // let didData = await custodian.getDID(props.didToView);
            // setDid(JSON.stringify(didData, null, 4));
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        loadDid();
    } , [isOpen]);

    return (
        <>
            <Button onClick={onOpen} leftIcon={<SearchIcon/>} colorScheme='cyan' variant='solid'>
                Resolve DID
            </Button>

            <Modal size="full" blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Resolve DID</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Textarea height="50em" variant="filled"/>
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