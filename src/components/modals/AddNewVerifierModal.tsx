import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react'
import { ethers } from 'ethers';
import { useState } from 'react'
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import useVerificationRegistryData from '../../hooks/useVerificationRegistryData';

export function AddNewVerifierModal(props: {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
}) {

    const [ vr_address, vr_abi] = useVerificationRegistryData();

    const [inputName, setName] = useState('');
    const [did, setDid] = useState('');
    const [url, setUrl] = useState('');
    const [inputAddress, setAddress] = useState('');
    const [proof, setProof] = useState('');

    const verifierInfo: IVerifier = {
        name: ethers.utils.formatBytes32String(inputName),
        did: did,
        url: url,
        signer: inputAddress,
        proof: proof
    }
    //console.log(verifierInfo)
    const { config } = usePrepareContractWrite({
        addressOrName: vr_address,
        contractInterface: vr_abi,
        functionName: 'addVerifier',
        enabled: (ethers.utils.isAddress(inputAddress)),
        args: [inputAddress, verifierInfo]
    })

    const { data, isLoading, isSuccess, write } = useContractWrite(config)

    return <Modal blockScrollOnMount={false} isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Please provide the following fields:</ModalHeader>
            <ModalCloseButton />

                <ModalBody>
                    <FormControl isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input variant='filled' mt='.2em' name='name' onChange={event =>
                            setName(event.currentTarget.value)}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel mt='.5em'>DID</FormLabel>
                        <Input variant='filled' mt='.2em' name='did' onChange={event =>
                            setDid(event.currentTarget.value)
                        } placeholder='did:example:123...'
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel mt='.5em'>Url</FormLabel>
                        <Input variant='filled' mt='.2em' name='url' onChange={event =>
                            setUrl(event.currentTarget.value)
                        } placeholder='https://example.com'
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel mt='.5em'>Address</FormLabel>
                        <Input variant='filled' mt='.2em' name='address' onChange={event =>
                            setAddress(event.currentTarget.value)
                        } placeholder='0x123...'
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel mt='.5em'>Proof</FormLabel>
                        <Input variant='filled' mt='.2em' name='address' onChange={event =>
                            setProof(event.currentTarget.value)
                        } placeholder='0x54af578786...'
                        />
                    </FormControl>

                    {isLoading && <p>Please check your wallet to complete the procedure...</p>}
                    {isSuccess && <p>Transaction hash: {JSON.stringify(data)}</p>}
                </ModalBody>

                <ModalFooter>
                    <Button size='sm' colorScheme='red' mr={3} disabled={isLoading} onClick={props.onClose}>
                        Close
                    </Button>
                    <Button isLoading={isLoading} loadingText="Confirming" size='sm' colorScheme='green' disabled={!write} onClick={() => write?.()}>Confirm</Button>
                </ModalFooter>

        </ModalContent>
    </Modal>
}

export default AddNewVerifierModal;