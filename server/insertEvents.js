// insertEvents.js
//to insert events into Event Collection for browsing
const mongoose = require('mongoose');
const Event = require('./models/Event'); // Assuming Event model is defined in Event.js

mongoose.connect('mongodb://localhost:27017/PrepInstaMERN')
  .then(() => {
    console.log('Connected to MongoDB');

    const eventsData = [
        {
          "title": "Conference on Artificial Intelligence",
          "description": "Join us for an insightful conference on the latest developments in artificial intelligence.",
          "date": "2024-04-15",
          "time": "09:00 AM",
          "location": "Virtual Event",
          "category": "Conference",
          "capacity": 100,
          "registrationDeadline": "2024-04-10",
          "creator": "65fc49c58f9ba9db7971c691"
        },
        {
          "title": "Workshop on Web Development",
          "description": "Learn the fundamentals of web development in this hands-on workshop.",
          "date": "2024-04-20",
          "time": "10:00 AM",
          "location": "TechHub Campus",
          "category": "Workshop",
          "capacity": 50,
          "registrationDeadline": "2024-04-15",
          "creator": "65fc49c58f9ba9db7971c691"
        },
        {
          "title": "Networking Mixer for Entrepreneurs",
          "description": "Network with fellow entrepreneurs and industry professionals over drinks and snacks.",
          "date": "2024-04-25",
          "time": "06:00 PM",
          "location": "City Lounge",
          "category": "Networking",
          "capacity": 80,
          "registrationDeadline": "2024-04-20",
          "creator": "65fc49c58f9ba9db7971c691"
        },
        {
          "title": "Art Exhibition: Modern Masterpieces",
          "description": "Explore contemporary art from local and international artists.",
          "date": "2024-04-30",
          "time": "11:00 AM",
          "location": "Gallery XYZ",
          "category": "Art Exhibition",
          "capacity": 120,
          "registrationDeadline": "2024-04-25",
          "creator": "65fc49c58f9ba9db7971c691"
        },
        {
          "title": "Yoga Retreat in Nature",
          "description": "Reconnect with nature and rejuvenate your mind, body, and soul through yoga and meditation.",
          "date": "2024-05-05",
          "time": "08:00 AM",
          "location": "Mountain Retreat Center",
          "category": "Retreat",
          "capacity": 30,
          "registrationDeadline": "2024-04-30",
          "creator": "65fc49c58f9ba9db7971c691"
        },
        {
          "title": "Music Concert: Jazz Night",
          "description": "Enjoy an evening of smooth jazz performed by renowned musicians.",
          "date": "2024-05-10",
          "time": "07:30 PM",
          "location": "Jazz Club",
          "category": "Music Concert",
          "capacity": 150,
          "registrationDeadline": "2024-05-05",
          "creator": "65fc49c58f9ba9db7971c691"
        },
        {
          "title": "Tech Talk: Future of Artificial Intelligence",
          "description": "Dive deep into the future possibilities of artificial intelligence and its impact on society.",
          "date": "2024-05-15",
          "time": "02:00 PM",
          "location": "TechHub Auditorium",
          "category": "Tech Talk",
          "capacity": 200,
          "registrationDeadline": "2024-05-10",
          "creator": "65fc49c58f9ba9db7971c691"
        },
        {
          "title": "Cooking Class: Italian Cuisine",
          "description": "Learn how to prepare delicious Italian dishes from a professional chef.",
          "date": "2024-05-20",
          "time": "05:00 PM",
          "location": "Culinary Studio",
          "category": "Cooking Class",
          "capacity": 25,
          "registrationDeadline": "2024-05-15",
          "creator": "65fc49c58f9ba9db7971c691"
        },
        {
          "title": "Charity Run: Race for a Cause",
          "description": "Participate in a charity run to support a local cause and promote fitness.",
          "date": "2024-05-25",
          "time": "08:00 AM",
          "location": "City Park",
          "category": "Charity Event",
          "capacity": 300,
          "registrationDeadline": "2024-05-20",
          "creator": "65fc49c58f9ba9db7971c691"
        },
        {
          "title": "Movie Night: Classic Film Screening",
          "description": "Watch a timeless classic on the big screen under the stars.",
          "date": "2024-05-30",
          "time": "07:00 PM",
          "location": "Open Air Theater",
          "category": "Movie Night",
          "capacity": 100,
          "registrationDeadline": "2024-05-25",
          "creator": "65fc49c58f9ba9db7971c691"
        }
      ];      

    // Insert documents into the "events" collection
    Event.insertMany(eventsData)
      .then((result) => {
        console.log('Documents inserted successfully:', result);
      })
      .catch((error) => {
        console.error('Error inserting documents:', error);
      })
      .finally(() => {
        // Close the MongoDB connection
        mongoose.disconnect();
      });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
