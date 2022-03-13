import React from 'react'
import './NftView.css'

export default function NftView(props) {
  return (
  
    <div className={props.className || 'image-overlay'}>
    <img src={require(`../../images/BackGround/${props.bg}.png`)} className="bg"alt="artwork_piece"/>
    <img src={require(`../../images/TorsoDress/${props.torsoDress}.png`)} className="torsoDress"alt="artwork_piece"/>
    <img src={require(`../../images/Hand/${props.hand}.png`)} className="hand"alt="artwork_piece"/>
    <img src={require(`../../images/Head/HeadBase.png`)} className="headBase"alt="artwork_piece"/>
    <img src={require(`../../images/Head/Nose.png`)} className="nose"alt="artwork_piece"/>
    <img src={require(`../../images/Head/Mouth/${props.moustache}.png`)} className="moustache"alt="artwork_piece"/>
    <img src={require(`../../images/Head/Eye/${props.eye}.png`)} className="eye"alt="artwork_piece"/>
    <img src={require(`../../images/Head/Hair/${props.hair}.png`)} className="hair"alt="artwork_piece"/>
    <img src={require(`../../images/HeadAccessory/${props.accessory}.png`)} className="accessory"alt="artwork_piece"/>
    <img src={require(`../../images/OnTable/${props.onTable}.png`)} className="ontable"alt="artwork_piece"/>
    <img src={require(`../../images/OnWall/${props.onWall}.png`)} className="onwall"alt="artwork_piece"/>
    <img src={require(`../../images/Table_Chair/0.png`)} className="tableChair"alt="artwork_piece"/>
</div>

  )
}
