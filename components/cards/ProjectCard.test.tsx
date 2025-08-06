import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProjectCard from './ProjectCard';

describe('ProjectCard Component', () => {
  const mockProps = {
    title: 'Test Project',
    description: 'This is a test project description',
    image: '/test-image.png',
    github: 'https://github.com/test/repo',
    demo: 'https://demo.test.com',
    tags: ['React', 'TypeScript', 'Testing'],
    status: 'In Progress' as const,
  };

  beforeEach(() => {
    // Reset body overflow style
    document.body.style.overflow = '';
  });

  afterEach(() => {
    // Clean up
    document.body.style.overflow = '';
  });

  it('renders project title and description', () => {
    render(<ProjectCard {...mockProps} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    // Description is visible on desktop
    const descriptions = screen.getAllByText('This is a test project description');
    expect(descriptions.length).toBeGreaterThan(0);
  });

  it('displays the correct status', () => {
    render(<ProjectCard {...mockProps} />);
    
    // Status text might be abbreviated on mobile
    const statusElements = screen.getAllByText((content, element) => {
      return content.includes('Progress') || content === 'In ';
    });
    expect(statusElements.length).toBeGreaterThan(0);
  });

  it('renders all tags', () => {
    render(<ProjectCard {...mockProps} />);
    
    // Tags might be in mobile modal, so they might not all be visible initially
    expect(screen.getAllByText('React').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('TypeScript').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Testing').length).toBeGreaterThanOrEqual(1);
  });

  it('renders project image when provided', () => {
    render(<ProjectCard {...mockProps} />);
    
    const image = screen.getByRole('img', { name: 'Test Project' });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.png');
  });

  it('opens GitHub link in new tab', () => {
    const mockOpen = vi.fn();
    window.open = mockOpen;
    
    render(<ProjectCard {...mockProps} />);
    
    // Find GitHub button (might have different text on mobile/desktop)
    const githubButtons = screen.getAllByRole('button', { name: /code|github/i });
    fireEvent.click(githubButtons[0]);
    
    expect(mockOpen).toHaveBeenCalledWith('https://github.com/test/repo', '_blank');
  });

  it('opens demo link in new tab', () => {
    const mockOpen = vi.fn();
    window.open = mockOpen;
    
    render(<ProjectCard {...mockProps} />);
    
    // Find demo button
    const demoButtons = screen.getAllByRole('button', { name: /details|demo/i });
    fireEvent.click(demoButtons[0]);
    
    expect(mockOpen).toHaveBeenCalledWith('https://demo.test.com', '_blank');
  });

  it('handles different status types correctly', () => {
    const statuses = ['Complete', 'In Progress', 'Planning', 'Concept'] as const;
    
    statuses.forEach(status => {
      const { rerender } = render(<ProjectCard {...mockProps} status={status} />);
      
      // Check if status-related elements exist
      const statusElements = screen.getAllByText((content) => {
        return content.includes(status) || content.includes(status.slice(0, 3));
      });
      expect(statusElements.length).toBeGreaterThan(0);
      
      rerender(<div />); // Clean up for next iteration
    });
  });

  it('renders without image when not provided', () => {
    const propsWithoutImage = { ...mockProps, image: undefined };
    render(<ProjectCard {...propsWithoutImage} />);
    
    const images = screen.queryAllByRole('img');
    expect(images.length).toBe(0);
  });

  it('handles mobile modal interactions', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });
    
    render(<ProjectCard {...mockProps} />);
    
    // Check that card exists and has cursor-pointer class for mobile
    const card = document.querySelector('.cursor-pointer');
    expect(card).toBeInTheDocument();
  });
});