import { chromium } from 'playwright'

const url = process.env.URL || 'http://localhost:5173'
const out = 'shots'
const sections = ['top', 'why', 'philosophy', 'process', 'builder', 'objections', 'rapport', 'closing']

const browser = await chromium.launch()
const errors = []

async function shoot(width, height, tag) {
  const page = await browser.newPage({ viewport: { width, height } })
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`[${tag}] console: ${m.text()}`)
  })
  page.on('pageerror', (e) => errors.push(`[${tag}] pageerror: ${e.message}`))
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(4200)
  for (const id of sections) {
    await page.evaluate((id) => {
      const el = document.getElementById(id)
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'instant' })
    }, id)
    await page.waitForTimeout(900)
    await page.screenshot({ path: `${out}/${tag}-${id}.png` })
  }
  if (tag === 'desktop') {
    await page.evaluate(() => {
      const btn = document.querySelector('#objections .flip')
      btn?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    await page.waitForTimeout(800)
    await page.screenshot({ path: `${out}/${tag}-objections-flipped.png` })
  }
  if (tag === 'mobile') {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await page.waitForTimeout(400)
    await page.click('button[aria-label="Toggle navigation"]')
    await page.waitForTimeout(500)
    await page.screenshot({ path: `${out}/${tag}-nav.png` })
    await page.keyboard.press('Escape')
  }
  await page.screenshot({ path: `${out}/${tag}-full.png`, fullPage: true })
  await page.close()
}

await shoot(1440, 900, 'desktop')
await shoot(390, 844, 'mobile')
console.log('CONSOLE_ERRORS:', errors.length ? '\n' + errors.join('\n') : 'none')
await browser.close()
