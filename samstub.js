import { csvparse } from './utilcsvparse.js'
import { csvstringify } from './utilcsvstringify.js'
import fs from 'node:fs'

const filein1 = "sampay_in.csv"
const fileout = "samimport.qif"
const datafolder = "data_quicken"
let textout = `!Type:Cash\r\n`
// Process range
const istart = 0
const iend = 2

const step01 = () => {
    csvparse(`./${datafolder}/${filein1}`, step02)
}

const step02 = (list1) => {
    //console.log(JSON.stringify(list1[0]))
    //textout = `Line1: ${list1[0].paydate}\r\n`
    // textout += `Line2: ${list1[0].paydir}\r\n`

    let thisdate = ""
    let deducttot = 0.0
    let totsal = 0.0
    for (let i = istart; i < iend + 1; i++) {
        thisdate = `D${list1[i].paydate.substring(4, 6)}/${list1[i].paydate.substring(6, 8)}'${list1[i].paydate.substring(2, 4)}`
        // Write CFBISD Salary Direct Deposit
        totsal = Number(list1[i].paysal) - Number(list1[i].posttax)
        textout += `${thisdate}\r\n`
        textout += `U${totsal}\r\nT${totsal}\r\n`
        if (list1[i].rc == "R") {
            textout += `PSamsara Salary Direct Deposit\r\nL2 Employee Inc:Samsara Salary\r\n`
        } else {
            textout += `PSamsara Commission Direct Deposit\r\nL2 Employee Inc:Samsara Commission\r\n`
        }
        textout += `^\r\n`

        // Compute and write Deduction totals
        deducttot = Number(list1[i].solsec) + Number(list1[i].medicare) + Number(list1[i].fedtax)
        deducttot += Number(list1[i].ira) + Number(list1[i].dental) + Number(list1[i].hsa) + Number(list1[i].medins)
        textout += `${thisdate}\r\n`
        textout += `U-${deducttot}\r\nT-${deducttot}\r\n`
        if (list1[i].rc == "R") {
            textout += `PSamsara Regular Deductions\r\nL--Split--\r\n`
            textout += `S3 Income Tax:Social Security Tax\r\n$-${list1[i].solsec}\r\n`
            textout += `S3 Income Tax:Medicare Tax\r\n$-${list1[i].medicare}\r\n`
            textout += `S3 Income Tax:Federal Tax\r\n$-${list1[i].fedtax}\r\n`
            textout += `S1 Exp Outside Budget Calc:Temp QIF Load Retire\r\n$-${list1[i].ira}\r\n`
            textout += `S4 Health & Fitness:Dentist\r\n$-${list1[i].dental}\r\n`
            textout += `S1 Exp Outside Budget Calc:Temp QIF Load HSA\r\n$-${list1[i].hsa}\r\n`
            textout += `S4 Health & Fitness:Health Insurance\r\n$-${list1[i].medins}\r\n`
        } else {
            textout += `PSamsara Commission Deductions\r\nL--Split--\r\n`
            textout += `S3 Income Tax:Social Security Tax\r\n$-${list1[i].solsec}\r\n`
            textout += `S3 Income Tax:Medicare Tax\r\n$-${list1[i].medicare}\r\n`
            textout += `S3 Income Tax:Federal Tax\r\n$-${list1[i].fedtax}\r\n`
        }
        textout += `^\r\n`
    }

    step88()
}




const step88 = () => {

    fs.writeFile(`./${datafolder}/${fileout}`, textout, err => {
        if (err) {
            console.error(err)
        } else {
            step99()
        }
    }
    )
}

const step99 = () => {
    console.log(`Completed program cfbstub.js`)
}



step01()