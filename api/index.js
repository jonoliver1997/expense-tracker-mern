// Desc: Entry point for the API

import express from "express";

const app = express();
app.use(express.json());
app.get("/api/test", (req, res) => {
  res.json({ message: "Hello World" });
});

app.post("/api/transaction", (req, res) => {
  res.json(req.body);
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
