import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ShowPersonalNFTsView } from "../views";

import axios from "axios";

function extractNFTsMetadata(tokens: IERC721Token[]) {
    if(tokens === undefined) 
        return [];

    var results: IERC721Metadata[] = [];
    tokens.map(async (token, key) => {
        const res = await fetch(token.tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/"));
        const json = await res.json();
        
        results.push(json);
    });

    return results;
}

const ShowPersonalNFTsController = () => {

    const { address, isConnecting, isDisconnected } = useAccount();

    const GET_NFTs = gql`
        query GetNFTs {
            tokens(first: 5) {
                id
                contract {
                    id
                }
                tokenID
                owner {
                    id
                }
                mintTime
                tokenURI
            }
        }
    `;

    const { loading, error, data } = useQuery(GET_NFTs);

    var tokens = data?.tokens;
    console.log(tokens);

    const metadata = extractNFTsMetadata(tokens);
    console.log(metadata);

    return <ShowPersonalNFTsView 
        tokens={tokens}
        loading={loading}
        error={error}
        metadata={metadata}
    />;
}

export default ShowPersonalNFTsController;