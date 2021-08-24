const axios = require('axios');
const fs = require('fs');
const fsPromises = require('fs').promises;
  
const pathInputjsonfile = './h0.json'
const pathoutputjsonfile = './h2.json'
let inputdata = {}
let outputobj = {}
const sourceLanguage =  "en"
const targetLanguage = "hi"
const url = 'http://localhost:5000/translate'

async function inputdataectiterator(){
    for(let key in inputdata){
        if(inputdata.hasOwnProperty(key)){
            let convertedResponse = await callTranslator(inputdata[key])
            outputobj[key] = convertedResponse["data"]["translatedText"]
            // console.log("================>",outputobj)
        
        }
    }
    console.log("================>",outputobj)
}     

async function callTranslator(value){
    let body = {

        "q":value,
        "source": sourceLanguage,
        "target": targetLanguage
    }
    try{
        let response = await  axios.post(url, body)
        return response
    }catch(error){
        console.error("ERROR----->"+ error)
    }
    
}

function toreadfile(){

    return new Promise(function (resolve, reject) {
        fs.readFile(pathInputjsonfile, 'utf8', function(error, contents) {
          if (error) reject(error);
          else resolve(contents);
        });
      });

    
}

async function main(){

    inputdata = await toreadfile()
    inputdata = JSON.parse(inputdata)
    // inputdata = {
    //     "Included holiday": "Included holiday",
    //     "With checking the box the holiday will be considered in the facility schedule.": "With checking the box the holiday will be considered in the facility schedule."
    // }
    // console.log(fileobj)
    await inputdataectiterator()
    fs.readFile(pathoutputjsonfile, 'utf8', (err,data) =>{
        if(err){
            console.log(err)
        }else{
            let readObj = JSON.parse(data)
            totalObj = { 
                ...readObj, 
                ...outputobj
                }
            newjson = JSON.stringify(totalObj)
            fs.writeFile(pathoutputjsonfile, newjson, 'utf8', (err) => {

                if (err) {
                    console.log(`Error writing file: ${err}`);
                } else {
                    console.log(`File is written successfully!`);
                }
            
            });
        }
    })
    
    
   

}


main()
