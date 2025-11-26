import { test, expect } from '@playwright/test';

/**
 * Represents the Shopping Cart page; 
 * Provides methods to inspect cart items, verify quantities/totals, and check the grand total; 
 */

export class CartPage {

    /**
     * @param {Page} page - The Playwright Page instance; 
     */
    constructor(page) {
        this.page = page;

        this.cartTabButton = page.getByTestId('store-tab-cart'); 
        this.goToPaymentsButton = page.getByTestId('cart-go-to-payment'); 
    }

    // HELPERS
    /**
     * Navigates to the Cart tab; 
     * @returns {Promise<void>}
     */
    async navigateToTheCartPage() {
        await test.step('Navigate to the cart page', async () => {
            await this.cartTabButton.click(); 
        })
    }

    /**
     * Retrives the total price of the cart as a string (e.g. "150.00"); 
     * Note 💭: This returns a string not a number; 
     * @returns {Promise<string>} The visible text of the total price element; 
     */
    async getCartTotalPrice(){
        return await test.step('Return the cart page price locator', async () => { 
            // innerText() returns a string; 
            return this.page.getByTestId('cart-total').innerText();
        })
    }

    async userNavigatesToPayments() {
        await test.step(`Assert that the user is navigated to the Payments page after tapping on Go to Payments CTA`, async () => {
            await this.goToPaymentsButton.click(); 
        })
    }

    /**
     * Returns the list item (row) locator for a given product.
     * @param {CATALOG_PRODUCT} product - Product whose row should be located.
     * @returns {import("@playwright/test").Locator} Locator for the product row.
     */
    getProductRow(product) {
        return this.page.locator("li").filter({ hasText: product.name });
    }

    // ACTIONS 
    /**
     * Retrives specific UI elements for a single product row in the cart; 
     * Verifies the 'N x' quantity text and the specific subtotal price; 
     * @param {string} productName - The name of the product to find in the list; 
     * @returns {Promise<{container: Locator, quantityDisplay: Locator, subtotalDisplay: Locator}>}; 
     * An object containing the main row locator and specific child locators for assertions; 
     */
    async getCartItem(product) {
        return await test.step(`Return the quantity & subtotal price locators for ${product.name}`, async () => {
            const productRow = this.page.locator('li').filter({ hasText: product.name });
            
            return {
                container: productRow, 
                // Regex finds text like "2 x"
                quantityDisplay: productRow.getByText(/\d+ x/),
                // Regex finds text like "€10.00" 
                subtotalDisplay: productRow.getByText(/€\d+\.\d+/).last() 
            }
        })
    }



    // ASSERTS 

    /**
     * Asserts that the cart total price displayed in the UI matches the expected value.
     * Uses the getCartTotalPrice() helper so we validate what is actually rendered
     * @param {string} expectedTotalText - The expected total text
     * @returns {Promise<void>}
     */
    async assertCartTotalPriceIs(expectedTotalText) { 
        await test.step(`Assert cart total price is ${expectedTotalText}`, async () => {
            const actualTotal = await this.getCartTotalPrice(); 
            await expect(actualTotal).toContain(expectedTotalText)
        })
    }


 
}