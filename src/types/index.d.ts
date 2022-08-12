declare interface IVerifier {
    name: string,
    did: string,
    url: string,
    signer: string | undefined
}

declare interface IVerificationResult {
    schema: string,
    subject: string,
    expiration: number
}