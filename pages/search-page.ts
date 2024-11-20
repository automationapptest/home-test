import { Locator, Page } from "@playwright/test";

export default class SearchPage {
  public readonly page: Page;
  public readonly searchField: Locator;
  public readonly searchButton: Locator;
  public readonly resultsMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchField = page.locator('[name=searchWord]')
    this.searchButton =  page.locator('[type=submit]')
    this.resultsMessage =  page.locator('#result')
  }
}
