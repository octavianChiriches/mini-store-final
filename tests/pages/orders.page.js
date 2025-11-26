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
    async navigateToTheOrdersPage() {
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

    /**
     * Check that the latest order shows:
     *  - the product name
     *  - a quantity (for example "1 x")
     *  - a subtotal price (for example "€9999.99")
     *
     * This method uses getLatestOrderDetails() which returns three locators:
     *  - container         → the whole <li> row for the latest order
     *  - quantityDisplay   → the element that shows the quantity (e.g. "1 x")
     *  - subtotalDisplay   → the element that shows the subtotal (e.g. "€9999.99")
     *
     * @param {{ name: string, price?: string }} product
     *   The product we expect to see in the latest order.
     */
    async assertLatestOrderDetails(product) {
        await test.step(
            `Check that the latest order shows ${product.name} with quantity and subtotal`,
            async () => {
                // 1. Get the locators for the latest order from the helper method
                const latestOrderDetails = await this.getLatestOrderDetails();

                const container = latestOrderDetails.container;
                const quantityDisplay = latestOrderDetails.quantityDisplay;
                const subtotalDisplay = latestOrderDetails.subtotalDisplay;

                // 2. Check that the order row is visible and contains the product name
                await expect(container).toBeVisible();
                await expect(container).toContainText(product.name);

                // 3. Check that the quantity is visible (for example "1 x" or "2 x")
                await expect(quantityDisplay).toBeVisible();
                // We look for "x" because the UI shows "1 x", "2 x", etc.
                await expect(quantityDisplay).toContainText('x');

                // 4. Check that the subtotal is visible and looks like a price
                await expect(subtotalDisplay).toBeVisible();
                // At minimum it should contain the € symbol
                await expect(subtotalDisplay).toContainText('€');

                // 5. (Optional) If the product has a price in the test data,
                //    also check that this price appears in the subtotal text.
                if (product.price) {
                    await expect(subtotalDisplay).toContainText(product.price);
                }
            }
        );
    }

    async assertUserOnTheOrdersPage() {
        await test.step('Confirm that the user is on the orders page', async () => {
            await expect(this.page.getByRole('heading', { name: /orders/i })).toBeVisible();

        })
    }
}