'use strict';

const fs = require('fs');
const argv = require('yargs').argv;
const cheerio = require('cheerio');
const path = require('path');
const request = require('request');

const startURL = "https://www.dndbeyond.com/magic-items";
const siteHost = "https://www.dndbeyond.com";

let aSpellURL = [];
let oSpells = {};

let aPromices = [];

let aPaths = [];
const nMaxPage = 41; // ?page=1
function getList() {
  let i = 1;
  const oTimer = setInterval(function(){
    const sURL = startURL+"?page="+i;
    request(sURL, function (err, res, body) {
      if (err) throw err;
      console.log("Grab "+sURL);
      // console.log(body);
      // console.log(res.statusCode);
      const $ = cheerio.load(body.toString(), {decodeEntities: false});
      //$("ul.listing").find(".item-icon").eq(2).find("a").eq(0).attr("href")
      $("ul.listing").find(".item-icon").each(function(){
        const A = $(this).find("a").eq(0);
        if(A && A.attr("href")) {
          let sName = $(this).parent().find(".item-name .link").text().trim();
          //console.log(sName);
          //sName = sName.replace(new RegExp('[\r\n]+', 'g'), "").replace(new RegExp('[\s\t ]+', 'g'), "_").toUpperCase()
          sName = sName.replace(/[\r\n]+/g, "").replace(/[^\w\d_'-]+/g, "_").toUpperCase();          
          console.log(sName);
          
          aPaths.push({
            name: sName,
            img: A.attr("href")}
          );
          //i=100;
        }    
      });
      
      i++;
      if(i>nMaxPage) {
        
        save_imgs(aPaths);
       
        
        clearInterval(oTimer);
      }
    });
     if(i>10+nMaxPage) {
        clearInterval(oTimer);
      }
  }, 3000);
  
};

function save_imgs(A){
  //aPaths
  let i=A.length-1;
  const oTimer = setInterval(function(){
    try{
      const sPath = "../img/items/"+A[i].name+".jpg";
      console.log("Try to save '"+sPath+"'");
      request(A[i].img).pipe(fs.createWriteStream(sPath));
      i--;
      if(i<0){
        console.log("TIMER STOPS");
        clearInterval(oTimer);
      }
    } catch(err) {
      console.log("error: "+err);
    }
  }, 2000);
  
}

getList();
