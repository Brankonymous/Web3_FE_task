import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import Web3 from 'web3';

const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

// The minimum ABI to get ERC20 Token balance
let minABI = [
    // balanceOf
    {
      "constant":true,
      "inputs":[{"name":"_owner","type":"address"}],
      "name":"balanceOf",
      "outputs":[{"name":"balance","type":"uint256"}],
      "type":"function"
    },
    // decimals
    {
      "constant":true,
      "inputs":[],
      "name":"decimals",
      "outputs":[{"name":"","type":"uint8"}],
      "type":"function"
    }
  ];

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
            const ETHBalance = await web3.eth.getBalance(accountAddress);
            setBalanceInETH(web3.utils.fromWei(ETHBalance, 'ether'));
            
            let DAIContract = web3.eth.contract(minABI).at(DAIAddress);
            setBalanceInDAI(
                    DAIContract.balanceOf(accountAddress, (error, balance) => {
                    // Get decimals
                    DAIContract.decimals((error, decimals) => {
                    // calculate a balance
                    balance = balance.div(10**decimals);
                    console.log(balance.toString());
                    });
                })
            );

            console.log(balanceInETH);
        })()
      });

    return (
        <div>
            <h1>Address: {accountAddress}</h1>
            <h3>ETH: {balanceInETH}</h3>
            <h3>DAI: {balanceInDAI}</h3>
        </div>
    );
}

export default WalletPage;