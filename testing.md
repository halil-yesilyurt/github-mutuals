# Testing Guide for GitHub Mutuals

This document describes how to test the GitHub Mutuals project, including manual test cases, edge cases, data collection checks, privacy policy checks, and suggestions for automated testing.

---

## 1. Manual Testing

### A. Unauthenticated User
- **Steps:**
  1. Open the app in a private/incognito window.
  2. Search for a popular GitHub username (e.g., `reactjs`).
  3. Confirm results are shown (if under rate limit).
  4. Rapidly search for several usernames to intentionally hit the rate limit.
  5. Confirm you see the "API rate limit exceeded" error.

### B. Sign-In Flow
- **Steps:**
  1. After hitting the rate limit, sign in with GitHub.
  2. Confirm the page resets, your username autofills, and a search is triggered.
  3. Confirm you can now search for more usernames without hitting the rate limit.

### C. Sign-Out Flow
- **Steps:**
  1. Sign out.
  2. Confirm the page resets (search bar, results, and errors clear).
  3. Try searching again as an unauthenticated user.

### D. Data Collection
- **Steps:**
  1. Search for a username (signed in and not signed in).
  2. Check your Firestore `searches` collection for new entries with correct fields:
     - `username`
     - `timestamp`
     - `userId` (null if not signed in)
     - `userAgent`
     - `referrer`

### E. Privacy Policy
- **Steps:**
  1. Visit `/privacy` in your browser.
  2. Confirm the privacy policy is visible and correct.

---

## 2. Edge Cases

- **Non-existent user:**
  - Search for a gibberish username (e.g., `asdkfjhasdkjfh`).
  - Should show "User not found" error.

- **User with no mutuals:**
  - Search for a user with no mutual followers.
  - Should show "No mutual followers found."

- **User with many followers/following:**
  - Search for a user with a large number of followers/following (test pagination).

- **Empty input:**
  - Try to search with an empty input.
  - Search button should be disabled.

- **After sign-out:**
  - Search, then sign out.
  - Page should reset (input, results, errors cleared).

---

## 3. Cross-Browser & Device Testing

- Test on Chrome, Firefox, Safari, and Edge.
- Test on both mobile and desktop devices.

---

## 4. Automated Testing (Suggestions)

- **Unit tests:**
  - Test utility functions (e.g., API response parsing).
- **Integration tests:**
  - Test API service modules (mock fetch, test error handling).
- **End-to-end (E2E) tests:**
  - Use Cypress or Playwright to simulate real user flows:
    - Sign in, search, sign out, error handling, autofill, etc.

---

## 5. Summary Table

| Use Case                        | Steps                                                                 | Expected Result                        |
|----------------------------------|-----------------------------------------------------------------------|----------------------------------------|
| Unauthenticated search           | Search for username, hit rate limit                                  | Error shown, prompt to sign in         |
| Sign in after error              | Sign in after rate limit error                                       | Page resets, autofill, search triggers |
| Sign out                        | Click sign out                                                       | Page resets, input cleared             |
| Data collection                  | Search, check Firestore                                              | Entry with correct fields              |
| Privacy policy                   | Visit `/privacy`                                                     | Policy visible                         |
| Edge: non-existent user          | Search for gibberish username                                        | "User not found" error                 |
| Edge: empty input                | Try to search with empty input                                       | Button disabled                        |

---

## 6. Additional Notes

- If you want to add automated tests, consider using [Jest](https://jestjs.io/) for unit/integration and [Cypress](https://www.cypress.io/) or [Playwright](https://playwright.dev/) for E2E.
- Always test with both authenticated and unauthenticated users.
- Check Firestore for data collection after each search.
- If you encounter issues, use browser dev tools (Console/Network tabs) for debugging.

---

Happy testing! 