import Head from "next/head";
import Image from "next/image";
import { resolveIPFS, useMoralis, useWeb3Contract } from "react-moralis";
import styles from "../styles/Home.module.css";
// import { ethers } from "ethers";
import React, { useEffect } from "react";
import { ConnectButton, Button, Input } from "web3uikit";
import abi from "../constants/abi.json";
import contractaddrs from "../constants/contractAddress.json";
import { ethers } from "ethers";

export default function Content1() {
  const [entrancefee, setEntrancefee] = React.useState("0");
  const [usernumber, setUsernumber] = React.useState();
  const [showusernumber, setShowusernumber] = React.useState(false);
  const [showRandomNumber, setshowRandomNumber] = React.useState(false);
  const [rnadomNumber, setRandomNumber] = React.useState();
  let response;
  const { isWeb3Enabled, chainId: chainIdHex } = useMoralis();
  const conaddrs = contractaddrs[parseInt(chainIdHex)];

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: conaddrs,
    functionName: "getEntranceFee",
    params: {},
  });

  const { runContractFunction: getwinnerOrNot } = useWeb3Contract({
    abi: abi,
    contractAddress: conaddrs,
    functionName: "getwinnerOrNot",
    params: {},
  });

  const { runContractFunction: getrandnum } = useWeb3Contract({
    abi: abi,
    contractAddress: conaddrs,
    functionName: "getrandnum",
    params: {},
  });

  const { runContractFunction: getUserNum } = useWeb3Contract({
    abi: abi,
    contractAddress: conaddrs,
    functionName: "getUserNum",
    params: {},
  });

  const { runContractFunction: randnumgen } = useWeb3Contract({
    abi: abi,
    contractAddress: conaddrs,
    functionName: "randnumgen",
    params: {},
  });

  const { runContractFunction: enterRaffle } = useWeb3Contract({
    abi: abi,
    contractAddress: conaddrs,
    functionName: "enterRaffle",
    params: {
      amount: BigInt(10000000000000000),
      num: usernumber,
    },
    msgValue: "10000000000000000",
  });

  // await console.log(abi);
  useEffect(() => {
    if (isWeb3Enabled) {
      async function update() {
        response = (await getEntranceFee()).toString();
        console.log(typeof response);
        setEntrancefee(response);
      }
      update();
    }
  }, [isWeb3Enabled]);

  return (
    <div className={styles.container}>
      <label>
        <Input
          label="Guess a no. b/w 0 and 5"
          name="Test text Input"
          onBlur={function noRefCheck() {}}
          onChange={(chng) => {
            setUsernumber(chng.target.value);
          }}
        />
        <Button
          id="test-button"
          onClick={async () => {
            if (usernumber >= 0 && usernumber < 6) {
              await enterRaffle({
                onError: (error) => alert(error),
              });
              setShowusernumber(true);
              console.log(showusernumber);
            } else {
              setUsernumber("Error");
            }
          }}
          text="Enter Lottery"
          theme="outline"
          type="button"
        />
        <p>
          {usernumber === "Error"
            ? alert("Error: Please give any number between 0 and 5(inclusive)")
            : ""}
        </p>
      </label>
      {/* </button> */}
      {/* <Button
        id="test-button"
        onClick={async () => {
          const res = (
            await getUserNum({
              onError: (error) => console.log(error),
            })
          ).toString();
          console.log(res);
        }}
        text="User Number"
        theme="outline"
        type="button"
      /> */}

      <p>{`User Number: ${
        showusernumber && (usernumber === "Error" ? "" : usernumber)
      }`}</p>

      <Button
        id="test-button"
        onClick={async () => {
          const res = await getrandnum({
            onError: (error) => console.log(error),
          });
          console.log(res.toString());
          setshowRandomNumber(true);
          setRandomNumber(res.toString());
        }}
        text="Get randomnum"
        theme="outline"
        type="button"
        disabled={showusernumber === false || showusernumber === "Error"}
      />
      <p>
        {showRandomNumber && (rnadomNumber === undefined ? "" : rnadomNumber)}
      </p>
      <ConnectButton />
      <p>{`Entrance Fee: ${ethers.utils.formatUnits(
        entrancefee,
        "ether"
      )} ETH`}</p>
    </div>
  );
}
// ethers.utils.formatUnits(entrancefee, "ether");
