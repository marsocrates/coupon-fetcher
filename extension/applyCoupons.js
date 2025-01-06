// Apply scraped coupons automatically on the checkout page
chrome.storage.local.get("coupons", (data) => {
    let coupons = data.coupons || [];
  
    coupons.forEach(code => {
      let input = document.querySelector('input[name="coupon"]');
      if (input) {
        input.value = code;
        let applyButton = document.querySelector('button.apply-coupon');
        if (applyButton) {
          applyButton.click();
        }
      }
    });
  });