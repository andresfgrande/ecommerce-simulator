import React, { useState } from "react";

export default function GenerateLoyalty() {
    const [loyaltyId1, setLoyaltyId1] = useState("");
    const [loyaltyId2, setLoyaltyId2] = useState("");
    const [copied1, setCopied1] = useState(false);  // Copied state for the first card
    const [copied2, setCopied2] = useState(false);  

    const generateLoyaltyId = (setLoyaltyId, prefix) => {
        const randomNumber = Math.floor(10000000 + Math.random() * 90000000).toString();
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const suffix = letters.charAt(Math.floor(Math.random() * letters.length));
        const newId = prefix + randomNumber + suffix;
        setLoyaltyId(newId);
    };

    const copyToClipboard = async (text, setCopied) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);  
            setTimeout(() => {
                setCopied(false);
            }, 3000);

        } catch (err) {
            console.error('Error in copying text: ', err);
        }
    };

    return(
        <>
        <h2>1. Generate a Loyalty ID</h2>
        <div className="card-container">
            
            <div className="card">
                <div className="card-title">Norma Comics</div>
                <button onClick={() => generateLoyaltyId(setLoyaltyId1, "NORM")}>Generate Loyalty ID</button>
                {loyaltyId1 && 
                <div className="loyalty-id">
                    <span>{loyaltyId1.toUpperCase()}</span>
                    <img src="/copy.png" className="copy-loyalty" onClick={() => copyToClipboard(loyaltyId1,setCopied1)} alt="Copy"/>
                </div>}
                {copied1 && <div className="copied-text">Copied!</div>}
            </div>
            <div className="card">
                <div className="card-title">Bartoletti-Corwin</div>
                <button onClick={() => generateLoyaltyId(setLoyaltyId2, "BART")}>Generate Loyalty ID</button>
                {loyaltyId2 && 
                <div className="loyalty-id">
                    <span>{loyaltyId2.toUpperCase()}</span> 
                    <img src="/copy.png" className="copy-loyalty" onClick={() => copyToClipboard(loyaltyId2,setCopied2)} alt="Copy"/>
                </div>}
                {copied2 && <div className="copied-text">Copied!</div>}
            </div>
        </div>
        </>
        
    );
}
