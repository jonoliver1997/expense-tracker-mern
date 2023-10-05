import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { set } from "mongoose";

function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then((transactions) => {
      setTransactions(transactions);
    });
  }, [transactions]);

  async function getTransactions() {
    const url = import.meta.env.VITE_REACT_APP_API_URL + "/transactions";
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

  function addNewTransaction(e) {
    e.preventDefault();
    const url = import.meta.env.VITE_REACT_APP_API_URL + "/transaction";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, description, datetime }),
    }).then((response) => {
      response.json().then((json) => {
        setName("");
        setDatetime("");
        setPrice(0);
        setDescription("");
        console.log("result", json);
      });
    });
  }

  let balance = 0;
  transactions.forEach((transaction) => {
    balance += transaction.price;
  });

  balance = balance.toFixed(2);
  const dollars = balance.split(".")[0];
  const cents = balance.split(".")[1];
  const formattedDate = datetime.split("T")[0];

  return (
    <main>
      <h1>
        ${dollars}
        <span>{cents}</span>
      </h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic-info">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="datetime-local"
            placeholder="Date"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            required
          />
        </div>
        <div className="description">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Transaction</button>
      </form>
      <div className="all--transactions">
        {transactions.length > 0 &&
          transactions.map((transaction) => (
            <div className="transaction">
              <div className="left">
                <div className="name">{transaction.name}</div>
                <div className="description">{transaction.description}</div>
              </div>
              <div className="right">
                <div
                  className={
                    "price " + (transaction.price < 0 ? "red" : "green")
                  }
                >
                  {transaction.price}
                </div>
                <div className="datetime">
                  {transaction.datetime.split("T")[0]}
                </div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}

export default App;
