import {
    Box, Button, ButtonGroup, Heading,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    FormControl,
    FormLabel,
} from "@chakra-ui/react";


const ConsumeTokenView = ({
    handleClick,
    isLoadingWrite,
    isLoadingTx,
    isSuccessTx,
    isPrepareError,
    prepareError,
    isError,
    error,
    txHash,
    setTokenId,
    handleERC721Click,
    isLoadingERC721Write,
    isLoadingERC721Tx,
    isSuccessERC721Tx,
    isPrepareERC721Error,
    prepareERC721Error,
    isERC721Error,
    errorERC721,
    txHashERC721,
}: {
    handleClick: () => void,
    isLoadingWrite: boolean,
    isLoadingTx: boolean,
    isSuccessTx: boolean,
    isPrepareError: boolean,
    prepareError: Error | null,
    isError: boolean,
    error: Error | null,
    txHash: string | undefined,
    setTokenId: (id: string) => void,
    handleERC721Click: () => void,
    isLoadingERC721Write: boolean,
    isLoadingERC721Tx: boolean,
    isSuccessERC721Tx: boolean,
    isPrepareERC721Error: boolean,
    prepareERC721Error: Error | null,
    isERC721Error: boolean,
    errorERC721: Error | null,
    txHashERC721: string | undefined,
}) => {

    return <>
        <Heading>Consume Token from University</Heading>
        <p>If you have obtained your NFT token, you have to do the approve for the University's wallet.</p>

        <FormControl mt={6}>
            <FormLabel>TokenId</FormLabel>
            <NumberInput width="30%" min={0}>
                <NumberInputField onChange={(e) => {
                    setTokenId(e.currentTarget.value)
                }} />
            </NumberInput>
        </FormControl>

        <ButtonGroup mt={4}>

            <Button isLoading={isLoadingWrite || isLoadingTx} loadingText="Confirming" variant='solid' size='sm' disabled={isLoadingTx || isLoadingWrite} colorScheme='green' onClick={() => handleClick()}>Consume NFT</Button>
            
            <Button isLoading={isLoadingERC721Write || isLoadingERC721Tx} loadingText="Confirming" variant='solid' size='sm' disabled={isLoadingERC721Tx || isLoadingERC721Write} colorScheme='yellow' onClick={() => handleERC721Click()}>Approve</Button>
            
        </ButtonGroup>

        {isLoadingWrite && <Box mt="1em" p={4} bg="yellow" color="black" borderRadius="lg">Check your wallet to complete the procedure...</Box>}
        {isLoadingTx && <Box mt="1em" p={4} bg="yellow" color="black" borderRadius="lg">Please wait for the transaction to be mined...</Box>}
        {isSuccessTx &&
            <Box mt="1em" p={4} bg="green" borderRadius="lg">
                Transaction mined with success.
                <p><a href={'https://goerli.etherscan.io/tx/'+txHash} /></p>
            </Box>}
        {isError && <Box mt="1em" p={4} bg="tomato" borderRadius="lg">Error: {error?.message}</Box>}
        {isPrepareError && <Box mt="1em" p={4} bg="tomato" borderRadius="lg">Prepare error: {prepareError?.message}</Box>}
    
        {isLoadingERC721Write && <Box mt="1em" p={4} bg="yellow" color="black" borderRadius="lg">Check your wallet to complete the procedure...</Box>}
        {isLoadingERC721Tx && <Box mt="1em" p={4} bg="yellow" color="black" borderRadius="lg">Please wait for the transaction to be mined...</Box>}
        {isSuccessERC721Tx &&
            <Box mt="1em" p={4} bg="green" borderRadius="lg">
                Transaction mined with success.
                <p><a href={'https://goerli.etherscan.io/tx/'+txHashERC721} /></p>
            </Box>}
        {isERC721Error && <Box mt="1em" p={4} bg="tomato" borderRadius="lg">Error: {errorERC721?.message}</Box>}
        {isPrepareERC721Error && <Box mt="1em" p={4} bg="tomato" borderRadius="lg">Prepare error: {prepareERC721Error?.message}</Box>}
    </>;

}

export default ConsumeTokenView;