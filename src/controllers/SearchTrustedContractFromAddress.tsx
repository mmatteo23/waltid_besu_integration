import { useState } from "react";
import { useContractRead } from "wagmi";
import useTrustedSCRegistryData from "../hooks/useTrustedSCRegistryData";
import { SearchTrustedContractView } from "../views";


const SearchTrustedContractFromAddressController = () => {

    const [contractAddress, setContractAddress] = useState("");

    const [tsc_address, tsc_abi, contract] = useTrustedSCRegistryData();

    const { data: contractInfo, isError, isLoading } = useContractRead({
        ...contract,
        functionName: 'getContract',
        args: [contractAddress == "" ? undefined : contractAddress]
    })

    return <SearchTrustedContractView contractInfo={contractInfo} setContractAddress={setContractAddress} />
};

export default SearchTrustedContractFromAddressController;