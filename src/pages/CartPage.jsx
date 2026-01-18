import { useState } from "react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { TrashIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

const initialCartItems = [
  {
    id: 1,
    name: "Performance Training T-Shirt",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=2787&auto=format&fit=crop",
    size: "L",
    color: "Black",
    quantity: 2,
  },
  {
    id: 2,
    name: "Performance Leggings",
    price: 58,
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=2787&auto=format&fit=crop",
    size: "M",
    color: "Navy",
    quantity: 1,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "BEST10") {
      setDiscount(0.1);
      alert("Promo code applied! 10% off");
    } else if (promoCode) {
      alert("Invalid promo code");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = subtotal * discount;
  const shipping = subtotal >= 100 ? 0 : 10;
  const tax = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + shipping + tax;

  return (
    <>
      <SEO
        title="Shopping Cart | Personal Best Sportswear"
        description="Review your cart and checkout"
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-white mb-8">
              Shopping Cart
            </h1>

            {cartItems.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <p className="text-2xl text-gray-600 mb-8">
                  Your cart is empty
                </p>
                <a
                  href="/shop-men"
                  className="inline-block px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Continue Shopping
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="bg-white rounded-2xl shadow-lg p-6"
                    >
                      <div className="flex gap-6">
                        {/* Image */}
                        <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">
                                {item.name}
                              </h3>
                              <p className="text-gray-600 text-sm mt-1">
                                Size: {item.size} • Color: {item.color}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <TrashIcon className="w-5 h-5" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            {/* Quantity */}
                            <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="w-8 h-8 flex items-center justify-center hover:bg-white rounded transition-colors"
                              >
                                <MinusIcon className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-8 h-8 flex items-center justify-center hover:bg-white rounded transition-colors"
                              >
                                <PlusIcon className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <p className="text-xl font-bold text-gray-900">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                              <p className="text-sm text-gray-600">
                                ${item.price} each
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Order Summary
                    </h2>

                    {/* Promo Code */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Promo Code
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter code"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                        <button
                          onClick={applyPromo}
                          className="px-4 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {discount > 0 && (
                        <p className="text-sm text-green-600 mt-2">
                          ✓ Promo applied: 10% off
                        </p>
                      )}
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-3 py-4 border-t border-b border-gray-200">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>

                      {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount (10%)</span>
                          <span>-${discountAmount.toFixed(2)}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span>
                          {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                        </span>
                      </div>

                      <div className="flex justify-between text-gray-600">
                        <span>Tax (8%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-xl font-bold text-gray-900 mt-4 mb-6">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>

                    {subtotal < 100 && (
                      <p className="text-sm text-gray-600 mb-4">
                        Add ${(100 - subtotal).toFixed(2)} more for free
                        shipping!
                      </p>
                    )}

                    <button className="w-full px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors mb-4">
                      Proceed to Checkout
                    </button>

                    <a
                      href="/shop-men"
                      className="block text-center text-blue-600 hover:underline"
                    >
                      Continue Shopping
                    </a>

                    {/* Trust Badges */}
                    <div className="mt-6 pt-6 border-t space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Secure checkout</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Free returns within 30 days</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Free shipping over $100</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
