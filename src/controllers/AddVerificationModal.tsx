
import { Button, FormControl, FormLabel, Input, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";
import useVerificationRegistryData from "../hooks/useVerificationRegistryData";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { FaPlus } from "react-icons/fa";


const AddVerificationModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [schema, setSchema] = useState('');
    const [subject, setSubject] = useState('');
    const [expiration, setExpiration] = useState('');

    const signature = ""

    const [vr_address, vr_abi] = useVerificationRegistryData();

    const { config } = usePrepareContractWrite({
        addressOrName: vr_address,
        contractInterface: vr_abi,
        functionName: 'registerVerification',
        args: [{schema, subject, expiration}, signature]
    })

    const { data, isLoading, isSuccess, write } = useContractWrite(config)

    const handleSubmit = (event: any) => {
        event.preventDefault();

        //console.log(JSON.stringify(data));
    };

    return (
        <>
            <Button mt="1em" onClick={onOpen} leftIcon={<FaPlus />} colorScheme='blue' variant='solid' alignSelf='right' className='addButton'>
                New Verification
            </Button>

            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Please provider the following fields</ModalHeader>
                    <ModalCloseButton />

                    <form method='post' onSubmit={handleSubmit}>
                        <ModalBody>
                            <FormControl isRequired>
                                <FormLabel>Schema</FormLabel>
                                <Input variant='filled' mt='.2em' name='schema' onChange={event =>
                                    setSchema(event.currentTarget.value)}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel mt='.5em'>Subject</FormLabel>
                                <Input variant='filled' mt='.2em' name='subject' onChange={event =>
                                    setSubject(event.currentTarget.value)
                                } placeholder='0x123...'
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel mt='.5em'>Expiration Date</FormLabel>
                                <Input type="datetime-local" variant='filled' mt='.2em' name='expiration' onChange={event =>
                                    setExpiration(event.currentTarget.value)
                                }
                                />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button size='sm' colorScheme='red' mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button type='submit' size='sm' colorScheme='green' disabled={!write} onClick={() => write?.()}>Confirm</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
};

export default AddVerificationModal;