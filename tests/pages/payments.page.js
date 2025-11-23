import { test, expect } from '@playwright/test';

/**
 * Represents the Payments/Checkout page. 
 * Handles payment method selection and order confirmation;  
 */

export class PaymentsPage {

    /**
     * @param {Page} page - The Playwright Page instance;
     */
    constructor(page){ 
        this.page = page; 

        this.paymentsTabButton = page.getByTestId('store-tab-payments')
        this.confirmButton = page.getByTestId('payment-confirm-button');
        this.MBWayPayment = page.getByTestId('payment-method-input-MBWay');
    }

    /**
     * Navigates to the Payments tab; 
     * @returns {Promise<void>}
     */
    async navigateToThePaymentsPage() {
        await test.step('Navigate to the Payments page', async () => {
            await this.paymentsTabButton.click(); 
        })
    }

    /**
     * Selects a payment method and clicks the confirm button;
     * Note 💭: The input must be a Playwright Locator, not a data object; 
     * @param {Locator} locator - The locator for the payment method radio button/input; 
     * @param {string} methodName - The name of the payment method 
     * @returns {Promise<void>}
     */
    async submitPayment(methodName, locator) { 
        await test.step(`Confirm payment using ${methodName} payment`, async () => { 
            await locator.click(); 
            await this.confirmButton.click(); 
        })
    }

    /**
     * Clicks the confirm button without selecting a payment method first; 
     * For testing validation errors or negative scenarios; 
     * @returns {Promise<void>} 
     */
    async clickConfirmWithoutMethod() {
        await test.step('Confirm payment without cheking a payment method', async () => {
            await this.confirmButton.click(); 

        })
    }
}