/**
 * LoginPage provides methods for interacting with the login page.
 */
const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;

    // Selectors for login fields and buttons
    this.usernameField = "#username";
    this.passwordField = "#password";
    this.signinButton = "#signin-button";
    this.message = "#message"; // For error messages
    this.welcomeMessage = "#welcome-message"; // For welcome messages
  }

  /**
   * Perform login with given credentials.
   * @param {string} username - The username to input.
   * @param {string} password - The password to input.
   */
  async login(username, password) {
    await this.page.fill(this.usernameField, username);
    await this.page.fill(this.passwordField, password);
    await this.page.click(this.signinButton);
  }

  /**
   * Retrieve the welcome message after successful login.
   * @returns {Promise<string>} The welcome message text.
   */
  async getWelcomeMessage() {
    await this.page.waitForSelector(this.welcomeMessage, { state: "visible" });
    return await this.page.textContent(this.welcomeMessage);
  }

  /**
   * Retrieve the error message when login fails.
   * @param {string} expectedMessage - The expected error message.
   */
  async getLoginMessage(expectedMessage) {
    await this.page.waitForFunction(
      (selector) => {
        const element = document.querySelector(selector);
        return element && element.textContent.trim() !== "";
      },
      this.message
    );
    await expect(this.page.locator(this.message)).toHaveText(expectedMessage);
  }
}

export default LoginPage;