// Assuming you have already defined your express app and imported necessary modules

const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Define the route for creating events
router.post('/api/event', async (req, res) => {
    try {
        const eventData = req.body;
        const createdEvent = await Event.create(eventData);
        res.status(201).json({ message: 'Event created successfully', event: createdEvent });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
