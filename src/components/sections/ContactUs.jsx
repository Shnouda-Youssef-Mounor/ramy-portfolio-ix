import React, { useState } from "react";
import { motion } from "framer-motion";
import ContactModal from "../modals/ContactModal";
import avatarPhoto from "../../assets/avatars/3.avif";
import "../../styles/ContactUs.css";

const ContactUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="contactus-section">
      {/* LEFT — content */}
      <div className="contactus-content">
        <h2>
          How I can help <span className="italic-highlight">you?</span>
        </h2>

        <div className="contactus-items">
          <motion.div
            className="contactus-item"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="contactus-item-header">
              <h6 className="contactus-item-title">Full Application</h6>
              <span className="contactus-badge">Starting from $1000</span>
            </div>
            <p className="contactus-item-description">
              Want me to build you a completely custom, beautiful &amp; highly-converting website?
            </p>
          </motion.div>

          <motion.div
            className="contactus-item"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="contactus-item-header">
              <h6 className="contactus-item-title">Full Website</h6>
              <span className="contactus-badge">Starting from $700</span>
            </div>
            <p className="contactus-item-description">
              Want me to build you a completely custom, visually-stunning Application?
            </p>
          </motion.div>
        </div>

        <button className="cta-full" onClick={() => setIsModalOpen(true)}>
          <span>Get In Touch</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16" fill="currentColor">
            <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
          </svg>
        </button>
      </div>

      {/* RIGHT — image */}
      <div className="contactus-avatar">
        <img src={avatarPhoto} alt="avatar" className="contactus-avatar-img" />
      </div>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default ContactUs;
