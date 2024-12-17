class SearchPage {
    constructor(page) {
        this.page = page;

        this.searchInput = '[name="searchWord"]'; 
        this.submitButton = 'button[type="submit"]'; 
        this.resultText = '#result'; 
    }

    async navigate() {
        await this.page.goto('/search');
    }

    // Perform a search with the given search word
    async performSearch(searchWord) {
        await this.page.fill(this.searchInput, searchWord);
        await this.page.click(this.submitButton);
    }

    // Wait until the result text changes from "searching..." to the final result
    async waitForFinalResult() {
        const locator = this.page.locator(this.resultText);
        await this.page.waitForFunction(
            (locator) => {
                const element = document.querySelector(locator);
                return element && element.textContent !== 'searching...'; // Wait until text is not "searching..."
            },
            this.resultText,
            { timeout: 5000 }
        );
        return await locator.textContent(); // Return the final result text
    }
}

export default SearchPage;