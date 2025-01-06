// When the user clicks the "Scrape Now" button, send a message to trigger scraping
document.getElementById('scrape').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'scrape' });
    });
  });