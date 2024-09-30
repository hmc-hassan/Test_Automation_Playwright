// pages/searchByCategory.js

class searchByCategory {
    constructor(page) {
      this.page = page;
      this.search = "//input[@placeholder='Looking for something?']";
      this.searchbyCategory = "//p[normalize-space()='Search by category']"
      this.searchonsearch = "//input[@type='text' and @aria-label='Search by keyword' and @class='sc-de99d471-3 foftCJ']"
    }
  
    async click_Search() {
        await this.page.waitForSelector(this.search, { state: 'visible', timeout: 5000 });
        await this.page.click(this.search); 
    }
    async input_Search(searchvalue) {
        const searchBox = this.page.locator(this.searchonsearch)
        await searchBox.focus();
        await searchBox.click();
        await this.page.locator(this.search).fill(searchvalue); 
        await this.page.locator(this.search).press('Enter');
    }

    async click_SearchByCategory() {
    
        await this.page.waitForSelector(this.searchbyCategory, { state: 'visible', timeout: 5000 });
        await this.page.click(this.searchbyCategory); 
        await this.page.waitForTimeout(5000);
    }

    // Dynamic selector for selecting a category code by value
        getCategorySelector(categorycode) {
            return `//a[normalize-space()="${categorycode}"]`;
     }
  
    async selectCategory(categorycode) {
        const categorySelector = this.getCategorySelector(categorycode);
        await this.page.waitForSelector(categorySelector, { state: 'visible', timeout: 5000 });
        await this.page.click(categorySelector);
    }
  }
  
  module.exports = searchByCategory;
  