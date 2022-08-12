import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { Component } from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Box, Heading } from "@chakra-ui/react";

class Nav extends Component {
    render() {
        return (
            <nav>
                <Heading as='h1'>Besu & walt.id integration</Heading>
                <div className="connect-wallet-box">
                    <ColorModeSwitcher />
                    <ConnectButton />
                </div>
            </nav>
        )
    }
}

export default Nav;