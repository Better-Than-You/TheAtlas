const axios = require("axios");
const TDapi = 'https://api.truthordarebot.xyz/v1/';
let mergedCommands = [
  "truth",
  "dare",
  "wyr",
  "nhie",
  "rtruth",
  "rdare",
  "rwyr",
  "rnhie",
];

module.exports = {
  name: "t&d",
  alias: [...mergedCommands],
  uniquecommands: ["truth", "dare", "nhie", "wyr"],
  description: "All truth and dare commands",
  start: async (Atlas, m, { inputCMD, text, doReact, prefix, pushName }) => {
    switch (inputCMD) {
      case 'truth':
      axios.get(TDapi+'truth').then((res)=>{
    doReact('💭');    
    return Atlas.sendMessage(m.from, {text: res.data.question}, {quoted:m});
  }).catch(e=>{
    doReact('❌');    
    return Atlas.sendMessage(m.from, {text: e.message}, {quoted:m});
  })
      break;
      
      case 'dare':
      axios.get(TDapi+'dare').then((res)=>{
    doReact('💭');    
    return Atlas.sendMessage(m.from, {text: res.data.question}, {quoted:m});
  }).catch(e=>{
    doReact('❌');    
    return Atlas.sendMessage(m.from, {text: e.message}, {quoted:m});
  })
      break;
 
      case 'nhie':
      axios.get(TDapi+'nhie').then((res)=>{
    doReact('💭');    
    return Atlas.sendMessage(m.from, {text: res.data.question}, {quoted:m});
  }).catch(e=>{
    doReact('❌');    
    return Atlas.sendMessage(m.from, {text: e.message}, {quoted:m});
  })
      break;
      
      case 'wyr':
      axios.get(TDapi+'wyr').then((res)=>{
      doReact('💭'); 
    return Atlas.sendMessage(m.from, {text: res.data.question}, {quoted:m});
  }).catch(e=>{
    doReact('❌');    
    return Atlas.sendMessage(m.from, {text: e.message}, {quoted:m});
  })
      break;
            
      case 'rtruth':
      axios.get(TDapi+'truth?rating=r').then((res)=>{
    doReact('💭');    
    return Atlas.sendMessage(m.from, {text: res.data.question}, {quoted:m});
  }).catch(e=>{
    doReact('❌');    
    return Atlas.sendMessage(m.from, {text: e.message}, {quoted:m});
  })
      break;
      
      case 'rdare':
      axios.get(TDapi+'dare?rating=r').then((res)=>{
    doReact('💭');    
    return Atlas.sendMessage(m.from, {text: res.data.question}, {quoted:m});
  }).catch(e=>{
    doReact('❌');    
    return Atlas.sendMessage(m.from, {text: e.message}, {quoted:m});
  })
      break;
 
      case 'rnhie':
      axios.get(TDapi+'nhie?rating=r').then((res)=>{
    doReact('💭');    
    return Atlas.sendMessage(m.from, {text: res.data.question}, {quoted:m});
  }).catch(e=>{
    doReact('❌');    
    return Atlas.sendMessage(m.from, {text: e.message}, {quoted:m});
  })
      break;
      
      case 'rwyr':
      axios.get(TDapi+'wyr?rating=r').then((res)=>{
    doReact('💭');    
    return Atlas.sendMessage(m.from, {text: res.data.question}, {quoted:m});
  }).catch(e=>{
    doReact('❌');    
    return Atlas.sendMessage(m.from, {text: e.message}, {quoted:m});
  })
      break;    
      default:
        break;
    }
  },
};
