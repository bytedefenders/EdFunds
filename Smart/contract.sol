// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Fund {
    struct Transaction {
        int amount;
        string User;
    }

    struct Student {
        int balance;
    }

    mapping(address => Student) public students;

    int private balance;
    Transaction[] public transactions;

    constructor() {
        balance = 1000;
    }

    function getBalance() public view returns (int) {
        return balance;
    }

     function getStudentBalance(address studentAddress) public view returns (int) {
    return students[studentAddress].balance;
    }


    function transfer(int amount, string memory User) public {
        require(amount > 0, "Amount must be greater than zero");
        require(int(amount) <= balance, "Insufficient balance");
        
        balance -= int(amount);
        transactions.push(Transaction(amount, User));

        // Update the student's balance
        students[msg.sender].balance += int(amount);
    }

    function deposit(int amount) public {
        require(amount > 0, "Amount must be greater than zero");
        
        balance += int(amount);
    }

    function getTransactionCount() public view returns (uint) {
        return transactions.length;
    }

    function getTransaction(uint index) public view returns (int, string memory) {
        require(index < transactions.length, "Invalid index");
        
        Transaction memory transaction = transactions[index];
        return (transaction.amount, transaction.User);
    }
}
