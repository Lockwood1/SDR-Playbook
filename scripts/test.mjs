import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:5173', { waitUntil: 'networkidle' })
await page.waitForTimeout(3000)

// 1. Flip card test
await page.evaluate(() => {
  const el = document.getElementById('objections')
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: 'instant' })
})
await page.waitForTimeout(700)
await page.locator('#objections .flip').first().click()
await page.waitForTimeout(900)
await page.screenshot({ path: 'shots/desktop-flip-test.png' })
const backVisible = await page.locator('#objections .flip-back p.text-sm').first().isVisible()
console.log('FLIP_BACK_VISIBLE:', backVisible)

// 2. Persona switch -> check proof text updates
await page.locator('#builder').scrollIntoViewIfNeeded()
await page.getByRole('radio', { name: 'CISO / AppSec' }).click()
await page.waitForTimeout(400)
const script = await page.locator('#builder .terminal-card').innerText()
console.log('CISO_PAIN:', script.includes('a flood of security alerts'))
console.log('CISO_PROOF:', script.includes('Devin Security Swarm'))

// 3. Voicemail tab
await page.getByRole('tab', { name: 'Voicemail' }).click()
await page.waitForTimeout(400)
const vm = await page.locator('#builder .terminal-card').innerText()
console.log('VOICEMAIL:', vm.includes('I\u2019ll send you a quick note') || vm.includes("I'll send you a quick note"))

// 4. Follow-up tab
await page.getByRole('tab', { name: 'Follow-up message' }).click()
await page.waitForTimeout(400)
const fu = await page.locator('#builder .terminal-card').innerText()
console.log('FOLLOWUP:', fu.includes('just tried you by phone'))

// 5. Clear name -> missing token
await page.locator('#cc-name').fill('')
await page.getByRole('tab', { name: 'Cold call' }).click()
await page.waitForTimeout(400)
const missing = await page.locator('#builder .terminal-card').innerText()
console.log('MISSING_TOKEN:', missing.includes('{name}'))

// 6. Copy button (headless fallback path)
await page.getByRole('button', { name: 'Copy' }).click()
await page.waitForTimeout(300)
console.log('COPIED_STATE:', await page.getByRole('button', { name: 'Copied' }).isVisible())

await page.screenshot({ path: 'shots/desktop-builder-ciso.png' })
await browser.close()
