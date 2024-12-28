const colyseus = require('colyseus');
const http = require('http');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
}));

class GameRoom extends colyseus.Room {
    onCreate(options) {
        this.setState({
            players: {}
        });

        this.onMessage('move', (client, data) => {
            this.state.players[client.id] = data;
            this.broadcast('update', this.state.players);
        });
    }

    onJoin(client, options) {
        this.state.players[client.id] = { x: 0, y: 0 };
    }

    onLeave(client, consented) {
        delete this.state.players[client.id];
    }

    onDispose() {
    }
}

const server = http.createServer(app);

const gameServer = new colyseus.Server({
    server: server,
});

gameServer.define('game_room', GameRoom);

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Colyseus server is running on http://localhost:${PORT}`);
});
