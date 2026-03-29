import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import SEO from "../components/SEO";
import {
  getCartFromStorage,
  calculateCartTotals,
  clearCart,
} from "../utils/cartUtils";
import {
  createCart,
  addItemToMedusaCart,
  updateCart,
  initPaymentCollection,
  createPaymentSession,
  completeCart,
  BASE_URL,
  API_KEY,
  getImageUrl,
} from "../lib/medusa";

const stripePromise = loadStripe(
  "pk_test_51T7dydFPYGyTNPd1ZBrX0RmqQo1rPANtYjp2Goeod3c1TsX1HUQGVVBYU9KdOOlVtidQbZQpCBlta9HSraY9gk1800gaj30x8C",
);

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Inter", "Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": { color: "#aab7c4" },
    },
    invalid: { color: "#fa755a", iconColor: "#fa755a" },
  },
};

function CheckoutForm({ cartItems, total, subtotal, shipping, tax }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("us");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      // 1. Create Medusa cart
      const cart = await createCart();
      const cartId = cart.id;

      // 2. Add items to cart
      for (const item of cartItems) {
        // We need variant_id — for now use product id matching
        // In production, you'd store variant_id when adding to localStorage cart
        if (item.variantId) {
          await addItemToMedusaCart(cartId, item.variantId, item.quantity);
        }
      }

      // 3. Update cart with customer info
      await updateCart(cartId, {
        email,
        shipping_address: {
          first_name: firstName,
          last_name: lastName,
          address_1: address,
          city,
          province,
          postal_code: postalCode,
          country_code: country,
          phone,
        },
        billing_address: {
          first_name: firstName,
          last_name: lastName,
          address_1: address,
          city,
          province,
          postal_code: postalCode,
          country_code: country,
          phone,
        },
      });

      // 4. Create payment collection for cart (Medusa v2)
      const paymentCollection = await initPaymentCollection(cartId);
      console.log("[Medusa] Payment collection:", paymentCollection?.id);

      // 5. Create payment session with Stripe provider
      const updatedCollection = await createPaymentSession(
        paymentCollection.id,
        "pp_stripe_stripe",
      );
      const paymentSession = updatedCollection?.payment_sessions?.[0];
      const clientSecret = paymentSession?.data?.client_secret;
      console.log(
        "[Medusa] Payment session:",
        paymentSession?.id,
        "client_secret:",
        clientSecret ? "✓" : "MISSING",
      );

      if (!clientSecret) {
        throw new Error(
          "No client_secret returned from payment session. Check Stripe configuration.",
        );
      }

      // 6. Confirm the card with Stripe using the PaymentIntent client_secret
      const cardElement = elements.getElement(CardElement);
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${firstName} ${lastName}`,
              email,
              phone,
              address: {
                line1: address,
                city,
                state: province,
                postal_code: postalCode,
                country,
              },
            },
          },
        });

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
        return;
      }
      console.log(
        "[Stripe] PaymentIntent confirmed:",
        paymentIntent.id,
        "status:",
        paymentIntent.status,
      );

      // 7. Complete cart → creates order in Medusa
      const result = await completeCart(cartId);
      console.log("[Medusa] completeCart result:", result);

      if (result?.type === "order") {
        console.log("[Medusa] Order created! ID:", result.data?.id);
      } else {
        console.warn("[Medusa] Unexpected completeCart response:", result);
      }

      // 9. Success! Clear cart and redirect
      clearCart();
      localStorage.setItem(
        "pendingOrder",
        JSON.stringify({
          items: cartItems,
          subtotal,
          shipping,
          tax,
          total,
          paymentMethodId: paymentIntent?.payment_method,
          orderId: result?.data?.id,
          timestamp: Date.now(),
        }),
      );
      navigate("/success", {
        state: { orderTotal: total, orderItems: cartItems },
      });
    } catch (err) {
      console.error("[Checkout] Error:", err);
      setError(err.message || "Something went wrong. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Info */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
          />
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
            <input
              type="text"
              placeholder="State / Province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            >
              <option value="us">United States</option>
              <option value="ca">Canada</option>
              <option value="gb">United Kingdom</option>
              <option value="au">Australia</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payment */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Payment</h3>
        <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          Secured by Stripe. Your card details are encrypted.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 mb-4 flex items-center justify-center gap-2"
      >
        {processing ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Processing...
          </span>
        ) : (
          `Pay $${total.toFixed(2)}`
        )}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [cartItems] = useState(() => getCartFromStorage());
  const [discount] = useState(0);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  const { subtotal, discountAmount, shipping, tax, total } =
    calculateCartTotals(cartItems, discount);

  if (cartItems.length === 0) return null;

  return (
    <>
      <SEO
        title="Checkout | Personal Best Sportswear"
        description="Complete your purchase"
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-32 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left: Form */}
            <div className="lg:col-span-3">
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  cartItems={cartItems}
                  total={total}
                  subtotal={subtotal}
                  shipping={shipping}
                  tax={tax}
                />
              </Elements>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-28">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.cartId} className="flex gap-4">
                      <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                        {item.image ? (
                          <img
                            src={getImageUrl(item.image)}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl">
                            👕
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.color && `${item.color}`}
                          {item.color && item.size && " / "}
                          {item.size && `${item.size}`}
                          {" × "}
                          {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium text-sm">
                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
