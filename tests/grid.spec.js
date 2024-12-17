import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login.page';
import GridPage from '../pages/grid.page';

test.describe('Grid Tests', () => {
  let loginPage;
  let gridPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    gridPage = new GridPage(page);

    await loginPage.navigate();
    await loginPage.login('johndoe', 'supersecurepassword');
    await gridPage.navigate();
  });

  // Test to validate specific grid item details
  test('TEST07 - Grid Item Test', async ({ page }) => {
    const itemNumber = 7; 
    const expectedProductName = 'Super Pepperoni'; 
    const expectedPrice = 10;

    // Verify the name of the product in the specified grid item
    const actualProductName = await gridPage.getGridItemName(itemNumber);
    expect(actualProductName).toBe(expectedProductName);

    // Verify the price of the product in the specified grid item
    const actualPrice = await gridPage.getGridItemPrice(itemNumber);
    expect(actualPrice).toBe(expectedPrice);
  });

  // Test to validate all grid items have valid details
  test('TEST08 - Grid All Items Test', async ({ page }) => {
    const allItems = await gridPage.getAllGridItems();

    // Iterate through all items and validate their details
    for (const item of allItems) {
      expect(item.title).not.toBeNull(); 
      expect(item.title).not.toBe(''); 
      expect(item.price).not.toBeNull(); 
      expect(item.price).toBeGreaterThan(0); 
      expect(item.image).not.toBeNull(); 
      expect(item.button).toBeTruthy(); 
    }
  });
});