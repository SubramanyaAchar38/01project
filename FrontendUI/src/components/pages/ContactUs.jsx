// import React from 'react'

// function ContactUs() {
//   return (
//     <div>ContactUs</div>
//   )
// }

// export default ContactUs

import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-3xl px-4 py-10 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Contact Us</h1>
      <p className="mb-8 text-center text-gray-600">
        Have questions or need help? Fill out the form below and our team will get in touch with you.
      </p>

      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-4 bg-white shadow-md rounded-2xl"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg"
        ></textarea>
        <button
          type="submit"
          className="w-full py-3 text-white transition bg-green-600 rounded-lg hover:bg-green-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
