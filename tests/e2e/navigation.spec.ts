import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Tyrone Marhguy/);
  });

  test('hero section loads with name', async ({ page }) => {
    // Use first() to get the main heading (not glitch layers)
    const heading = page.locator('h1').filter({ hasText: "I'm Tyrone Marhguy" }).first();
    await expect(heading).toBeVisible();
  });

  test('displays animated tagline', async ({ page }) => {
    // Wait for the typing animation to start
    await page.waitForTimeout(1000);
    
    // Check that a tagline container with terminal prompt is visible
    const taglineContainer = page.locator('.font-mono').filter({ hasText: '>' }).first();
    await expect(taglineContainer).toBeVisible();
    
    // Verify animation cursor is visible
    const cursor = page.locator('.animate-pulse').filter({ hasText: '█' }).first();
    await expect(cursor).toBeVisible();
  });

  test('social links are present and functional', async ({ page }) => {
    // Check GitHub button
    const githubButton = page.getByRole('button').filter({ hasText: /Git(Hub)?/i }).first();
    await expect(githubButton).toBeVisible();
    
    // Check LinkedIn button  
    const linkedinButton = page.getByRole('button').filter({ hasText: /(LinkedIn|In)/i }).first();
    await expect(linkedinButton).toBeVisible();
    
    // Check Email button
    const emailButton = page.getByRole('button').filter({ hasText: /(Email|@)/i }).first();
    await expect(emailButton).toBeVisible();
  });

  test('Explore Projects button scrolls to projects section', async ({ page }) => {
    // Click the Explore Projects button
    await page.getByRole('button', { name: /Explore Projects/i }).click();
    
    // Check that we've scrolled to projects section
    await expect(page.locator('#projects')).toBeInViewport();
  });

  test('project cards are displayed', async ({ page }) => {
    // Scroll to projects section
    await page.locator('#projects').scrollIntoViewIfNeeded();
    
    // Check flagship projects heading is visible
    const flagshipTitle = page.locator('h2').filter({ hasText: 'Flagship Projects' }).first();
    await expect(flagshipTitle).toBeVisible();
    
    // Check that project cards exist
    const projectCards = page.locator('[class*="rounded"]').first();
    await expect(projectCards).toBeVisible();
  });

  test('theme toggle works', async ({ page }) => {
    // Get initial theme
    const htmlElement = page.locator('html');
    const initialTheme = await htmlElement.getAttribute('class');
    
    // Click theme toggle
    const themeToggle = page.getByRole('button', { name: /toggle theme/i });
    await themeToggle.click();
    
    // Wait for theme change
    await page.waitForTimeout(500);
    
    // Check that theme has changed
    const newTheme = await htmlElement.getAttribute('class');
    expect(newTheme).not.toBe(initialTheme);
  });

  test('skills section displays categories', async ({ page }) => {
    // Scroll to skills section if it exists
    const skillsSection = page.locator('text=/Programming Languages|Frameworks/i');
    if (await skillsSection.count() > 0) {
      await skillsSection.first().scrollIntoViewIfNeeded();
      await expect(skillsSection.first()).toBeVisible();
    }
  });
});