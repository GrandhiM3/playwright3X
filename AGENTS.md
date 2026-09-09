# AGENTS.md

## Project

- This is a Playwright test project.
- Tests are in `tests/` and the Playwright configuration is `playwright.config.ts`.
- Generated `playwright-report/`, `test-results/`, and dependency directories are not intentional source changes.

## Go-go-go workflow

Use this workflow for every change. Keep the work on `main`; do not create, switch to, or merge feature branches.

1. Inspect the starting state:

   ```powershell
   git status --short --branch
   git diff --stat
   git diff --check
   git diff
   ```

   Understand and preserve unrelated user changes. Do not discard them or reset the worktree.

2. Make the smallest focused change. Keep credentials, tokens, private keys, and other secrets out of source, test data, logs, screenshots, and commits. Use environment variables for values that must be supplied locally.

3. Run the relevant Playwright tests. For a focused change, run the affected spec first; before committing, run the complete suite:

   ```powershell
   npx playwright test tests/<affected-file>.spec.ts
   npx playwright test
   ```

   The configured suite covers Chromium, Firefox, and WebKit. If browsers are missing, install the required Playwright browsers and rerun the tests. Investigate failures before committing; do not hide them by weakening assertions or skipping tests.

4. Check for accidental secrets before staging. Review both the working tree and the final staged diff. This is a quick high-signal scan, not a substitute for reviewing every match:

   ```powershell
   git grep -n -I -E 'AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9_]+|AIza[0-9A-Za-z_-]{20,}|-----BEGIN [A-Z ]+PRIVATE KEY-----|[Pp]assword[[:space:]]*[:=]|[Ss]ecret[[:space:]]*[:=]|[Tt]oken[[:space:]]*[:=]' -- . ':(exclude)package-lock.json'
   git diff -- . ':!package-lock.json' | Select-String -Pattern 'AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9_]+|AIza[0-9A-Za-z_-]{20,}|BEGIN [A-Z ]+PRIVATE KEY|password|secret|token' -CaseSensitive:$false
   ```

   Review every hit for false positives. If a real secret is found, remove it from the change, rotate it when applicable, and do not paste it into chat or commit history.

5. Stage only intentional files by naming them explicitly. Never use `git add .`, `git add -A`, or `git commit -am` for this workflow:

   ```powershell
   git add -- path/to/intentional-file another/intentional-file
   git status --short
   git diff --cached --check
   git diff --cached --stat
   git diff --cached
   git diff --cached --name-only
   ```

   Confirm that every staged path is intentional, contains no secrets, and excludes generated reports, test results, screenshots, and local configuration.

6. Keep the root `README.md` complete and up to date with the project:

   - If it does not exist, create it with accurate project documentation.
   - Preserve all existing relevant project information; do not unnecessarily remove, overwrite, or replace README content.
   - Whenever there are intentional project or code changes, update the README to accurately reflect them.
   - Keep important project structure, setup instructions, concepts, examples, usage instructions, and other relevant project documentation current.
   - Do not document generated files, temporary artifacts, secrets, tokens, private keys, or unrelated files.
   - Before committing, verify that the README reflects the latest intentional changes and that no existing relevant information was lost. Include any README change in the intentional-file review and staging checks.

7. Confirm the branch and commit with a clear imperative message:

   ```powershell
   git branch --show-current
   git commit -m "Describe the change clearly"
   ```

   The branch must be `main`. Do not amend or rewrite existing commits unless explicitly requested.

8. Before pushing, stop and ask the user for approval. Summarize the test result, commit hash/message, staged files, and the exact destination `origin/main`. Do not run the push command until the user explicitly approves it.

9. After approval, verify the branch and push only to the tracked main branch:

   ```powershell
   git status --short --branch
   git branch --show-current
   git push origin main
   ```

   Never force-push. Report the push result and any remaining worktree changes.

## Test commands

- Focused spec: `npx playwright test tests/<file>.spec.ts`
- Full suite: `npx playwright test`
- HTML report: `npx playwright show-report`
