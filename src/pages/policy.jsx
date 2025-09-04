import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 mb-8 text-center">
          Last Updated: August 20, 2025
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
          <p className="text-gray-600">
            We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our website and services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
          <p className="text-gray-600">
            We may collect the following types of information:
            <ul className="list-disc pl-6 mt-2">
              <li>Personal Information: Name, email address, and contact details you provide when registering or contacting us.</li>
              <li>Usage Data: Information about how you interact with our services, such as IP addresses, browser type, and pages visited.</li>
              <li>Cookies: We use cookies to enhance your experience and analyze site usage. You can manage cookie preferences through your browser settings.</li>
            </ul>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
          <p className="text-gray-600">
            Your information may be used to:
            <ul className="list-disc pl-6 mt-2">
              <li>Provide and improve our services.</li>
              <li>Communicate with you, including responding to inquiries and sending updates.</li>
              <li>Analyze usage trends to enhance user experience.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Sharing Your Information</h2>
          <p className="text-gray-600">
            We do not sell your personal information. We may share your information with:
            <ul className="list-disc pl-6 mt-2">
              <li>Service providers who assist in operating our services.</li>
              <li>Legal authorities when required by law or to protect our rights.</li>
            </ul>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Data Security</h2>
          <p className="text-gray-600">
            We implement reasonable security measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Your Rights</h2>
          <p className="text-gray-600">
            Depending on your location, you may have rights to:
            <ul className="list-disc pl-6 mt-2">
              <li>Access, correct, or delete your personal information.</li>
              <li>Opt out of certain data collection or sharing practices.</li>
              <li>Request a copy of your data in a portable format.</li>
            </ul>
            To exercise these rights, please contact us at the details below.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Third-Party Links</h2>
          <p className="text-gray-600">
            Our services may contain links to third-party websites. We are not responsible for the privacy practices or content of these sites. We encourage you to review their privacy policies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Changes to This Policy</h2>
          <p className="text-gray-600">
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. Your continued use of our services after such changes constitutes your acceptance of the new policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">9. Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions about this Privacy Policy, please contact us at:
            <br />
            Email: privacy@company.com
            <br />
            Address: 123 Business Street, Suite 100, Wilmington, DE 19801
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;