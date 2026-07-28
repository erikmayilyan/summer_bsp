const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const ClientSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
  city: String,
  zip: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
});

const ClientModel = mongoose.model("clients", ClientSchema);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(3000, () => {
      console.log("Server is running!");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const client = await ClientModel.findOne({ email });

    if (!client) {
      return res.json("No Record Found!");
    }

    if (client.password !== password) {
      return res.json("The Password is Incorrect!");
    }

    return res.json("Signin was Successful!");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, address, city, zip } = req.body;

    console.log("Signup request body:", req.body);

    const existingClient = await ClientModel.findOne({ email });

    if (existingClient) {
      return res.json("Account Already Exists!");
    }

    const newClient = await ClientModel.create({
      name,
      email,
      password,
      address,
      city,
      zip,
      role: "user"
    });

    return res.json(newClient);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});