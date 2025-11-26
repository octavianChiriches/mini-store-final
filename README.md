Here’s a ready-to-paste README.md for your mini-store-final project, plus step-by-step instructions on how to add/upload it to GitHub.

⸻

1️⃣ README.md (copy-paste this)

# Mini Store – Playwright Final Project 

This project is an end-to-end test suite for the **Playwright Mini Store Playground**, implemented using:

- **Playwright Test** (JavaScript)
- **Page Object Model (POM)**
- Clear, behaviour-driven scenarios for the core store flow

The goal is to demonstrate a clean, maintainable UI automation framework that covers the main store features:

> **Inventory → Catalog → Cart → Payment → Orders**

---

## Tech Stack

- Node.js
- Playwright Test (`@playwright/test`)
- JavaScript (ES modules)
- Page Object Model (POM)

---

## Project Structure

Key folders (relative to the repo root):

```text
tests/
├─ pages/          # Page Object classes
│  ├─ inventory.page.js
│  ├─ catalog.page.js
│  ├─ cart.page.js
│  ├─ payments.page.js
│  └─ orders.page.js
│
├─ specs/          # Test specs organised by feature
│  ├─ inventory.spec.js
│  ├─ catalog.spec.js
│  ├─ cart.spec.js
│  ├─ payments.spec.js
│  ├─ orders.spec.js
│  └─ legacy/
│      └─ purchase-flow.spec.js  # Old single-flow test kept for reference (commented out)
│
└─ data/           # Test data / fixtures
   ├─ inventory.data.js
   └─ catalog.data.js


⸻

What’s Covered

 Inventory (tests/specs/inventory.spec.js)

Using InventoryPage:
	•	Scenario 1 – Add a new product to inventory
	•	Creates a product with name, price and quantity
	•	Asserts the product row is visible with correct price and quantity
	•	Scenario 2 – Increase stock quantity by 1
	•	Increases quantity using the + button
	•	Asserts the quantity increased by 1 (from UI)
	•	Scenario 3 – Decrease stock quantity by 1
	•	Decreases quantity using the − button
	•	Asserts the quantity decreased by 1 (from UI)
	•	Scenario 4 – Quantity should never go below 0
	•	Tries to decrease below 0
	•	Asserts the displayed quantity never goes negative

⸻

 Catalog (tests/specs/catalog.spec.js)

Using CatalogPage:
	•	Scenario 1 – Add an item to the cart from the catalog
	•	Reads initial stock from the UI (getProductQuantityFromUI)
	•	Adds the item to the cart
	•	Asserts the quantity on the catalog card decreased by 1
	•	Scenario – Prevent adding out-of-stock items
	•	Uses getOOSProductFromUI() to find products where:
	•	Quantity is 0
	•	Button text is “Out of Stock”
	•	Button is disabled
	•	Asserts that the expected product (e.g. Invisible Pen) is out of stock

⸻

Cart (tests/specs/cart.spec.js)

Using CartPage:
	•	Scenario – Display cart items and totals
	•	Verifies that each cart row displays:
	•	Item name
	•	Quantity
	•	Subtotal
	•	Uses assertCartTotalPriceIs() to validate the total amount shown in the UI
	•	Scenario – Proceed to the Payment step
	•	Clicks “Go to Payments”
	•	Asserts the user is redirected to the Payment page

⸻

 Payments (tests/specs/payments.spec.js)

Using PaymentsPage:
	•	Scenario – Validate payment summary
	•	Asserts the Payment summary shows:
	•	Product name
	•	Quantity (e.g. 1 x)
	•	Subtotal amount
	•	Scenario – Complete a purchase
	•	Selects a payment method
	•	Confirms payment
	•	Asserts the user is redirected to Orders
	•	Scenario – Block payment without method
	•	Clicks “Confirm Payment” without choosing a method
	•	Asserts an error/alert is shown and payment is not completed

⸻

 Orders (tests/specs/orders.spec.js)

Using OrdersPage:
	•	Scenario – Display past orders
	•	Verifies that at least one order is visible in the Orders list
	•	Scenario – Display order details
	•	Opens the latest order
	•	Uses getLatestOrderDetails() and assertLatestOrderDetails() to check:
	•	Product name is shown
	•	Quantity info is visible (e.g. 1 x)
	•	Subtotal is visible and formatted as a price (e.g. €9999.99)

⸻

How to Install & Run the Tests

1. Install dependencies

From the project root:

npm install

Install Playwright browsers (if not already installed):

npx playwright install


⸻

2. Run the whole suite

npx playwright test

3. Run a specific feature file

# Inventory tests
npx playwright test tests/specs/inventory.spec.js

# Catalog tests
npx playwright test tests/specs/catalog.spec.js

# Cart tests
npx playwright test tests/specs/cart.spec.js

# Payments tests
npx playwright test tests/specs/payments.spec.js

# Orders tests
npx playwright test tests/specs/orders.spec.js


⸻

4. Run tests in headed mode (see the browser)

npx playwright test --headed


⸻

Notes
	•	The legacy/purchase-flow.spec.js file is kept as a reference of an older “all-in-one” flow.
The new specs show a POM-based, feature-oriented approach that is easier to maintain and demo.
	•	All important assertions try to use values from the UI (text from DOM) instead of trusting only the fixture objects.

---

