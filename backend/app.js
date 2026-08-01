const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { execSync } = require('child_process');
require('dotenv').config();

try {
  execSync('lsof -t -i :3000 | xargs kill -9 2>/dev/null', { stdio: 'ignore' });
} catch (error) {
  console.log(error);
}

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

const ContactChema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const ContactModel = mongoose.model("contacts", ContactChema);

let server;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    server = app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

function shutdown() {
  console.log("\nShutting down server...");
  if (!server) {
    process.exit(0);
    return;
  }

  server.close(() => {
    mongoose.connection.close(false).then(() => process.exit(0));
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const client = await ClientModel.findOne({ email: email.trim().toLowerCase() });

    if (!client) {
      return res.json("No Record Found!");
    }

    if (client.password !== password) {
      return res.json("The Password is Incorrect!");
    }

    return res.json({
      message: "Signin was Successful!",
      client: {
        name: client.name,
        email: client.email,
        address: client.address,
        city: client.city,
        zip: client.zip,
        role: client.role
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/client", async (req, res) => {
  try {
    const { email } = req.query;
    const client = await ClientModel.findOne({ email: email.trim().toLowerCase() });

    if (!client) {
      return res.status(404).json({ error: "No Record Found!" });
    }

    return res.json({
      name: client.name,
      email: client.email,
      address: client.address,
      city: client.city,
      zip: client.zip,
      role: client.role
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, address, city, zip } = req.body;

    console.log("Signup request body:", req.body);

    const existingClient = await ClientModel.findOne({ email: email.trim().toLowerCase() });

    if (existingClient) {
      return res.json("Account Already Exists!");
    }

    const newClient = await ClientModel.create({
      name,
      email: email.trim().toLowerCase(),
      password,
      address,
      city,
      zip,
      role: "user"
    });

    return res.json({
      name: newClient.name,
      email: newClient.email,
      address: newClient.address,
      city: newClient.city,
      zip: newClient.zip,
      role: newClient.role
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.put("/edit-profile", async (req, res) => {
  try {
    const { email, name, address, city, zip, password } = req.body;

    const client = await ClientModel.findOne({ email: email.trim().toLowerCase() });

    if (!client) {
      return res.status(404).json({
        error: "There is no information!!!"
      });
    };

    if (name !== undefined || name !== "") {
      client.name = name;
    };
    if (address !== undefined || address !== "") {
      client.address = address;
    };
    if (city !== undefined || city !== "") {
      client.city = city;
    };
    if (zip !== undefined || zip !== "") {
      client.zip = zip;
    };
    if (password) {
      client.password = password;
    }

    await client.save();
    return res.json({
      name: client.name,
      email: client.email,
      address: client.address,
      city: client.city,
      zip: client.zip,
      role: client.role 
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/clients", async (req, res) => {
  try {
    const clients = await ClientModel.find();
    res.json(clients);
  } catch (error) {
    res.sattus(500).json({
      error: error.message
    });
  }
});

app.delete("/clients/:id", async (req, res) => {
  try {
    const deleteClient = await ClientModel.findByIdAndDelete(req.params.id);
    if (!deleteClient) {
      return res.status(404).json({
        message: "Client not found!"
      });
    };
    res.json({
      message: "Client has deleted the message successfully!"
    });
  } catch (error) {
    res.status(500).json({ 
      error: error.message 
    })
  }
});

app.get("/contacts", async (req, res) => {
  try {
    const contacts = await ContactModel.find();
    res.json(contacts);
  } catch (error) {
    res.sattus(500).json({
      error: error.message
    });
  }
})

app.post("/contacts", async (req, res) => {
  try {
    const contact = new ContactModel(req.body);
    await contact.save();
    res.json({
      success: true,
      message: "Contact Has Been Saved!"
    })
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});
