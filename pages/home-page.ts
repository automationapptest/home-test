import { Locator, Page } from "@playwright/test";

export default class HomePage {
  public readonly page: Page;
  public readonly welcomeMessage: Locator;
  public readonly welcomeUsername: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeMessage = page.locator("#welcome-message");
    this.welcomeUsername = page.locator("[data-id=username]");
  }
}
