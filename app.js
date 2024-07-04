const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Push = require('push.js');
const authenticate = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const userRoute = require('./routes/authRoute');
const contactRoute = require('./routes/contactRoute');
const newsLetterRoute = require('./routes/newsRoute');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Connection options
const options = {
  useNewUrlParser: true,
  serverSelectionTimeoutMS: 50000, // Increase timeout to 50 seconds
};

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Take a Break Website'})
});

app.post('/send-notification', (req, res) => {
  const delay = 3000; // 3 seconds
  const notification = Push.create('Time to take a break');

  setTimeout(() => {
    console.log(`Notification sent: ${delay}`);
    res.send(`Notification sent: ${notification}`)
  }, delay)
})

app.use('/auth', userRoute);
app.use('/contact', contactRoute);
app.use('/news', newsLetterRoute);
app.use(authenticate);
app.use(errorHandler);

const client = mongoose.connect(process.env.DB_URI, options)
client.then(
  app.listen(PORT, () => {
    console.log(`Connected to MongoDB on port ${PORT}`)
})
)
client.catch(() => {
  console.log('Error occured while connecting to Database')
});