# Contributing Guide

Welcome! We're excited you're interested in contributing to this project. This guide will help you get started with development, testing, and submitting changes.

## Table of Contents

- [Development Setup](#development-setup)
- [Testing Requirements](#testing-requirements)
- [Code Style Guidelines](#code-style-guidelines)
- [Component Development](#component-development)
- [Pull Request Process](#pull-request-process)
- [Troubleshooting](#troubleshooting)

## Development Setup

### Prerequisites

- **Node.js**: Version 16.0 or higher
- **npm**: Version 7.0 or higher
- **Git**: For version control
- **VS Code** (recommended): With ESLint and Prettier extensions

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/tmarhguy/tmarhguy.git
   cd tmarhguy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up pre-commit hooks** (after Husky is configured)
   ```bash
   npm run prepare
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:3005`

### Available Scripts

```bash
npm run dev          # Start development server on port 3005
npm run build        # Build production bundle
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run unit tests (Vitest)
npm run test:e2e     # Run E2E tests (Playwright)
npm run test:e2e:ui  # Run E2E tests with UI
npm run storybook    # Start Storybook (component docs)
```

## Testing (Optional)

### Unit Testing Setup

We use **Vitest** and **React Testing Library** for unit tests.

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### E2E Testing Setup

We use **Playwright** for end-to-end testing.

#### First-time E2E Setup

1. **Install Playwright browsers**
   ```bash
   npm run test:e2e:install
   # or
   npx playwright install
   ```
   
   This downloads browser binaries (~2GB) for:
   - Chromium
   - Firefox
   - WebKit (Safari)

2. **Verify setup**
   ```bash
   npm run test:e2e:check
   ```

3. **Run E2E tests**
   ```bash
   # Headless mode (CI-friendly)
   npm run test:e2e
   
   # With UI (debugging)
   npm run test:e2e:ui
   
   # Specific browser
   npm run test:e2e -- --project=chromium
   ```

#### E2E Test Requirements

- **Disk Space**: ~2GB for browser binaries
- **Memory**: 4GB RAM minimum
- **OS Support**: Windows 10+, macOS 10.15+, Ubuntu 20.04+

#### Troubleshooting E2E Tests

If you encounter "browser not found" errors:
```bash
# Reinstall browsers
npx playwright install --force

# Check installation
npx playwright --version
```

For Docker users:
```bash
# Use Playwright Docker image
docker run -it mcr.microsoft.com/playwright:v1.40.0 /bin/bash
```

### Writing Tests

#### Unit Test Example
```typescript
// components/ui/button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

#### E2E Test Example
```typescript
// tests/e2e/navigation.spec.ts
import { test, expect } from '@playwright/test';

test('navigate to projects', async ({ page }) => {
  await page.goto('/');
  await page.click('text=View Projects');
  await expect(page).toHaveURL(/.*#projects/);
});
```

### Testing Guidelines (Optional)

While testing is not required for contributions, we have a comprehensive testing infrastructure available if you'd like to use it:

- **Unit Tests**: Vitest + React Testing Library for component testing
- **E2E Tests**: Playwright for end-to-end testing
- **Coverage Reports**: Available via `npm run test:coverage`

Feel free to add tests if you're comfortable with them, but they're not mandatory for PR acceptance.

## Code Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Define interfaces for all component props
- Avoid `any` type - use `unknown` if type is truly unknown
- Export types from a central `types/` directory

```typescript
// Good
interface ButtonProps {
  /** Button label text */
  children: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Visual style variant */
  variant?: 'primary' | 'secondary';
}

// Bad
const Button = (props: any) => { ... }
```

### React Components

- Use functional components with hooks
- One component per file
- Use PascalCase for component names
- Place components in appropriate directories

```typescript
// Good
export function ProjectCard({ title, description }: ProjectCardProps) {
  return <div>...</div>;
}

// Avoid
export default ({ title, desc }) => <div>...</div>;
```

### Styling

- Use Tailwind CSS utilities
- Avoid inline styles
- Use the `cn()` utility for conditional classes
- Follow mobile-first responsive design

```typescript
// Good
<div className={cn(
  "p-4 rounded-lg",
  isActive && "bg-blue-500",
  "md:p-6 lg:p-8"
)}>

// Bad
<div style={{ padding: '16px', borderRadius: '8px' }}>
```

### File Organization

```
components/
├── ComponentName/
│   ├── ComponentName.tsx      # Component implementation
│   ├── ComponentName.test.tsx # Tests
│   ├── ComponentName.stories.tsx # Storybook stories
│   └── index.ts               # Exports
```

## Component Development

### Creating a New Component

1. **Use the component generator** (when available)
   ```bash
   npm run generate:component MyComponent
   ```

2. **Manual creation**
   - Create component file: `components/MyComponent.tsx`
   - Add TypeScript interface for props
   - Add JSDoc comments
   - Create test file: `MyComponent.test.tsx`
   - Add Storybook story: `MyComponent.stories.tsx`

### Component Checklist

- [ ] TypeScript interfaces defined
- [ ] JSDoc comments added
- [ ] Unit tests written (optional)
- [ ] Storybook story created
- [ ] Responsive design implemented
- [ ] Dark mode support added
- [ ] Accessibility attributes included

### Example Component Structure

```typescript
/**
 * Card component for displaying project information
 * @example
 * <ProjectCard
 *   title="My Project"
 *   description="Project description"
 *   image="/images/project.png"
 * />
 */
export interface ProjectCardProps {
  /** Project title */
  title: string;
  /** Project description */
  description: string;
  /** Project image URL */
  image?: string;
  /** GitHub repository URL */
  github?: string;
  /** Live demo URL */
  demo?: string;
}

export function ProjectCard({
  title,
  description,
  image,
  github,
  demo
}: ProjectCardProps) {
  // Component implementation
}
```

## Pull Request Process

### Before Creating a PR

1. **Update from main**
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Run required checks**
   ```bash
   npm run lint
   npm run build
   
   # Optional: Run tests if you've written them
   # npm run test
   # npm run test:e2e
   ```

3. **Self-review your changes**
   - Check for console.logs
   - Verify no sensitive data
   - Ensure tests pass (if written)
   - Review code style

### PR Guidelines

#### Title Format
```
feat: Add new feature
fix: Fix bug in component
docs: Update documentation
test: Add tests for feature
refactor: Refactor component structure
style: Format code
chore: Update dependencies
```

#### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing (if applicable)
- [ ] Unit tests pass (if written)
- [ ] E2E tests pass (if written)
- [ ] Manual testing completed

## Screenshots (if UI changes)
[Add screenshots here]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated (if applicable)
- [ ] Documentation updated
```

### Review Process

1. **Automated checks** run on PR creation
2. **Code review** by maintainer
3. **Address feedback** in new commits
4. **Approval** required before merge
5. **Squash and merge** to main

## Troubleshooting

### Common Issues

#### Port 3005 Already in Use
```bash
# Find process using port
lsof -i :3005
# Kill process
kill -9 <PID>
# Or use different port
npm run dev -- -p 3006
```

#### Node Modules Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

#### TypeScript Errors
```bash
# Rebuild TypeScript
rm -rf tsconfig.tsbuildinfo
npm run build
```

#### Test Failures
```bash
# Update snapshots if needed
npm run test -- -u

# Debug specific test
npm run test -- --grep="test name"
```

### Getting Help

1. **Check existing issues** on GitHub
2. **Search documentation** in `/docs`
3. **Ask in discussions** for general questions
4. **Create an issue** for bugs

### Development Tips

1. **Use VS Code Extensions**:
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - TypeScript and JavaScript
   - Playwright Test for VSCode

2. **Browser DevTools**:
   - React Developer Tools
   - Network tab for performance
   - Lighthouse for audits

3. **Git Aliases** (optional):
   ```bash
   git config --global alias.co checkout
   git config --global alias.br branch
   git config --global alias.st status
   ```

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow project guidelines

## License

By contributing, you agree that your contributions will be licensed under the project's license.

---

Thank you for contributing! Your efforts help make this project better for everyone. 🚀