import { Locator, Page } from "@playwright/test";

export default class CheckoutPage {
  public readonly page: Page;
  public readonly fullNameField: Locator;
  public readonly emailField: Locator;
  public readonly addressField: Locator;
  public readonly cityField: Locator;
  public readonly stateField: Locator;
  public readonly zipField: Locator;
  public readonly nameOnCardField: Locator;
  public readonly creditCardNumberField: Locator;
  public readonly expMonthDropdown: Locator;
  public readonly expYearField: Locator;
  public readonly cvvField: Locator;
  public readonly shippingAddressSameAsBillingCheckbox: Locator;
  public readonly continueToCheckoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fullNameField = page.getByLabel("Full Name");
    this.nameOnCardField = page.getByLabel("Name on Card");
    this.emailField = page.getByLabel("Email");
    this.creditCardNumberField = page.getByLabel("Credit card number");
    this.addressField = page.getByLabel("Address", { exact: true });
    this.expMonthDropdown = page.getByLabel("Exp Month");
    this.cityField = page.getByLabel("City");
    this.expYearField = page.getByLabel("Exp Year");
    this.cvvField = page.getByLabel("CVV");
    this.stateField = page.getByLabel("State");
    this.zipField = page.getByLabel("Zip");
    this.shippingAddressSameAsBillingCheckbox = page.getByText(
      "Shipping address same as"
    );
    this.continueToCheckoutButton = page.getByRole("button", {
      name: "Continue to checkout",
    });
  }
}
