import { defineConfig } from '@playwright/test';

export default defineConfig({
 testDir: './tests', // this is where we write our tests

 reporter: [
   ['list'],
   ['html', { open: 'never' }],
 ],

 use: {
   headless: false,
   trace: 'retain-on-failure',
   screenshot: 'only-on-failure',
   video: 'retain-on-failure',
 },
});