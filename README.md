# Cutroom — Video Agency Client Portal

Cutroom is a demo client-management and content portal for a video production agency. It was built as a Week One development exercise for Wolfgramm Holdings to demonstrate planning, local development, AI-assisted problem-solving, GitHub workflow, Next.js, and deployment preparation.

## What the demo does

- Dashboard with active-client, project, and asset summaries.
- Client directory with search and sorting by name, industry, or asset count.
- Add and edit client records.
- Individual client profiles with contact details, notes, and resource categories.
- Client resources organised as edited videos, short-form videos, raw footage, photos, graphics, documents, and other files.
- Content Library filters by resource category and client.
- Add sample resources to a client profile.
- Responsive layout, route-aware navigation, clickable breadcrumbs, and a persistent dark-mode toggle.

For this prototype, client/resource changes are saved in the browser with `localStorage`, so they survive refreshes in the same browser. Firebase will replace this temporary persistence in the next phase.

## Tech stack

- Next.js 16 with the App Router
- React and TypeScript
- CSS with reusable components and CSS variables
- Browser local storage for prototype persistence
- GitHub for source control and pull requests
- Vercel for deployment and preview deployments

## Run locally

Prerequisites: Node.js 20.9 or later.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If port 3000 is occupied, Next.js will display another local URL in the terminal.

Useful checks:

```bash
npm run lint
npm run build
```

> The production build can require access to Google Fonts while the Geist font is enabled. Vercel normally has that access; a restricted local network may block it.

## Project structure

```text
app/
  page.tsx                    Dashboard
  clients/page.tsx            Client directory
  clients/[clientId]/page.tsx Client profile
  library/page.tsx            Content library
components/                   Reusable navigation and interface components
lib/                          Types, sample data, and local persistence hook
prototype-v1/                 Original HTML, CSS, and JavaScript prototype
```

## Development approach

1. Read the brief and turn the requirements into the core flow: Dashboard → Clients → Client Profile → Resources.
2. Create a visual prototype with plain HTML, CSS, and JavaScript in `prototype-v1/`.
3. Commit the original prototype to GitHub so the development progression is visible.
4. Scaffold a Next.js application with `create-next-app` and preserve the original prototype.
5. Rebuild the interface as route-based Next.js pages and reusable React components.
6. Add client management, resource categories, client-side persistence, dark mode, and responsive styling.
7. Connect the GitHub repository to Vercel for preview and production deployment workflows.

## Using AI during the exercise

AI was used as a development assistant, not as a replacement for checking the work. It helped to:

- Explain the demo requirements and turn them into an achievable scope.
- Create an initial visual design and mock-up with HTML, CSS, and JavaScript.
- Explain Git commits, branches, pull requests, and the process of moving a static prototype into Next.js.
- Explain how to initialise a Next.js app, use the App Router, and document the local setup.
- Explain how to connect the GitHub repository to Vercel and use preview deployments.
- Help convert the original design into reusable Next.js components.
- Debug implementation issues, including missing page exports, dynamic routes, native dialog behaviour, route-aware navigation, and client/server rendering concerns such as hydration mismatches caused by branching on `typeof window` during the initial render.

The main learning was to give AI clear context, review the generated code, test each change locally, and use error messages as evidence rather than accepting a suggested fix without verification.

## Git and deployment workflow

The project is developed in focused branches, for example:

```text
main                         Approved/deployed version
feature/nextjs-setup         Next.js foundation
feature/client-dashboard     Portal interface and client features
feature/firebase-integration Firebase services (next)
```

Recommended workflow:

```text
Create feature branch
→ build and test locally
→ commit focused changes
→ push to GitHub
→ review Vercel preview deployment
→ open pull request
→ merge into main
→ Vercel deploys production
```

## Next phase: Firebase

The current local-storage prototype is ready to connect to Firebase:

1. Enable Firebase Authentication with Google sign-in for team members.
2. Move client records and resource metadata into Cloud Firestore.
3. Upload actual video, image, and document files to Firebase Storage.
4. Store the Firebase Storage path and download URL with each Firestore resource record.
5. Add Firestore and Storage Security Rules so only authenticated, authorised users can access agency data.
6. Add Firebase environment variables to Vercel for Preview and Production deployments.

## Current limitations

- This is a demonstration portal, not a production service.
- Client and resource data are browser-specific until Firestore is connected.
- Resource uploads currently create metadata examples; they do not upload real files.
- Authentication, user roles, client-only sharing, file previews, and download permissions are planned Firebase additions.
