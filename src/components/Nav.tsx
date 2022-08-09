import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { Component } from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

class Nav extends Component {
    render() {
        return <nav>
            <p>Besu/walt-id</p>
            <div className="connect-wallet-box">
                <ColorModeSwitcher />
                <ConnectButton />
            </div>
        </nav>
    }
}

export default Nav;