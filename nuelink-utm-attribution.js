// attribution.js - Production Attribution Tracker for Nuelink
(function () {
  const ATTRIBUTION_COOKIE = 'nl_first_paid';
  const COOKIE_DOMAIN = '.nuelink.com';

  // Helper: Read a cookie by name
  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  // Helper: Parse all expected URL parameters into an object
  function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const data = {};
    const keys = [
      // Standard UTMs
      'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
      // Ad Network Click IDs
      'fbclid', 'gclid', 'gbraid', 'wbraid', 'msclkid', 'ttclid', 'li_fat_id', 'twclid', 'epik', 'sccid',
      // Explicit First Paid Layer (Passed from offer site)
      'first_paid_source', 'first_paid_medium', 'first_paid_campaign', 'first_paid_content',
      // Offer Landing Context
      'offer_landing_host', 'offer_name', 'offer_variant',
      // Meta Pixel Cookies
      '_fbc', '_fbp'
    ];

    keys.forEach((key) => {
      const val = params.get(key);
      if (val) data[key] = val;
    });

    return data;
  }

  // Helper: Mint _fbc if absent but fbclid is present
  function getOrMintFbc(fbclid, urlFbc, cookieFbc, timestampMs) {
    if (urlFbc) return urlFbc;
    if (cookieFbc) return cookieFbc;
    const nativePixelFbc = getCookie('_fbc');
    if (nativePixelFbc) return nativePixelFbc;

    if (fbclid) {
      const ts = timestampMs || Date.now();
      return `fb.1.${ts}.${fbclid}`;
    }

    return null;
  }

  // 1. Capture landing ad parameters and store in root domain cookie if not already set
  function initAttributionCapture() {
    const params = getUrlParams();

    // Rule: Treat utm_source = offer.nuelink.com as organic fallback, not paid
    if (params.utm_source === 'offer.nuelink.com') {
      delete params.utm_source;
    }

    // Check if visit contains any paid ad identifiers
    const hasPaidParam = Boolean(
      params.fbclid || params.gclid || params.gbraid || params.wbraid || 
      params.msclkid || params.ttclid || params.li_fat_id || params.twclid || 
      params.epik || params.sccid || params.utm_source || params.utm_campaign ||
      params.first_paid_source
    );

    const existingCookie = getCookie(ATTRIBUTION_COOKIE);

    // Write cookie ONLY if it does NOT exist yet (Preserve First Touch)
    if (!existingCookie && hasPaidParam) {
      const nowMs = Date.now();
      const cookiePayload = {
        first_paid_source: params.first_paid_source || params.utm_source || null,
        first_paid_medium: params.first_paid_medium || params.utm_medium || null,
        first_paid_campaign: params.first_paid_campaign || params.utm_campaign || null,
        first_paid_content: params.first_paid_content || params.utm_content || null,
        
        offer_landing_host: params.offer_landing_host || window.location.hostname,
        offer_name: params.offer_name || null,
        offer_variant: params.offer_variant || null,

        fbclid: params.fbclid || null,
        gclid: params.gclid || null,
        _fbc: params._fbc || null,
        _fbp: params._fbp || getCookie('_fbp') || null,

        first_seen: new Date().toISOString(),
        first_seen_ms: nowMs,
        landing_url: window.location.href,
        referrer: document.referrer || ''
      };

      const cookieValue = encodeURIComponent(JSON.stringify(cookiePayload));
      
      // Persist for 90 days across all .nuelink.com subdomains
      document.cookie = `${ATTRIBUTION_COOKIE}=${cookieValue}; Domain=${COOKIE_DOMAIN}; Path=/; Max-Age=7776000; SameSite=Lax; Secure`;
    }
  }

  // 2. Build the complete payload for backend consumption at signup
  function getSignupAttributionPayload() {
    const urlParams = getUrlParams();
    let firstTouchData = {};

    // Read fallback cookie from root domain
    const cookieRaw = getCookie(ATTRIBUTION_COOKIE);
    if (cookieRaw) {
      try {
        firstTouchData = JSON.parse(cookieRaw);
      } catch (e) {
        console.error('Failed to parse nl_first_paid cookie', e);
      }
    }

    const fbclid = urlParams.fbclid || firstTouchData.fbclid || null;
    const fbclidTimestampMs = firstTouchData.first_seen_ms || Date.now();

    return {
      // --- LIVE / CURRENT TOUCH LAYER ---
      utm_source: urlParams.utm_source || null,
      utm_medium: urlParams.utm_medium || null,
      utm_campaign: urlParams.utm_campaign || null,
      utm_content: urlParams.utm_content || null,
      utm_term: urlParams.utm_term || null,

      // --- ORIGINAL ACQUISITION (FIRST PAID) LAYER ---
      first_paid_source: urlParams.first_paid_source || firstTouchData.first_paid_source || urlParams.utm_source || null,
      first_paid_medium: urlParams.first_paid_medium || firstTouchData.first_paid_medium || urlParams.utm_medium || null,
      first_paid_campaign: urlParams.first_paid_campaign || firstTouchData.first_paid_campaign || urlParams.utm_campaign || null,
      first_paid_content: urlParams.first_paid_content || firstTouchData.first_paid_content || urlParams.utm_content || null,

      // --- OFFER CONTEXT ---
      offer_landing_host: urlParams.offer_landing_host || firstTouchData.offer_landing_host || window.location.hostname,
      offer_name: urlParams.offer_name || firstTouchData.offer_name || null,
      offer_variant: urlParams.offer_variant || firstTouchData.offer_variant || null,

      // --- CLICK IDENTIFIERS (ALL NETWORKS) ---
      fbclid: fbclid,
      gclid: urlParams.gclid || firstTouchData.gclid || null,
      gbraid: urlParams.gbraid || null,
      wbraid: urlParams.wbraid || null,
      msclkid: urlParams.msclkid || null,
      ttclid: urlParams.ttclid || null,
      li_fat_id: urlParams.li_fat_id || null,
      twclid: urlParams.twclid || null,
      epik: urlParams.epik || null,
      sccid: urlParams.sccid || null,

      // --- META CAPI & TRACKING DEDUPLICATION ---
      fbc: getOrMintFbc(fbclid, urlParams._fbc, firstTouchData._fbc, fbclidTimestampMs),
      fbp: urlParams._fbp || getCookie('_fbp') || firstTouchData._fbp || null,
      fbclid_timestamp_ms: fbclidTimestampMs,

      // --- USER METADATA ---
      landing_url: firstTouchData.landing_url || window.location.href,
      referrer: document.referrer || firstTouchData.referrer || '',
      client_user_agent: window.navigator ? window.navigator.userAgent : null
    };
  }

  // Auto-initialize capture on page load across offer.nuelink.com, www.nuelink.com, and app.nuelink.com
  if (typeof window !== 'undefined') {
    initAttributionCapture();

    window.NuelinkAttribution = {
      getSignupPayload: getSignupAttributionPayload,
      init: initAttributionCapture
    };
  }
})();