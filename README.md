# GitHub Mutuals

A modern web application that helps users check which GitHub accounts they follow also follow them back. Built with React, TypeScript, Tailwind CSS, and Firebase.

![GitHub Mutuals Screenshot](https://via.placeholder.com/800x400/4f46e5/ffffff?text=GitHub+Mutuals+App)

## 🌟 Features

- **GitHub OAuth Login** - Optional sign-in for better API rate limits
- **Manual Username Search** - Search any public GitHub username
- **Mutual Followers Analysis** - See who follows you back
- **Non-Mutual Detection** - Identify users who don't follow you back
- **Dark/Light Mode** - Modern theme toggle
- **Search History** - Firebase-powered search tracking
- **Responsive Design** - Works on all devices
- **Real-time Results** - Fast GitHub API integration

## 🚀 Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Backend**: Firebase (Auth + Firestore)
- **API**: GitHub REST API
- **Deployment**: Ready for Vercel/Netlify

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/github-mutuals.git
   cd github-mutuals
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a new Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Authentication and add GitHub as a provider
   - Enable Firestore Database
   - Copy your Firebase config and update `src/firebase.ts`:

   ```typescript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-auth-domain",
     projectId: "your-project-id",
     storageBucket: "your-storage-bucket",
     messagingSenderId: "your-messaging-sender-id",
     appId: "your-app-id"
   };
   ```

4. **Configure GitHub OAuth**
   - Go to GitHub Settings > Developer settings > OAuth Apps
   - Create a new OAuth App with:
     - Authorization callback URL: `https://your-project.firebaseapp.com/__/auth/handler`
   - Copy the Client ID and Client Secret to Firebase Auth settings

5. **Set up Firestore Security Rules**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /searches/{document} {
         allow read, write: if true; // For demo purposes
         // In production, add proper auth rules
       }
     }
   }
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project
2. Enable Authentication > Sign-in method > GitHub
3. Enable Firestore Database
4. Update the config in `src/firebase.ts`

### GitHub OAuth Setup

1. Go to GitHub > Settings > Developer settings > OAuth Apps
2. Create new OAuth App:
   - **Application name**: GitHub Mutuals
   - **Homepage URL**: `http://localhost:5173` (for development)
   - **Authorization callback URL**: `https://your-project.firebaseapp.com/__/auth/handler`
3. Copy Client ID and Secret to Firebase Auth GitHub provider settings

### Environment Variables (Optional)

For additional security, you can use environment variables:

```bash
# .env.local
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
```

## 🎯 Usage

1. **Without Login**: Enter any GitHub username to analyze their followers
2. **With Login**: Sign in with GitHub for higher API rate limits
3. **View Results**: See mutual followers and non-mutual users
4. **Dark Mode**: Toggle between light and dark themes
5. **Search History**: All searches are automatically saved to Firebase

## 📊 API Rate Limits

- **Unauthenticated**: 60 requests/hour per IP
- **Authenticated**: 5,000 requests/hour per user

## 🔒 Privacy & Security

- No sensitive data is stored
- Only usernames and timestamps are saved to Firebase
- GitHub tokens are handled securely by Firebase Auth
- All API calls are made client-side

## 🚀 Deployment

### Vercel
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Firebase Hosting
```bash
npm run build
firebase deploy
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation and auth
│   ├── SearchForm.tsx  # Username search
│   └── UserCard.tsx    # User display component
├── contexts/           # React contexts
│   ├── AuthContext.tsx # Authentication state
│   └── ThemeContext.tsx# Dark/light mode
├── services/           # API services
│   ├── firebase.ts     # Firebase operations
│   └── github.ts       # GitHub API client
├── types.ts            # TypeScript types
├── firebase.ts         # Firebase config
├── App.tsx            # Main app component
└── main.tsx           # App entry point
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- GitHub API for providing comprehensive user data
- Firebase for authentication and database services
- Tailwind CSS for the beautiful styling system
- React team for the amazing framework

---

**Made with ❤️ by [Your Name]**
