pragma solidity ^0.5.0;

contract GameStore {
    address payable private gerente;
    address private comprador;
    
    constructor() public {
        gerente = msg.sender;
    }
    function comprar(uint preco) public payable{
        require(msg.value == preco * 1000000000000000000);
        comprador = msg.sender;
    }
    function transferir() public restricted {
        gerente.transfer(address(this).balance);
    }
    modifier restricted() {
        require(msg.sender == gerente);
        _;
    }

    function getSaldo() public view returns (uint) {
        return uint(address(this).balance);
    }
    
}