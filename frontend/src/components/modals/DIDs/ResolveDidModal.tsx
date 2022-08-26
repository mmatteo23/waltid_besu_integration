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
    FormControl,
    FormLabel,
    Input,
    Box,
    Text,
    Textarea,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Custodian } from 'ssikit-sdk';

export default function ResolveDidModal() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ didToResolve, setDidToResolve ] = useState<string>("");
    const [ resolvedDid, setResolvedDid ] = useState<string>("");

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            let resolved = await Custodian.resolveDID(didToResolve);
            setResolvedDid(JSON.stringify(resolved, null, 4));
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        setDidToResolve("");
        setResolvedDid("");
    } , [isOpen]);

    return (
        <>
            <Button onClick={onOpen} leftIcon={<SearchIcon/>} colorScheme='cyan' variant='solid'>
                Resolve DID
            </Button>

            <Modal size="xl" blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Resolve DID</ModalHeader>
                    <ModalCloseButton />
                    <form method='post' onSubmit={handleSubmit}>
                        <ModalBody>
                            <FormControl isRequired>
                                <FormLabel>DID to resolve:</FormLabel>
                                <Input
                                    variant="filled" 
                                    placeholder='did:example:123456789abcdefghi'
                                    name='webDomain'
                                    onChange={ e => setDidToResolve(e.currentTarget.value) }
                                    value={didToResolve}
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter display="flex" flexDir="column">
                            <Box ml="auto">
                                <Button onClick={onClose} size='sm' colorScheme='red' mr={3}>
                                    Close
                                </Button>
                                <Button type='submit' size='sm' colorScheme='green'>
                                    Resolve
                                </Button>
                            </Box>
                            <Box w="100%">                         
                                <Text mt='2em'>Resolved DID:</Text>
                                <Textarea isDisabled={resolvedDid.length===0}
                                    mt='0.5em' mb="1em" 
                                    height="15em" value={resolvedDid} variant="filled"
                                />
                            </Box>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}