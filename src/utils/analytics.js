/**
 * Google Analytics utility functions
 * Measurement ID: G-STFHVRL32Z
 */

/**
 * Track a custom event in Google Analytics
 * @param {string} eventName - The name of the event (e.g., 'button_click', 'purchase')
 * @param {object} eventParams - Additional parameters for the event
 * @example
 * trackEvent('button_click', { button_name: 'buy_now', page: 'home' })
 * trackEvent('purchase', { value: 100, currency: 'USD' })
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams);
  }
};

/**
 * Track a page view manually (usually handled automatically by router)
 * @param {string} pagePath - The path of the page
 * @param {string} pageTitle - Optional page title
 */
export const trackPageView = (pagePath, pageTitle = null) => {
  if (typeof window !== "undefined" && window.gtag) {
    const config = {
      page_path: pagePath,
    };
    if (pageTitle) {
      config.page_title = pageTitle;
    }
    window.gtag("config", "G-STFHVRL32Z", config);
  }
};

/**
 * Set user properties in Google Analytics
 * @param {object} properties - User properties to set
 * @example
 * setUserProperties({ user_id: '12345', user_type: 'premium' })
 */
export const setUserProperties = (properties) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("set", "user_properties", properties);
  }
};
