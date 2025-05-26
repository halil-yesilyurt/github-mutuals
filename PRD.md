# GitHub Mutuals – Product Requirements Document

## Overview

**GitHub Mutuals** is a web application that helps users check which GitHub accounts they follow also follow them back. It supports both authenticated (logged-in) and anonymous users, and stores every search in Firebase for analytics and tracking.

---

## Goals

- ✅ Let users **log in via GitHub** or **search by username** without logging in
- 🔍 Fetch and compare `followers` vs `following` lists
- 📊 Save each search in Firebase with username and timestamp
- 🧼 Provide a modern, responsive UI

---

## Features

### 🔐 Authentication

- Optionally sign in with GitHub (OAuth)
- Signed-in users get more accurate data and session persistence

### 🔍 Search

- Input a **GitHub username**
- Fetch:
  - `followers`
  - `following`
- Compare and separate into:
  - ✅ Mutual followers
  - ❌ Users not following back

### 📦 Firebase Integration

- Use **Firebase Firestore** to store:
  - `username` (searched)
  - `timestamp`
  - `userId` (if signed in)

### 🧑‍🎨 UI/UX

- Responsive layout using **Tailwind CSS**
- Dark/light mode toggle
- Modern list view with:
  - Avatar
  - Username
  - Profile link (`https://github.com/username`)
- Loading spinners during fetch
- Error messages (invalid username, rate limits, etc.)

### ⚙️ Extra Features

- Show most recently searched usernames (global or per user)
- Limit history to latest 10–20 searches
- Option to refresh/recheck a previous search

---

## Technical Requirements

### Frontend

- React(vite) + Tailwind CSS + TypeScript
- React Router (if multiple pages needed)
- Firebase SDK for Firestore and Auth
- GitHub REST API:
  - `GET /users/{username}/followers`
  - `GET /users/{username}/following`

### Backend (via Firebase)

- Firebase Firestore:
  - Collection: `searches`
  - Document fields: `username`, `timestamp`, `userId` (optional)
- Firebase Authentication (GitHub provider)

### Logic

- Handle pagination for large follow lists
- Compare `following` and `followers` by `login` field
- Save each search to Firestore after successful API call

---

## Constraints

- GitHub REST API rate limit:
  - 60 requests/hour (unauthenticated)
  - 5000/hour (authenticated)
- GitHub API does not allow checking “who follows you” for others unless you’re logged in

---

## Milestones

1. ✅ Setup Firebase and GitHub OAuth
2. ✅ Username search + GitHub API calls
3. ✅ Compare and display results (mutual, not-following-back)
4. ✅ Save search data to Firestore
5. ✅ Build modern UI with loading + error handling
6. ✅ Add refresh, search history, and profile links
7. 🔄 Dark mode and optional improvements

---

## Success Metrics

- Users can get accurate follower comparisons
- All searches are saved in Firestore
- App remains usable within GitHub’s API limits
- UI is fast, modern, and mobile-friendly

---

## Future Enhancements

- Analytics dashboard for most searched users
- Notifications when mutuals are lost (for logged-in users)
- Export mutuals to CSV or clipboard
- Track follow/unfollow history over time

