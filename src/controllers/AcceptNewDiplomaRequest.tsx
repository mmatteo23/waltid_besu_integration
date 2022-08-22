import { Button, Heading, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { AddTrustedContractModalController } from ".";
import useDiplomaIssuerManagerData from "../hooks/useDiplomaIssuerManagerData";
import { AcceptNewDiplomaRequestView } from "../views";

const AcceptNewDiplomaRequestController = () => {

    const tokenURI = "ipfs://QmW7aofc5AHLHQQ4V3kwojYPW316j7ybgGgx3Var2DJTvo";

    const [startRequest, setStartRequest] = useState(false);
    const [prepareErrorShort, setPrepareErrorShort] = useState("");

    // bypass pinata upload for now

    /***************************
     *      Contract Data
     **************************/

    const [contract_address, contract_abi, contract] = useDiplomaIssuerManagerData();

    const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
        ...contract,
        functionName: 'acceptNewDiplomaRequest',
        args: [tokenURI],
        onError(error) {
            setPrepareErrorShort(error.message.split('(reason="execution reverted: ')[1].split('", method')[0]);
            //throw (error)
        },
    });
    
    const { data, isLoading: isLoadingWrite, error: writeError, isError: isWriteError, write } = useContractWrite(config);
    
    /*
    console.log(
        "CAUSE:", prepareError?.cause, 
        "NAME: ", prepareError?.name, 
        "STACK: ", prepareError?.stack,
        "MESSAGE: ", prepareError?.message,
    );
    console.log(
        "WRITE ERROR:", writeError, 
        "isWriteError: ", isWriteError,
    );
    */

    // using the useWaitForTransaction we can show feedback on the status of the transaction
    const { isLoading: isLoadingTx, isSuccess: isSuccessTx } = useWaitForTransaction({
        hash: data?.hash,
    });

    function handleClick() {
        write?.();
    }

    return <AcceptNewDiplomaRequestView
        isLoadingWrite={isLoadingWrite}
        isLoadingTx={isLoadingTx}
        isSuccessTx={isSuccessTx}
        isPrepareError={isPrepareError}
        isError={isWriteError}
        prepareError={prepareError}
        prepareErrorShort={prepareErrorShort}
        error={writeError}
        handleClick={handleClick}
        txHash={data?.hash}
        setStartRequest={setStartRequest}
    />;
}

export default AcceptNewDiplomaRequestController;