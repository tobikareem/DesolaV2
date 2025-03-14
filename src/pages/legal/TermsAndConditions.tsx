import { FC } from "react";

const TermsAndConditions: FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Terms and Conditions</h1>
      <p className="text-gray-700 mb-6">Effective Date: April 21, 2025</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">1. Acceptance of Terms</h2>
        <p className="text-gray-600">
          By using Desola Flights, you agree to these Terms and Conditions. If you do not agree, please do not use our services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">2. Services Provided</h2>
        <p className="text-gray-600">
          We provide flight search, booking services, and personalized travel recommendations. We do not operate flights directly.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">3. User Responsibilities</h2>
        <ul className="list-disc pl-6 text-gray-600">
          <li>Provide accurate booking details</li>
          <li>Comply with airline policies</li>
          <li>Do not engage in fraudulent activities</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">4. Booking and Payment</h2>
        <p className="text-gray-600">
          Flight fares are set by airlines and are subject to change. Refund policies are governed by airline partners.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">5. Limitation of Liability</h2>
        <p className="text-gray-600">
          Desola Flights is not responsible for flight cancellations, baggage loss, or visa-related travel issues.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">6. Contact Us</h2>
        <p className="text-gray-600">For inquiries, email us at: <strong>support@desolaflights.com</strong></p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
