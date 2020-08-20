import { GoogleSpreadsheet } from 'google-spreadsheet'

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)


export default async (req, res) => {
  try{
    //await doc.useServiceAccountAuth(credentials)
    await doc.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENT_EMAIL,
      private_key: process.env.SHEET_CLIENT_KEY
    })
    await doc.loadInfo()
    //console.log(doc.title)

    const sheet = doc.sheetsByIndex[2]
    await sheet.loadCells('A2:B2')
    //console.log(sheet.title)

    const MostrarPromocaoCell = sheet.getCell(1, 0)
    //console.log(MostrarPromocaoCell.value)

    const TextoCell = sheet.getCell(1, 1)
    //console.log(TextoCell.value)

    res.end(JSON.stringify({
      showCoupon: MostrarPromocaoCell.value === 'VERDADEIRO',
      message: TextoCell.value

    }))
  }catch{
    res.end(JSON.stringify({
      showCoupon: false,
      message: ''
    }))
    //console.log(err)
  }
}