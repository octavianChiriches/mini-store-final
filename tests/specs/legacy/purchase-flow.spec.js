// import { test, expect } from '@playwright/test';
// import { InventoryPage } from '../pages/inventory.page';

// test('purchase flow', async ({ page }) => {
    
//     const today = new Date().toLocaleDateString('en-GB');
//     const inventoryPage = new InventoryPage(page); 

    
//     await page.goto('/');

//     await expect(page).toHaveTitle(/Playground/);
//     await page.getByRole('link', { name: 'STORE' }).click();
//     await expect(page.getByTestId('instructions-title')).toBeVisible();
//     await page.getByTestId('store-tab-inventory').click();
//     inventoryPage.createInventoryProduct('Product 1', '22', '3'); 
//     await page.getByTestId('store-tab-catalog').click();
//     await expect(page.getByTestId('catalog-title')).toBeVisible();
//     await page.getByTestId('catalog-item-add-button-0').click();
//     await page.getByTestId('store-tab-cart').click();
//     await expect(page.getByTestId('cart-title')).toBeVisible();
//     await page.getByTestId('cart-go-to-payment').click();
//     await expect(page.getByTestId('payment-title')).toBeVisible();
//     await page.getByTestId('payment-method-input-MBWay').click();
//     await page.getByTestId('payment-confirm-button').click();
//     await expect(page.getByTestId('orders-title')).toBeVisible();
//     await expect(page.getByTestId('order-date-0')).toContainText(/Date: \d{1,2}\/\d{1,2}\/\d{4}/);

// });