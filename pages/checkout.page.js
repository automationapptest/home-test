/**
 * CheckoutPage provides methods for interacting with the checkout functionality.
 * It extends CommonPage to reuse common utilities.
 */
import CommonPage from './common.page';
const { expect } = require('@playwright/test');

class CheckoutPage extends CommonPage {
  constructor(page) {
    super(page);

    // Selectors for form fields
    this.fullName = '#fname';
    this.lastName = '#last-name';
    this.address = '#adr';
    this.email = '#email';
    this.city = '#city';
    this.state = '#state';
    this.postalCode = '#zip';
    this.cardName = '#cname';
    this.cardNumber = '#ccnum';
    this.expMonth = '#expmonth';
    this.expYear = '#expyear';
    this.cvv = '#cvv';

    // Other UI selectors
    this.shippingCheckbox = 'input[type="checkbox"][name="sameadr"]';
    this.submitButton = page.getByRole('button', { name: 'Continue to checkout' });
    this.orderConfirmation = '#order-confirmation';
    this.alertMessage = 'div.alert';
    this.cartTotal = 'div.container >> text=Total >> css=span.price >> b';
    this.itemPrice = 'div.container p:not(:has-text("Total")) span.price';
  }

  /**
   * Fill the checkout form with provided data.
   * @param {Object} data - Billing and payment details.
   */
  async fillCheckoutForm(data) {
    await this.fillField(this.fullName, data.fullName);
    await this.fillField(this.address, data.address);
    await this.fillField(this.city, data.city);
    await this.fillField(this.state, data.state);
    await this.fillField(this.postalCode, data.postalCode);
    await this.fillField(this.email, data.email);

    if (data.creditCard) {
      await this.fillField(this.cardName, data.creditCard.nameOnCard);
      await this.fillField(this.cardNumber, data.creditCard.number);
      await this.fillField(this.cvv, data.creditCard.cvv || '');
      await this.fillField(this.expYear, data.creditCard.expYear || '');
      if (data.creditCard.expMonth) {
        await this.page.selectOption(this.expMonth, { value: data.creditCard.expMonth });
      }
    }
  }

  /**
   * Toggle the "Shipping address same as billing" checkbox.
   * @param {boolean} state - Desired state of the checkbox (true = checked).
   */
  async toggleShippingCheckbox(state) {
    const isChecked = await this.page.isChecked(this.shippingCheckbox);
    if (state && !isChecked) await this.page.check(this.shippingCheckbox);
    if (!state && isChecked) await this.page.uncheck(this.shippingCheckbox);
  }

  /**
   * Submit the checkout form.
   */
  async submitOrder() {
    await this.submitButton.click();
  }

  /**
   * Retrieve the order confirmation message.
   * @returns {Promise<string>} The confirmation message.
   */
  async getOrderConfirmation() {
    return await this.getText(this.orderConfirmation);
  }

  /**
   * Retrieve the alert message when validation fails.
   * @returns {Promise<string>} The alert message.
   */
  async getAlertMessage() {
    return await this.getText(this.alertMessage);
  }

  /**
   * Retrieve all individual item prices.
   * @returns {Promise<string[]>} An array of item prices.
   */
  async getItemPrices() {
    const prices = await this.page.$$eval(this.itemPrice, (spans) =>
      spans.map((span) => span.textContent.trim())
    );
    return prices;
  }

  /**
   * Retrieve the total cart value.
   * @returns {Promise<string>} The cart total.
   */
  async getCartTotal() {
    return await this.getText(this.cartTotal);
  }
}

export default CheckoutPage;