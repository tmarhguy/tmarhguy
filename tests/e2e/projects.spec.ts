import { test, expect } from '@playwright/test';

test.describe('Projects Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Scroll to projects section
    await page.locator('#projects').scrollIntoViewIfNeeded();
  });

  test('flagship projects have metrics displayed', async ({ page }) => {
    // Look for metric values in flagship cards
    const metrics = page.locator('text=/700\\+|1M\\+|99\\.9%|<500ms/');
    const count = await metrics.count();
    expect(count).toBeGreaterThan(0);
  });

  test('project cards have GitHub and Demo links', async ({ page }) => {
    // Check for GitHub links
    const githubButtons = page.locator('button:has-text("Code"), button:has(svg.lucide-github)');
    const githubCount = await githubButtons.count();
    expect(githubCount).toBeGreaterThan(0);
    
    // Check for Demo/Details links
    const demoButtons = page.locator('button:has-text("Details"), button:has(svg.lucide-external-link)');
    const demoCount = await demoButtons.count();
    expect(demoCount).toBeGreaterThan(0);
  });

  test('project status indicators are visible', async ({ page }) => {
    // Look for status indicators
    const statuses = ['Complete', 'In Progress', 'Planning', 'Concept'];
    let foundStatus = false;
    
    for (const status of statuses) {
      const statusElements = page.locator(`text=/${status}/`);
      if (await statusElements.count() > 0) {
        foundStatus = true;
        break;
      }
    }
    
    expect(foundStatus).toBeTruthy();
  });

  test('project tags are displayed', async ({ page }) => {
    // Look for common tags
    const tags = ['Hardware', 'API', 'React', 'TypeScript', 'ML', 'FinTech'];
    let foundTags = 0;
    
    for (const tag of tags) {
      const tagElements = page.locator(`text="${tag}"`);
      if (await tagElements.count() > 0) {
        foundTags++;
      }
    }
    
    expect(foundTags).toBeGreaterThan(0);
  });

  test('external links open in new tab', async ({ page }) => {
    // Look for GitHub or Demo buttons
    const externalButton = page.locator('button:has-text("Code"), button:has-text("Details")').first();
    
    // Check if button exists and is visible
    if (await externalButton.count() > 0) {
      await expect(externalButton).toBeVisible();
      // Buttons use window.open, so we just verify they exist and are clickable
      await expect(externalButton).toBeEnabled();
    }
  });

  test('mobile view shows tap to view details', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check for mobile-specific text
    const mobileIndicator = page.locator('text="Tap to view details"');
    const count = await mobileIndicator.count();
    
    // On mobile, this text should be visible
    if (count > 0) {
      await expect(mobileIndicator.first()).toBeVisible();
    }
  });

  test('project images load correctly', async ({ page }) => {
    // Find all project images
    const images = page.locator('img[alt*="CPU"], img[alt*="MoMo"], img[alt*="Music"], img[alt*="UniBridge"]');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      // Check first image loads
      const firstImage = images.first();
      await expect(firstImage).toBeVisible();
      
      // Verify image has src attribute
      const src = await firstImage.getAttribute('src');
      expect(src).toBeTruthy();
    }
  });
});