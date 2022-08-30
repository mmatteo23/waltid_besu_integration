import {
    FormControl, FormLabel, Input,
    Box,
    Heading,
    Text,
    Flex,
    Stack
} from "@chakra-ui/react";
import { Result } from "ethers/lib/utils";
import { VerifierItemController } from "../controllers";

const ShowVerifiersView = ({
    verifiers,
    setVerifierAddress,
    setFilterDid
}: {
    verifiers: IVerifier[] | undefined,
    setVerifierAddress: (arg0: string) => void,
    setFilterDid: (arg0: string) => void
}) => {
    return (
        <Box width="100%" mr="auto">
            <Heading as='h2' size='xl' mt="1em">On-Chain Verifiers</Heading>
            <Text fontSize="2xl">Search a verifier</Text>
            <Stack mb="2em" spacing="1em" direction="row">
                <FormControl>
                    <FormLabel htmlFor="address">Address:</FormLabel>
                    <Input name="address" variant='filled' placeholder='0x123...' onChange={event =>
                        setVerifierAddress(event.currentTarget.value)
                    } />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="did">DID:</FormLabel>
                    <Input name="did" variant='filled' placeholder='did:key:12...' onChange={event =>
                        setFilterDid(event.currentTarget.value)
                    } />
                </FormControl>
            </Stack>

            <ul>
                {
                    verifiers?.length ? (
                        verifiers.map((verifier, index) => {
                            return <VerifierItemController verifier={verifier} key={index} />
                        })
                    )
                    : <p>Seems there are no verifiers</p>
                }
            </ul>
        </Box>
    )
};

export default ShowVerifiersView;