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
            await expect(page).toHaveURL(/playground\/dashboard/);
     });//end beforeEach..

      test('User can navigate to Products page', async ({ page }) => {
            await page.getByRole('button', { name: 'Go to Products' }).click();

            await expect(page).toHaveURL(/products/);
        });


});