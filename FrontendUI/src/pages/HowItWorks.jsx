// import React from 'react'

// function HowItWorks() {
//   return (
//     <div>HowItWorks</div>
//   )
// }

// export default HowItWorks


import React from "react";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const navigate = useNavigate();

   const handleExploreClick = () => {
    navigate("/ProviderProfile");
  };

  const steps = [
    {
      title: "1. Sign Up",
      description:
        "Create your free account. Choose to register as a Provider (worker) or as a Customer (buyer).",
      icon: "📝",
    },
    {
      title: "2. Find or Offer Services",
      description:
        "Customers search for nearby providers based on location, skill, and availability. Providers list their services with clear details.",
      icon: "🔍",
    },
    {
      title: "3. Connect & Chat",
      description:
        "Communicate securely through our in-platform chat system. No need to share personal contact details.",
      icon: "💬",
    },
    {
      title: "4. Hire & Pay",
      description:
        "Agree on the job details and cost. Payments are made according to our secure and transparent process.",
      icon: "💰",
    },
    {
      title: "5. Rate & Review",
      description:
        "After the job is complete, both parties leave ratings and reviews to build trust in the community.",
      icon: "⭐",
    },
  ];

  return (
    <div className="max-w-5xl px-4 py-10 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center">How ALL IN ONE Works</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 text-center transition bg-white shadow rounded-2xl hover:shadow-lg"
          >
            <div className="mb-4 text-4xl">{step.icon}</div>
            <h2 className="mb-2 text-xl font-semibold">{step.title}</h2>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-6 mt-12">
        <button
          onClick={handleExploreClick}
          className="px-6 py-3 text-white transition bg-purple-600 shadow rounded-xl hover:bg-purple-700"
        >
          Register as Provider
        </button>
        <button
          onClick={() => navigate("/register/customer")}
          className="px-6 py-3 text-white transition bg-blue-600 shadow rounded-xl hover:bg-blue-700"
        >
          Register as Customer
        </button>
      </div>
    </div>
  );
};

export default HowItWorks;
