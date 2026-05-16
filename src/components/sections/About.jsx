import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "../../styles/About.css";
import avatarPhoto from "../../assets/avatars/2.avif";

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const BrowseButton = () => (
  <button onClick={() => scrollToSection("works")} className="cta">
    <span className="button-text">Browse My Work</span>
    <svg
      className="button-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
    >
      <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
    </svg>
  </button>
);

const About = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // الصورة تنزل مع التمرير وتتلاشى
  const imgY = useTransform(scrollYProgress, [0, 0.3, 1], [0, 40, 80]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.3, 0]);

  // المحتوى يطلع من الأسفل عند الدخول
  const contentVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section className="about-section" ref={sectionRef}>
      <div className="about-avatar">
        <motion.img
          src={avatarPhoto}
          alt="avatar"
          className="about-avatar-img"
          style={{ y: imgY, opacity: imgOpacity }}
        />
      </div>

      <motion.div
        className="about-content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={contentVariants}
      >
        <h2>
          What makes me <span className="italic-highlight">different?</span>
        </h2>
        <p>
          I create unique digital experiences tailored to your brand and goals.
          By merging creativity with functionality, I ensure every project looks
          stunning and performs flawlessly.
        </p>
        <BrowseButton />
      </motion.div>
    </section>
  );
};

export default About;
