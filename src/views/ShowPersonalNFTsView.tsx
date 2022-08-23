import { ApolloError } from "@apollo/client";
import { Box, Heading, Text } from "@chakra-ui/react";
import Moment from 'react-moment';
Moment.globalFormat = 'YYYY-MM-DD HH:mm:ss';

const ShowPersonalNFTsView = ({
    tokens,
    loading,
    error,
    metadata
}: {
    tokens: IERC721Token[];
    loading: boolean;
    error: ApolloError | undefined;
    metadata: IERC721Metadata[];
}) => {

    return <>
        <Heading>Your minted NFTs</Heading>

        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        <ul className="nft-list">
            {
                tokens ? (
                    tokens.map((token, key) => {
                        return <li key={key} className="card-item nft-card">
                            <Text fontSize="sm">
                                Token #{token.tokenID}
                            </Text>
                            <p>
                                Mint time: <Moment unix>{token.mintTime}</Moment>
                            </p>
                            <p>
                                {token.tokenURI}
                            </p>
                        </li>
                    })
                ) : null
            }
        </ul>
    </>;
};

export default ShowPersonalNFTsView;