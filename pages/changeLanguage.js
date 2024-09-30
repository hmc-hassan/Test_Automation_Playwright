// pages/changeLanguage.js

class changeLanguage {
    constructor(page) {
      this.page = page;
      this.changesLanguage = "div[data-location='home:navigation_top:language_picker_button:button'] div[class='merIcon'] svg"; 
      //this.selectLanguage = "input[value='en']"; 
      this.btn_changeLanguage = "button[type='submit']"
    }

      // Dynamic selector for selecting a language by value
    getLanguageSelector(languageCode) {
    return `input[value='${languageCode}']`;
    }
  
    async changes_Language() {
        await this.page.waitForSelector(this.changesLanguage, { state: 'visible', timeout: 5000 });
        await this.page.click(this.changesLanguage); 
    }
  
    async selectLanguage(languageCode) {
        const languageSelector = this.getLanguageSelector(languageCode);
        await this.page.click(languageSelector);
    }

    async btn_submitLanguage() {
        await this.page.click(this.btn_changeLanguage); 
      }
  }
  
  module.exports = changeLanguage;
  