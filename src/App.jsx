import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");

  function addNewTransaction(e) {
    e.preventDefault();
    const url = import.meta.env.VITE_REACT_APP_API_URL + "/transaction";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, datetime }),
    }).then((response) => {
      response.json().then((json) => {
        console.log("result", json);
      });
    });
  }

  return (
    <main>
      <h1>
        $400<span>.00</span>
      </h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic-info">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="datetime-local"
            placeholder="Date"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
          />
        </div>
        <div className="description">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Add Transaction</button>
      </form>
      <div className="all--transactions">
        <div className="transaction">
          <div className="left">
            <div className="name">New Iphone</div>
            <div className="description">Phone broke</div>
          </div>
          <div className="right">
            <div className="price red">-$500</div>
            <div className="datetime">2022-12-18 15:45</div>
          </div>
        </div>
        <div className="transaction">
          <div className="left">
            <div className="name">New Samsung TV</div>
            <div className="description">Time for new TV</div>
          </div>
          <div className="right">
            <div className="price red">-$500</div>
            <div className="datetime">2022-12-18 15:45</div>
          </div>
        </div>
        <div className="transaction">
          <div className="left">
            <div className="name">Gig Job</div>
            <div className="description">Time for new TV</div>
          </div>
          <div className="right">
            <div className="price green">+$500</div>
            <div className="datetime">2022-12-18 15:45</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
