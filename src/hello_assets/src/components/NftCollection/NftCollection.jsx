import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import "./NftCollection.css";
import NftView from "../NftView/NftView";
import {Link} from 'react-router-dom'
import { transfer } from "../../canisters/state";
import NftListItem from "./NftListItem";

export default function NftCollection({items, authorize}) {
  const [bg, setBg] = useState("0");
  const [hand, setHand] = useState("0");
  const [eye, setEye] = useState("0");
  const [moustache, setMoustache] = useState("0");
  const [hair, setHair] = useState("0");
  const [accessory, setAccessory] = useState("0");
  const [onTable, setOnTable] = useState("0");
  const [onWall, setOnWall] = useState("0");
  const [torsoDress, setTorsoDress] = useState("0");

    if(items){
        return (
            items.map((item)=> (
                <NftListItem item={item} authorize={authorize} />
            ))
        )
    } else {
        return (
            <h1> Waiting </h1>
        )
    }
  
}
