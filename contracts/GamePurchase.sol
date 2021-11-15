pragma solidity ^0.5.0;

contract GamePurchase {

    address[16] public games;

    // purchasing game
    function purchase(uint gameId) public returns (uint) {
        require(gameId >= 0 && gameId <= 15);

        games[gameId] = msg.sender;

        return gameId;
    }

    // Retrieving the adopters
    function getBuyers() public view returns (address[16] memory) {
    return games;
    }



}