import axios from 'axios'
import convert from 'xml-js'
import mock1 from '@mock/大雨-20210307/W-C0033-001.json'
import mock2 from '@mock/大雨-20210307/W-C0033-002.json'
import mock3 from '@mock/大雨-20210307/W-C0033-003.js'
import { errorAlert } from './utils'

// https://data.gov.tw/dataset/9560
async function heavyRainReportDownload () {
  try {
    let { data: xml } = await axios('https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/W-C0033-003?Authorization=rdec-key-123-45678-011121314&format=CAP')
    if (process.env.NODE_ENV === 'development') xml = mock3

    const json = convert.xml2js(xml, { compact: true })

    return {
      title: json.alert.info.headline._text,
      description: json.alert.info.description._text,
      reportDate: new Date(json.alert.info.effective._text)
    }
  } catch (error) {
    errorAlert(`取得「天氣特報-豪大雨特報」資料時發生錯誤:${error.message}`)
    return null
  }
}

// 取得這筆資料只有for產生大雨/豪雨傳真用
// https://data.gov.tw/dataset/9245
async function weatherReportDownload () {
  try {
    let { data } = await axios.get('https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/W-C0033-002?Authorization=rdec-key-123-45678-011121314')
    if (process.env.NODE_ENV === 'development') data = mock2

    const json = convert.xml2js(data, { compact: true })
    let dataset = json.cwbopendata.dataset

    // 如果沒有天氣警特報，json中就不會有dataset這個欄位
    if (!dataset) return null

    // dataset可能是Array(多個dataset)，也可能是Object(1個dataset)，OpenData的格式很混亂
    // 不論dataset 是 json object or json array, instanceof 的結果都是Object
    if (dataset instanceof Object) {
      if (Array.isArray(dataset)) {
        const item = dataset.find(item => ['大雨特報', '豪雨特報'].includes(item.datasetInfo.datasetDescription._text))
        dataset = item || dataset[0]
      }

      return {
        // e.g. datasetDescription: 陸上強風特報
        title: dataset.datasetInfo.datasetDescription._text,
        // e.g. issueTime: 2021-02-17T15:15:00+08:00
        dateTime: new Date(dataset.datasetInfo.issueTime._text),
        // e.g. contentText: 東北風增強，今(17)日臺南至桃園、東半部(含綠島、蘭嶼)、恆春半島沿海空曠地區及澎湖、金門有9至10級強陣風，沿海及鄰近海域並有較大風浪，請注意；馬祖地區亦有較強陣風。
        description: dataset.contents.content.contentText._text.trim()
      }
    } else {
      throw new Error('cwbopendata.dataset not object or array, cannot be parsed.')
    }
  } catch (error) {
    errorAlert(`取得「天氣特報-各別天氣警特報之內容及所影響之區域」資料時發生錯誤: ${error.message}`)
  }
}

// 取得這筆資料只有for產生大雨/豪雨傳真用
// https://data.gov.tw/dataset/9244
async function cityWeatherReportDownload () {
  try {
    let { data } = await axios.get('https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/W-C0033-001?Authorization=rdec-key-123-45678-011121314&format=JSON')
    if (process.env.NODE_ENV === 'development') data = mock1

    const cities = []

    // 不論是否有天氣警特報，json中都會有dataset這個欄位，但如果沒有天氣景特報，hazardConditions就會是null
    for (const city of data.cwbopendata.dataset.location) {
      if (city.hazardConditions === null) continue
      // city.hazardConditions.hazards可能是Array(多個hazard)，也可能是Object(1個hazard)，OpenData的格式很混亂
      // 如果是Array
      if (Array.isArray(city.hazardConditions.hazards)) {
        // 找找這個城市的phenomena有沒有"大雨"或是"豪雨"
        const hazard = city.hazardConditions.hazards.find(hazard => ['大雨', '豪雨'].includes(hazard.info.phenomena))
        // 如果沒有就直接下一個
        if (!hazard) continue
        cities.push({
          // e.g. name: 臺北市
          name: city.locationName,
          // e.g. hazardType: 大雨特報
          hazardType: hazard.info.phenomena
        })
      } else {
        // 如果是物件
        cities.push({
          // e.g. name: 臺北市
          name: city.locationName,
          // e.g. hazardType: 大雨特報
          hazardType: city.hazardConditions.hazards.info.phenomena
        })
      }
    }

    return cities
  } catch (error) {
    errorAlert(`取得「天氣特報-各別縣市地區目前之天氣警特報情形」資料時發生錯誤:${error.message}`)
  }
}

export default { heavyRainReportDownload, weatherReportDownload, cityWeatherReportDownload }
