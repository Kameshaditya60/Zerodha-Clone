require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const url = process.env.MONGO_URL;
const cors = require('cors');
const cookieParser = require("cookie-parser");

// Import routes
const holdingsRoute = require("./routes/holdings");
const positionsRoute = require("./routes/positions");
const ordersRoute = require("./routes/orders");
const stocksRoute = require("./routes/stocks");
const auth = require('./Routes/auth');
const userProfile = require("./Routes/userRoutes");

// Legacy routes (backward compatibility)
const { HoldingsModel } = require('./model/HoldingsModel');
const { PositionsModel } = require('./model/PositionsModel');
const { OrdersModel } = require('./model/OrdersModel');

const app = express();
console.log("app hai ye:", app);

mongoose.connect(url)
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

  mongoose.connection.on('connected', () => {
  console.log('📡 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('📡 Mongoose disconnected from MongoDB');
});
// CORS setup
app.use(cors({
  origin: [
    'https://zerodha-clone-frontend-iy2e.onrender.com',
    'https://zerodha-clone-dashboard-qyr2.onrender.com',
    'http://localhost:3000',
    'http://localhost:3001',

    'http://localhost:5000'

  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// New API Routes
app.use("/api/auth", auth);
app.use("/api/holdings", holdingsRoute);
app.use("/api/positions", positionsRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/stocks", stocksRoute);


//home route
app.get('/', (req, res) => {
   res.json({ 
    message: 'Zerodha Clone API',
    endpoints: [
      'POST /api/auth/send-otp',
      'POST /api/auth/verify-otp',
      'POST /api/auth/resend-otp'
    ]
  });
});

app.get('/api/user', userProfile);

app.post('/neworders', async (req, res) => {
    let newOrder = new OrdersModel({
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        mode: req.body.mode
    });
    newOrder.save();
    res.json({message: 'Order created'});
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});