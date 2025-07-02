# Firebase Setup Guide

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Enter project name (e.g., "github-mutuals")
4. Enable Google Analytics (optional)
5. Click "Create project"

## 2. Enable Authentication

1. In Firebase console, go to "Authentication" > "Sign-in method"
2. Click on "GitHub" provider
3. Enable it
4. You'll need to set up GitHub OAuth app first (see step 3)
5. Enter your GitHub OAuth app's Client ID and Client Secret
6. Copy the Authorization callback URL (looks like: `https://your-project-id.firebaseapp.com/__/auth/handler`)

## 3. Create GitHub OAuth App

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: `Mutuals Finder` (or any name that doesn't start with "GitHub" or "Gist")
   - **Homepage URL**: `http://localhost:5178` (use your current dev server port)
   - **Application description**: `Find mutual followers on GitHub` (optional)
   - **Authorization callback URL**: (paste from Firebase step 2)
4. Click "Register application"
5. Copy the Client ID and Client Secret to Firebase Authentication settings

## 4. Enable Firestore

1. In Firebase console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location close to you
5. Click "Done"

## 5. Get Firebase Configuration

1. In Firebase console, go to Project Settings (gear icon)
2. In "Your apps" section, click "Web" icon
3. Register your app with a name
4. Copy the configuration object

## 6. Create .env File

Create a `.env` file in your project root with:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

## 7. Update Firestore Rules (Optional)

For production, update Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /searches/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Troubleshooting

- **Authentication not working**: Check if your domain is added to authorized domains in Firebase Auth settings
- **Popup blocked**: Make sure popups are enabled for your domain
- **Token not found**: This is normal - the app will work with limited API rates without GitHub token
- **OAuth app name error**: Don't use names starting with "GitHub" or "Gist" - use names like "Mutuals Finder", "Social Connect", etc. 