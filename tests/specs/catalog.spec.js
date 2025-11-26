import { test, expect } from '@playwright/test';
import { CATALOG_PRODUCTS } from '../data/catalog.data';
import { CatalogPage } from '../pages/catalog.page';


test.describe('🏪 Catalog tests', () => {

    let catalogPage;
    const productLightsaber = CATALOG_PRODUCTS.productLightsaber; 
    const invisiblePen = CATALOG_PRODUCTS.productInvisiblePen; 

    test.beforeEach(async ({ page }) => {
        catalogPage = new CatalogPage(page);
        await catalogPage.navigateToTheCatalogPage();
    })

    test('Scenario1: Add an item to the cart from the catalog', async ({page}) => {
       const initialQuantity = await catalogPage.getProductQuantityFromUI(productLightsaber); 
       await catalogPage.addItemToCart(productLightsaber); 
       const expectedQuantity = initialQuantity - 1; 
       await catalogPage.assertProductQuantityIs(productLightsaber, expectedQuantity)

    })

    test('Scenario: Prevent adding out-of-stock items', async ({page}) => { 
        const oosProducts = await catalogPage.getOOSProductFromUI();
        await expect(oosProducts.length).toBeGreaterThan(0); 
        await expect(oosProducts).toContain(invisiblePen.name);
    })


})
