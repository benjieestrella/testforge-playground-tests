import {test, expect} from '@playwright/test';

const dashboard_page = 'https://testforge-academy.onrender.com/playground/dashboard';

const Login_url = 'https://testforge-academy.onrender.com/playground/login';
const email = 'student@testforge.dev';
const pass = 'Password123';


test.describe('Dashboard Page', () => {

   
    test.beforeEach(async ({ page }) => {
        await page.goto(Login_url);

        await page.getByLabel('Email').fill(email);
        await page.getByLabel('Password').fill(pass);
        await page.getByRole('button', { name: 'Sign in' }).click();

        // Ensure login success
        await expect(page).toHaveURL(/playground\/dashboard/);
     });//end beforeEach..

     //test 1
     test('Open Dashboard page', async ({ page }) => {
         await expect(page).toHaveURL(/playground\/dashboard/);
    });//end dashboard Page.. 


    //test 2
    test('Dashboard page UI Content', async ({ page }) => {

    await test.step('Login to application', async () => {
        await page.goto(Login_url);
        await page.getByLabel('Email').fill(email);
        await page.getByLabel('Password').fill(pass);
        await page.getByRole('button', { name: 'Sign in' }).click();
        await expect(page).toHaveURL(/dashboard/);
    });

    await test.step('Validate headings', async () => {
        await expect(page.getByRole('heading', {
         name: 'Welcome to the Practice Playground'
        })).toBeVisible();

        //check header
        await expect(page.getByRole('heading', { name: 'Login Flow' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Navigation Tests' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Future CRUD Flows' })).toBeVisible();
    });

    // await test.step('Validate paragraph content', async () => {
    //     await expect(page.getByText('login flow completed successfully')).toBeVisible();
    //     await expect(page.getByText('navigation behavior here')).toBeVisible();
    //     await expect(page.getByText('automation flows will be added next')).toBeVisible();
    // });

        await test.step('Validate Login Flow card', async () => {
            const loginCard = page.locator('div').filter({
            has: page.getByRole('heading', { name: 'Login Flow' })
        });

        await expect(loginCard.getByText('login flow completed successfully')).toBeVisible();
        });

        await test.step('Validate Navigation card', async () => {
            const navCard = page.locator('div').filter({
            has: page.getByRole('heading', { name: 'Navigation Tests' })
        });

        await expect(navCard.getByText('navigation behavior here')).toBeVisible();
        });

        await test.step('Validate Future CRUD card', async () => {
            const futureCard = page.locator('div').filter({
            has: page.getByRole('heading', { name: 'Future CRUD Flows' })
        });

        await expect(futureCard.getByText('automation flows will be added next')).toBeVisible();
        });

    }); //end   UI Content


    test('Dashboard Navigational buttons', async({page}) => {
       await expect(
            page.getByRole('button', { name: 'Go to Products' })
        ).toBeVisible();

    await expect(
        page.getByRole('button', { name: 'Logout from Playground' })
        ).toBeVisible();
    });// end  Navigational buttons


}); //end test.describe