---
title: Script to accept all invites on Linkedin
date: 2024-12-24
---

If you want to accept multiple LinkedIn connection requests quickly, follow these simple steps. No coding experience is needed — just copy and paste a script.

# Open LinkedIn on Your Browser

Go to this URL which shows your all [pending invites](https://www.linkedin.com/mynetwork/invitation-manager/)

# Open the Browser Console

1. Right-click anywhere on the page and select Inspect (or press Ctrl + Shift + I on Windows / Cmd + Option + I on Mac).
2. In the window that opens, navigate to the Console tab.

# Copy and Paste the Script

Copy the following script and paste it into the console, and press enter.

```javascript
Array.from(
    document.querySelectorAll(
        '.artdeco-button.artdeco-button--2.artdeco-button--secondary.ember-view.invitation-card__action-btn'
    )
)
    .slice(0, 5)
    .map((item) => item.click())
```

# Watch the Magic Happen

The script will automatically click the first 5 “Accept” buttons on your pending invites. We’ve made it 5 for caution. Change the number 5 in .slice(0, 5) according to how much invitations you want to accept

# Important Notes

-   This script processes 5 invites at a time to avoid LinkedIn flagging your account for unusual activity. Adjust the slice(0, 5) part to increase or decrease the batch size if needed.
-   Use responsibly — don’t go overboard accepting hundreds of requests at once.

That’s it! With just a few clicks, you can speed up your LinkedIn networking efforts and save tons of time. 🎉
