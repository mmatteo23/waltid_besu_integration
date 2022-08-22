import { Box, Button, ButtonGroup, Heading } from "@chakra-ui/react";


const AcceptNewDiplomaRequestView = ({
    handleClick,
    isLoadingWrite, 
    isLoadingTx, 
    isSuccessTx,
    isPrepareError,
    prepareError,
    prepareErrorShort,
    isError,
    error,
    txHash,
    setStartRequest
} : {
    handleClick: () => void,
    isLoadingWrite: boolean,
    isLoadingTx: boolean,
    isSuccessTx: boolean,
    isPrepareError: boolean,
    prepareError: Error | null,
    prepareErrorShort: string | undefined,
    isError: boolean,
    error: Error | null,
    txHash: string | undefined,
    setStartRequest: (start: boolean) => void
}) => {

    return <>
        <Heading>New diploma request</Heading>
        <p>Hi Student! Provide your informations for receiving your NFT.</p>

        <ButtonGroup mt={4}>

            <Button isLoading={isLoadingWrite || isLoadingTx} loadingText="Confirming" variant='solid' size='sm' disabled={isLoadingTx || isLoadingWrite || isPrepareError} colorScheme='green' onClick={() => {
                //setStartRequest(true)
                handleClick()
            }}>
                Request NFT
            </Button>

        </ButtonGroup>


        {isLoadingWrite && <Box mt="1em" p={4} bg="yellow" color="black" borderRadius="lg" width="50%">Check your wallet to complete the procedure...</Box>}
        {isLoadingTx && <Box mt="1em" p={4} bg="yellow" color="black" borderRadius="lg" width="50%">Please wait for the transaction to be mined...</Box>}
        {isSuccessTx && 
            <Box mt="1em" p={4} bg="green" borderRadius="lg">
                Transaction mined with success. See your tx at: <a href={'https://goerli.etherscan.io/tx/'+txHash}>{'https://goerli.etherscan.io/tx/'+txHash}</a>
            </Box>}
        {isError && <Box mt="1em" p={4} bg="tomato" borderRadius="lg" width="50%">Error: {error?.message}</Box>}
        {isPrepareError && <Box mt="1em" p={4} bg="teal" borderRadius="lg" width="50%">{prepareErrorShort}</Box>}  
    </>;

}

export default AcceptNewDiplomaRequestView;