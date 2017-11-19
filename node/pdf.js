'use strict';

const scissors = require('scissors');
const fs = require('fs');

const sSource = "DnD 5e Dungeon Masters Guide.pdf";
const sTarget = "Items.pdf";
const sPathToOutput = "Items.txt";

function saveTxt(sTxt){
  try{
    fs.writeFileSync(sPathToOutput, sTxt);
    console.log("The file was saved! \""+sPathToOutput+"\"");
  }catch (e){
      console.log("Cannot write file \""+sPathToOutput+"\": ", e);
  }
}

const pdf = scissors(sSource)
   .range(1, 10); // pages 1-10 
   
//save pdf   
pdf.pdfStream()
   .pipe(fs.createWriteStream(sTarget))
   .on('finish', function(){
     console.log("We're done!");
   }).on('error',function(err){
     throw err;
   });
   
// extract data   
//pdf.contentStream().on('data', console.log)
pdf.contentStream().on('data', saveTxt);
