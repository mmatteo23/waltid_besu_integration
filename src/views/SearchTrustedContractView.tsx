

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
import { TrustedContractItemController, VerifierItemController } from "../controllers";

const SearchTrustedContractView = ({ 
    contractInfo, 
    setContractAddress, 
}: {
    contractInfo: Result | undefined,
    setContractAddress: (arg0: string) => void
}) => {
    return (
        <Box width="100%" mr="auto">
            <Heading as='h2' size='xl' mt="1em">Search a Trusted Contract by Address</Heading>
            <Box width="33%" mt="2em" mb="2em">
                <FormControl>
                    <FormLabel htmlFor="address">Address:</FormLabel>
                    <Input name="address" variant='filled' placeholder='0x123...' onChange={event =>
                        setContractAddress(event.currentTarget.value)
                    } />
                </FormControl>
            </Box>
            
            {contractInfo ?
                <Box mb="1em">
                    <ul>
                        <TrustedContractItemController contractInfo={contractInfo} index={1} />
                    </ul>
                </Box>
                : null
            }
        </Box>
    )
};

export default SearchTrustedContractView;