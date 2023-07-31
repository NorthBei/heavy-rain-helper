// import axios from 'axios'
import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import PizZipUtils from 'pizzip/utils/index.js'
import { saveAs } from 'file-saver'
import dateFormat from 'dateformat'
import { taipeiTime, errorAlert, dateformatTw } from './utils.js'

// Refer1: https://docxtemplater.readthedocs.io/en/latest/faq.html#docxtemplater-in-a-vuejs-project
// Refer2: https://anthonybruno.dev/2018/03/03/Reading-Files-In-a-Chrome-Extension.html

class FaxDoc {
  static HEAVY_RAIN = '大雨';
  static X_HEAVY_RAIN = '豪雨';

  constructor (type, reportDateTime) {
    if (type !== FaxDoc.HEAVY_RAIN && type !== FaxDoc.X_HEAVY_RAIN) {
      throw new Error('FaxDoc Error: type not support')
    }
    this.reportDateTime = reportDateTime
    this.type = type
    this.url = chrome.runtime.getURL(`docx/${type}傳真模板.docx`)
    this.doc = null
  }

  async init () {
    try {
      this.doc = await this._loadWordTemplate(this.url)
    } catch (error) {
      errorAlert(`取得${this.type}傳真模板時發生錯誤:${error.message}`)
    }
  }

  async _loadWordTemplate (url) {
    return new Promise((resolve, reject) => {
      PizZipUtils.getBinaryContent(url, (error, content) => {
        if (error) reject(error)
        const zip = new PizZip(content)
        const doc = new Docxtemplater(zip)
        resolve(doc)
      })
    })
  }

  render (data) {
    if (this.doc === null) return

    try {
      this.doc.setData(data)
      this.doc.render()
    } catch (error) {
      errorAlert(`${this.type}傳真模板render時發生錯誤:${error.message}`)
    }
  }

  get _fileName () {
    const reportDate = dateFormat(this.reportDateTime, 'mmdd')
    const todayFileName = dateformatTw(taipeiTime(), `${this.type}特報傳真通報mm月dd日HH時MM#T分`)
    return `${reportDate}${todayFileName}`
  }

  download () {
    if (this.doc === null) return

    try {
      const file = this.doc.getZip().generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      }) // Output the document using Data-URI
      saveAs(file, `${this._fileName}.docx`)
    } catch (error) {
      errorAlert(`下載${this.type}傳真模板時發生錯誤:${error.message}`)
    }
  }
}

export default FaxDoc
