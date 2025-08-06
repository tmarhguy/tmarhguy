# Testing Documentation (Optional)

> **Note**: Testing is completely optional for contributors. This documentation is provided for those who want to use the available testing infrastructure. You are not required to write or run tests for your contributions.

This directory contains all test files for the portfolio website. We have a comprehensive testing infrastructure available for those who wish to use it.

## 📋 Table of Contents

- [Testing Stack](#testing-stack)
- [Quick Start](#quick-start)
- [Test Types](#test-types)
- [Comprehensive Playwright Testing Guide](#comprehensive-playwright-testing-guide)
  - [Getting Started with Playwright](#getting-started-with-playwright)
  - [Core Concepts](#core-concepts)
  - [Writing Effective Tests](#writing-effective-tests)
  - [Advanced Playwright Features](#advanced-playwright-features)
  - [Testing Patterns](#testing-patterns)
  - [Debugging Tests](#debugging-tests)
  - [CI/CD Configuration](#cicd-configuration)
  - [Common Issues and Solutions](#common-issues-and-solutions)
  - [Performance Tips](#performance-tips)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Coverage Guidelines](#coverage-guidelines-optional)
- [Troubleshooting](#troubleshooting)

## 🛠 Testing Stack

- **Unit Testing**: [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react)
- **E2E Testing**: [Playwright](https://playwright.dev/)
- **Coverage**: Vitest Coverage (v8 provider)
- **Assertions**: Vitest + @testing-library/jest-dom

## 🚀 Quick Start

```bash
# Run all unit tests (headless)
npm run test

# Run E2E tests (headless browsers, auto-starts dev server)
npm run test:e2e

# Run tests in watch mode (for development)
npm run test:watch

# Check test coverage
npm run test:coverage
```

**Important**: 
- All tests run in headless mode by default for CI/CD compatibility
- E2E tests automatically start the dev server on port 3005 (no manual server start needed)

## 📝 Test Types

### Unit Tests (`/tests/unit/`, component directories)

Unit tests focus on individual components and functions in isolation.

**Location**: 
- Component tests: Next to components (e.g., `button.test.tsx`)
- Utility tests: Next to utilities (e.g., `utils.test.ts`)
- Setup: `/tests/setup.ts`

**What to test**:
- Component rendering
- Props handling
- Event handlers
- Utility functions
- Custom hooks
- State changes

### Integration Tests (`/tests/integration/`)

Integration tests verify that multiple components work together correctly.

**What to test**:
- Page components
- Data flow between components
- Context providers
- Form submissions
- Navigation flows

### E2E Tests (`/tests/e2e/`)

End-to-end tests simulate real user interactions in actual browsers using Playwright.

**Location**: `/tests/e2e/*.spec.ts`

**What to test**:
- Complete user journeys
- Cross-browser compatibility
- Responsive design
- Accessibility
- Performance (loading, interactions)

## 🎭 Comprehensive Playwright Testing Guide

### Getting Started with Playwright

Playwright is a powerful E2E testing framework that supports multiple browsers and provides reliable automation.

#### Initial Setup

1. **Install Playwright and browsers** (one-time setup):
```bash
# Install Playwright browsers (Chromium, Firefox, WebKit)
npm run test:e2e:install

# Or manually install specific browsers
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

2. **Verify installation**:
```bash
# Check if browsers are installed
npx playwright --version

# Run a simple test to verify setup
npm run test:e2e:check
```

#### Configuration Overview

The `playwright.config.ts` file controls test behavior:

```typescript
export default defineConfig({
  testDir: './tests/e2e',           // Test file location
  fullyParallel: true,              // Run tests in parallel
  retries: process.env.CI ? 2 : 0,  // Retry failed tests in CI
  reporter: 'html',                 // Generate HTML reports
  use: {
    baseURL: 'http://localhost:3005',  // Base URL for tests
    headless: true,                    // Run in headless mode
    screenshot: 'only-on-failure',     // Capture screenshots
    trace: 'on-first-retry',          // Record traces for debugging
  },
  webServer: {
    command: 'npm run dev',            // Auto-start dev server
    url: 'http://localhost:3005',
    reuseExistingServer: true,
  },
});
```

### Core Concepts

#### 1. Page Object
The `page` object represents a browser tab:
```typescript
test('example', async ({ page }) => {
  await page.goto('/');  // Navigate to URL
  await page.reload();    // Reload page
  await page.goBack();    // Go back in history
});
```

#### 2. Locators
Locators find elements on the page:
```typescript
// By role (recommended)
page.getByRole('button', { name: 'Submit' })
page.getByRole('link', { name: 'Home' })
page.getByRole('heading', { level: 1 })

// By text
page.getByText('Welcome')
page.getByLabel('Email')
page.getByPlaceholder('Enter your name')

// By test ID (most reliable)
page.getByTestId('submit-button')

// CSS/XPath selectors
page.locator('.className')
page.locator('//xpath/expression')
```

#### 3. Assertions
Playwright provides auto-waiting assertions:
```typescript
// Visibility assertions
await expect(page.locator('.header')).toBeVisible();
await expect(page.locator('.modal')).toBeHidden();

// Text assertions
await expect(page.locator('h1')).toHaveText('Welcome');
await expect(page.locator('.status')).toContainText('Success');

// Attribute assertions
await expect(page.locator('input')).toHaveValue('test@example.com');
await expect(page.locator('button')).toBeEnabled();
await expect(page.locator('input')).toBeChecked();

// Count assertions
await expect(page.locator('.item')).toHaveCount(5);

// URL assertions
await expect(page).toHaveURL(/.*dashboard/);
await expect(page).toHaveTitle('My App');
```

### Writing Effective Tests

#### Test Structure Pattern
```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  // Runs before each test in this describe block
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Common setup like login
  });

  // Runs after each test
  test.afterEach(async ({ page }) => {
    // Cleanup if needed
  });

  test('should do something specific', async ({ page }) => {
    // Arrange - Set up test data/state
    const testData = { email: 'test@example.com' };
    
    // Act - Perform actions
    await page.fill('input[name="email"]', testData.email);
    await page.click('button[type="submit"]');
    
    // Assert - Verify results
    await expect(page.locator('.success')).toBeVisible();
  });

  test.skip('skipped test', async ({ page }) => {
    // This test will be skipped
  });

  test.only('focused test', async ({ page }) => {
    // Only this test will run (useful for debugging)
  });
});
```

#### Waiting Strategies
```typescript
// Wait for element to be visible
await page.waitForSelector('.loaded', { state: 'visible' });

// Wait for network idle
await page.waitForLoadState('networkidle');

// Wait for specific response
await page.waitForResponse(response => 
  response.url().includes('/api/data') && response.status() === 200
);

// Wait for function to return true
await page.waitForFunction(() => document.readyState === 'complete');

// Custom timeout
await page.waitForSelector('.slow-element', { timeout: 30000 });

// Wait for navigation
await Promise.all([
  page.waitForNavigation(),
  page.click('a[href="/next-page"]'),
]);
```

### Advanced Playwright Features

#### Network Interception
```typescript
test('mock API response', async ({ page }) => {
  // Intercept and mock API calls
  await page.route('**/api/users', route => {
    route.fulfill({
      status: 200,
      body: JSON.stringify([{ id: 1, name: 'Test User' }]),
    });
  });

  await page.goto('/users');
  await expect(page.locator('.user')).toContainText('Test User');
});

test('block resources', async ({ page }) => {
  // Block images to speed up tests
  await page.route('**/*.{png,jpg,jpeg}', route => route.abort());
  
  await page.goto('/');
});
```

#### Multiple Browser Contexts
```typescript
test('test with multiple users', async ({ browser }) => {
  // Create two isolated browser contexts
  const userContext = await browser.newContext();
  const adminContext = await browser.newContext();
  
  const userPage = await userContext.newPage();
  const adminPage = await adminContext.newPage();
  
  // Test user sees limited features
  await userPage.goto('/dashboard');
  await expect(userPage.locator('.admin-panel')).toBeHidden();
  
  // Test admin sees all features
  await adminPage.goto('/dashboard');
  await expect(adminPage.locator('.admin-panel')).toBeVisible();
  
  await userContext.close();
  await adminContext.close();
});
```

#### File Upload/Download
```typescript
test('file upload', async ({ page }) => {
  // Upload single file
  await page.setInputFiles('input[type="file"]', 'path/to/file.pdf');
  
  // Upload multiple files
  await page.setInputFiles('input[type="file"]', [
    'file1.pdf',
    'file2.pdf'
  ]);
  
  // Clear selected files
  await page.setInputFiles('input[type="file"]', []);
});

test('file download', async ({ page }) => {
  // Wait for download to start
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('button#download'),
  ]);
  
  // Save to specific path
  await download.saveAs('/path/to/save/file.pdf');
  
  // Get download info
  console.log(await download.path());
  console.log(download.suggestedFilename());
});
```

#### Visual Testing
```typescript
test('visual regression', async ({ page }) => {
  await page.goto('/');
  
  // Take full page screenshot
  await expect(page).toHaveScreenshot('homepage.png', {
    fullPage: true,
    animations: 'disabled',
  });
  
  // Screenshot specific element
  await expect(page.locator('.header')).toHaveScreenshot('header.png');
  
  // With custom threshold
  await expect(page).toHaveScreenshot('page.png', {
    maxDiffPixels: 100,
    threshold: 0.2, // 20% difference allowed
  });
});
```

#### Accessibility Testing
```typescript
test('accessibility', async ({ page }) => {
  await page.goto('/');
  
  // Check for accessibility violations using axe-core
  const accessibilityScanResults = await page.evaluate(() => {
    // Requires @axe-core/playwright
    return window.axe.run();
  });
  
  expect(accessibilityScanResults.violations).toEqual([]);
  
  // Test keyboard navigation
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toHaveAttribute('role', 'button');
  
  // Test screen reader labels
  await expect(page.getByRole('button')).toHaveAttribute('aria-label');
});
```

### Testing Patterns

#### Page Object Model
```typescript
// pages/HomePage.ts
export class HomePage {
  constructor(private page: Page) {}
  
  // Locators
  get heroTitle() {
    return this.page.locator('h1').first();
  }
  
  get projectsButton() {
    return this.page.getByRole('button', { name: /projects/i });
  }
  
  // Actions
  async navigateToProjects() {
    await this.projectsButton.click();
    await this.page.waitForURL('**/projects');
  }
  
  // Assertions
  async expectHeroVisible() {
    await expect(this.heroTitle).toBeVisible();
  }
}

// tests/home.spec.ts
import { HomePage } from '../pages/HomePage';

test('navigate to projects', async ({ page }) => {
  const homePage = new HomePage(page);
  await page.goto('/');
  
  await homePage.expectHeroVisible();
  await homePage.navigateToProjects();
  
  await expect(page).toHaveURL(/projects/);
});
```

#### Testing Forms
```typescript
test('form validation', async ({ page }) => {
  await page.goto('/contact');
  
  // Test empty form submission
  await page.click('button[type="submit"]');
  await expect(page.locator('.error')).toContainText('Required');
  
  // Test invalid email
  await page.fill('input[name="email"]', 'invalid-email');
  await page.click('button[type="submit"]');
  await expect(page.locator('.email-error')).toContainText('Invalid email');
  
  // Test successful submission
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('textarea[name="message"]', 'Test message');
  
  const [response] = await Promise.all([
    page.waitForResponse(res => res.url().includes('/api/contact')),
    page.click('button[type="submit"]'),
  ]);
  
  expect(response.status()).toBe(200);
  await expect(page.locator('.success')).toBeVisible();
});
```

#### Testing Dynamic Content
```typescript
test('infinite scroll', async ({ page }) => {
  await page.goto('/posts');
  
  // Initial items
  await expect(page.locator('.post')).toHaveCount(10);
  
  // Scroll to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  
  // Wait for more items to load
  await page.waitForSelector('.post:nth-child(20)');
  await expect(page.locator('.post')).toHaveCount(20);
});

test('real-time updates', async ({ page }) => {
  await page.goto('/chat');
  
  // Send message
  await page.fill('input.message', 'Hello');
  await page.keyboard.press('Enter');
  
  // Wait for message to appear
  await expect(page.locator('.message').last()).toContainText('Hello');
  
  // Wait for response (WebSocket or polling)
  await page.waitForSelector('.message:has-text("Response")', {
    timeout: 10000
  });
});
```

### Debugging Tests

#### Using Playwright Inspector
```bash
# Run tests in debug mode
npx playwright test --debug

# Debug specific test
npx playwright test navigation.spec.ts --debug

# Use page.pause() in tests
test('debug me', async ({ page }) => {
  await page.goto('/');
  await page.pause(); // Opens inspector here
  await page.click('button');
});
```

#### Headed Mode with Slow Motion
```bash
# Run with visible browser
npx playwright test --headed

# Slow down actions (milliseconds)
npx playwright test --headed --slow-mo=1000

# Keep browser open after test
npx playwright test --headed --no-exit
```

#### Trace Viewer
```bash
# Record trace for failed tests
npx playwright test --trace on

# View trace
npx playwright show-trace trace.zip

# In test code
test.use({ trace: 'on' }); // Always record
test.use({ trace: 'retain-on-failure' }); // Only on failure
```

#### VS Code Integration
```json
// .vscode/launch.json
{
  "configurations": [
    {
      "name": "Debug Playwright Tests",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/playwright",
      "args": ["test", "${file}", "--debug"],
      "console": "integratedTerminal"
    }
  ]
}
```

### CI/CD Configuration

#### GitHub Actions
```yaml
# .github/workflows/playwright.yml
name: Playwright Tests
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          
      - name: Install dependencies
        run: npm ci
        
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
        
      - name: Run Playwright tests
        run: npm run test:e2e
        
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

#### Docker Setup
```dockerfile
# Dockerfile.playwright
FROM mcr.microsoft.com/playwright:v1.40.0-focal

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

CMD ["npm", "run", "test:e2e"]
```

### Common Issues and Solutions

#### Element Not Found
```typescript
// Problem: Element not immediately available
// ❌ Bad
await page.click('.dynamic-button'); // Might fail

// ✅ Good - Wait for element
await page.waitForSelector('.dynamic-button');
await page.click('.dynamic-button');

// ✅ Better - Locator auto-waits
await page.locator('.dynamic-button').click();
```

#### Flaky Tests
```typescript
// Problem: Race conditions
// ❌ Bad
await page.click('button');
await expect(page.locator('.result')).toBeVisible(); // Might be too fast

// ✅ Good - Wait for specific conditions
await page.click('button');
await page.waitForResponse('**/api/action');
await expect(page.locator('.result')).toBeVisible();

// ✅ Use explicit waits
await page.waitForLoadState('networkidle');
await page.waitForTimeout(100); // Last resort
```

#### Multiple Elements
```typescript
// Problem: Multiple elements match selector
// ❌ Bad
await page.click('button'); // Error if multiple buttons

// ✅ Good - Be specific
await page.click('button:has-text("Submit")');
await page.click('button').first();
await page.click('button').nth(2);
```

#### Viewport Issues
```typescript
// Problem: Elements hidden on mobile
test('mobile test', async ({ page }) => {
  // Set viewport before navigation
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  
  // Or use device emulation
  const iPhone = devices['iPhone 12'];
  const context = await browser.newContext({
    ...iPhone,
  });
});
```

### Performance Tips

1. **Run tests in parallel**:
```typescript
// playwright.config.ts
export default defineConfig({
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
});
```

2. **Reuse authentication state**:
```typescript
// Save auth state once
const context = await browser.newContext();
await context.storageState({ path: 'auth.json' });

// Reuse in tests
test.use({ storageState: 'auth.json' });
```

3. **Skip resource loading**:
```typescript
test.use({
  // Block unnecessary resources
  launchOptions: {
    args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process']
  }
});
```

4. **Use test.step for clarity**:
```typescript
test('complex flow', async ({ page }) => {
  await test.step('Login', async () => {
    // Login steps
  });
  
  await test.step('Navigate to dashboard', async () => {
    // Navigation steps
  });
});
```

## 🎯 Running Tests

### Unit Test Commands

```bash
# Run all unit tests once
npm run test

# Run tests in watch mode (auto-rerun on changes)
npm run test:watch

# Run tests with UI interface
npm run test:ui

# Generate coverage report
npm run test:coverage

# Run specific test file
npm run test -- button.test.tsx

# Run tests matching pattern
npm run test -- --grep "Button"
```

### E2E Test Commands

```bash
# First-time setup: Install browsers
npm run test:e2e:install

# Check if E2E environment is ready
npm run test:e2e:check

# Run all E2E tests (headless)
npm run test:e2e

# Run E2E tests with UI (for debugging)
npm run test:e2e:ui

# Run specific browser only
npm run test:e2e -- --project=chromium
npm run test:e2e -- --project=firefox
npm run test:e2e -- --project=webkit

# Run specific test file
npm run test:e2e -- navigation.spec.ts

# Debug mode (headed browser, slow motion)
npm run test:e2e -- --debug
```

### Coverage Reports

```bash
# Generate and view coverage
npm run test:coverage

# Coverage will be available in:
# - Terminal output
# - HTML report: coverage/index.html
```

## ✍️ Writing Tests

### Unit Test Example

```typescript
// components/ui/MyComponent.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders with correct text', () => {
    render(<MyComponent text="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<MyComponent onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const { container } = render(
      <MyComponent className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
```

### E2E Test Example

```typescript
// tests/e2e/feature.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('user can complete action', async ({ page }) => {
    // Navigate to feature
    await page.click('text=Feature Link');
    
    // Interact with page
    await page.fill('input[name="email"]', 'test@example.com');
    await page.click('button[type="submit"]');
    
    // Assert results
    await expect(page.locator('.success-message')).toBeVisible();
    await expect(page).toHaveURL(/success/);
  });

  test('handles errors gracefully', async ({ page }) => {
    // Trigger error condition
    await page.fill('input[name="email"]', 'invalid-email');
    await page.click('button[type="submit"]');
    
    // Verify error handling
    await expect(page.locator('.error-message')).toContainText('Invalid email');
  });
});
```

### Testing Best Practices

1. **Descriptive Test Names**
   ```typescript
   // ❌ Bad
   it('works', () => {});
   
   // ✅ Good
   it('displays error message when email is invalid', () => {});
   ```

2. **Arrange-Act-Assert Pattern**
   ```typescript
   it('updates count when button is clicked', () => {
     // Arrange
     const { getByRole, getByText } = render(<Counter />);
     
     // Act
     fireEvent.click(getByRole('button'));
     
     // Assert
     expect(getByText('Count: 1')).toBeInTheDocument();
   });
   ```

3. **Test User Behavior, Not Implementation**
   ```typescript
   // ❌ Bad - Testing implementation
   expect(component.state.isOpen).toBe(true);
   
   // ✅ Good - Testing behavior
   expect(screen.getByRole('dialog')).toBeVisible();
   ```

4. **Use Testing Library Queries Correctly**
   ```typescript
   // Priority order (prefer user-visible queries):
   // 1. getByRole
   // 2. getByLabelText
   // 3. getByPlaceholderText
   // 4. getByText
   // 5. getByTestId (last resort)
   ```

5. **Mock External Dependencies**
   ```typescript
   vi.mock('next/navigation', () => ({
     useRouter: () => ({
       push: vi.fn(),
       replace: vi.fn(),
     }),
   }));
   ```

## 📊 Coverage Guidelines (Optional)

If you choose to write tests, here are some suggested coverage targets:

- **Overall**: 70% is a good target
- **Components**: 80% for UI components
- **Utilities**: 90% for utility functions
- **Critical paths**: Aim for comprehensive coverage

Remember: These are suggestions, not requirements!

### Checking Coverage

```bash
# Generate coverage report
npm run test:coverage

# View HTML report
open coverage/index.html
```

### Coverage Configuration

Coverage settings are in `vitest.config.ts`:
- Excludes: node_modules, test files, config files, stories
- Reporters: text (terminal), json, html

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. Tests Failing with "Module not found"

**Problem**: Import aliases not resolving
```
Error: Cannot find module '@/components/Button'
```

**Solution**: Check `vitest.config.ts` has correct alias configuration:
```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './'),
  },
}
```

#### 2. React Testing Library Errors

**Problem**: "not wrapped in act(...)"
```
Warning: An update to Component inside a test was not wrapped in act(...)
```

**Solution**: Use `waitFor` or `findBy` queries:
```typescript
// Instead of getBy for async updates
const element = await screen.findByText('Loaded');
```

#### 3. E2E Tests Timeout

**Problem**: Tests timeout on slow machines
```
Error: Test timeout of 30000ms exceeded
```

**Solution**: Increase timeout in test or config:
```typescript
test('slow test', async ({ page }) => {
  test.setTimeout(60000); // 60 seconds
  // ... test code
});
```

#### 4. Playwright Browsers Not Found

**Problem**: "Executable doesn't exist"
```
Error: browserType.launch: Executable doesn't exist
```

**Solution**: Install browsers:
```bash
npm run test:e2e:install
```

#### 5. Headless Mode Issues

**Problem**: Tests pass locally but fail in CI

**Solution**: Always develop with headless mode:
```bash
# This uses headless by default
npm run test:e2e

# For debugging, use UI mode
npm run test:e2e:ui
```

#### 6. Coverage Not Generated

**Problem**: No coverage folder created

**Solution**: Install coverage dependencies:
```bash
npm install -D @vitest/coverage-v8
```

### Environment Variables for Testing

Create `.env.test` for test-specific environment variables:
```env
# Test environment variables
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Debugging Tests

#### Debug Unit Tests
```bash
# Run specific test with verbose output
npm run test -- --reporter=verbose button.test.tsx

# Use UI mode for interactive debugging
npm run test:ui
```

#### Debug E2E Tests
```bash
# Run with UI for step-by-step debugging
npm run test:e2e:ui

# Run in headed mode with slowMo
npx playwright test --headed --slow-mo=1000

# Save trace for debugging
npx playwright test --trace on
```

### CI/CD Configuration

Tests run automatically in GitHub Actions. The configuration:
- Runs on every push and pull request
- Tests multiple Node versions (18.x, 20.x)
- Runs all browsers in headless mode
- Generates coverage reports
- Fails if coverage drops below threshold

## 📚 Additional Resources

### Playwright Resources
- [Official Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright YouTube Channel](https://www.youtube.com/c/Playwrightdev)
- [Playwright Discord Community](https://aka.ms/playwright-discord)
- [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

### Testing Resources
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Best Practices](https://testingjavascript.com/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)

### Learning Playwright

#### Interactive Tutorials
1. **Playwright Test Generator**: Use `npx playwright codegen` to record your actions and generate test code
2. **Playwright Inspector**: Debug tests interactively with `npx playwright test --debug`
3. **Trace Viewer**: Analyze test failures with detailed execution traces

#### Example Projects
- [Demo.playwright.dev](https://demo.playwright.dev/) - Official demo site for testing
- [Playwright Examples](https://github.com/microsoft/playwright/tree/main/examples) - Official examples repository
- [Real World App](https://github.com/cypress-io/cypress-realworld-app) - Full application with tests

#### Common Testing Scenarios in This Project
Based on the current codebase, here are specific examples you can reference:

1. **Navigation Testing** (`tests/e2e/navigation.spec.ts`):
   - Testing hero sections with animations
   - Verifying smooth scroll navigation
   - Testing theme toggle functionality
   - Checking responsive navigation

2. **Project Cards Testing** (`tests/e2e/projects.spec.ts`):
   - Testing dynamic content loading
   - Verifying card interactions
   - Testing filtering and sorting
   - Checking external links

3. **Responsive Design Testing** (`tests/e2e/responsive.spec.ts`):
   - Testing different viewports
   - Verifying mobile-specific features
   - Testing touch interactions
   - Checking layout adaptations

## 🤝 Contributing

Testing is optional, but if you choose to write tests:

1. Follow the established patterns in existing tests
2. Ensure any tests you write pass before submitting
3. Update this documentation if you add new testing patterns
4. Feel free to ask for help with testing if needed
5. Remember: No PR will be rejected for lack of tests

For questions or issues, please check the [CONTRIBUTING.md](../CONTRIBUTING.md) guide or open an issue.