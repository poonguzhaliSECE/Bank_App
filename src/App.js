import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [accounts, setAccounts] = useState([]);
  const [name, setName] = useState("");
  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState(0);
  const [trans, setTrans] = useState("");
  const [value, setValue] = useState("");

  const createAccount = () => {
    if (!name.trim()) {
      alert("Please enter your name to create an account");
      return;
    }
    const generatedId = `SBI00${Math.floor(1000 + Math.random() * 9000)}`;
    const newAccount = { name, accountId: generatedId, amount: 0 };
    setAccounts([...accounts, newAccount]);
    setName("");
    alert(`Account created successfully! Your Account ID is: ${generatedId}`);
  };

  const removeAccount = (id) => {
    const updatedAccounts = accounts.filter((account) => account.accountId !== id);
    setAccounts(updatedAccounts);
  };

  const Bank = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter your name to perform a transaction");
      return;
    }
    if (!accountId.trim()) {
      alert("Please select an account first");
      return;
    }
    if (!trans || trans === "Select Transaction") {
      alert("Please select your transaction");
      return;
    }
    if (!value || Number(value) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    const updatedAccounts = accounts.map((account) => {
      if (account.accountId === accountId) {
        if (trans === "Deposit") {
          account.amount += Number(value);
        } else if (trans === "Withdraw") {
          if (account.amount >= Number(value)) {
            account.amount -= Number(value);
          } else {
            alert("Insufficient balance");
          }
        }
      }
      return account;
    });
    setAccounts(updatedAccounts);
    setValue("");
  };

  return (
    <div className="app">
      <h2>Bank Application</h2>
      <label>
        <b>Enter Your Name:</b>
      </label>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="button" onClick={createAccount}>
        Create Account
      </button>

      <h3>Accounts</h3>
      <ul>
        {accounts.map((account) => (
          <li key={account.accountId}>
            {account.name} (ID: {account.accountId}) - Balance: Rs {account.amount}
            <button onClick={() => removeAccount(account.accountId)}>Remove</button>
          </li>
        ))}
      </ul>

      <form onSubmit={Bank}>
        <label>
          <b>Choose Your Transaction:</b>
        </label>
        <select onChange={(e) => setTrans(e.target.value)}>
          <option value="Select Transaction">--Select Transaction--</option>
          <option value="Deposit">Deposit</option>
          <option value="Withdraw">Withdraw</option>
        </select>
        <h3>Enter the Amount</h3>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <h3>Select Account ID:</h3>
        <select onChange={(e) => setAccountId(e.target.value)}>
          <option value="">--Select Account--</option>
          {accounts.map((account) => (
            <option key={account.accountId} value={account.accountId}>
              {account.accountId} ({account.name})
            </option>
          ))}
        </select>
        <button type="submit">Submit Transaction</button>
      </form>
    </div>
  );
};

export default App;
