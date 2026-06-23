import { test, expect } from '@playwright/test';

test.describe('SIPETA E2E Tests', () => {
  test('Take screenshots of main pages', async ({ page }) => {
    // 1. Beranda
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Belajar Membina');
    await page.waitForTimeout(1000); // Wait for animations
    await page.screenshot({ path: './screenshots/1-Beranda.png', fullPage: true });

    // 2. Materi
    await page.goto('/materi');
    await expect(page.locator('h1')).toContainText('Materi Pembinaan');
    await page.waitForTimeout(500);
    await page.screenshot({ path: './screenshots/2-Materi-List.png', fullPage: true });

    // 3. Materi Detail
    await page.goto('/materi/pembinaan-positif');
    await expect(page.locator('h1')).toContainText('Pembinaan Positif');
    await page.waitForTimeout(500);
    await page.screenshot({ path: './screenshots/3-Materi-Detail.png', fullPage: true });

    // 4. Studi Kasus
    await page.goto('/studi-kasus');
    await expect(page.locator('h1')).toContainText('Studi Kasus Interaktif');
    await page.waitForTimeout(500);
    await page.screenshot({ path: './screenshots/4-Studi-Kasus.png', fullPage: true });

    // 5. Kuis
    await page.goto('/kuis');
    await expect(page.locator('h1')).toContainText('Kuis Pemahaman');
    await page.waitForTimeout(500);
    await page.screenshot({ path: './screenshots/5-Kuis.png', fullPage: true });

    // 6. Forum
    await page.goto('/forum');
    await expect(page.locator('h1')).toContainText('Forum Tanya-Jawab');
    await page.waitForTimeout(500);
    await page.screenshot({ path: './screenshots/6-Forum.png', fullPage: true });
  });

  test('Kuis Flow: Answer questions and see score', async ({ page }) => {
    await page.goto('/kuis');
    
    // Answer all 10 questions
    for (let i = 0; i < 10; i++) {
      // Click first option using more robust locator
      await page.locator('.space-y-3 button').first().click();
      
      // Click submit using exact: true to avoid matching answer options like "Tanggung jawab"
      await page.getByRole('button', { name: 'Kirim Jawaban', exact: true }).click();
      
      // Wait for feedback state / next button
      const nextBtn = page.getByRole('button', { name: /Soal Berikutnya|Lihat Hasil/ });
      await expect(nextBtn).toBeVisible({ timeout: 10000 });
      
      // Click next
      await nextBtn.click();
    }

    // Verify Result page
    await expect(page.locator('h1')).toContainText('Hasil Kuis');
    await expect(page.locator('text=%')).toBeVisible();
    
    // Take a screenshot of the results page
    await page.screenshot({ path: './screenshots/7-Kuis-Result.png', fullPage: true });
  });

  test('Forum Flow: Create thread and reply', async ({ page }) => {
    await page.goto('/forum');

    // Create a unique title so strict mode is not violated by previous runs
    const uniqueTitle = `Test Thread Playwright ${Date.now()}`;

    // Open modal
    await page.locator('button', { hasText: 'Buat Pertanyaan Baru' }).dispatchEvent('click');

    // Fill form
    await page.locator('input[placeholder="Taruna ..."]').fill('Taruna E2E');
    await page.locator('select').selectOption('Umum');
    await page.locator('input[placeholder="Tuliskan judul pertanyaan Anda..."]').fill(uniqueTitle);
    await page.locator('textarea').fill('Ini adalah pertanyaan e2e test');

    // Submit
    await page.getByRole('button', { name: 'Kirim Pertanyaan' }).dispatchEvent('click');

    // Wait for the modal to disappear
    await expect(page.locator('text=Kirim Pertanyaan')).not.toBeVisible({ timeout: 10000 });

    // Verify thread appears
    const threadLink = page.locator('a', { hasText: uniqueTitle });
    await expect(threadLink).toBeVisible({ timeout: 15000 });

    // Open thread
    const href = await threadLink.getAttribute('href');
    if (href) {
      await page.goto(href);
    }

    // Verify thread content
    await expect(page.locator('h1')).toContainText(uniqueTitle, { timeout: 15000 });
    
    // Reply
    await page.locator('input[placeholder="Taruna ..."]').fill('Taruna Responder');
    await page.locator('textarea[placeholder="Tulis balasan Anda..."]').fill('Ini adalah balasan e2e test');
    await page.getByRole('button', { name: 'Kirim Balasan' }).dispatchEvent('click');

    // Verify reply appears
    await expect(page.locator('text=Ini adalah balasan e2e test')).toBeVisible({ timeout: 15000 });
  });
});
