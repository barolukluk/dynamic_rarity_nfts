import Principal "mo:base/Principal";
import Float "mo:base/Float";

module {
    public type TokenAddress = Principal;
    public type TokenId = Nat;
    public type TokenData = {
        dnaType: Text;
        tokenURI: Text;
        rarity: Float;
        id: Nat;
        transactionHistory: [Text];
    };
}