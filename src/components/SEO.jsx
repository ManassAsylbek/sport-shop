import { useEffect } from "react";

export default function SEO({
  title = "Personal Best Sportswear | Performance Activewear for Movement",
  description = "Performance-driven activewear designed for movement, comfort, and everyday training. Shop men's and women's sportswear built for those who show up.",
  keywords = "activewear, sportswear, performance clothing, training gear, athletic wear, comfortable sportswear, men activewear, women activewear",
  ogImage = "/og-image.jpg",
  url = "https://www.personalbestsportswear.com",
}) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    // Standard meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);

    // Open Graph tags
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:image", ogImage, true);
    updateMetaTag("og:url", url, true);
    updateMetaTag("og:type", "website", true);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", ogImage);

    // Additional SEO tags
    updateMetaTag("viewport", "width=device-width, initial-scale=1.0");
    updateMetaTag("robots", "index, follow");
    updateMetaTag("author", "Personal Best Sportswear");
  }, [title, description, keywords, ogImage, url]);

  return null;
}
