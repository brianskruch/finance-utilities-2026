import { csvparse } from './utilcsvparse.js'
import { csvstringify } from './utilcsvstringify.js'
import fs from 'node:fs'

const filein1 = "cfbpay_in.csv"
const fileout = "cfbimport.qif"
const datafolder = "data_quicken"
let textout = `!Type:Cash\r\n`

const step01 = () => {
    csvparse(`./${datafolder}/${filein1}`, step02)
}

const step02 = (list1) => {
    //console.log(JSON.stringify(list1[0]))
    //textout = `Line1: ${list1[0].paydate}\r\n`
    // textout += `Line2: ${list1[0].paydir}\r\n`

    let thisdate = ""
    let deducttot = 0.0
    for (let i = 0; i < list1.length; i++) {
        thisdate = `D${list1[i].paydate.substring(4, 6)}/${list1[i].paydate.substring(6, 8)}'${list1[i].paydate.substring(2, 4)}`
        // Write CFBISD Salary Direct Deposit
        textout += `${thisdate}\r\n`
        textout += `U${list1[i].paydir}\r\nT${list1[i].paydir}\r\n`
        textout += `PCFBISD Salary Direct Deposit\r\nL2 Employee Inc:CFBISD Salary\r\n`
        textout += `^\r\n`
        // Write CFBISD Other Direct Deposit
        textout += `${thisdate}\r\n`
        textout += `U${list1[i].paytrv}\r\nT${list1[i].paytrv}\r\n`
        textout += `PCFBISD Other Direct Deposit\r\nL2 Employee Inc:CFBISD Other\r\n`
        textout += `^\r\n`

        // Compute and write Deduction totals
        deducttot = Number(list1[i].actcare) + Number(list1[i].disable) + Number(list1[i].ira)
        deducttot += Number(list1[i].medicare) + Number(list1[i].fedtax) + Number(list1[i].trsmem) + Number(list1[i].trscare)
        textout += `${thisdate}\r\n`
        textout += `U-${deducttot}\r\nT-${deducttot}\r\nPCFBISD Deductions\r\nL--Split--\r\n`
        // Write Split amounts
        textout += `S4 Health & Fitness:Health Insurance\r\n$-${list1[i].actcare}\r\n`
        textout += `S4 Financial:Disability Insurance\r\n$-${list1[i].disable}\r\n`
        textout += `S3 Income Tax:Medicare Tax\r\n$-${list1[i].medicare}\r\n`
        textout += `S3 Income Tax:Federal Tax\r\n$-${list1[i].fedtax}\r\n`
        textout += `S1 Retirement Exp:TRS Member Contribution\r\n$-${list1[i].trsmem}\r\n`
        textout += `S1 Retirement Exp:TRS Care Contribution\r\n$-${list1[i].trscare}\r\n`
        textout += `S1 Exp Outside Budget Calc:Temp QIF Load Retire\r\n$-${list1[i].ira}\r\n`

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