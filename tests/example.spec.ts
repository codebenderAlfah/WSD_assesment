import { test, expect } from '@playwright/test';

test('test', async ({ page, baseURL }) => {
  await page.goto(baseURL);
});
