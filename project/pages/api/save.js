import { GoogleSpreadsheet } from 'google-spreadsheet'
import moment from 'moment'
import credentials from '../../credentials.json'

import dotenv from 'dotenv'
dotenv.load()

const doc = new GoogleSpreadsheet(process.GoogleSpreadsheet)

const genCupom = () => {
  const code = parseInt(moment().format('YYMMDDHHmmssSSS')).toString(16).toUpperCase()
  return code.substr(0,4) + '-' + code.substr(4, 4) + '-' + code.substr(8, 4)
}

export default async (req, res) => {
  try{
    await doc.useServiceAccountAuth(credentials)
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[1]
    const data = JSON.parse(req.body)


    const sheetConfig = doc.sheetsByIndex[2]
    await sheetConfig.loadCells('A2:B2')

    const MostrarPromocaoCell = sheetConfig.getCell(1, 0)
    const TextoCell = sheetConfig.getCell(1, 1)

    let Cupom = ''
    let Promo = ''
    if(MostrarPromocaoCell.value === 'VERDADEIRO'){
      Cupom = genCupom()
      Promo = TextoCell.value
    }


    await sheet.addRow({
      Nome: data.Nome,
      Email: data.Email,
      Whatsapp: data.Whatsapp,
      Nota: 5,
      'Data Preenchimento': moment().format('DD/MM/YYYY, HH:mm:ss, BR'),
      Cupom,
      Promo
    })
    res.end(req.body)

  }catch{
    console.log(error)
  }
  //console.log(JSON.parse(req.body))
  //res.end(req.body)
}