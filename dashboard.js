web3=new Web3(window.ethereum);
var address="0x9650c4F0E8e3315fe6580C36fDE83FB6053A1E9E";
var abi=[{
		"constant": false,
		"inputs": [
			{
				"name": "_voteIndex",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
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
		"name": "candidates",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "voteCount",
				"type": "uint256"
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
				"name": "_name",
				"type": "string"
			}
		],
		"name": "addCandidate",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "electionName",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
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
				"type": "address"
			}
		],
		"name": "voters",
		"outputs": [
			{
				"name": "authorized",
				"type": "bool"
			},
			{
				"name": "voted",
				"type": "bool"
			},
			{
				"name": "vote",
				"type": "uint256"
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
				"name": "_person",
				"type": "address"
			}
		],
		"name": "authorize",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNumCandidate",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "end",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalvotes",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];
var contract=new web3.eth.Contract(abi,address);
var ip=document.getElementById("a1")
var btn=document.getElementById("a2");
btn.addEventListener("click",myfunction);
var ip1=document.getElementById("a3")
var btn1=document.getElementById("a4");
btn1.addEventListener("click",myfunction1);
let size;
async function myfunction()
{
    k= ip.value;
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
	const account = accounts[0];
    console.log(account);
	contract.methods.addCandidate(k).send({from:account});
}
async function myfunction1()
{
	k=ip1.value;
	const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
	const account = accounts[0];
	contract.methods.authorize(k).send({from:account});
}
contract.methods.totalvotes().call().then(function(bal){
	var t=document.getElementById("balance");
	t.innerHTML=bal;

})
//const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
//const account = accounts[0];
contract.methods.getNumCandidate().call().then(async function(bal){
  size=parseInt(bal);
  for(let i=0;i<size;i++)
  {
	
	contract.methods.candidates(i).call().then(function(bal){
	var table = document.getElementById("cand_table");
	var row = table.insertRow(i+1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var button=document.createElement("button");
	button.innerHTML="vote";
	cell1.innerHTML = i;
	cell2.innerHTML = bal.name;
	cell3.innerHTML = bal.voteCount;
	cell4.innerHTML="<button class=\"btn btn-secondary\">VOTE</button>";
	var b=document.getElementsByClassName("btn");
	b[i].addEventListener("click",async function(){
		const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
		const account = accounts[0];
		contract.methods.vote(i).send({from:account});
	});

	})

  }

})
