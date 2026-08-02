export const metadata = {
  title: 'Terms of Service - News Sketch',
  description: 'Read our terms of service to understand the rules and guidelines for using News Sketch.',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold font-montserrat text-charcoal dark:text-white mb-6">
        Terms of Service
      </h1>
      <div className="prose prose-lg dark:prose-invert max-w-none font-opensans">
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <h2>1. Acceptance of Terms</h2>
        <p>
          By using News Sketch, you agree to these Terms of Service. If you do not agree, please do not use our site.
        </p>
        
        <h2>2. Content Ownership</h2>
        <p>
          All content published on News Sketch is protected by copyright. You may not reproduce, distribute, 
          or create derivative works without explicit permission.
        </p>
        
        <h2>3. User Conduct</h2>
        <p>
          You agree to use News Sketch responsibly and not to:
        </p>
        <ul>
          <li>Post harmful, abusive, or offensive content</li>
          <li>Engage in spam or unauthorized advertising</li>
          <li>Attempt to hack or disrupt our services</li>
          <li>Impersonate other users or organizations</li>
        </ul>
        
        <h2>4. Comments Policy</h2>
        <p>
          Comments are welcome and encouraged. However, we reserve the right to moderate or remove comments 
          that are inappropriate, offensive, or off-topic.
        </p>
        
        <h2>5. Limitation of Liability</h2>
        <p>
          News Sketch is provided "as is" without warranties of any kind. We are not liable for any damages 
          arising from your use of our site.
        </p>
        
        <h2>6. Changes to Terms</h2>
        <p>
          We may update these terms from time to time. Continued use of News Sketch constitutes acceptance 
          of any changes.
        </p>
        
        <h2>7. Contact Us</h2>
        <p>
          If you have any questions about these Terms of Service, please contact us at{' '}
          <a href="mailto:info@newssketch.com" className="text-deepCrimson hover:underline">
            info@newssketch.com
          </a>
        </p>
      </div>
    </div>
  );
}