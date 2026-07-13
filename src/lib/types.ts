/* ============================================================
   KHIRRI E-COMMERCE — Type Definitions
   ============================================================ */

// ── Product Types ──────────────────────────────────────────

export type ProductCategory = "makhana" | "cookies" | "dry-fruits" | "super-grains" | "bulk";

export interface ProductVariant {
  /** Unique variant identifier, e.g. "raw-makhana-250g" */
  variantId: string;
  /** Display weight, e.g. "250g" */
  weight: string;
  /** Weight in grams (for shipping calc) */
  weightGrams: number;
  /** Maximum Retail Price in ₹ */
  mrp: number;
  /** Actual selling price in ₹ */
  price: number;
  /** Whether this variant is in stock */
  inStock: boolean;
  /** Packaging type */
  packagingType: "branded-pouch" | "transparent-pack" | "jar" | "bag";
  /** Optional label like "Best Value" */
  label?: string;
  /** Suta grade, e.g., "6+ Suta", "Mixed" */
  grade?: string;
  /** Description for the grade */
  gradeDescription?: string;
}

export interface Product {
  /** URL slug, e.g. "raw-phool-makhana" */
  slug: string;
  /** Display name */
  name: string;
  /** Short tagline for cards */
  tagline: string;
  /** Full description for product detail page */
  description: string;
  /** Category for filtering */
  category: ProductCategory;
  /** Primary image path */
  image: string;
  /** Alt text for primary image */
  imageAlt: string;
  /** Additional images for gallery */
  gallery?: string[];
  /** Badge text like "Best Seller", "New" */
  badge?: string;
  /** Badge color class */
  badgeClass?: "orange" | "brown" | "dark" | "green";
  /** Available variants (weights/sizes) */
  variants: ProductVariant[];
  /** Whether this is a featured product */
  featured?: boolean;
  /** SEO meta description */
  metaDescription?: string;
  /** Key selling points (bullet list) */
  highlights?: string[];
  /** Nutrition info (key-value pairs) */
  nutrition?: { label: string; value: string }[];
  /** Whether this is a B2B-only product (enquiry flow) */
  isB2BOnly?: boolean;
}

// ── Cart Types ──────────────────────────────────────────

export interface CartItem {
  /** Product slug */
  productSlug: string;
  /** Variant ID */
  variantId: string;
  /** Quantity */
  quantity: number;
  /** Snapshot of the product name (for display) */
  productName: string;
  /** Snapshot of the variant weight */
  weight: string;
  /** Snapshot of the selling price at time of add */
  price: number;
  /** Snapshot of the MRP */
  mrp: number;
  /** Product image path */
  image: string;
  /** Packaging type */
  packagingType: ProductVariant["packagingType"];
}

export interface CouponCode {
  code: string;
  /** Discount type */
  type: "percentage" | "flat";
  /** Discount value (percentage 0-100 or flat amount in ₹) */
  value: number;
  /** Minimum order value required */
  minOrderValue: number;
  /** Maximum discount amount (for percentage coupons) */
  maxDiscount?: number;
  /** Description shown to user */
  description: string;
}

// ── Checkout Types ──────────────────────────────────────

export type PaymentMethod = "prepaid" | "cod";

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email?: string;
  addressLine1: string; // Flat / House No / Building
  addressLine2?: string; // Street / Area / Locality
  city: string;
  state: string;
  pincode: string;
}

export interface SavedAddress extends ShippingAddress {
  id: string;
  isDefault?: boolean;
}

export interface UserProfile {
  uid: string;
  phone: string;
  addresses: SavedAddress[];
}

export interface CheckoutFormData {
  shipping: ShippingAddress;
  paymentMethod: PaymentMethod;
  couponCode?: string;
  orderNotes?: string;
}

// ── Order Types ──────────────────────────────────────────

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

export interface Order {
  orderId: string;
  items: CartItem[];
  shipping: ShippingAddress;
  paymentMethod: PaymentMethod;
  subtotal: number;
  deliveryCharge: number;
  codSurcharge: number;
  discount: number;
  couponCode?: string;
  total: number;
  status: OrderStatus;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: string;
  estimatedDelivery?: string;
}

// ── Shipping Types ──────────────────────────────────────

export interface PincodeCheck {
  pincode: string;
  serviceable: boolean;
  estimatedDays?: number;
  city?: string;
  state?: string;
  codAvailable?: boolean;
}

// ── Cart Context Types ──────────────────────────────────

export interface CartState {
  items: CartItem[];
  appliedCoupon: CouponCode | null;
}

export interface CartContextType {
  items: CartItem[];
  /** Total number of items (sum of quantities) */
  itemCount: number;
  /** Subtotal before delivery/discount */
  subtotal: number;
  /** Applied coupon */
  appliedCoupon: CouponCode | null;
  /** Discount amount from coupon */
  discountAmount: number;
  /** Delivery charge based on subtotal */
  deliveryCharge: number;
  /** Amount remaining for free delivery */
  amountForFreeDelivery: number;
  /** Whether free delivery threshold is met */
  isFreeDelivery: boolean;
  /** COD surcharge (only if COD selected) */
  getCodSurcharge: () => number;
  /** Final total (with optional COD) */
  getTotal: (paymentMethod: PaymentMethod) => number;
  /** Add item to cart */
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  /** Remove item from cart */
  removeItem: (variantId: string) => void;
  /** Update item quantity */
  updateQuantity: (variantId: string, quantity: number) => void;
  /** Apply a coupon code */
  applyCoupon: (code: string) => { success: boolean; message: string };
  /** Remove applied coupon */
  removeCoupon: () => void;
  /** Clear entire cart */
  clearCart: () => void;
  /** Is cart drawer open */
  isCartOpen: boolean;
  /** Toggle cart drawer */
  setCartOpen: (open: boolean) => void;
}
