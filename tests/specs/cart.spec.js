import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { CatalogPage } from '../pages/catalog.page';
import { CATALOG_PRODUCTS } from '../data/catalog.data';
import { PaymentsPage } from '../pages/payments.page';


test.describe('🛒 Cart tests', () => {

    let cartPage;
    let catalogPage;
    let paymentsPage; 

    const productLightsaber = CATALOG_PRODUCTS.productLightsaber;



    test.beforeEach(async ({ page }) => {
        cartPage = new CartPage(page);
        catalogPage = new CatalogPage(page);
        paymentsPage = new PaymentsPage(page); 
    })

    test('Scenario: Display cart items and totals', async ({ page }) => {
        await catalogPage.navigateToTheCatalogPage();
        await catalogPage.addItemToCart(productLightsaber);

        await cartPage.navigateToTheCartPage();
        const item = await cartPage.getCartItem(productLightsaber.name)
        await expect(item.container).toContainText(productLightsaber.name);
        await expect(item.quantityDisplay).toBeVisible();
        await expect(item.subtotalDisplay).toBeVisible();
        await cartPage.assertCartTotalPriceIs(productLightsaber.price)

    })

    test('Scenario: Proceed to the Payment step', async ({ page }) => {
        await catalogPage.navigateToTheCatalogPage();
        await catalogPage.addItemToCart(productLightsaber);

        await cartPage.navigateToTheCartPage();
        await cartPage.userNavigatesToPayments(); 
        await paymentsPage.assertUserOnPaymentsPage(); 
    })

})