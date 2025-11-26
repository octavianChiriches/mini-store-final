import { test, expect } from '@playwright/test';
import { CATALOG_PRODUCTS } from '../data/catalog.data';
import { CartPage } from '../pages/cart.page';
import { CatalogPage } from '../pages/catalog.page';
import { PaymentsPage } from '../pages/payments.page';
import { OrdersPage } from '../pages/orders.page';




test.describe('💳 Orders tests', () => {

    let cartPage;
    let catalogPage;
    let paymentsPage;
    let ordersPage;  

    const productLightsaber = CATALOG_PRODUCTS.productLightsaber;



    test.beforeEach(async ({ page }) => {
        cartPage = new CartPage(page);
        catalogPage = new CatalogPage(page);
        paymentsPage = new PaymentsPage(page); 
        ordersPage = new OrdersPage(page)

        await catalogPage.navigateToTheCatalogPage();
        await catalogPage.addItemToCart(productLightsaber);
        await paymentsPage.navigateToThePaymentsPage();
        await paymentsPage.submitPayment('MBWay', paymentsPage.MBWayPayment);
    })

    test('Scenario: Display order details', async ({ page }) => {
        await ordersPage.navigateToTheOrdersPage(); 
        await ordersPage.assertLatestOrderDetails(productLightsaber);
    })

   

})