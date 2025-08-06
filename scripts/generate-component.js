#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get component name from command line
const componentName = process.argv[2];

if (!componentName) {
  console.error('❌ Please provide a component name');
  console.log('Usage: npm run generate:component ComponentName');
  process.exit(1);
}

// Validate component name (PascalCase)
if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
  console.error('❌ Component name must be in PascalCase (e.g., MyComponent)');
  process.exit(1);
}

// Component template
const componentTemplate = `'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the ${componentName} component
 * @interface ${componentName}Props
 */
interface ${componentName}Props {
  /** Optional CSS classes */
  className?: string;
  /** Child components */
  children?: React.ReactNode;
}

/**
 * ${componentName} component
 * @example
 * <${componentName} className="custom-class">
 *   Content goes here
 * </${componentName}>
 */
export default function ${componentName}({
  className,
  children,
}: ${componentName}Props) {
  const [state, setState] = useState(false);

  return (
    <div className={cn('', className)}>
      {children}
    </div>
  );
}
`;

// Test template
const testTemplate = `import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ${componentName} from './${componentName}';

describe('${componentName} Component', () => {
  it('renders children correctly', () => {
    render(
      <${componentName}>
        <span>Test Content</span>
      </${componentName}>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <${componentName} className="custom-class">
        Content
      </${componentName}>
    );
    
    const element = container.firstChild;
    expect(element).toHaveClass('custom-class');
  });
});
`;

// Story template
const storyTemplate = `import type { Meta, StoryObj } from '@storybook/react';
import ${componentName} from './${componentName}';

const meta = {
  title: 'Components/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Custom CSS classes',
    },
  },
} satisfies Meta<typeof ${componentName}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default ${componentName} content',
  },
};

export const WithCustomClass: Story = {
  args: {
    className: 'p-4 border rounded',
    children: '${componentName} with custom styling',
  },
};
`;

// Determine component directory
const category = process.argv[3] || 'ui'; // Default to 'ui' category
const validCategories = ['ui', 'animations', 'cards', 'sections'];

if (!validCategories.includes(category)) {
  console.error(`❌ Invalid category: ${category}`);
  console.log(`Valid categories: ${validCategories.join(', ')}`);
  process.exit(1);
}

const componentDir = path.join(__dirname, '..', 'components', category);
const componentPath = path.join(componentDir, `${componentName}.tsx`);
const testPath = path.join(componentDir, `${componentName}.test.tsx`);
const storyPath = path.join(componentDir, `${componentName}.stories.tsx`);

// Check if component already exists
if (fs.existsSync(componentPath)) {
  console.error(`❌ Component ${componentName} already exists at ${componentPath}`);
  process.exit(1);
}

// Create component directory if it doesn't exist
if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
}

// Write files
try {
  fs.writeFileSync(componentPath, componentTemplate);
  console.log(`✅ Created component: ${componentPath}`);
  
  fs.writeFileSync(testPath, testTemplate);
  console.log(`✅ Created test: ${testPath}`);
  
  // Only create story if Storybook is set up
  if (fs.existsSync(path.join(__dirname, '..', '.storybook'))) {
    fs.writeFileSync(storyPath, storyTemplate);
    console.log(`✅ Created story: ${storyPath}`);
  }
  
  console.log(`\n🎉 Component ${componentName} generated successfully!`);
  console.log(`\nNext steps:`);
  console.log(`1. Update the component implementation in ${componentPath}`);
  console.log(`2. Add more tests in ${testPath}`);
  console.log(`3. Update components/README.md with documentation`);
  
} catch (error) {
  console.error('❌ Error creating component:', error.message);
  process.exit(1);
}