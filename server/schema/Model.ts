import { Schema, model } from "mongoose";

const RoomSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  password: { type: String, default: null },
  autoDispose: { type: Boolean, default: true },
});

const Room = model("Room", RoomSchema);

export default Room;
