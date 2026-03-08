import { csvparse } from './utilcsvparse.js'
import { csvstringify } from './utilcsvstringify.js'
import fs from 'node:fs'

const filein1 = "cfbpay_in.csv"
const fileout = "cfbimport.qif"
const datafolder = "data_quicken"
let textout = ""

const step01 = () => {
    csvparse(`./${datafolder}/${filein1}`, step02)
}

const step02 = (t1) => {
    console.log(JSON.stringify(t1[0]))
    textout = `Line1: ${t1[0].paydate}\r\n`
    textout += `Line2: ${t1[0].paydir}\r\n`
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