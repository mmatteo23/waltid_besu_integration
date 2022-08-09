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
    Select,
    FormControl,
    FormLabel,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa';

export function AddKeyModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [algorithm, setAlgorithm] = useState('');

    const handleSubmit = (event: any) => {
        event.preventDefault();
        var target = (event.target as HTMLInputElement).value
        console.log(target, event, algorithm)
        alert(`Lavati la faccia fai qualcosa, hai scelto ${algorithm}`);
    };

    return (
        <>
            <Button onClick={onOpen} leftIcon={<FaPlus />} colorScheme='green' variant='solid' alignSelf='right' className='addButton'>
                Generate Key
            </Button>

            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Please select an algoritm:</ModalHeader>
                    <ModalCloseButton />
                    <form method='post' onSubmit={handleSubmit}>
                        <ModalBody>
                                <FormControl isRequired>
                                    <FormLabel>Algorithm</FormLabel>
                                    <Select
                                        variant='filled' 
                                        mt='1em' 
                                        name='algorithm'
                                        onChange={ event => setAlgorithm(event.currentTarget.value)}
                                        placeholder='Select algorithm'
                                    >
                                        <option value='1'>Martino</option>
                                        <option value='2'>Alberati</option>
                                        <option value='3'>Samuele</option>
                                    </Select>
                                </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button size='sm' colorScheme='red' mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button type='submit' size='sm' colorScheme='green'>Generate</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}