pragma solidity ^0.5.9;

contract Lottery {
    
    struct Item {
        uint itemId;
        address[] ticketsOfPlayers;
    }

    address payable public ow1;
    address payable public ow2;

    address[3] public potential_winners;
    Item[3] public items;
    
    //True when lottery is finished.
    bool public finished;

    constructor() public payable 
    {
        ow1 = msg.sender;
        ow2 = address(0x153dfef4355E823dCB0FCc76Efe942BefCa86477);
        finished = false;

        for(uint i=0; i<3; i++){
            items[i] = Item({itemId:i, ticketsOfPlayers: new address[](0)});
        }
        
    }
     function bid(uint itemId) public payable minVal notFinished nonOwner {
        items[itemId].ticketsOfPlayers.push(msg.sender);
    }

    function random() view private returns(uint){return uint(keccak256(abi.encodePacked(block.difficulty, now)));}


    function withdraw() public payable onlyOwners{
        msg.sender.transfer(address(this).balance);
    }

    

    function tokenCounts() public view returns(uint[3] memory){
        uint[3] memory tokens;
        for(uint i=0; i<3; i++){
            tokens[i] = items[i].ticketsOfPlayers.length;
        }
        return tokens;
    }

    function revealWinners() public notFinished onlyOwners{
        for(uint i=0; i<3; i++){
            if(items[i].ticketsOfPlayers.length !=0){
                uint rand = random() % items[i].ticketsOfPlayers.length;
                potential_winners[i] = items[i].ticketsOfPlayers[rand];
            }
            else {
                potential_winners[i] = address(0); 
            }
        }
        finished = true;
    }

    function amIWinner() public view isFinished returns(uint[3] memory){
        uint[3] memory itemswon;
        for(uint i=0; i<3; i++){
            if(potential_winners[i] == msg.sender)
            {
                itemswon[i] = i+1; 
            }
            else 
            {
                itemswon[i] = 0;
            }
        }
        return itemswon;
    }

    modifier minVal(){
        if(msg.value != 0.01 ether){
            revert();
        }
           _;
    }

    modifier notFinished(){
        if(finished){
            revert();
        }
           _;
    }
  modifier nonOwner() {
        if( msg.sender == ow1 || msg.sender == ow2){
            revert();
        }
            _;
    }


   

    modifier onlyOwners(){
        if(!(msg.sender == ow1 || msg.sender == ow2)){
             revert();        
        }
            _;
    }

     modifier isFinished(){
        if(!(finished)){
            revert();
        }
           _;
     
    }

  
}

