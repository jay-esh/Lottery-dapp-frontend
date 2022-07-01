import Head from "next/head";
import Image from "next/image";
import { resolveIPFS, useMoralis, useWeb3Contract } from "react-moralis";
import styles from "../styles/Home.module.css";
// import { ethers } from "ethers";
import React, { useEffect } from "react";
import { ConnectButton } from "web3uikit";
import abi from "../constants/abi.json";
import contractaddrs from "../constants/contractAddress.json";
import { ethers } from "ethers";
import Content1 from "../components/Content";
// import { network } from "hardhat";

// import Moralis from "moralis/types";

export default function Home() {
  return (
    <div>
      <Content1></Content1>
    </div>
  );
}
