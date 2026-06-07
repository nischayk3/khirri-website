"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, PhoneCall } from "lucide-react";
import styles from "./Navbar.module.css";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Why Khirri", href: "#why-khirri" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (label: string) => {
    setActiveLink(label);
    setMenuOpen(false);
  };

  return (
    <>
      <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`} role="banner">
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <a href="/#home" className={styles.logo} aria-label="Khirri — Home">
            <div className={styles.logoIconWrap} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                src="/khirri-logo.png"
                alt="Khirri Logo"
                width={42}
                height={42}
                priority
                style={{ width: "42px", height: "42px", objectFit: "cover", borderRadius: "50%", border: "2px solid var(--brand-brown)" }}
              />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoName}>KHIRRI</span>
              <span className={styles.logoTagline}>Phool Makhana</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`${styles.navLink} ${activeLink === link.label ? styles.navLinkActive : ""}`}
                onClick={() => handleNavClick(link.label)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className={styles.navCta}>
            <a
              href="https://wa.me/918949359415?text=Hi%20Khirri%2C%20I%27d%20like%20to%20enquire%20about%20Makhana."
              className={`btn btn-primary btn-sm ${styles.ctaBtn}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enquire Now via WhatsApp"
            >
              <PhoneCall size={15} />
              <span>Enquire Now</span>
            </a>

            {/* Hamburger */}
            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className={styles.mobileNavLink}
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={() => handleNavClick(link.label)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/918949359415?text=Hi%20Khirri%2C%20I%27d%20like%20to%20enquire%20about%20Makhana."
            className={`btn btn-primary ${styles.mobileCta}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            <PhoneCall size={16} />
            Enquire Now
          </a>
        </nav>
      </div>
    </>
  );
}
