const abi =[
	{
		"constant": false,
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "tokenCounts",
		"outputs": [
			{
				"name": "",
				"type": "uint256[3]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "itemId",
				"type": "uint256"
			}
		],
		"name": "bid",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "ow2",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "potential_winners",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "ow1",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "revealWinners",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "amIWinner",
		"outputs": [
			{
				"name": "",
				"type": "uint256[3]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "finished",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "items",
		"outputs": [
			{
				"name": "itemId",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "constructor"
	}
];


var cuurent;
web3.eth.getAccounts((err, acc) => {
    if(err){
        console.log(err);
        return;
    }
    else {
        cuurent = acc[0];
        document.getElementsByTagName('input')[0].value = cuurent;
    }
})

window.addEventListener('load', async () => {
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
            const accounts = await window.ethereum.request({
                method:

                    'eth_requestAccounts'
            });

           
        } catch (error) {
            console.error(error);
        }
    }
});
if (typeof web3 != 'undefined') {
    web3 = new Web3(web3.currentProvider);
}


const AdressContract = '0x4A5205F71FD4251cb94c72bcfa57584D42e7d3B1';

const contract = new web3.eth.Contract(abi, AdressContract);


async function getOwner(){
    const owner = await contract.methods.ow1().call();
    document.getElementsByTagName('input')[1].value = owner;
}

getOwner();

async function getBalance(){
	const balance = await web3.eth.getBalance(AdressContract);
	document.getElementById('Balance').innerHTML += web3.utils.fromWei(balance) + ' eth';
}
getBalance();

//Action events for Bid buttons.
document.getElementsByClassName('bidButton')[0].addEventListener('click', async () => {await contract.methods.bid(0).send({from: cuurent, value: web3.utils.toWei('0.01', 'ether')});})
document.getElementsByClassName('bidButton')[1].addEventListener('click', async () => {await contract.methods.bid(1).send({from: cuurent, value: web3.utils.toWei('0.01', 'ether')});})
document.getElementsByClassName('bidButton')[2].addEventListener('click', async () => {await contract.methods.bid(2).send({from: cuurent, value: web3.utils.toWei('0.01', 'ether')});})

//Action event for Reveal button.
document.getElementById('revealButton').addEventListener('click', async () => {
    const tokens = await contract.methods.tokenCounts().call();
    for(var i=0; i<3; i++){
        document.getElementsByClassName('bidAmmount')[i].innerHTML = tokens[i];
    }
})

//Action event for Withdraw button.
document.getElementById('withdrawButton').addEventListener('click', async () => {
    await contract.methods.withdraw().send({from: cuurent,});
    alert('Withdrew to Owner');
})




