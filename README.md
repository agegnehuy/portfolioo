# Agegnehu Yelib Tesfa — Portfolio

A responsive personal portfolio for showcasing my software-development work, services, articles, certificates, and professional background.

**Live website:** [agegnehuy.com](https://agegnehuy.com)

## Features

- Responsive portfolio homepage
- Interactive Three.js/WebGL hero scene
- Project gallery and case-study pages
- Services, process, insights, FAQ, privacy, and terms pages
- Contact form delivered through FormSubmit
- Supabase-powered projects, certificates, testimonials, and comments
- Comment moderation before public display
- Protected administrator dashboard
- Image uploads through Supabase Storage
- Accessible navigation and reduced-motion support

## Technology

- React 18 and Vite
- Tailwind CSS
- Three.js
- React Router
- Supabase Database, Authentication, Realtime, and Storage
- Framer Motion and AOS
- Lucide React and Material UI
- SweetAlert2
- FormSubmit

## Local setup

### Requirements

- Node.js 18 or newer
- npm
- A Supabase project

### Installation

Clone your GitHub repository and enter the project directory:

```bash
git clone <your-repository-url>
cd <your-repository-folder>
npm install --legacy-peer-deps
```

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

The public Supabase anonymous key is intended for browser applications. Security must still be enforced with Row Level Security policies. Never commit the service-role key or your `.env` file.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Supabase setup

Open **Supabase Dashboard → SQL Editor** and run the migrations in this order:

1. `supabase/migrations/20260925_portfolio_brief.sql`
2. `supabase/migrations/20260927_fix_site_content.sql`
3. `supabase/migrations/20260927_fix_dashboard_content.sql`
4. `supabase/migrations/20260927_comment_moderation.sql`

These migrations create and configure the portfolio content, dashboard data, testimonials, comments, moderation fields, and Row Level Security policies.

Enable Realtime for `portfolio_comments` if live comment updates are required.

### Create an administrator

1. In Supabase, open **Authentication → Users** and create your user.
2. Copy the new user UUID.
3. Insert the matching administrator profile:

```sql
insert into public.profiles (id, username, role)
values ('YOUR_USER_UUID', 'agegnehuy', 'admin');
```

The dashboard is available at `/login`. Administrative access is enforced by Supabase policies, not only by the frontend route.

## Contact form

The contact form sends messages to `agegnehuyelib01@gmail.com` through FormSubmit.

After the first submission:

1. Open the activation email from FormSubmit.
2. Confirm the form.
3. Send another test message from the deployed website.
4. Check the inbox and spam folder.

Contact messages are delivered by email and are not stored in Supabase.

## Production build

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`.

## Deploy with GitHub and Vercel

1. Push this repository to GitHub.
2. Import the repository into Vercel.
3. Choose the **Vite** framework preset.
4. Use `npm run build` as the build command.
5. Use `dist` as the output directory.
6. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel Environment Variables.
7. Deploy and connect the GoDaddy domain under **Vercel → Project Settings → Domains**.

The repository root is already the application root, so a separate Vercel root directory is not required. The included `vercel.json` keeps React Router pages working when opened directly.

After setup, every push to the `main` branch automatically creates a new production deployment:

```bash
git add .
git commit -m "Describe your changes"
git push origin main
```

## Available scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint checks |

## Project structure

```text
public/                 Static images, documents, and metadata
src/
  components/           Shared interface components
  Pages/                Public pages and dashboard pages
  content/              Local fallback content
  supabase.js           Supabase browser client
supabase/
  migrations/           Database migrations and security policies
vercel.json             SPA routing configuration for Vercel
```

## Before deployment

- Run every Supabase migration.
- Confirm the admin account can access the dashboard.
- Test project, certificate, article, and comment management.
- Confirm new comments remain hidden until approved.
- Activate and test the contact form.
- Add production environment variables to Vercel.
- Run `npm run build`.
- Check desktop and mobile layouts.
- Make sure no passwords, service-role keys, or `.env` files are committed.

## Author

**Agegnehu Yelib Tesfa**

- Website: [agegnehuy.com](https://agegnehuy.com)
- GitHub: [github.com/agegnehuy](https://github.com/agegnehuy)
- Email: [agegnehuyelib01@gmail.com](mailto:agegnehuyelib01@gmail.com)

## Development disclosure

Implementation and editorial drafting were assisted by AI tools. Final code, content, factual claims, permissions, security configuration, and publication decisions are reviewed and owned by Agegnehu Yelib Tesfa.
