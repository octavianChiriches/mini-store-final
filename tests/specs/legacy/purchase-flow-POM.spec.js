// import { test, expect } from '@playwright/test';
// import { InventoryPage } from '../../pages/inventory.page';
// import { CatalogPage } from '../../pages/catalog.page';
// import { CartPage } from '../../pages/cart.page';
// import { PaymentsPage } from '../../pages/payments.page';
// import { OrdersPage } from '../../pages/orders.page'; 

// test.describe('Day 2: Page Object Model Refactoring', () => {
//     test('Happy Path: User can purchase an item using POM', async ({page}) => {

//     const inventoryPage = new InventoryPage(page); 
//     const catalogPage = new CatalogPage(page); 
//     const cartPage = new CartPage(page); 
//     const paymentsPage = new PaymentsPage(page); 
//     const ordersPage = new OrdersPage(page); 

//     await inventoryPage.navigateToTheInventoryPage(); 
//     await inventoryPage.createInventoryProduct('Super Laptop', '1200', '10');
//     await inventoryPage.increaseStock('Super Laptop');
//     await catalogPage.navigateToTheCatalogPage();
//     await catalogPage.addItemToCart('Super Laptop');

//     await cartPage.navigateToTheCartPage();
//     await cartPage.getCartItem('Super Laptop'); 
//     const total = await cartPage.getCartTotalPrice(); 
//     console.log(`Total Price found: ${total}`); 

//     await paymentsPage.navigateToThePaymentsPage(); 
//     await paymentsPage.clickConfirmWithoutMethod();
//     await paymentsPage.submitPayment('MBWay', paymentsPage.MBWayPayment);

//     await ordersPage.navigateToTheOdersPage(); 
//     expect(await ordersPage.getLatestOrderDetails()).toBeTruthy();

//     })
// })