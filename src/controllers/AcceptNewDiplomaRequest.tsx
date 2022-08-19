import { Button, Heading, useDisclosure } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { AddTrustedContractModalController } from ".";
import useDiplomaIssuerManagerData from "../hooks/useDiplomaIssuerManagerData";
import { AcceptNewDiplomaRequestView } from "../views";

const AcceptNewDiplomaRequestController = () => {

    const tokenURI = "ipfs://QmW7aofc5AHLHQQ4V3kwojYPW316j7ybgGgx3Var2DJTvo";

    // bypass pinata upload for now

    /***************************
     *      Contract Data
     **************************/

    const [contract_address, contract_abi, contract] = useDiplomaIssuerManagerData();

    const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
        ...contract,
        functionName: 'acceptNewDiplomaRequest',
        args: [tokenURI],
    });

    console.log(
        "CAUSE:", prepareError?.cause, 
        "NAME: ", prepareError?.name, 
        "STACK: ", prepareError?.stack,
        "MESSAGE: ", prepareError?.message,
    );

    const { data, isLoading: isLoadingWrite, error: writeError, isError: isWriteError, write } = useContractWrite(config);

    console.log(
        "WRITE ERROR:", writeError, 
        "isWriteError: ", isWriteError,
    );

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
        error={writeError}
        handleClick={handleClick}
        txHash={data?.hash}
    />;
}

export default AcceptNewDiplomaRequestController;