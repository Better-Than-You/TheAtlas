const got = require("got");
const fs = require("fs");
const path = require("path");
const { readcommands } = require("../System/ReadCommands.js");
const {
  pushPlugin, // -------------------- PUSH NEW INSTALLED PLUGIN IN DATABASE
  isPluginPresent, // --------------- CHECK IF PLUGIN IS ALREADY PRESENT IN DATABASE
  delPlugin, // --------------------- DELETE A PLUGIN FROM THE DATABASE
  getAllPlugins, // ----------------- GET ALL PLUGINS FROM DATABASE
  checkMod, // ---------------------- CHECK IF SENDER IS MOD
} = require("../System/MongoDB/MongoDb_Core.js");

let mergedCommands = ["install", "uninstall", "plugins", "pluginlist"];
module.exports = {
  name: "plugininstaller",
  alias: [...mergedCommands],
  uniquecommands: ["install", "uninstall", "plugins", "pluginlist"],
  description: "Install, Uninstall, List plugins",
  start: async (Atlas, m, { text, args, pushName, prefix, inputCMD, isCreator, isintegrated, doReact }) => {
    switch (inputCMD) {
      case "install":
        
        if (!isCreator) {
          await doReact('❌');
          return m.reply("This command is only for the *Owner*")
        }
        try {
          var url = new URL(text);
        } catch (e) {
          console.log(e);
          return await Atlas.sendMessage(
            m.from,
            { text: `Invalid URL !` },
            { quoted: m }
          );
        }

        if (url.host === "gist.github.com") {
          url.host = "gist.githubusercontent.com";
          url = url.toString() + "/raw";
        } else {
          url = url.toString();
        }
        var { body, statusCode } = await got(url);
        if (statusCode == 200) {
          try {
            var folderName = "Plugins";
            fileName = path.basename(url);

            // check if plugin is already installed and present in that Database array
            plugin = await isPluginPresent(fileName);
            if (plugin) {
              return m.reply(`*${fileName}* plugin is already Installed !`);
            }

            // Check if that file is present in same directory
            if (fs.existsSync(`./Plugins/${fileName}`)) {
              return m.reply(
                `*${fileName}* plugin is already Present Locally !`
              );
            }

            var filePath = path.join(folderName, fileName);
            fs.writeFileSync(filePath, body);
            console.log("Plugin saved successfully!");
          } catch (error) {
            console.log("Error:", error);
          }
          await m.reply(`Installing *${fileName}*... `);
          await readcommands();
          await pushPlugin(fileName, text);
          await m.reply(`*${fileName}* Installed Successfully !`);
        }
        break;

      case "plugins":
        await doReact("🧩");
        const plugins = await getAllPlugins();
        if (!isCreator) {
          await doReact('❌');
          return m.reply("This command is only for the *Owner*")
        }
        if (!plugins.length) {
          await Atlas.sendMessage(
            m.from,
            { text: `No additional plugins installed !` },
            { quoted: m }
          );
        } else {
          txt = "*『    Installed Plugins List    』*\n\n";
          for (var i = 0; i < plugins.length; i++) { 
            txt += `🔖 *Plugin ${i+1}*\n*🎀 Name:* ${plugins[i].plugin}\n*🧩 Url:* ${plugins[i].url}\n\n`;
          }
          txt += `⚜️ To uninstall a plugin type *uninstall* plugin-name !\n\nExample: *${prefix}uninstall* audioEdit.js`;
          await Atlas.sendMessage(m.from, { text: txt }, { quoted: m });
        }

        break;

      case "uninstall":
        if (!isCreator) {
          await doReact('❌');
          return m.reply("This command is only for the *Owner*")
        }
        if (!text) {
          return await m.reply(
            `Please provide a plugin name !\n\nExample: *${prefix}uninstall* audioEdit.js`
          );
        }
        await doReact("🧩");
        fileName = text;
        plugin = isPluginPresent(fileName)

        if (!plugin) {
          await doReact("❌");
          return await m.reply(`*${fileName}* plugin is not installed !`);
        }

        if (fs.existsSync(`./Plugins/${fileName}`)) {
          fs.unlinkSync(`./Plugins/${fileName}`);
          await delPlugin(fileName);
          await readcommands();
          await m.reply(
            `*${fileName}* plugin uninstalled successfully !\n\nPlease restart the bot to clear cache !`
          );
        } else {
          await doReact("❌");
          return m.reply(`*${fileName}* plugin is not installed !`);
        }

        break;

        case "pluginlist":
           if (!isCreator) {
          await doReact('❌');
          return m.reply("This command is only for the *Owner*")
        }
          await doReact("🧩");        
          textssf = `*『    Installable Plugins List    』*\n\n

*🎀 Name:* text-to-speech.js\n🔖 *Number of commads:* 7\n*🧩 Url:* https://gist.githubusercontent.com/Better-Than-You/156766ba3009768f873c7605c03d487e/raw/f04f9a1d5672b0edbcfdbaa0dfbb4501f001e9f5/text-to-speech.js\n\n
*🎀 Name:* image-edit.js\n🔖 *Number of commads:* 4\n*🧩 Url:* https://gist.githubusercontent.com/Better-Than-You/862ec2a50a0e26a0d6464b379e51bc52/raw/f5ccca632b967d63aaaa6e7067a4bbb5bafdaddd/image-edit.js\n\n     
*🎀 Name:* logo-maker.js\n🔖 *Number of commads:* 40\n*🧩 Url:* https://gist.githubusercontent.com/FantoX001/b8e4a9782623c6197c10f68aa798a548/raw/7466871764434cf4c2ee30b15aac871e5db48a74/logo-maker.js\n\n 

⚜️ To install a plugin type *install* _plugin-url_ !\n\nExample: *${prefix}install* https://gist.githubusercontent.com/FantoX001/xyz...\n\n⚜️ To uninstall a plugin type *uninstall* _plugin-name_ !\n\nExample: *${prefix}uninstall* audioEdit.js\n`;
          await Atlas.sendMessage(m.from, { image: {url: botImage1},caption: textssf }, { quoted: m });
          break;
      default:
        break;
    }
  },
};
