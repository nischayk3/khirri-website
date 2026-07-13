"use client";

/* ============================================================
   Checkout Content — Seamless D2C Flow
   Address Book, Auth Wall, Payment Selection
   ============================================================ */

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

import {
  ArrowLeft,
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  Lock,
  CheckCircle2,
  Tag,
  X,
  AlertCircle,
  MapPin,
  Plus,
  User as UserIcon,
  Loader2,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { formatPrice, SHIPPING, INDIAN_STATES } from "@/lib/products";
import type { PaymentMethod, ShippingAddress, SavedAddress } from "@/lib/types";
import Navbar from "../components/Navbar";
import styles from "./checkout.module.css";

export default function CheckoutContent() {
  const router = useRouter();
  const {
    items,
    itemCount,
    subtotal,
    appliedCoupon,
    discountAmount,
    deliveryCharge,
    isFreeDelivery,
    getTotal,
    clearCart,
  } = useCart();
  const { user, phoneNumber: authPhone, isLoggedIn, isLoading: authLoading, setAuthModalOpen } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("prepaid");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [orderNotes, setOrderNotes] = useState("");

  // Address State
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);

  const [shipping, setShipping] = useState<ShippingAddress>({
    fullName: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const total = useMemo(() => getTotal(paymentMethod), [getTotal, paymentMethod]);
  const codSurcharge = paymentMethod === "cod" ? SHIPPING.COD_SURCHARGE : 0;

  // Fetch saved addresses when user logs in
  useEffect(() => {
    if (isLoggedIn && user) {
      setIsLoadingAddresses(true);
      fetch(`/api/user/addresses?uid=${user.uid}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.addresses && data.addresses.length > 0) {
            setSavedAddresses(data.addresses);
            setSelectedAddressId(data.addresses[0].id); // Select first by default
            setShowAddressForm(false);
          } else {
            // New user, prepopulate phone and show form
            setShipping((prev) => ({ ...prev, phone: authPhone?.replace("+91", "") || "" }));
            setShowAddressForm(true);
          }
        })
        .catch(console.error)
        .finally(() => setIsLoadingAddresses(false));
    }
  }, [isLoggedIn, user, authPhone]);

  const updateField = (field: keyof ShippingAddress, value: string) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!shipping.fullName.trim()) errors.fullName = "Name is required";
    if (!shipping.phone.trim()) errors.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(shipping.phone.replace(/\s/g, "")))
      errors.phone = "Enter a valid 10-digit phone number";
    if (!shipping.addressLine1.trim()) errors.addressLine1 = "Address is required";
    if (!shipping.city.trim()) errors.city = "City is required";
    if (!shipping.state) errors.state = "Select your state";
    if (!shipping.pincode.trim()) errors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(shipping.pincode.trim()))
      errors.pincode = "Enter a valid 6-digit pincode";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (items.length === 0) return;

    // Determine final address to use
    let finalAddress: ShippingAddress;
    
    if (showAddressForm) {
      if (!validateForm()) return;
      finalAddress = shipping;
    } else {
      const selected = savedAddresses.find(a => a.id === selectedAddressId);
      if (!selected) {
        alert("Please select an address");
        return;
      }
      finalAddress = selected;
    }

    setIsSubmitting(true);

    try {
      // 1. If it's a new typed address, save it to user's address book
      if (showAddressForm && user) {
        try {
          await fetch("/api/user/addresses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uid: user.uid, phone: authPhone, address: finalAddress })
          });
        } catch (e) {
          console.error("Failed to save address to profile, continuing with order...");
        }
      }

      const orderId = `KH${Date.now().toString(36).toUpperCase()}`;

      if (paymentMethod === "prepaid") {
        const res = await fetch("/api/razorpay/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: Math.round(total * 100),
            currency: "INR",
            receipt: orderId,
          }),
        });
        
        if (!res.ok) throw new Error("Failed to initialize payment");
        const data = await res.json();
        
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: data.amount,
          currency: data.currency,
          name: "Khirri",
          description: "Premium Makhana Order",
          order_id: data.order_id,
          handler: async function (response: any) {
            try {
              const verifyRes = await fetch("/api/razorpay/verify-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });
              if (!verifyRes.ok) throw new Error("Payment verification failed");
              await finalizeOrder(orderId, response.razorpay_payment_id, finalAddress);
            } catch (err) {
              console.error(err);
              alert("Payment verification failed. Please contact support.");
              setIsSubmitting(false);
            }
          },
          prefill: {
            name: finalAddress.fullName,
            email: finalAddress.email,
            contact: finalAddress.phone,
          },
          theme: { color: "#5c3a1e" },
          modal: { ondismiss: () => setIsSubmitting(false) }
        };
        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (response: any) {
          console.error("Payment failed:", response.error);
          alert(`Payment failed: ${response.error.description}`);
          setIsSubmitting(false);
        });
        rzp.open();

      } else {
        await finalizeOrder(orderId, "COD", finalAddress);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const finalizeOrder = async (orderId: string, paymentId: string, finalAddress: ShippingAddress) => {
    try {
      const orderData = {
        orderId,
        userId: user?.uid || null,
        userPhone: authPhone || finalAddress.phone,
        items: items.map((i) => ({
          name: i.productName,
          weight: i.weight,
          quantity: i.quantity,
          price: i.price,
          image: i.image,
        })),
        shipping: finalAddress,
        paymentMethod,
        paymentId,
        subtotal,
        deliveryCharge,
        codSurcharge,
        discount: discountAmount,
        couponCode: appliedCoupon?.code,
        total,
        createdAt: new Date().toISOString(),
        estimatedDelivery: `${SHIPPING.ESTIMATED_DELIVERY_DAYS.min}-${SHIPPING.ESTIMATED_DELIVERY_DAYS.max} business days`,
        orderNotes,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error("Failed to save order");
      
      clearCart();
      router.push(`/checkout/success?id=${orderId}`);
    } catch (error) {
      console.error(error);
      alert("Order placed but encountered an error saving. Please contact support.");
      setIsSubmitting(false);
    }
  };

  // Auth Wall State
  if (!authLoading && !isLoggedIn) {
    return (
      <div className={styles.authWall}>
        <Navbar />
        <div className={styles.authContainer}>
          <div className={styles.authBox}>
            <div className={styles.authIcon}>
              <UserIcon size={40} />
            </div>
            <h1>Almost there!</h1>
            <p>Login to securely save your address and track your order instantly.</p>
            <button className="btn btn-primary btn-lg" onClick={() => setAuthModalOpen(true)}>
              Login / Sign Up to Continue
            </button>
            <Link href="/shop" className={styles.backLink}>
              <ArrowLeft size={16} /> Back to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Loading State
  if (authLoading || isLoadingAddresses) {
    return (
      <div className={styles.authWall}>
        <Navbar />
        <div className={styles.authContainer}>
          <p>Loading your secure checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Navbar />

      {isSubmitting && (
        <div className={styles.submitOverlay}>
          <div className={styles.submitLoader}>
            <Loader2 size={48} className={styles.submitSpinner} />
            <h2>Processing Order...</h2>
            <p>Please do not refresh or close this page.</p>
          </div>
        </div>
      )}

      <main className={styles.main}>
        <div className={`container ${styles.container}`}>
          <div className={styles.header}>
            <Link href="/shop" className={styles.backBtn}>
              <ArrowLeft size={20} />
              <span>Back to Shop</span>
            </Link>
            <div className={styles.secureBadge}>
              <Lock size={14} />
              Secure Checkout
            </div>
          </div>

          <div className={styles.grid}>
            {/* Left Column — Forms */}
            <div className={styles.leftCol}>
              {/* Address Selection Block */}
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionStep}>1</div>
                  <h2 className={styles.sectionTitle}>Delivery Address</h2>
                </div>
                
                <div className={styles.sectionContent}>
                  {savedAddresses.length > 0 && !showAddressForm ? (
                    <div className={styles.addressList}>
                      {savedAddresses.map((addr) => (
                        <div 
                          key={addr.id} 
                          className={`${styles.addressCard} ${selectedAddressId === addr.id ? styles.selectedCard : ''}`}
                          onClick={() => setSelectedAddressId(addr.id)}
                        >
                          <div className={styles.addressRadio}>
                            <div className={styles.radioInner} />
                          </div>
                          <div className={styles.addressInfo}>
                            <p className={styles.addressName}>{addr.fullName}</p>
                            <p className={styles.addressText}>{addr.addressLine1}</p>
                            {addr.addressLine2 && <p className={styles.addressText}>{addr.addressLine2}</p>}
                            <p className={styles.addressText}>{addr.city}, {addr.state} {addr.pincode}</p>
                            <p className={styles.addressPhone}>+91 {addr.phone}</p>
                          </div>
                        </div>
                      ))}
                      
                      <button 
                        className={styles.addAddressBtn}
                        onClick={() => setShowAddressForm(true)}
                      >
                        <Plus size={18} /> Add New Address
                      </button>
                    </div>
                  ) : (
                    <div className={styles.addressForm}>
                      {savedAddresses.length > 0 && (
                        <button 
                          className={styles.cancelAddBtn}
                          onClick={() => setShowAddressForm(false)}
                        >
                          Cancel
                        </button>
                      )}
                      
                      <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                          <label>Full Name *</label>
                          <input
                            type="text"
                            value={shipping.fullName}
                            onChange={(e) => updateField("fullName", e.target.value)}
                            className={formErrors.fullName ? styles.inputError : ""}
                            placeholder="John Doe"
                          />
                          {formErrors.fullName && <span className={styles.errorText}>{formErrors.fullName}</span>}
                        </div>
                        <div className={styles.formGroup}>
                          <label>Phone Number *</label>
                          <input
                            type="tel"
                            value={shipping.phone}
                            onChange={(e) => updateField("phone", e.target.value.replace(/[^\d]/g, "").slice(0, 10))}
                            className={formErrors.phone ? styles.inputError : ""}
                            placeholder="9876543210"
                          />
                          {formErrors.phone && <span className={styles.errorText}>{formErrors.phone}</span>}
                        </div>
                      </div>

                      <div className={styles.formGroup}>
                        <label>Email (Optional for tracking updates)</label>
                        <input
                          type="email"
                          value={shipping.email || ""}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder="john@example.com"
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label>Flat, House no., Building, Company, Apartment *</label>
                        <input
                          type="text"
                          value={shipping.addressLine1}
                          onChange={(e) => updateField("addressLine1", e.target.value)}
                          className={formErrors.addressLine1 ? styles.inputError : ""}
                        />
                        {formErrors.addressLine1 && <span className={styles.errorText}>{formErrors.addressLine1}</span>}
                      </div>

                      <div className={styles.formGroup}>
                        <label>Area, Street, Sector, Village</label>
                        <input
                          type="text"
                          value={shipping.addressLine2 || ""}
                          onChange={(e) => updateField("addressLine2", e.target.value)}
                        />
                      </div>

                      <div className={styles.formRow3}>
                        <div className={styles.formGroup}>
                          <label>Pincode *</label>
                          <input
                            type="text"
                            value={shipping.pincode}
                            onChange={(e) => updateField("pincode", e.target.value.replace(/[^\d]/g, "").slice(0, 6))}
                            className={formErrors.pincode ? styles.inputError : ""}
                          />
                          {formErrors.pincode && <span className={styles.errorText}>{formErrors.pincode}</span>}
                        </div>
                        <div className={styles.formGroup}>
                          <label>City *</label>
                          <input
                            type="text"
                            value={shipping.city}
                            onChange={(e) => updateField("city", e.target.value)}
                            className={formErrors.city ? styles.inputError : ""}
                          />
                          {formErrors.city && <span className={styles.errorText}>{formErrors.city}</span>}
                        </div>
                        <div className={styles.formGroup}>
                          <label>State *</label>
                          <select
                            value={shipping.state}
                            onChange={(e) => updateField("state", e.target.value)}
                            className={formErrors.state ? styles.inputError : ""}
                          >
                            <option value="">Select State</option>
                            {INDIAN_STATES.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                          {formErrors.state && <span className={styles.errorText}>{formErrors.state}</span>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Payment Section */}
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionStep}>2</div>
                  <h2 className={styles.sectionTitle}>Payment Method</h2>
                </div>
                <div className={styles.sectionContent}>
                  <div className={styles.paymentMethods}>
                    <label className={`${styles.paymentOption} ${paymentMethod === "prepaid" ? styles.paymentSelected : ""}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="prepaid"
                        checked={paymentMethod === "prepaid"}
                        onChange={() => setPaymentMethod("prepaid")}
                        className={styles.radioHidden}
                      />
                      <div className={styles.radioCustom}></div>
                      <div className={styles.paymentInfo}>
                        <div className={styles.paymentTitle}>
                          <CreditCard size={18} />
                          <span>Pay Online (UPI, Cards, Wallets)</span>
                        </div>
                        <p className={styles.paymentDesc}>Secure payment via Razorpay. Recommended.</p>
                      </div>
                    </label>

                    <label className={`${styles.paymentOption} ${paymentMethod === "cod" ? styles.paymentSelected : ""}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className={styles.radioHidden}
                      />
                      <div className={styles.radioCustom}></div>
                      <div className={styles.paymentInfo}>
                        <div className={styles.paymentTitle}>
                          <Banknote size={18} />
                          <span>Cash on Delivery</span>
                        </div>
                        <p className={styles.paymentDesc}>
                          Pay in cash when order is delivered. +{formatPrice(SHIPPING.COD_SURCHARGE)} fee applies.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </section>
              
              <div className={styles.notesGroup}>
                <label>Order Notes (Optional)</label>
                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Any special instructions for delivery..."
                  rows={3}
                />
              </div>
            </div>

            {/* Right Column — Summary */}
            <div className={styles.rightCol}>
              <div className={styles.summaryCard}>
                <h2 className={styles.summaryTitle}>Order Summary</h2>
                
                <div className={styles.summaryItems}>
                  {items.map((item) => (
                    <div key={item.variantId} className={styles.summaryItem}>
                      <div className={styles.itemImgWrap}>
                        <Image
                          src={item.image}
                          alt={item.productName}
                          width={48}
                          height={48}
                          className={styles.itemImg}
                        />
                        <span className={styles.itemQtyBadge}>{item.quantity}</span>
                      </div>
                      <div className={styles.itemMeta}>
                        <p className={styles.itemName}>{item.productName}</p>
                        <p className={styles.itemWeight}>{item.weight}</p>
                      </div>
                      <div className={styles.itemPrice}>
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.summaryTotals}>
                  <div className={styles.totalRow}>
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  {discountAmount > 0 && (
                    <div className={`${styles.totalRow} ${styles.discountRow}`}>
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className={styles.totalRow}>
                    <span>Delivery Charge</span>
                    <span>
                      {deliveryCharge === 0 ? <span className={styles.freeText}>FREE</span> : formatPrice(deliveryCharge)}
                    </span>
                  </div>

                  {paymentMethod === "cod" && (
                    <div className={styles.totalRow}>
                      <span>COD Fee</span>
                      <span>{formatPrice(codSurcharge)}</span>
                    </div>
                  )}

                  <div className={styles.finalTotal}>
                    <span>Total</span>
                    <div className={styles.totalWrap}>
                      <span className={styles.totalAmount}>{formatPrice(total)}</span>
                      <span className={styles.taxNote}>Inclusive of all taxes</span>
                    </div>
                  </div>
                </div>

                <button
                  className={`btn btn-primary btn-lg ${styles.submitBtn}`}
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting || items.length === 0}
                >
                  {isSubmitting ? (
                    "Processing..."
                  ) : (
                    <>
                      {paymentMethod === "prepaid" ? (
                        <><ShieldCheck size={18} /> Pay {formatPrice(total)}</>
                      ) : (
                        <><CheckCircle2 size={18} /> Place Order</>
                      )}
                    </>
                  )}
                </button>
                
                <div className={styles.trustBadges}>
                  <div className={styles.trustBadge}>
                    <ShieldCheck size={16} />
                    <span>100% Secure</span>
                  </div>
                  <div className={styles.trustBadge}>
                    <Truck size={16} />
                    <span>Fast Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
