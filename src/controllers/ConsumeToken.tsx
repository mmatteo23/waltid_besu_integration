import { Button, Heading, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { AddTrustedContractModalController } from ".";
import useDiplomaERC721Data from "../hooks/useDiplomaERC721Data";
import useDiplomaIssuerManagerData from "../hooks/useDiplomaIssuerManagerData";
import { AcceptNewDiplomaRequestView, ConsumeTokenView } from "../views";

const ConsumeTokenController = () => {

    const [tokenId, setTokenId] = useState("");

    /***************************
     *      Contract Data
     **************************/

    const [contract_address, contract_abi, contract] = useDiplomaIssuerManagerData();

    const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
        ...contract,
        functionName: 'consumeDiplomaAccessToken',
        args: [tokenId],
    });

    const { data, isLoading: isLoadingWrite, error: writeError, isError: isWriteError, write } = useContractWrite(config);

    // using the useWaitForTransaction we can show feedback on the status of the transaction
    const { isLoading: isLoadingTx, isSuccess: isSuccessTx } = useWaitForTransaction({
        hash: data?.hash,
    });

    const handleClick = () => {
        write?.();
    }

    const [contract_addressERC721, contract_abiERC721, contractERC721] = useDiplomaERC721Data();

    const { config: configERC721, error: prepareERC721Error, isError: isPrepareERC721Error } = usePrepareContractWrite({
        ...contractERC721,
        functionName: 'approve',
        args: [contract_address, tokenId],
    });

    const { data: dataERC721, isLoading: isLoadingERC721Write, error: writeERC721Error, isError: isWriteERC721Error, write: writeERC721 } = useContractWrite(configERC721);

    // using the useWaitForTransaction we can show feedback on the status of the transaction
    const { isLoading: isLoadingERC721Tx, isSuccess: isSuccessERC721Tx } = useWaitForTransaction({
        hash: dataERC721?.hash,
    });

    const handleERC721Click = () => {
        writeERC721?.();
    }

    return <ConsumeTokenView
        isLoadingWrite={isLoadingWrite}
        isLoadingTx={isLoadingTx}
        isSuccessTx={isSuccessTx}
        isPrepareError={isPrepareError}
        isError={isWriteError}
        prepareError={prepareError}
        error={writeError}
        handleClick={handleClick}
        txHash={data?.hash}
        setTokenId={setTokenId}
        isLoadingERC721Write={isLoadingERC721Write}
        isLoadingERC721Tx={isLoadingERC721Tx}
        isSuccessERC721Tx={isSuccessERC721Tx}
        isPrepareERC721Error={isPrepareERC721Error}
        isERC721Error={isWriteERC721Error}
        prepareERC721Error={prepareERC721Error}
        errorERC721={writeERC721Error}
        handleERC721Click={handleERC721Click}
        txHashERC721={dataERC721?.hash}
    />;

}

export default ConsumeTokenController;