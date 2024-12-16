import bcrypt from "bcrypt";
import { Room, Client, ServerError } from "colyseus";
import { Dispatcher } from "@colyseus/command";
import {
  Player,
  OfficeState,
  Computer,
  Whiteboard,
} from "./schema/OfficeState";
import mongoose from "mongoose";
import connectDB from "../db";

connectDB();

const roomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  hasPassword: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const RoomModel = mongoose.model("Room", roomSchema);

export class Oasis extends Room<OfficeState> {
  public dispatcher = new Dispatcher(this);
  public name: string;
  public description: string;
  public password: string | null = null;
  async onCreate(options: {
    name: string;
    description: string;
    password?: string | null;
    autoDispose: boolean;
  }) {
    const { name, description, password, autoDispose } = options;

    this.name = name;
    this.description = description;
    this.autoDispose = autoDispose;

    let hasPassword = false;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(password, salt);
      hasPassword = true;
    }

    this.setMetadata({ name, description, hasPassword });

    const roomData = new RoomModel({
      roomId: this.roomId,
      name: this.name,
      description: this.description,
      hasPassword,
    });

    const existingRoom = await RoomModel.findOne({ roomId: this.roomId });
    if (!existingRoom) {
      await roomData.save();
    }

    this.setState(new OfficeState());
    for (let i = 0; i < 5; i++) {
      this.state.computers.set(String(i), new Computer());
    }
    for (let i = 0; i < 3; i++) {
      this.state.whiteboards.set(String(i), new Whiteboard());
    }
  }

  async onAuth(client: Client, options: { password: string | null }) {
    if (this.password) {
      const validPassword = await bcrypt.compare(
        options.password,
        this.password,
      );
      if (!validPassword) {
        throw new ServerError(403, "Password is incorrect!");
      }
    }
    return true;
  }

  onJoin(client: Client, options: any) {
    this.state.players.set(client.sessionId, new Player());
    client.send("SEND_ROOM_DATA", {
      id: this.roomId,
      name: this.name,
      description: this.description,
    });
  }

  onLeave(client: Client, consented: boolean) {
    if (this.state.players.has(client.sessionId)) {
      this.state.players.delete(client.sessionId);
    }
    this.state.computers.forEach((computer) => {
      if (computer.connectedUser.has(client.sessionId)) {
        computer.connectedUser.delete(client.sessionId);
      }
    });
    this.state.whiteboards.forEach((whiteboard) => {
      if (whiteboard.connectedUser.has(client.sessionId)) {
        whiteboard.connectedUser.delete(client.sessionId);
      }
    });
  }

  onDispose() {
    this.state.whiteboards.forEach((whiteboard) => {
      if (whiteboard.roomId) whiteboard.roomId = null;
    });
    this.dispatcher.stop();
  }
}

export class ExtendedRoom extends Oasis {
  private roomModel: mongoose.Model<any>;

  async onCreate(options: {
    name: string;
    description: string;
    password?: string | null;
    autoDispose: boolean;
  }) {
    await super.onCreate(options);

    this.roomModel = mongoose.model("Room", roomSchema, "rooms");
    const newRoom = new this.roomModel({
      roomId: this.roomId,
      name: this.name,
      description: this.description,
      hasPassword: !!this.password,
    });
    await newRoom.save();
  }

  async saveRoomToDatabase() {
    const newRoom = new this.roomModel({
      roomId: this.roomId,
      name: this.name,
      description: this.description,
      hasPassword: !!this.password,
    });
    await newRoom.save();
  }

  async getRoomData() {
    const data = await this.roomModel.findOne({ name: this.name });
    return data;
  }
}
