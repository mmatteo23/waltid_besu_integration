import { Box, Button, ButtonGroup, Heading } from "@chakra-ui/react";


const AcceptNewDiplomaRequestView = ({
    handleClick,
    isLoadingWrite, 
    isLoadingTx, 
    isSuccessTx,
    isPrepareError,
    prepareError,
    isError,
    error,
    txHash
} : {
    handleClick: () => void,
    isLoadingWrite: boolean,
    isLoadingTx: boolean,
    isSuccessTx: boolean,
    isPrepareError: boolean,
    prepareError: Error | null,
    isError: boolean,
    error: Error | null,
    txHash: string | undefined,
}) => {

    return <>
        <Heading>New diploma request</Heading>
        <p>Hi Student! Provide your informations for receiving your NFT.</p>

        <ButtonGroup mt={4}>

            <Button isLoading={isLoadingWrite || isLoadingTx} loadingText="Confirming" variant='solid' size='sm' disabled={isLoadingTx || isLoadingWrite} colorScheme='green' onClick={() => handleClick()}>Request NFT</Button>

            

        </ButtonGroup>


        {isLoadingWrite && <Box mt="1em" p={4} bg="yellow" color="black" borderRadius="lg">Check your wallet to complete the procedure...</Box>}
        {isLoadingTx && <Box mt="1em" p={4} bg="yellow" color="black" borderRadius="lg">Please wait for the transaction to be mined...</Box>}
        {isSuccessTx && 
            <Box mt="1em" p={4} bg="green" borderRadius="lg">
                Transaction mined with success.
                <p><a href='https://goerli.etherscan.io/tx/0xfa97dc0e3737e6114725ea92827dc3dc550c2e984035941b490549ae0df187e8'/></p>
            </Box>}
        {isError && <Box mt="1em" p={4} bg="tomato" borderRadius="lg">Error: {error?.message}</Box>}
        {isPrepareError && <Box mt="1em" p={4} bg="tomato" borderRadius="lg">Prepare error: {prepareError?.message}</Box>}  
    </>;

}

export default AcceptNewDiplomaRequestView;