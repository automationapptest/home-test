class CheckoutPage {
    constructor(page) {
      this.page = page;
  
      this.fullNameInput = '#fname';
      this.emailInput = '#email';
      this.addressInput = '#adr';
      this.cityInput = '#city';
      this.stateInput = '#state';
      this.zipInput = '#zip';
      this.nameOnCardInput = '#cname';
      this.creditCardNumberInput = '#ccnum';
      this.expMonthInput = '#expmonth';
      this.expYearInput = '#expyear';
      this.cvvInput = '#cvv';
      this.billingCheckbox = '[name="sameadr"]'; // Checkbox for "Shipping address same as billing"
      this.submitButton = this.page.getByText('Continue to checkout', { exact: true }); 
      this.orderConfirmation = '#order-confirmation';
      this.orderNumber = '[data-id="ordernumber"]'; 
      this.totalPrice = 'p:has-text("Total") b'; // Total price element
      this.cartHeading = this.page.getByRole('heading', { name: 'Cart ' }); // Heading showing cart details
      this.productSelector = (productName) => this.page.getByText(productName); // Dynamic product selector
    }
  
    async navigate() {
      await this.page.goto('/checkout');
    }
  
    // Fill out the checkout form with provided details
    async completeForm(details) {
      await this.page.fill(this.fullNameInput, details.name);
      await this.page.fill(this.emailInput, details.email);
      await this.page.fill(this.addressInput, details.address);
      await this.page.fill(this.cityInput, details.city);
      await this.page.fill(this.stateInput, details.state);
      await this.page.fill(this.zipInput, details.zip);
      await this.page.selectOption(this.expMonthInput, details.expMonth);
      await this.page.fill(this.expYearInput, details.expYear);
      await this.page.fill(this.nameOnCardInput, details.cardName);
      await this.page.fill(this.creditCardNumberInput, details.cardNumber);
      await this.page.fill(this.cvvInput, details.cvv);
    }
  
    // Ensure the "Shipping address same as billing" checkbox is checked
    async checkBillingCheckbox() {
      if (!await this.page.isChecked(this.billingCheckbox)) {
        await this.page.check(this.billingCheckbox);
      }
    }
  
    // Submit the checkout form
    async submitForm() {
      await this.submitButton.click();
    }
  
    // Get the order number from the confirmation page
    async getOrderNumber() {
      const orderNumber = await this.page.textContent(this.orderNumber);
      if (!orderNumber) {
        throw new Error('Order number was not generated.');
      }
      return orderNumber;
    }
  
    // Get the number of products in the cart
    async getProductCount() {
      const cartText = await this.cartHeading.textContent();
      return parseInt(cartText.match(/\d+/)?.[0] || '0', 10);
    }
  
    // Get the prices of all products in the cart
    async getProductPricesFromText(productCount) {
      const prices = [];
      for (let i = 1; i <= productCount; i++) {
        const productPriceText = await this.productSelector(`Product ${i} $`).textContent();
        const match = productPriceText.match(/\$(\d+(\.\d{1,2})?)/);
        prices.push(match ? parseFloat(match[1]) : 0);
      }
      return prices;
    }
  
    // Get the total price displayed on the page
    async getTotalPrice() {
      const totalText = await this.page.locator(this.totalPrice).textContent();
      return parseFloat(totalText.replace('$', '').trim());
    }
  }
  
  export default CheckoutPage;