# Architecture Documentation

## Project Overview

This is a Next.js 15 portfolio website showcasing engineering projects with a focus on hardware and software development. The application uses React 19, TypeScript, and Tailwind CSS for a modern, type-safe development experience.

## Directory Structure

```
tmarhguy/
├── app/                      # Next.js 15 app directory
│   ├── layout.tsx           # Root layout with theme provider
│   ├── page.tsx             # Home page component
│   ├── globals.css          # Global styles and Tailwind imports
│   └── theme-script.tsx     # Theme initialization script
│
├── components/              # React components
│   ├── animations/         # Animation components
│   │   ├── AnimatedBackground.tsx
│   │   ├── AnimatedCard.tsx
│   │   ├── CursorSpotlight.tsx
│   │   └── TimeCapsuleResume.tsx
│   │
│   ├── cards/             # Card components
│   │   ├── FlagshipCard.tsx      # Featured project cards
│   │   └── ProjectCard.tsx       # Standard project cards
│   │
│   ├── sections/          # Page sections
│   │   ├── Hero.tsx              # Landing hero section
│   │   ├── BioSection.tsx        # Biography section
│   │   ├── Skills.tsx            # Skills showcase
│   │   └── TaglineSection.tsx    # Tagline display
│   │
│   ├── ui/                # Base UI components
│   │   ├── button.tsx            # Button component
│   │   ├── card.tsx              # Card component
│   │   └── CursorIllumination.tsx # Cursor effects
│   │
│   ├── theme-provider.tsx  # Next-themes provider
│   ├── theme-toggle.tsx    # Theme switcher component
│   └── index.ts            # Component exports
│
├── data/                   # Data layer (to be created)
│   ├── projects.ts        # Project data
│   └── skills.ts          # Skills data
│
├── lib/                    # Utilities and helpers
│   ├── utils.ts           # Class name utilities (cn)
│   └── theme.ts           # Theme configuration
│
├── hooks/                  # Custom React hooks
│   └── useThemeClasses.ts # Theme-aware classes hook
│
├── utils/                  # Application utilities
│   ├── paths.ts           # Path utilities
│   └── timeCapsuleEvent.ts # Time capsule functionality
│
├── types/                  # TypeScript type definitions (to be created)
│   ├── project.ts         # Project types
│   └── index.ts           # Type exports
│
├── tests/                  # Test files (optional)
│   ├── unit/              # Unit tests
│   ├── integration/       # Integration tests
│   └── e2e/               # End-to-end tests
│
├── public/                 # Static assets
│   └── images/            # Image assets
│
└── src/                    # Legacy source directory
    └── components/ui/     # Legacy UI components

```

## Component Architecture

### Component Hierarchy

```
App (layout.tsx)
├── ThemeProvider (theme context)
├── Hero Section
│   ├── AnimatedBackground
│   ├── Navigation Links
│   └── TimeCapsuleResume (modal)
│
├── Projects Section
│   ├── FlagshipCard[] (featured)
│   └── ProjectCard[] (standard)
│
├── Skills Section
│   └── Skill Categories
│
└── Bio/Footer Sections
```

### Data Flow

1. **Static Data**: Project and skill data are currently hardcoded in components (will be extracted to `/data`)
2. **Theme State**: Managed by next-themes provider, persisted to localStorage
3. **Animation State**: Local to individual components
4. **Modal State**: TimeCapsuleResume uses imperative handle pattern

## Technology Stack

### Core Technologies
- **Next.js 15.4**: React framework with App Router
- **React 19.1**: UI library
- **TypeScript 5**: Type safety
- **Tailwind CSS 3.4**: Utility-first CSS

### Key Libraries
- **next-themes**: Dark/light mode management
- **lucide-react**: Icon library
- **clsx + tailwind-merge**: Class name utilities
- **class-variance-authority**: Component variants

### Development Tools
- **Vitest**: Unit testing (optional)
- **Playwright**: E2E testing (optional)
- **Storybook**: Component documentation
- **Prettier**: Code formatting
- **Husky**: Git hooks

## Design Patterns

### Component Patterns

1. **Composition Pattern**: Components are composed of smaller, reusable pieces
   ```tsx
   <AnimatedCard>
     <ProjectCard />
   </AnimatedCard>
   ```

2. **Prop Drilling Minimization**: Using composition over prop passing where possible

3. **Type Safety**: All components have TypeScript interfaces for props

### Styling Strategy

1. **Utility-First**: Tailwind CSS for styling
2. **Component Variants**: Using CVA for variant management
3. **Theme Variables**: CSS variables for theme colors
4. **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Module Boundaries

### Presentation Layer (`/components`)
- React components only
- No business logic
- Props-driven rendering
- Styling and animations

### Data Layer (`/data` - to be created)
- Static data definitions
- Type-safe data structures
- Content management
- No UI concerns

### Utility Layer (`/lib`, `/utils`)
- Pure functions
- Helper utilities
- No component imports
- Framework-agnostic where possible

### Type Layer (`/types` - to be created)
- TypeScript interfaces
- Type definitions
- Shared types across modules
- No implementation code

## State Management

### Current State
- **Theme**: Global (next-themes)
- **Component State**: Local (useState)
- **No Global State Management**: Currently no Redux/Zustand

### Future Considerations
- Consider Zustand for complex state if needed
- React Query for API data if backend added
- Form state with React Hook Form if forms added

## Performance Considerations

### Current Optimizations
- Static site generation where possible
- Image optimization with Next.js Image
- Code splitting by route
- CSS purging with Tailwind

### Planned Optimizations
- Lazy loading for heavy components
- Memoization for expensive computations
- Virtual scrolling for long lists
- Bundle size monitoring

## Security Considerations

### Current Measures
- No sensitive data in codebase
- HTTPS only deployment
- CSP headers via Next.js

### Planned Improvements
- Input sanitization utilities
- Rate limiting for any future APIs
- Security headers configuration

## Testing Strategy (Optional)

Testing infrastructure is available but optional for contributors. If you choose to write tests:


### Unit Testing (Vitest)
- Component rendering tests
- Hook behavior tests
- Utility function tests
- Theme switching tests

### Integration Testing
- Page component tests
- Navigation flow tests
- Data integration tests

### E2E Testing (Playwright)
- User journey tests
- Cross-browser testing
- Accessibility testing
- Visual regression testing

## Deployment Architecture

### Current Setup
- Static export via `next export`
- GitHub Pages hosting
- GitHub Actions CI/CD

### Build Process
1. TypeScript compilation
2. Next.js build
3. Static export
4. Asset optimization

## Development Workflow

### Branch Strategy
- `main`: Production-ready code
- `feature/*`: Feature branches
- `fix/*`: Bug fix branches

### Code Review Process
1. Feature branch created
2. Development (with optional tests)
3. PR created with description
4. Automated linting and build checks
5. Code review
6. Merge to main

## Future Enhancements

### Short Term
- Extract data to separate files
- Testing infrastructure available (optional use)
- Implement Storybook
- Add pre-commit hooks

### Long Term
- CMS integration for content
- API backend for dynamic data
- Analytics integration
- Performance monitoring

## AI Agent Considerations

### Code Organization
- Clear file naming conventions
- Consistent component structure
- Well-documented interfaces
- Predictable patterns

### Documentation
- JSDoc for all public APIs
- README files in key directories
- Example usage in comments
- Type definitions for all data

### Testing (Optional)
- Test files adjacent to components
- Clear test descriptions
- Mock external dependencies
- E2E tests for main flows
- Testing is encouraged but not required