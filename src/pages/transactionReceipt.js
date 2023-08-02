import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import alchemy from "../Utils/alchemyApi";
import { Utils } from "alchemy-sdk";
import "./transactionReceipt.css"; // Import TransactionReceipt.css for styling

const TransactionReceipt = () => {
  const [transactionReceipt, setTransactionReceipt] = useState(null);
  const [loading, setLoading] = useState(true);
  const { blockNumber, transactionHash } = useParams(); // Access blockNumber and transactionHash from URL parameters

  const getTransactionReceipt = async () => {
    try {
      const receipt = await alchemy.core.getTransactionReceipt(transactionHash);
      setTransactionReceipt(receipt);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch transaction receipt:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactionReceipt();
  }, [transactionHash]);

  return (
    <div className="transaction-receipt">
      <header>
        <h1>Ethereum Block Explorer</h1>
      </header>
      <div className="receipt-info">
        <h2>Transaction Receipt for Block Number: {blockNumber}</h2>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : transactionReceipt ? (
          <div className="receipt-details">
            <p>Transaction Hash: {transactionReceipt.transactionHash}</p>
            <p>From: {transactionReceipt.from}</p>
            <p>To: {transactionReceipt.to}</p>
            <p>
              Contract Address: {transactionReceipt.contractAddress || "N/A"}
            </p>
            <p>Block Number: {transactionReceipt.blockNumber}</p>
            <p>Gas Used: {transactionReceipt.gasUsed.toString()}</p>
            <p>
              Gas Price:{" "}
              {transactionReceipt.effectiveGasPrice
                ? Utils.formatUnits(
                    transactionReceipt.effectiveGasPrice.toString(),
                    "gwei"
                  )
                : "N/A"}{" "}
              Gwei
            </p>
            <p>
              Status: {transactionReceipt.status === 1 ? "Success" : "Failed"}
            </p>
            <p>Confirmation: {transactionReceipt.confirmations}</p>
          </div>
        ) : (
          <div className="not-found">Transaction receipt not found</div>
        )}
      </div>
      <div className="back-link">
        <Link to={`/block/${blockNumber}`}>Back to Block Transactions</Link>
      </div>
    </div>
  );
};

export default TransactionReceipt;
