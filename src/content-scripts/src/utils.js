import sleep from 'sleep-promise'
import dateFormat from 'dateformat'

function taipeiTime () {
  const taipeiTimeString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Taipei' })
  return new Date(taipeiTimeString)
}

async function findElement (selector, content, elementName, parent = window) {
  // 每0.5秒找一次Element，共找6次，共等3秒
  let count = 0

  do {
    const ele = parent.document.querySelector(selector)
    // content 如果是空字串，就不比對內容
    if (ele !== null && (content === '' || ele.textContent === content)) {
      return ele
    }

    await sleep(500)
    count++
  } while (count <= 6)

  errorAlert(`找不到「${elementName}」`)
}

async function waitIframeLoaded (iframe) {
  // 每0.5秒確認依次iframe的body是否有child，共找10次，共等5秒，沒有child的iframe就是尚未載入好
  let count = 0

  do {
    if (iframe.contentWindow.document.body) {
      // 有時候Js執行太快，DOM還沒處裡完，body就會是null，如果body是null就直接等0.5秒再重新抓一次吧
      const num = iframe.contentWindow.document.body.childElementCount
      if (num > 0) {
        return
      }
    }

    await sleep(500)
    count++
  } while (count <= 5)

  errorAlert('iframe頁面載入超過5秒，再點一次按鈕吧')
}

function errorAlert (message) {
  alert(message)
  throw new Error(message)
}

// 西元年轉民國年
function covertAD2TwYear (date = new Date()) {
  return parseInt(dateFormat(date, 'yyyy')) - 1911
}

function minsRefactor (mins, divide) {
  if (divide !== 5 && divide !== 10) {
    throw new Error('minsRefactor Error: divide only should be 0 or 5.')
  }
  // 如果divide是5，就是把分鐘往前計算，到前一個可以被5整除的分鐘數，21 -> 20, 26 -> 25
  // 如果divide是10，就是把分鐘往前計算，到前一個可以被10整除的分鐘數，21 -> 20, 26 -> 20, 32 -> 30
  // 如果計算完結果剛好是5或是0，轉成字串就會是單一個0或5，所以最前面要補0，補成2位數
  // e.g. mins:6 divide:5 => 計算完是5，要補成"05" / mins:9 divide:10 => 計算完是0，要補成"00"
  return ((Math.floor(mins / divide)) * divide).toString().padStart(2, '0')
}

// TWY => 台灣的民國年
// MM#F => 往前計算至5的倍數的分鐘數(F = Five), e.g. 21 -> 20, 36 -> 35
// MM#T => 往前計算至10的倍數的分鐘數(T = Ten), e.g. 25 -> 20, 38 -> 30
const TWY = 'TWY'
const MMF = 'MM#F'
const MMT = 'MM#T'

// example: dateformatTw(taipeiTime(), 'TWY年mm月dd日 HH時MM#T分')
function dateformatTw (date, format) {
  if (format.includes(TWY)) {
    const twy = covertAD2TwYear(date).toString()
    format = format.replace(TWY, twy)
  }
  if (format.includes(MMF)) {
    const mins = minsRefactor(date.getMinutes(), 5).toString()
    format = format.replace(MMF, mins)
  } else if (format.includes(MMT)) {
    const mins = minsRefactor(date.getMinutes(), 10).toString()
    format = format.replace(MMT, mins)
  }
  return dateFormat(date, format)
}

export { taipeiTime, findElement, waitIframeLoaded, errorAlert, dateformatTw }
