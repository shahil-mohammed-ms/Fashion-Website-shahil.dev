const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SellerAuth = require('../src/db/Models/SellerSchema')
const UserAuth = require('../src/db/Models/UserSchema')


const auth = require('../src/Middleware/SellerAuthentication')

router.get('/',auth,(req,res)=>{

  res.send('demo') 
})
// Your JWT secret key (should match the one used for signing the token)


// Define an Express.js route handler
router.get('/getId',auth, (req, res) => {

    res.json({ message: 'succcess' }); 
  
});


router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await SellerAuth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new SellerAuth({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Create a JWT token for the new user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
console.log(email,password)
    // Find the user by email
    const user = await SellerAuth.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Create a JWT token for the authenticated user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


//User
router.post('/UserSignup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body)

    // Check if the user already exists
    const existingUser = await UserAuth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserAuth({
      name,
      email,
      password: hashedPassword,
    }); 

    // Save the user to the database
    await newUser.save();

    // Create a JWT token for the new user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



router.post('/UserLogin', async (req, res) => {
  try {
    const { email, password } = req.body;
console.log(email,password)
    // Find the user by email
    const user = await UserAuth.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Create a JWT token for the authenticated user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



module.exports = router;