const filterValue = require('../pages/filterResult');
const { test, expect } = require('@playwright/test');



async function validateSelectedCategories(page,categoryValue,categoryValue1,categoryValue2) {

const filters = new filterValue(page);
    const selectedCategory1 = await filters.validate_category1();
    const selectedCategory2 = await filters.validate_category2();
    const selectedCategory3 = await filters.validate_category3();

    // Compare values
    expect(selectedCategory1).toBe(categoryValue1);
    expect(selectedCategory2).toBe(categoryValue2);
    expect(selectedCategory3).toBe(categoryValue);
}
module.exports = { validateSelectedCategories };