import { Button, useDisclosure } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const AddVerificationModalView = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    return (
        <>
            <Button onClick={onOpen} leftIcon={<FaPlus />} colorScheme='green' variant='solid' alignSelf='right' className='addButton'>
                New Verifier
            </Button>

        </>
    )
};


export default AddVerificationModalView;