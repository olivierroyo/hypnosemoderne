// Cookie Consent Management with Third-Party Blocking
(function() {
  const CONSENT_KEY = 'cookie_consent';

  // Check if user has already made a choice
  function hasConsent() {
    return localStorage.getItem(CONSENT_KEY) !== null;
  }

  // Get consent status
  function getConsent() {
    return localStorage.getItem(CONSENT_KEY) === 'accepted';
  }

  // Save consent choice
  function setConsent(accepted) {
    localStorage.setItem(CONSENT_KEY, accepted ? 'accepted' : 'refused');
  }

  // Block YouTube iframes - replace with placeholders
  function blockYouTube() {
    // Handle iframes with data-src (preferred - never loads until consent)
    const lazyIframes = document.querySelectorAll('iframe[data-src*="youtube"], iframe[data-src*="youtu.be"]');
    lazyIframes.forEach(iframe => {
      const wrapper = iframe.closest('.video-wrapper') || iframe.parentElement;
      const src = iframe.dataset.src;

      // Create placeholder
      const placeholder = document.createElement('div');
      placeholder.className = 'cookie-placeholder cookie-placeholder-youtube';
      placeholder.innerHTML = `
        <div class="cookie-placeholder-content">
          <i class="fab fa-youtube" style="font-size: 3rem; color: #ff0000; margin-bottom: 15px;"></i>
          <p><strong>Contenu YouTube bloqué</strong></p>
          <p>Ce contenu nécessite votre consentement pour les cookies tiers.</p>
          <button class="cookie-btn cookie-btn-accept cookie-placeholder-btn" onclick="window.cookieConsent.acceptAndLoad(this)">
            Accepter et afficher
          </button>
        </div>
      `;

      iframe.style.display = 'none';
      iframe.dataset.blocked = 'true';
      wrapper.appendChild(placeholder);
    });

    // Handle iframes with src (legacy - stop loading)
    const loadedIframes = document.querySelectorAll('iframe[src*="youtube"], iframe[src*="youtu.be"]');
    loadedIframes.forEach(iframe => {
      const wrapper = iframe.closest('.video-wrapper') || iframe.parentElement;
      const src = iframe.src;

      // Store original src and remove it to stop loading
      iframe.dataset.src = src;
      iframe.removeAttribute('src');

      // Create placeholder
      const placeholder = document.createElement('div');
      placeholder.className = 'cookie-placeholder cookie-placeholder-youtube';
      placeholder.innerHTML = `
        <div class="cookie-placeholder-content">
          <i class="fab fa-youtube" style="font-size: 3rem; color: #ff0000; margin-bottom: 15px;"></i>
          <p><strong>Contenu YouTube bloqué</strong></p>
          <p>Ce contenu nécessite votre consentement pour les cookies tiers.</p>
          <button class="cookie-btn cookie-btn-accept cookie-placeholder-btn" onclick="window.cookieConsent.acceptAndLoad(this)">
            Accepter et afficher
          </button>
        </div>
      `;

      iframe.style.display = 'none';
      iframe.dataset.blocked = 'true';
      wrapper.appendChild(placeholder);
    });
  }

  // Block Calendly widgets
  function blockCalendly() {
    const calendlyLinks = document.querySelectorAll('a[href*="calendly.com"]');
    // Calendly links are okay - they open in new tab
    // Only block if there are embedded widgets
    const calendlyWidgets = document.querySelectorAll('.calendly-inline-widget, [data-url*="calendly"]');
    calendlyWidgets.forEach(widget => {
      const placeholder = document.createElement('div');
      placeholder.className = 'cookie-placeholder cookie-placeholder-calendly';
      placeholder.dataset.html = widget.outerHTML;
      placeholder.innerHTML = `
        <div class="cookie-placeholder-content">
          <i class="fas fa-calendar-alt" style="font-size: 3rem; color: var(--accent-color); margin-bottom: 15px;"></i>
          <p><strong>Calendrier Calendly bloqué</strong></p>
          <p>Ce contenu nécessite votre consentement pour les cookies tiers.</p>
          <button class="cookie-btn cookie-btn-accept cookie-placeholder-btn" onclick="window.cookieConsent.acceptAndLoad(this)">
            Accepter et afficher
          </button>
        </div>
      `;
      widget.style.display = 'none';
      widget.dataset.blocked = 'true';
      widget.parentElement.insertBefore(placeholder, widget);
    });
  }

  // Restore blocked content
  function restoreBlockedContent() {
    // Restore YouTube - set the src from data-src to load the video
    document.querySelectorAll('iframe[data-blocked="true"]').forEach(iframe => {
      if (iframe.dataset.src) {
        iframe.src = iframe.dataset.src;
      }
      iframe.style.display = '';
      iframe.removeAttribute('data-blocked');
    });

    // Remove placeholders
    document.querySelectorAll('.cookie-placeholder').forEach(placeholder => {
      placeholder.remove();
    });

    // Restore Calendly widgets
    document.querySelectorAll('[data-blocked="true"]').forEach(el => {
      el.style.display = '';
      el.removeAttribute('data-blocked');
    });
  }

  // Accept consent and load specific content
  function acceptAndLoad(button) {
    setConsent(true);
    hideBanner();
    restoreBlockedContent();
  }

  // Create and show the banner
  function createBanner() {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.id = 'cookieBanner';
    banner.innerHTML = `
      <div class="cookie-banner-content">
        <div class="cookie-banner-text">
          <p><strong>Gestion des cookies</strong><br>
          Ce site utilise des services tiers (YouTube, Calendly) qui peuvent déposer des cookies.
          Ces contenus sont bloqués par défaut. Vous pouvez accepter ou refuser leur utilisation.
          <a href="mentions-legales.html#cookies">En savoir plus</a></p>
        </div>
        <div class="cookie-banner-buttons">
          <button class="cookie-btn cookie-btn-accept" id="cookieAccept">Tout accepter</button>
          <button class="cookie-btn cookie-btn-refuse" id="cookieRefuse">Tout refuser</button>
        </div>
      </div>
    `;
    document.body.appendChild(banner);

    // Show banner with animation
    setTimeout(() => banner.classList.add('show'), 100);

    // Event listeners
    document.getElementById('cookieAccept').addEventListener('click', function() {
      setConsent(true);
      hideBanner();
      restoreBlockedContent();
    });

    document.getElementById('cookieRefuse').addEventListener('click', function() {
      setConsent(false);
      hideBanner();
      // Content stays blocked
    });
  }

  // Hide the banner
  function hideBanner() {
    const banner = document.getElementById('cookieBanner');
    if (banner) {
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 400);
    }
  }

  // Initialize on DOM ready
  function init() {
    // If consent already given and accepted, don't block
    if (hasConsent() && getConsent()) {
      return; // Content loads normally
    }

    // Block third-party content
    blockYouTube();
    blockCalendly();

    // Show banner if no choice made yet
    if (!hasConsent()) {
      createBanner();
    }
  }

  // Expose API for placeholder buttons
  window.cookieConsent = {
    acceptAndLoad: acceptAndLoad,
    getConsent: getConsent,
    hasConsent: hasConsent
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
