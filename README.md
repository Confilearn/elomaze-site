# Elomaze - Trusted Homes in Nigeria

A modern real estate platform built for Nigerians to find trusted, verified homes across the country.

## Overview

Elomaze is a comprehensive property listing platform that connects Nigerians with trusted homes, apartments, duplexes, shortlets, and more. Built with cutting-edge web technologies and designed with the Nigerian market in mind.

## Features

- **Property Listings**: Browse apartments, duplexes, self-contained units, student lodges, and shortlets
- **Search & Filter**: Advanced search functionality with location, property type, and price filters
- **Verified Properties**: All listings are verified for authenticity and reliability
- **User Authentication**: Secure login and registration system
- **Saved Properties**: Users can save their favorite properties for later
- **Responsive Design**: Optimized for all devices - mobile, tablet, and desktop
- **Admin Dashboard**: Property management and user administration
- **Contact System**: Direct messaging with property owners/agents

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start/latest) - Full-stack React framework
- **Routing**: [TanStack Router](https://tanstack.com/router/latest) - Type-safe routing
- **UI Library**: [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Forms**: [React Hook Form](https://react-hook-form.com/) with Zod validation
- **State Management**: [TanStack Query](https://tanstack.com/query/latest) - Server state management
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful icon library
- **Build Tool**: [Vite](https://vitejs.dev/) - Fast build tool and development server
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript

### For React/Vite Developers: Understanding TanStack Start

If you're coming from a traditional React + Vite background, here's how TanStack Start differs:

**Key Concepts:**

- **File-based Routing**: Routes are automatically created from files in `src/routes/` (like Next.js)
- **Server-Side Rendering (SSR)**: Pages are rendered on the server for better SEO and performance
- **Type-safe Navigation**: All routing is fully typed with TypeScript
- **Built-in Data Fetching**: TanStack Query is integrated for server state management

**File Structure Mapping:**

```
Traditional React/Vite    →    TanStack Start
├── src/App.tsx           →    src/routes/__root.tsx (root layout)
├── src/pages/            →    src/routes/ (file-based routes)
├── src/main.tsx          →    src/entry-client.tsx (client hydration)
└── router config         →    Automatic from file structure
```

**Route Examples:**

```
File Path                          →    URL Route
src/routes/index.tsx              →    /
src/routes/about.tsx              →    /about
src/routes/login.tsx              →    /login
src/routes/properties.tsx         →    /properties (layout)
src/routes/properties.index.tsx   →    /properties (list)
src/routes/properties.$id.tsx     →    /properties/123 (dynamic)
```

**Navigation Patterns:**

```tsx
// Traditional React Router
import { Link, useNavigate, useParams } from "react-router-dom";
const navigate = useNavigate();
const { id } = useParams();

// TanStack Router (fully typed)
import { Link, useNavigate } from "@tanstack/react-router";
const navigate = useNavigate();
// Params are accessed in route component, fully typed
```

**Key Benefits:**

- **Better TypeScript Support**: All routes and parameters are type-safe
- **Performance**: Automatic code splitting and preloading
- **SEO**: Server-side rendering out of the box
- **Developer Experience**: File-based routing is intuitive and fast

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or bun package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/elomaze-site.git
cd elomaze-site
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
bun install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development mode
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint to check for code issues

## Project Structure

```
src/
  assets/          # Static assets (images, fonts)
  components/      # Reusable UI components
  hooks/           # Custom React hooks
  lib/             # Utility functions and configurations
  routes/          # Page routes and components
  router.tsx       # Router configuration
  styles.css       # Global styles
```

### Key Directories

- **`src/components/`**: Contains all reusable UI components including forms, cards, and layout components
  - `ui/` - Base UI components built with Radix UI (Button, Input, etc.)
  - `Header.tsx`, `Footer.tsx` - Layout components
  - `PropertyCard.tsx` - Business-specific components
- **`src/routes/`**: Page components organized by route structure (file-based routing)
  - `__root.tsx` - Root layout (replaces App.tsx)
  - `index.tsx` - Homepage (/)
  - `properties.$propertyId.tsx` - Dynamic property detail pages
  - `admin/` - Admin panel routes
  - `agent/` - Agent portal routes
- **`src/lib/`**: Shared utilities, data definitions, and configuration files
  - `data.ts` - TypeScript interfaces and mock data
  - `utils.ts` - Utility functions (like `cn()` for class merging)
  - `nigeria-data.ts` - Geographic data for states/cities/LGAs

### Important Files for React/Vite Developers

- **`vite.config.ts`**: Vite configuration with TanStack Start plugin
- **`src/router.tsx`**: Router configuration and error boundaries
- **`src/entry-client.tsx`**: Client-side hydration (replaces main.tsx)
- **`src/routes/__root.tsx`**: Root layout component (replaces App.tsx)
- **`src/routeTree.gen.ts`**: Auto-generated route tree (don't edit manually)

## Configuration

### Environment Variables

Create a `.env` file in the root directory for environment-specific variables:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Elomaze
```

### Database Setup

This project uses a file-based data structure for demonstration. For production, you'll need to:

1. Set up a database (PostgreSQL, MongoDB, etc.)
2. Configure environment variables for database connection
3. Update the data access layer in `src/lib/data.ts`

## Deployment

### Cloudflare Pages (Recommended)

This project is configured for Cloudflare Pages deployment:

1. Connect your repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on push to main branch

### Other Platforms

The build output can be deployed to any static hosting service:

- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow the existing code style and patterns
- Use TypeScript for all new code
- Ensure components are properly typed
- Write meaningful commit messages
- Run `npm run lint` before submitting

### Development Tips for React/Vite Developers

**Adding New Routes:**

1. Create a new file in `src/routes/` (e.g., `profile.tsx` for `/profile`)
2. Export a `Route` component using `createFileRoute()`
3. The route is automatically available - no router config needed!

**Dynamic Routes:**

- Use `$parameter` syntax: `users.$userId.tsx` → `/users/123`
- Access parameters in the route component: `({ params }) => params.userId`

**Layout Routes:**

- Create a folder route: `dashboard.tsx` + `dashboard.index.tsx`
- The folder route acts as a layout for child routes

**Navigation:**

```tsx
// Link to a route
<Link to="/properties" />

// Link with parameters
<Link to="/properties/$propertyId" params={{ propertyId: '123' }} />

// Programmatic navigation
const navigate = useNavigate()
navigate({ to: '/login' })
```

**Data Fetching:**

- TanStack Query is built-in for server state
- Use `createQuery()` in route components for data loading
- Automatic loading states and error handling

**Styling:**

- Use the `cn()` utility for conditional classes
- Follow the existing Tailwind patterns
- Components use Radix UI primitives for accessibility

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:

- Create an issue in the GitHub repository
- Email: support@elomaze.com
- Visit our website: [elomaze.com](https://elomaze.com)

## Acknowledgments

- Built with [TanStack Start](https://tanstack.com/start/latest)
- UI components powered by [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

---

**Elomaze** - Your trusted partner in finding the perfect home in Nigeria.
