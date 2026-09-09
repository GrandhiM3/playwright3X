import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://courses.thetestingacademy.com/');
  await page.getByRole('link', { name: 'HOME', exact: true }).click();
  await page.getByRole('link', { name: 'SUPPORT', exact: true }).click();
  await page.getByRole('textbox', { name: 'Your Name *' }).click();
  await page.getByRole('textbox', { name: 'Your Name *' }).fill('test');
  await page.getByRole('textbox', { name: 'Your Name *' }).press('Tab');
  await page.getByRole('textbox', { name: 'Your Email *' }).fill('test@gmail.com');
  await page.getByRole('textbox', { name: 'Your Email *' }).press('Tab');
  await page.getByRole('textbox', { name: 'Add Comment...' }).fill('testing');
});