import { Button, useDisclosure } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { AddTrustedContractModalController } from ".";

const AddTrustedContract = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button onClick={onOpen} leftIcon={<FaPlus />} colorScheme='green' variant='solid' alignSelf='right'>
                Register contract
            </Button>

            <AddTrustedContractModalController isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </>
    )
}

export default AddTrustedContract;