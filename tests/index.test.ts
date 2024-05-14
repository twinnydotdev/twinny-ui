import { expect, test } from '@playwright/test'

test('index page has expected text', async ({ page }) => {
  await page.goto('/')
  expect(await page.textContent('h1')).toBe('twinny')
  expect(await page.textContent('h2')).toBe(
    'The free and private AI extension for Visual Studio Code.'
  )
})
