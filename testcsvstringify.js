/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import fs from 'fs'
import { stringify } from 'csv-stringify'

step01()

function step01() {
    fs.readFile('./testdata/AddressList21.json', 'ascii', step02)
}

function step02(err, data) {
    if (err) {
        console.log(err)
    }
    let objin = JSON.parse(data)
    step03(objin)
}

function step03(objin) {
    stringify(objin, { header: true }, step04)

}
//{ header: true, columns: columns }
function step04(err, data) {
    if (err) {
        console.log(err)
    }
    fs.writeFile('./testdata/AddressList22.csv', data, step05)
}

function step05(err) {
    if (err) {
        console.log(err)
    }
    step99()
}

function step99() {
    console.log("End Program")

}

