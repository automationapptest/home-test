/**
 * CommonPage class provides utility methods for interacting with web elements.
 * This serves as a base page class for common operations across different pages.
 */
class CommonPage {
  constructor(page) {
    this.page = page; // Playwright page object
  }

  /**
   * Navigate to a specific URL.
   * @param {string} url - The relative or absolute URL to navigate to.
   */
  async navigate(url) {
    await this.page.goto(url);
  }

  /**
   * Fill a field with the specified value.
   * @param {string} selector - Selector for the input field.
   * @param {string} value - Value to input into the field.
   */
  async fillField(selector, value) {
    await this.page.fill(selector, value);
  }

  /**
   * Click a button or element.
   * @param {string} selector - Selector for the button or clickable element.
   */
  async clickButton(selector) {
    await this.page.click(selector);
  }

  /**
   * Get the text content of an element.
   * @param {string} selector - Selector for the element to extract text from.
   * @returns {Promise<string>} The text content of the element.
   */
  async getText(selector) {
    return await this.page.textContent(selector);
  }

  /**
   * Wait until an element becomes visible on the page.
   * @param {string} selector - Selector for the element to wait for.
   */
  async waitForVisible(selector) {
    await this.page.waitForSelector(selector, { state: 'visible' });
  }
}

export default CommonPage;