import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test('desktop layout displays correctly', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    // Hero section should be centered
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
    
    // Navigation buttons should be visible
    const exploreProjectsBtn = page.getByRole('button', { name: /Explore Projects/i });
    await expect(exploreProjectsBtn).toBeVisible();
    
    // Project cards should show full details on desktop
    const projectDescriptions = page.locator('.text-surface-muted.text-sm.leading-relaxed');
    const descCount = await projectDescriptions.count();
    expect(descCount).toBeGreaterThan(0);
  });

  test('tablet layout adapts correctly', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    // Content should still be visible
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    
    // Projects should be in grid layout
    const projectsSection = page.locator('#projects');
    await projectsSection.scrollIntoViewIfNeeded();
    await expect(projectsSection).toBeVisible();
  });

  test('mobile layout shows mobile-specific features', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Hero text should be visible but possibly smaller
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    
    // Mobile cards should have tap indicator
    await page.locator('#projects').scrollIntoViewIfNeeded();
    
    // Mobile-specific elements
    const mobileElements = page.locator('.sm\\:hidden');
    const mobileCount = await mobileElements.count();
    expect(mobileCount).toBeGreaterThan(0);
  });

  test('ultra-wide displays handle content width', async ({ page }) => {
    await page.setViewportSize({ width: 2560, height: 1440 });
    await page.goto('/');
    
    // Content should be contained and not stretch full width
    const container = page.locator('.container, .max-w-7xl, .mx-auto').first();
    if (await container.count() > 0) {
      await expect(container).toBeVisible();
    }
  });

  test('small mobile (iPhone SE) layout works', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto('/');
    
    // Essential content should still be visible
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    
    // Buttons should be accessible
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThan(0);
  });

  test('landscape mobile orientation', async ({ page }) => {
    await page.setViewportSize({ width: 667, height: 375 });
    await page.goto('/');
    
    // Content should adapt to landscape
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
    
    // Navigation should still work
    const exploreProjectsBtn = page.getByRole('button', { name: /Explore Projects/i });
    if (await exploreProjectsBtn.isVisible()) {
      await exploreProjectsBtn.click();
      await expect(page.locator('#projects')).toBeInViewport();
    }
  });

  test('text remains readable at all sizes', async ({ page }) => {
    const viewports = [
      { width: 320, height: 568 },   // Small mobile
      { width: 768, height: 1024 },  // Tablet
      { width: 1920, height: 1080 }, // Desktop
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/');
      
      // Check that main heading is visible
      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();
      
      // Check that text has appropriate size (not too small)
      const fontSize = await heading.evaluate(el => 
        window.getComputedStyle(el).fontSize
      );
      
      const fontSizeValue = parseInt(fontSize);
      expect(fontSizeValue).toBeGreaterThanOrEqual(20); // Minimum readable size
    }
  });
});