export const BASE_URL = "https://api.personalbestsportswear.com";
export const API_KEY =
  "pk_e1705eef1255644d3fd81e5b4bcab72e88a9d8f2a6040e4f6ebefd4a8beb1876";

// Fix Medusa image URLs — add /static/ prefix if missing
export function getImageUrl(url) {
  if (!url) return null;
  if (url.includes("/static/")) return url;
  return url.replace(/^(https?:\/\/[^/]+)\//, "$1/static/");
}

// Get best image URL from a product object
export function getProductImageUrl(product) {
  const url = product?.thumbnail || product?.images?.[0]?.url || null;
  return getImageUrl(url);
}

const PRODUCT_FIELDS =
  "id,title,handle,description,subtitle,thumbnail,*images,status," +
  "material,weight,length,height,width,origin_country,hs_code,mid_code,metadata,type," +
  "*collection,*tags,*categories," +
  "*variants,*variants.prices,*variants.options,*variants.options.option";

const headers = {
  "x-publishable-api-key": API_KEY,
  "Content-Type": "application/json",
};

async function storeGet(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`);
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null) {
      if (Array.isArray(val)) {
        val.forEach((v) => url.searchParams.append(`${key}[]`, v));
      } else {
        url.searchParams.set(key, val);
      }
    }
  });
  const res = await fetch(url.toString(), { headers });
  if (!res.ok) throw new Error(`Medusa API error: ${res.status}`);
  return res.json();
}

// Get default region id
let cachedRegionId = null;
async function getRegionId() {
  if (cachedRegionId) return cachedRegionId;
  try {
    const data = await storeGet("/store/regions");
    cachedRegionId = data.regions?.[0]?.id || null;
  } catch {
    cachedRegionId = null;
  }
  return cachedRegionId;
}

// Get all products
export async function getProducts(params = {}) {
  const regionId = await getRegionId();
  const data = await storeGet("/store/products", {
    limit: 100,
    fields: PRODUCT_FIELDS,
    ...(regionId ? { region_id: regionId } : {}),
    ...params,
  });
  return data.products;
}

// Get products by collection handle
export async function getProductsByCollection(collectionHandle) {
  const colData = await storeGet("/store/collections", {
    handle: collectionHandle,
  });
  if (!colData.collections || colData.collections.length === 0) return [];

  const collectionId = colData.collections[0].id;
  const regionId = await getRegionId();
  const data = await storeGet("/store/products", {
    collection_id: [collectionId],
    limit: 100,
    fields: PRODUCT_FIELDS,
    ...(regionId ? { region_id: regionId } : {}),
  });
  return data.products;
}

// Get single product by handle
export async function getProductByHandle(handle) {
  const regionId = await getRegionId();
  const data = await storeGet("/store/products", {
    handle,
    fields: PRODUCT_FIELDS,
    ...(regionId ? { region_id: regionId } : {}),
  });
  return data.products?.[0] || null;
}

// Get all product categories
export async function getCategories() {
  const data = await storeGet("/store/product-categories", {
    limit: 100,
  });
  return data.product_categories || [];
}

// ==========================================
// Cart & Checkout API
// ==========================================

async function storePost(path, body = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Medusa API error ${res.status}: ${text}`);
  }
  return res.json();
}

// Create a new cart
export async function createCart() {
  const regionId = await getRegionId();
  const data = await storePost("/store/carts", {
    region_id: regionId,
  });
  return data.cart;
}

// Add item to Medusa cart
export async function addItemToMedusaCart(cartId, variantId, quantity = 1) {
  const data = await storePost(`/store/carts/${cartId}/line-items`, {
    variant_id: variantId,
    quantity,
  });
  return data.cart;
}

// Get cart
export async function getCart(cartId) {
  const data = await storeGet(`/store/carts/${cartId}`);
  return data.cart;
}

// Medusa v2: Create or get payment collection for a cart
export async function initPaymentCollection(cartId) {
  const data = await storePost(`/store/payment-collections`, {
    cart_id: cartId,
  });
  return data.payment_collection;
}

// Medusa v2: Create payment session (e.g. Stripe) inside a payment collection
export async function createPaymentSession(
  paymentCollectionId,
  providerId = "pp_stripe_stripe",
) {
  const data = await storePost(
    `/store/payment-collections/${paymentCollectionId}/payment-sessions`,
    { provider_id: providerId },
  );
  return data.payment_collection;
}

// Get shipping options for a cart
export async function getShippingOptions(cartId) {
  const data = await storeGet(`/store/shipping-options`, { cart_id: cartId });
  return data.shipping_options || [];
}

// Add shipping method to cart
export async function addShippingMethod(cartId, shippingOptionId) {
  const data = await storePost(`/store/carts/${cartId}/shipping-methods`, {
    option_id: shippingOptionId,
  });
  return data.cart;
}

// Complete cart (finalize order)
export async function completeCart(cartId) {
  const data = await storePost(`/store/carts/${cartId}/complete`);
  return data;
}

// Update cart with customer info
export async function updateCart(cartId, data) {
  const res = await fetch(`${BASE_URL}/store/carts/${cartId}`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Medusa API error ${res.status}: ${text}`);
  }
  return (await res.json()).cart;
}
