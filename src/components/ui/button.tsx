/**
 * Button component with multiple variants and sizes
 *
 * This is a highly reusable button component built with:
 * - Radix UI Slot for polymorphic rendering (asChild prop)
 * - Class Variance Authority (CVA) for variant management
 * - Tailwind CSS for styling
 * - Full TypeScript support with proper forwarding
 *
 * Key features:
 * - Multiple visual variants (default, destructive, outline, etc.)
 * - Multiple sizes (sm, default, lg, xl, icon)
 * - Custom variants for this project (premium, hero, hero-outline, success)
 * - asChild prop for rendering as different elements (Link, button, etc.)
 * - Proper ref forwarding for DOM access
 * - Accessibility support with Radix UI
 *
 * For React/Vite developers: This is a sophisticated button component
 * that demonstrates modern React patterns like CVA and polymorphic components.
 */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Class Variance Authority configuration for button variants
 *
 * CVA allows us to define base styles and variant combinations
 * in a type-safe way. This is better than conditional classes
 * for components with multiple style options.
 */
const buttonVariants = cva(
  // Base classes applied to all button variants
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 btn-press",
  {
    variants: {
      variant: {
        // Standard primary button
        default:
          "bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:bg-primary/90",
        // Destructive action button (delete, cancel, etc.)
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        // Outlined button with transparent background
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        // Secondary button with muted background
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        // Ghost button with no background, only hover state
        ghost: "hover:bg-accent hover:text-accent-foreground",
        // Link-style button that looks like a hyperlink
        link: "text-primary underline-offset-4 hover:underline",
        // Premium variant with rounded corners and enhanced shadow
        premium:
          "bg-primary text-primary-foreground shadow-lg hover:shadow-xl rounded-full",
        // Hero variant for call-to-action buttons
        hero: "bg-primary text-primary-foreground shadow-lg hover:shadow-xl rounded-full text-base font-semibold",
        // Hero outline variant for secondary CTAs
        "hero-outline":
          "border-2 border-primary text-primary bg-background hover:bg-primary hover:text-primary-foreground rounded-full text-base font-semibold",
        // Success variant for positive actions
        success:
          "bg-success text-success-foreground shadow-sm hover:bg-success/90",
      },
      size: {
        // Default button size
        default: "h-10 px-5 py-2 rounded-full",
        // Small button for compact spaces
        sm: "h-8 px-4 text-xs rounded-full",
        // Large button for emphasis
        lg: "h-12 px-8 rounded-full",
        // Extra large button for hero sections
        xl: "h-14 px-10 text-base rounded-full",
        // Square button for icons only
        icon: "h-10 w-10 rounded-full",
      },
    },
    // Default variant when none is specified
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/**
 * Button component props interface
 *
 * Extends standard HTML button attributes and CVA variant props.
 * The asChild prop allows the button to render as different elements.
 */
export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/**
 * Button component implementation
 *
 * Uses React.forwardRef to properly forward refs to the underlying
 * DOM element. This is important for accessibility and DOM manipulation.
 *
 * The Slot component from Radix UI enables polymorphic rendering -
 * when asChild is true, the button renders as its child element
 * while maintaining all button behavior and accessibility.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // If asChild is true, render as the child element (e.g., Link)
    // Otherwise, render as a standard button element
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

// Set display name for debugging in React DevTools
Button.displayName = "Button";

// Export both the component and the variant configuration
// This allows other components to use the same variant logic
export { Button, buttonVariants };
