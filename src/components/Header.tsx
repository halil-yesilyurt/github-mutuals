import { useAuth } from '../contexts/AuthContext';

export function Header() {
  const { currentUser, login, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                GitHub Mutuals
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Find your mutual followers
              </p>
            </div>
          </div>
          {/* Auth Button and User Info */}
          <div className="ml-auto flex items-center space-x-4">
            {currentUser && (
              <div className="flex items-center space-x-2">
                {currentUser.photoURL && (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'User'}
                    className="h-8 w-8 rounded-full"
                  />
                )}
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {currentUser.displayName || currentUser.email}
                </span>
              </div>
            )}
            {currentUser ? (
              <button
                onClick={logout}
                className="flex items-center space-x-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-sm font-medium"
              >
                <span>Sign out</span>
              </button>
            ) : (
              <button
                onClick={login}
                className="flex items-center space-x-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-sm font-medium"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.877.617.113.844-.267.844-.595 0-.293-.011-1.07-.017-2.099-3.338.726-4.042-1.61-4.042-1.61-.562-1.428-1.375-1.808-1.375-1.808-1.125-.77.086-.755.086-.755 1.244.087 1.899 1.278 1.899 1.278 1.106 1.896 2.902 1.349 3.612 1.032.112-.801.433-1.349.787-1.66-2.665-.304-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.625-5.475 5.921.444.383.839 1.138.839 2.294 0 1.655-.015 2.988-.015 3.396 0 .33.224.713.85.592C18.345 21.125 22 16.991 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span>Sign in with GitHub</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 