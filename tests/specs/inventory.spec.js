import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { PRODUCTS } from '../data/inventory.data';

test.describe('🗂️ Inventory tests', () => {

    let inventoryPage; 
    const productCatTranslator = PRODUCTS.productCatTranslator; 
    const productInvisibleDogGlasses = PRODUCTS.productInvisibleDogGlasses;


    test.beforeEach(async ({page}) => {
        inventoryPage = new InventoryPage(page);  
        await inventoryPage.navigateToTheInventoryPage();
        
    })

    test('Scenario1: Add a new product to inventory', async ({page}) => {
        await inventoryPage.createInventoryProduct(productCatTranslator)
        await inventoryPage.assertProductIsCreated(productCatTranslator)
        await inventoryPage.assertProductPrice(productCatTranslator);
        await inventoryPage.assertProductQantity(productCatTranslator);
    })

    test('Scenario2: Increase  stock quantity by 1', async ({page}) => {
       await inventoryPage.createInventoryProduct(productCatTranslator)
       await inventoryPage.increaseStock(productCatTranslator);
       await inventoryPage.assertProductQantityIncreasedByOne(productCatTranslator); 
    })

    test('Scenario3: Decrease stock quantity by 1', async ({page}) => {
       await inventoryPage.createInventoryProduct(productCatTranslator)
       await inventoryPage.decreaseStock(productCatTranslator);
       await inventoryPage.assertProductQantityDecreasedByOne(productCatTranslator); 
    })

    test('Scenario4: The quantity should never go bellow 0', async ({page}) => {
        await inventoryPage.createInventoryProduct(productInvisibleDogGlasses);
        await inventoryPage.decreaseStock(productInvisibleDogGlasses);
        await inventoryPage.decreaseStock(productInvisibleDogGlasses);
        await inventoryPage.assertProductQuantityNotBellowZero(productInvisibleDogGlasses); 

        
    })
})
