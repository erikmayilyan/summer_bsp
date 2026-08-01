const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { execSync } = require('child_process');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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

const PurchaseSchema = new mongoose.Schema({
  purchaseId: String,
  packageType: String,
  name: String,
  email: String,
  address: String,
  city: String,
  zip: String,
  phone: String,
  date: String,
  time: String,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'failed'],
    default: 'pending'
  }
}, { timestamps: true });

const PurchaseModel = mongoose.model("purchases", PurchaseSchema);

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

app.post('/payment', async (req, res) => {
  try {
    const { packageName, name, email, address, city, zip, phone, date, time, frontendUrl } = req.body;
    let price;
    if (packageName == "Basic") {
      price = 4999;
    };
    if (packageName == "Standard") {
      price = 8999;
    };
    if (packageName == "Premium") {
      price = 14999;
    };

    const baseUrl = frontendUrl || process.env.FRONTEND_URL || "http://localhost:5173";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: packageName
            },
            unit_amount: price
          },
          quantity: 1
        }
      ],
      customer_email: email,
      metadata: {
        packageName,
        name,
        email,
        address,
        city,
        zip,
        phone,
        date,
        time
      },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`
    });

    return res.json({
      url: session.url
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

app.get('/success', (req, res) => {
  return res.send('Success!');
});

app.get('/cancel', (req, res) => {
  return res.send('Cancel!');
});

app.post("/finalize-payment", async (req, res) => {
  const { session_id } = req.body;

  if (!session_id) {
    return res.status(400).json({ error: "session_id is required" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["payment_intent"]
    });

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    if (session.payment_status !== "paid") {
      return res.status(400).json({ error: "Payment has not been completed" });
    }

    const purchaseId = session.id;
    let purchase = await PurchaseModel.findOne({ purchaseId });

    if (!purchase) {
      const metadata = session.metadata || {};

      purchase = await PurchaseModel.create({
        purchaseId,
        packageType: metadata.packageName,
        name: metadata.name,
        email: metadata.email,
        address: metadata.address,
        city: metadata.city,
        zip: metadata.zip,
        phone: metadata.phone,
        date: metadata.date,
        time: metadata.time,
        status: "accepted"
      });
    }

    return res.json({ purchase });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});