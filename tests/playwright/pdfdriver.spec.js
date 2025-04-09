const { test } = require('@playwright/test')

test.describe('PDFDriver Component', () => {
  test.beforeEach(async ({ page }) => {
    // The dev webpack config renders the PDF Driver by default
    await page.goto('http://localhost:8081')
  })

  test('renders the default PDF page', async ({ page }) => {
    // Wait for the PDFDriver component and the first canvas element

    // Since PDF Driver is the default driver for the dev webpack,
    // wait for the viewer container and canvas to appear.
    // If the PDF driver is failing, the canvas element will not load.
    // On failing, "LOADING" will appear
    await page.waitForSelector('.pdf-viewer-container')
    await page.waitForSelector('.pdf-canvas canvas', { timeout: 15000 })
  })
})
