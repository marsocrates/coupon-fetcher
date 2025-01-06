chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /checkout/.test(tab.url)) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['applyCoupons.js']
      });
    }
  });
  