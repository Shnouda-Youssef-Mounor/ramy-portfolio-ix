import React, { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Lenis from "@studio-freight/lenis";

import Hero from "../components/sections/Hero";
import Projects from "../components/sections/Projects";
import About from "../components/sections/About";
import ContactUs from "../components/sections/ContactUs";
import Footer from "../components/sections/Footer";

import "../styles/home.css";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Home = () => {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="home-container">
      {/* Progress Bar */}
      <motion.div
        style={{
          scaleX,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, #c9b99a, #ffffff)",
          transformOrigin: "0%",
          zIndex: 9999,
        }}
      />

      <Hero />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
      >
        <About />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeUp}
      >
        <Projects id="works" />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
      >
        <ContactUs />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeUp}
      >
        <Footer />
      </motion.div>
    </div>
  );
};

export default Home;
