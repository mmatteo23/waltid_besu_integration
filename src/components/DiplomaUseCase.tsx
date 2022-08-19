
import { Box, Divider, Flex, VStack } from "@chakra-ui/react";
import { AcceptNewDiplomaRequestController, ConsumeTokenController } from "../controllers";
import Nav from "./Nav";

export function DiplomaUseCase(){
    
    return (
        <VStack>
            <Nav/>
            <Box id='main-container'>
                <AcceptNewDiplomaRequestController />
                <Divider m={8} />
                <ConsumeTokenController />
            </Box>
        </VStack>
    )

}


export default DiplomaUseCase;