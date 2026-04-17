import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import {
  ShoppingCartIcon,
  HeartIcon,
  TruckIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { getProductByHandle, getImageUrl } from "../lib/medusa";
import { addToCart } from "../utils/cartUtils";

/* ─── helpers ─── */

function getVariantPrice(variant) {
  if (!variant) return null;
  const cp = variant.calculated_price;
  if (cp) {
    const amt = cp.calculated_amount ?? cp.original_amount;
    if (amt != null) return (amt / 100).toFixed(2);
  }
  if (variant.prices?.length) {
    const usd = variant.prices.find((p) => p.currency_code === "usd");
    const pick = usd || variant.prices[0];
    if (pick?.amount != null) return (pick.amount / 100).toFixed(2);
  }
  return null;
}

function getSizes(product) {
  if (!product?.variants) return [];
  const sizes = product.variants
    .map(
      (v) =>
        v.options?.find((o) => o.option?.title?.toLowerCase() === "size")
          ?.value,
    )
    .filter(Boolean);
  return [...new Set(sizes)];
}

function getColors(product) {
  if (!product?.variants) return [];
  const colors = product.variants
    .map(
      (v) =>
        v.options?.find((o) => o.option?.title?.toLowerCase() === "color")
          ?.value,
    )
    .filter(Boolean);
  return [...new Set(colors)];
}

function findVariant(product, color, size) {
  if (!product?.variants) return null;
  return (
    product.variants.find((v) => {
      const vColor = v.options?.find(
        (o) => o.option?.title?.toLowerCase() === "color",
      )?.value;
      const vSize = v.options?.find(
        (o) => o.option?.title?.toLowerCase() === "size",
      )?.value;
      const colorMatch = !color || vColor === color;
      const sizeMatch = !size || vSize === size;
      return colorMatch && sizeMatch;
    }) || null
  );
}

function collectionLink(collection) {
  if (!collection?.handle) return null;
  if (collection.handle.includes("men")) return "/shop/men";
  if (collection.handle.includes("women")) return "/shop/women";
  return null;
}

/* ─── component ─── */

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    getProductByHandle(id)
      .then((data) => setProduct(data))
      .catch(() => setProduct(null));
  }, [id]);

  const images = product?.images?.length
    ? product.images.map((img) => getImageUrl(img.url))
    : product?.thumbnail
      ? [getImageUrl(product.thumbnail)]
      : [];

  const sizes = getSizes(product);
  const colors = getColors(product);

  // Selected variant (reacts to color/size change)
  const selectedVariant =
    findVariant(product, selectedColor, selectedSize) ||
    product?.variants?.[0] ||
    null;
  const price = getVariantPrice(selectedVariant);
  const variantSku = selectedVariant?.sku;

  const handleAddToCart = () => {
    if (!selectedSize && sizes.length > 0) {
      alert("Please select a size");
      return;
    }
    addToCart({
      id: product.id,
      variantId: selectedVariant?.id || null,
      name: product.title,
      price: price,
      image: images[0] || "",
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedSize && sizes.length > 0) {
      alert("Please select a size");
      return;
    }
    addToCart({
      id: product.id,
      variantId: selectedVariant?.id || null,
      name: product.title,
      price: price,
      image: images[0] || "",
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    });
    navigate("/cart");
  };

  /* ─── loading ─── */
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  /* ─── derived Medusa data ─── */
  const collection = product.collection;
  const categories = product.categories || [];
  const tags = product.tags || [];
  const subtitle = product.subtitle;
  const material = product.material;
  const weight = product.weight;
  const originCountry = product.origin_country;

  // Build specs table from all available fields
  const specs = [];
  if (material) specs.push({ label: "Material", value: material });
  if (weight) specs.push({ label: "Weight", value: `${weight}g` });
  if (originCountry) specs.push({ label: "Origin", value: originCountry });
  if (product.hs_code) specs.push({ label: "HS Code", value: product.hs_code });
  if (product.mid_code)
    specs.push({ label: "MID Code", value: product.mid_code });
  if (product.type?.value)
    specs.push({ label: "Type", value: product.type.value });
  if (variantSku) specs.push({ label: "SKU", value: variantSku });
  if (selectedVariant?.barcode)
    specs.push({ label: "Barcode", value: selectedVariant.barcode });
  if (selectedVariant?.ean)
    specs.push({ label: "EAN", value: selectedVariant.ean });

  // Dimensions
  const dims = [product.length, product.width, product.height].filter(Boolean);
  if (dims.length > 0)
    specs.push({
      label: "Dimensions (L×W×H)",
      value: `${product.length || "–"} × ${product.width || "–"} × ${product.height || "–"} mm`,
    });

  return (
    <>
      <SEO
        title={`${product.title} | Personal Best Sportswear`}
        description={product.description || product.title}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb from Medusa collection & category */}
            {/* <nav className="flex items-center gap-2 text-sm text-gray-300">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              {collection && (
                <>
                  {collectionLink(collection) ? (
                    <Link
                      to={collectionLink(collection)}
                      className="hover:text-white transition-colors"
                    >
                      {collection.title}
                    </Link>
                  ) : (
                    <span>{collection.title}</span>
                  )}
                  <span>/</span>
                </>
              )}
              {categories.length > 0 && (
                <>
                  <span>{categories[0].name}</span>
                  <span>/</span>
                </>
              )}
              <span className="text-white font-medium">{product.title}</span>
            </nav> */}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ─── Images Section ─── */}
          <div className="space-y-4">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100"
            >
              {images.length > 0 ? (
                <img
                  src={images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-400 text-6xl">👕</span>
                </div>
              )}
              {/* Favorite */}
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
              {/* Subtitle badge */}
              {subtitle && (
                <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  {subtitle}
                </span>
              )}
            </motion.div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((image, index) => (
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
                      alt={`${product.title} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ─── Product Info Section ─── */}
          <div className="space-y-6">
            {/* Collection & Category badges */}
            <div className="flex flex-wrap items-center gap-2">
              {collection && (
                <span className="text-xs font-semibold uppercase tracking-wider bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                  {collection.title}
                </span>
              )}
              {categories.map((cat) => (
                <span
                  key={cat.id}
                  className="text-xs font-semibold uppercase tracking-wider bg-blue-50 text-blue-600 px-3 py-1 rounded-full"
                >
                  {cat.name}
                </span>
              ))}
            </div>

            {/* Title & subtitle */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-1">
                {product.title}
              </h1>
              {subtitle && (
                <p className="text-lg font-semibold text-red-600">{subtitle}</p>
              )}
            </div>

            {/* Price — updates with selected variant */}
            <div className="flex items-baseline gap-3">
              <p className="text-3xl font-bold text-gray-900">
                {price ? `$${price}` : "Price on request"}
              </p>
              {variantSku && (
                <span className="text-sm text-gray-400">SKU: {variantSku}</span>
              )}
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full"
                  >
                    <TagIcon className="w-3 h-3" />
                    {tag.value}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            {product.description && (
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Quick specs row (material + weight) */}
            {(material || weight) && (
              <div className="flex flex-wrap gap-4 text-sm">
                {material && (
                  <span className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg">
                    🧵 {material}
                  </span>
                )}
                {weight && (
                  <span className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg">
                    ⚖️ {weight}g
                  </span>
                )}
                {originCountry && (
                  <span className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg">
                    🌍 {originCountry}
                  </span>
                )}
              </div>
            )}

            {/* Color Selection */}
            {colors.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Color:{" "}
                  {selectedColor && (
                    <span className="font-normal">{selectedColor}</span>
                  )}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border-2 ${
                        selectedColor === color
                          ? "border-black bg-black text-white"
                          : "border-gray-200 bg-gray-100 text-gray-900 hover:border-gray-400"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {sizes.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Size:{" "}
                  {selectedSize && (
                    <span className="font-normal">{selectedSize}</span>
                  )}
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  {sizes.map((size) => (
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
              </div>
            )}

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

            {/* Add to Cart / Buy Now */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={sizes.length > 0 && !selectedSize}
                className="w-full py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <ShoppingCartIcon className="w-5 h-5" />
                {addedToCart
                  ? "Added to Cart! ✓"
                  : sizes.length > 0 && !selectedSize
                    ? "Select a size"
                    : "Add to Cart"}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={sizes.length > 0 && !selectedSize}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
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

        {/* ─── Product Details / Specifications (collapsible) ─── */}
        {specs.length > 0 && (
          <div className="mt-16 border-t pt-8">
            <button
              onClick={() => setDetailsOpen(!detailsOpen)}
              className="flex items-center justify-between w-full text-left"
            >
              <h2 className="text-2xl font-bold text-gray-900">
                Product Specifications
              </h2>
              <span className="text-2xl text-gray-500">
                {detailsOpen ? "−" : "+"}
              </span>
            </button>

            {detailsOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-6 overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                  {specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex justify-between py-3 border-b border-gray-100"
                    >
                      <span className="text-sm font-medium text-gray-500">
                        {spec.label}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* ─── Metadata (if set on product) ─── */}
        {product.metadata && Object.keys(product.metadata).length > 0 && (
          <div className="mt-12 border-t pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Additional Info
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
              {Object.entries(product.metadata).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between py-3 border-b border-gray-100"
                >
                  <span className="text-sm font-medium text-gray-500 capitalize">
                    {key.replace(/_/g, " ")}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
