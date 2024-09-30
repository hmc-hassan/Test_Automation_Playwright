// pages/navigateHome.js

class navigateHome {
    constructor(page) {
      this.page = page;
      this.home = "//div[@data-testid='mercari-logo']//*[name()='svg']"
 }
    async click_Home() {
        await this.page.click(this.home); 
    }

  }
  
  module.exports = navigateHome;
  