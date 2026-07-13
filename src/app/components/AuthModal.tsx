"use client";

/* ============================================================
   Auth Modal — Phone OTP Login
   A beautiful modal for entering phone number and OTP.
   ============================================================ */

import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { X, Phone, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import styles from "./AuthModal.module.css";

export default function AuthModal() {
  const {
    isAuthModalOpen,
    setAuthModalOpen,
    sendOtp,
    verifyOtp,
    otpSent,
    authError,
    clearAuthError,
    isLoading: authLoading,
  } = useAuth();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const phoneInputRef = useRef<HTMLInputElement>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus phone input when modal opens
  useEffect(() => {
    if (isAuthModalOpen && !otpSent) {
      setTimeout(() => phoneInputRef.current?.focus(), 200);
    }
  }, [isAuthModalOpen, otpSent]);

  // Focus first OTP input when OTP is sent
  useEffect(() => {
    if (otpSent) {
      setTimeout(() => otpRefs.current[0]?.focus(), 200);
    }
  }, [otpSent]);

  const handleSendOtp = async () => {
    if (phone.replace(/\s/g, "").length !== 10) return;
    clearAuthError();
    setIsSending(true);
    try {
      await sendOtp(phone);
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) return;
    clearAuthError();
    setIsVerifying(true);
    try {
      await verifyOtp(otpString);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits entered
    if (index === 5 && value) {
      const fullOtp = newOtp.join("");
      if (fullOtp.length === 6) {
        // Small delay so user sees the last digit
        setTimeout(() => handleVerifyOtp(), 150);
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
    if (e.key === "Enter") {
      handleVerifyOtp();
    }
  };

  const handlePhoneKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendOtp();
    }
  };

  const handleClose = () => {
    setAuthModalOpen(false);
    setPhone("");
    setOtp(["", "", "", "", "", ""]);
    clearAuthError();
  };

  if (!isAuthModalOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className={styles.closeBtn} onClick={handleClose}>
          <X size={20} />
        </button>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.iconWrap}>
            {otpSent ? <ShieldCheck size={28} /> : <Phone size={28} />}
          </div>
          <h2 className={styles.title}>
            {otpSent ? "Enter OTP" : "Login / Sign Up"}
          </h2>
          <p className={styles.subtitle}>
            {otpSent
              ? `We've sent a 6-digit code to +91 ${phone}`
              : "Enter your mobile number to continue"}
          </p>
        </div>

        {/* Error */}
        {authError && <p className={styles.error}>{authError}</p>}

        {/* Phone Input */}
        {!otpSent ? (
          <div className={styles.form}>
            <div className={styles.phoneGroup}>
              <span className={styles.prefix}>+91</span>
              <input
                ref={phoneInputRef}
                type="tel"
                className={styles.phoneInput}
                placeholder="Enter mobile number"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/[^\d]/g, "").slice(0, 10))
                }
                onKeyDown={handlePhoneKeyDown}
                autoComplete="tel"
              />
            </div>
            <button
              className={styles.submitBtn}
              onClick={handleSendOtp}
              disabled={phone.replace(/\s/g, "").length !== 10 || isSending}
            >
              {isSending ? (
                <>
                  <Loader2 size={16} className={styles.spinner} />
                  Sending OTP...
                </>
              ) : (
                <>
                  Get OTP
                  <ArrowRight size={16} />
                </>
              )}
            </button>
            <p className={styles.disclaimer}>
              By continuing, you agree to our Terms of Service and Privacy
              Policy. We'll send order updates to this number.
            </p>
          </div>
        ) : (
          /* OTP Input */
          <div className={styles.form}>
            <div className={styles.otpGroup}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { otpRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  className={styles.otpInput}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  maxLength={1}
                  autoComplete={i === 0 ? "one-time-code" : "off"}
                />
              ))}
            </div>
            <button
              className={styles.submitBtn}
              onClick={handleVerifyOtp}
              disabled={otp.join("").length !== 6 || isVerifying}
            >
              {isVerifying ? (
                <>
                  <Loader2 size={16} className={styles.spinner} />
                  Verifying...
                </>
              ) : (
                <>
                  Verify & Login
                  <ShieldCheck size={16} />
                </>
              )}
            </button>
            <button
              className={styles.resendBtn}
              onClick={() => {
                setOtp(["", "", "", "", "", ""]);
                clearAuthError();
                handleSendOtp();
              }}
              disabled={isSending}
            >
              Didn't receive the code? Resend OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
