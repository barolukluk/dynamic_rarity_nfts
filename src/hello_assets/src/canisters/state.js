import {minterCanister, tokenCanister} from "./canisters";
import ledger_idl from "./idl/ledger.did";
import {idlFactory, hello} from "../../../declarations/hello/index";
import { Principal } from "@dfinity/principal";
var isConnected = undefined;
var principal = undefined;
var actorMinter = undefined;
var actorToken = undefined;
var tokenPk = undefined;
async function connectPlug(){
    clearEverything();
    console.log(isConnected);
    if(!isConnected){
        console.log("www");
        const whitelist = [minterCanister, tokenCanister];
        await window?.ic?.plug?.requestConnect({whitelist});
        isConnected = await window.ic.plug.isConnected();
        if(!isConnected){
            clearEverything();
            return false;
        }
        actorMinter = await window.ic.plug.createActor({
            canisterId: minterCanister,
            interfaceFactory: idlFactory,});
        if(actorMinter==undefined){
            clearEverything();
            return false;
        }
        principal = await window.ic.plug.agent.getPrincipal();
        if(principal==undefined){
            clearEverything();
            return false;
        }
        return true;
    }
    if(principal!=undefined && actorMinter!=undefined){
        return true;
    }
    else{
        clearEverything();
        return false;
    }
}
async function sendToken(count) {
    if(isConnected){
        try {

            var ledger = await window.ic.plug.createActor({
                canisterId:tokenCanister, 
                interfaceFactory: ledger_idl});
            await ledger.send_dfx({
                to: "b167aff705a78eb842a91513c58175c1cf210f9f5b141745f4cd4ecb729aece6",
                fee:{e8s: 10_000},
                memo:0,
                from_subaccount:[],    
                created_at_time: [],
                amount:{e8s: count*100000000}});
            return true;
        } catch (error) {
            console.error(error);
            return false;
            
        }
    }
    clearEverything();
    return false;
}
function isConnectedFunc(){
    return window.ic.isConnected();
}
async function getPrincipalFunc(){
    return principal.toString();
}
async function getMinterActor(){
    return actorMinter;
}
async function getTokenActor(){
    return actorToken;
}
function clearEverything()
{
    isConnected = undefined;
    principal = undefined;
    actorMinter = undefined;
    actorToken = undefined;
}
async function getAllCollection()
{
    return await hello.getAllNFTs();
}
async function getOwnedNFTs()
{
    if(isConnected==undefined){
        clearEverything();
        return false;
    }
    return await actorMinter.getAllOwnedNFTs();
}
async function getTokenDNA(i){
    
    return await hello.tokenDNA(i);
}
async function mint(dna,amountOfToken)
{
    if(isConnected==undefined){
        clearEverything();
        return false;
    }
    // if(await howManyMinted()>=200){
    //     return false;
    // }
    var sendTokenRequest = await sendToken(amountOfToken);
    if(sendTokenRequest==false){
        return false;
    }
    try {
        await actorMinter.mint(dna);
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}
async function transfer(to,tokenId){
    if(isConnected==undefined){
        clearEverything();
        return false;
    }
    try {
        await actorMinter.transferFrom(principal,Principal.fromText(to),tokenId);
        console.log("done");    
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
async function howManyMinted(){
    tokenPk = parseInt((await hello.getTokenPk()).toString());
    return tokenPk;
}


export{connectPlug, isConnectedFunc, getPrincipalFunc,mint,getOwnedNFTs,getAllCollection,transfer,getTokenDNA};