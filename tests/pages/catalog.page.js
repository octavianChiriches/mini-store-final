import { test, expect } from '@playwright/test';

/**
 * Represents the Catalog page where users can browse and add items to the cart; 
 */

export class CatalogPage {

    /**
     * 
     * @param {Page} page - The Playwright Page instance;  
     */
    constructor(page) {
        this.page = page;

        this.catalogTabButton = page.getByTestId('store-tab-catalog'); 
    }

    /**
     * Navigates to the catalog tab.
     * @returns {Promise<void>}
     */
    async navigateToTheCatalogPage() {
        await test.step('Navigate to the catalog page', async () => {
            await this.catalogTabButton.click(); 
        })
    }

    /**
     * Locates the "Add to Cart" button for a specific product; 
     * Checks the state (enabled/disabled) or existence of the button; 
     * @param {string} productName - The name of the product to find; 
     * @returns {Promise<Locator>} - The locator for the "Add to Cart" button; 
     */
    async getProductButtonState(productName) {
        return await test.step(`Get the ${productName} product button state`, async () => {
            return this.page.locator('li').filter({ hasText: productName }).getByRole('button', { name: 'Add to Cart' })
        })
    }

    /**
     * Finds a product by name and adds it to the cart
     * @param {string} productName - The name of the product to find; 
     * @returns {Promise<void>}
     */
    async addItemToCart(productName) {
        await test.step(`Add ${productName} item to the cart`, async () => {
            const btn = await this.getProductButtonState(productName);
            await btn.click();
        });
    }
}