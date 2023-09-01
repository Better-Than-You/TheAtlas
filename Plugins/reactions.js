const {
  fetchJson,
  getBuffer,
  GIFBufferToVideoBuffer,
} = require("../System/Function2.js");

let mergedCommands = [
  "bonk",
  "bully",
  "cringe",
  "cry", 
  "highfive",
  "hug",
  "kick",  
  "kill",
  "nom",
  "pat",
  "poke",
  "slap",
  "smile",
  "smug",
  "wave",
  "yeet",
];

module.exports = {
  name: "reactions",
  alias: [...mergedCommands],
  uniquecommands: [
    "bonk",
    "bully",
    "cringe",
    "cry",           
    "highfive",
    "hug",
    "kick",   
    "kill",
    "nom",
    "pat",
    "poke",
    "slap",
    "smile",
    "smug",
    "wave",
    "yeet",
  ],
  description: "All reaction Commands",
  start: async (Atlas, m, { text, prefix, mentionByTag, doReact }) => {
    const suitableWords = {
      bonk: "bonked",
      bully: "is bullying",
      cringe: "cringed at",
      cry: "cried in front of",               
      highfive: "high-fived at",
      hug: "is hugging",
      kick: "kicked",
      kill: "killed",      
      nom: "is eating with",
      pat: "is patting",
      poke: "is poking",
      slap: "slapped",
      smile: "is smiling at",
      smug: "smugged at",
      wave: "waved at",
      yeet: "yeeted at",      
    };
    await doReact("🎭");

    const reactions = Object.keys(suitableWords);
    const command = m.body
      .split(" ")[0]
      .toLowerCase()
      .slice(prefix.length)
      .trim();
    const capitalize = (content) =>
      `${content.charAt(0).toUpperCase()}${content.slice(1)}`;
    let flag = true;
    if (command === "r" || command === "reaction") flag = false;
    if (!flag && !text) {
      const reactionList = `🎃 *Available Reactions:*\n\n- ${reactions
        .map((reaction) => capitalize(reaction))
        .join(
          "\n- "
        )}\n🛠️ *Usage:* ${prefix}reaction (reaction) [tag/quote user] | ${prefix}(reaction) [tag/quote user]\nExample: ${prefix}pat`;
      return void (await m.reply(reactionList));
    }
    const reaction = flag ? command : text.split(" ")[0].trim().toLowerCase();
    if (!flag && !reactions.includes(reaction))
      return void m.reply(
        `Invalid reaction. Use *${prefix}react* to see all of the available reactions`
      );
    const users = mentionByTag;
    if (m.quoted && !users.includes(m.quoted.sender))
      users.push(m.quoted.sender);
    while (users.length < 1) users.push(m.sender);
    const reactant = users[0];
    const single = reactant === m.sender;
    const { url } = await fetchJson(`https://api.waifu.pics/sfw/${reaction}`);
    const result = await getBuffer(url);
    const buffer = await GIFBufferToVideoBuffer(Buffer.from(result, "utf-8"));
    await Atlas.sendMessage(
      m.from,
      {
        video: buffer,
        gifPlayback: true,
        caption: `*@${m.sender.split("@")[0]} ${suitableWords[reaction]} ${
          single ? "Themselves" : `@${reactant.split("@")[0]}`
        }*`,
        mentions: [m.sender, reactant],
      },
      { quoted: m }
    );
  },
};
