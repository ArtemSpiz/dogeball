/**
 * Analytics via Google Tag Manager (dataLayer).
 */

function ensureDataLayer() {
  if (typeof window === "undefined") return null;
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

/**
 * Track a custom event (GTM dataLayer).
 * @param {string} eventName
 * @param {object} eventParams
 */
export const trackEvent = (eventName, eventParams = {}) => {
  const dl = ensureDataLayer();
  if (!dl) return;
  dl.push({ event: eventName, ...eventParams });
};

/**
 * Track a page view (SPA route changes).
 * @param {string} pagePath
 * @param {string | null} pageTitle
 */
export const trackPageView = (pagePath, pageTitle = null) => {
  const dl = ensureDataLayer();
  if (!dl) return;
  const payload = {
    event: "page_view",
    page_path: pagePath,
  };
  if (pageTitle) payload.page_title = pageTitle;
  dl.push(payload);
};

/**
 * @param {object} properties
 */
export const setUserProperties = (properties) => {
  const dl = ensureDataLayer();
  if (!dl) return;
  dl.push({ user_properties: properties });
};
