import {
    FormControl, FormLabel, Input,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    IconButton,
    Box,
    Heading,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { Result } from "ethers/lib/utils";
import { BiExport } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { VerifierItemController } from "../controllers";

const SearchVerifierView = ({ 
    verifier, 
    setVerifierAddress 
}: {
    verifier: Result | undefined,
    setVerifierAddress: (arg0: string) => void
}) => {
    return <>
        <Heading as='h2' size='xl' mt="1em">Search a Verifier by Address</Heading>
        <Box width="33%" mt="2em" mb="2em">
            <FormControl>
                <FormLabel htmlFor="address">Address:</FormLabel>
                <Input name="address" variant='filled' placeholder='0x123...' onChange={event =>
                    setVerifierAddress(event.currentTarget.value)
                } />
            </FormControl>
        </Box>
        
        {verifier ?
            <Box mb="1em">
                <ul>
                    <VerifierItemController verifier={verifier} index={1} />
                </ul>
            </Box>

            : null
        }
    </>;
};

export default SearchVerifierView;