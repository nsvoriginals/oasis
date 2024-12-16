import http from "http";
import express from "express";
import cors from "cors";
import { Server, LobbyRoom } from "colyseus";
import { monitor } from "@colyseus/monitor";
import { RoomType } from "../types/Rooms";
import connectDB from "./db";

import { Oasis } from "./rooms/Oasis";

const port = Number(process.env.PORT || 2567);
const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const gameServer = new Server({
  server,
});

connectDB();

//COLYSEUS
gameServer.define(RoomType.LOBBY, LobbyRoom);
gameServer.define(RoomType.PUBLIC, Oasis, {
  name: "Public Lobby",
  description:
    "For making friends and familiarizing yourself with the controls",
  password: null,
  autoDispose: false,
});
gameServer.define(RoomType.CUSTOM, Oasis).enableRealtimeListing();

app.use("/colyseus", monitor());

gameServer.listen(port);
console.log(`Listening on ws://localhost:${port}`);
