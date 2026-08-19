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
- Google and email/password sign-in through Firebase Authentication.
- A protected portal: users must sign in before viewing client data.
- Shared real-time client and resource data stored in Cloud Firestore.

The first authenticated user seeds the demonstration clients and resources into an empty Firestore database. Later additions and edits are shared with other signed-in users immediately.

## Tech stack

- Next.js 16 with the App Router
- React and TypeScript
- CSS with reusable components and CSS variables
- Firebase Authentication (Google and email/password providers)
- Cloud Firestore for shared client and resource data
- GitHub for source control and pull requests
- Vercel for deployment and preview deployments

## Run locally

Prerequisites: Node.js 20.9 or later.

Create `.env.local` in the project root and add your Firebase Web app configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-value
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-value
NEXT_PUBLIC_FIREBASE_APP_ID=your-value
```

The `.env.local` file is intentionally ignored by Git. Do not commit it.

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
lib/                          Types, sample data, Firebase setup, and Firestore hook
prototype-v1/                 Original HTML, CSS, and JavaScript prototype
```

## Development approach

1. Read the brief and turn the requirements into the core flow: Dashboard → Clients → Client Profile → Resources.
2. Create a visual prototype with plain HTML, CSS, and JavaScript in `prototype-v1/`.
3. Commit the original prototype to GitHub so the development progression is visible.
4. Scaffold a Next.js application with `create-next-app` and preserve the original prototype.
5. Rebuild the interface as route-based Next.js pages and reusable React components.
6. Add client management, resource categories, dark mode, and responsive styling.
7. Add Firebase Authentication and Firestore for protected, shared portal data.
8. Connect the GitHub repository to Vercel for preview and production deployment workflows.

## Using AI during the exercise

AI was used as a development assistant, not as a replacement for checking the work. It helped to:

- Explain the demo requirements and turn them into an achievable scope.
- Create an initial visual design and mock-up with HTML, CSS, and JavaScript.
- Explain Git commits, branches, pull requests, and the process of moving a static prototype into Next.js.
- Explain how to initialise a Next.js app, use the App Router, and document the local setup.
- Explain how to connect the GitHub repository to Vercel and use preview deployments.
- Help convert the original design into reusable Next.js components.
- Debug implementation issues, including missing page exports, dynamic routes, native dialog behaviour, route-aware navigation, Firebase configuration, Firestore permissions, and TypeScript build errors.

The main learning was to give AI clear context, review the generated code, test each change locally, and use error messages as evidence rather than accepting a suggested fix without verification.

## Git and deployment workflow

The project is developed in focused branches, for example:

```text
main                         Approved/deployed version
feature/nextjs-setup         Next.js foundation
feature/client-dashboard     Portal interface and client features
feature/firebase-auth-firestore Firebase Authentication and Firestore
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

## Firebase setup and deployment

1. In Firebase Console, enable **Google** and **Email/Password** under Authentication.
2. Create a Cloud Firestore database.
3. Publish these starter Firestore rules so only signed-in users can access the prototype:

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

4. Add `localhost` and the Vercel deployment domain to Authentication → Settings → Authorized domains.
5. Add the six `NEXT_PUBLIC_FIREBASE_…` variables above to Vercel for both Preview and Production, then redeploy.

These rules are appropriate only for the internal demonstration. A production client portal should introduce user roles and client-specific access rules before sharing data with external clients.

## Current limitations

- This is a demonstration portal, not a production service.
- All authenticated users currently have access to the same demo data; role-based and client-specific access is not implemented.
- Resource uploads currently create metadata examples; they do not upload real files.
- File previews, downloads, and true media storage are intentionally out of scope for this demo.
