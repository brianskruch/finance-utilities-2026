import fs from 'fs'
import { parse } from 'csv-parse'

let cb = {}
let jsonback = {}
let fileout = ""

export const csvparse = (filein0, cb0) => {
    cb = cb0
    fs.readFile(filein0, 'ascii', step02)
}

const step02 = (err, filecontents) => {
    if (err) {
        console.log(err)
    }
    parse(filecontents, { delimiter: ',', columns: true }, step03)
    //console.log(filecontents)
}

const step03 = (err, output) => {
    if (err) {
        console.log(err)
    }
    cb(output)
}
