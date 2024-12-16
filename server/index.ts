import express from 'express';
import Room from './schema/Model';
import { Server, LobbyRoom } from 'colyseus';
import { monitor } from '@colyseus/monitor';
import connectDB from './db'; // Assuming you have a function to connect to DB

const app = express();
const port = Number(process.env.PORT || 2567);

// Middleware
app.use(express.json()); // For parsing JSON bodies

// Connect to the database
connectDB();

// POST route to handle room creation
app.post('/submitroomdata', async (req, res) => {
  try {
    const { name, description, password, autoDispose } = req.body;

    // Validate the incoming data
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required.' });
    }

    // Create a new room entry in the database
    const newRoom = new Room({ name, description, password, autoDispose });

    // Save the room data to the database
    await newRoom.save();

    // Respond with the created room
    res.status(201).json({ message: 'Room created successfully', room: newRoom });
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ error: 'Failed to create room' });
  }
});

// Set up Colyseus game server
const gameServer = new Server({
  server: app,
});
gameServer.define('lobby', LobbyRoom);
gameServer.listen(port);

app.use('/colyseus', monitor());
console.log(`Listening on ws://localhost:${port}`);
