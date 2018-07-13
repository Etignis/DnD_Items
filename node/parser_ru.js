'use strict';

const fs = require('fs');
//const argv = require('yargs').argv;
//const cheerio = require('cheerio');
//const path = require('path');
//const request = require('request');

const INPUT = "source_ru_x.txt";
const OUTPUT = "result_ru_x.js";

let allItems=[];
let oItem={};



function processFile(inputFile) {
    var fs = require('fs'),
        readline = require('readline'),
        instream = fs.createReadStream(inputFile),
        outstream = new (require('stream'))(),
        rl = readline.createInterface(instream, outstream);
     
    rl.on('line', function (line) {
			var oInfo = true;
        //console.log(line);
				if(line == "@@@") { // prev spell end
					if(oItem.name){
						if(oItem.text){
							oItem.text = oItem.text.replace("<br>", "");
						} else {
							//console.log("Error: " + oItem.name);
						}
						oItem.name = oItem.name.replace("$", "");
						delete oItem.type;
						delete oItem.typeAdditions;
						delete oItem.rarity;
						//lItems.source = "XGTE";
						allItems.push({"ru": oItem});
						oItem={};
					}
				} else {
					// name ?
					if(!oItem.name) {
						oItem.name = line;
						oInfo = false;
					} else {
						if(!oItem.type){
							var oProps = line.match(/([а-яё\w\s]+)\s*(\([а-яё\w\s,\.]+\))?[,\.]*\s*([а-яё\w\s]+)\s*(\([а-яё\w\s]+\))?/i);
							if(oProps) {
								console.log(oItem.name);
								console.dir(oProps);
								oItem.type = oProps[1].trim();
								if(oProps[2])
									oItem.typeAdditions = oProps[2].trim();
								oItem.rarity = oProps[3].trim();
								if(oProps[4])
									oItem.attunement = oProps[4].trim();
								
								oInfo = false;
							}
						}
						// info
						if(oInfo)  {
							var sLine = line.replace(/-[\r\n]+/, "").replace(/\s*[\r\n]+\s*/, " ").replace(/^([А-ЯA-Z])/, "<br>$1");
							if(!oItem.text) {
								oItem.text = "";
							}
							oItem.text += sLine;
						}
					}
				}
    });
    
    rl.on('close', function (line) {
        //console.log(line);
        //console.log('done reading file.');
				//console.dir(allItems);
				
				fs.writeFile(OUTPUT, JSON.stringify(allItems, null, ' '), function(err) {
					if(err) {
							return console.log(err);
					}

					console.log("The file was saved!");
			}); 
    });
}
processFile(INPUT);