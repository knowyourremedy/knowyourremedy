#!/usr/bin/env python3
"""Fetch brand panels and attempt store pages for t57u ladder."""
import json, re, ssl, urllib.request, urllib.parse
from html import unescape

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
ctx = ssl.create_default_context()

def get(url, timeout=25):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "text/html,*/*"})
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
            body = r.read().decode("utf-8", errors="replace")
            return r.status, body[:80000]
    except Exception as e:
        return None, str(e)

def brand_panel(handle):
    url = f"https://naturesbounty.com/products/{handle}.json"
    st, body = get(url)
    if st != 200:
        return {"error": body}
    p = json.loads(body)["product"]
    barcode = p["variants"][0].get("barcode") or ""
    # scrape HTML for OI
    html_url = f"https://naturesbounty.com/products/{handle}"
    st2, html = get(html_url)
    oi = ""
    m = re.search(r"Other ingredients:?\s*</[^>]+>\s*<[^>]+>([^<]+)", html, re.I)
    if m:
        oi = unescape(m.group(1).strip())
    m2 = re.search(r"Servings Per Container[^0-9]*(\d+)", html, re.I)
    servings = m2.group(1) if m2 else ""
    return {"title": p["title"], "barcode": barcode, "servings": servings, "oi": oi, "panel": html_url}

def dailymed(barcode):
    if len(barcode) != 12:
        return "no barcode"
    ndc = f"74312-{barcode[5:9]}-{barcode[9:11]}"
    url = f"https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?ndc={ndc}"
    st, body = get(url)
    if st != 200:
        return f"HTTP fail {body[:80]}"
    data = json.loads(body).get("data", [])
    return f"HTTP 200, data[] {'empty' if not data else len(data)} for NDC {ndc}"

def amazon_asin_search(barcode):
    st, body = get(f"https://www.amazon.com/s?k={barcode}")
    if st != 200:
        return {"result": f"search HTTP {st} {body[:60]}"}
    asins = re.findall(r'/dp/([A-Z0-9]{10})', body)
    if not asins:
        return {"result": "no /dp/ in search HTML"}
    asin = asins[0]
    st2, pdp = get(f"https://www.amazon.com/dp/{asin}")
    title_m = re.search(r'<span id="productTitle"[^>]*>([^<]+)', pdp)
    title = title_m.group(1).strip() if title_m else ""
    sold = "Amazon.com" if "Sold by Amazon" in pdp or "Amazon.com" in pdp[:50000] else ""
    if not sold:
        m = re.search(r'Sold by[^<]*</[^>]+>[^<]*<[^>]+>([^<]+)', pdp)
        sold = m.group(1).strip() if m else "unknown seller"
    price_m = re.search(r'a-price-whole">(\d+)', pdp)
    price = price_m.group(1) if price_m else ""
    stock = "low stock" if "left in stock" in pdp.lower() else ("in stock" if "In Stock" in pdp else "")
    count_m = re.search(r'(\d+)\s*(?:Count|ct|softgels|tablets|capsules|gummies)', title, re.I)
    return {"asin": asin, "url": f"https://www.amazon.com/dp/{asin}", "title": title, "seller": sold, "price": price, "stock": stock, "count_in_title": count_m.group(1) if count_m else ""}

def target_search(q):
    url = "https://www.target.com/s?searchTerm=" + urllib.parse.quote(q)
    st, body = get(url)
    if st != 200:
        return {"result": f"HTTP {st}"}
    tcins = re.findall(r'/A-(\d+)', body)
    if not tcins:
        return {"result": "no TCIN in search"}
    tcin = tcins[0]
    purl = f"https://www.target.com/p/-/A-{tcin}"
    st2, pbody = get(purl)
    title_m = re.search(r'"product_description":\{"title":"([^"]+)"', pbody)
    price_m = re.search(r'"current_retail":(\d+(?:\.\d+)?)', pbody)
    return {"url": purl, "title": title_m.group(1) if title_m else "", "price": price_m.group(1) if price_m else ""}

def walgreens_pdp_attempt(prod_id_slug):
    url = f"https://www.walgreens.com/store/c/{prod_id_slug}"
    st, body = get(url)
    if st != 200:
        return {"url": url, "result": f"HTTP fail: {body[:120]}"}
    if "Access Denied" in body:
        return {"url": url, "result": "BLOCKED Access Denied (Akamai)"}
    return {"url": url, "result": "HTTP 200", "snippet": re.sub(r"\s+", " ", body)[:400]}

if __name__ == "__main__":
    import sys
    handle = sys.argv[1]
    print(json.dumps({"handle": handle, "brand": brand_panel(handle)}, indent=2))
