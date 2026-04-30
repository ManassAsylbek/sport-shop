import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ToastContext } from "./toastContext";

const TYPE_STYLES = {
  success: {
    bar: "bg-emerald-500",
    icon: <CheckCircleIcon className="w-6 h-6 text-emerald-500" />,
  },
  error: {
    bar: "bg-rose-500",
    icon: <ExclamationCircleIcon className="w-6 h-6 text-rose-500" />,
  },
  info: {
    bar: "bg-gray-900",
    icon: <InformationCircleIcon className="w-6 h-6 text-gray-900" />,
  },
};

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message, { type = "info", duration = 3000 } = {}) => {
      const id = ++idCounter;
      setToasts((prev) => [...prev, { id, message, type }]);
      if (duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
      }
      return id;
    },
    []
  );

  const api = {
    toast: showToast,
    success: (msg, opts) => showToast(msg, { ...opts, type: "success" }),
    error: (msg, opts) => showToast(msg, { ...opts, type: "error" }),
    info: (msg, opts) => showToast(msg, { ...opts, type: "info" }),
    dismiss,
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none w-[calc(100%-2rem)] max-w-sm sm:w-auto">
        <AnimatePresence initial={false}>
          {toasts.map((t) => {
            const style = TYPE_STYLES[t.type] || TYPE_STYLES.info;
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, x: 80, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 80, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
                className="pointer-events-auto relative flex items-start gap-3 bg-white border border-gray-100 shadow-xl rounded-xl pl-4 pr-3 py-3 overflow-hidden"
                role="status"
              >
                <span className={`absolute left-0 top-0 bottom-0 w-1 ${style.bar}`} />
                <div className="shrink-0 mt-0.5">{style.icon}</div>
                <p className="flex-1 text-sm text-gray-800 leading-snug pt-0.5">
                  {t.message}
                </p>
                <button
                  onClick={() => dismiss(t.id)}
                  className="shrink-0 p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                  aria-label="Close"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

