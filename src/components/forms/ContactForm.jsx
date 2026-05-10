import React, { useState } from "react";
import "../../styles/ContactForm.css";

const ContactForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    websiteUrl: "",
    budget: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formPayload = new FormData();
    formPayload.append("First Name", formData.firstName);
    formPayload.append("Last Name", formData.lastName);
    formPayload.append("Email", formData.email);
    formPayload.append("Website URL", formData.websiteUrl);
    formPayload.append("Budget", formData.budget);
    formPayload.append("Message", formData.message);
    formPayload.append("_replyto", formData.email);
    formPayload.append(
      "_subject",
      `New Contact Form Submission from ${formData.firstName} ${formData.lastName}`,
    );
    formPayload.append("_template", "table");

    try {
      const response = await fetch(
        "https://formsubmit.co/ramynader286@gmail.com",
        {
          method: "POST",
          body: formPayload,
        },
      );

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          websiteUrl: "",
          budget: "",
          message: "",
        });

        setTimeout(() => {
          setSubmitStatus(null);
          if (onSuccess) onSuccess(); // Close modal after successful submission
        }, 2000);
      } else {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <div className="avatar-container">
          <div className="avatar-form">
            <svg viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="50" fill="url(#gradient)" />
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#A1A1AA" />
                  <stop offset="100%" stopColor="#121218" />
                </linearGradient>
              </defs>
              <path
                d="M50 30 C60 30 68 38 68 48 C68 58 60 66 50 66 C40 66 32 58 32 48 C32 38 40 30 50 30Z"
                fill="white"
                fillOpacity="0.2"
              />
              <circle cx="50" cy="48" r="8" fill="white" />
              <path
                d="M50 70 C38 70 28 78 25 88 L75 88 C72 78 62 70 50 70Z"
                fill="white"
                fillOpacity="0.2"
              />
            </svg>
          </div>
        </div>
        <h1 className="contact-title">Let's have a chat</h1>
        <p className="contact-description">
          Enter your details below and I'll get back to you as soon as possible.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              First Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="John"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Last Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Email <span className="required">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="john@example.com"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Website URL</label>
          <input
            type="url"
            name="websiteUrl"
            value={formData.websiteUrl}
            onChange={handleChange}
            className="form-input"
            placeholder="https://yourwebsite.com"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            What's your budget? <span className="required">*</span>
          </label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="" disabled>
              Select Budget
            </option>
            <option value="Up to $2,000">Up to $2,000</option>
            <option value="$2,000 - $5,000">$2,000 - $5,000</option>
            <option value="$5,000 - $10,000">$5,000 - $10,000</option>
            <option value="$10,000 +">$10,000 +</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">
            How can I help you? <span className="required">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="form-textarea"
            rows="5"
            placeholder="Tell me about your project..."
          />
        </div>

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>

        {submitStatus === "success" && (
          <div className="success-message">
            ✓ Message sent successfully! I'll get back to you soon.
          </div>
        )}

        {submitStatus === "error" && (
          <div className="error-message">
            ✗ Failed to send message. Please try again or contact me directly.
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
