/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import fs from 'fs'
import { parse } from 'csv-parse'

step01()

function step01() {
    fs.readFile('./testdata/vehicles.txt', 'ascii',step02)
}

function step02(err,filecontents) {
    if (err) {
        console.log(err)
    }
    parse(filecontents, {delimiter: ',',columns: true},step03)
    //console.log(filecontents)
}

function step03(err, output){
    if (err) {
        console.log(err)
    }
  //console.log(JSON.stringify(output,null,2))
  fs.writeFile('./testdata/vehicles.json', JSON.stringify(output,null,2), step04)
}

function step04(err){
    if (err) {
        console.log(err)
    }
    step99()
}

function step99(){
  console.log("End Program")

}
