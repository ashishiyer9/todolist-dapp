const provider = new ethers.providers.Web3Provider(window.ethereum);
provider.send('eth_requestAccounts', []);

const signer = provider.getSigner();
const todoListAddress = 'Contract_Address';
const todoListABI = [
    // ABI array generated after compiling TodoList.sol
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "content",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "completed",
                "type": "bool"
            }
        ],
        "name": "TaskCreated",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_content",
                "type": "string"
            }
        ],
        "name": "createTask",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "getTask",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "taskCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "tasks",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "content",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "completed",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }

];
const todoListContract = new ethers.Contract(todoListAddress, todoListABI, signer);
async function createTask() {
    const content = document.getElementById('taskContent').value;
    await todoListContract.createTask(content);
    document.getElementById('taskContent').value = '';
    loadTasks();
}
async function loadTasks() {
    console.log(todoListContract)
    const taskCount = await todoListContract.taskCount();
    let taskListHTML = '';
    for (let i = 1; i <= taskCount; i++) {
        const task = await todoListContract.getTask(i);
        taskListHTML += `<p>${task[1]}</p>`;
    }
    document.getElementById('taskList').innerHTML = taskListHTML;
}
window.onload = loadTasks;
