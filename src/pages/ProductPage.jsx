import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import {
  ShoppingCartIcon,
  HeartIcon,
  TruckIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

const productData = {
  1: {
    name: "Performance Training T-Shirt",
    price: 45,
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=2787&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2787&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?q=80&w=2940&auto=format&fit=crop",
    ],
    description:
      "Built for intense training sessions and everyday movement. This performance t-shirt features moisture-wicking fabric, 4-way stretch, and a comfortable athletic fit.",
    features: [
      "Moisture-wicking fabric keeps you dry",
      "4-way stretch for unrestricted movement",
      "Anti-odor technology",
      "Flatlock seams prevent chafing",
      "Athletic fit - not too tight, not too loose",
    ],
    fabric: "88% Polyester, 12% Elastane",
    care: "Machine wash cold, tumble dry low",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Grey", "White"],
    forActivity: "Training, Running, Daily Wear",
  },
};

export default function ProductPage() {
  const { id } = useParams();
  const product = productData[id] || productData[1];

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <>
      <SEO
        title={`${product.name} | Personal Best Sportswear`}
        description={product.description}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                {isFavorite ? (
                  <HeartSolidIcon className="w-6 h-6 text-red-500" />
                ) : (
                  <HeartIcon className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </motion.div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
                    selectedImage === index
                      ? "ring-4 ring-blue-600"
                      : "ring-2 ring-gray-200 hover:ring-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-gray-900">
                ${product.price}
              </p>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Color: <span className="font-normal">{selectedColor}</span>
              </h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? "border-blue-600 ring-4 ring-blue-100"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    style={{
                      backgroundColor:
                        color.toLowerCase() === "white"
                          ? "#ffffff"
                          : color.toLowerCase() === "black"
                          ? "#000000"
                          : color.toLowerCase() === "navy"
                          ? "#001f3f"
                          : color.toLowerCase() === "grey"
                          ? "#808080"
                          : color.toLowerCase(),
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Size:{" "}
                {selectedSize && (
                  <span className="font-normal">{selectedSize}</span>
                )}
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button className="text-sm text-blue-600 hover:underline mt-2">
                Size Guide
              </button>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold"
                >
                  −
                </button>
                <span className="text-xl font-semibold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="space-y-3">
              <button
                disabled={!selectedSize}
                className="w-full py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <ShoppingCartIcon className="w-5 h-5" />
                {selectedSize ? "Add to Cart" : "Select a size"}
              </button>
            </div>

            {/* Features */}
            <div className="pt-6 border-t space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fabric & Care */}
            <div className="space-y-3 pt-6 border-t">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Fabric & Materials
                </h4>
                <p className="text-gray-600">{product.fabric}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Care Instructions
                </h4>
                <p className="text-gray-600">{product.care}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Best For</h4>
                <p className="text-gray-600">{product.forActivity}</p>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <TruckIcon className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                <p className="text-sm font-semibold">Free Shipping</p>
                <p className="text-xs text-gray-600">Over $100</p>
              </div>
              <div className="text-center">
                <ArrowPathIcon className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                <p className="text-sm font-semibold">Easy Returns</p>
                <p className="text-xs text-gray-600">30 days</p>
              </div>
              <div className="text-center">
                <ShieldCheckIcon className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                <p className="text-sm font-semibold">Quality</p>
                <p className="text-xs text-gray-600">Guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
