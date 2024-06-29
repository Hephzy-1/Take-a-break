const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authenticate = require('./middleware/auth');
const userRoute = require('./routes/authRoute');
const contactRoute = require('./routes/contactRoute');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

// Connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 50000, // Increase timeout to 50 seconds
};

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Take a Break Website'})
})

app.use('/auth', userRoute);
app.use(authenticate);
app.use('/contact', contactRoute);

const client = mongoose.connect(process.env.DB_URI, options)
client.then(
  app.listen(PORT, () => {
    console.log(`Connected to MongoDB on port ${PORT}`)
})
)
client.catch(() => {
  console.log('Error occured while connecting to Database')
});