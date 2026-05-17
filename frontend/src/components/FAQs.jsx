import React, { useState } from "react";

const FAQs = () => {
  const faqs = [
    {
      question: "What is HackCrucible?",
      answer:
        "HackCrucible is an online platform designed to simplify hackathon management — from participant registration and project submission to expert evaluation and certification.",
    },
    {
      question: "How do I register for a hackathon?",
      answer:
        "You can sign up using the Signup page and then join any active hackathons listed on the platform.",
    },
    {
      question: "What types of projects can I submit?",
      answer:
        "You can submit projects with deployed links, GitHub repositories, descriptions, and technology stacks. Currently, file uploads are not supported.",
    },
    {
      question: "Who evaluates the projects?",
      answer:
        "Industry professionals and experienced judges review and score projects based on creativity, technical skills, and presentation.",
    },
    {
      question: "How are winners determined?",
      answer:
        "Projects are ranked based on the judges' scores. Top-ranked projects receive digital badges and certificates.",
    },
    {
      question: "Can I update my project after submission?",
      answer:
        "Once the submission window closes, updates are not allowed. Make sure your project details are final before submitting.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto my-12 px-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
      <div>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 border-b border-gray-300 pb-4">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left flex justify-between items-center text-lg font-semibold focus:outline-none"
            >
              <span>{faq.question}</span>
              <span>{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <p className="mt-2 text-gray-700">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQs;
