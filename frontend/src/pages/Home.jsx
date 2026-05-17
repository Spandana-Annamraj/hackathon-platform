import React from "react";
// Adjust the path to your image location
import FAQs from "../components/FAQs";  // Adjust path if needed

const Home = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">HACKCRUCIBLE</h1>
          <ul className="hidden md:flex space-x-6 text-white font-medium">
            <li><a href="#about" className="hover:text-gray-200">About Us</a></li>
              <li><a href="#faqs" className="hover:text-gray-200">FAQs</a></li>
          
          </ul>
          <a href="signup"
             className="bg-white text-purple-700 font-semibold px-4 py-2 rounded-full hover:bg-gray-100">
               Signup
          </a>
          <a href="login" className="bg-white text-purple-700 font-semibold px-4 py-2 rounded-full hover:bg-gray-100">Login</a>

        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div>
          <span className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1 rounded-full mb-4">
            Our Courses
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            With HackCrucible, <br /> Everything Is Easier
          </h2>
          <p className="text-gray-600 text-lg">
            HackCrucible is an online platform designed to facilitate hackathons, coding challenges, and project evaluations. Participants can upload their work, get detailed feedback, and showcase their skills with certified badges on networks like LinkedIn.
          </p>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <img
            src="/assets/teams.jpg"
            alt="Hackathon team"
            className="rounded-xl shadow-lg w-full max-w-md"
          />
        </div>
      </section>
     
<section className="bg-gray-50 py-16">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid md:grid-cols-3 gap-10">
      {/* Card 1 */}
      <div className="bg-white shadow-md p-6 rounded-xl text-center relative">
        <div className="w-20 h-20 mx-auto rounded-full bg-purple-200 flex items-center justify-center mb-6">
        </div>
        <h3 className="text-xl font-semibold mb-2">Project Submission Made Simple</h3>
        <p className="text-gray-600 text-sm">
           Submit your projects with essential details like deployed URLs, GitHub repositories, and technology stacks for easy evaluation.
        </p>
        
      </div>

      {/* Card 2 */}
      <div className="bg-white shadow-md p-6 rounded-xl text-center relative">
        <div className="w-20 h-20 mx-auto rounded-full bg-purple-200 flex items-center justify-center mb-6">
        </div>
        <h3 className="text-xl font-semibold mb-2">Certification and Badge System</h3>
        <p className="text-gray-600 text-sm">
          Earn personalized certificates and digital badges based on project scores.
        </p>
        
      </div>

      {/* Card 3 */}
      <div className="bg-white shadow-md p-6 rounded-xl text-center relative">
        <div className="w-20 h-20 mx-auto rounded-full bg-purple-200 flex items-center justify-center mb-6">
        </div>
        <h3 className="text-xl font-semibold mb-2">Expert Scoring and Feedback</h3>
        <p className="text-gray-600 text-sm">
          Projects are evaluated by industry professionals on creativity, technical proficiency, and presentation.
        </p>
       
      </div>
    </div>
  </div>
</section>
{/* About Us Section */}
<section className="bg-white py-16" id="about">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">About Us</h2>
    <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
      <strong>HackCrucible</strong> is a comprehensive platform designed to streamline and enhance hackathon experiences. Whether you're a participant, judge, or organizer, our platform ensures seamless registration, project submission, expert evaluation, and badge-based recognition. We aim to build a collaborative and competitive environment for tech enthusiasts to innovate, learn, and grow.
    </p>
  </div>
</section>
<section id="faqs" className="bg-gray-50 py-16">
  <FAQs/>
</section>

    </div>
  );
};

export default Home;