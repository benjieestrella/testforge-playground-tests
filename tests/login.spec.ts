import {test, expect} from '@playwright/test';

const Login_url = 'https://testforge-academy.onrender.com/playground/login';
const email = 'student@testforge.dev';
const pass = 'Password123';

test.describe('Login Page', () => { 
    test('Open login page', async({page}) => {
 
        await page.goto(Login_url);
        await expect(page).toHaveURL(/playground\/login/);
    });


    test('login page contains email and password fields', async({page}) => {
    
        await page.goto(Login_url);
        await expect(page.getByLabel('Email')).toBeVisible();
        await expect(page.getByLabel('Password')).toBeVisible();
    });


    test('user can login successfully', async({page}) => {
        await page.goto(Login_url);
        await expect(page).toHaveURL(/playground\/login/);
        // fil input email and pw
        await page.getByLabel('Email').fill(email);
        await expect(page.getByLabel('Email')).toHaveValue(email);
        await page.getByLabel('Password').fill(pass);
        //click sign in button 
        //await page.locator('button[name="login"]').click();
        await page.getByRole('button', {name: 'Sign in'}).click();

        await expect(page).not.toHaveURL(/playground\/login/);
        await expect(page).toHaveURL(/playground\/dashboard/);
    console.log('Login with valid credentials test passed')
    });

    

});

