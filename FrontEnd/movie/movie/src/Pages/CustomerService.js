import React from "react";
import { motion } from "framer-motion";
import "./CustomerService.css";

const CustomerService = () => {
  return (
    <motion.div
      className="customer-service-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <section className="service-hero">
        <h1>Customer Service</h1>
        <p>We're here to help you with any questions or issues you may have.</p>
      </section>

      <section className="service-section">
        <h2>FAQs</h2>
        <div className="faq">
          <h3>How do I create an account?</h3>
          <p>Click on the "Sign In" button in the navigation bar and follow the instructions to register.</p>
        </div>
        <div className="faq">
          <h3>How do I reset my password?</h3>
          <p>Go to the login page and click on "Forgot Password" to reset your password.</p>
        </div>
        <div className="faq">
          <h3>How do I contact support?</h3>
          <p>You can reach out to us via email or phone. Details are provided below.</p>
        </div>
      </section>

      <section className="service-section">
        <h2>Contact Us</h2>
        <p>
          Have questions or need assistance? Contact us through the following channels:
        </p>
        <p>Email: <a href="mailto:support@moviemate.com">support@moviemate.com</a></p>
        <p>Phone: +1 (123) 456-7890</p>
        <p>Live Chat: Available 24/7 on our website</p>
      </section>
    </motion.div>
  );
};

export default CustomerService;