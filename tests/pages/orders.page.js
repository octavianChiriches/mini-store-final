import { test, expect } from '@playwright/test';

/**
 * Represents the Order history page. 
 * Allows verification of submitted orders and theyr details. 
 */

export class OrdersPage {

    /**
     * @param {Page} page - The Playwright Page instance.
     */
    constructor(page) {
        this.page = page;
        
        this.ordersTabButton = page.getByTestId('store-tab-orders')
    }


    /**
     * Navigates to the Orders tab. 
     * @returns {Promise<void>}
     */
    async navigateToTheOdersPage() {
        await test.step('Navigate to the Orders page', async () => {
            await this.ordersTabButton.click(); 
        })
    }

    /**
     * Retrives the details of the most recent order.
     * Returns an object with specific locators to verify the quantity and subtotal. 
     * @returns {Promise<{container: Locator, quantityDisplay: Locator, subtotalDisplay: Locator}>}.   
     * An object containing the main row locator and specific child locators. 
     */
    async getLatestOrderDetails() { 
        return await test.step('Return the order details', async () => {
            // .first() ensures we look at the most recent order added to the top
            const orderItem = this.page.locator('li').first(); 

            return {
                container: orderItem, 
                quantityDisplay: orderItem.getByText(/\d+ x/), 
                subtotalDisplay: orderItem.getByText(/€\d+\.\d+/).last() 
            }
        })
    }
}