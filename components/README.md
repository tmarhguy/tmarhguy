# Components Library

This directory contains all React components for the portfolio website. Components are organized by their function and follow a consistent structure for maintainability.

## Component Categories

### 📦 UI Components (`/ui`)
Base-level UI components that form the building blocks of the application.

#### Button
Versatile button component with multiple variants and sizes.

```tsx
import { Button } from '@/components/ui/button';

// Usage examples
<Button variant="default">Default Button</Button>
<Button variant="outline" size="lg">Large Outline</Button>
<Button variant="ghost" size="icon"><Icon /></Button>
```

**Props:**
- `variant`: `"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"`
- `size`: `"default" | "sm" | "lg" | "icon"`
- `asChild`: `boolean` - Use Radix Slot for composition
- All standard HTML button attributes

#### Card
Container component for content with consistent styling.

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>
```

#### CursorIllumination
Creates a light effect that follows the user's cursor.

```tsx
import CursorIllumination from '@/components/ui/CursorIllumination';

<CursorIllumination size={900} opacity={0.4} />
```

**Props:**
- `size`: `number` - Effect size in pixels (default: 900)
- `opacity`: `number` - Effect opacity 0-1 (default: 0.4)

### 🎨 Animation Components (`/animations`)

#### AnimatedBackground
Dynamic background with multiple animation variants.

```tsx
import AnimatedBackground from '@/components/animations/AnimatedBackground';

<AnimatedBackground 
  variant="circuit" 
  intensity="medium" 
/>
```

**Props:**
- `variant`: `"matrix" | "circuit" | "particles" | "terminal"`
- `intensity`: `"low" | "medium" | "high"`
- `className`: `string` - Additional CSS classes

#### AnimatedCard
Interactive card with hover effects.

```tsx
import AnimatedCard from '@/components/animations/AnimatedCard';

<AnimatedCard 
  glowEffect={true}
  tiltEffect={true}
  scanlineEffect={false}
>
  <YourContent />
</AnimatedCard>
```

**Props:**
- `glowEffect`: `boolean` - Enable glow on hover (default: true)
- `tiltEffect`: `boolean` - Enable 3D tilt (default: true)  
- `scanlineEffect`: `boolean` - Enable scanline animation (default: false)
- `className`: `string` - Additional CSS classes

#### CursorSpotlight
Creates a spotlight effect following the cursor.

```tsx
import CursorSpotlight from '@/components/animations/CursorSpotlight';

<CursorSpotlight />
```

#### TimeCapsuleResume
Modal component for displaying resume downloads with animation.

```tsx
import TimeCapsuleResume from '@/components/animations/TimeCapsuleResume';

const ref = useRef<TimeCapsuleResumeRef>(null);

// Open programmatically
ref.current?.openCapsule();

<TimeCapsuleResume ref={ref} />
```

### 🃏 Card Components (`/cards`)

#### FlagshipCard
Featured project card with metrics display.

```tsx
import FlagshipCard from '@/components/cards/FlagshipCard';

<FlagshipCard
  title="Project Title"
  description="Detailed project description"
  image="/images/project.png"
  metrics={[
    { label: "Users", value: "1M+" },
    { label: "Latency", value: "<500ms" }
  ]}
  github="https://github.com/..."
  demo="https://demo.com"
  tags={["React", "TypeScript"]}
/>
```

**Props:**
- `title`: `string` - Project title
- `description`: `string` - Project description
- `image`: `string` - Image URL (required)
- `metrics`: `Array<{label: string, value: string}>` - Performance metrics
- `github`: `string` (optional) - GitHub repository URL
- `demo`: `string` (optional) - Demo URL
- `tags`: `string[]` - Technology tags

#### ProjectCard
Standard project card with status indicator.

```tsx
import ProjectCard from '@/components/cards/ProjectCard';

<ProjectCard
  title="Project Name"
  description="Project description"
  image="/images/project.png"
  github="https://github.com/..."
  demo="https://demo.com"
  tags={["Node.js", "Express"]}
  status="In Progress"
/>
```

**Props:**
- `title`: `string` - Project title
- `description`: `string` - Project description
- `image`: `string` (optional) - Image URL
- `github`: `string` - GitHub repository URL
- `demo`: `string` - Demo URL
- `tags`: `string[]` - Technology tags
- `status`: `"Complete" | "In Progress" | "Planning" | "Concept"`

### 📑 Section Components (`/sections`)

#### Hero
Landing page hero section with animated text and CTAs.

```tsx
import Hero from '@/components/sections/Hero';

<Hero />
```

Features:
- Animated tagline rotation
- Social media links
- Resume download trigger
- Responsive design

#### BioSection
Biography section with personal information.

```tsx
import BioSection from '@/components/sections/BioSection';

<BioSection />
```

#### Skills
Skills showcase with categorized display.

```tsx
import Skills from '@/components/sections/Skills';

<Skills />
```

Features:
- Categorized skill groups
- Icon display
- Responsive grid layout

#### TaglineSection
Animated tagline display section.

```tsx
import TaglineSection from '@/components/sections/TaglineSection';

<TaglineSection />
```

### 🎨 Theme Components

#### ThemeProvider
Next-themes provider wrapper for dark/light mode.

```tsx
import { ThemeProvider } from '@/components/theme-provider';

<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
>
  <App />
</ThemeProvider>
```

#### ThemeToggle
Theme switcher button component.

```tsx
import { ThemeToggle } from '@/components/theme-toggle';

<ThemeToggle />
```

## Component Development Guidelines

### File Structure
Each component should follow this structure:
```
ComponentName/
├── ComponentName.tsx       # Main component
├── ComponentName.test.tsx  # Unit tests (optional)
├── ComponentName.stories.tsx # Storybook stories (optional)
└── index.ts               # Exports
```

### Best Practices

1. **TypeScript First**: All components must have proper TypeScript interfaces
2. **JSDoc Comments**: Document all props and provide usage examples
3. **Responsive Design**: Use Tailwind's responsive utilities
4. **Dark Mode Support**: Ensure components work in both themes
5. **Accessibility**: Include proper ARIA attributes
6. **Performance**: Use React.memo for expensive components
7. **Testing**: Tests are optional but welcome for interactive components

### Creating New Components

1. Use consistent naming (PascalCase for components)
2. Export from the index file
3. Add to this README with examples
4. Include unit tests (optional but encouraged)
5. Add Storybook stories for documentation (optional)

### Component Props Patterns

```typescript
// Good - Documented interface
/**
 * Props for MyComponent
 * @interface MyComponentProps
 */
interface MyComponentProps {
  /** Component title */
  title: string;
  /** Optional description */
  description?: string;
  /** Click handler */
  onClick?: () => void;
}

// Bad - No documentation
interface Props {
  title: any;
  desc: string;
}
```

### Styling Guidelines

- Use Tailwind CSS utilities
- Leverage the `cn()` utility for conditional classes
- Keep component-specific styles minimal
- Use CSS variables for theming

```tsx
// Good
<div className={cn(
  "base-classes",
  isActive && "active-classes",
  "responsive-classes"
)}>

// Bad
<div style={{ padding: '16px' }}>
```

## Testing Components (Optional)

Testing is optional but the infrastructure is available if you'd like to use it:

Run component tests:
```bash
npm run test  # If tests are written
```

View in Storybook:
```bash
npm run storybook  # If stories are created
```

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for detailed guidelines on adding new components.