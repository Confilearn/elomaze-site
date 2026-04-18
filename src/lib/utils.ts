import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function for combining Tailwind CSS classes
 *
 * This function merges class names intelligently:
 * - clsx: Combines conditional classes and removes duplicates
 * - twMerge: Handles Tailwind class conflicts (e.g., 'p-2' overrides 'p-4')
 *
 * Common pattern in modern React component libraries like shadcn/ui
 *
 * @example
 * cn('px-2 py-1', isActive && 'bg-blue-500', 'px-4') // Results in 'py-1 bg-blue-500 px-4'
 *
 * For React/Vite developers: This is a utility for cleaner conditional
 * styling in components, commonly used with component libraries.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
