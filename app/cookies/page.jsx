export const metadata = {
  title: 'Cookie Policy - News Sketch',
  description: 'Read our cookie policy to understand how we use cookies on News Sketch.',
};

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold font-montserrat text-charcoal dark:text-white mb-6">
        Cookie Policy
      </h1>
      <div className="prose prose-lg dark:prose-invert max-w-none font-opensans">
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <h2>1. What Are Cookies</h2>
        <p>
          Cookies are small text files placed on your device when you visit a website. They help us remember 
          your preferences and improve your browsing experience.
        </p>
        
        <h2>2. How We Use Cookies</h2>
        <p>
          We use cookies for the following purposes:
        </p>
        <ul>
          <li>Essential: To enable basic site functionality</li>
          <li>Preferences: To remember your settings (like dark mode)</li>
          <li>Analytics: To understand how visitors use our site</li>
          <li>Marketing: To deliver relevant content and advertisements</li>
        </ul>
        
        <h2>3. Types of Cookies We Use</h2>
        <ul>
          <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser</li>
          <li><strong>Persistent Cookies:</strong> Remain on your device until you delete them</li>
          <li><strong>Third-Party Cookies:</strong> Set by external services we use</li>
        </ul>
        
        <h2>4. Managing Cookies</h2>
        <p>
          You can control and manage cookies in your browser settings. Most browsers allow you to:
        </p>
        <ul>
          <li>View and delete cookies</li>
          <li>Block third-party cookies</li>
          <li>Block all cookies</li>
          <li>Clear cookies when you close your browser</li>
        </ul>
        
        <h2>5. Changes to This Policy</h2>
        <p>
          We may update this Cookie Policy from time to time. Please check back regularly for any changes.
        </p>
        
        <h2>6. Contact Us</h2>
        <p>
          If you have any questions about our use of cookies, please contact us at{' '}
          <a href="mailto:info@newssketch.com" className="text-deepCrimson hover:underline">
            info@newssketch.com
          </a>
        </p>
      </div>
    </div>
  );
}