
import Error "mo:base/Error";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import T "dip721_types";
import Buffer "mo:base/Buffer";
import Char "mo:base/Char";
import Float "mo:base/Float";
import Nat32 "mo:base/Nat32";
import P "mo:base/Prelude";
actor DRC721{
    private stable var _name : Text = "Example_name";
    private stable var _symbol : Text = "Example_symbol"; 
    private stable var tokenPk : Nat = 0;

    private stable var tokenURIEntries : [(Nat, Text)] = [];
    private stable var ownersEntries : [(Nat, Principal)] = [];
    private stable var balancesEntries : [(Principal, Nat)] = [];
    private stable var tokenApprovalsEntries : [(Nat, Principal)] = [];
    private stable var operatorApprovalsEntries : [(Principal, [Principal])] = [];  
    private stable var tokenDNAsEntries : [(Nat, Text)] = [];
    private stable var tokenDatasEntries : [(Nat, T.TokenData)] = [];
    private stable var raritiesEntries : [(Nat, Float)] = [];  
    private stable var transactionHistoriesEntries : [(Nat, [Principal])] = [];
    private let transactionHistories : HashMap.HashMap<Nat, [Principal]> = HashMap.fromIter<Nat, [Principal]>(transactionHistoriesEntries.vals(), 10, Nat.equal, Hash.hash);
    private let rarities : HashMap.HashMap<Nat, Float> = HashMap.fromIter<Nat, Float>(raritiesEntries.vals(), 10, Nat.equal, Hash.hash);
    private let tokenURIs : HashMap.HashMap<Nat, Text> = HashMap.fromIter<Nat, Text>(tokenURIEntries.vals(), 10, Nat.equal, Hash.hash);
    private let tokenDNAs : HashMap.HashMap<Nat, Text> = HashMap.fromIter<Nat, Text>(tokenDNAsEntries.vals(), 10, Nat.equal, Hash.hash);
    private let tokenDatas : HashMap.HashMap<Nat, T.TokenData> = HashMap.fromIter<Nat, T.TokenData>(tokenDatasEntries.vals(), 10, Nat.equal, Hash.hash);
    private let owners : HashMap.HashMap<Nat, Principal> = HashMap.fromIter<Nat, Principal>(ownersEntries.vals(), 10, Nat.equal, Hash.hash);
    private let balances : HashMap.HashMap<Principal, Nat> = HashMap.fromIter<Principal, Nat>(balancesEntries.vals(), 10, Principal.equal, Principal.hash);
    private let tokenApprovals : HashMap.HashMap<Nat, Principal> = HashMap.fromIter<Nat, Principal>(tokenApprovalsEntries.vals(), 10, Nat.equal, Hash.hash);
    private let operatorApprovals : HashMap.HashMap<Principal, [Principal]> = HashMap.fromIter<Principal, [Principal]>(operatorApprovalsEntries.vals(), 10, Principal.equal, Principal.hash);
    private func _unwrap<T>(x : ?T) : T {
		switch x {
			case null {P.unreachable() };
			case (?x_) { x_ };
		}
	};
    public shared ({caller}) func clearEveryThing() : async(){
        assert(caller==Principal.fromText("w3rua-bzzei-lyhwq-ex4r4-nkcjr-ro3nn-bq4f5-pupw6-rfpz2-jjxeq-cae"));
        tokenURIEntries := [];
        ownersEntries := [];
        balancesEntries := [];
        tokenApprovalsEntries := [];
        operatorApprovalsEntries := [];  
        tokenDNAsEntries := [];
        tokenDatasEntries := [];
        raritiesEntries := [];  
        transactionHistoriesEntries := [];
        var iterator = 1;
        while(iterator<=tokenPk){
            transactionHistories.delete(iterator);
            rarities.delete(iterator);
            tokenURIs.delete(iterator);
            tokenDNAs.delete(iterator);
            tokenDatas.delete(iterator);
            owners.delete(iterator);
            tokenApprovals.delete(iterator);
            iterator+=1;
        };
        for(i in balances.keys()){
            balances.delete(i);
        };
        for(j in operatorApprovals.keys()){
            operatorApprovals.delete(j);
        };
        tokenPk := 0;
        
    };
    public shared query (msg) func whoami() : async Principal {
        msg.caller
    };
    public shared query func getRarity(index : Nat) : async Float{
        return _unwrap(rarities.get(index));
    };
    public shared({caller}) func getAllOwnedNFTs() : async [T.TokenData] {
        var iterator :Nat = 1;
        var ownedDatas = Buffer.Buffer<T.TokenData>(0);
        while(iterator <= tokenPk)
        {
            if(Principal.equal(_unwrap(await ownerOf(iterator)), caller)){
                ownedDatas.add(await tokenData(iterator));
            };
            iterator+=1;
        };
        return ownedDatas.toArray();
    };
    public shared func getAllNFTs() : async [T.TokenData] {
        var iterator :Nat = 1;
        var datas = Buffer.Buffer<T.TokenData>(0);
        while(iterator <= tokenPk)
        {
            datas.add(await tokenData(iterator));
            iterator+=1;
        };
        return datas.toArray();
    };

    public shared query func getTokenPk() : async Nat{
      return tokenPk;
    };
    public shared func balanceOf(p : Principal) : async ?Nat {
        return balances.get(p);
    };

    public shared func ownerOf(tokenId : Nat) : async ?Principal {
        return _ownerOf(tokenId);
    };

    public shared query func tokenURI(tokenId : Nat) : async ?Text {
        return _tokenURI(tokenId);
    };

    public shared query func tokenDNA(tokenId : Nat) : async Text {
        return _tokenDNA(tokenId);
    };
    public shared query func tokenData(tokenId : Nat) : async T.TokenData {
        return _tokenData(tokenId);
    };
    public shared query func getTransactionHistory(tokenId: Nat) : async [Principal] {
        return _unwrap(transactionHistories.get(tokenId));
    };
    public shared query func getTransactionHistoryTextFormat(tokenId: Nat) : async [Text] {
        var principalHistory : [Principal] =  _unwrap(transactionHistories.get(tokenId));
        var textHistoryBuffer = Buffer.Buffer<Text>(0);
        for(i in principalHistory.vals()){
            textHistoryBuffer.add(Principal.toText(i));
        };
        return textHistoryBuffer.toArray();
    };
    public shared query func name() : async Text {
        return _name;
    };

    public shared query func symbol() : async Text {
        return _symbol;
    };

    public shared func isApprovedForAll(owner : Principal, opperator : Principal) : async Bool {
        return _isApprovedForAll(owner, opperator);
    };

    public shared(msg) func approve(to : Principal, tokenId : Nat) : async () {
        switch(_ownerOf(tokenId)) {
            case (?owner) {
                 assert to != owner;
                 assert msg.caller == owner or _isApprovedForAll(owner, msg.caller);
                 _approve(to, tokenId);
            };
            case (null) {
                throw Error.reject("No owner for token")
            };
        }
    };

    public shared func getApproved(tokenId : Nat) : async Principal {
        switch(_getApproved(tokenId)) {
            case (?v) { return v };
            case null { throw Error.reject("None approved")}
        }
    };

    public shared(msg) func setApprovalForAll(op : Principal, isApproved : Bool) : () {
        assert msg.caller != op;

        switch (isApproved) {
            case true {
                switch (operatorApprovals.get(msg.caller)) {
                    case (?opList) {
                        var array = Array.filter<Principal>(opList,func (p) { p != op });
                        array := Array.append<Principal>(array, [op]);
                        operatorApprovals.put(msg.caller, array);
                    };
                    case null {
                        operatorApprovals.put(msg.caller, [op]);
                    };
                };
            };
            case false {
                switch (operatorApprovals.get(msg.caller)) {
                    case (?opList) {
                        let array = Array.filter<Principal>(opList, func(p) { p != op });
                        operatorApprovals.put(msg.caller, array);
                    };
                    case null {
                        operatorApprovals.put(msg.caller, []);
                    };
                };
            };
        };    
    };

    public shared(msg) func transferFrom(from : Principal, to : Principal, tokenId : Nat) : () {
        assert _isApprovedOrOwner(msg.caller, tokenId);
        _transfer(from, to, tokenId);
        if(_unwrap(await ownerOf(tokenId))==to){
            transactionHistories.put(tokenId,Array.append(_unwrap(transactionHistories.get(tokenId)),[to]));
            var tokenDataLocal : T.TokenData = {dnaType = await tokenDNA(tokenId);tokenURI=_unwrap(await tokenURI(tokenId));rarity=await getRarity(tokenId);id=tokenId;transactionHistory= await getTransactionHistoryTextFormat(tokenId)};
            tokenDatas.put(tokenId,tokenDataLocal);
        };
    };


     public shared ({caller}) func mint(dna : Text) : async Nat {
        if(tokenPk>=200){
            return 0;
        };
        assert(dna.size()==9);
        tokenPk += 1;
        var uri : Text = "https://x7qdv-qyaaa-aaaan-qacgq-cai.raw.ic0.app/nft/"#Nat.toText(tokenPk);
        _mint(caller, tokenPk, uri, dna);
        await _calculateRarities();
        var tokenDataLocal : T.TokenData = {dnaType = dna;tokenURI=uri;rarity=await getRarity(tokenPk);id=tokenPk;transactionHistory= await getTransactionHistoryTextFormat(tokenPk)};
        tokenDatas.put(tokenPk,tokenDataLocal);
        return tokenPk;
    };


    // Internal
    private func _calculateRarities() : async (){
        
        var traitOneBuffer = Buffer.Buffer<Nat>(0);
        var traitTwoBuffer = Buffer.Buffer<Nat>(0);
        var traitThreeBuffer = Buffer.Buffer<Nat>(0);
        var traitFourBuffer = Buffer.Buffer<Nat>(0);
        var traitFiveBuffer = Buffer.Buffer<Nat>(0);
        var traitSixBuffer = Buffer.Buffer<Nat>(0);
        var traitSevenBuffer = Buffer.Buffer<Nat>(0);
        var traitEightBuffer = Buffer.Buffer<Nat>(0);
        var traitNineBuffer = Buffer.Buffer<Nat>(0);
        var rarityPoints = Buffer.Buffer<Float>(0);
        var iterator :Nat = 1;
        while(iterator <= tokenPk)
        {
            var index = 1;
            for(char in _tokenDNA(iterator).chars()){   
                if(index==1){
                    traitOneBuffer.add(Nat32.toNat(Char.toNat32(char)));
                }
                else if(index==2){
                    traitTwoBuffer.add(Nat32.toNat(Char.toNat32(char)));
                }
                else if(index==3){
                    traitThreeBuffer.add(Nat32.toNat(Char.toNat32(char)));
                }
                else if(index==4){
                    traitFourBuffer.add(Nat32.toNat(Char.toNat32(char)));
                }
                else if(index==5){
                    traitFiveBuffer.add(Nat32.toNat(Char.toNat32(char)));
                }
                else if(index==6){
                    traitSixBuffer.add(Nat32.toNat(Char.toNat32(char)));
                }
                else if(index==7){
                    traitSevenBuffer.add(Nat32.toNat(Char.toNat32(char)));
                }
                else if(index==8){
                    traitEightBuffer.add(Nat32.toNat(Char.toNat32(char)));
                }
                else if(index==9){
                    traitNineBuffer.add(Nat32.toNat(Char.toNat32(char)));
                };
                index+=1;
            };
            iterator+=1;
        };
        iterator :=0;
        while(iterator < tokenPk)
        {
            var howManyTimesUsed = 0;
            var index = 0;
            while (index < tokenPk){
                if(traitOneBuffer.get(iterator)==traitOneBuffer.get(index)){
                    howManyTimesUsed+=1;
                };
                index+=1;
            };
            index := 0;
            while (index < tokenPk){
                if(traitTwoBuffer.get(iterator)==traitTwoBuffer.get(index)){
                    howManyTimesUsed+=1;
                };
                index+=1;
            };
            index := 0;
            while (index < tokenPk){
                if(traitThreeBuffer.get(iterator)==traitThreeBuffer.get(index)){
                    howManyTimesUsed+=1;
                };
                index+=1;
            };
            index := 0;
            while (index < tokenPk){
                if(traitFourBuffer.get(iterator)==traitFourBuffer.get(index)){
                    howManyTimesUsed+=1;
                };
                index+=1;
            };
            index := 0;
            while (index < tokenPk){
                if(traitFiveBuffer.get(iterator)==traitFiveBuffer.get(index)){
                    howManyTimesUsed+=1;
                };
                index+=1;
            };
            index := 0;
            while (index < tokenPk){
                if(traitSixBuffer.get(iterator)==traitSixBuffer.get(index)){
                    howManyTimesUsed+=1;
                };
                index+=1;
            };
            index := 0;
            while (index < tokenPk){
                if(traitSixBuffer.get(iterator)==traitSixBuffer.get(index)){
                    howManyTimesUsed+=1;
                };
                index+=1;
            };
            index := 0;
            while (index < tokenPk){
                if(traitSevenBuffer.get(iterator)==traitSevenBuffer.get(index)){
                    howManyTimesUsed+=1;
                };
                index+=1;
            };
            index := 0;
            while (index < tokenPk){
                if(traitEightBuffer.get(iterator)==traitEightBuffer.get(index)){
                    howManyTimesUsed+=1;
                };
                index+=1;
            };
            index := 0;
            while (index < tokenPk){
                if(traitNineBuffer.get(iterator)==traitNineBuffer.get(index)){
                    howManyTimesUsed+=1;
                };
                index+=1;
            };
            rarityPoints.add(Float.fromInt(howManyTimesUsed)/(Float.fromInt(tokenPk*4)));
            iterator+=1;
        };
        iterator :=0;
        while (iterator < tokenPk)
        {
            var howManyMoreRare = 0;
            var index = 0;
            while (index < tokenPk){
                if(Float.less(rarityPoints.get(iterator),rarityPoints.get(index))){
                    howManyMoreRare+=1;
                };
                index+=1;
            };
            var rarityOF = Float.fromInt(100)-Float.fromInt(tokenPk-1-howManyMoreRare)/Float.fromInt(tokenPk)*Float.fromInt(100);
            rarities.put(iterator+1,rarityOF);
            var tokenDataLocal : T.TokenData = {dnaType = await tokenDNA(iterator+1);tokenURI=_unwrap(await tokenURI(iterator+1));rarity=rarityOF;id=iterator+1;transactionHistory=await getTransactionHistoryTextFormat(iterator+1)};
            tokenDatas.put(iterator+1,tokenDataLocal);
            iterator+=1;
        };
    };
    private func _ownerOf(tokenId : Nat) : ?Principal {
        return owners.get(tokenId);
    };

    private func _tokenURI(tokenId : Nat) : ?Text {
        return tokenURIs.get(tokenId);
    };

    private func _tokenDNA(tokenId : Nat) : Text {
        return _unwrap(tokenDNAs.get(tokenId));
    };
    private func _tokenData(tokenId : Nat) : T.TokenData {
        return _unwrap(tokenDatas.get(tokenId));
    };
    private func _isApprovedForAll(owner : Principal, opperator : Principal) : Bool {
        switch (operatorApprovals.get(owner)) {
            case(?whiteList) {
                for (allow in whiteList.vals()) {
                    if (allow == opperator) {
                        return true;
                    };
                };
            };
            case null {return false;};
        };
        return false;
    };

    private func _approve(to : Principal, tokenId : Nat) : () {
        tokenApprovals.put(tokenId, to);
    };

    private func _removeApprove(tokenId : Nat) : () {
        let _ = tokenApprovals.remove(tokenId);
    };

    private func _exists(tokenId : Nat) : Bool {
        return Option.isSome(owners.get(tokenId));
    };

    private func _getApproved(tokenId : Nat) : ?Principal {
        assert _exists(tokenId) == true;
        switch(tokenApprovals.get(tokenId)) {
            case (?v) { return ?v };
            case null {
                return null;
            };
        }
    };

    private func _hasApprovedAndSame(tokenId : Nat, spender : Principal) : Bool {
        switch(_getApproved(tokenId)) {
            case (?v) {
                return v == spender;
            };
            case null { return false}
        }
    };

    private func _isApprovedOrOwner(spender : Principal, tokenId : Nat) : Bool {
        assert _exists(tokenId);
        let owner = _unwrap(_ownerOf(tokenId));
        return spender == owner or _hasApprovedAndSame(tokenId, spender) or _isApprovedForAll(owner, spender);
    };

    private func _transfer(from : Principal, to : Principal, tokenId : Nat) : () {
        assert _exists(tokenId);
        assert _unwrap(_ownerOf(tokenId)) == from;
        _removeApprove(tokenId);
        _decrementBalance(from);
        _incrementBalance(to);
        owners.put(tokenId, to);
    };

    private func _incrementBalance(address : Principal) {
        switch (balances.get(address)) {
            case (?v) {
                balances.put(address, v + 1);
            };
            case null {
                balances.put(address, 1);
            }
        }
    };

    private func _decrementBalance(address : Principal) {
        switch (balances.get(address)) {
            case (?v) {
                balances.put(address, v - 1);
            };
            case null {
                balances.put(address, 0);
            }
        }
    };

    private func _mint(to : Principal, tokenId : Nat, uri : Text, dna: Text) : () {
        assert not _exists(tokenId);

        _incrementBalance(to);
        owners.put(tokenId, to);
        tokenURIs.put(tokenId,uri);
        tokenDNAs.put(tokenId, dna);
        transactionHistories.put(tokenId, [to]);
    };

    private func _burn(tokenId : Nat) {
        let owner = _unwrap(_ownerOf(tokenId));

        _removeApprove(tokenId);
        _decrementBalance(owner);

        ignore owners.remove(tokenId);
    };

    system func preupgrade() {
        raritiesEntries := Iter.toArray(rarities.entries());
        tokenDNAsEntries := Iter.toArray(tokenDNAs.entries());
        tokenURIEntries := Iter.toArray(tokenURIs.entries());
        ownersEntries := Iter.toArray(owners.entries());
        balancesEntries := Iter.toArray(balances.entries());
        tokenApprovalsEntries := Iter.toArray(tokenApprovals.entries());
        operatorApprovalsEntries := Iter.toArray(operatorApprovals.entries());
        transactionHistoriesEntries := Iter.toArray(transactionHistories.entries());
    };

    system func postupgrade() {
        transactionHistoriesEntries := [];
        tokenDNAsEntries := [];
        tokenURIEntries := [];
        ownersEntries := [];
        balancesEntries := [];
        tokenApprovalsEntries := [];
        operatorApprovalsEntries := [];
        raritiesEntries := [];
    };
};
