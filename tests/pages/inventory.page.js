import { test, expect } from '@playwright/test';

/**
 * Inventory management page of the application. 
 * Provides methods to navigate, create products, and manage stock levels; 
 */

export class InventoryPage {

    /**
     * Initializes the InventoryPage with locators; 
     * @param {Page} page - The Playwright Page instance; 
     */
    constructor(page) {
        this.page = page;

        this.inventoryTabButton = page.getByTestId('store-tab-inventory'); 
        this.productNameField = page.getByTestId('inventory-input-name');
        this.priceField = page.getByTestId('inventory-input-price');
        this.qantityField = page.getByTestId('inventory-input-quantity');
        this.addProductButton = page.getByTestId('inventory-submit-button');
    }

    // ACTIONS  
    
    /**
     * Navigates to the store URL and selects the Inventory tab; 
     * @returns {Promise<void>}
     */
    async navigateToTheInventoryPage() {
        await test.step('Navigate to the inventory page', async () => {
            await this.page.goto('/store');
            await this.inventoryTabButton.click(); 
        })
    }
    

    /**
     * Fills out the product from and creates a new inventory item; 
     * @param {string} name - The name of the product to create;
     * @param {string} price - The price of the product; 
     * @param {string} quantity - The initial stock quantity; 
     * @returns {Promise<void>} 
     */
    async createInventoryProduct(name, price, quantity) {
        await test.step('Creates a new inventory product item', async () => {
            await this.productNameField.fill(name);
            await this.priceField.fill(price);
            await this.qantityField.fill(quantity);
            await this.addProductButton.click();
        })

    }

    /**
     * Increases the stock count for a specific product; 
     * Finds the product row by name (productName) and clicks the last button (assumed to be '+')
     * @param {string} productName - The name of the product to update; 
     * @returns {Promise<Void>}
     */
    async increaseStock(productName) {
        await test.step(`Increase stock for ${productName}`, async () => {
            const productRow = this.page.locator('li').filter({ hasText: productName });
            const increaseButton = productRow.locator('button').last();
            await increaseButton.click();
        });
    }

    /**
     * Decreases the stock count for a specific product.
     * Finds the product row by name and clicks the first button (assumed to be '-')
     * @param {string} productName - The name of the product to update; 
     * @returns {Promise<void>}
     */ 
    async decreaseStock(productName) {
        await test.step(`Decrease stock for ${productName}`, async () => {
            const productRow = this.page.locator('li').filter({ hasText: productName }); 
            const decreaseButton = productRow.locator('button').first();
            await decreaseButton.click();
        });
    }

}