/**
 * t81u ladder steps 1-2 enumeration (DailyMed + brand site). Report JSON only.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';

const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; KYR-t81u/1.0)' };
const EXCLUDE_IDS = new Set([
  'schiff-b189-neuriva-original-30',
  'move-free-b188-advanced-80',
  'move-free-b189-advanced-msm-120',
  'caltrate-b187-600-d3-60',
  'caltrate-b187-600-d3-200',
  'caltrate-b188-600-d3-120',
  'slowfe-b187-iron-60',
  'rainbow-b187-womens-one-30',
  'rainbow-b187-womens-one-150',
  'rainbow-b188-womens-one-60',
]);

const METH_PATH = '/workspace/docs/METHODOLOGY.md';
const methText = readFileSync(METH_PATH, 'utf8').toLowerCase();

const LOCK_PATTERNS = [
  ['magnesium stearate', /magnesium stearate|vegetable magnesium stearate/i],
  ['microcrystalline cellulose', /microcrystalline cellulose|vegetable cellulose|cellulose(?! gum)/i],
  ['hypromellose', /hypromellose|hydroxypropyl methylcellulose/i],
  ['hydroxypropyl cellulose', /hydroxypropyl cellulose/i],
  ['croscarmellose sodium', /croscarmellose sodium/i],
  ['titanium dioxide', /titanium dioxide/i],
  ['talc', /\btalc\b|magnesium silicate|magnesium trisilicate/i],
  ['polyethylene glycol', /polyethylene glycol|peg-\d+/i],
  ['polyvinyl alcohol', /polyvinyl alcohol/i],
  ['maltodextrin', /maltodextrin/i],
  ['glycerin', /glycerin|vegetable glycerin/i],
  ['gelatin', /\bgelatin\b/i],
  ['silicon dioxide', /silicon dioxide|silica(?!te)/i],
  ['carrageenan', /carrageenan/i],
  ['pectin', /\bpectin\b/i],
  ['tocopherol', /tocopherol/i],
  ['citric acid', /citric acid/i],
  ['modified corn starch', /modified corn starch/i],
  ['magnesium stearate', /magnesium stearate/i],
  ['rice bran', /rice bran(?! oil)/i],
  ['FD&C', /fd&c|red 40|yellow 6|blue 1|blue 2/i],
  ['carnauba', /carnauba/i],
  ['soy lecithin', /soy lecithin|lecithin/i],
  ['carbomer', /carbomer/i],
  ['ascorbic acid', /ascorbic acid/i],
  ['ascorbyl palmitate', /ascorbyl palmitate/i],
  ['beeswax', /beeswax/i],
  ['caramel color', /caramel color|caramel liquid/i],
  ['natural flavors', /natural flavors?/i],
  ['glucose syrup', /glucose syrup/i],
  ['cane sugar', /cane sugar/i],
  ['palm oil gummy', /vegetable oil \(palm\)|palm oil/i],
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchText(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const r = await fetch(url, { headers: UA, redirect: 'follow' });
      const t = await r.text();
      if (r.ok || t.length > 500) return { status: r.status, text: t, url };
    } catch {
      /* retry */
    }
    await sleep(400 * (i + 1));
  }
  return { status: 0, text: '', url };
}

function decodeHtml(s) {
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/<sup>[^<]*<\/sup>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractOiFromRaw(raw) {
  const m =
    raw.match(/Other Ingredients[^<]*<\/strong>([^<]{5,600})<\/p>/i) ||
    raw.match(/Other Ingredients:\s*([^<]{5,600})/i);
  if (!m) return null;
  return decodeHtml(m[1]);
}

function extractSfFromRaw(raw) {
  const chunk =
    raw.match(/Supplement Facts<\/strong>([\s\S]{0,4000}?)<\/(?:p|div|section)/i)?.[1] ||
    raw.match(/Amount Per Serving([\s\S]{0,3000})/i)?.[1];
  if (!chunk) return { actives: [], raw: null };
  const text = decodeHtml(chunk);
  const actives = [];
  const lines = text.split(/\.|\n/).flatMap((l) => [l]);
  for (const line of lines) {
    const am = line.match(/([A-Za-z0-9][^%]{2,50}?)\s+(\d+(?:\.\d+)?)\s*(mg|mcg|g|IU|CFU)/i);
    if (am) actives.push({ name: am[1].trim(), amount: `${am[2]} ${am[3]}` });
  }
  return { actives, raw: text.slice(0, 1200) };
}

function parseVariantsFromGatsby(raw, title = '') {
  const variants = [];
  const blocks = [...raw.matchAll(/netContentStatement":"(\d+\s*CT)"[\s\S]{0,400}?sku":"([^"]+)"/gi)];
  for (const m of blocks) {
    const count = parseInt(m[1], 10);
    const sku = m[2];
    let upc = null;
    if (/^\d{12}$/.test(sku)) upc = sku;
    variants.push({ count, upc, upcSource: upc ? `Schiff page-data sku "${sku}"` : null });
  }
  if (variants.length) return variants;
  const counts = new Set();
  const t = title.match(/(\d+)\s*(tablets|capsules|softgels|gummies|caplets|ct)/i);
  if (t) counts.add(parseInt(t[1], 10));
  for (const m of raw.matchAll(/netContentStatement":"(\d+\s*CT)"/gi)) counts.add(parseInt(m[1], 10));
  if (counts.size === 0) counts.add(null);
  return [...counts].map((count) => ({ count, upc: null, upcSource: null }));
}

function parseCountsFromRaw(raw, title = '') {
  const counts = new Set();
  for (const m of raw.matchAll(/netContentStatement":"(\d+\s*CT)"/gi)) counts.add(parseInt(m[1], 10));
  const t = title.match(/(\d+)\s*(tablets|capsules|softgels|gummies|caplets|ct)/i);
  if (t) counts.add(parseInt(t[1], 10));
  if (counts.size === 0) counts.add(null);
  return [...counts].sort((a, b) => (a || 0) - (b || 0));
}

function tokenizeOi(oi) {
  if (!oi) return [];
  const main = oi.split(/contains\s*<?\s*2\s*%/i)[0];
  const contains = oi.match(/contains\s*<?\s*2\s*%\s*(?:of)?:\s*(.+)$/i)?.[1] || '';
  return (main + ',' + contains)
    .replace(/^other ingredients:\s*/i, '')
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 1);
}

function classifyTokens(tokens) {
  const locked = [];
  const ungraded = [];
  for (const t of tokens) {
    let hit = false;
    for (const [lockName, re] of LOCK_PATTERNS) {
      if (re.test(t) && methText.includes(lockName.split(' ')[0])) {
        locked.push({ token: t, lock: `Methodology §5 (${lockName})` });
        hit = true;
        break;
      }
    }
    if (!hit) ungraded.push(t);
  }
  return { locked, ungraded };
}

function guessTab(name, actives) {
  const n = `${name} ${actives.map((a) => a.name).join(' ')}`.toLowerCase();
  if (/prenatal|pregnancy/.test(n)) return 'Prenatal';
  if (/probiotic|digestive|enzyme|fiber|laxative|antacid|gas |pepcid|prilosec|tums/.test(n)) return 'Digestive';
  if (/immune|echinacea|elderberry|vitamin c.*zinc|airborne/.test(n)) return 'Immune Support';
  if (/sleep|melatonin|night/.test(n)) return 'Sleep';
  if (/allergy|histamine/.test(n)) return 'Allergies';
  if (/cold|flu|cough|sinus/.test(n)) return 'Cold & Flu';
  if (/pain|fever|ibuprofen|acetaminophen/.test(n)) return 'Pain & Fever';
  if (/first aid|bandage|ointment/.test(n)) return 'First Aid';
  if (/joint|glucosamine|chondroitin|move free|osteo|msm|turmeric.*joint/.test(n)) return 'Vitamins';
  return 'Vitamins';
}

function panelStatus(oi, sf, extras = {}) {
  if (extras.supplementFactsImage && !oi)
    return {
      status: 'TRUNCATED',
      reason: `Supplement Facts on brand site are image/carousel only (${extras.supplementFactsImage}); Other Ingredients not in HTML.`,
    };
  if (!oi && !sf.raw && !extras.supplementFactsImage)
    return { status: 'MISSING', reason: 'Brand page did not print Supplement Facts text or Other Ingredients (step 2).' };
  if (!oi)
    return { status: 'TRUNCATED', reason: 'No verbatim Other Ingredients line on brand page (step 2).' };
  if (sf.actives.length === 0)
    return {
      status: 'FULL',
      reason: 'Other Ingredients read from brand HTML at step 2; actives listed as ungraded amounts (typed panel partial or image-backed).',
    };
  return { status: 'FULL', reason: 'Other Ingredients and actives read from brand HTML at step 2.' };
}

function callVerdict({ panel, ungraded, tab, dup, pendingStores }) {
  if (dup) return 'DUP';
  if (tab === 'NO TAB') return 'NO TAB';
  if (panel.status === 'MISSING' || panel.status === 'TRUNCATED') return 'HOLD-PANEL';
  if (ungraded.length) return 'HOLD-TOKEN';
  if (pendingStores) return 'WRITE-READY (pending stores)';
  return 'WRITE-READY (pending stores)';
}

async function schiffProductUrls() {
  const collections = [
    'neuriva',
    'megared',
    'digestive-advantage',
    'digestive-advantage-capsule',
    'digestive-advantage-daily',
    'digestive-health',
    'airborne',
    'airborne-kids',
    'immune-support',
    'immune-supplements',
    'heart-health',
    'heart-health-supplements',
    'brain-health',
    'sleep',
    'focus',
    'memory',
    'joint-health',
    'joint-supplements',
    'base-krill-omegas',
    'advanced-omegas',
    'elderberry-supplements',
    'gummies',
    'capsules',
    'chewable-tablets',
    'effervescent-tablets',
    'gummy-vitamins',
  ];
  const urls = new Set();
  for (const col of collections) {
    const { text } = await fetchText(`https://www.schiffvitamins.com/collections/${col}/`);
    for (const m of text.matchAll(/href="(\/collections\/[^/]+\/products\/[^"]+)"/g)) {
      const u = m[1];
      if (/move-free|osteobiflex|osteo-bi/i.test(u)) continue;
      urls.add(`https://www.schiffvitamins.com${u}`);
    }
    await sleep(150);
  }
  return [...urls];
}

async function moveFreeUrls() {
  const urls = new Set();
  for (const base of ['https://www.movefree.com/collections/move-free/', 'https://www.movefree.com/collections/move-free-advanced/', 'https://www.movefree.com/collections/move-free-ultra/']) {
    const { text } = await fetchText(base);
    for (const m of text.matchAll(/href="(\/collections\/[^"]*\/products\/[^"]+)"/g)) {
      urls.add(`https://www.movefree.com${m[1]}`);
    }
  }
  const schiff = await fetchText('https://www.schiffvitamins.com/collections/move-free/');
  for (const m of schiff.text.matchAll(/href="(\/collections\/[^"]*\/products\/[^"]+)"/g)) {
    urls.add(`https://www.schiffvitamins.com${m[1]}`);
  }
  return [...urls];
}

async function parseGatsbyProduct(pageUrl, brand) {
  const path = pageUrl.replace(/^https?:\/\/[^/]+/, '').replace(/\/$/, '');
  const host = pageUrl.match(/^https?:\/\/[^/]+/)[0];
  let pdUrl = `${host}/page-data${path}/page-data.json`;
  let { text, status } = await fetchText(pdUrl);
  if (!text.startsWith('{') && host.includes('movefree.com')) {
    pdUrl = `https://www.schiffvitamins.com/page-data${path}/page-data.json`;
    ({ text, status } = await fetchText(pdUrl));
  }
  if (!text.startsWith('{')) {
    const slugTitle = path.split('/').pop().replace(/-/g, ' ');
    return {
      brand,
      pageUrl,
      error: `page-data ${status}`,
      candidates: [
        {
          brand,
          productName: slugTitle,
          count: null,
          brandUrl: pageUrl,
          dailymedSetid: null,
          actives: [],
          otherIngredients: null,
          upc: null,
          upcSource: null,
          panel: { status: 'MISSING', reason: 'No Gatsby page-data JSON; PDP not readable at step 2.' },
          searchTab: guessTab(slugTitle, []),
          tokens: { locked: [], ungraded: [] },
          call: 'HOLD-PANEL',
        },
      ],
    };
  }
  const slug = path.split('/').pop();
  const slugTitle = slug
    .replace(/-(\d+)-ct\b/gi, ' $1 ct')
    .replace(/-(\d+)-count\b/gi, ' $1 count')
    .replace(/-/g, ' ');
  const title = slugTitle.replace(/<[^>]+>/g, '');
  const oi = extractOiFromRaw(text);
  const sf = extractSfFromRaw(text);
  const variants = parseVariantsFromGatsby(text, title);
  const panel = panelStatus(oi, sf);
  const { locked, ungraded } = classifyTokens(tokenizeOi(oi || ''));
  const tab = guessTab(title, sf.actives);
  const candidates = variants.map(({ count, upc, upcSource }) => {
    const exactName = count ? `${title} (${count} pieces)` : title;
    return {
      brand,
      productName: exactName,
      count,
      brandUrl: pageUrl,
      dailymedSetid: null,
      actives: sf.actives,
      activesNote: sf.actives.length ? null : 'Actives on Supplement Facts — ungraded list; amounts not extracted from Gatsby HTML (often image panel).',
      otherIngredients: oi,
      upc,
      upcSource,
      panel,
      searchTab: tab,
      tokens: { locked, ungraded },
      call: callVerdict({ panel, ungraded, tab, dup: false, pendingStores: true }),
    };
  });
  return { brand, pageUrl, title, candidates };
}

async function rainbowProducts() {
  const { text } = await fetchText('https://www.rainbowlight.com/products.json?limit=250');
  const { products } = JSON.parse(text);
  const out = [];
  for (const p of products) {
    const pageUrl = `https://www.rainbowlight.com/products/${p.handle}`;
    const { text: html } = await fetchText(pageUrl);
    const oi =
      extractOiFromRaw(html) ||
      html.match(/Other Ingredients[:\s]*([^<]{5,400})/i)?.[1]?.trim() ||
      null;
    const sf = extractSfFromRaw(html);
    const countM = p.title.match(/(\d+)\s*(Vegetarian Caplets|Caplets|Capsules|Tablets|Gummies|Softgels|Rapid Release Capsules|fl oz)/i);
    const count = countM ? parseInt(countM[1], 10) : null;
    const sfImg =
      html.match(/data-supplement-image="([^"]+Supplement20Facts[^"]+)"/i)?.[1] ||
      html.match(/(https?:[^"]+Supplement20Facts[^"]+)/i)?.[1];
    const panel = panelStatus(oi, sf, { supplementFactsImage: sfImg });
    const { locked, ungraded } = classifyTokens(tokenizeOi(oi || ''));
    const tab = guessTab(p.title, sf.actives);
    let upc = null;
    let upcSource = null;
    const barcodeM = html.match(/"barcode":"(\d{12})"/);
    if (barcodeM) {
      upc = barcodeM[1];
      upcSource = `Rainbow product JSON embedded on PDP: "barcode":"${upc}"`;
    }
    out.push({
      brand: 'Rainbow Light',
      productName: p.title,
      count,
      brandUrl: pageUrl,
      dailymedSetid: null,
      actives: sf.actives,
      otherIngredients: oi,
      upc,
      upcSource,
      panel,
      searchTab: tab,
      tokens: { locked, ungraded },
      call: callVerdict({ panel, ungraded, tab, dup: false, pendingStores: true }),
    });
    await sleep(100);
  }
  return out;
}

async function caltrateProducts() {
  const paths = [
    '/calcium-supplement-products/600d3/',
    '/calcium-supplement-products/600d3-soft-chews/',
    '/calcium-supplement-products/gummy-bites/',
    '/calcium-supplement-products/600d3-plus-minerals/',
    '/calcium-supplement-products/600d3-plus-minerals-chewables/',
    '/calcium-supplement-products/600d3-plus-minerals-minis/',
  ];
  const out = [];
  for (const path of paths) {
    const url = `https://www.caltrate.com${path}`;
    const { text } = await fetchText(url);
    const lineSlug = path.split('/').filter(Boolean).pop() || 'product';
    const title =
      text.match(/<h1[^>]*>([^<]+)/i)?.[1]?.trim() ||
      text.match(new RegExp(`Caltrate[^<]{0,40}`, 'i'))?.[0]?.trim() ||
      `Caltrate ${lineSlug.replace(/-/g, ' ')}`;
    const body = decodeHtml(text.replace(/<script[\s\S]*?<\/script>/gi, ' '));
    const oi = body.match(/Other Ingredients[:\s]*([^\n]{10,500})/i)?.[1]?.trim() || null;
    const sf = extractSfFromRaw(text);
    const counts = [...body.matchAll(/\b(\d{2,3})\s*(tablets|soft chews|gummies|chewables|minis)\b/gi)].map((m) => parseInt(m[1], 10));
    const uniq = [...new Set(counts)].sort((a, b) => a - b);
    if (uniq.length === 0) uniq.push(null);
    const panel = panelStatus(oi, sf);
    const { locked, ungraded } = classifyTokens(tokenizeOi(oi || ''));
    const tab = 'Vitamins';
    for (const count of uniq) {
      out.push({
        brand: 'Caltrate',
        productName: count ? `${title} (${count})` : title,
        count,
        brandUrl: url,
        dailymedSetid: null,
        actives: sf.actives,
        otherIngredients: oi,
        upc: null,
        upcSource: null,
        panel,
        searchTab: tab,
        tokens: { locked, ungraded },
        call: callVerdict({ panel, ungraded, tab, dup: false, pendingStores: true }),
      });
    }
  }
  return out;
}

async function osteoProducts() {
  const paths = [
    'triple-strength',
    'triple-strength-msm',
    'triple-strength-plus-magnesium',
    'triple-strength-plus-turmeric',
    'triple-strength-with-vitamin-d',
    'one-per-day',
    'one-per-day-inflammatory-response',
    'regular-strength',
    'ease',
    'advanced-omega-3-joint-complex',
  ];
  const out = [];
  for (const slug of paths) {
    const url = `https://www.osteobiflex.com/products/${slug}`;
    const { text } = await fetchText(url);
    const title = text.match(/<title>([^<]+)<\/title>/i)?.[1]?.replace(/\s*\|.*$/, '').trim() || slug;
    const hasSfImage = /Supplement Facts/i.test(text);
    const oi = extractOiFromRaw(text);
    const sf = extractSfFromRaw(text);
    const panel = oi
      ? panelStatus(oi, sf)
      : {
          status: hasSfImage ? 'TRUNCATED' : 'MISSING',
          reason: hasSfImage
            ? 'Supplement Facts appear as carton images only; no typed Other Ingredients on osteobiflex.com HTML.'
            : 'No supplement panel text on brand page.',
        };
    const counts = parseCountsFromRaw(text, title);
    if (counts.length === 0) counts.push(null);
    const { locked, ungraded } = classifyTokens(tokenizeOi(oi || ''));
    const tab = 'Vitamins';
    for (const count of counts) {
      out.push({
        brand: 'Osteo Bi-Flex',
        productName: count ? `${title} (${count})` : title,
        count,
        brandUrl: url,
        dailymedSetid: null,
        actives: sf.actives,
        otherIngredients: oi,
        upc: null,
        upcSource: null,
        panel,
        searchTab: tab,
        tokens: { locked, ungraded },
        call: callVerdict({ panel, ungraded, tab, dup: false, pendingStores: true }),
      });
    }
  }
  return out;
}

/** Citracal counts from DSLD brand-products (citracal.com blocked in VM). Panels = step 1 DSLD when label opened. */
const CITRACAL_VARIANTS = [
  { productName: 'Calcium Supplement Petites +D3', count: 200, market: 'On' },
  { productName: 'Citracal Maximum Calcium Citrate', count: 60, market: 'On' },
  { productName: 'Citracal Maximum Plus', count: 120, market: 'On' },
  { productName: 'Citracal Maximum Plus', count: 280, market: 'On' },
  { productName: 'Citracal Slow Release 1200', count: 80, market: 'On' },
  { productName: 'Citracal Petites', count: 200, market: 'On' },
  { productName: 'Citracal Gummies', count: 70, market: 'On' },
  { productName: 'Citracel Gummies', count: 70, market: 'On' },
  { productName: 'Citracel Maximum Plus', count: 180, market: 'On' },
  { productName: 'Citracal Petites Calcium Citrate', count: 100, market: 'On' },
  { productName: 'Citracal Calcium Pearls', count: 70, market: 'On' },
];

/** Slow Fe from batch187 DSLD citations (slowfe.com 404 in VM). */
const DSLD_FALLBACK = [
  {
    brand: 'Slow Fe',
    productName: 'Slow Fe Slow Release Iron (30 tablets)',
    count: 30,
    brandUrl: 'https://www.slowfe.com/',
    dsldLabel: '240265',
    note: 'slowfe.com returned 404 in VM; panel from DSLD label 240265 (same formula family as 60ct on MAIN).',
    otherIngredients:
      'Dibasic calcium phosphate, silicied microcrystalline cellulose, hypromellose, carbomer homopolymer, ascorbic acid, magnesium stearate, tribasic calcium phosphate, polyvinyl alcohol, polyethylene glycol, talc, titanium dioxide, FD&C Red 40 Lake, FD&C Yellow 6 Lake, FD&C Blue 1 Lake.',
    actives: [{ name: 'Iron (as ferrous sulfate)', amount: '45 mg' }],
  },
  {
    brand: 'Citracal',
    productName: 'Citracal Maximum Plus (280 coated caplets)',
    count: 280,
    brandUrl: 'https://www.citracal.com/',
    dsldLabel: 'search-hold',
    note: 'citracal.com returned 403 maintenance in VM; enumerate via DSLD brand-products when reachable.',
    otherIngredients: null,
    actives: [],
  },
];

async function citracalDsldSearch() {
  const { text } = await fetchText('https://dsld.od.nih.gov/brand-products/Citracal');
  const labels = [...text.matchAll(/\/label\/(\d+)/g)].map((m) => m[1]);
  const uniq = [...new Set(labels)].slice(0, 40);
  const out = [];
  for (const id of uniq) {
    const { text: lt } = await fetchText(`https://dsld.od.nih.gov/label/${id}`);
    if (!lt.includes('Citracal') && !lt.includes('citracal')) continue;
    const name = lt.match(/Product Name[^<]*<[^>]*>([^<]+)/i)?.[1]?.trim() || `DSLD ${id}`;
    const oi = lt.match(/Other Ingredients[^<]*<[^>]*>([^<]{10,500})/i)?.[1] || extractOiFromRaw(lt);
    const countM = name.match(/(\d+)/);
    out.push({
      brand: 'Citracal',
      productName: name,
      count: countM ? parseInt(countM[1], 10) : null,
      brandUrl: 'https://www.citracal.com/',
      dailymedSetid: null,
      dsldLabelId: id,
      actives: [],
      otherIngredients: oi,
      upc: null,
      upcSource: null,
      panel: panelStatus(oi, { actives: [], raw: null }),
      searchTab: 'Vitamins',
      tokens: classifyTokens(tokenizeOi(oi || '')),
      call: 'HOLD-PANEL',
    });
  }
  return out;
}

function mapDupId(c) {
  const n = c.productName.toLowerCase();
  const count = c.count;
  if (c.brand === 'Schiff' && /neuriva/.test(n) && /original|brain health original/i.test(n) && count === 30)
    return 'schiff-b189-neuriva-original-30';
  if (c.brand === 'Move Free' && /advanced/.test(n) && !/msm|ultra|tamaflex/i.test(n) && count === 80)
    return 'move-free-b188-advanced-80';
  if (c.brand === 'Move Free' && /advanced/.test(n) && /msm/.test(n) && count === 120)
    return 'move-free-b189-advanced-msm-120';
  if (c.brand === 'Caltrate' && /600d3|600\+d3|600 d3/.test(n) && count === 60) return 'caltrate-b187-600-d3-60';
  if (c.brand === 'Caltrate' && /600d3|600\+d3|600 d3/.test(n) && count === 200) return 'caltrate-b187-600-d3-200';
  if (c.brand === 'Caltrate' && /600d3|600\+d3|600 d3/.test(n) && count === 120) return 'caltrate-b188-600-d3-120';
  if (c.brand === 'Slow Fe' && count === 60) return 'slowfe-b187-iron-60';
  if (c.brand === 'Rainbow Light' && /women'?s one/i.test(n) && !/50\+/.test(n) && count === 30)
    return 'rainbow-b187-womens-one-30';
  if (c.brand === 'Rainbow Light' && /women'?s one/i.test(n) && count === 150) return 'rainbow-b187-womens-one-150';
  if (c.brand === 'Rainbow Light' && /women'?s one/i.test(n) && !/50\+/.test(n) && count === 60)
    return 'rainbow-b188-womens-one-60';
  return null;
}

async function main() {
  const results = { meta: { generated: new Date().toISOString(), dailymedNote: '0 drug SPLs / no setid for these supplement brands at DailyMed step 1.' }, brands: {} };

  const schiffUrls = await schiffProductUrls();
  results.brands.Schiff = [];
  for (const u of schiffUrls) {
    const parsed = await parseGatsbyProduct(u, 'Schiff');
    results.brands.Schiff.push(parsed);
    await sleep(120);
  }

  results.brands['Move Free'] = [];
  for (const u of await moveFreeUrls()) {
    const host = u.includes('schiffvitamins') ? 'Schiff (Move Free section)' : 'Move Free';
    const parsed = await parseGatsbyProduct(u, host === 'Move Free' ? 'Move Free' : 'Move Free');
    parsed.brand = 'Move Free';
    results.brands['Move Free'].push(parsed);
    await sleep(120);
  }

  results.brands['Osteo Bi-Flex'] = await osteoProducts();
  results.brands.Caltrate = await caltrateProducts();
  results.brands['Rainbow Light'] = await rainbowProducts();

  results.brands.Citracal = CITRACAL_VARIANTS.map((v) => ({
    brand: 'Citracal',
    productName: `${v.productName} (${v.count} coated caplets or gummies as labeled)`,
    count: v.count,
    brandUrl: 'https://www.citracal.com/',
    dailymedSetid: null,
    dsldSource: 'https://dsld.od.nih.gov/brand-products/Citracal',
    actives: [{ name: 'Calcium (as citrate)', amount: 'see DSLD label — serving 2 caplets/gummies' }],
    activesNote: 'Ungraded active amounts; open matching DSLD label at ladder step 1 (brand site blocked).',
    otherIngredients: null,
    upc: null,
    upcSource: null,
    panel: {
      status: 'MISSING',
      reason:
        'citracal.com returned maintenance/403 in VM at step 2; DSLD brand-products lists this count but per-label OI not pulled in this pass.',
    },
    searchTab: 'Vitamins',
    tokens: { locked: [], ungraded: [] },
    call: 'HOLD-PANEL',
    marketStatus: v.market,
  }));

  const slow = DSLD_FALLBACK.filter((x) => x.brand === 'Slow Fe').map((x) => {
    const { locked, ungraded } = classifyTokens(tokenizeOi(x.otherIngredients));
    const panel = { status: 'FULL', reason: x.note };
    return {
      brand: 'Slow Fe',
      productName: x.productName,
      count: x.count,
      brandUrl: x.brandUrl,
      dailymedSetid: null,
      dsldLabelId: x.dsldLabel,
      actives: x.actives,
      otherIngredients: x.otherIngredients,
      upc: null,
      upcSource: null,
      panel,
      searchTab: 'Vitamins',
      tokens: { locked, ungraded },
      call: ungraded.length ? 'HOLD-TOKEN' : 'WRITE-READY (pending stores)',
    };
  });
  results.brands['Slow Fe'] = slow;

  const flat = [];
  for (const [brand, items] of Object.entries(results.brands)) {
    for (const item of items) {
      if (item.candidates) {
        for (const c of item.candidates) {
          c.brand = brand === 'Schiff' ? 'Schiff' : c.brand || brand;
          flat.push(c);
        }
      } else flat.push({ ...item, brand });
    }
  }

  const seen = new Set();
  const deduped = [];
  for (const c of flat) {
    const k = `${c.brand}|${c.productName}|${c.count}|${c.brandUrl}`;
    if (seen.has(k)) continue;
    seen.add(k);
    const dupId = mapDupId(c);
    if (dupId && EXCLUDE_IDS.has(dupId)) {
      c.call = 'DUP';
      c.dupMainId = dupId;
    }
    deduped.push(c);
  }

  results.flat = deduped;
  results.summary = Object.fromEntries(
    Object.entries(results.brands).map(([b, items]) => {
      const cands = items.flatMap((i) => i.candidates || [i]).filter((c) => c.call !== 'DUP');
      return [b, cands.length];
    }),
  );

  mkdirSync('/workspace/docs/tmp-or-report', { recursive: true });
  writeFileSync('/workspace/docs/tmp-or-report/t81u-candidates-raw.json', JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results.summary, null, 2));
  console.log('flat candidates', flat.length, 'non-DUP', flat.filter((c) => c.call !== 'DUP').length);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
