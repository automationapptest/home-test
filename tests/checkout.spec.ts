import { test, expect } from "@playwright/test";
import CheckoutPage from "../pages/checkout-page";
import OrderPage from "../pages/order-page";

let checkoutPage: CheckoutPage;
let orderPage: OrderPage;

test.beforeEach("Setup", async ({ page }) => {
  checkoutPage = new CheckoutPage(page);
  orderPage = new OrderPage(page);
  await page.goto("http://localhost:3100/checkout");
});
test.afterEach("Teardown", async ({ page }) => {
  await page.close();
});

test.describe("Checkout Suite", () => {
  test("Checkout Form Order Success", async ({ page }) => {
    await checkoutPage.fullNameField.fill("Stephen Pozo");
    await checkoutPage.emailField.fill("stephen.pozo@gmail.com");
    await checkoutPage.addressField.fill("Av. Mariscal La Mar 352 Miraflores");
    await checkoutPage.cityField.fill("Lima");
    await checkoutPage.stateField.fill("Lima");
    await checkoutPage.zipField.fill("15003");
    await checkoutPage.nameOnCardField.fill("Stephen Pozo");
    await checkoutPage.creditCardNumberField.fill("12345678");
    await checkoutPage.expMonthDropdown.selectOption("April");
    await checkoutPage.expYearField.fill("2028");
    await checkoutPage.cvvField.fill("123");

    const isChecked =
      await checkoutPage.shippingAddressSameAsBillingCheckbox.isChecked();

    if (!isChecked) {
      await checkoutPage.shippingAddressSameAsBillingCheckbox.check();
    }

    await checkoutPage.continueToCheckoutButton.click();

    const orderText = await orderPage.orderNumberText.innerText();
    expect(orderText).not.toBeNull();
    expect(orderText).not.toBe("");
  });

  test("Checkout Form Alert", async ({ page }) => {
    await checkoutPage.fullNameField.fill("Stephen Pozo");
    await checkoutPage.emailField.fill("stephen.pozo@gmail.com");
    await checkoutPage.addressField.fill("Av. Mariscal La Mar 352 Miraflores");
    await checkoutPage.cityField.fill("Lima");
    await checkoutPage.stateField.fill("Lima");
    await checkoutPage.zipField.fill("15003");
    await checkoutPage.nameOnCardField.fill("Stephen Pozo");
    await checkoutPage.creditCardNumberField.fill("12345678");
    await checkoutPage.expMonthDropdown.selectOption("April");
    await checkoutPage.expYearField.fill("2028");
    await checkoutPage.cvvField.fill("123");

    const isChecked =
      await checkoutPage.shippingAddressSameAsBillingCheckbox.isChecked();

    if (isChecked) {
      await checkoutPage.shippingAddressSameAsBillingCheckbox.uncheck();
    }

    let alertDialog;

    checkoutPage.page.on("dialog", (dialog) => {
      alertDialog = dialog;
      expect(dialog.message()).toBe(
        "Shipping address same as billing checkbox must be selected."
      );
      dialog.accept();
    });

    await checkoutPage.continueToCheckoutButton.click();
  });

  test("Cart Total Test", async ({ page }) => {
    const productPrices = await page
      .locator(".price")
      .evaluateAll((elements) =>
        elements
          .slice(1, -1)
          .map((element) => parseFloat(element.textContent.replace("$", "")))
      );

    const calculatedTotal = productPrices.reduce(
      (acc, price) => acc + price,
      0
    );

    const displayedTotalText = await page
      .locator(".price")
      .last()
      .textContent();
    const displayedTotal = parseFloat(displayedTotalText.replace("$", ""));

    expect(calculatedTotal).toBe(displayedTotal);
  });
});
