// Import the web3.js library for Node.js (make sure you have it installed)
//const Web3 = require('web3');
const web3 = new Web3('http://localhost:8080');

const contractABI = [
    {
        "inputs": [
            {
                "internalType": "int256",
                "name": "amount",
                "type": "int256"
            }
        ],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "int256",
                "name": "amount",
                "type": "int256"
            },
            {
                "internalType": "string",
                "name": "instituteName",
                "type": "string"
            }
        ],
        "name": "transfer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    // Add the rest of your contract ABI here
];

// Replace with your contract address
const contractAddress = '0x6338dA6ddFb53EE17C56a8b2ee48068c825a45b3';

// Create a contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to get the contract balance
async function getBalance() {
    const balance = await contract.methods.getBalance().call();
    console.log('Balance:', balance);
}

// Function to deposit funds
async function deposit() {
    const amount = document.getElementById('amount').value;
    await contract.methods.deposit(amount).send({ from: web3.eth.defaultAccount });
    console.log('Deposit successful');
    getBalance();
}

// Function to transfer funds
async function transfer() {
    const amount = document.getElementById('amount').value;
    const instituteName = document.getElementById('institute').value;
    await contract.methods.transfer(amount, instituteName).send({ from: web3.eth.defaultAccount });
    console.log('Transfer successful');
    getBalance();
    getTransactionHistory();
}

// Function to get transaction history
async function getTransactionHistory() {
    const transactionCount = await contract.methods.getTransactionCount().call();
    console.log('Transaction Count:', transactionCount);

    for (let i = 0; i < transactionCount; i++) {
        const [amount, instituteName] = await contract.methods.getTransaction(i).call();
        console.log(`Transaction ${i + 1} - Amount: ${amount}, Institute: ${instituteName}`);
    }
}

// Initialize the app
async function initApp() {
    const accounts = await web3.eth.getAccounts();
    web3.eth.defaultAccount = accounts[0];
    console.log('Default Account:', web3.eth.defaultAccount);
    getBalance();
    getTransactionHistory();
}

initApp(); // Call initApp directly to initialize the app
