import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import alchemy from "../Utils/alchemyApi";
import "./home.css"; // Import Home.css for styling

function Home() {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBlocks = async () => {
    try {
      const latestBlockNumber = await alchemy.core.getBlockNumber();
      const blockPromises = [];
      for (let i = latestBlockNumber; i > latestBlockNumber - 10; i--) {
        blockPromises.push(alchemy.core.getBlock(i));
      }
      const blocksData = await Promise.all(blockPromises);
      setBlocks(blocksData);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch block data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlocks();
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    await getBlocks();
  };

  return (
    <div className="home">
      <header>
        <h1>Ethereum Block Explorer</h1>
      </header>
      <div className="block-info">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            {blocks.map((block) => (
              <div key={block.number} className="block-item">
                <Link to={`/block/${block.number}`}>
                  Block Number: {block.number}
                </Link>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="block-actions">
        <button className="refresh-button" onClick={handleRefresh}>
          Refresh
        </button>
      </div>
    </div>
  );
}

export default Home;
