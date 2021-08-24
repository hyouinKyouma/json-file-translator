const axios = require('axios');
const fs = require('fs');
const fsPromises = require('fs').promises;

const pathInputjsonfile = './h0.json' //input json file path
const pathoutputjsonfile = './h2.json' //outputjson file path
const sourceLanguage = "en" //language code for english
const targetLanguage = "hi" //language code for hindi
const url = 'http://localhost:5000/translate' //localserver link

let inputdata = {}
let outputobj = {}

async function inputdataectiterator() {
    for (let key in inputdata) {
        if (inputdata.hasOwnProperty(key)) {
            let convertedResponse = await callTranslator(inputdata[key])
            outputobj[key] = convertedResponse["data"]["translatedText"]

        }
    }

}

async function callTranslator(value) {
    let body = {

        "q": value,
        "source": sourceLanguage,
        "target": targetLanguage
    }
    try {
        let response = await axios.post(url, body)
        return response
    } catch (error) {
        console.error("ERROR----->" + error)
    }

}

function toreadfile() {

    return new Promise(function (resolve, reject) {
        fs.readFile(pathInputjsonfile, 'utf8', function (error, contents) {
            if (error) reject(error);
            else resolve(contents);
        });
    });


}

async function main() {

    inputdata = await toreadfile()
    inputdata = JSON.parse(inputdata)
    await inputdataectiterator()
    fs.readFile(pathoutputjsonfile, 'utf8', (err, data) => {
        if (err) {
            console.log(err)
        } else {
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
