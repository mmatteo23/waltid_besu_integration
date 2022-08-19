import { useAccount } from "wagmi";
import { ShowPersonalNFTsView } from "../views";


const ShowPersonalNFTsController = () => {


    const { address, isConnecting, isDisconnected } = useAccount();


    

    return <ShowPersonalNFTsView />;
}

export default ShowPersonalNFTsController;