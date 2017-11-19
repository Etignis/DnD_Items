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


const rl = readline.createInterface({
  input: fs.createReadStream(sPathToSrc)
});
const lr = new lbl(sPathToSrc);

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
lr.on('line', function (line) { 
    //console.log(line);
  //console.log('Line from file:', line);
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
        /*/
        // type
        var oTmpType = /([A-Za-z\s ]+)\(([A-Za-z\s, ]+)\)/.exec(aLine[0]);
        if(oTmpType && oTmpType[2]) {
          oItem.type = oTmpType[1].trim();
          oItem.typeInfo = oTmpType[2].trim();
        } else{
          oItem.type = aLine[0].trim();
        }
        
        // rarity
        var oTmpType = /([A-Za-z\s ]+)\(([A-Za-z\s, ]+)\)/.exec(aLine[1]);
        if(oTmpType && oTmpType[2]) {
          oItem.rarity = oTmpType[1].trim();
          oItem.rarityInfo = oTmpType[2].trim();
        } else{
          oItem.rarity = aLine[0].trim();
        }
        /**/
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


/*/
let fItem = false;
// ru 
lr.on('line', function (line) {
  //console.log(line);
  if(/^@@@/.test(line)){ // new item
     console.log("-------");
    if(sTmpText) {
      oItem.text = sTmpText.replace(/^<br>/, "");
      sTmpText="";
      aItems.push({ru: oItem});
    }
  
    oItem = {};
  } else{
    if(!oItem.name){ // name
      sTmpTitle+=line;
      if(/\$/.test(line)) { // end of Name
        oItem.name = sTmpTitle.replace("$","").trim();
        sTmpTitle="";
      }
    } else if(!oItem.rarity){ // type / rarity
      sTmpTitle+=line+" ";
      if(/\$/.test(line)) { // end of type/rarity
        console.log(sTmpTitle);
        oItem.rarity = "+";
        sTmpTitle="";
      }
    } else{ // text
      let tLine = line;
      if(/-$/.test(tLine)) {
        tLine = tLine.replace(/-$/, "");
      } else {
        tLine += " ";
      }
      if(/^\s*[А-ЯЁЙ]/.test(line)) {
        tLine = "<br>"+tLine;
      }
        console.log("+");
      
      sTmpText += tLine;
    }
  }
  
});
lr.on('end', function () {
  //oItem.text = sTmpText;
	//aItems.push(oItem);

 // console.dir(aItems);
 console.log("db created");
 
  ensureDirectoryExistence(sPathToOutputRu);
  try{
    fs.writeFileSync(sPathToOutputRu, JSON.stringify(aItems, null, 2));
    console.log("The file was saved! \""+sPathToOutputRu+"\"");
  }catch (e){
      console.log("Cannot write file \""+sPathToOutputRu+"\": ", e);
  }
});
/**/

