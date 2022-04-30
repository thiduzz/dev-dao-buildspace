import { useAddress, useMetamask, useEditionDrop } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";

const App = () => {

  const address = useAddress()
  const connectWallet = useMetamask();  
  const editionDrop = useEditionDrop("0x8758836fd9BA3276e4E3E6969eAD8FD5d088071a");

  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  const mintNft = async () => {
    try {
      setIsClaiming(true);
      await editionDrop.claim("0", 1);
      console.log(`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`);
      setHasClaimedNFT(true);
    } catch (error) {
      setHasClaimedNFT(false);
      console.error("Failed to mint NFT", error);
    } finally {
      setIsClaiming(false);
    }
  };

  useEffect(() => {
    // If they don't have a connected wallet, exit!
    if (!address) {
      return;
    }

    const checkBalance = async () => {
      try {
        const balance = await editionDrop.balanceOf(address, 0);
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("🌟 this user has a membership NFT!");
        } else {
          setHasClaimedNFT(false);
          console.log("😭 this user doesn't have a membership NFT.");
        }
      } catch (error) {
        setHasClaimedNFT(false);
        console.error("Failed to get balance", error);
      }
    };
    checkBalance();
  }, [address, editionDrop]);


  if(!address){
    
    return (
      <div className="landing">
        <h1>Welcome to Dev DAO</h1>
        <div><button onClick={connectWallet}>Connect Wallet</button></div>
      </div>
    );
  }

  return (
    <div className="landing">
      <h1>Welcome to Dev DAO</h1>
      <span>(logged as {address})</span>
      {
        !hasClaimedNFT && <button
          disabled={isClaiming}
          onClick={mintNft}
          style={{marginTop:'30px'}}
        >
          {isClaiming ? "Minting..." : "Mint your nft (FREE)"}
        </button>}

        {hasClaimedNFT && <p>You are in!</p>}
    </div>)
};

export default App;
