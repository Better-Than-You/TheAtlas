const mongoose = require("mongoose");
const config = require("../../Configurations.js");
const options = {
  socketTimeoutMS: 30000,
};

// ----------------------- Atlas can work with upto 4 MongoDB databases at once to distribute DB load  -------------------- //

const db1 = mongoose.createConnection(config.mongodb, options); // You malually put first mongodb url here
const db2 = mongoose.createConnection(config.mongodb, options); // You malually put second mongodb url here

const GroupSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  antilink: { type: Boolean, default: false },
  nsfw: { type: Boolean, default: false },
  bangroup: { type: Boolean, default: false },
  chatBot: { type: Boolean, default: false },
  botSwitch: { type: Boolean, default: true },
  switchNSFW: { type: Boolean, default: false },
  switchWelcome: { type: Boolean, default: false },
  
});

const UserSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  react: { type: Boolean, default: false },
  ban: { type: Boolean, default: false },
  reason: { type: String, default: 'No reason provided'},
  name: { type: String },
  addedMods: { type: Boolean, default: false },
  afk: { type: Boolean, default: false },
  afkText: { type: String },
  afkTime: { type: Date },
  
});

const CoreSchema = new mongoose.Schema({
  id: { type: String, unique: false, required: true, default: "1" },
  seletedCharacter: { type: String, default: "0" },
  PMchatBot: { type: Boolean, default: false },
  botMode: { type: String, default: "public" },
});

const PluginSchema = new mongoose.Schema({
  plugin: { type: String },
  url: { type: String },
});

const CommandSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  lock: {type: Boolean, default: false},
});



const userData = db1.model("UserData", UserSchema);
const groupData = db1.model("GroupData", GroupSchema);
const systemData = db2.model("SystemData", CoreSchema);
const pluginData = db2.model("PluginData", PluginSchema);
const commandData = db2.model("CommandData", CommandSchema);


module.exports = { userData, groupData, systemData, pluginData, commandData };
