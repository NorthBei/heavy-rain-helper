# 水利署豪大雨開設小幫手 - Heavy Rain Helper
<img width="1920" alt="截圖 2023-08-01 上午6 40 39" src="https://github.com/NorthBei/heavy-rain-helper/assets/15665709/571a69a9-37f1-46ca-824a-a7f8b8baa04f">

## Project Intro

### Introduction

**豪大雨班**

只要臺灣有任何一個地方下雨
下到中央氣象局發布大雨特報or豪雨特報
水利署的替代役青年們，24小時、不論日夜
都要在一定的時間內殺回辦公室
處理第一時間的通報，並監測雨勢情況
以防雨勢急遽變大、導致各縣市出現災情
這個負責大雨/豪雨特報的班，簡稱「豪大雨班」

如果大家有印象的話
在颱風時，電視上會播出
中央或縣市部會首長和一堆人一起坐在很大的會議廳
穿著紅色的背心，看著很大的電視跟報告
那個會議的最最最前置作業
就是值豪大雨班的可愛替代役青年們處理的

**豪大雨開設**

通報其他水利機關、相關人員、執行一連串連鎖反應的這件事情
我們稱為「大雨/豪雨開設」或是「豪大雨開設」

豪大雨開設其實不難
就只是接收傳真、複製簡訊&傳真內容
然後上2個不同的系統個別填寫資料
但是步驟瑣碎、非常複雜、人工處理很多資料，一個不注意就容易弄錯

有多複雜呢？
下單位第一天，等著我的不是自由的人生
而是一本A4大小，106頁，每頁雙面印刷的大豪雨班值班講義

講義從頭到尾都在講豪大雨開設的步驟、邏輯、系統使用教學...
內容多到靠北
光是一個開設，就要點一堆按鈕、參考資料、打一堆字
然後每個地方都要注意，不能打錯
打錯就等著被扣假吧你

而且除了開設，還有交接、轉換、撤除...
上面每一個動詞，都有分大雨、豪雨、大豪雨QQ

**水利署大豪雨班值班小幫手**

因為我腦子不好、懶惰，而且阿我就怕被罵
所以趁著在水利署上班，花3,4天開發了「水利署大豪雨班值班小幫手」
直接從中央氣象局抓資料、重新組織，再填入對應的欄位
基本上已經做到點1個按鈕，就能完成90%的事情
把工作從熟悉要20分鐘，不熟悉要1小時，縮短到1~2分鐘搞定

水利署FHY&EMIC防汛系統，大雨/豪雨快速設定小幫手包含以下4項功能：

1. FHY大雨/豪雨開設

點擊按鈕後，若當下有大雨/豪雨事件，小幫手就會自動填寫、執行以下事項<br/>

A. 事件種類：根據事件類型，選取對應的下拉選單<br/>
B. 成立時間：根據中央氣象局的特報發布時間，填入成立時間，並將「分鐘」部分將調整為最近時間的5的倍數<br/>

2. FHY大雨/豪雨開設/解除簡訊

點擊按鈕後，若當下有大雨/豪雨事件，或是解除大雨/解除豪雨事件

小幫手就會自動填寫、執行以下事項<br/>

A. 簡訊內容：根據事件類型，自動填入對應簡訊<br/>
B. 預設值：選取預設值下拉選單為「替代役」<br/>

ps1. 簡訊內容部分，若為豪雨事件，系統會提醒簡訊內之事件發生地區需手動調整


3. FHY大雨/豪雨開設傳真下載

點擊按鈕後，若當下有大雨/豪雨事件，小幫手就會自動產生對應的傳真，並透過瀏覽器下載docx

需要自己開啟後，轉存為doc檔才能上傳至FHY系統

另外，產生的檔名為「0219豪雨特報傳真通報...」

其中前4位數應為事件發生日期，需要人工二次確認日期是否正確

4. FHY開設應變小組

點擊按鈕後，小幫手會自動填寫應變小組開設表單

A. 時間：根據當下時間填入，並將「分鐘」部分將調整為最近時間的10的倍數<br/>
B. 召集人、副召集人、聯絡人：將自動填入對應內容<br/>

5. 備註

- 最近時間的5的倍數
  - 當下是21分 -> 調整成20分
  - 當下是36分 -> 調整成35分
  - 當下是40分 -> 調整成40分
- 最近時間的10的倍數
  - 當下是21分 -> 調整成20分
  - 當下是36分 -> 調整成30分
  - 當下是40分 -> 調整成40分


### Person In charge
- Chrome Extension Dev by NorthBei from [Metartemis](https://metartemis.co)

### Relative Link
- [Chrome Extension Market - 水利署豪大雨開設小幫手](https://chrome.google.com/webstore/detail/%E6%B0%B4%E5%88%A9%E7%BD%B2%E8%B1%AA%E5%A4%A7%E9%9B%A8%E9%96%8B%E8%A8%AD%E5%B0%8F%E5%B9%AB%E6%89%8B/jhpgbpjakcgiemfahaoaedknlhipdpgg?hl=zh-TW&authuser=0)

### Screenshots/Film

None

## Development Instruction

### Environment

|Service|Version|
|-|-|
|Node.js|v18.16.0|
|yarn| v1.22.19|

### Getting Started


Install packages & Run the development server:

```zsh
npm run install
npm run serve
```

### Project setup

Install all packages
```zsh
npm run install
```

### Start Development
After we start development, `vue-cli-plugin-browser-extension` will build extension into `/dist` folder and rebuild when change.

We could load `/dist` folder as a extension in Chrome for developement & testing

```zsh
npm run serve
```
<img width="347" alt="image" src="https://github.com/NorthBei/heavy-rain-helper/assets/15665709/805cba09-a72d-4393-a826-1e1ccc830acb">

### Lint all files

Run lint for all `.vue`, `.js`, `.json` files by eslint

```zsh
npm run lint
```

### Build Production

After build, we could find the corresponding zip file under `/artifacts` folder.

```zsh
npm run build
```
<img width="331" alt="image" src="https://github.com/NorthBei/heavy-rain-helper/assets/15665709/14ecc347-fab9-4f69-a015-63861c0582f6">

## Reference
- [vue-cli-plugin-browser-extension](https://github.com/adambullmer/vue-cli-plugin-browser-extension)
- [Chrome Extension 開發與實作 08-輸入組件:瀏覽器按鈕與頁面按鈕](https://ithelp.ithome.com.tw/articles/10187070)
- [how to fix 'ERR_OSSL_EVP_UNSUPPORTED' ERROR in vue?](https://stackoverflow.com/questions/71273466/how-to-fix-err-ossl-evp-unsupported-error-in-vue)
