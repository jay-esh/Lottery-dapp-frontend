import Head from "next/head";
import Image from "next/image";
import { useMoralis, useWeb3Contract } from "react-moralis";
import styles from "../styles/Home.module.css";
// import { ethers } from "ethers";
import React, { useEffect } from "react";
// import Moralis from "moralis/types";

export default function Home() {
  // const metamaskconnect = async () => {
  //   const eth = window.ethereum;
  //   const provider = new ethers.providers.Web3Provider(eth);
  //   await provider.send("eth_requestAccounts", []);
  //   const signer = provider.getSigner();
  //   console.log(signer);
  // };

  const {
    Moralis,
    enableWeb3,
    account,
    isWeb3Enabled,
    isWeb3EnableLoading,
    deactivateWeb3,
  } = useMoralis();
  // console.log(enableWeb3());
  const metamaskconnect = () => {
    enableWeb3();
    window.localStorage.setItem("connected", "injected");
  };

  useEffect(() => {
    if (window.localStorage.getItem("connected")) {
      enableWeb3();
      Moralis.onAccountChanged((account) => {
        console.log(`Account changed to ${account}`);
        if (account == null) {
          window.localStorage.removeItem("connected");
          deactivateWeb3();
        }
      });
    } else {
      return;
    }
  }, []);

  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={metamaskconnect}
        disabled={isWeb3EnableLoading}
      >
        Connect metamask
      </button>
      <button
        type="button"
        onClick={() => {
          window.localStorage.removeItem("connected");
          deactivateWeb3();
        }}
        disabled={!isWeb3Enabled}
      >
        Disconnect
      </button>
      <p>{`${account} is connected`}</p>
    </div>
  );
}
