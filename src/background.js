const PHY_SYS_URL = 'https://fhy.wra.gov.tw/dmchyv2/test_path/index.aspx'

// Refer: https://stackoverflow.com/questions/9244748/how-do-i-make-page-action-appear-for-specific-pages
// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl)

function checkForValidUrl (tabId, changeInfo, tab) {
  if (tab.url && tab.url.startsWith(PHY_SYS_URL)) {
    chrome.pageAction.show(tabId)
  }
};
