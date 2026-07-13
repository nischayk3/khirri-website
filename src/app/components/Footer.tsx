import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Shop", href: "/shop" },
  { label: "Why Khirri", href: "/#why-khirri" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

// Inline SVGs for social platforms not in lucide-react v1
const InstagramSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);

const YoutubeSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
  </svg>
);

const TwitterXSVG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const socialLinks = [
  {
    Icon: InstagramSVG,
    href: "https://instagram.com/khirri",
    label: "Khirri on Instagram",
    id: "footer-instagram",
  },
  {
    Icon: YoutubeSVG,
    href: "https://youtube.com/@khirri",
    label: "Khirri on YouTube",
    id: "footer-youtube",
  },
  {
    Icon: TwitterXSVG,
    href: "https://twitter.com/khirri",
    label: "Khirri on X (Twitter)",
    id: "footer-twitter",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logoWrap}>
              <div className={styles.logoIconWrap} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  src="/khirri-logo.png"
                  alt="Khirri Logo"
                  width={42}
                  height={42}
                  style={{ width: "42px", height: "42px", objectFit: "cover", borderRadius: "50%", border: "2px solid var(--brand-brown)" }}
                />
              </div>
              <div>
                <p className={styles.logoName}>KHIRRI</p>
                <p className={styles.logoTagline}>Phool Makhana</p>
              </div>
            </div>
            <p className={styles.brandDesc}>
              Premium Phool Makhana sourced directly from Bihar's finest farms.
              Trusted B2B supplier and retail brand based in Vaishali Nagar,
              Jaipur, Rajasthan.
            </p>
            <div className={styles.socials}>
              {socialLinks.map((s) => {
                const Icon = s.Icon;
                return (
                  <a
                    key={s.id}
                    id={s.id}
                    href={s.href}
                    className={styles.socialIcon}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <nav className={styles.nav} aria-label="Footer navigation">
            <p className={styles.navTitle}>Quick Links</p>
            <ul role="list">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={styles.navLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact snapshot */}
          <div className={styles.contactSnap}>
            <p className={styles.navTitle}>Contact</p>
            <ul role="list" className={styles.contactList}>
              <li>
                <a href="tel:+918949359415" className={styles.contactItem}>
                  +91 89493 59415
                </a>
              </li>
              <li>
                <a href="mailto:hello@khirri.com" className={styles.contactItem}>
                  hello@khirri.com
                </a>
              </li>
              <li>
                <p className={styles.contactItem}>
                  Vaishali Nagar, Jaipur<br />Rajasthan 302021
                </p>
              </li>
            </ul>
            <a
              href="https://wa.me/918949359415"
              className={`btn btn-primary btn-sm ${styles.waBtn}`}
              target="_blank"
              rel="noopener noreferrer"
              id="footer-whatsapp-btn"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} Khirri Trading Company.{" "}
            <span>khirri.com</span>
          </p>
          <div className={styles.legal}>
            <a href="/privacy" className={styles.legalLink} id="footer-privacy">
              Privacy Policy
            </a>
            <a href="/terms" className={styles.legalLink} id="footer-terms">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
