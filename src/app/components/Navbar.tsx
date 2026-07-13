"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart, User, LogOut, Package, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import styles from "./Navbar.module.css";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Shop", href: "/shop" },
  { label: "Why Khirri", href: "/#why-khirri" },
  { label: "About", href: "/#about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const { itemCount, setCartOpen } = useCart();
  const { isLoggedIn, phoneNumber, setAuthModalOpen, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return pathname === "/";
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`} role="banner">
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <Link href="/#home" className={styles.logo} aria-label="Khirri — Home">
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
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`${styles.navLink} ${isActive(link.href) ? styles.navLinkActive : ""}`}
                onClick={handleNavClick}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className={styles.navCta}>
            <Link
              href="/shop"
              className={`btn btn-primary btn-sm ${styles.ctaBtn}`}
              aria-label="Shop Now"
            >
              <ShoppingCart size={15} />
              <span>Shop Now</span>
            </Link>

            {/* Account / Login Button */}
            {isLoggedIn ? (
              <div className={styles.accountWrap} ref={dropdownRef}>
                <button
                  className={styles.accountBtn}
                  onClick={() => setAccountOpen(!accountOpen)}
                  aria-label="My Account"
                >
                  <User size={18} />
                  <span className={styles.accountPhone}>
                    {phoneNumber ? phoneNumber.slice(-4) : "Account"}
                  </span>
                  <ChevronDown size={14} className={accountOpen ? styles.chevronUp : ""} />
                </button>
                {accountOpen && (
                  <div className={styles.dropdown}>
                    <Link
                      href="/my-orders"
                      className={styles.dropdownItem}
                      onClick={() => setAccountOpen(false)}
                    >
                      <Package size={16} />
                      My Orders
                    </Link>
                    <button
                      className={styles.dropdownItem}
                      onClick={() => { logout(); setAccountOpen(false); }}
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                className={styles.loginBtn}
                onClick={() => setAuthModalOpen(true)}
                aria-label="Login"
              >
                <User size={16} />
                <span>Login</span>
              </button>
            )}

            {/* Cart Button */}
            <button
              className={styles.cartBtn}
              onClick={() => setCartOpen(true)}
              aria-label={`Open cart with ${itemCount} items`}
            >
              <ShoppingCart size={22} />
              {itemCount > 0 && <span className={styles.cartBadge}>{itemCount}</span>}
            </button>

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
            <Link
              key={link.label}
              href={link.href}
              className={styles.mobileNavLink}
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={handleNavClick}
            >
              {link.label}
            </Link>
          ))}
          {/* Mobile Login/Account */}
          {isLoggedIn ? (
            <>
              <Link
                href="/my-orders"
                className={styles.mobileNavLink}
                style={{ animationDelay: `${navLinks.length * 60}ms` }}
                onClick={() => setMenuOpen(false)}
              >
                My Orders
              </Link>
              <button
                className={styles.mobileNavLink}
                style={{ animationDelay: `${(navLinks.length + 1) * 60}ms` }}
                onClick={() => { logout(); setMenuOpen(false); }}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className={styles.mobileNavLink}
              style={{ animationDelay: `${navLinks.length * 60}ms` }}
              onClick={() => { setAuthModalOpen(true); setMenuOpen(false); }}
            >
              Login / Sign Up
            </button>
          )}
          <Link
            href="/shop"
            className={`btn btn-primary ${styles.mobileCta}`}
            onClick={() => setMenuOpen(false)}
          >
            <ShoppingCart size={16} />
            Shop Now
          </Link>
        </nav>
      </div>
    </>
  );
}
