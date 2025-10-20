// Global i18n utility
import { translations } from './translations.ts';

export function initI18n() {
  // Check for URL parameter to force language (useful for testing)
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang');
  
  // Explicitly get language from localStorage, defaulting to 'en' for first-time visitors
  let currentLang = localStorage.getItem('language');
  
  // If URL parameter is provided, use it and save to localStorage
  if (langParam && (langParam === 'en' || langParam === 'zh')) {
    currentLang = langParam;
    localStorage.setItem('language', langParam);
    console.log('Language set from URL parameter:', langParam);
  }
  // If no language is set (first visit), explicitly set to 'en'
  else if (!currentLang) {
    currentLang = 'en';
    localStorage.setItem('language', 'en');
    console.log('First visit - language set to default: en');
  } else {
    console.log('Language loaded from localStorage:', currentLang);
  }

  window.i18n = {
    currentLang,
    t: function(key) {
      return translations[this.currentLang]?.[key] || translations.en[key] || key;
    },
    setLang: function(lang) {
      this.currentLang = lang;
      localStorage.setItem('language', lang);
      updatePage();
      // Dispatch event for components to update (but not trigger updatePage again)
      window.dispatchEvent(new CustomEvent('languageChange', {
        detail: { lang: lang }
      }));
    }
  };

  // Update all i18n elements (without triggering events)
  function updatePage() {
    // Update navigation links
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = window.i18n.t(key);
    });
  }

  // Listen for language change from Header component
  window.addEventListener('languageChange', (e) => {
    window.i18n.currentLang = e.detail.lang;
    // Only update the i18n elements, don't retrigger the event
    updatePage();
  });

  // Initial update
  updatePage();
}

// Helper to get translated value from object or string
export function getLocalizedValue(value, lang) {
  if (typeof value === 'object' && value !== null) {
    return value[lang] || value.en || '';
  }
  return value || '';
}
