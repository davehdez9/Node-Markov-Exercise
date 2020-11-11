/** Command-line tool to generate Markov text. */

const fs = require("fs")
const markov = require("./markov")
const axios = require("axios")
const process = require("process")

/** Make Markoc Machine from text and generate text from it */

function generateText(text){
    let mm = new markov.MarkovMachine(text)
    console.log(mm)
    console.log(mm.makeText())
}

/** Read file and generate text from it */

function makeText(path){
    fs.readFile(path, "utf8", function cb(err, data) {
        if(err) {
            console.error(`Cannot read file: ${path}: ${err}`)
            process.exit(1)
        } else {
            generateText(data)
        }
    })
}

/**Read URL and make text from it */

async function makeURLText(url){
    let resp

    try {
        resp = await axios.get(url)
    } catch (err) {
        console.error(`Cannot read URL: ${url}: ${err}`);
        process.exit(1)
    }
    generateText(resp.data)
}

/** Interpret cdmline to decide what to do*/

let [method, path] = process.argv.slice(2)
console.log(method)
console.log(path)


if(method === 'file'){
    makeText(path)
} else if (method === 'url') {
    makeURLText(path)
} else {
    console.error('unknown method: ${method}')
    process.exit(1)
}