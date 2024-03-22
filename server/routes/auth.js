const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Event = require('../models/Event');
const authenticateUser = require('../middleware/authenticate');

// Route for user registration
router.post('/register', async (req, res) => {
  const { name, phoneNumber, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      name,
      phoneNumber,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const jwtSecret = process.env.JWT_SECRET;

    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });

    res.json({ username: user.name, token, id: user._id });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//route for Browsing events
router.get('/events', async (req, res) => {
  try {

    const events = await Event.find();
    res.json(events); 
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).send('Internal Server Error');
  }
});

//route for creating events
router.post('/createEvent', async (req, res) => {
  const { title, description, date, time, location, category, capacity, registrationDeadline } = req.body;

  try {
    const event = new Event({
      title,
      description,
      date,
      time,
      location,
      category,
      capacity,
      registrationDeadline,
    });

    await event.save();

    res.status(201).json({ message: 'Event created successfully' });
  } catch (error) {
    console.error('Event creation error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const Registration = require('../models/Registration');

//route for registering events
router.post('/register-event/:eventId', authenticateUser, async (req, res) => {
  const { eventId } = req.params;
  const userId = req.user.userId;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const existingRegistration = await Registration.findOne({ user: userId, event: eventId });
    if (existingRegistration) {
      return res.status(400).json({ message: 'User already registered for the event' });
    }

    const registration = new Registration({ user: userId, event: eventId });
    await registration.save();

    res.status(200).json({ message: 'Successfully registered for the event' });
  } catch (error) {
    console.error('Error registering for event:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


//route to get registered events
router.get('/registered-events/:userId', authenticateUser, async (req, res) => {
  const userId = req.params.userId;

  try {
    const registrations = await Registration.find({ user: userId });
    console.log("Registrations before population:", registrations);

    const populatedRegistrations = await Registration.find({ user: userId }).populate('event');
    console.log("Registrations after population:", populatedRegistrations);

    const events = populatedRegistrations.map(registration => registration.event);
    console.log("Events:", events);

    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching registered events:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = router;
