const { expect } = require("@playwright/test");

class SearchPage {
  constructor(page) {
    this.page = page;

    // Selectors
    this.searchInput = "input[name='searchWord']"; // Input for entering search queries
    this.searchButton = "button>i.fa.fa-search"; // Search button
    this.resultMessage = ".result-container>#result"; // Locator for result messages
    this.errorMessage = "#error-message"; // Locator for error messages
  }

  /**
   * Perform a search operation with the given query.
   * @param {string} query - Search query to input.
   */
  async performSearch(query) {
    await this.page.fill(this.searchInput, query);
    await this.page.click(this.searchButton);
  }

  /**
   * Get the result message for a search operation.
   * @param {string} expectedMessage - The expected search result message.
   * @returns {Promise<string>} The actual search result message.
   */
  async getSearchResult(expectedMessage) {
    const resultLocator = this.page.locator(this.resultMessage);
    await expect(resultLocator).toHaveText(expectedMessage, { timeout: 30000 });
    return await resultLocator.textContent();
  }

  /**
   * Retrieve the error message when search validation fails.
   * @returns {Promise<string>} The error message text.
   */
  async getErrorMessage() {
    return await this.page.textContent(this.errorMessage);
  }
}

export default SearchPage;
