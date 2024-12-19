const { expect } = require('@playwright/test');

class GridPage {
  constructor(page) {
    this.page = page;

    // Selectors
    this.gridContainer = "#menu"; // Selector for the grid container
    this.gridItem = ".item"; // Selector for each grid item
    this.productName = '[data-test-id="item-name"]'; // Selector for product name
    this.productPrice = '#item-price'; // Selector for product price
    this.productImage = "img"; // Selector for product image
    this.productButton = '[data-test-id="add-to-order"]'; // Selector for the button
    this.productCardNumber = '[data-test-id="card-number"]'; // Selector for the card number
  }

    /**
   * Retrieve the name of a product at a specific position in the grid.
   * @param {number} position - Index of the product in the grid (1-based).
   * @returns {Promise<string>} The product's name.
   */
  async getProductNameAt(position) {
    // Get the product name at a specific position
    return await this.page.locator(`${this.gridItem}:nth-of-type(${position}) ${this.productName}`).textContent();
  }

    /**
   * Retrieve the price of a product at a specific position in the grid.
   * @param {number} position - Index of the product in the grid (1-based).
   * @returns {Promise<string>} The product's price.
   */
  async getProductPriceAt(position) {
    // Get the product price at a specific position
    return await this.page.locator(`${this.gridItem}:nth-of-type(${position}) ${this.productPrice}`).textContent();
  }

  getGridItemAt(position) {
    // Returns the locator for a specific grid item
    return this.page.locator(`${this.gridItem}:nth-of-type(${position})`);
  }


  /**
   * Retrieve details for all grid items.
   * @returns {Promise<Object[]>} Array of grid item details (title, price, etc.).
   */
  async getAllGridItems() {
    // Get all grid items using locators
    const gridItems = await this.page.locator(this.gridItem);
  
    const gridData = [];
    const count = await gridItems.count(); // Get the count of grid items
  
    for (let i = 0; i < count; i++) {
      const item = gridItems.nth(i); // Get the nth item as a locator
      const title = await item.locator(this.productName).textContent();
      const price = await item.locator(this.productPrice).textContent();
      const image = await item.locator(this.productImage).getAttribute("src");
      const button = await item.locator(this.productButton).isVisible();
  
      gridData.push({
        title: title.trim(),
        price: price.trim(),
        image: image ? image.trim() : "",
        button,
      });
    }
  
    return gridData;
  }
}

export default GridPage;