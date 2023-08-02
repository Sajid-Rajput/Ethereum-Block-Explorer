import React, { useState } from "react";
import { Link } from "react-router-dom";
import alchemy from "../Utils/alchemyApi";
import { Utils } from "alchemy-sdk";
import "./accountBalance.css"; // Import CheckBalance.css for styling

const CheckBalance = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckBalance = async () => {
    setLoading(true);
    try {
      const balance = await alchemy.core.getBalance(address);
      setBalance(balance);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch account balance:", error);
      setLoading(false);
    }
  };

  return (
    <div className="check-balance">
      <header>
        <h1>Ethereum Block Explorer</h1>
      </header>
      <div className="balance-form">
        <h2>Check Account Balance</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter Ethereum Wallet Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button onClick={handleCheckBalance} disabled={loading}>
            {loading ? "Loading..." : "Check Balance"}
          </button>
        </div>
        {balance !== null && (
          <div className="balance-result">
            <p>
              Account Address:{" "}
              <span className="account-address">{address}</span>
            </p>
            <p>
              Balance:{" "}
              <span className="account-balance">{Utils.formatUnits(balance.toString(), "ether")} ETH</span>
            </p>
          </div>
        )}
      </div>
      <div className="back-link">
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};

export default CheckBalance;
