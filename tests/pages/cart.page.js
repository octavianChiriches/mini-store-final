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
    }

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
     * Retrives specific UI elements for a single product row in the cart; 
     * Verifies the 'N x' quantity text and the specific subtotal price; 
     * @param {string} productName - The name of the product to find in the list; 
     * @returns {Promise<{container: Locator, quantityDisplay: Locator, subtotalDisplay: Locator}>}; 
     * An object containing the main row locator and specific child locators for assertions; 
     */
    async getCartItem(productName) {
        return await test.step(`Return the quantity & subtotal price locators for ${productName}`, async () => {
            const productRow = this.page.locator('li').filter({ hasText: productName });
            
            return {
                container: productRow, 
                // Regex finds text like "2 x"
                quantityDisplay: productRow.getByText(/\d+ x/),
                // Regex finds text like "€10.00" 
                subtotalDisplay: productRow.getByText(/€\d+\.\d+/).last() 
            }
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

 
}