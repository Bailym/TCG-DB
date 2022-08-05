/* eslint-disable no-loop-func */
/* eslint-disable eqeqeq */
const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function getAPIData(cacheFolder) {
    console.log("Getting API data")
    const headers = {
        'X-Api-Key': process.env.TCG_API_KEY
    }

    console.log("Getting set names")
    var setIDs = []
    await axios("https://api.pokemontcg.io/v2/sets", headers)
        .then(async response => {
            response.data.data.forEach(element => {
                setIDs.push(element.id)
            });

        })

    console.log("Getting card details for each set")

    for (var i = 0; i < setIDs.length; i++) {
        console.log("Checking " + setIDs[i] + " " + i + ' of ' + (setIDs.length-1).toString())


        try {
            //open the existing file for this set.
            var data = fs.readFileSync(cacheFolder + setIDs[i] + ".json")
        }
        catch (err) {
            console.log(setIDs[i] + ".json not found")
            //if the file doesn't exist, create it.
            fs.writeFileSync(cacheFolder + setIDs[i] + ".json", '{}', function (err) {
                console.log(setIDs[i] + ".json created");
                data = "{}";
            })
        }


        //read the data from the API
        await axios.get("https://api.pokemontcg.io/v2/cards?q=set.id:" + setIDs[i],)
            .then(response => {
                //if the data has changed, update the file.
                if (data != JSON.stringify(response.data)) {
                    console.log("Data changed for " + setIDs[i])
                    writeAPIData(cacheFolder, setIDs[i] + ".json", response.data)
                }
                else {
                    console.log("Up to date: " + setIDs[i])
                }
            })
    }
}

function writeAPIData(cacheFolder, fileName, data) {
    fs.writeFile(cacheFolder + fileName, JSON.stringify(data), function (err) {
        if (err) {
            console.log(err);
        }
    })
}

let folder = path.join(__dirname, './cache/');
getAPIData(folder)