"use client";

/* ============================================================
   Auth Context — Phone OTP Authentication via Firebase
   Provides user state, login/logout, and OTP flow to the app.
   ============================================================ */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  onAuthStateChanged,
  signOut,
  type User,
  type ConfirmationResult,
} from "firebase/auth";
import { auth } from "./firebase-client";

// ── Types ────────────────────────────────────────────────

interface AuthContextType {
  user: User | null;
  phoneNumber: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  sendOtp: (phone: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  logout: () => Promise<void>;
  otpSent: boolean;
  authError: string | null;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// ── Provider ─────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [recaptchaVerifier, setRecaptchaVerifier] =
    useState<RecaptchaVerifier | null>(null);

  // Listen to auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Initialize invisible reCAPTCHA
  useEffect(() => {
    // Only create recaptcha if the container element exists
    const initRecaptcha = () => {
      const container = document.getElementById("recaptcha-container");
      if (!container) return;

      try {
        const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "invisible",
          callback: () => {
            // reCAPTCHA solved - will proceed with sendOtp
          },
          "expired-callback": () => {
            setAuthError("reCAPTCHA expired. Please try again.");
          },
        });
        setRecaptchaVerifier(verifier);
      } catch {
        // Verifier already exists, ignore
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initRecaptcha, 500);
    return () => clearTimeout(timer);
  }, []);

  const clearAuthError = useCallback(() => setAuthError(null), []);

  const sendOtp = useCallback(
    async (phone: string) => {
      setAuthError(null);
      try {
        let verifier = recaptchaVerifier;
        if (!verifier) {
          verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
            size: "invisible",
          });
          setRecaptchaVerifier(verifier);
        }

        const formattedPhone = phone.startsWith("+91")
          ? phone
          : `+91${phone.replace(/\s/g, "")}`;

        const result = await signInWithPhoneNumber(
          auth,
          formattedPhone,
          verifier
        );
        setConfirmationResult(result);
        setOtpSent(true);
      } catch (error: any) {
        console.error("OTP send error:", error);
        if (error.code === "auth/too-many-requests") {
          setAuthError(
            "Too many OTP requests. Please wait a few minutes and try again."
          );
        } else if (error.code === "auth/invalid-phone-number") {
          setAuthError("Invalid phone number. Please enter a valid number.");
        } else {
          setAuthError("Failed to send OTP. Please try again.");
        }
        // Reset recaptcha for retry
        if (recaptchaVerifier) {
          try {
            recaptchaVerifier.clear();
          } catch {
            // ignore
          }
          setRecaptchaVerifier(null);
        }
      }
    },
    [recaptchaVerifier]
  );

  const verifyOtp = useCallback(
    async (otp: string) => {
      setAuthError(null);
      if (!confirmationResult) {
        setAuthError("Please request a new OTP first.");
        return;
      }
      try {
        await confirmationResult.confirm(otp);
        // onAuthStateChanged will update user state
        setOtpSent(false);
        setConfirmationResult(null);
        setAuthModalOpen(false);
      } catch (error: any) {
        console.error("OTP verification error:", error);
        if (error.code === "auth/invalid-verification-code") {
          setAuthError("Incorrect OTP. Please check and try again.");
        } else {
          setAuthError("Verification failed. Please try again.");
        }
      }
    },
    [confirmationResult]
  );

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      setOtpSent(false);
      setConfirmationResult(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, []);

  const value: AuthContextType = useMemo(
    () => ({
      user,
      phoneNumber: user?.phoneNumber || null,
      isLoggedIn: !!user,
      isLoading,
      isAuthModalOpen,
      setAuthModalOpen,
      sendOtp,
      verifyOtp,
      logout,
      otpSent,
      authError,
      clearAuthError,
    }),
    [
      user,
      isLoading,
      isAuthModalOpen,
      sendOtp,
      verifyOtp,
      logout,
      otpSent,
      authError,
      clearAuthError,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      {/* Invisible reCAPTCHA container */}
      <div id="recaptcha-container" />
    </AuthContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
