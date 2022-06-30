import Head from "next/head";
import Image from "next/image";
import { resolveIPFS, useMoralis, useWeb3Contract } from "react-moralis";
import styles from "../styles/Home.module.css";
// import { ethers } from "ethers";
import React, { useEffect } from "react";
import { ConnectButton } from "web3uikit";
import abi from "../constants/abi.json";
import contractaddrs from "../constants/contractAddress.json";
// import Moralis from "moralis/types";

export default function Home() {
  let response;
  const { isWeb3Enabled } = useMoralis();
  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: contractaddrs["31337"],
    functionName: "getEntranceFee",
    params: {},
  });

  const { runContractFunction: getUserNum } = useWeb3Contract({
    abi: abi,
    contractAddress: contractaddrs["31337"],
    functionName: "getUserNum",
    params: {},
  });

  const { runContractFunction: enterRaffle } = useWeb3Contract({
    abi: abi,
    contractAddress: contractaddrs["31337"],
    functionName: "enterRaffle",
    params: {
      amount: BigInt(10000000000000000),
      num: 4,
    },
    msgValue: "10000000000000000",
  });
  // await console.log(abi);
  useEffect(() => {
    if (isWeb3Enabled) {
      async function update() {
        response = (await getEntranceFee()).toString();
        // const res = await enterRaffle();
        // console.log(res);
        const res = (await getUserNum()).toString();
        console.log(response);
        console.log(res);
      }
      // console.log(contractaddrs["31337"]);
      update();
    }
  }, [isWeb3Enabled]);
  return (
    <div className={styles.container}>
      {/* <button type="button" }>
        getabi
      </button> */}
      <button
        onClick={async () => {
          await enterRaffle({
            onError: (error) => console.log(error),
          });
        }}
      >
        enter lottery
      </button>
      <button
        onClick={async () => {
          await getUserNum({
            onError: (error) => console.log(error),
          });
        }}
      >
        user number
      </button>
      <ConnectButton />
    </div>
  );
}
