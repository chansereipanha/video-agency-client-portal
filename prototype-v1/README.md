# Cutroom — demo client portal

A functional, front-end-only prototype for a video production agency. It demonstrates a simple route from **Dashboard → Clients → Client profile → Resources**, with client creation, editing, searching, and filtered content-library states.

## Run it

Open `index.html` in a modern browser. No install or build step is needed. For live reload in VS Code, the **Live Server** extension is a convenient option.

## What to try

- Use **Clients** to search the directory and open a profile.
- Select **Add client** and save the form; the new client appears immediately.
- Open any profile and choose **Edit client** to update its details.
- Browse **Content library** and switch the resource category.

The sample data is intentionally held in browser memory in `app.js`, so refreshing restores the original demo. This keeps the prototype easy to run without keys or an external account.

## Production path: Firebase

| Prototype concept | Firebase implementation |
| --- | --- |
| `clients` array | Firestore `clients` collection |
| Add/edit form | `addDoc` / `updateDoc` with validation |
| Client resources | `clients/{clientId}/resources` or a top-level `resources` collection with `clientId` |
| Placeholder thumbnails/files | Firebase Storage objects; save their metadata and download URL in Firestore |
| Team identity | Firebase Authentication, then protect routes and security rules by organisation/role |

Do not place Firebase admin credentials or other secrets in front-end source. Use Firebase Security Rules and environment variables for public configuration.

## Suggested workflow and milestones

1. Create a GitHub repository and make an initial commit for the static prototype.
2. Create a feature branch (for example `feature/firebase-data`) before adding Firebase.
3. Add Authentication, Firestore collections and Storage; test security rules with non-admin accounts.
4. Use a pull request for review. A GitHub Actions workflow can run lint/tests on each push and deploy previews or production to Vercel/Firebase Hosting after approval.
5. Add a custom domain and monitor errors after deployment.

## Research notes for Week One

- **ChatGPT** helps turn requirements into plans, clarify unfamiliar concepts, generate small examples, review edge cases and explain errors. Treat its output as a starting point: verify code, dependencies and security choices.
- **OpenAI Codex** works in the development environment and repository: it can inspect files, implement scoped changes, run checks, help diagnose failures and prepare documentation. Good use means supplying clear context and reviewing the resulting diff.
- **VS Code** is the local workspace: install Node.js, Git and suitable extensions; use the integrated terminal, source control panel, debugger and formatter.
- **Firebase** is a backend platform. Firestore is its document database; Authentication establishes who a user is; Storage holds media. Firestore data is organised into collections and documents, with rules governing what users can read or write.
- **GitHub** hosts repositories and enables collaboration. Branches isolate work; commits form a history; pull requests invite review; workflows automate repeatable checks and deployment (CI/CD).
- **Deployment** makes an approved build reachable online. A common flow is push → automated checks → preview deployment → PR approval → production deployment. Vercel suits front-end deployments; Firebase Hosting fits naturally when using Firebase services.

For the requested research deadline of **Saturday, 22 August 2026**, use this as a working vocabulary, then practise each concept in the project rather than aiming for theory alone.
