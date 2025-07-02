import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { SearchForm } from './components/SearchForm';
import { UserCard } from './components/UserCard';
import { GitHubService } from './services/github';
import type { FollowComparison } from './types';
import { AuthProvider } from './contexts/AuthContext';

const INITIAL_SHOW_COUNT = 9;

function AppContent() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<FollowComparison | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showMutuals, setShowMutuals] = useState(INITIAL_SHOW_COUNT);
  const [showNotFollowingBack, setShowNotFollowingBack] = useState(INITIAL_SHOW_COUNT);

  const githubService = new GitHubService();

  const handleSearch = async (username: string) => {
    setLoading(true);
    setError(null);
    setResults(null);
    setShowMutuals(INITIAL_SHOW_COUNT);
    setShowNotFollowingBack(INITIAL_SHOW_COUNT);

    try {
      const comparison = await githubService.getMutuals(username);
      setResults(comparison);
    } catch (err: any) {
      setError(err.message || 'An error occurred while searching');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <Header />
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Hero Section */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl'>Find Your GitHub Mutuals</h2>
          <p className='mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
            Discover which GitHub users you follow that also follow you back.
          </p>
        </div>

        {/* Search Form */}
        <div className='mb-8'>
          <SearchForm onSearch={handleSearch} loading={loading} />
        </div>

        {/* Error Message */}
        {error && (
          <div className='mb-8 max-w-2xl mx-auto'>
            <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4'>
              <div className='flex'>
                <svg className='h-5 w-5 text-red-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <div className='ml-3'>
                  <h3 className='text-sm font-medium text-red-800 dark:text-red-200'>Search Error</h3>
                  <p className='mt-1 text-sm text-red-700 dark:text-red-300'>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State (only show if loading and no results yet) */}
        {loading && !results && (
          <div className='text-center py-12'>
            <svg className='animate-spin h-12 w-12 mx-auto text-blue-600 dark:text-blue-400' fill='none' viewBox='0 0 24 24'>
              <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
            <p className='mt-4 text-gray-600 dark:text-gray-300'>Analyzing followers and following lists...</p>
          </div>
        )}

        {/* Results */}
        {results && (
          <div className='space-y-8'>
            {/* Searched User Info */}
            <div className='bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>Search Results for @{results.searchedUser.login}</h3>
              <div className='flex items-center space-x-4'>
                <img
                  src={results.searchedUser.avatar_url}
                  alt={`${results.searchedUser.login} avatar`}
                  className='h-16 w-16 rounded-full'
                />
                <div>
                  <h4 className='text-xl font-bold text-gray-900 dark:text-white'>
                    {results.searchedUser.name || results.searchedUser.login}
                  </h4>
                  <p className='text-gray-600 dark:text-gray-400'>@{results.searchedUser.login}</p>
                  {results.searchedUser.bio && <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>{results.searchedUser.bio}</p>}
                  <div className='flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400'>
                    <span>{results.searchedUser.followers} followers</span>
                    <span>{results.searchedUser.following} following</span>
                    <span>{results.searchedUser.public_repos} repos</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Not Following Back */}
            <div>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center'>
                <svg className='h-6 w-6 text-red-500 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                Not Following Back ({results.notFollowingBack.length})
              </h3>
              {results.notFollowingBack.length > 0 ? (
                <>
                  <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                    {results.notFollowingBack.slice(0, showNotFollowingBack).map((user) => (
                      <UserCard key={user.id} user={user} isMutual={false} />
                    ))}
                  </div>
                  {results.notFollowingBack.length > showNotFollowingBack && (
                    <div className='flex justify-center mt-4'>
                      <button
                        className='px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors'
                        onClick={() => setShowNotFollowingBack((prev) => prev + INITIAL_SHOW_COUNT)}
                      >
                        Show More
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className='text-center py-8 text-gray-500 dark:text-gray-400'>
                  <svg
                    className='h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                  <p>Everyone you follow follows you back! 🎉</p>
                </div>
              )}
            </div>

            {/* Mutual Followers */}
            <div>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center'>
                <svg className='h-6 w-6 text-green-500 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                Mutual Followers ({results.mutuals.length})
              </h3>
              {results.mutuals.length > 0 ? (
                <>
                  <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                    {results.mutuals.slice(0, showMutuals).map((user) => (
                      <UserCard key={user.id} user={user} isMutual={true} />
                    ))}
                  </div>
                  {results.mutuals.length > showMutuals && (
                    <div className='flex justify-center mt-4'>
                      <button
                        className='px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors'
                        onClick={() => setShowMutuals((prev) => prev + INITIAL_SHOW_COUNT)}
                      >
                        Show More
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className='text-center py-8 text-gray-500 dark:text-gray-400'>
                  <svg
                    className='h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                    />
                  </svg>
                  <p>No mutual followers found</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
     <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
