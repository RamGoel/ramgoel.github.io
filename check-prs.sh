gh search prs \
  --author ram-sarvam \
  --limit 1000 \
  --json title,createdAt,repository,number \
  --jq '.[] | select(.title | test("[<>]") | not) | "- **\(.title)** | \(.createdAt | split("T")[0]) | \(.repository.nameWithOwner) | #\(.number)"' > pr-titles.md
