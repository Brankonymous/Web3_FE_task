import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import Web3 from 'web3';

function WalletPage() {
    const [balanceInETH, setBalanceInETH] = useState(0);
    const [balanceInDAI, setBalanceInDAI] = useState(0);
    const [balanceInUSDC, setBalanceInUSDC] = useState(0);
    const [balanceInWBTC, setBalanceInWBTC] = useState(0);

    const data = useLocation().state;
    const accountAddress = data.account;
    const web3 = new Web3(window.ethereum);

    useEffect(() => {
        (async () => {
            const balance = await web3.eth.getBalance(accountAddress);
            setBalanceInETH(web3.utils.fromWei(balance, 'ether'));
            

            console.log(balanceInETH);
        })()
      });

    return (
        <div>
            <h1>Address: {accountAddress}</h1>
            <h3>ETH: {balanceInETH}</h3>
        </div>
    );
}

export default WalletPage;