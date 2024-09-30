// pages/filterResults.js

class filterResults {
    constructor(page) {
      this.page = page;
      this.category1 = "//div[@class='content__76b937fd']//div[1]//div[1]//div[1]//select[1]"; 
      this.category2 = "//div[@id='search-filter']//div[2]//div[1]//div[1]//select[1]"
      this.category3 = "//input[@type='checkbox' and @aria-checked='true']/following-sibling::div[@class='labelContainer__f6b9b426']//span"
    }

    async validate_category1() {
        const selectedValueCategory1 = await this.page.locator(this.category1)
        .locator('option:checked') 
        .innerText();
        return selectedValueCategory1;
    }

    async validate_category2() {
        const selectedValueCategory2 = await this.page.locator(this.category2)
        .locator('option:checked')
        .innerText(); 
        return selectedValueCategory2;
    }
    async validate_category3() {
        const label = await this.page.locator(this.category3);
        const labelText = await label.innerText();
        return labelText;
    }

  }
  
  module.exports = filterResults;
  