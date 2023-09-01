const axios = require("axios");
const api = 'https://pokeapi.co/api/v2/';
const {
  typeSync,
  cap,
} = require("../System/Function2.js");

let mergedCommands = [
    "pokemon",
    "pkmn",    
    "ability",
    "shiny",    
    ];
module.exports = {
  name: "pokemon",
  alias: [...mergedCommands],
  uniquecommands: [
    "pokemon",
    "shiny",
    "ability",
  ],
  description: "All Pokemon Commands",
  start: async (
    Atlas,
    m,
    {
      inputCMD,
      text,          
      prefix,
      doReact,
      args,
      metadata,     
    }
  ) => { switch(inputCMD){
    case 'pokemon':
    case 'pkmn':
    if(!text){
        doReact("❌");
        return m.reply("Please provide a valid input");
    }
    axios.get(api+'pokemon/'+text.toLowerCase()).then((res)=>{        
        const hAbility = [];
        const pokemon = {
          name: res.data.name,                   
          id: res.data.id,
          type: res.data.types.map((type)=> type.type.name).join(', '),        
          ability: res.data.abilities.filter(obj => { if (!obj.is_hidden) return true; hAbility.push(obj.ability.name); return false;}).map((abl)=> abl.ability.name).join(', '),    
          hidden: hAbility[0],
          hp: res.data.stats[0].base_stat,
          at: res.data.stats[1].base_stat,
          df: res.data.stats[2].base_stat,
          spatk: res.data.stats[3].base_stat,
          spdf: res.data.stats[4].base_stat,
          spd: res.data.stats[5].base_stat, 
          weight: res.data.weight,
          height: res.data.height,
          img: res.data.sprites.front_default
                  };
const ptext = ` _🟥POKÉDEX NO. *#${pokemon.id}*_
  _Name:_         *${cap(pokemon.name)}*
          
  _Type:_      ${tpFormat(pokemon.type)}
   
  _Ability:_ ${abFormat(pokemon.ability)}${(pokemon.hidden == undefined)?'':`\n\n  _Hidden Ability:_  *${cap(pokemon.hidden)}*\n`}
                         _STATS_
    ❤️HP:                               ${pokemon.hp}
    ⚔️Attack:                         ${pokemon.at}
    🛡️Defense:                      ${pokemon.df}
    🌀Sp. Atk:                        ${pokemon.spatk}
    🔘Sp. Def:                        ${pokemon.spdf}
    ⚡Speed:                          ${pokemon.spd}
  _______________________________
    ⚜️Total:                           ${(pokemon.hp+pokemon.at+pokemon.df+pokemon.spatk+pokemon.spdf+pokemon.spd)}`;
        return Atlas.sendMessage(m.from, {image:{url:pokemon.img},caption:ptext}, { quoted: m });
    }).catch((e)=>{
        doReact('❌');
        return Atlas.sendMessage(m.from, {text: `An error occurred!
        
Either this could be because of invalid input or internal error.`}, {quoted:m});
    })
     
      break;
      case 'ability':
      if(!text){
        doReact("❌");
        return m.reply("Please provide a valid input");
    }
         axios.get(api+'ability/'+text.toLowerCase()).then((res)=>{
      doReact('⛩️');   
      const effect = res.data.effect_entries.filter((c)=> c.language.name == 'en')[0].effect;
      return Atlas.sendMessage(m.from, {image: {url: 'https://graph.org/file/7857bebe14460f91dd1bb.jpg'}, caption: `                       *${text[0].toUpperCase()+text.slice(1)}*
  
  ${effect}`}, {quoted:m});      
      }).catch((e)=>{
         doReact('❌');
        return Atlas.sendMessage(m.from, {text: `An error occurred!
        
Either this could be because of invalid input or internal error.`}, {quoted:m}); 
      })
              
      break;
      case "shiny":      
    if(!text){
        doReact("❌");
        return m.reply("Please provide a valid input");
    }          
    axios.get(api+'pokemon/'+text.toLowerCase()).then((res)=>{      
         doReact("⛩️");  
         const name = cap(res.data.name);    
         const shiny_url = res.data.sprites.front_shiny;
          return Atlas.sendMessage(m.from, {image:{url:shiny_url},caption:`This is shiny ${name}`}, { quoted: m });    
      }).catch((e)=>{
        doReact('❌');
        return Atlas.sendMessage(m.from, {text: `An error occurred!
        
Either this could be because of invalid input or internal error.`}, {quoted:m});
    })   
      break;   
      
      default:
        break;          
        }
    },
};

function tpFormat(str) {
    if (!str.includes(", ")) {
        return `    *${typeSync(cap(str))}*`;
    } else {
     let words = str.split(', ');
    let type1 = typeSync(cap(words[0]));
    let type2 = typeSync(cap(words[1]));
    return `    _1._  *${type1}*
                  _2._    *${type2}*`;   
    }
    
};
function abFormat(str) {
    if (!str.includes(", ")) {
        return `    *${cap(str)}*`;
    } else {
       let words = str.split(', ');
    let ab1 = cap(words[0]);
    let ab2 = cap(words[1]);
    return `    *${ab1}*   _or,_   *${ab2}*`; 
    }   
};