// routes/events.js

const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Route to handle event registration
router.post('/register/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const { userId } = req.body; // Assuming you have user authentication implemented
    
    // Find the event by ID
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Add the user to the list of registered attendees
    event.attendees.push(userId);
    await event.save();
    
    res.status(200).json({ message: 'Successfully registered for the event' });
  } catch (error) {
    console.error('Error registering for event:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
