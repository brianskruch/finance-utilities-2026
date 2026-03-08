import fs from 'fs'
import { stringify } from 'csv-stringify'

let cb = {}
let fileout = ""

export const csvstringify = (jsonin0, fileout0, cb0) => {
    cb = cb0
    fileout = fileout0
    stringify(jsonin0, { header: true }, step04)
}

const step04 = (err, data) => {
    if (err) {
        cb(err)
    }
    fs.writeFile(fileout, data, step05)
}

const step05 = (err) => {
    cb(err)
}