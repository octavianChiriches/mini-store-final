import { test, expect } from "@playwright/test";
import { PRODUCTS } from "../data/inventory.data";

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

        this.inventoryTabButton = page.getByTestId("store-tab-inventory");
        this.productNameField = page.getByTestId("inventory-input-name");
        this.priceField = page.getByTestId("inventory-input-price");
        this.quantityField = page.getByTestId("inventory-input-quantity");
        this.addProductButton = page.getByTestId("inventory-submit-button");
    }

    // HELPERS

    /**
     * Returns the list item (row) locator for a given product.
     * @param {InventoryProduct} product - Product whose row should be located.
     * @returns {import("@playwright/test").Locator} Locator for the product row.
     */
    getProductRow(product) {
        return this.page.locator("li").filter({ hasText: product.name });
    }

    // ACTIONS

    /**
     * Navigates to the store URL and selects the Inventory tab;
     * @returns {Promise<void>}
     */
    async navigateToTheInventoryPage() {
        await test.step("Navigate to the inventory page", async () => {
            await this.page.goto("/store");
            await this.inventoryTabButton.click();
        });
    }

    /**
     * Fills out the product form and creates a new inventory item;
     * @param {Object} product - The product data object
     * @param {string} product.name - The name of the product to create;
     * @param {string} product.price - The price of the product;
     * @param {string} product.quantity - The initial stock quantity;
     * @returns {Promise<void>}
     */
    async createInventoryProduct(product) {
        await test.step("Creates a new inventory product item", async () => {
            await this.productNameField.fill(product.name);
            await this.priceField.fill(product.price);
            await this.quantityField.fill(product.quantity);
            await this.addProductButton.click();
        });
    }

    /**
     * Increases the stock count for a specific product;
     * Finds the product row by name (productName) and clicks the last button (assumed to be '+')
     * @param {Object} product - The product object to verify; 
     * @returns {Promise<Void>}
     */
    async increaseStock(product) {
        await test.step(`Increase stock for ${product.name}`, async () => {
            const productRow = this.getProductRow(product)
            const increaseButton = productRow.locator("button").last();
            await increaseButton.click();
        });
    }

    /**
     * Decreases the stock count for a specific product.
     * Finds the product row by name and clicks the first button (assumed to be '-')
     * @param {Object} product - The product object to verify; 
     * @returns {Promise<void>}
     */
    async decreaseStock(product) {
        await test.step(`Decrease stock for ${product.name}`, async () => {
            const productRow = this.getProductRow(product)
            const decreaseButton = productRow.locator("button").first();
            await decreaseButton.click();
        });
    }

    // ASERTS

    /**
     * Verifies that the product row is visible in the list; 
     * @param {Object} product - The product object to verify;
     * @returns {Promise<void>} 
     */

    async assertProductIsCreated(product) {
        await test.step(`Verify if the newly created ${product.name} product is added to the list`, async () => {
            const productRow = this.getProductRow(product)
            await expect(productRow).toBeVisible();
        });
    }

    /**
     * Verifies that the product row contains the correct price text. 
     * @param {Object} product - The product object cotaining the expected price. 
     * @returns {Promise<void>}
     */
    async assertProductPrice(product) {
        await test.step(`Verify if the newly created ${product.name} product price`, async () => {
            const productRow = this.getProductRow(product);
            await expect(productRow).toContainText(product.price);
        });
    }

    /**
     * Verifies that the product row contains the correct initial quantity; 
     * @param {Object} product - The product object containing the expected quantity; 
     * @returns {Promise<void>}
     */
    async assertProductQantity(product) {
        await test.step(`Verify if the newly created ${product.name} product quantity`, async () => {
            const productRow = this.getProductRow(product);
            await expect(productRow).toContainText(product.quantity);
        });
    }

    /**
     * Verifies that the displayed quantity is exactly 1 highr that the product's initial qunatity; 
     * Logic: Parsed(product.quantity) + 1;  
     * @param {Object} product - The product object with the base qunatity; 
     * @returns {Promise<void>}
     */
    async assertProductQantityIncreasedByOne(product) {
        await test.step(`Verify that the ${product.name} product is increased by 1`, async () => {
            const initialQuantity = parseInt(product.quantity, 10);
            const expectedQuantity = initialQuantity + 1;
            const productRow = this.getProductRow(product)
            await expect(productRow).toContainText(expectedQuantity.toString());
        });
    }

    /**
     * Verifies that the displayed quantity is exactly 1 lower than the products's initial quantity; 
     * Logic: Parsed(product.quantity) - 1;  
     * @param {Object} product - The product objec t with the base qunatity; 
     * @returns {Promise<void>} 
     */
    async assertProductQantityDecreasedByOne(product) {
        await test.step(`Verify that the ${product.name} product is decreased by 1`, async () => {
            const initialQuantity = parseInt(product.quantity, 10);
            const expectedQuantity = initialQuantity - 1;
            const productRow = this.getProductRow(product)
            await expect(productRow).toContainText(expectedQuantity.toString());
        });
    }

    /**
     * Verifies that the quantity remains at '0' and does not display negative numbers.
     * @param {Object} product - The product object.
     * @returns {Promise<void>}
     */
    async assertProductQuantityNotBellowZero(product) {
        await test.step(`Verify ${product.name} does not go below 0`, async () => {
            const productRow = this.getProductRow(product);
            await expect(productRow).toContainText('0')
        })
    }


}
