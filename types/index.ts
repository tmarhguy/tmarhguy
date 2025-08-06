/**
 * Central export for all type definitions
 */

export * from './project';

/**
 * Skill category type
 */
export interface SkillCategory {
  /** Category name */
  name: string;
  /** Category icon (optional) */
  icon?: string;
  /** Skills in this category */
  skills: string[];
}

/**
 * Navigation link type
 */
export interface NavLink {
  /** Display label */
  label: string;
  /** URL or anchor */
  href: string;
  /** External link flag */
  external?: boolean;
  /** Icon name */
  icon?: string;
}

/**
 * Social media link
 */
export interface SocialLink extends NavLink {
  /** Platform name */
  platform: "GitHub" | "LinkedIn" | "Email" | "Twitter" | "Website";
}