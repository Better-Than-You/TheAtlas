//Modded core.js
// Added hi , added Owner, added speed
//WORKING
//const now = require("performance-now");
const fs = require("fs");
const axios = require("axios");
const path = require("path");
let mergedCommands = [
  "help",
  "h",
  "menu",
  "hi",
  "hello", 
  "owner",
  "creator",
//  "ping",
//  "speed",
];

module.exports = {
  name: "others",
  alias: [...mergedCommands],
  uniquecommands: ["hi", "help", "owner",],
  description: "All miscleaneous commands",
  start: async (Atlas, m, { pushName, prefix, inputCMD, doReact,}) => {
    let pic = fs.readFileSync("./Assets/Atlas.jpg");
    switch (inputCMD) {      
      case "hi":
      case "hello":
          await doReact("✨");        
        const pad = (s) => (s < 10 ? "0" : "") + s;
        const formatTime = (seconds) => {
        const hours = Math.floor(seconds / (60 * 60));
        const minutes = Math.floor((seconds % (60 * 60)) / 60);
        const secs = Math.floor(seconds % 60);
        return time = `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
        };
        const uptime = () => formatTime(process.uptime());
        await Atlas.sendMessage(m.from,{image:{url:botImage1},caption:`\nHi ${pushName}, this is a Whatsapp bot. Accessing to Bot-Commands requires a *prefix* at the start.\n\n_⛩️ My prefix is:_ ${prefix}\n\nType *${prefix}help* to get my full command list.\n\n_🧩 Server Uptime:_ *${uptime()}*\n_🎀 Status:_ *Working*\n`},{quoted:m});  
        break;
        
      case "help":
      case "h":
      case "menu":
        await doReact("☃️");
        await Atlas.sendPresenceUpdate("composing", m.from);
        function readUniqueCommands(dirPath) {
          const allCommands = [];

          const files = fs.readdirSync(dirPath);

          for (const file of files) {
            const filePath = path.join(dirPath, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
              const subCommands = readUniqueCommands(filePath);
              allCommands.push(...subCommands);
            } else if (stat.isFile() && file.endsWith(".js")) {
              const command = require(filePath);

              if (Array.isArray(command.uniquecommands)) {
                const subArray = [file, ...command.uniquecommands];
                allCommands.push(subArray);
              }
            }
          }

          return allCommands;
        }

        function formatCommands(allCommands) {
          let formatted = "";

          for (const [file, ...commands] of allCommands) {
            const capitalizedFile =
              file.replace(".js", "").charAt(0).toUpperCase() +
              file.replace(".js", "").slice(1);

            formatted += `╟   🏮 *${capitalizedFile}* 🏮   ╢\n\n`;
            //formatted += `\`\`\`${commands.join("\n")}\`\`\`\n\n\n`;
            // Adding a - before each command
            formatted += `\`\`\`${commands
              .map((cmd) => `⥼   ${prefix + cmd}`)
              .join("\n")}\`\`\`\n\n\n`;
          }

          return formatted.trim();
        }

        const pluginsDir = path.join(process.cwd(), "Plugins");

        const allCommands = readUniqueCommands(pluginsDir);
        const formattedCommands = formatCommands(allCommands);
        var helpText = `\nHello *${pushName}*, This is a WhatsApp bot.\n*Keep in mind that this is still my number and I am hosting a bot in it.*\n\n*🔖 My Prefix is:*  ${prefix}\n\n*⛩️ Current character is set to:* ${botName}\n\n${formattedCommands}\n\n\n*©️ Sujatro🐦*`;
        await Atlas.sendMessage(
          m.from,
          { video: { url: botVideo }, gifPlayback: true, caption: helpText },
          { quoted: m }
        );

        break;
        case "owner":
case "creator":
const ownerNum = "916291780927"
const vcard = 'BEGIN:VCARD\n' +
            'VERSION:3.0\n' +
            'FN:' + 'Sujatro🐦' + '\n' +
            'ORG:;\n' +
            'TEL;type=CELL;type=VOICE;waid=' +                 ownerNum + ':+' + ownerNum + '\n' +
            'END:VCARD'
        let vcardContact = {
            contacts: { displayName: 'Sujatro🐦', contacts: [{ vcard }] },
            };
        await doReact("⚜️");
         Atlas.sendMessage(m.from, vcardContact, {quoted: m});
    break;
/*    case 'ping':
    case 'speed':
    try {
      const startTime = now();      
      await someTimeConsumingOperation();
      const endTime = now();
      const responseTime = (endTime - startTime).toFixed(4);
      return Atlas.sendMessage(
        message.from,
        { text: `⚡The current speed is: *${responseTime}ms*` },
        { quoted: m}
      );
    } catch (error) {
      console.error("Error occurred:", error);
      return m.reply("Some error ocurred!");
    }
    break;  */      
      default:
        break;
    }
  },
};


