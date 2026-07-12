---
title: Turn PRs into a work update
date: 2026-07-12
---

Performance reviews, weekly updates, “what did you ship this quarter?” — the answer is usually buried across a dozen repos and a thousand GitHub tabs.

You don’t need to rebuild your memory. You need a dump of every PR you opened.

If your company uses GitHub and you have the [GitHub CLI](https://cli.github.com/) (`gh`) authenticated, one command can list them all into a markdown file.

# What you get

A file like `pr-titles.md` where each line looks like:

```text
- **feat: voice mode ui changes** | 2026-02-16 | org/repo | #279
```

Title, date, repo, PR number. Enough to skim, group, and turn into a write-up.

# The snippet

Swap `--author` for your GitHub username (or the username you use at work):

```bash
gh search prs \
  --author YOUR_GITHUB_USERNAME \
  --limit 1000 \
  --json title,createdAt,repository,number \
  --jq '.[] | select(.title | test("[<>]") | not) | "- **\(.title)** | \(.createdAt | split("T")[0]) | \(.repository.nameWithOwner) | #\(.number)"' > pr-titles.md
```

What each piece does:

- `gh search prs` — search pull requests across GitHub (not just one repo)
- `--author` — only your PRs
- `--limit 1000` — raise or lower depending how long you’ve been shipping
- `--json …` — structured fields so you can format cleanly
- `--jq …` — turn each result into a markdown bullet
- `select(.title | test("[<>]") | not)` — skip titles with `<` / `>` that break markdown
- `> pr-titles.md` — write the list to a file

# How to use it for work updates

1. Run the command from any folder.
2. Open `pr-titles.md`.
3. Filter by date range for the period you’re reporting on.
4. Group related PRs into themes (“voice mode”, “auth”, “perf”) instead of listing every title raw.
5. Turn those themes into 3–5 bullets for your manager or review form.

You’re not inventing impact — you’re summarizing what already merged.

# Tips

- Run it before 1:1s or review season so you’re not scrolling GitHub under pressure.
- If you contribute under multiple accounts, run once per `--author` and merge the files.
- Want only recent work? Pipe through dates after, or trim the markdown by the `YYYY-MM-DD` column.
- Need more than 1000? Bump `--limit` or run twice with date filters if your org is huge.

# Prerequisites

- [GitHub CLI](https://cli.github.com/) installed
- Logged in: `gh auth login`
- Access to the orgs/repos where your PRs live

That’s it. One command, one file, and suddenly “what did I do?” has a source of truth.
