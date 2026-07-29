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

function toClientResponse(client) {
  return {
    name: client.name,
    email: client.email,
    address: client.address,
    city: client.city,
    zip: client.zip,
    role: client.role,
  };
}

async function findClientByEmail(email) {
  const normalizedEmail = email.trim().toLowerCase();

  return ClientModel.findOne({
    $expr: { $eq: [{ $toLower: "$email" }, normalizedEmail] }
  });
}

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
    const client = await findClientByEmail(email);

    if (!client) {
      return res.json("No Record Found!");
    }

    if (client.password !== password) {
      return res.json("The Password is Incorrect!");
    }

    return res.json({
      message: "Signin was Successful!",
      client: toClientResponse(client),
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/client", async (req, res) => {
  try {
    const { email } = req.query;
    const client = await findClientByEmail(email);

    if (!client) {
      return res.status(404).json({ error: "No Record Found!" });
    }

    return res.json(toClientResponse(client));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, address, city, zip } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    console.log("Signup request body:", req.body);

    const existingClient = await findClientByEmail(normalizedEmail);

    if (existingClient) {
      return res.json("Account Already Exists!");
    }

    const newClient = await ClientModel.create({
      name,
      email: normalizedEmail,
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