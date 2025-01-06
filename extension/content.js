// Trigger scraping when visiting a coupon site or checkout page
async function scrapeCoupons() {
    const url = window.location.href;
  
    // Send request to Flask API for scraping
    const response = await fetch('https://coupon-fetcher.onrender.com/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: url })
    });
  
    const data = await response.json();
    if (data.coupons && data.coupons.length > 0) {
      chrome.storage.local.set({ coupons: data.coupons });
      console.log('Coupons Scraped:', data.coupons);
    } else {
      console.log('No coupons found');
    }
  }
  
  // Trigger scraping dynamically on button click or when the user visits a checkout page
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'scrape') {
      scrapeCoupons();
    }
  });
  