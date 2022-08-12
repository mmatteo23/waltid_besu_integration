import {
    Button,
    useDisclosure
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import AddNewVerifierModal from './modals/AddNewVerifierModal';

export function AddVerifierModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button onClick={onOpen} leftIcon={<FaPlus />} colorScheme='green' variant='solid' alignSelf='right'>
                New Verifier
            </Button>

            <AddNewVerifierModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </>
    )
}

export default AddVerifierModal;