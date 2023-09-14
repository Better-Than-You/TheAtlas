
const axios = require("axios");
const {
    checkMod,
} = require("../System/MongoDB/MongoDb_Core");
const nsfwarray = [
  "nsfwmenu",
  "spreadpussy",
  "genshin",
  "squirt",
  "glasses",
  "sunglasses",
  "swimsuit",
  "schoolswimsuit",
  "hololive",
  "ass",
  "underwear",
  "nipples",
  "uncensored",
  "sex",
  "sex2",
  "sex3",
  "blonde",
  "twintails",
  "breasts",
  "thighhighs",
  "skirt",
  "gamecg",
  "animalears",
  "foxgirl",
  "dress",
  "schooluniform",
  "twogirls",
  "gloves",
  "vocaloid",
  "touhou",
  "weapon",
  "withflowers",
  "pinkhair",
  "cloudsview",
  "white",
  "animal",
  "tail",
  "nude",
  "ponytail",
  "bed",
  "whitehair",
  "ribbons",
  "japanesecloths",
  "hatsuneAtlas",
  "bikini",
  "barefoot",
  "nobra",
  "food",
  "wings",
  "pantyhose",
  "openshirt",
  "headband",
  "penis",
  "close",
  "wet",
  "catgirl",
  "wolfgirl",
  "hneko",
  "hloli",
  "spreadlegs",
  "bra",
  "fateseries",
  "tree",
  "elbowgloves",
  "greenhair",
  "horns",
  "withpetals",
  "drunk",
  "cum",
  "headdress",
  "tie",
  "shorts",
  "hmaid",
  "headphones",
  "anusview",
  "Idol",
  "gun",
  "stockings",
  "tears",
  "breasthold",
  "necklace",
  "seethrough",
  "bunnyears",
  "bunnygirl",
  "topless",
  "beach",
  "erectnipples",
  "yuri",
  "vampire",
  "shirt",
  "pantypull",
  "tornclothes",
  "bondage",
  "demon",
  "bell",
  "shirtlift",
  "tattoo",
  "chain",
  "flatchest",
  "fingering",
];
module.exports = {
  name: "nsfwimages",
  alias: [...nsfwarray],
  desc: "Hentai picture of anime waifus",
  start: async (Atlas, m, { prefix, pushName, doReact, isUserMod, isCreator, inputCMD }) => {
    let chechSenderModStatus = await checkMod(m.sender);
    if (inputCMD == "nsfwmenu") {
      if (!chechSenderModStatus && !isCreator) {
          await doReact("❌");
          return Atlas.sendMessage(m.from, {
            text: `*${inputCMD}* - Command not found or plug-in not installed !

If you want to see the list of commands, type:    *_-help_*

Or type:  *_-pluginlist_* to see installable plug-in list.`,
            quoted: m,
          });
      }
      else {
                await doReact("🔞");
                let ntext = "╟   🏮 *Nsfw* 🏮   ╢\n\n```⥼   -ass\n⥼   -anusview\n⥼   -breasts\n⥼   -bed\n⥼   -bondage\n⥼   -bikini\n⥼   -barefoot\n⥼   -blonde\n⥼   -bra\n⥼   -breasthold\n⥼   -bunnyears\n⥼   -bunnygirl\n⥼   -beach\n⥼   -bell\n⥼   -bondage\n⥼   -cum\n⥼   -cloudsview\n⥼   -catgirl\n⥼   -drunk\n⥼   -dress\n⥼   -demon\n⥼   -erectnipples\n⥼   -fingering\n⥼   -fateseries\n⥼   -foxgirl\n⥼   -genshin\n⥼   -glasses\n⥼   -hmaid\n⥼   -headphones\n⥼   -headband\n⥼   -hneko\n⥼   -hloli\n⥼   -horns\n⥼   -nipples\n⥼   -nude\n⥼   -nobra\n⥼   -pantyhose\n⥼   -pantyhose\n⥼   -ponytail\n⥼   -pantypull\n⥼   -spreadpussy\n⥼   -squirt\n⥼   -sunglasses\n⥼   -swimsuit\n⥼   -schoolswimsuit\n⥼   -shirtlift\n⥼   -schooluniform\n⥼   -sex\n⥼   -sex2\n⥼   -sex3\n⥼   -stockings\n⥼   -seethrough\n⥼   -skirt\n⥼   -shorts\n⥼   -spreadlegs\n⥼   -twogirls\n⥼   -touhou\n⥼   -twintails\n⥼   -tie\n⥼   -tree\n⥼   -thighhighs\n⥼   -tears\n⥼   -tornclothes\n⥼   -topless\n⥼   -tattoo\n⥼   -underwear\n⥼   -uncensored\n⥼   -wet\n⥼   -wolfgirl\n⥼   -yuri```";      
      return Atlas.sendMessage(
        m.from,
        { image: { url: botImage5 }, caption: ntext },
        { quoted: m }
      );
    }    //else block
    }    //main if block
    
    let commands = inputCMD;
    
        
    if (!chechSenderModStatus && !isCreator) {
          await doReact("❌");
          return Atlas.sendMessage(m.from, {
            text: `*${inputCMD}* - Command not found or plug-in not installed !

If you want to see the list of commands, type:    *_-help_*

Or type:  *_-pluginlist_* to see installable plug-in list.`,
            quoted: m,
          });}
      
    await doReact("🔞");
    m.reply("Chotto Matte...");
    let res = await axios.get(`https://fantox-apis.vercel.app/${commands}`);
    let hUrl = res.data.url;
    let neko = {
      image: { url: hUrl },
      caption: `*${pushName}, sala tharki maal🗿*`,
      headerType: 4,
    };

    await Atlas.sendMessage(m.from, neko, { quoted: m }).catch((err) => {
      return "Error!";
    });  
    
}}
