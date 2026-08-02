export const metadata = {
  title: 'Privacy Policy - News Sketch',
  description: 'Read our privacy policy to understand how we handle your data.',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold font-montserrat text-charcoal dark:text-white mb-6">
        Privacy Policy
      </h1>
      <div className="prose prose-lg dark:prose-invert max-w-none font-opensans">
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <h2>1. Information We Collect</h2>
        <p>
          News Sketch collects information you provide directly, such as when you subscribe to our newsletter, 
          leave a comment, or contact us. This may include your name, email address, and any other information 
          you choose to provide.
        </p>
        
        <h2>2. How We Use Your Information</h2>
        <p>
          We use the information we collect to:
        </p>
        <ul>
          <li>Send you newsletters and updates</li>
          <li>Respond to your comments and inquiries</li>
          <li>Improve our content and user experience</li>
          <li>Analyze site traffic and usage patterns</li>
        </ul>
        
        <h2>3. Cookies</h2>
        <p>
          We use cookies to enhance your experience on our site. Cookies help us understand how you interact 
          with our content and improve our services. You can control cookie preferences in your browser settings.
        </p>
        
        <h2>4. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal information 
          against unauthorized access, alteration, or destruction.
        </p>
        
        <h2>5. Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal information. You can also opt out of 
          receiving our newsletters at any time by clicking the unsubscribe link in any email.
        </p>
        
        <h2>6. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at{' '}
          <a href="mailto:info@newssketch.com" className="text-deepCrimson hover:underline">
            info@newssketch.com
          </a>
        </p>
      </div>
    </div>
  );
}