import { test, expect } from '@playwright/test';

/**
 * Represents the Payments/Checkout page. 
 * Handles payment method selection and order confirmation;  
 */

export class PaymentsPage {

    /**
     * @param {Page} page - The Playwright Page instance;
     */
    constructor(page) {
        this.page = page;

        this.paymentsTabButton = page.getByTestId('store-tab-payments')
        this.confirmButton = page.getByTestId('payment-confirm-button');
        this.MBWayPayment = page.getByTestId('payment-method-input-MBWay');
        this.totalAmount = page.getByTestId('payment-total');
        this.confirmPaymentButton = page.getByTestId('payment-confirm-button')


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

    getSummaryRowForProduct(product) {
        return this.page.locator('li').filter({ hasText: product.name });
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

    async confirmPayment() {
        await test.step('Click Confirm Payment', async () => {
            await this.confirmPaymentButton.click();
        });
    }


    async assertUserOnPaymentsPage() {
        await test.step('Confirm that the user is on the payments page', async () => {
            await expect(this.MBWayPayment).toBeVisible();

        })
    }

    async assertPaymentSummaryFor(product) {
        await test.step(`Assert payment summary shows ${product.name} with qty & subtotal`, async () => {
            const row = this.getSummaryRowForProduct(product);
            await expect(row).toBeVisible();
            await expect(row).toContainText(product.name);
            await expect(row).toContainText(/\d+\s*x/);
            await expect(row).toContainText(/€\d+(\.\d+)?/);
        });
    }

    async assertPaymentTotal(expectedText) {
        await test.step(`Assert Payment total is ${expectedText}`, async () => {
            await expect(this.totalAmount).toContainText(expectedText);
        });
    }



}