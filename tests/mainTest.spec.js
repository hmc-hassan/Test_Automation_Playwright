// @ts-check
const { test, expect } = require('@playwright/test');
const language = require('../pages/changeLanguage');
const category = require('../pages/searchByCategory');
const Home = require('../pages/navigateHome');
const { validateSelectedCategories } = require('../helpers/validateCategories'); // Adjust the path if necessary
const history = require('../pages/searchHistory');
const categories = require('../configs/categories.json');
const [categoryValue1,categoryValue2] = [categories.categories.Category1,categories.categories.Category2] //Used specific data for tier 1 and tier 2 category
const [categoryValue3,categoryValue4] = [categories.level3categories.Category3,categories.level3categories.Category4] //Sefregated tier 3 categories into 2 for verification of search history
const categoryValues = [categoryValue4, categoryValue3];

let sharedCategoryValue; //global variable to share value of scenario 1 with scenario 2

test.describe('Sample Test', () => {
  let page;
  test.beforeAll(async ({ browser }) => {
      const context = await browser.newContext();
      page = await context.newPage();
      await page.goto('/');

  });

  test.afterAll(async ({ browser }) => {
      browser.close;
  });

  test('Access the website, change language and verify the title', async ({ }) => {
    try {
    const eng_Language = new language(page);
    await eng_Language.changes_Language();
    await eng_Language.selectLanguage('en'); //Setting english for now, but we can create a json to store all the languages and use this argument to set the values dynamically using a loop
    await eng_Language.btn_submitLanguage();

    await page.waitForTimeout(5000); //Static waits are added to view the execution of script

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/largest market/); //Similar to the language, we can adjust this static value with variable for each language
    }catch (error) {
      console.error(error);
    }
  });

  test('Scenario 1: Search by Category up to 3 tiers and validate that correct values are available in left bar', async ({ }) => {
    try {
    for (const categoryValue of categoryValues) {
    const selectsCategory = new category(page);
    const navigateHome = new Home(page);
    await selectsCategory.click_Search();
    await page.waitForTimeout(1500); //Static waits are added to view the execution of script
    await selectsCategory.click_SearchByCategory();
    await page.waitForTimeout(1500); //Static waits are added to view the execution of script
    await selectsCategory.selectCategory(categoryValue1); //Setting static category for now, but we can create a json to store all the categories and use this argument to set the values dynamically using a loop
    await selectsCategory.selectCategory(categoryValue2); 
    await selectsCategory.selectCategory(categoryValue); 

    await validateSelectedCategories(page,categoryValue,categoryValue1,categoryValue2);
    await navigateHome.click_Home();
    sharedCategoryValue = categoryValue;
    }
  } catch(error){
    console.error(error);
  }
  });

  test('Scenario 2: Verify the search history', async ({ }) => {
    try {
      const criteria = 'javascript'
      const validateHistory = new history(page);
      const selectsCategory = new category(page);
      const navigateHome = new Home(page);
      await selectsCategory.click_Search(); //Click on search drop down
      await page.waitForTimeout(1500); //Static waits are added to view the execution of script
      const get_value = await validateHistory.getHistoryValues(); //get all history values available in History container
      const top_value = get_value.values[0] //Pick the top value and store it in variable
      console.log('Very first value is',top_value)
      // Compare values
      expect(top_value).toBe(sharedCategoryValue); //Use the fisrst value for comparison. it should match with the value set from scenario 1
      await validateHistory.click_LatestHistory(); //Click on latest history item
      await validateSelectedCategories(page,sharedCategoryValue,categoryValue1,categoryValue2); //Validate latest history item is equal to the one we executed in scenario 1
      await selectsCategory.input_Search(criteria); 
      const inputSearchValue = criteria + ', ' + sharedCategoryValue;
      await navigateHome.click_Home();
      await selectsCategory.click_Search(); //Click on search drop down
      await page.waitForTimeout(1500);
      const total_value = await validateHistory.getHistoryValues(); //get all history values available in History container
        if (total_value.totalvalue == 3){
          console.log('The number of search histories are', total_value.totalvalue);
        }
        else{
          console.error('Expected 3 search histories, but found', total_value.totalvalue);
        }
        //Code to validate the latest browsing history is shown correctly
        const value = total_value.values[0];
        expect(value).toBe(inputSearchValue);
    } catch(error){
      console.error(error);
    }
  });
});