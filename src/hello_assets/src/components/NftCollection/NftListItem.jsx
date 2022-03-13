import React, { useState } from "react";
import { transfer } from "../../canisters/state";

export default function NftListItem({item, authorize}) {
    const [q, setQ] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    let tokenId = parseInt(item.id.toString());
    let rarity = item.rarity.toFixed(2).toString();
    let mintedStr = "Minted By: "+ item.transactionHistory[0];
    let transferStr = "";
    for(let i = 1;i<item.transactionHistory.length;i+=1){
        transferStr+=("Transferred to: "+(item.transactionHistory[i])+"\n");
    }

  function handleTransfer(q, id) {
    setIsLoading(true)
    transfer(q, parseInt(id.toString()))
        .then(res => {
            setIsLoading(false)
            console.log(res)
        })
        .catch(console.error)
  }

  function handleRoute(id) {
    const origin = window.location.origin
    window.open(`${origin}/nft/${id}`, '_blank')
  }

        return ( 
            <div className="container">
                <div className="image-overlay-short">
                    <img src={require("../../images/BackGround/"+item.dnaType[0].toString()+".png")} className="bg"alt="artwork_piece"/>
                    <img src={require("../../images/TorsoDress/"+item.dnaType[1].toString()+".png")} className="torsoDress"alt="artwork_piece"/>
                    <img src={require("../../images/Hand/"+item.dnaType[2].toString()+".png")} className="hand"alt="artwork_piece"/>
                    <img src={require(`../../images/Head/HeadBase.png`)} className="headBase"alt="artwork_piece"/>
                    <img src={require(`../../images/Head/Nose.png`)} className="nose"alt="artwork_piece"/>
                    <img src={require("../../images/Head/Mouth/"+item.dnaType[3].toString()+".png")} className="moustache"alt="artwork_piece"/>
                    <img src={require("../../images/Head/Eye/"+item.dnaType[4].toString()+".png")} className="eye"alt="artwork_piece"/>
                    <img src={require("../../images/Head/Hair/"+item.dnaType[5].toString()+".png")} className="hair"alt="artwork_piece"/>
                    <img src={require("../../images/HeadAccessory/"+item.dnaType[6]+".png")} className="accessory"alt="artwork_piece"/>
                    <img src={require("../../images/OnTable/"+item.dnaType[7].toString()+".png")} className="ontable"alt="artwork_piece"/>
                    <img src={require("../../images/OnWall/"+item.dnaType[8].toString()+".png")} className="onwall"alt="artwork_piece"/>
                    <img src={require(`../../images/Table_Chair/0.png`)} className="tableChair"alt="artwork_piece"/>
                </div>
                <div>
                    <strong># {tokenId}</strong><br />
                    <strong>Dynamic Rarity Index: {rarity}%</strong><br />
                    <strong>DNA = "{item.dnaType.toString()}"</strong><br />
                    <strong>{mintedStr}</strong><br />
                    <strong>{transferStr}</strong>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <button onClick={() => handleRoute(parseInt(item.id.toString()))}>View NFT On Chain</button>
                    {
                        authorize &&
                        <div>
                            <input type="text" placeholder="Principal ID" onChange={e => setQ(e.target.value)} />
                            <button onClick={() => handleTransfer(q, item.id)} disabled={isLoading}>Transfer</button>
                        </div>
                    }
                </div>
            </div>
        )  
}
