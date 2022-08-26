import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Flex, Link, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { ethers } from "ethers";
import { Result } from "ethers/lib/utils";
import { FaPen } from "react-icons/fa";
import { UpdateVerifierModalController } from "../controllers";


const VerifierItemView = ({
    verifier,
    index,
    handleClickRemove, 
    isLoadingRemove, 
    isSuccessRemove,
    isPrepareRemoveError,
    isRemoveError,
    prepareRemoveError, 
    removeError,
}: {
    verifier: Result,
    index: number,
    handleClickRemove: () => void,
    isLoadingRemove: boolean,
    isSuccessRemove: boolean,
    isPrepareRemoveError: boolean,
    isRemoveError: boolean,
    prepareRemoveError: Error | null,
    removeError: Error | null
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return <li key={index} className="card-item">
        <Stack spacing="20px">
            <p>
                <Text fontSize='3xl'>{ethers.utils.parseBytes32String(verifier?.name)}</Text>
            </p>
            <p>
                <span className="fieldname">DID:</span> {verifier.did}
            </p>
            <p>
                <span className="fieldname">url:</span> <Link color='teal.500' href={verifier.url}>{verifier.url}</Link>
            </p>
            <p>
                <span className="fieldname">Signer:</span> {verifier.signer}
            </p>

            <ButtonGroup variant='outline' spacing='6' mt='1em'>
                <Button onClick={onOpen} leftIcon={<FaPen />} colorScheme='yellow' variant='solid' alignSelf='right'>
                    Update
                </Button>

                <UpdateVerifierModalController isOpen={isOpen} onOpen={onOpen} onClose={onClose} verifier={verifier} />

                <Button isLoading={isLoadingRemove} loadingText="Removing" leftIcon={<DeleteIcon />} colorScheme='red' variant='solid' onClick={() => {
                    handleClickRemove()
                }}>
                    Remove
                </Button>
                
            </ButtonGroup>
            {(isRemoveError) && (
                <Box bg="tomato" p={4} borderRadius="lg">Error: {(removeError)?.message}</Box>
            )}
        </Stack>
    </li>
};

export default VerifierItemView;