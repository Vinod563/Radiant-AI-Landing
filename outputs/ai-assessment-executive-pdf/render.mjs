import { chromium } from 'playwright'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const dir = dirname(fileURLToPath(import.meta.url))
const src = 'file://' + join(dir, 'index.html')
const out = process.argv[2] || join(dir, 'Radiant-AI-Adoption-Assessment-Executive-Edition.pdf')

const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto(src, { waitUntil: 'networkidle' })
await page.pdf({
  path: out,
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: false,
  margin: { top: 0, bottom: 0, left: 0, right: 0 },
})
await browser.close()
console.log('PDF written:', out)
