export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-lg shadow p-8 border border-gray-200 dark:border-gray-700 mt-12">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Privacy Policy</h1>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          <strong>What we collect:</strong> When you use GitHub Mutuals, we collect the usernames you search for, the time of your search, your browser information (user agent), and the referring page (if any). If you are signed in, we also store your user ID. We do <strong>not</strong> collect your IP address or any sensitive personal information.
        </p>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          <strong>Why we collect it:</strong> This data helps us understand how the app is used, improve our service, and prevent abuse. We do not sell or share your data with third parties.
        </p>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          <strong>How your data is used:</strong> Data is stored securely in our database and used only for analytics and app improvement. You can contact us to request deletion of your data.
        </p>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          By using this site, you consent to this data collection. For questions, contact the site owner.
        </p>
        <a href="/" className="text-blue-600 dark:text-blue-400 underline">Back to Home</a>
      </div>
    </div>
  );
} 