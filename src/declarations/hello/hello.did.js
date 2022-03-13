export const idlFactory = ({ IDL }) => {
  const TokenData = IDL.Record({
    'id' : IDL.Nat,
    'tokenURI' : IDL.Text,
    'dnaType' : IDL.Text,
    'rarity' : IDL.Float64,
    'transactionHistory' : IDL.Vec(IDL.Text),
  });
  return IDL.Service({
    'approve' : IDL.Func([IDL.Principal, IDL.Nat], [], []),
    'balanceOf' : IDL.Func([IDL.Principal], [IDL.Opt(IDL.Nat)], []),
    'clearEveryThing' : IDL.Func([], [], []),
    'getAllNFTs' : IDL.Func([], [IDL.Vec(TokenData)], []),
    'getAllOwnedNFTs' : IDL.Func([], [IDL.Vec(TokenData)], []),
    'getApproved' : IDL.Func([IDL.Nat], [IDL.Principal], []),
    'getRarity' : IDL.Func([IDL.Nat], [IDL.Float64], ['query']),
    'getTokenPk' : IDL.Func([], [IDL.Nat], ['query']),
    'getTransactionHistory' : IDL.Func(
        [IDL.Nat],
        [IDL.Vec(IDL.Principal)],
        ['query'],
      ),
    'getTransactionHistoryTextFormat' : IDL.Func(
        [IDL.Nat],
        [IDL.Vec(IDL.Text)],
        ['query'],
      ),
    'isApprovedForAll' : IDL.Func(
        [IDL.Principal, IDL.Principal],
        [IDL.Bool],
        [],
      ),
    'mint' : IDL.Func([IDL.Text], [IDL.Nat], []),
    'name' : IDL.Func([], [IDL.Text], ['query']),
    'ownerOf' : IDL.Func([IDL.Nat], [IDL.Opt(IDL.Principal)], []),
    'setApprovalForAll' : IDL.Func([IDL.Principal, IDL.Bool], [], ['oneway']),
    'symbol' : IDL.Func([], [IDL.Text], ['query']),
    'tokenDNA' : IDL.Func([IDL.Nat], [IDL.Text], ['query']),
    'tokenData' : IDL.Func([IDL.Nat], [TokenData], ['query']),
    'tokenURI' : IDL.Func([IDL.Nat], [IDL.Opt(IDL.Text)], ['query']),
    'transferFrom' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Nat],
        [],
        ['oneway'],
      ),
    'whoami' : IDL.Func([], [IDL.Principal], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
