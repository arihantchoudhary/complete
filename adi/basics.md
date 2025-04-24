# Complete Project Setup Guide

## 1. Fork & Sync on GitHub
- Navigate to your fork:
  https://github.com/adityapattani18/complete

- Sync your fork with upstream: click "Sync fork" in the GitHub UI.

## 2. Clone & Local Setup
- Open your IDE/Editor (e.g., Cursor)
- Open integrated terminal (`Ctrl + \``)
- Fetch & pull updates
  ```bash
  git fetch --all
  git status
  git pull
  ```
- Re‑index files (e.g., Cmd + L in some editors)

## 3. Install & Run Locally
- Remove stale lockfile (if needed):
  ```bash
  rm package-lock.json
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Start dev server:
  ```bash
  npm run dev
  ```
- Verify: Open http://localhost:3000 in your browser.

## 4. Make Changes & Commit
- Stage all changes:
  ```bash
  git add .
  ```
- Commit with message:
  ```bash
  git commit -m "Describe your change"
  ```
- Push to your fork:
  ```bash
  git push
  ```

## 5. Create & Merge Pull Request
- Go to your GitHub fork in browser.
- Open a new Pull Request against the upstream main branch.
- Review & merge once approved.

Result: Your updates will automatically deploy to complete.city.
