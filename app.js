const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

const ownerController = require('./ownerController');
const functionController = require('./functionController');
const bookingController = require('./bookingController');
const cancellationController = require('./cancellationController');
const hallController = require('./hallController');
const amenitiesController = require('./amenitiesController');
const confirmBookingController = require('./confirmBookingController');
const modifyHallAndOwnerController = require('./modifyHallAndOwnerController');
const registrationController = require('./registrationController'); 
const loginController = require('./loginController');
const passwordResetController = require('./passwordResetController');
// const registrationController = require('./registrationController');

const DB_URL = 'mongodb://localhost:27017/gvs';

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const con = mongoose.connection;

con.once('open', () => {
  console.log('Connected to MongoDB');
  app.use('/api/owners', ownerController);
  app.use('/api/functions', functionController);
  app.use('/api/bookings', bookingController);
  app.use('/api/cancellations', cancellationController);
  app.use('/api/halls', hallController);
  app.use('/api/amenities', amenitiesController);
  app.use('/api/confirmBooking', confirmBookingController);
  app.use('/api/modifyHallAndOwner', modifyHallAndOwnerController);
  app.use('/api/register', registrationController);
  app.use('/api/logins', loginController);
  app.use('/api/resetPassword', passwordResetController);
  // app.use('/api/register', registrationController);


  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

con.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);
});
