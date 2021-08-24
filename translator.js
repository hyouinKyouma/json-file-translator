// const axios = require('axios');
function main(){
    const fs = require('fs');
const efile = {  "Change": "Change",
"Remove": "Remove",
"Year": "Year",
"Add Holiday": "Add Holiday",
"Remove Holiday": "Remove Holiday",
"Description": "Description",
"Included holiday": "Included holiday",
"With checking the box the holiday will be considered in the facility schedule.": "With checking the box the holiday will be considered in the facility schedule.",
"Holiday": "Holiday",
"Cancel": "Cancel",
"Yes": "Yes",
"No": "No",
"Insurance List": "Insurance List",
"Create Insurance": "Create Insurance",
"Remove Insurances": "Remove Insurances",
"Show": "Show",
"Insurance": "Insurance"}


const hfile = { "बदलें": "बदलें",
"निकालें": "निकालें",
"वर्ष": "वर्ष",
"छुट्टी जोड़ें": "छुट्टी जोड़ें",
"छुट्टी निकालें": "छुट्टी निकालें",
"विवरण": "विवरण",
"शामिल छुट्टी": "शामिल छुट्टी",
"बॉक्स को चेक करने से अवकाश को सुविधा अनुसूची में माना जाएगा।": "बॉक्स को चेक करने से अवकाश को सुविधा अनुसूची में माना जाएगा।",
"हॉलिडे": "हॉलिडे",
"रद्द करें": "रद्द करें",
"हाँ":" हाँ",
"नहीं":" नहीं",
"बीमा सूची": "बीमा सूची",
"बीमा बनाएं": "बीमा बनाएं",
"बीमा निकालें": "बीमा निकालें",
"दिखाओ":" दिखाओ",
"बीमा": "बीमा" 
}
// var a = 0

// axios.post(url, {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

function replaceValue(o1) {
    var a = 0
    for (let key in o1) {
        if (o1.hasOwnProperty(key)) {
            a += 1
            o1[key] = String(a)
        }
    }
    return o1
}

function replaceKeys(o2) {
    let a = 0
    let newObj = {}
    for (let key in o2) {
        if (o2.hasOwnProperty(key)){
            a += 1
            newObj[String(a)] = o2[key]
        }
    }
    return newObj
}

function createFinalObject(eng,hin){
    for( let keyi in eng){
        for ( let keyj in hin){
            if( eng[keyi] == keyj){
                eng[keyi] = hin[keyj]
            }
        }
    }
    return eng
}

    let newObje = replaceValue(efile)
    let newHindiObj = replaceKeys(hfile)
    let newHinglishObj = createFinalObject(newObje,newHindiObj)
    // let efile2 = JSON.stringify(newHinglishObj)
    // console.log(efile2)
    fs.readFile('./h1.json', 'utf8', (err,data) =>{
        if(err){
            console.log(err)
        }else{
            let readObj = JSON.parse(data)
            totalObj = { 
                ...readObj, 
                ...newHinglishObj
                }
            newjson = JSON.stringify(totalObj)
            fs.writeFile('./h1.json', newjson, 'utf8', (err) => {

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
