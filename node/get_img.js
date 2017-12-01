'use strict';


var oR = {
  "common": 0,
  "uncommon": 1,
  "rare": 2,
  "very rare": 3,
  "legendary": 4
}


// const fs = require('fs');
// const argv = require('yargs').argv;
// const cheerio = require('cheerio');
// const path = require('path');
// const showdown  = require('showdown');
const readline = require('readline');
const lbl = require('line-by-line');
//const readlineSync = require('readline-sync');
const fs = require('fs');
const path = require('path');

/// articles index page
const sPathToSrc = 'source.txt';

const sPathToSrcRu = 'source_ru.txt';
const htmlExt = '.html';
const sPathToOutput = 'db_en.js';
const sPathToOutputRu = 'db_ru.js';


function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}




let sTitle = "";
let sType = "";
let sRare = "";
let sText = "";

let sTmpTitle = "";
let sTmpType = "";
let sTmpRare = "";
let sTmpText = "";

let oTmpTypeRare = "";

let oItem = {};

let aItems=[];

let oItems={};

/**/

const rl = readline.createInterface({
  input: fs.createReadStream(sPathToSrcRu)
});

const lr = new lbl(sPathToSrcRu);

lr.on('line', function (line) { 
  if(line == "@@@") { // new item
    if(sTmpText){ // ix exust text of previous item info
      sTmpText = sTmpText.replace(/\$/g, "").replace(/[\r\n]+/, " ").replace(/^([А-ЯЁ])/, "<br>$1");
      oItem.text = sTmpText.trim();      
      sTmpText = "";
      
      //aItems.push({en: oItem});
      oItems[oItem.name.replace(/\s+/g,"").toLowerCase()] = {ru: oItem};

      oItem = {};
    }
    
  } else{
    if(!oItem.name) {
      sTmpTitle += line + " ";
      if(/\$/.test(line)){
        oItem.name = sTmpTitle.replace(/\$/g, "").trim();
        sTmpTitle = "";
      }
    } else if(!oItem.rarity){
      
      if(/\$/.test(line)){
        oItem.rarity = true;
      }
    }else if(!oItem.text){
      if(/-$/.test(line)) {
        sTmpText += line.replace(/-$/, "").replace(/^([А-ЯЁ])/, "<br>$1");
      } else{
        sTmpText += (line+ " ").replace(/^([А-ЯЁ])/, "<br>$1");
      }
      
      if(/\$/.test(line)){

        oItem.text = sTmpText.replace(/\$/g, "").replace(/[\r\n]+/, " ").replace(/^<br>/, "").trim();
        sTmpText = "";
      }
    }
  }
   
});
lr.on('end', function () {
  //oItem.text = sTmpText;

	//aItems.push(oItem);
  oItems[oItem.name.replace(/\s+/g,"").toLowerCase()] = {ru: oItem};


 // console.dir(aItems);
 console.log("db created");
 
  ensureDirectoryExistence(sPathToOutputRu);
  try{

    fs.writeFileSync(sPathToOutputRu, JSON.stringify(oItems, null, 2));

    console.log("The file was saved! \""+sPathToOutputRu+"\"");
  }catch (e){
      console.log("Cannot write file \""+sPathToOutputRu+"\": ", e);
  }
});
/**/


/*/
const rl = readline.createInterface({
  input: fs.createReadStream(sPathToSrc)
});

const lr = new lbl(sPathToSrc);
lr.on('line', function (line) { 
   
  if(/^[A-Z\s '\(\)-]+$/.test(line)) { // item name
    if(sTmpText){ // ix exust text of previous item info
      sTmpText = sTmpText.replace(/^<br>/, "");
      oItem.text = sTmpText.trim();
      if(oItem.rarity)
        oItem.rarity = oR[oItem.rarity.trim().toLowerCase()]? oR[oItem.rarity.trim().toLowerCase()] : oItem.rarity;
      oItem.source = "DMG";
      sTmpText = "";
      
      //aItems.push({en: oItem});
      oItems[oItem.name.replace(/\s+/g,"").toLowerCase()] = {en: oItem};

      oItem = {};
    }
    sTmpTitle += line+" ";   
  } else{                            // not item name
    if(!oItem.name) {
      oItem.name = sTmpTitle.trim();
      sTmpTitle = "";
    }
    //console.log(oItem.name);

    if(!oItem.rarity){ // line with type & rarity
 //console.dir(line);
      if(!/^[A-Z]/.test(line) || !oTmpTypeRare) { // it's type/rare line        
        oTmpTypeRare += line;
      } else { // its info text line
        //var aLine = oTmpTypeRare.split(",");
        var oTyRa =/([\w\s]+)\s*(\([\w\s,]+\))?,\s([\w\s]+)\s*(\([\w\s,]+\))?/.exec(oTmpTypeRare);
        if(oTyRa){
          oItem.type = oTyRa[1];
          if(oTyRa[2])
            oItem.typeInfo = oTyRa[2];
          
          oItem.rarity = oTyRa[3]
          if(oTyRa[4])
            oItem.rarityInfo = oTyRa[4];
        }
               oTmpTypeRare="";
        sTmpText += line.replace(/[\r\n]+/, " ").replace(/^([A-Z])/, "<br>$1")+ " ";

      }
    
      
    } else { // just text

      sTmpText += line.replace(/[\r\n]+/, " ").replace(/^([A-Z•])/, "<br>$1")+ " ";

    }
  }
});
lr.on('end', function () {
  oItem.text = sTmpText;

	//aItems.push(oItem);
  oItems[oItem.name.replace(/\s+/g,"").toLowerCase()] = {en: oItem};


 // console.dir(aItems);
 console.log("db created");
 
  ensureDirectoryExistence(sPathToOutput);
  try{

    fs.writeFileSync(sPathToOutput, JSON.stringify(oItems, null, 2));

    console.log("The file was saved! \""+sPathToOutput+"\"");
  }catch (e){
      console.log("Cannot write file \""+sPathToOutput+"\": ", e);
  }
});
/**/
