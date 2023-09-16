const {
  userData,
  groupData,
  systemData,
  pluginData,
  commandData,
} = require("../MongoDB/MongoDB_Schema.js");
const mongoose = require("mongoose");

//Going Afk
async function goAfk(userId, string) {
  const user = await userData.findOne({ id: userId });
  if (!user) {
    await userData.create({ id: userId, afk: true, afkMessage: string, afkTime: new Date() });
    return;
  }
  if (user.afk) {
    await userData.findOneAndUpdate({ id: userId }, { $set: { afkTime: new Date() } })
    return;
  }
  await userData.findOneAndUpdate({ id: userId }, { $set: { afk: true } });
  await userData.findOneAndUpdate({ id: userId }, { $set: { afkMessage: string } });
  await userData.findOneAndUpdate({ id: userId }, { $set: { afkTime: new Date() } });
}
//Afkoff
async function afkOff(userId) {
  const user = await userData.findOne({ id: userId });
  if (!user) {    
    await userData.create({ id: userId, afk: false, afkMessage: '', afkTime: 0 });
    return;
  }
    await userData.findOneAndUpdate({ id: userId }, { $set: { afk: false } });
    await userData.findOneAndUpdate({ id: userId }, { $set: { afkMessage: '' } });
    await userData.findOneAndUpdate({ id: userId }, { $set: { afkTime: 0 } });    
    return;
}
//Afk Data
async function afkData(userId) {
  var user = await userData.findOne({ id: userId });
  var afkText = user.afkMessage;
  var afkTime = user.afkTime;
  const timeDifference = currentTime - afkTime;
  const formattedTime = secondsToDhms(timeDifference/1000);
  var currentTime = new Date();
  if (afkText = 'nothing') {
    return `Reason for AFK: *No reason provided*\n\nAFK time: ${formattedTime}`;
  }
  return `Reason for AFK: *${afktxt}*\n\nAFK time: ${formattedTime}`;
}

//Check AFK
async function checkAfk(userId) {
  const user = await userData.findOne({ id: userId });
  if (!user) {
    return false;
  }
  return user.afk;
}
//Lock command
async function lock(cmdId) {
  const command = await commandData.findOne({ id: cmdId });
  if (!command) {
    await commandData.create({ id: cmdId, lock: true });
    return;
  }
  if (command.lock) {
    return;
  }
  await commandData.findOneAndUpdate({ id: cmdId }, { $set: { lock: true } });
}
//Check Lock
async function checkLock(cmdId) {
  const command = await commandData.findOne({ id: cmdId });
  if (!command) {
    return false;
  }
  return command.lock;
}
//Unlock cmd
async function unlock(cmdId) {
  const command = await commandData.findOne({ id: cmdId });
  if (!command) {
    await commandData.create({ id: cmdId, lock: false });
    return;
  }
  if (!command.lock) {
    return;
  }
  await commandData.findOneAndUpdate({ id: cmdId }, { $set: { lock: false } });
}
//Activate Auto-React
async function actAuto(userId) {
  const user = await userData.findOne({ id: userId });
  if (!user) {
    await userData.create({ id: userId, react: true });
    return;
  }
  if (user.react) {
    return;
  }
  await userData.findOneAndUpdate({ id: userId }, { $set: { react: true } });
}
//Check Auto-React
async function checkAutoOn(userId) {
  const user = await userData.findOne({ id: userId });
  if (!user) {
    return false;
  }
  return user.react;
}
//Deactivate Auto-React
async function deactAuto(userId) {
  const user = await userData.findOne({ id: userId });
  if (!user) {
    await userData.create({ id: userId, react: false });
    return;
  }
  if (!user.react) {
    return;
  }
  await userData.findOneAndUpdate({ id: userId }, { $set: { react: false } });
}
// BAN USER
async function banUser(userId, string) {
  const user = await userData.findOne({ id: userId });
  banReason = !string ? 'No reason provided' : string;
  if (!user) {
    await userData.create({ id: userId, ban: true, reason: banReason });
    return;
  }
  if (user.ban) {
    return;
  }
  await userData.findOneAndUpdate({ id: userId }, { $set: { ban: true } });
  await userData.findOneAndUpdate({ id: userId }, { $set: { reason: banReason } });
}

// CHECK BAN STATUS
async function checkBan(userId) {
  const user = await userData.findOne({ id: userId });
  if (!user) {
    return false;
  }
  return user.ban;
}

// UNBAN USER
async function unbanUser(userId) {
  const user = await userData.findOne({ id: userId });
  if (!user) {
    await userData.create({ id: userId, ban: false, reason: '' });
    return;
  }
  if (!user.ban) {
    return;
  }
  await userData.findOneAndUpdate({ id: userId }, { $set: { ban: false } });
}

// ADD MOD
async function addMod(userId) {
  const ownerlist = global.owner;
  if (ownerlist.includes(userId)) {
    return;
  }
  const user = await userData.findOne({ id: userId });
  if (!user) {
    await userData.create({ id: userId, addedMods: true });
    return;
  }
  if (user.addedMods) {
    return;
  }
  await userData.findOneAndUpdate({ id: userId },{ $set: { addedMods: true } });
}

// CHECK MOD STATUS
async function checkMod(userId) {
  const ownerlist = global.owner;
  if (ownerlist.includes(userId)) {
    return true;
  }
  const user = await userData.findOne({ id: userId });
  if (!user) {
    return false;
  }
  return user.addedMods;
}

// DEL MOD
async function delMod(userId) {
  const ownerlist = global.owner;
  if (ownerlist.includes(userId)) {
    return;
  }
  const user = await userData.findOne({ id: userId });
  if (!user) {
    await userData.create({ id: userId, addedMods: false });
    return;
  }
  if (!user.addedMods) {
    return;
  }
  await userData.findOneAndUpdate({ id: userId }, { $set: { addedMods: false } });
}

// SET CHAR ID
async function setChar(charId) {
  const character = await systemData.findOne({ id: "1" });
  if (!character) {
    await systemData.create({ id: "1", seletedCharacter: charId });
    return;
  }
  await systemData.findOneAndUpdate({ id: "1" }, { $set: { seletedCharacter: charId } });
}

// GET CHAR ID
async function getChar() {
  const character = await systemData.findOne({ id: "1" });
  if (!character) {
    return "0";
  }
  return character.seletedCharacter;
}

// ACTIVATE PM CHATBOT
async function activateChatBot() {
  const chatbotpm = await systemData.findOne({ id: "1" });
  if (!chatbotpm) {
    await systemData.create({ id: "1", PMchatBot: true });
    return;
  }
  if (chatbotpm.PMchatBot) {
    return;
  }
  await systemData.findOneAndUpdate({ id: "1" }, { $set: { PMchatBot: true } });
}

// CHECK PM CHATBOT STATUS
async function checkPmChatbot() {
  const chatbotpm = await systemData.findOne({ id: "1" });
  if (!chatbotpm) {
    return false;
  }
  return chatbotpm.PMchatBot;
}

// DEACTIVATE PM CHATBOT
async function deactivateChatBot() {
  const chatbotpm = await systemData.findOne({ id: "1" });
  if (!chatbotpm) {
    await systemData.create({ id: "1", PMchatBot: false });
    return;
  }
  if (!chatbotpm.PMchatBot) {
    return;
  }
  await systemData.findOneAndUpdate({ id: "1" }, { $set: { PMchatBot: false } });
}

// SET WELCOME MESSAGE
async function setWelcome(groupID) {
  const group = await groupData.findOne({ id: groupID });
  if (!group) {
    await groupData.create({ id: groupID, switchWelcome: true });
    return;
  }
  if (group.switchWelcome) {
    return;
  }
  await groupData.findOneAndUpdate({ id: groupID }, { $set: { switchWelcome: true } });
}

// CHECK WELCOME MESSAGE STATUS
async function checkWelcome(groupID) {
  const group = await groupData.findOne({ id: groupID });
  if (!group) {
    return false;
  }
  return group.switchWelcome;
}

// DELETE WELCOME MESSAGE
async function delWelcome(groupID) {
  const group = await groupData.findOne({ id: groupID });
  if (!group) {
    await groupData.create({ id: groupID, switchWelcome: false });
    return;
  }
  if (!group.switchWelcome) {
    return;
  }
  await groupData.findOneAndUpdate({ id: groupID }, { $set: { switchWelcome: false } });
}

// SET ANTI-LINK
async function setAntilink(groupID) {
  const group = await groupData.findOne({ id: groupID });
  if (!group) {
    await groupData.create({ id: groupID, antilink: true });
    return;
  }
  if (group.antilink) {
    return;
  }
  await groupData.findOneAndUpdate({ id: groupID }, { $set: { antilink: true } });
}

// CHECK ANTI-LINK STATUS
async function checkAntilink(groupID) {
  const group = await groupData.findOne({ id: groupID });
  if (!group) {
    return false;
  }
  return group.antilink;
}

// DELETE ANTI-LINK
async function delAntilink(groupID) {
  const group = await groupData.findOne({ id: groupID });
  if (!group) {
    await groupData.create({ id: groupID, antilink: false });
    return;
  }
  if (!group.antilink) {
    return;
  }
  await groupData.findOneAndUpdate({ id: groupID }, { $set: { antilink: false } });
}

// SET GROUP CHATBOT
async function setGroupChatbot(groupID) {
  const group = await groupData.findOne({ id: groupID });
  if (!group) {
    await groupData.create({ id: groupID, chatBot: true });
    return;
  }
  if (group.chatBot) {
    return;
  }
  await groupData.findOneAndUpdate({ id: groupID }, { $set: { chatBot: true } });
}

// CHECK GROUP CHATBOT STATUS
async function checkGroupChatbot(groupID) {
  const group = await groupData.findOne({ id: groupID });
  if (!group) {
    return false;
  }
  return group.chatBot;
}

// DELETE GROUP CHATBOT
async function delGroupChatbot(groupID) {
  const group = await groupData.findOne({ id: groupID });
  if (!group) {
    await groupData.create({ id: groupID, chatBot: false });
    return;
  }
  if (!group.chatBot) {
    return;
  }
  await groupData.findOneAndUpdate({ id: groupID }, { $set: { chatBot: false } });
}

// SET BOT MODE
async function setBotMode(mode) {
  const selectedMode = await systemData.findOne({ id: "1" });
  if (!selectedMode) {
    await systemData.create({ id: "1", botMode: mode });
    return;
  }
  if (selectedMode.botMode == mode) {
    return;
  }
  await systemData.findOneAndUpdate({ id: "1" }, { $set: { botMode: mode } });
}

// GET BOT MODE
async function getBotMode() {
  const selectedMode = await systemData.findOne({ id: "1" });
  if (!selectedMode) {
    return "public";
  }
  return selectedMode.botMode;
}

// BAN GROUP
async function banGroup(groupID) {
  const group = await groupData.findOne({ id: groupID });
  if (!group) {
    await groupData.create({ id: groupID, bangroup: true });
    return;
  }
  if (group.bangroup) {
    return;
  }
  await groupData.findOneAndUpdate({ id: groupID }, { $set: { bangroup: true } });
}

// CHECK BAN GROUP STATUS
async function checkBanGroup(groupID) {
  const group = await groupData.findOne({ id: groupID });
  if (!group) {
    return false;
  }
  return group.bangroup;
}

// UNBAN GROUP
async function unbanGroup(groupID) {
  const group = await groupData.findOne({ id: groupID });
  if (!group) {
    await groupData.create({ id: groupID, bangroup: false });
    return;
  }
  if (!group.bangroup) {
    return;
  }
  await groupData.findOneAndUpdate({ id: groupID }, { $set: { bangroup: false } });
}

/*// PUSH NEW INSTALLED PLUGIN IN DATABASE
async function pushPlugin(newPlugin, url) {
  const pluginsCollection = db.collection("plugins");
  const plugin = {
    plugin: newPlugin,
    url: url,
  };
  await pluginsCollection.insertOne(plugin);
}

// Check if plugin is installed
async function isPluginPresent(pluginName) {
  const pluginsCollection = db.collection("plugins");
  const plugin = await pluginsCollection.findOne({ plugin: pluginName });
  return !!plugin;
}

// DELETE A PLUGIN FROM THE DATABASE
async function delPlugin(pluginName) {
  const pluginsCollection = db.collection("plugins");
  const plugin = await pluginsCollection.findOne({ plugin: pluginName });
  if (!plugin) {
    throw new Error("The plugin is not present in the database.");
  }
  await pluginsCollection.deleteOne({ plugin: pluginName });
}*/

// PUSH NEW INSTALLED PLUGIN IN DATABASE
async function pushPlugin(newPlugin, url) {
  const plugin = new pluginData({
    plugin: newPlugin,
    url: url,
  });
  await plugin.save();
}


// Check if plugin is installed
async function isPluginPresent(pluginName) {
  const plugin = await pluginData.findOne({ plugin: pluginName });
  return !!plugin;
}

// DELETE A PLUGIN FROM THE DATABASE
async function delPlugin(pluginName) {
  const plugin = await pluginData.findOne({ plugin: pluginName });
  if (!plugin) {
    throw new Error("The plugin is not present in the database.");
  }
  await pluginData.deleteOne({ plugin: pluginName });
}

// Get all installed plugin URLs as an array
async function getPluginURLs() {
  const plugins = await pluginData.find({}, 'url');
  const urls = plugins.map(plugin => plugin.url);
  return urls;
}

// Getting all plugins as an array
async function getAllPlugins() {
  const plugins = await pluginData.find({}, { plugin: 1, url: 1 });
  return plugins;
}

//normal functions
function secondsToDhms(seconds) {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const result = [];
  
  if (days > 0) {
    result.push(`${days}d`);
  }

  if (hours > 0) {
    result.push(`${hours}h`);
  }

  if (minutes > 0) {
    result.push(`${minutes}m`);
  }

  if (remainingSeconds > 0) {
    result.push(`${remainingSeconds}s`);
  }

  return result.join(' ');
}


// Exporting the functions
module.exports = {
  banUser, //----------------------- BAN
  checkBan, // --------------------- CHECK BAN STATUS
  unbanUser, // -------------------- UNBAN
  goAfk, // -------------------- GOING AFK
  checkAfk, // -------------------- CHECK AFK STATUS
  afkOff, // ----------------------- RETURNING FROM AFK
  afkData, //----------------------- AFK DATA
  lock, // -------------------- LOCK COMMAND
  checkLock, // CHECK LOCK STATUS OF COMMAND
  unlock, // -------------------- UNLOCK COMMAND
  actAuto, //  --------------------- ACTIVATE AUTO-REACT 
  checkAutoOn, //  --------------------- CHECK AUTO-REACT STATUS
  deactAuto, //  --------------------- DEACTIVATE AUTO-REACT
  addMod, // ----------------------- ADD MOD
  checkMod, // --------------------- CHECK MOD STATUS
  delMod, // ----------------------- DEL MOD
  setChar, // ---------------------- SET CHAR ID
  getChar, // ---------------------- GET CHAR ID
  activateChatBot, // -------------- ACTIVATE PM CHATBOT
  checkPmChatbot, // --------------- CHECK PM CHATBOT STATUS
  deactivateChatBot, // ------------ DEACTIVATE PM CHATBOT
  pushPlugin, // ------------------- PUSH NEW INSTALLED PLUGIN IN DATABASE
  isPluginPresent, // -------------- Check if plugin is installed
  delPlugin, // -------------------- DELETE A PLUGIN FROM THE DATABASE
  setWelcome, // ------------------- SET WELCOME MESSAGE
  checkWelcome, // ----------------- CHECK WELCOME MESSAGE STATUS
  delWelcome, // ------------------- DELETE WELCOME MESSAGE
  setAntilink, // ------------------ SET ANTILINK
  checkAntilink, // ---------------- CHECK ANTILINK STATUS
  delAntilink, // ------------------ DELETE ANTILINK
  setGroupChatbot, // -------------- SET GROUP CHATBOT
  checkGroupChatbot, // ------------ CHECK GROUP CHATBOT STATUS
  delGroupChatbot, // -------------- DELETE GROUP CHATBOT
  setBotMode, // ------------------- SET BOT MODE
  getBotMode, // ------------------- GET BOT MODE
  banGroup, // --------------------- BAN GROUP
  checkBanGroup, //----------------- CHECK BAN STATUS OF A GROUP
  unbanGroup, // ------------------- UNBAN GROUP
  getPluginURLs, // ---------------- Get all installed plugin URLs as an array
  getAllPlugins, // ---------------- Getting all plugins as an array
};
