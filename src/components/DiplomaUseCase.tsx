
import { Divider } from "@chakra-ui/react";
import { AcceptNewDiplomaRequestController, ConsumeTokenController } from "../controllers";

export function DiplomaUseCase(){
    
    return <>
        <AcceptNewDiplomaRequestController />
        <Divider m={8} />
        <ConsumeTokenController />
    </>;

}


export default DiplomaUseCase;