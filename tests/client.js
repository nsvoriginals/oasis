const Colyseus = require('colyseus.js');

const client = new Colyseus.Client('ws://localhost:3000');

async function connect() {
    const room = await client.joinOrCreate('my_room');
    console.log('Joined room:', room.id);

    room.onMessage('update', (state) => {
        console.log('State update:', state);
    });

    // Send a move message
    room.send('move', { x: 10, y: 20 });
}

connect();
