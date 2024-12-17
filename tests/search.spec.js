import { test, expect } from '@playwright/test';
import SearchPage from '../pages/search.page';

test.describe('Search Tests', () => {
    let searchPage;

    test.beforeEach(async ({ page }) => {
        searchPage = new SearchPage(page);
        await searchPage.navigate();
    });

    test('TEST09 - Search Success', async ({ page }) => {
        const searchWord = 'pepperoni';

        // Perform a search with a valid word
        await searchPage.performSearch(searchWord);

        // Validate that the result text matches the expected message
        const resultText = await searchPage.waitForFinalResult();
        expect(resultText).toBe(`Found one result for ${searchWord}`);
    });

    test('TEST10 - Search Empty', async ({ page }) => {
        // Perform a search with an empty query
        await searchPage.performSearch('');

        // Validate that the result text shows the appropriate error message
        const resultText = await searchPage.waitForFinalResult();
        expect(resultText).toBe('Please provide a search word.');
    });
});