const fs = require("fs");
const mongoose = require("mongoose");
const config = require("../Configurations.js");
const {
  checkLevelSwitch,
  updateBalance,
  actRpg,
  deactRpg,
  rob,
  canRob,
} = require("../System/MongoDB/MongoDb_Core");
const {
  playerData,
} = require("../System/MongoDB/MongoDB_Schema");

let mergedCommands = [
  "reg",
  "register",
  "daily",
  "profile",
  "rpg"
];

module.exports = {
  name: "others",
  alias: [...mergedCommands],
  uniquecommands: [
    "register",
    "daily",
    "rpg",
  ],
  description: "All rpg commands",
  start: async (
    Atlas,
    m,
    { pushName, prefix, inputCMD, doReact, text, args, mentionByTag, isCreator }
  ) => {
    rpgStatus = await checkLevelSwitch(m.from);
    switch (inputCMD) {
      case 'rpg':
        if (!isCreator) {
          await doReact("❌");
          return m.reply("Sorry, only my *Owner* can use this command.");
        }
        if (!m.isGroup) {
          await doReact("❌");
          return m.reply("Sorry, this a group command.");
        }
        if (!text) {
          await doReact("❔");
          return m.reply(
            `Please provide On / Off action !\n\n*Example:*\n\n${prefix}rpg on`
          );
        }
        if (args[0] == "on") {
          if (rpgStatus) {
            await doReact("❌");
            return m.reply(`*RPG* is already *Enabled* !`);
          }
          await doReact("🔰");
          await actRpg(m.from);
          await m.reply(
            `*RPG* has been *Enabled* Successfully !`
          );
        } else if (args[0] == "off") {
          if (!rpgStatus) {
            await doReact("❌");
            return m.reply(`*RPG* is already *Disabled* !`);
          }
          await doReact("🔰");
          await deactRpg(m.from);
          await m.reply(`*RPG* has been *Disabled* Successfully !`);
        } else {
          await doReact("❔");
          return m.reply(
            `Please provide On / Off action !\n\n*Example:*\n\n${prefix}rpg on`
          );
        }
        break;
      case "reg":
      case "register":
        if (!rpgStatus) {
          await doReact('❌');
          return m.reply(`Sorry, this command has been rejected\n\nRpg is not enabled`);
        }
        user = await playerData.findOne({ id: m.sender });
        if (!user) {
          await playerData.create({
            id: m.sender,
            name: pushName,
            balance: 1000,
            xp: 0,
            switchRob: true,
            robTime: new Date(),
            lastHunted: new Date(),

          });
          await doReact("🔰");
          return m.reply(`You have successfully registered!`);
        } else {
          await doReact('❌');
          return m.reply(`You have already registered!`);
        }
        break;

      case 'rob':
      case 'steal':
        if (!rpgStatus) {
          await doReact('❌');
          return m.reply(`Sorry, this command has been rejected\n\nRpg is not enabled`);
        }
        const user = await playerData.findOne({ id: m.sender });
        if (!user) {
          await doReact('❌');
          return m.reply(`Sorry, this command has been rejected\n\nPlease use *-register* first!`);
        }
        if (user.balance <= 1000) {
          await doReact('❌');
          return m.reply(`Before robbing anyone, first get some money yourself, you idiot!`);
        }
        if (!m.quoted) {
          await doReact("❌");
          return Atlas.sendMessage(
            m.from,
            { text: `Please tag a user!` },
            { quoted: m }
          );
        } else if (m.quoted) {
          var victim = m.quoted.sender;
        } else {
          var victim = mentionByTag[0];
        }
        var isRobbale = await canRob(victim);
        if (!isRobbale) {
          await doReact('❌');
          return m.reply(`Please let the victim rest! LOL`);
        }
        const stolenAmount = await rob(victim);
        if (stolenAmount > 0) {
          await updateBalance(m.from, stolenAmount);
          await doReact('💰');
          return Atlas.sendMessage(m.from, { text: `You have stolen ${stolenAmount} ฿ from @${victim("@")[0]}!!` }, { quoted: m }, { mentions: victim });
        }
        if (stolenAmount < 0) {
          await updateBalance(m.from, stolenAmount);
          return Atlas.sendMessage(m.from, { text: `You got caught while stealing and paid 1000 ฿ as a fine. Better luck next time dumbass` }, { quoted: m });
        }
        break;

        case 'profile':
          if (!rpgStatus) {
            await doReact('❌');
            return m.reply(`Sorry, this command has been rejected\n\nRpg is not enabled`);
          }
          user = await playerData.findOne({ id: m.sender });
          if (!user) {
            await doReact('❌');
            return m.reply(`Sorry, this command has been rejected
            
            Please use *-register* first`);
          }
          let mess = `---\n**User Profile**\n\n👤 **Name:** [${user.name}]\n🌟 **XP:** [${user.xp}]\n💰 **Balance:** [${user.blance}]\n👑 **Role:** [${titleByLevel(user.level)}]\n---`;
          await doReact('🔰');
          return Atlas.sendMessage(m.from, { text: mess }, { quoted: m });
          break;
          
      case 'hunt':
        if (!rpgStatus) {
          await doReact('❌');
          return m.reply(`Sorry, this command has been rejected\n\nRpg is not enabled`);
        }
        user = await playerData.findOne({ id: m.sender });
        if (!user) {
          await doReact('❌');
          return m.reply(`Sorry, this command has been rejected\n\nPlease use *-register* first`);
        }
        now = new Date();
        if (now - user.lastHunted < 2 * 60 * 1000) {
          await doReact('❌');
          return m.reply(`Please wait 2min before hunting again.`);
        }
        const huntableLocations = [
          "forest",
          "field",
          "mountain",
          "cave",
          "fridge",
          "sink",
        ];
        const userOptions = getRandomUniqueValues(huntableLocations);
        await gameData.create({
          gameType: 'Hunt',
          huntLocations: userOptions,
          host: m.sender,
          gameLocation: m.from,
        });
        await playerData.findOneAndUpdate({ id: m.sender }, { $set: { lastHunted: new Date() } })
        const mess = ``;
        for (const option in userOptions) {
          mess += `${userOptions.indexOf(option) + 1}. ${option}\n`;
        }
        break;

      case "daily":
        if (!rpgStatus) {
          await doReact('❌');
          return m.reply(`Sorry, this command has been rejected\n\nRpg is not enabled`);
        }
        user = await playerData.findOne({ id: m.sender });
        if (!user) {
          await doReact('❌');
          return m.reply(`Sorry, this command has been rejected\n\nPlease use *-register* first!`);
        }
        const currentDate = new Date();
        const lastClaimDate = await user.last_daily_claim;
        if (currentDateTime - lastClaimDate >= 24 * 60 * 60 * 1000) {
          await updateBalance(m.reply, 250);
          await playerData.findOneAndUpdate({ id: m.sender }, { $set: { last_daily_claim: new Date() } });
          await doReact('💰');
          return m.reply(`Your have successfully claimed your daily reward`);
        }
        await doReact('❌');
        return m.reply(`You have already claimed your daily reward`);
        break;

      case 'add':
        if (!rpgStatus) {
          await doReact('❌');
          return m.reply(`Sorry, this command has been rejected\n\nRpg is not enabled`);
        }
        if (!isCreator) {
          await doReact('❌');
          return m.reply(`Sorry, this command has been rejected
          
          This command is currently only for my *Owner*`);
        }
        if (!text && !m.quoted) {
          await doReact("❌");
          return Atlas.sendMessage(
            m.from,
            { text: `Please tag a user!` },
            { quoted: m }
          );
        } else if (m.quoted) {
          var mentionedUser = m.quoted.sender;
          var bal = !text ? 0 : Number.parseInt(text);
        } else {
          var mentionedUser = mentionByTag[0];
          var bal = !text ? 0 : Number.parseInt(text.split(', ')[1]);
        }
        user = await playerData.findOne({ id: mentionedUser });
        await updateBalance(mentionedUser, bal);
        await doReact('');
        return Atlas.sendMessage(m.from, { text: `Successfully added ${bal} ฿ to @${mentionedUser.split('@')[0]}'s balance` }, { mentions: [mentionedUser] });
        break;
      default:
        break;
    }
  },
};



function titleByLevel(level) {
  switch (level) {
    case 0:
      return 'Civilian';
      break;
    case 1:
      return 'Mountain-Bandit';
      break;
    case 2:
      return 'Crewmate';
      break;
    case 3:
      return '2nd-Division Commander';
      break;
    case 4:
      return '1st-Division Commander';
      break;
    case 5:
      return 'Pirate King'
      break;
    default:
      return 'Null';
      break;
  }
}
function getRandomUniqueValues(sourceArray) {
  const result = [];
  const usedIndices = new Set();
  while (result.length < 3) {
    const randomIndex = Math.floor(Math.random() * sourceArray.length);

    if (!usedIndices.has(randomIndex)) {
      result.push(sourceArray[randomIndex]);
      usedIndices.add(randomIndex);
    }
  }
  return result;
}
