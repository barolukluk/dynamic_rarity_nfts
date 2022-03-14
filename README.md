# hello

I have created an NFT minting dapp where each user can select their own traits and create a unique DNA for each NFT. Users have to pay a certain amount of tokens to mint an NFT and after each mint  a unique DNA code for NFT is created with the selected traits. Besides that , I have created a system called dynamic NFT rarity index (DNRI)  which is a new rarity index  automatically calculated by looking at the DNAs of previously minted NFTs after each mint . So, after the each mint, all the rarities of the collection will be recalculated with respect to new state. In addition, users will also be able to view the transaction history of each NFT.


I am not a experienced react developer, so the ui part of the project is not as cool as the motoko part but i think it is understandable. 


Notes:
1- Clicking the mint button without connecting your wallet will not work, you must first connect your wallet.
2- If you connect your wallet and click "collected NFTs" button, you can see your nfts and transfer them.
3- If you click "view all NFTs" button you can see all the NFTs already minted.
4- All rarity indexes are recalculated and dynamically changed after each mint.
