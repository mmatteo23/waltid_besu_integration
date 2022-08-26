declare interface IVerifier {
    name: string,
    did: string,
    url: string,
    signer: string | undefined,
    proof: string
}

declare interface IVerificationResult {
    schema: string,
    subject: string,
    expiration: number
}

declare interface ITokenContract {
    id: string,
    name: string,
    symbol: string,
    supportsEIP721Metadata: boolean,
    numTokens: number,
    numOwners: number
}

declare interface IOwner {
    id: string,
    tokens: IERC721Token[],
    numTokens: number
}

declare interface IERC721Token {
    id: string,
    contract: ITokenContract,
    tokenID: number,
    owner: IOwner,
    mintTime: number,
    tokenURI: string
}

declare interface IERC721Metadata {
    name: string,
    description: string,
    image: string,
    details: string
}