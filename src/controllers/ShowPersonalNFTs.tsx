import { gql, useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import { ShowPersonalNFTsView } from "../views";
import axios from "axios";

const testAxios = () => {
    var tokens: IERC721Token[] = [];
    axios.post(
        'https://api.thegraph.com/subgraphs/name/mmatteo23/monokee_thegraph',
        {
            query: `
            {
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
            }`
        }
    )
    .then((result) => {
        //console.log(result);
        //console.log(result.data.data.tokens);
        const data = result.data.data.tokens;

        tokens[0] = data[0];
        tokens[1] = data[1];
        //console.log(tokens);
    })
    .catch((error) => {
        console.log(error);
    });

    console.log(tokens);
    return tokens;
}

const ShowPersonalNFTsController = () => {

    const { address, isConnecting, isDisconnected } = useAccount();

    const GET_NFTs = gql`
        query GetNFTs {
            tokens(where: {owner_: {id: "${address?.toLowerCase()}"}}) {
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

    return <ShowPersonalNFTsView 
        tokens={tokens}
        loading={loading}
        error={error}
    />;
}

export default ShowPersonalNFTsController;