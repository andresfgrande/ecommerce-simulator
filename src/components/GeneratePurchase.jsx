import React, { useState } from "react";
import { ethers } from "ethers";
import LoyaltyProgramAbi from "../Abi/loyalty-program.json";

export default function GeneratePurchase() {
    const [loyaltyId, setLoyaltyId] = useState('');
    const [amount, setAmount] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [transactionHash, setTransactionHash] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const provider = new ethers.JsonRpcProvider(import.meta.env.VITE_RPC_URL); 

    async function generatePurchase() {
        setShowPopup(true);
        setIsProcessing(true);
        setErrorMessage('');
        try {
          let envVarNamePk = `VITE_RELAYER_PK_COMMERCE_${loyaltyId.slice(0,4)}`;
          let envVarLoyalty = `VITE_LOYALTY_PROGRAM_ADDRESS_${loyaltyId.slice(0,4)}`;
          const envVariables = import.meta.env;
          let privateKeyCommerce = envVariables[envVarNamePk];
          let loyaltyProgramAddress = envVariables[envVarLoyalty];
    
          let walletCommerce = new ethers.Wallet(privateKeyCommerce, provider);
      
          let contractLoyaltyProgram = new ethers.Contract(loyaltyProgramAddress, LoyaltyProgramAbi.abi, walletCommerce);
          let txResponse = await contractLoyaltyProgram.sendRewards(loyaltyId,amount);
          setTransactionHash(txResponse.hash); 
          let txReceipt = await txResponse.wait();
          setIsProcessing(false); 
  
          console.log(txReceipt);
        } catch (error) {
          console.log(error);
          setIsProcessing(false);
          setErrorMessage(error.message);
        }
      }

      const closePopup = () => {
        setShowPopup(false);
        setErrorMessage(''); 
    };

    const TransactionPopup = () => {
        return (
            <>
                <div className="transaction-overlay" onClick={closePopup}></div>
                <div className="transaction-popup">
                    <button className="close-button" onClick={closePopup} aria-label="Close">×</button>
                    {isProcessing ? (
                        <>
                            <p className="transaction-message processing">Transaction is processing...</p>
                            <img className="transaction-loader" src="/loader.gif" alt="Loading"></img> 
                        </>
                    ) : errorMessage ? (
                        <>
                            <p className="transaction-message error">Transaction failed:</p>
                            <p className="transaction-error">{errorMessage}</p>
                        </>
                    ) : transactionHash && (
                        <>
                            <p className="transaction-message complete">Transaction complete!</p>
                            <p className="transaction-hash">Transaction Hash: {transactionHash}</p>
                        </>
                    )}
                </div>
            </>
        );
    };
    

    return (
        <>
            <h2>2. Generate a Purchase</h2>
            <div className="purchase-form">
                <form>
                    <label htmlFor="loyaltyId">Loyalty ID:</label>
                    <input 
                        type="text" 
                        id="loyaltyId" 
                        value={loyaltyId} 
                        onChange={e => setLoyaltyId(e.target.value.toUpperCase())}
                        required 
                    />
                    <label htmlFor="amount">Amount:</label>
                    <input 
                        type="number" 
                        id="amount" 
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        required 
                    />
                    <button type="button" onClick={generatePurchase}>Submit</button>
                </form>
            </div>
            {showPopup && <TransactionPopup />}
        </>
       
    );
}