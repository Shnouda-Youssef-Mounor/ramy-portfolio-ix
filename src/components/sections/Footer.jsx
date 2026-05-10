import React, { useState, useEffect } from "react";
import "../../styles/Footer.css";

const Footer = () => {
  const [cairoTime, setCairoTime]   = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCairoTime(new Intl.DateTimeFormat("en-GB", {
        timeZone: "Africa/Cairo", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
      }).format(now));
      setCurrentDate(new Intl.DateTimeFormat("en-GB", {
        timeZone: "Africa/Cairo", weekday: "long", year: "numeric", month: "long", day: "numeric",
      }).format(now));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="footer">
      <p className="footer-name">
        Ramy<span>IXDesign</span>
      </p>
      <p className="footer-date">{currentDate} — {cairoTime}</p>
      <span className="local-time-tag">local time in Cairo, Egypt</span>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Ramy IX. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
