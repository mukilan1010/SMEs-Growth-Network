const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace with your MongoDB Atlas connection string)
mongoose.connect('mongodb+srv://mukilan291024:mukil123@cluster0.jhd6v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => consoles.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);


const dpiitSchema = new mongoose.Schema({
  startupName: { type: String, required: true },
  natureOfEntity: { type: String, required: true },
  cin: { type: String },
  pan: { type: String },
  dpiitRegistrationNo: { type: String },
  gstRegistrationNo: { type: String, required: true },
  gstAuthorizedName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  sector: { type: String, required: true },
  businessModel: { type: String },
  yearOfReg: { type: String, required: true }
});


const DpiitForm = mongoose.model('DpiitForm', dpiitSchema);

// Define the DPIIT2 form schema
const dpiit2Schema = new mongoose.Schema({
  country: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  zip: { type: String, required: true },
  linkedin: { type: String },
  website: { type: String },
  twitter: { type: String },
  facebook: { type: String }
});

// Create the DPIIT2 form model
const Dpiit2Form = mongoose.model('Dpiit2Form', dpiit2Schema);

// Define the DPIIT3 form schema
const dpiit3Schema = new mongoose.Schema({
  memberName: { type: [String], required: true },
  memberRole: { type: [String], required: true },
  memberEmail: { type: [String], required: true },
  phoneNumber: { type: [String], required: true },
  linkedin: { type: [String] },
  gender: { type: [String] },
  dpiitSupport: { type: String, required: true }
});

// Create the DPIIT3 form model
const Dpiit3Form = mongoose.model('Dpiit3Form', dpiit3Schema);

// POST route to handle user registration
app.post('/signup', async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.json({ error: 'User already exists with this email' });
  }

  const newUser = new User({
    firstName,
    lastName,
    email,
    phone,
    password
  });

  try {
    await newUser.save();
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.json({ error: 'Error registering user' });
  }
});

// POST route to handle DPIIT form submissions
app.post('/dpiit-form', async (req, res) => {
  const { startupName, natureOfEntity, cin, pan, dpiitRegistrationNo, gstRegistrationNo, gstAuthorizedName, email, phone, sector, businessModel, yearOfReg } = req.body;

  const newDpiitForm = new DpiitForm({
    startupName,
    natureOfEntity,
    cin,
    pan,
    dpiitRegistrationNo,
    gstRegistrationNo,
    gstAuthorizedName,
    email,
    phone,
    sector,
    businessModel,
    yearOfReg
  });

  try {
    await newDpiitForm.save();
    res.json({ message: 'DPIIT form submitted successfully' });
  } catch (err) {
    res.json({ error: 'Error submitting DPIIT form' });
  }
});

// POST route to handle DPIIT2 form submissions
app.post('/dpiit2-form', async (req, res) => {
  const { country, state, district, zip, linkedin, website, twitter, facebook } = req.body;

  const newDpiit2Form = new Dpiit2Form({
    country,
    state,
    district,
    zip,
    linkedin,
    website,
    twitter,
    facebook
  });

  try {
    await newDpiit2Form.save();
    res.json({ message: 'DPIIT2 form submitted successfully' });
  } catch (err) {
    res.json({ error: 'Error submitting DPIIT2 form' });
  }
});

// POST route to handle DPIIT3 form submissions
app.post('/dpiit3-form', async (req, res) => {
  const { memberName, memberRole, memberEmail, phoneNumber, linkedin, gender, dpiitSupport } = req.body;

  const newDpiit3Form = new Dpiit3Form({
    memberName,
    memberRole,
    memberEmail,
    phoneNumber,
    linkedin,
    gender,
    dpiitSupport
  });

  try {
    await newDpiit3Form.save();
    res.json({ message: 'DPIIT3 form submitted successfully' });
  } catch (err) {
    res.json({ error: 'Error submitting DPIIT3 form' });
  }
});

// Set up the server
const port = 5000;  // Make sure the port is 5000 or adjust to your setup
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

