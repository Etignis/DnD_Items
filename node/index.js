'use strict';

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
const htmlExt = '.html';
const sPathToOutput = 'db.js';

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}


// const rl = readline.createInterface({
  // input: fs.createReadStream(sPathToSrc)
// });
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

lr.on('line', function (line) {
  //console.log('Line from file:', line);
  if(/^[A-Z\s ]+$/.test(line)) { // item name 
    if(sTmpText){ // ix exust text of previous item info
      oItem.text = sTmpText.trim();
      oItem.source = "DMG";
      sTmpText = "";
      
      aItems.push({en: oItem, ru: {name: "", notes: "", text: ""}});
      oItem = {};
    }
    sTmpTitle += line+" ";   
  } else{                            // not item name
    if(!oItem.name) {
      oItem.name = sTmpTitle;
      sTmpTitle = "";
    }
    //console.log(oItem.name);
    
    if(!oItem.rarity){ // line with type & rarity
      if(!/^[A-Z]/.test(line) || !oTmpTypeRare) { // it's type/rare line        
        oTmpTypeRare += line;
      } else { // its info text line
        var aLine = oTmpTypeRare.split(",");
      
        // type
        var oTmpType = /([A-Za-z\s]+)\(([A-Za-z\s,]+)\)/.exec(aLine[0]);
        if(oTmpType && oTmpType[2]) {
          oItem.type = oTmpType[1].trim();
          oItem.typeInfo = oTmpType[2].trim();
        } else{
          oItem.type = aLine[0].trim();
        }
        
        // rarity
        var oTmpType = /([A-Za-z\s]+)\(([A-Za-z\s,]+)\)/.exec(aLine[1]);
        if(oTmpType && oTmpType[2]) {
          oItem.rarity = oTmpType[1].trim();
          oItem.rarityInfo = oTmpType[2].trim();
        } else{
          oItem.rarity = aLine[0].trim();
        }
        
        oTmpTypeRare="";
        sTmpText += line.replace(/[\r\n]+/, " ")+ " ";
      }
    
      
    } else { // just text
      sTmpText += line.replace(/[\r\n]+/, " ")+ " ";
    }
  }
});
lr.on('end', function () {
  oItem.text = sTmpText;
	aItems.push(oItem);

 // console.dir(aItems);
 console.log("db created");
 
  ensureDirectoryExistence(sPathToOutput);
  try{
    fs.writeFileSync(sPathToOutput, JSON.stringify(aItems, null, 2));
    console.log("The file was saved! \""+sPathToOutput+"\"");
  }catch (e){
      console.log("Cannot write file \""+sPathToOutput+"\": ", e);
  }
});


