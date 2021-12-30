pragma solidity ^0.4.17;

contract Lottery {
    address public manager; // Instance Variable
    address[] public players;
    
    function Lottery() public {
        manager = msg.sender;
    }
    
     function enterLotteryCheck(address playerAdr, uint value) private returns (bool) {

        if(playerAdr == manager || value < 0.001 ether ){
            return false;
        }

        return true;

    }
    
    function enterLottery() public payable{

        require(enterLotteryCheck(msg.sender, msg.value));
        players.push(msg.sender);
    }
    
    function randomNo() private returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }

    function pickWinner() public restrictedToManager returns (address){
       players[randomNo()%players.length].transfer(this.balance);
       players = new address[](0);
    }

    function getPlayers() public view returns(address[]) {
        return players;
    }
   
    modifier restrictedToManager() {
        require(msg.sender == manager);
        _;
    }
    
    
}

