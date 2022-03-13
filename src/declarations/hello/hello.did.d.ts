import type { Principal } from '@dfinity/principal';
export interface TokenData {
  'id' : bigint,
  'tokenURI' : string,
  'dnaType' : string,
  'rarity' : number,
  'transactionHistory' : Array<string>,
}
export interface _SERVICE {
  'approve' : (arg_0: Principal, arg_1: bigint) => Promise<undefined>,
  'balanceOf' : (arg_0: Principal) => Promise<[] | [bigint]>,
  'clearEveryThing' : () => Promise<undefined>,
  'getAllNFTs' : () => Promise<Array<TokenData>>,
  'getAllOwnedNFTs' : () => Promise<Array<TokenData>>,
  'getApproved' : (arg_0: bigint) => Promise<Principal>,
  'getRarity' : (arg_0: bigint) => Promise<number>,
  'getTokenPk' : () => Promise<bigint>,
  'getTransactionHistory' : (arg_0: bigint) => Promise<Array<Principal>>,
  'getTransactionHistoryTextFormat' : (arg_0: bigint) => Promise<Array<string>>,
  'isApprovedForAll' : (arg_0: Principal, arg_1: Principal) => Promise<boolean>,
  'mint' : (arg_0: string) => Promise<bigint>,
  'name' : () => Promise<string>,
  'ownerOf' : (arg_0: bigint) => Promise<[] | [Principal]>,
  'setApprovalForAll' : (arg_0: Principal, arg_1: boolean) => Promise<
      undefined
    >,
  'symbol' : () => Promise<string>,
  'tokenDNA' : (arg_0: bigint) => Promise<string>,
  'tokenData' : (arg_0: bigint) => Promise<TokenData>,
  'tokenURI' : (arg_0: bigint) => Promise<[] | [string]>,
  'transferFrom' : (
      arg_0: Principal,
      arg_1: Principal,
      arg_2: bigint,
    ) => Promise<undefined>,
  'whoami' : () => Promise<Principal>,
}
