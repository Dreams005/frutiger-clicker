import React from "react";
import { FaGithub, FaCat, FaLinkedin } from "react-icons/fa";
import "../css/Footer.css";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>Alexander Ellul Hunt</h2>
          <p>© {currentYear} All rights reserved.</p>
        </div>

        <div className="coming-soon">
          <h3>Coming soon</h3>
          <ul className="footer-links">
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/privacy">Privacy</a>
            </li>
          </ul>
        </div>

        <div className="footer-socials">
          <a
            href="https://github.com/Dreams005"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.youtube.com/live/o8YhyLb__cI?si=Qfws6fB-btSpzadX"
            aria-label="Cat"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaCat size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/alexander-ellul-hunt-01aab3212/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
