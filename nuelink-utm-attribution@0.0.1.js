// attribution.js
(function () {
  const ATTRIBUTION_COOKIE = 'nl_first_paid';
  const COOKIE_DOMAIN = '.nuelink.com';

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const data = {};
    const keys = [
      'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
      'fbclid', 'gclid', 'gbraid', 'wbraid', 'msclkid', 'ttclid', 'li_fat_id', 'twclid', 'epik', 'sccid',
      'first_paid_source', 'first_paid_medium', 'first_paid_campaign', 'first_paid_content',
      'offer_landing_host', 'offer_name', 'offer_variant',
      '_fbc', '_fbp'
    ];

    keys.forEach((key) => {
      const val = params.get(key);
      if (val) data[key] = val;
    });

    return data;
  }

  function getOrMintFbc(fbclid, urlFbc) {
    if (urlFbc) return urlFbc;
    const existingCookieFbc = getCookie('_fbc');
    if (existingCookieFbc) return existingCookieFbc;
    if (fbclid) return `fb.1.${Date.now()}.${fbclid}`;
    return null;
  }

  function initAttributionCapture() {
    const params = getUrlParams();
    if (params.utm_source === 'offer.nuelink.com') {
      delete params.utm_source;
    }

    const hasPaidParam = Boolean(
      params.fbclid || params.gclid || params.gbraid || params.wbraid || 
      params.msclkid || params.ttclid || params.li_fat_id || params.twclid || 
      params.epik || params.sccid || params.utm_source || params.utm_campaign
    );

    const existingCookie = getCookie(ATTRIBUTION_COOKIE);

    if (!existingCookie && hasPaidParam) {
      const cookiePayload = {
        ...params,
        first_seen: new Date().toISOString(),
        referrer: document.referrer || ''
      };

      const cookieValue = encodeURIComponent(JSON.stringify(cookiePayload));
      document.cookie = `${ATTRIBUTION_COOKIE}=${cookieValue}; Domain=${COOKIE_DOMAIN}; Path=/; Max-Age=7776000; SameSite=Lax; Secure`;
    }
  }

  function getSignupAttributionPayload() {
    const urlParams = getUrlParams();
    let firstTouchData = {};

    const cookieRaw = getCookie(ATTRIBUTION_COOKIE);
    if (cookieRaw) {
      try {
        firstTouchData = JSON.parse(cookieRaw);
      } catch (e) {
        console.error('Failed to parse nl_first_paid cookie', e);
      }
    }

    const fbclid = urlParams.fbclid || firstTouchData.fbclid || null;

    return {
      utm_source: urlParams.utm_source || null,
      utm_medium: urlParams.utm_medium || null,
      utm_campaign: urlParams.utm_campaign || null,
      utm_content: urlParams.utm_content || null,
      utm_term: urlParams.utm_term || null,

      first_paid_source: urlParams.first_paid_source || firstTouchData.first_paid_source || firstTouchData.utm_source || null,
      first_paid_medium: urlParams.first_paid_medium || firstTouchData.first_paid_medium || firstTouchData.utm_medium || null,
      first_paid_campaign: urlParams.first_paid_campaign || firstTouchData.first_paid_campaign || firstTouchData.utm_campaign || null,
      first_paid_content: urlParams.first_paid_content || firstTouchData.first_paid_content || firstTouchData.utm_content || null,

      offer_landing_host: urlParams.offer_landing_host || firstTouchData.offer_landing_host || null,
      offer_name: urlParams.offer_name || firstTouchData.offer_name || null,
      offer_variant: urlParams.offer_variant || firstTouchData.offer_variant || null,

      fbclid: fbclid,
      gclid: urlParams.gclid || firstTouchData.gclid || null,
      _fbc: getOrMintFbc(fbclid, urlParams._fbc || firstTouchData._fbc),
      _fbp: urlParams._fbp || getCookie('_fbp') || firstTouchData._fbp || null,
    };
  }

  // Auto-initialize capture on script execution
  if (typeof window !== 'undefined') {
    initAttributionCapture();
    
    // Attach to window object for form submissions
    window.NuelinkUtmAttribution = {
      getSignupPayload: getSignupAttributionPayload,
      init: initAttributionCapture
    };
  }
})();