/**
 * Type definitions for project data structures
 */

/**
 * Project status indicator
 */
export type ProjectStatus = "Complete" | "In Progress" | "Planning" | "Concept";

/**
 * Metric displayed on project cards
 */
export interface ProjectMetric {
  /** Metric label (e.g., "Users", "Latency") */
  label: string;
  /** Metric value (e.g., "1M+", "<500ms") */
  value: string;
}

/**
 * Base project interface
 */
export interface Project {
  /** Unique project identifier */
  id: string;
  /** Project title */
  title: string;
  /** Detailed project description */
  description: string;
  /** Optional project image URL */
  image?: string;
  /** GitHub repository URL */
  github: string;
  /** Demo or project details URL */
  demo: string;
  /** Technology/skill tags */
  tags: string[];
  /** Current project status */
  status: ProjectStatus;
}

/**
 * Flagship project with additional metrics
 */
export interface FlagshipProject extends Project {
  /** Project image is required for flagship projects */
  image: string;
  /** Performance/achievement metrics */
  metrics: ProjectMetric[];
}

/**
 * Software project category
 */
export interface SoftwareProject extends Project {
  /** Optional category for organization */
  category?: "web" | "api" | "ml" | "tools";
}

/**
 * Hardware project category
 */
export interface HardwareProject extends Project {
  /** Optional specifications */
  specs?: {
    components?: string;
    power?: string;
    frequency?: string;
  };
}

/**
 * Project categories for filtering
 */
export type ProjectCategory = "all" | "hardware" | "software" | "ml" | "web";