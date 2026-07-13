"use client";

/* ============================================================
   KHIRRI E-COMMERCE — Cart Context
   Global cart state with localStorage persistence, coupon codes,
   delivery charge calculation, and drawer state management.
   ============================================================ */

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import type { CartItem, CartState, CartContextType, CouponCode, PaymentMethod } from "./types";
import { couponCodes, SHIPPING } from "./products";

// ── Constants ────────────────────────────────────────────

const CART_STORAGE_KEY = "khirri-cart";
const MAX_QUANTITY_PER_ITEM = 10;

// ── Reducer ──────────────────────────────────────────────

type CartAction =
  | { type: "ADD_ITEM"; item: Omit<CartItem, "quantity">; quantity: number }
  | { type: "REMOVE_ITEM"; variantId: string }
  | { type: "UPDATE_QUANTITY"; variantId: string; quantity: number }
  | { type: "APPLY_COUPON"; coupon: CouponCode }
  | { type: "REMOVE_COUPON" }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE"; state: CartState };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        (i) => i.variantId === action.item.variantId
      );

      if (existingIndex > -1) {
        // Update quantity of existing item
        const newItems = [...state.items];
        const newQty = Math.min(
          newItems[existingIndex].quantity + action.quantity,
          MAX_QUANTITY_PER_ITEM
        );
        newItems[existingIndex] = { ...newItems[existingIndex], quantity: newQty };
        return { ...state, items: newItems };
      }

      // Add new item
      const newItem: CartItem = {
        ...action.item,
        quantity: Math.min(action.quantity, MAX_QUANTITY_PER_ITEM),
      };
      return { ...state, items: [...state.items, newItem] };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.variantId !== action.variantId),
      };

    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.variantId !== action.variantId),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.variantId === action.variantId
            ? { ...i, quantity: Math.min(action.quantity, MAX_QUANTITY_PER_ITEM) }
            : i
        ),
      };
    }

    case "APPLY_COUPON":
      return { ...state, appliedCoupon: action.coupon };

    case "REMOVE_COUPON":
      return { ...state, appliedCoupon: null };

    case "CLEAR_CART":
      return { items: [], appliedCoupon: null };

    case "HYDRATE":
      return action.state;

    default:
      return state;
  }
}

// ── Persistence ──────────────────────────────────────────

function saveToStorage(state: CartState) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage not available (SSR, private browsing, etc.)
  }
}

function loadFromStorage(): CartState | null {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CartState;
    // Validate structure
    if (Array.isArray(parsed.items)) return parsed;
    return null;
  } catch {
    return null;
  }
}

// ── Context ──────────────────────────────────────────────

const CartContext = createContext<CartContextType | null>(null);

const initialState: CartState = {
  items: [],
  appliedCoupon: null,
};

// ── Provider ─────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isCartOpen, setCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const saved = loadFromStorage();
    if (saved) {
      dispatch({ type: "HYDRATE", state: saved });
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage on every state change
  useEffect(() => {
    if (hydrated) {
      saveToStorage(state);
    }
  }, [state, hydrated]);

  // ── Computed Values ──────────────────────────────────

  const itemCount = useMemo(
    () => state.items.reduce((sum, i) => sum + i.quantity, 0),
    [state.items]
  );

  const subtotal = useMemo(
    () => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [state.items]
  );

  const discountAmount = useMemo(() => {
    if (!state.appliedCoupon) return 0;
    const coupon = state.appliedCoupon;

    if (subtotal < coupon.minOrderValue) return 0;

    if (coupon.type === "percentage") {
      const rawDiscount = Math.round((subtotal * coupon.value) / 100);
      return coupon.maxDiscount ? Math.min(rawDiscount, coupon.maxDiscount) : rawDiscount;
    }
    return coupon.value;
  }, [state.appliedCoupon, subtotal]);

  const isFreeDelivery = subtotal >= SHIPPING.FREE_DELIVERY_THRESHOLD;
  const deliveryCharge = isFreeDelivery ? 0 : SHIPPING.FLAT_DELIVERY_CHARGE;
  const amountForFreeDelivery = isFreeDelivery
    ? 0
    : SHIPPING.FREE_DELIVERY_THRESHOLD - subtotal;

  // ── Actions ──────────────────────────────────────────

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, quantity: number = 1) => {
      dispatch({ type: "ADD_ITEM", item, quantity });
      setCartOpen(true); // Open drawer when item is added
    },
    []
  );

  const removeItem = useCallback((variantId: string) => {
    dispatch({ type: "REMOVE_ITEM", variantId });
  }, []);

  const updateQuantity = useCallback((variantId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", variantId, quantity });
  }, []);

  const applyCoupon = useCallback(
    (code: string): { success: boolean; message: string } => {
      const normalizedCode = code.trim().toUpperCase();
      const coupon = couponCodes.find((c) => c.code === normalizedCode);

      if (!coupon) {
        return { success: false, message: "Invalid coupon code" };
      }

      if (subtotal < coupon.minOrderValue) {
        return {
          success: false,
          message: `Minimum order value of ₹${coupon.minOrderValue} required`,
        };
      }

      dispatch({ type: "APPLY_COUPON", coupon });
      return { success: true, message: coupon.description };
    },
    [subtotal]
  );

  const removeCoupon = useCallback(() => {
    dispatch({ type: "REMOVE_COUPON" });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const getCodSurcharge = useCallback(() => SHIPPING.COD_SURCHARGE, []);

  const getTotal = useCallback(
    (paymentMethod: PaymentMethod) => {
      let total = subtotal - discountAmount + deliveryCharge;
      if (paymentMethod === "cod") {
        total += SHIPPING.COD_SURCHARGE;
      } else {
        // Prepaid discount already factored into pricing strategy
      }
      return Math.max(0, total);
    },
    [subtotal, discountAmount, deliveryCharge]
  );

  // ── Context Value ────────────────────────────────────

  const value: CartContextType = useMemo(
    () => ({
      items: state.items,
      itemCount,
      subtotal,
      appliedCoupon: state.appliedCoupon,
      discountAmount,
      deliveryCharge,
      amountForFreeDelivery,
      isFreeDelivery,
      getCodSurcharge,
      getTotal,
      addItem,
      removeItem,
      updateQuantity,
      applyCoupon,
      removeCoupon,
      clearCart,
      isCartOpen,
      setCartOpen,
    }),
    [
      state.items,
      state.appliedCoupon,
      itemCount,
      subtotal,
      discountAmount,
      deliveryCharge,
      amountForFreeDelivery,
      isFreeDelivery,
      getCodSurcharge,
      getTotal,
      addItem,
      removeItem,
      updateQuantity,
      applyCoupon,
      removeCoupon,
      clearCart,
      isCartOpen,
      setCartOpen,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ── Hook ─────────────────────────────────────────────────

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
