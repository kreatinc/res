
(function () {
  const ATTRIBUTION_COOKIE = 'nl_first_paid';
  const COOKIE_DOMAIN = '.nuelink.com';
  const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  const FIRST_PAID_KEYS = ['first_paid_source', 'first_paid_medium', 'first_paid_campaign', 'first_paid_content', 'first_paid_term'];
  const CLICK_ID_KEYS = ['fbclid', 'gclid', 'gbraid', 'wbraid', 'msclkid', 'ttclid', 'li_fat_id', 'twclid', 'epik', 'sccid'];

  // Helper: Read a cookie by name
  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (!match) return null;
    try {
      return decodeURIComponent(match[2]);
    } catch (e) {
      return null;
    }
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
      // Time of the forwarded Facebook click (added by offers and public pages)
      'fbclid_timestamp_ms',
      // Explicit First Paid Layer (Passed from offer site)
      'first_paid_source', 'first_paid_medium', 'first_paid_campaign', 'first_paid_content', 'first_paid_term',
      'first_paid_landing_page',
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

  // Website and offer-page buttons tag their signup links with their own labels.
  // Those labels are not acquisition: they must not create, block or fill a
  // first-paid record.
  function isInternal(source, medium) {
    return source === 'nuelink' ||
      (source === 'offer.nuelink.com' && medium === 'landing-page') ||
      (!source && medium === 'landing-page');
  }

  function hasClickId(data) {
    return CLICK_ID_KEYS.some((key) => Boolean(data && data[key]));
  }

  // URL parameters with internal labels removed. Click IDs are always kept.
  function acquisitionParams(params) {
    const clean = Object.assign({}, params);
    if (clean.utm_source === 'offer.nuelink.com') delete clean.utm_source;
    if (isInternal(params.utm_source, params.utm_medium)) {
      UTM_KEYS.forEach((key) => delete clean[key]);
    }
    if (isInternal(clean.first_paid_source, clean.first_paid_medium)) {
      FIRST_PAID_KEYS.forEach((key) => delete clean[key]);
    }
    return clean;
  }

  // The stored first touch, or null when there is none worth keeping. A record
  // made only of internal labels, or one that cannot be read, counts as absent
  // so a later genuine campaign can replace it. A record with internal labels
  // and a real click ID keeps the click and loses the labels.
  function readFirstTouch() {
    const raw = getCookie(ATTRIBUTION_COOKIE);
    if (!raw) return null;
    let data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      console.error('Failed to parse nl_first_paid cookie', e);
      return null;
    }
    if (!data || typeof data !== 'object') return null;
    if (isInternal(data.first_paid_source, data.first_paid_medium)) {
      if (!hasClickId(data)) return null;
      data = Object.assign({}, data);
      FIRST_PAID_KEYS.forEach((key) => { data[key] = null; });
    }
    return data;
  }

  // A positive whole-number time in ms that is not in the future, or null.
  function validTime(value) {
    if (!/^\d+$/.test(String(value === undefined || value === null ? '' : value))) return null;
    const n = Number(value);
    return Number.isSafeInteger(n) && n > 0 && n <= Date.now() ? n : null;
  }

  // fb.<n>.<time>.<click ID>, or null when malformed.
  function parseFbc(value) {
    const match = /^fb\.\d+\.(\d+)\.(.+)$/.exec(value || '');
    const time = match && validTime(match[1]);
    return time ? { id: match[2], time: time, value: value } : null;
  }

  // fbclid, fbc and fbclid_timestamp_ms always describe the same click.
  function selectMetaClick(urlParams, firstTouchData) {
    const candidates = [urlParams._fbc, getCookie('_fbc')].map(parseFbc).filter(Boolean);
    const urlFbclid = urlParams.fbclid;

    // The URL names the click: use an _fbc only if it is for that click.
    if (urlFbclid) {
      const match = candidates.find((entry) => entry.id === urlFbclid);
      if (match) return { fbclid: urlFbclid, fbc: match.value, time: match.time };
      const time = validTime(urlParams.fbclid_timestamp_ms) ||
        (firstTouchData.fbclid === urlFbclid ? validTime(firstTouchData.first_seen_ms) : null) ||
        Date.now();
      return { fbclid: urlFbclid, fbc: `fb.1.${time}.${urlFbclid}`, time: time };
    }

    // No click on the URL: an existing _fbc (usually the Meta pixel's record of
    // the latest click) decides, and the ID and time are read from it.
    if (candidates.length) {
      return { fbclid: candidates[0].id, fbc: candidates[0].value, time: candidates[0].time };
    }

    // Otherwise the first-touch click, as before.
    const firstTime = validTime(firstTouchData.first_seen_ms) || Date.now();
    if (firstTouchData.fbclid) {
      return { fbclid: firstTouchData.fbclid, fbc: `fb.1.${firstTime}.${firstTouchData.fbclid}`, time: firstTime };
    }
    return { fbclid: null, fbc: null, time: firstTime };
  }

  function initAttributionCapture() {
    const params = acquisitionParams(getUrlParams());

    const hasPaidParam = Boolean(
      hasClickId(params) || params.utm_source || params.utm_campaign ||
      params.first_paid_source
    );

    if (!readFirstTouch() && hasPaidParam) {
      const nowMs = Date.now();
      const cookiePayload = {
        first_paid_source: params.first_paid_source || params.utm_source || null,
        first_paid_medium: params.first_paid_medium || params.utm_medium || null,
        first_paid_campaign: params.first_paid_campaign || params.utm_campaign || null,
        first_paid_content: params.first_paid_content || params.utm_content || null,
        first_paid_term: params.first_paid_term || params.utm_term || null,
        first_paid_landing_page: params.first_paid_landing_page || null,

        offer_landing_host: params.offer_landing_host || window.location.hostname,
        offer_name: params.offer_name || null,

        fbclid: params.fbclid || null,
        gclid: params.gclid || null,
        gbraid: params.gbraid || null,
        wbraid: params.wbraid || null,
        msclkid: params.msclkid || null,
        ttclid: params.ttclid || null,
        li_fat_id: params.li_fat_id || null,
        twclid: params.twclid || null,
        epik: params.epik || null,
        sccid: params.sccid || null,

        first_seen: new Date(nowMs).toISOString(),
        first_seen_ms: nowMs,
        referrer: document.referrer || ''
      };

      const cookieValue = encodeURIComponent(JSON.stringify(cookiePayload));

      document.cookie = `${ATTRIBUTION_COOKIE}=${cookieValue}; Domain=${COOKIE_DOMAIN}; Path=/; Max-Age=7776000; SameSite=Lax; Secure`;
    }
  }

  // 2. Build the complete payload for backend consumption at signup
  function getSignupAttributionPayload() {
    const urlParams = getUrlParams();
    const clean = acquisitionParams(urlParams);
    const firstTouchData = readFirstTouch() || {};
    const meta = selectMetaClick(urlParams, firstTouchData);

    return {
      // --- LIVE / CURRENT TOUCH LAYER (unchanged: reports read these as sent) ---
      utm_source: urlParams.utm_source || null,
      utm_medium: urlParams.utm_medium || null,
      utm_campaign: urlParams.utm_campaign || null,
      utm_content: urlParams.utm_content || null,
      utm_term: urlParams.utm_term || null,

      // --- ORIGINAL ACQUISITION (FIRST PAID) LAYER, without internal labels ---
      first_paid_source: clean.first_paid_source || firstTouchData.first_paid_source || clean.utm_source || null,
      first_paid_medium: clean.first_paid_medium || firstTouchData.first_paid_medium || clean.utm_medium || null,
      first_paid_campaign: clean.first_paid_campaign || firstTouchData.first_paid_campaign || clean.utm_campaign || null,
      first_paid_content: clean.first_paid_content || firstTouchData.first_paid_content || clean.utm_content || null,
      first_paid_term: clean.first_paid_term || firstTouchData.first_paid_term || clean.utm_term || null,
      first_paid_landing_page: urlParams.first_paid_landing_page || firstTouchData.first_paid_landing_page || null,

      // --- OFFER CONTEXT ---
      offer_landing_host: urlParams.offer_landing_host || firstTouchData.offer_landing_host || window.location.hostname,
      offer_name: urlParams.offer_name || firstTouchData.offer_name || null,
      offer_variant: urlParams.offer_variant || null,

      // --- CLICK IDENTIFIERS (ALL NETWORKS) ---
      fbclid: meta.fbclid,
      gclid: urlParams.gclid || firstTouchData.gclid || null,
      gbraid: urlParams.gbraid || firstTouchData.gbraid || null,
      wbraid: urlParams.wbraid || firstTouchData.wbraid || null,
      msclkid: urlParams.msclkid || firstTouchData.msclkid || null,
      ttclid: urlParams.ttclid || firstTouchData.ttclid || null,
      li_fat_id: urlParams.li_fat_id || firstTouchData.li_fat_id || null,
      twclid: urlParams.twclid || firstTouchData.twclid || null,
      epik: urlParams.epik || firstTouchData.epik || null,
      sccid: urlParams.sccid || firstTouchData.sccid || null,

      // --- META CAPI & TRACKING DEDUPLICATION ---
      fbc: meta.fbc,
      fbp: urlParams._fbp || getCookie('_fbp') || null,
      fbclid_timestamp_ms: meta.time,

      // --- USER METADATA ---
      signup_url: window.location.href,
      referrer: document.referrer || firstTouchData.referrer || '',
      client_user_agent: window.navigator ? window.navigator.userAgent : null
    };
  }

  if (typeof window !== 'undefined') {
    initAttributionCapture();

    window.NuelinkAttribution = {
      getSignupPayload: getSignupAttributionPayload,
      init: initAttributionCapture
    };
  }
})();
