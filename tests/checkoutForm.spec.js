import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login.page';
import CheckoutPage from '../pages/checkout.page';

test.describe('Checkout Form', () => {
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.navigate();
    await loginPage.login('johndoe', 'supersecurepassword');
    await checkoutPage.navigate();
  });

  // Test for "Checkout Form Order Success"
  test('TEST04 - Checkout Form Order Success', async () => {
    await checkoutPage.completeForm({
      name: 'John Doe',
      email: 'johndoe@example.com',
      address: '123 Main St',
      city: 'Metropolis',
      state: 'NY',
      zip: '12345',
      cardName: 'John Doe',
      cardNumber: '4111111111111111',
      expMonth: 'January',
      expYear: '2025',
      cvv: '123',
    });

    // Check and mark the checkbox if it is not checked
    await checkoutPage.checkBillingCheckbox();

    await checkoutPage.submitForm();

    // Validate that the order number is not empty
    const orderNumber = await checkoutPage.getOrderNumber();
    console.log('Order Number:', orderNumber);
    expect(orderNumber).not.toBe('');
  });

  // Test for "Checkout Form Alert"
  test('TEST05 - Checkout Form Alert', async ({ page }) => {
    await checkoutPage.completeForm({
      name: 'John Doe',
      email: 'johndoe@example.com',
      address: '123 Main St',
      city: 'Metropolis',
      state: 'NY',
      zip: '12345',
      cardName: 'John Doe',
      cardNumber: '4111111111111111',
      expMonth: 'January',
      expYear: '2025',
      cvv: '123',
    });

    // Check the initial state of the checkbox and uncheck if it is checked
    if (await page.isChecked(checkoutPage.billingCheckbox)) {
      await page.uncheck(checkoutPage.billingCheckbox);
    }

    // Capture alert with window.alert
    const alertPromise = page.evaluate(() => {
      return new Promise((resolve) => {
        window.alert = (message) => {
          resolve(message);
        };
      });
    });

    await checkoutPage.submitForm();

    const alertMessage = await alertPromise;

    // Validate the alert message
    expect(alertMessage).toContain('Shipping address same as billing checkbox must be selected.');
  });

  test('TEST06 - Cart Total Test', async () => {
    await checkoutPage.navigate();
    const productCount = await checkoutPage.getProductCount();
    const productPrices = await checkoutPage.getProductPricesFromText(productCount);
    const totalPrice = await checkoutPage.getTotalPrice();
    const calculatedTotal = productPrices.reduce((sum, price) => sum + price, 0);

    expect(calculatedTotal).toBe(totalPrice);
  });

});