import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { getCartItemsCount } from "../utils/cartUtils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Men", href: "/shop-men" },
  { name: "Women", href: "/shop-women" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle cart count updates
  useEffect(() => {
    setCartCount(getCartItemsCount());

    const handleCartUpdate = () => {
      setCartCount(getCartItemsCount());
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    window.addEventListener("storage", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
      window.removeEventListener("storage", handleCartUpdate);
    };
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 overflow-x-hidden ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-x-hidden"
        aria-label="Top"
      >
        <div className="flex items-center justify-between py-2 max-w-full">
          {/* Logo */}
          <div className="flex flex-1 lg:flex-1">
            <a href="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="Personal Best"
                className={`h-10 sm:h-12 md:h-14 lg:h-16 w-auto transition-all ${
                  scrolled ? "brightness-0" : "brightness-100"
                }`}
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:gap-x-6 xl:gap-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm xl:text-base font-semibold transition-colors relative group whitespace-nowrap ${
                  scrolled
                    ? "text-gray-900 hover:text-blue-600"
                    : "text-white hover:text-blue-400"
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${
                    scrolled ? "bg-blue-600" : "bg-blue-400"
                  }`}
                />
              </a>
            ))}
          </div>

          {/* Right side - Cart & Mobile menu */}
          <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">
            <a href="/cart" className="flex-shrink-0 relative">
              <button
                className={`p-2 rounded-lg transition-colors ${
                  scrolled
                    ? "text-gray-900 hover:bg-gray-100"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <ShoppingCartIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </a>

            {/* Mobile menu button */}
            <button
              type="button"
              className={`lg:hidden p-2 rounded-lg transition-colors flex-shrink-0 ${
                scrolled
                  ? "text-gray-900 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <Dialog
            as="div"
            className="lg:hidden"
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 20 }}
              >
                <div className="flex items-center justify-between">
                  <a href="/" className="flex items-center">
                    <img
                      src="/logo.png"
                      alt="Personal Best"
                      className="h-10 w-auto brightness-0"
                    />
                  </a>
                  <button
                    type="button"
                    className="rounded-md p-2.5 text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Panel>
          </Dialog>
        )}
      </AnimatePresence>
    </header>
  );
}
