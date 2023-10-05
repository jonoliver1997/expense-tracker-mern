// Desc: Entry point for the API
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import { TransactionModel } from "../api/models/Transaction.js";

dotenv.config();

const app = express();
app.use(express.json());
app.get("/api/test", (req, res) => {
  res.json({ message: "Hello World" });
});

app.post("/api/transaction", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const { name, price, description, datetime } = req.body;
  const transaction = await TransactionModel.create({
    name,
    price,
    description,
    datetime,
  });
  res.json(transaction);
});

app.get("/api/transactions", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const transactions = await TransactionModel.find();
  res.json(transactions);
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
