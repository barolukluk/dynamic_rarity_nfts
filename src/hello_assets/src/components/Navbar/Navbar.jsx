import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import {connectPlug, getPrincipalFunc} from '../../canisters/state';
export default function Navbar() {

    const [connected,setConnected] = useState(false)
    const [principal,setPrincipal] = useState(null);

    const handleConnect = async () => {
        const principal = await getPrincipalFunc()
        if(principal) {
            setConnected(true)
            setPrincipal(principal)
        }
    }
    
    const handleClick = async() => {
        const res = await connectPlug();
        if(res){
            handleConnect()
        }
    }

    useEffect(() => {
        handleConnect()
    }, [])

  return (
    <div className='sum'>

        <div className='logo'>Dynamic Rarity NFTs</div>
        <nav className='item'>
            <ul className='ul'>
                <li className='li'>
                    <Link to='/'>Minting Engine</Link>
                </li>
                <li className='li'>
                    <Link to='/all'>View All NFTs</Link>
                </li>
                <li className='li'>
                    <Link to='/list'>Collected NFTs</Link>
                </li>
                <li className='li' onClick={handleClick}>
                    {connected ? principal : 'Connect Your Wallet'}
                    
                </li>
            </ul>
        </nav>
    </div>
  )
}
