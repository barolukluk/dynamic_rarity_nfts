import React, { useState } from "react";
import "./Form.css";
import { mint } from '../../canisters/state';

export default function Form({
  setBg,
  setHand,
  setEye,
  setMoustache,
  setHair,
  setAccessory,
  setOnTable,
  setOnWall,
  setTorsoDress,
  bg,
  hand,
  eye,
  hair,
  moustache,
  accessory,
  onTable,
  onWall,
  torsoDress
}) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const res = await mint(bg+torsoDress+hand+moustache+eye+hair+accessory+onTable+onWall,150);
    setIsLoading(false)
    console.log("mint updated ",bg+torsoDress+hand+moustache+eye+hair+accessory+onTable+onWall,"res",res);
  }
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1 className="header">Create NFT</h1>

      <div className="select">
        <select
          name="background"
          id="background"
          onChange={(e) => setBg(e.target.value)}
          value={bg}
        >
          <option selected disabled>
            Choose a Background
          </option>
          <option value="0">BlueBG</option>
          <option value="1">BrikWall</option>
          <option value="2">GreenYellow</option>
          <option value="3">RedBG</option>
          <option value="4">RedYellow</option>
        </select>
      </div>
      <div className="select">
        <select
          name="hand"
          id="hand"
          required
          onChange={(e) => setHand(e.target.value)}
          value={hand}
        >
          <option selected disabled>
            Choose Hand
          </option>
          <option value="0">Hand90Deg</option>
          <option value="1">HandStraight</option>
        </select>
      </div>
      <div className="select">
        <select
          name="moustache"
          id="moustache"
          required
          onChange={(e) => setMoustache(e.target.value)}
          value={moustache}
        >
          <option selected disabled>
            Choose a Mouth Type
          </option>
          <option value="0">Angry</option>
          <option value="1">BigMoustache</option>
          <option value="2">ButterflyMoustache</option>
          <option value="3">ChillMouth</option>
          <option value="4">FullBeard</option>
          <option value="5">SadMouth</option>
          <option value="6">Smile</option>
        </select>
      </div>
      <div className="select">
        <select
          name="eye"
          id="eye"
          required
          onChange={(e) => setEye(e.target.value)}
          value={eye}
        >
          <option selected disabled>
            Choose an Eye Type
          </option>
          <option value="0">EyeClosed</option>
          <option value="1">EyeNormal</option>
          <option value="2">RedEye</option>
        </select>
      </div>

      <div className="select" onChange={(e) => setHair(e.target.value)}>
        <select name="hair" id="hair" required value={hair}>
          <option selected disabled>
            Choose Hair Style
          </option>
          <option value="0">Normal</option>
          <option value="1">Pink</option>
        </select>
      </div>
      <div className="select">
        <select
          name="headAccessory"
          id="headAccessory"
          required
          onChange={(e) => setAccessory(e.target.value)}
          value={accessory}
        >
          <option selected disabled>
            Choose Head Accessory
          </option>
          <option value="0">Cigarette</option>
          <option value="1">CoronaMask</option>
          <option value="2">EyeGlassBlue</option>
          <option value="3">EyeGlassRed</option>
          <option value="4">HeadPhone</option>
          <option value="5">RedHat</option>
        </select>
      </div>
      <div className="select">
        <select
          name="onTable"
          id="onTable"
          required
          onChange={(e) => setOnTable(e.target.value)}
          value={onTable}
        >
          <option selected disabled>
            Choose the Item on Table
          </option>
          <option value="0">CoffeeCup</option>
          <option value="1">Laptop</option>
        </select>
      </div>
      <div className="select">
        <select
          name="onWall"
          id="onWall"
          required
          onChange={(e) => setOnWall(e.target.value)}
          value={onWall}
        >
          <option selected disabled>
            Choose the Item on Wall
          </option>
          <option value="0">Calendar</option>
          <option value="1">Clock</option>
          <option value="2">Moon</option>
        </select>
      </div>
      <div className="select">
        <select
          name="TorsoDress"
          id="TorsoDress"
          required
          onChange={(e) => setTorsoDress(e.target.value)}
          value={torsoDress}
        >
          <option selected disabled>
            Choose a Torso Dress
          </option>
          <option value="0">Torso1</option>
          <option value="1">Torso2</option>
          <option value="2">Torso3</option>
        </select>
      </div>
      <p className="result">The unique DNA of the NFT is:</p>
      <br />
      <button className="submit" disabled={isLoading}>Mint( 150 bootcamp token)</button>
    </form>
  );
}
