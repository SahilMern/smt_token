import { useEffect, useState } from "react";
import Style from "./DetailsBox.module.css";
import { FaCopy } from "react-icons/fa";
import { contractAddress } from "../../helper/ContractAddres";
import { Abi } from "../../helper/Abi";
import { ethers } from "ethers";

const DetailsBox = () => {
  const [contractOwner, setContractOwner] = useState("");
  const [minterAddress, setMinterAddress] = useState("");
  const [totalSupply, setTotalSupply] = useState("");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied: " + text);
  };

  useEffect(() => {
    const contractConnection = async () => {
      try {
        const providerForContract = new ethers.JsonRpcProvider(
          "https://bsc-testnet-dataseed.bnbchain.org"
        );
        const contract = new ethers.Contract(
          contractAddress,
          Abi,
          providerForContract
        );

        const owner = await contract.owner();
        const minter = await contract.minter();
        const supply = await contract.totalSupply();

        setContractOwner(owner);
        setMinterAddress(minter);
        setTotalSupply(ethers.formatEther(supply)); // Convert to human-readable format
      } catch (error) {
        console.error("Error fetching contract details:", error);
      }
    };

    contractConnection();
  }, []);

  return (
    <div className={Style.container}>
      <h2>Contract Details</h2>

      <div className={Style.detailsCard}>
        <div className={Style.card}>
          <span>Owner Address</span>
          <p>{contractOwner}</p>
          <button onClick={() => copyToClipboard(contractOwner)}>
            <FaCopy className={Style.copyIcon} /> Copy
          </button>
        </div>

        <div className={Style.card}>
          <span>Minter Address</span>
          <p>{minterAddress}</p>
          <button onClick={() => copyToClipboard(minterAddress)}>
            <FaCopy className={Style.copyIcon} /> Copy
          </button>
        </div>

        <div className={Style.card}>
          <span>Total Supply</span>
          <p>{totalSupply} Tokens</p>
        </div>
      </div>
    </div>
  );
};

export default DetailsBox;
