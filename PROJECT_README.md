# Gurudev Engicon Private Limited - Next.js Website

A modern, high-performance corporate website built with **Next.js 16** and the **App Router**, migrated from React + Vite for superior SEO, performance, and developer experience.

## 🚀 Project Overview

This is a professional, responsive single-page application showcasing Gurudev Engicon Pvt. Ltd., an engineering and infrastructure development company. The site leverages Next.js App Router features including Server Components, Client Components, and API Routes.

## ✨ Features

### Performance & SEO
- **Server-Side Rendering (SSR)**: Optimal initial page load and SEO
- **Server Components**: Most components are server-rendered by default
- **Client Components**: Interactive elements use `'use client'` directive
- **Optimized Metadata**: Comprehensive SEO configuration in `layout.tsx`
- **Type-Safe**: Full TypeScript support with strict typing

### Architecture
- **App Router**: Modern file-based routing with Next.js 16
- **Component Separation**: Clear distinction between Server and Client Components
- **API Routes**: Built-in `/api/contact` endpoint for form submissions
- **Utility Functions**: Centralized validation and helper functions
- **Type Definitions**: Shared TypeScript interfaces and types

### Design
- **Responsive Design**: Mobile-first approach, works on all devices
- **Modern UI**: Clean corporate design with beige/white theme
- **Smooth Navigation**: Fixed header with smooth scrolling
- **Form Validation**: Client and server-side validation
- **Accessibility**: Semantic HTML and ARIA labels

## 📁 Project Structure

```
gurudev-engicon-nextJS/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts           # Contact form API endpoint
│   ├── styles/
│   │   ├── Header.css
│   │   ├── Hero.css
│   │   ├── About.css
│   │   ├── Services.css
│   │   ├── Projects.css
│   │   ├── Contact.css
│   │   └── Footer.css
│   ├── globals.css                # Global styles and CSS variables
│   ├── layout.tsx                 # Root layout with metadata
│   └── page.tsx                   # Home page (main route)
├── components/
│   ├── Header.tsx                 # Client Component (interactive menu)
│   ├── Hero.tsx                   # Server Component
│   ├── About.tsx                  # Server Component
│   ├── Services.tsx               # Server Component
│   ├── Projects.tsx               # Server Component
│   ├── Contact.tsx                # Client Component (form state)
│   ├── Footer.tsx                 # Server Component
│   └── ScrollButton.tsx           # Client Component (scroll handler)
├── lib/
│   ├── types.ts                   # TypeScript type definitions
│   └── utils.ts                   # Utility functions
├── public/                        # Static assets
├── next.config.ts                 # Next.js configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Dependencies and scripts
```

## 🎯 Component Architecture

### Server Components (Default)
These components render on the server for better performance and SEO:
- `Hero` - Static hero section
- `About` - Company information
- `Services` - Service listings
- `Projects` - Project showcase
- `Footer` - Footer with dynamic year

### Client Components (`'use client'`)
These require client-side interactivity:
- `Header` - Interactive navigation menu
- `Contact` - Form with state management
- `ScrollButton` - Smooth scroll handler

## 🛠️ Getting Started

### Prerequisites
- Node.js 20+ (recommended)
- npm, yarn, or pnpm

### Installation

1. Navigate to the project directory:
```bash
cd gurudev-engicon-nextJS
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development

Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

Create an optimized production build:
```bash
npm run build
```

### Running Production Build

Start the production server:
```bash
npm run start
```

### Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## 🔌 API Routes

### POST /api/contact
Handles contact form submissions with validation.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string (optional)",
  "message": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message...",
  "data": {
    "submittedAt": "ISO date string"
  }
}
```

**Integration Notes:**
- Currently logs to console (see `app/api/contact/route.ts`)
- TODO: Integrate with email service (Resend, SendGrid, Nodemailer)
- TODO: Store submissions in database (optional)

## 🎨 Design System

### Color Palette
```css
--bg-light: #f5f3ef        /* Light background */
--bg-white: #ffffff        /* Pure white */
--bg-cream: #fafaf8        /* Cream background */
--text-dark: #0a0a0a       /* Primary text */
--text-medium: #2a2a2a     /* Secondary text */
--text-grey: #5a5a5a       /* Body text */
--accent-lime: #c8f000     /* Accent color */
--accent-gold: #d4a017     /* Gold accents */
```

### Typography
- Font Family: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, etc.)
- Headings: Bold (700), varying sizes
- Body: Regular (400), 1rem base size

### Spacing Scale
```css
--spacing-xs: 0.5rem       /* 8px */
--spacing-sm: 1rem         /* 16px */
--spacing-md: 2rem         /* 32px */
--spacing-lg: 4rem         /* 64px */
--spacing-xl: 6rem         /* 96px */
```

## 🔧 Configuration Files

### next.config.ts
Next.js configuration for build optimization and features.

### tsconfig.json
TypeScript configuration with path aliases:
- `@/` maps to project root
- Strict mode enabled

### package.json
Scripts and dependencies for the project.

## 📝 Migration Notes (React → Next.js)

### Key Changes:
1. **Routing**: No React Router - Next.js uses file-based routing
2. **Components**: Split into Server/Client based on interactivity
3. **Imports**: Updated to use `@/` path alias
4. **State Management**: Client Components use React hooks
5. **API**: Form submission moved to `/api/contact` route
6. **Styles**: CSS modules approach, imported per component
7. **Metadata**: SEO handled in `layout.tsx` with Metadata API

### Performance Improvements:
- ✅ Server-side rendering for better SEO
- ✅ Automatic code splitting
- ✅ Optimized image loading (when added)
- ✅ Static generation where possible
- ✅ API routes for backend functionality

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import repository to Vercel
3. Deploy automatically

### Other Platforms
- **Netlify**: Use `next build` and deploy `.next` folder
- **Docker**: Create Dockerfile with Node.js
- **Traditional Hosting**: Build static export with `output: 'export'`

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [TypeScript](https://www.typescriptlang.org/docs)

## 🤝 Development Guidelines

### Adding New Components
1. Decide if component needs client-side interactivity
2. If YES: Add `'use client'` directive at the top
3. If NO: Keep as Server Component (default)
4. Place in `components/` directory
5. Create corresponding CSS in `app/styles/`

### Adding API Routes
1. Create directory in `app/api/[route-name]/`
2. Create `route.ts` file
3. Export async functions: `GET`, `POST`, `PUT`, `DELETE`
4. Use `NextRequest` and `NextResponse` types

### Type Safety
- Define interfaces in `lib/types.ts`
- Use utility functions from `lib/utils.ts`
- Enable strict TypeScript checking

## 📧 Contact Integration

To integrate with an email service:

1. **Install email provider** (e.g., Resend):
```bash
npm install resend
```

2. **Update `app/api/contact/route.ts`**:
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// In POST handler:
await resend.emails.send({
  from: 'noreply@yourdomain.com',
  to: 'info@gurudevengicon.com',
  subject: `New Contact: ${body.name}`,
  html: `<p>${body.message}</p>`,
});
```

3. **Add environment variable** in `.env.local`:
```
RESEND_API_KEY=your_api_key_here
```

## 🐛 Troubleshooting

### Build Errors
- Check TypeScript errors: `npm run build`
- Verify imports use `@/` prefix
- Ensure `'use client'` is on components with hooks

### CSS Not Loading
- Verify CSS import path: `../app/styles/ComponentName.css`
- Check file exists in `app/styles/` directory

### API Route Not Working
- Verify route is in `app/api/` directory
- Check file is named `route.ts`
- Ensure async function is exported

## 📄 License

Private - Gurudev Engicon Private Limited

## 👨‍💻 Developer

**Developed by:** Zecurx 
**Year:** 2025

---

For questions or support, contact the development team.
