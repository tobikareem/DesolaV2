import { FC } from "react";

const PrivacyPolicy: FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Privacy Policy</h1>
      <p className="text-gray-700 mb-6">Effective Date: April 21, 2025</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">1. Information We Collect</h2>
        <p className="text-gray-600">
          We collect personal information such as name, email, payment details, and travel preferences.
          We also gather browsing behavior for analytics purposes.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 text-gray-600">
          <li>To process flight searches and bookings</li>
          <li>To improve customer service</li>
          <li>To comply with legal requirements</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">3. Sharing Your Information</h2>
        <p className="text-gray-600">
          We do not sell your personal data. However, we may share it with airline partners, payment processors, and
          legal authorities if required.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">4. Your Rights & Choices</h2>
        <ul className="list-disc pl-6 text-gray-600">
          <li>Access and update your data</li>
          <li>Opt-out of marketing communications</li>
          <li>Request account deletion</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">5. Contact Us</h2>
        <p className="text-gray-600">For privacy-related concerns, email us at: <strong>support@desolaflights.com</strong></p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
