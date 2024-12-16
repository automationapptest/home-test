/**
 * Test Suite for Checkout Page Functionality
 * Includes tests for order submission, validation, and cart total.
 */
const { test, expect } = require("@playwright/test");
const CheckoutPage = require("../pages/checkout.page").default;
const CommonPage = require("../pages/common.page").default;
const settings = require("../data/settings.json");

test.describe("Checkout Page Tests", () => {
  let checkoutPage;
  let commonPage;

  test.beforeEach(async ({ page }) => {
    checkoutPage = new CheckoutPage(page);
    commonPage = new CommonPage(page);
    await commonPage.navigate("/checkout");
  });

  test("Checkout Form Order Success", async () => {
    await checkoutPage.fillCheckoutForm({
      ...settings.env.billingInfo,
      creditCard: settings.env.creditCard.visa,
    });
    await checkoutPage.toggleShippingCheckbox(true);
    await checkoutPage.submitOrder();
    const orderConfirmation = await checkoutPage.getOrderConfirmation();

    expect(orderConfirmation).not.toBe("");
    expect(orderConfirmation).toContain("Order Confirmed!");
    expect(orderConfirmation).toContain("Order Number:");
  });

  test("Checkout Form Alert", async ({ page }) => {
    await checkoutPage.fillCheckoutForm({
      ...settings.env.billingInfo,
      creditCard: settings.env.creditCard.mastercard,
    });
    await checkoutPage.toggleShippingCheckbox(false);

    const dialogPromise = page.waitForEvent("dialog");
    await checkoutPage.submitOrder();

    const dialog = await dialogPromise;
    expect(dialog.message()).toBe(
      "Shipping address same as billing checkbox must be selected."
    );
    await dialog.dismiss();
  });

  test("Cart Total Test", async () => {
    const itemPrices = await checkoutPage.getItemPrices();
    const calculatedTotal = itemPrices.reduce(
      (sum, price) => sum + parseFloat(price.replace("$", "")),
      0
    );

    const cartTotal = await checkoutPage.getCartTotal();
    expect(cartTotal).toBe(`$${calculatedTotal}`);
  });
});