# Commit & Release Cadence (internal notes)

Goal: build toward ~1000 commits without turning the history into noise, and without
version-bumping on every commit.

## Rule of thumb

- 1 commit = 1 logical change. Don't bundle "add pattern + fix typo in README + bump
  a dependency" into one commit — split them.
- Typical commit sizes that are totally fine:
  - Add one new error pattern (`feat(patterns): ...`)
  - Add the test for that pattern (`test(patterns): ...`)
  - Fix a bug in the parser for one edge case (`fix(parser): ...`)
  - Tweak the CLI output formatting (`refactor(cli): ...`)
  - Update one section of README or CONTRIBUTING (`docs: ...`)
  - Bump one dependency (`chore(deps): ...`)
- This naturally produces many small, reviewable commits — no need to artificially
  inflate the count by splitting things that don't make sense split (e.g. don't make
  a separate commit per line of a single function).

## What does NOT get its own commit

- `package.json` version bumps — only happen in a release commit (see below), not
  scattered throughout development.
- Auto-generated files (`dist/`) — these are gitignored and never committed directly.

## Release commits

- Cut roughly every 10-20 merged feature/fix commits, or whenever a meaningful chunk
  of work (e.g. "5 new error patterns" or "Windows path support") is complete.
- A release commit:
  1. Bumps `version` in `package.json` (SemVer).
  2. Moves `[Unreleased]` entries in `CHANGELOG.md` into a new dated version section.
  3. Is tagged in git (`git tag vX.Y.Z`).
  4. Uses the message `chore(release): vX.Y.Z`.

## Roadmap of natural commit sources (for hitting 1000 over time)

- New error pattern + its test + README table update = 3 commits per pattern.
  Aiming for 50-100 patterns over the project's life is itself 150-300 commits.
- CLI improvements: `--json` output mode, `--watch` mode, color/no-color flag,
  config file support, ignoring specific error codes, etc. — each is multiple
  commits (implementation, tests, docs).
- Editor integrations (VS Code extension) as a separate future package.
- Community-contributed patterns via PRs.
- Ongoing dependency and CI maintenance.
