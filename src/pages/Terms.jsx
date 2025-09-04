import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Terms and Conditions
        </h1>
        <p className="text-sm text-gray-500 mb-8 text-center">
          Last Updated: August 20, 2025
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-600">
            By accessing or using our website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Use of Services</h2>
          <p className="text-gray-600">
            You agree to use our services only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of the services. Prohibited activities include, but are not limited to, unauthorized access, distribution of malware, or engaging in any activity that disrupts our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Intellectual Property</h2>
          <p className="text-gray-600">
            All content on this website, including text, graphics, logos, and software, is the property of our company or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without express written permission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Limitation of Liability</h2>
          <p className="text-gray-600">
            Our services are provided "as is" without warranties of any kind, either express or implied. We are not liable for any damages arising from the use of our services, including but not limited to direct, indirect, incidental, or consequential damages.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Termination</h2>
          <p className="text-gray-600">
            We reserve the right to terminate or suspend your access to our services at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users or our business interests.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Governing Law</h2>
          <p className="text-gray-600">
            These Terms are governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law principles.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Changes to Terms</h2>
          <p className="text-gray-600">
            We may update these Terms and Conditions from time to time. Any changes will be posted on this page with an updated "Last Updated" date. Your continued use of our services after such changes constitutes your acceptance of the new Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions about these Terms and Conditions, please contact us at:
            <br />
            Email: support@company.com
            <br />
            Address: 123 Business Street, Suite 100, Wilmington, DE 19801
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;