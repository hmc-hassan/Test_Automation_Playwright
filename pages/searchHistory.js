// pages/searchHistory.js

class searchHistory {
    constructor(page) {
      this.page = page;
      this.historyList = "//div[@class='merList border__17a1e07b separator__17a1e07b']/div[@data-testid='merListItem-container']"
      this.historyListFirstItem = "//div[@class='merList border__17a1e07b separator__17a1e07b']/div[@data-testid='merListItem-container'][1]"//get first item. Could use loop too but it require some time.

    }
    
    async click_LatestHistory() {
        await this.page.click(this.historyListFirstItem); 
    }
    async getHistoryValues() { 
        const historyItems = await this.page.locator(this.historyList);
        const itemCount = await historyItems.count();
        const values = [];
        
        // Loop through each item and extract the text
        for (let i = 0; i < itemCount; i++) {
            // Get the text of each element in the list
            const text = await historyItems.nth(i).innerText(); 
            values.push(text);
        }
        
        // Set the total value count
        const totalvalue = values.length;
    
        // You can return both the values and the total count
        return { values, totalvalue };
    }
}
  module.exports = searchHistory;
  