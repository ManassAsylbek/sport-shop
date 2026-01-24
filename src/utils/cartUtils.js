// Cart management utilities with localStorage

const CART_STORAGE_KEY = "personalBestCart";

// Get cart from localStorage
export const getCartFromStorage = () => {
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Error reading cart from localStorage:", error);
    return [];
  }
};

// Save cart to localStorage
export const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    // Dispatch custom event for cart updates
    window.dispatchEvent(new Event("cartUpdated"));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

// Add item to cart
export const addToCart = (product) => {
  const cart = getCartFromStorage();

  // Check if product with same id, size, and color already exists
  const existingItemIndex = cart.findIndex(
    (item) =>
      item.id === product.id &&
      item.size === product.size &&
      item.color === product.color,
  );

  if (existingItemIndex > -1) {
    // Update quantity if item exists
    cart[existingItemIndex].quantity += product.quantity || 1;
  } else {
    // Add new item with unique cartId
    const newItem = {
      ...product,
      cartId: Date.now() + Math.random(), // Unique identifier for cart item
      quantity: product.quantity || 1,
    };
    cart.push(newItem);
  }

  saveCartToStorage(cart);
  return cart;
};

// Remove item from cart
export const removeFromCart = (cartId) => {
  const cart = getCartFromStorage();
  const updatedCart = cart.filter((item) => item.cartId !== cartId);
  saveCartToStorage(updatedCart);
  return updatedCart;
};

// Update item quantity
export const updateCartItemQuantity = (cartId, quantity) => {
  if (quantity < 1) return;

  const cart = getCartFromStorage();
  const updatedCart = cart.map((item) =>
    item.cartId === cartId ? { ...item, quantity } : item,
  );
  saveCartToStorage(updatedCart);
  return updatedCart;
};

// Clear cart
export const clearCart = () => {
  localStorage.removeItem(CART_STORAGE_KEY);
  window.dispatchEvent(new Event("cartUpdated"));
};

// Get cart items count
export const getCartItemsCount = () => {
  const cart = getCartFromStorage();
  return cart.reduce((total, item) => total + item.quantity, 0);
};

// Calculate cart totals
export const calculateCartTotals = (cart, discount = 0) => {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discountAmount = subtotal * discount;
  const shipping = subtotal >= 100 ? 0 : 10;
  const tax = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + shipping + tax;

  return {
    subtotal,
    discountAmount,
    shipping,
    tax,
    total,
  };
};
