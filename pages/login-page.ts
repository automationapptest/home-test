import { Locator, Page } from "@playwright/test";

export default class LoginPage {
  public readonly page: Page;
  public readonly usernameField: Locator;
  public readonly passwordField: Locator;
  public readonly signInButton: Locator;
  public readonly wrongcredentialsMessage: Locator;
  public readonly fieldCannotBeEmptyMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator("#username");
    this.passwordField = page.locator("#password");
    this.signInButton = page.locator("#signin-button");
    this.wrongcredentialsMessage = page.locator("#message");
    this.fieldCannotBeEmptyMessage = page.locator("#message");
  }
}
