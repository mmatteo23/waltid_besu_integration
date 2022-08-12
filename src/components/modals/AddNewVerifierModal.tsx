import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Select,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react'
import { Bytes, ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import useVerificationRegistry from '../../hooks/useVerificationRegistry';
import useVerificationRegistryData from '../../hooks/useVerificationRegistryData';

export function AddNewVerifierModal(props: {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
}) {

    const [contract, { addVerifier }] = useVerificationRegistry();
    const [ vr_address, vr_abi] = useVerificationRegistryData();
    const { address, isConnecting, isDisconnected } = useAccount();

    const [inputName, setName] = useState('');
    const [did, setDid] = useState('');
    const [url, setUrl] = useState('');
    const [inputAddress, setAddress] = useState('');

    const verifierInfo: IVerifier = {
        name: ethers.utils.formatBytes32String(inputName),
        did: did,
        url: url,
        signer: address
    }
    //console.log(verifierInfo)
    const { config } = usePrepareContractWrite({
        addressOrName: vr_address,
        contractInterface: vr_abi,
        functionName: 'addVerifier',
        args: [inputAddress, verifierInfo]
    })

    const { data, isLoading, isSuccess, write } = useContractWrite(config)

    const handleSubmit = (event: any) => {
        event.preventDefault();

        console.log(JSON.stringify(data));
    };

    return <Modal blockScrollOnMount={false} isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Please provide the following fields:</ModalHeader>
            <ModalCloseButton />

            <form method='post' onSubmit={handleSubmit}>
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
                </ModalBody>

                <ModalFooter>
                    <Button size='sm' colorScheme='red' mr={3} onClick={props.onClose}>
                        Close
                    </Button>
                    <Button type='submit' size='sm' colorScheme='green' disabled={!write} onClick={() => write?.()}>Confirm</Button>
                </ModalFooter>
            </form>

        {isLoading && <div>Check Wallet!</div>}
        {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
        </ModalContent>
    </Modal>
}

export default AddNewVerifierModal;