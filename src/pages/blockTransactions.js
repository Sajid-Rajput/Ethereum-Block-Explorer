import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import alchemy from "../Utils/alchemyApi";
import { Utils } from "alchemy-sdk";

import "./blockTransactions.css";

function BlockTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { blockNumber } = useParams();

  const getTransactionsForBlock = async () => {
    try {
      const block = await alchemy.core.getBlockWithTransactions(+blockNumber);
      setTransactions(block.transactions);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch block transactions:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactionsForBlock();
  }, [blockNumber]);

  return (
    <div className="block-transactions">
      <header>
        <h1>Ethereum Block Explorer</h1>
      </header>
      <div className="transaction-info">
        <h2>Transactions for Block Number: {blockNumber}</h2>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            {transactions.map((tx) => (
              <div key={tx.hash} className="transaction-item">
                <h3>
                  Transaction Hash:{" "}
                  <Link to={`/block/${blockNumber}/${tx.hash}`}>{tx.hash}</Link>
                </h3>
                <p>From: {tx.from}</p>
                <p>To: {tx.to}</p>
                <p>
                  Value:{" "}
                  <span className="value">
                    {tx.value
                      ? Utils.formatUnits(tx.value.toString(), "18")
                      : "N/A"}
                  </span>
                </p>
                <p className="hash">Block Hash: {tx.blockHash}</p>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="back-link">
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
}

export default BlockTransactions;
