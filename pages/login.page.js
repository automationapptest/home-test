class LoginPage {
  constructor(page) {
    this.page = page;

    this.usernameInput = '#username'; 
    this.passwordInput = '#password'; 
    this.submitButton = '#signin-button'; 
    this.welcomeMessage = '#welcome-message'; 
  }

  async navigate() {
    await this.page.goto('/login');
  }

  // Perform login with the given username and password
  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.submitButton);
  }

  // Get the welcome message displayed after successful login
  async getWelcomeMessage() {
    return this.page.textContent(this.welcomeMessage);
  }

  // Validate and return a specific login error or status message
  async returnLoginMessage(expectedMessage) {
    const messageLocator = this.page.getByText(expectedMessage, { exact: true });
    await messageLocator.waitFor({ state: 'visible' }); 
    return await messageLocator.innerText(); 
  }
}

export default LoginPage;