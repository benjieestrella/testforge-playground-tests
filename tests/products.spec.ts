import {test, expect} from '@playwright/test';

const product_page = 'https://testforge-academy.onrender.com/playground/products';

const Login_url = 'https://testforge-academy.onrender.com/playground/login';
const email = 'student@testforge.dev';
const pass = 'Password123';


test.describe('Product Page', () => { 

    
       test.beforeEach(async ({ page }) => {
              await page.goto(Login_url);

              await page.getByLabel('Email').fill(email);
              await page.getByLabel('Password').fill(pass);
              await page.getByRole('button', { name: 'Sign in' }).click();

              // Ensure login success
              await expect(page).toHaveURL(/dashboard/);

              // 
              await page.getByRole('button', { name: 'Go to Products' }).click();
              await expect(page).toHaveURL(/products/);
        });

        //back to dashboard
       test('Back to Dashboard works', async ({ page }) => {
              await page.getByRole('button', { name: 'Back to Dashboard' }).click();
              await expect(page).toHaveURL(/dashboard/);
       });

       //search
       test('Search filters product list', async ({ page }) => {
              await page.getByPlaceholder('Search by name or SKU').fill('Mouse');

              await expect(page.getByText('Wireless Mouse')).toBeVisible();
              await expect(page.getByText('Mechanical Keyboard')).not.toBeVisible();
       });

       //navigate
       test('Navigate to Create Product page', async ({ page }) => {
              await page.getByRole('button', { name: 'Create Product' }).click();
              await expect(page).toHaveURL(/products\/new/);
       });

       //delete in modal 
       test('Cancel delete closes modal', async ({ page }) => {
              const row = page.getByRole('row', { name: /Wireless Mouse/ });
              await row.getByRole('button', { name: 'Delete' }).click();
              await page.getByRole('button', { name: 'Cancel' }).click();
              await expect(page.getByText('Confirm delete')).not.toBeVisible();
       });

       test('User can create a new product', async ({ page }) => {

            await page.goto('https://testforge-academy.onrender.com/playground/products/new');

              // Fill form
              await page.getByLabel('Product Name').fill('Test Product');
              await page.getByLabel('SKU').fill('TP-999');
              await page.getByLabel('Category').selectOption('Accessories'); 
              await page.getByLabel('Price').fill('99.99');
              await page.getByLabel('Status').selectOption('Active');
              // Submit
              await page.getByRole('button', { name: 'Save Product' }).click();          
            
              await expect(page).toHaveURL(/products/);
            

              

       });
});