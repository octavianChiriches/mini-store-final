import { test, expect } from '@playwright/test';

/**
 * Represents the Catalog page where users can browse and add items to the cart; 
 */

export class CatalogPage {

    /**
     * @param {Page} page - The Playwright Page instance;  
     */
    constructor(page) {
        this.page = page;

        this.catalogTabButton = page.getByTestId('store-tab-catalog');
    }

    // HELPERS

    /**
     * Returns the list item (row) locator for a given product.
     * @param {CATALOG_PRODUCT} product - Product whose row should be located.
     * @returns {import("@playwright/test").Locator} Locator for the product row.
     */
    getProductRow(product) {
        return this.page.locator("li").filter({ hasText: product.name });
    }

    /**
     * Reads the current quantity for a product from the Catalog UI.
     * Example text: "2 units" -> returns 2
     * @param {Object} product - The product object (must contain .name).
     * @returns {Promise<number>} The numeric quantity from the UI.
     */
    async getProductQuantityFromUI(product) {
        const productRow = this.getProductRow(product);
        const quantityBadge = productRow.locator('[data-testid^="catalog-item-quantity-"]');
        const text = await quantityBadge.innerText();
        const match = text.match(/\d+/);

        return match ? parseInt(match[0], 10) : NaN;
    }

    /**
     * Find all products that are out of stock on the Catalog page.
     *
     * A product is considered "out of stock" if:
     *  - Its quantity badge shows "0 units"
     *  - The button text is "Out of Stock"
     *  - The button is disabled (cannot be clicked)
     *
     * This function does NOT trust any test data.
     * It only uses what is actually rendered in the browser.
     *
     * @returns {Promise<string[]>} - An array with the names of all out-of-stock products.
     */
    async getOOSProductFromUI() {
        // locator that points to all catalog item rows
        const productRows = this.page.locator('li[data-testid^="catalog-item-"]');
        // Finds out how many products we have in the catalog
        const count = await productRows.count();
        // Declare an array where the 'OOS' products will be stored 
        const outOfStockProducts = [];

        // Loop through each product 
        for (let index = 0; index < count; index++) {
            const row = productRows.nth(index);

            // Read the quantity text from UI (ex - 0 or 12)
            const quantityBadge = row.locator('[data-testid^="catalog-item-quantity-"]');
            const quantityText = (await quantityBadge.innerText()).trim();

            // If the quantity text does not contain 0 then skip row 
            if (!quantityText.startsWith('0')) {
                continue;
            }

            // Get the button inside the row ('Add to cart' or 'Out of Stock')
            const button = row.getByRole('button');

            // Read the button label and state from the UI
            const buttonText = (await button.innerText()).trim();
            const isDisabled = await button.isDisabled();

            // Check if this product really meets the 'OOS' definition 
            const isOutOfStockButton = buttonText === 'Out of Stock' && isDisabled;

            if (isOutOfStockButton) {
                // If the product is 'OOS', read the product name 
                const productName = (await row.locator('[data-testid^="catalog-item-name-"]').innerText()).trim();
                // Push this product name to the outOfStockProducts array
                outOfStockProducts.push(productName);
            }
        }

        // Returns the list of all products that are out of stock; 
        return outOfStockProducts;
    }


    // ACTIONS 

    /**
     * Navigates to the catalog tab.
     * @returns {Promise<void>}
     */
    async navigateToTheCatalogPage() {
        await test.step('Navigate to the catalog page', async () => {
            await this.page.goto("/store");
            await this.catalogTabButton.click();
        });
    }

    /**
     * Locates the "Add to Cart" button for a specific product; 
     * Checks the state (enabled/disabled) or existence of the button; 
    * @param {Object} product - The product object (must contain at least .name).     
    * @returns {Promise<Locator>} - The locator for the "Add to Cart" button; 
     */
    async getProductButtonState(product) {
        return await test.step(`Get the ${product.name} product button state`, async () => {
            const row = this.getProductRow(product)
            return row.getByRole('button', { name: 'Add to cart' });
        })
    }

    /**
    * Finds a product by name and adds it to the cart
    * @param {Object} product - The product object (must contain at least .name).
    * @returns {Promise<void>}
    */
    async addItemToCart(product) {
        await test.step(`Add ${product.name} item to the cart`, async () => {
            const btn = await this.getProductButtonState(product);
            await btn.click();
        });
    }

    // ASSERTIONS 

    /**
     * Asserts that the product card. shows the expected stock quantity
     * @param {CATALOG_PRODUCT} product - Product with the expected quantity value;
     * @returns {Promise<void>}
     */
    async assertItemStock(product) {
        await test.step(`Assert stock for ${product.name} is ${product.quantity}`, async () => {
            const card = this.getProductRow(product);
            await expect(card).toContainText(product.quantity.toString());

        })
    }

    /**
     * Asserts that the product qunatity on UI equals the expected value. 
     * @param {Object} product - The product (must contain .name)
     * @param {number} expectedQuantity - The expected quantity from UI
     * @returns {Promise<void>} 
     */
    async assertProductQuantityIs(product, expectedQuantity) { 
        await test.step(`Assert qunatity for ${product.name} is ${expectedQuantity}`, async () => { 
            const productRow = this.getProductRow(product); 
            const quantityBadge = productRow.locator('[data-testid^="catalog-item-quantity-"]');
            await expect(quantityBadge).toContainText(expectedQuantity.toString()); 
        })
    }



}