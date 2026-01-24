import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { clearCart } from "../utils/cartUtils";

export default function SuccessPage() {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Clear cart after successful payment
    clearCart();

    // Get order data from localStorage (set before Stripe redirect)
    const pendingOrder = localStorage.getItem("pendingOrder");
    if (pendingOrder) {
      setOrderData(JSON.parse(pendingOrder));
      // Clear pending order data
      localStorage.removeItem("pendingOrder");
    }
  }, []);

  return (
    <>
      <SEO
        title="Payment Successful | Personal Best Sportswear"
        description="Your order has been placed successfully"
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 pt-32 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-6"
            >
              <CheckCircleIcon className="w-24 h-24 text-green-500" />
            </motion.div>

            {/* Success Message */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Payment Successful! 🎉
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 mb-8"
            >
              Thank you for your order. We've received your payment and will
              start processing your order right away.
            </motion.p>

            {/* Order Summary */}
            {orderData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-50 rounded-xl p-6 mb-8 text-left"
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3">
                  {orderData.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}

                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900">
                        ${orderData.subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-gray-900">
                        {orderData.shipping === 0
                          ? "FREE"
                          : `$${orderData.shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Tax</span>
                      <span className="text-gray-900">
                        ${orderData.tax.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-3 mt-3">
                      <span className="text-gray-900">Total</span>
                      <span className="text-green-600">
                        ${orderData.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-blue-50 rounded-xl p-6 mb-8 text-left"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What happens next?
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>You'll receive a confirmation email shortly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>
                    We'll send you tracking information once your order ships
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Expected delivery: 3-5 business days</span>
                </li>
              </ul>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="/shop-men"
                className="px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </a>
              <a
                href="/"
                className="px-8 py-4 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Back to Home
              </a>
            </motion.div>

            {/* Support */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-sm text-gray-500 mt-8"
            >
              Need help? Contact us at{" "}
              <a
                href="mailto:support@personalbest.com"
                className="text-blue-600 hover:underline"
              >
                support@personalbest.com
              </a>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
