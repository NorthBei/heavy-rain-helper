// import sleep from 'sleep-promise'
import dateFormat from 'dateformat'
import { cloneDeep } from 'lodash'
import HeavyRainFax from './src/HeavyRainFax'
import XHeavyRainFax from './src/XHeavyRainFax'
import datasets from './src/datasets.js'
import { CITY_RECEIVER_MAP, RECEIVER_ORDER_RECORD } from './src/depts'
import { taipeiTime, findElement, waitIframeLoaded, errorAlert, dateformatTw } from './src/utils'
import { FHY_HEAVY_RAIN_START_EVENT, FHY_HEAVY_RAIN_START_EVENT_SMS, FHY_START_RESPONSE_TEAM, FHY_HEAVY_RAIN_FAX } from '@/const/events'

const HEAVY_RAIN = 'B' // B 是「大雨」這個選項
const XHEAVY_RAIN = 'R' // R 是「大雨」這個選項
const ROLE = '5' // 5是「替代役專用」這個選項

const fhyHeavyRainStartEvent = async () => {
  // ifr07是「事件開設、撤除」的iframe，要先確定這個frame在不在，不然FHY系統會載入錯誤，原因不明
  const frame7 = document.querySelector('#ifr07')
  if (frame7 === null) {
    const nav = await findElement('#ctl00_CPHobj1_15', '豪大雨值班', '豪大雨值班按鈕')
    nav.click()
  }
  const tab = await findElement('#__tab_ctl00_CPHobj1_theTabContainer_Tab8', '事件開設、撤除', '事件開設、撤除分頁按鈕')
  tab.click()
  const { title, reportDate } = await datasets.heavyRainReportDownload()

  if (title !== '大雨特報' && title !== '豪雨特報') {
    errorAlert('現在並無大雨/豪雨特報')
  }
  const iframe = await findElement('#ifr07', '', '豪大雨值班iframe')
  await waitIframeLoaded(iframe)
  const eventTypeSelect = await findElement('#Name', '', '事件種類欄位', iframe.contentWindow)
  eventTypeSelect.value = title === '大雨特報' ? HEAVY_RAIN : XHEAVY_RAIN
  eventTypeSelect.dispatchEvent(new Event('change'))
  const startDateInput = await findElement('#BeginDate', '', '成立時間欄位', iframe.contentWindow)
  startDateInput.value = dateFormat(reportDate, 'yyyy/mm/dd HH:MM')
  startDateInput.dispatchEvent(new Event('change'))
}

const fhyHeavyRainEventSMS = async () => {
  // ifr09是「一般簡訊通報」的iframe，要先確定這個frame在不在，不然FHY系統會載入錯誤，原因不明
  const frame9 = document.querySelector('#ifr09')
  if (frame9 === null) {
    const nav = await findElement('#ctl00_CPHobj1_15', '豪大雨值班', '豪大雨值班按鈕')
    nav.click()
  }
  const tab = await findElement('#__tab_ctl00_CPHobj1_theTabContainer_Tab10', '一般簡訊通報', '一般簡訊通報分頁按鈕')
  tab.click()
  const { title, description, reportDate } = await datasets.heavyRainReportDownload()

  if (!['大雨特報', '豪雨特報', '解除大雨特報', '解除豪雨特報'].includes(title)) {
    errorAlert('現在沒有大雨/豪雨特報 or 解除大雨/豪雨特報的資料')
    return
  }
  const iframe = await findElement('#ifr09', '', '豪大雨值班iframe')
  await waitIframeLoaded(iframe)
  const smsTextarea = await findElement('#ctl00_cphMain_txtContent', '', '簡訊內容欄位', iframe.contentWindow)
  const reportDay = dateFormat(reportDate, 'd')
  const reportTime = dateFormat(reportDate, 'HH時MM分')
  const nowTime = dateformatTw(taipeiTime(), 'HH時MM#T分')

  switch (title) {
    case '大雨特報': {
      // example: 中央氣象局於今(18)日針對南部地區發布大雨特報。防災中心於06時50分專人守視。<防災中心>
      // description的內容是「\n東北季風影響，今（９）日宜蘭地區有局部大雨發生的機率，請注意。\n」 =>  找到「）日」和「有局部大雨」的index，然後去頭去尾把「宜蘭地區」擷取出來
      const startIndex = description.indexOf('）日') + 2 // 因為有2個字元，所以+2
      const endIndex = description.indexOf('有局部大雨')
      const regions = description.substring(startIndex, endIndex)
      smsTextarea.value = `中央氣象局於今(${reportDay})日針對${regions}發布大雨特報，由防災中心於${nowTime}專人守視。<防災中心>`
      break
    }
    case '豪雨特報':
      // example: 中央氣象局已針對南部地區發布豪雨特報，經研判，水利署應變小組於06時50分提前三級開設。<水利署應變小組>
      smsTextarea.value = `中央氣象局已針對南部地區發布豪雨特報，經研判，水利署應變小組於${nowTime}提前三級開設。<水利署應變小組>`
      alert('你各位阿，「南部地區」要自己改掉阿，現在動作!')
      console.log('我打電話問過中央氣象局，他們說豪雨特報的文字格式是自由的，所以程式很難處裡，我幫不了你')
      break
    case '解除大雨特報':
      // example: 中央氣象局於今(18)日03時40分，解除本次大雨特報事件。<防災中心>
      smsTextarea.value = `中央氣象局於今(${reportDay})日${reportTime}，解除本次大雨特報事件。<防災中心>`
      break
    case '解除豪雨特報':
      // example: 中央氣象局於今(18)日03時40分，解除本次豪雨特報事件，水利署應變中心同步撤除。<水利署應變小組>
      smsTextarea.value = `中央氣象局於今(${reportDay})日${reportTime}，解除本次豪雨特報事件，水利署應變中心同步撤除。<水利署應變小組>`
      break
    default:
      errorAlert('阿北出事了，不可能跑到這裡')
  }

  smsTextarea.dispatchEvent(new Event('keyup'))
  const typeSelect = await findElement('#ctl00_cphMain_DefaultDDL', '', '預設值欄位', iframe.contentWindow)
  typeSelect.value = ROLE
  typeSelect.dispatchEvent(new Event('change'))
}

const fhyHeavyRainFax = async () => {
  const weatherReport = await datasets.weatherReportDownload()

  if (weatherReport === null) errorAlert('目前全台各縣市都沒有天氣警特報')

  const cities = await datasets.cityWeatherReportDownload()

  const title = weatherReport.title
  // TODO: 目前還不確定title的內容是什麼，暫時使用大雨特報&豪雨特報作為判斷內容
  if (title === '大雨特報' || title === '豪雨特報') {
  } else {
    errorAlert('現在並無大雨/豪雨特報')
  }

  const reportDateTime = weatherReport.dateTime
  const reportContent = weatherReport.description

  const receiverRecord = cloneDeep(RECEIVER_ORDER_RECORD)

  cities.forEach((city) => {
    // title的內容是"大雨特報"or"豪雨特報"
    if (title.includes(city.hazardType)) {
      CITY_RECEIVER_MAP[city.name].forEach(dept => receiverRecord[dept]++)
    }
  })

  const originalReceiver = []
  const copyReceiver = []
  for (const [dept, count] of Object.entries(receiverRecord)) {
    if (count > 0) originalReceiver.push(dept)
    else copyReceiver.push(dept)
  }

  const doc = title.includes('大雨') ? new HeavyRainFax(reportDateTime) : new XHeavyRainFax(reportDateTime)
  await doc.init()
  doc.render({
    originalReceiver: originalReceiver.join('、'),
    copyReceiver: copyReceiver.join('、'),
    nowDateTime: dateformatTw(taipeiTime(), 'TWY/mm/dd HH:MM#T'),
    reportDateTime: dateformatTw(reportDateTime, 'TWY年mm月dd日 HH時MM分'),
    reportContent
  })
  doc.download()
}

const fhyCreateResponseTeam = async () => {
  const nav = await findElement('#ctl00_CPHobj1_16', '替代役', '替代役按鈕')
  nav.click()
  const tab = await findElement('#__tab_ctl00_CPHobj1_theTabContainer_Tab1', '成立撤銷回報', '成立撤銷回報分頁按鈕')
  tab.click()
  const iframe = await findElement('#ifr00', '', '成立撤銷回報iframe')
  await waitIframeLoaded(iframe)
  const addBtn = await findElement('#DutyBaseTable tr:last-child td input[type="button"][value="新增"]', '', '新增按鈕', iframe.contentWindow)
  addBtn.click()
  const timeInput = await findElement('#EventDate', '', '時間欄位', iframe.contentWindow)
  timeInput.value = dateformatTw(taipeiTime(), 'yyyy/mm/dd HH:MM#T')
  timeInput.dispatchEvent(new Event('change'))
  const person1Input = await findElement('#AddTypePeople1', '', '召集人欄位', iframe.contentWindow)
  person1Input.value = '賴署長建信'
  const person2Input = await findElement('#AddTypePeople2', '', '副召集人欄位', iframe.contentWindow)
  person2Input.value = '王副署長藝峰'
  const person3Input = await findElement('#AddTypePeople3', '', '聯絡人欄位', iframe.contentWindow)
  person3Input.value = '林主任益生'
}

const onMessage = (request) => {
  switch (request.action) {
    case FHY_HEAVY_RAIN_START_EVENT:
      fhyHeavyRainStartEvent()
      break
    case FHY_HEAVY_RAIN_START_EVENT_SMS:
      fhyHeavyRainEventSMS()
      break
    case FHY_HEAVY_RAIN_FAX:
      fhyHeavyRainFax()
      break
    case FHY_START_RESPONSE_TEAM:
      fhyCreateResponseTeam()
      break
  }
}

chrome.runtime.onMessage.addListener(onMessage)
