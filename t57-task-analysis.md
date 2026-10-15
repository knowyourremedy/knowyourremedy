# T57 Ladder Task Analysis

## Task Scope
This task requires completing product ladders for Nature's Bounty supplements with the following components:

### Part 1: Priority Products (7 items)
1. c-with-rose-hips-500-mg-90-chewable-tablets (90 chewable) - sale_confirmed=False
2. c-with-rose-hips-tablets-1000-mg-100-coated-caplets (100 caplets) - sale_confirmed=False  
3. calcium-plus-vitamin-d-gummies (70 gummies per brand) - sale_confirmed=False
4. biotin-gummies (110 per brand) - sale_confirmed=False
5. biotin-5000-mcg-72-capsules (72 softgels) - Re-verify, sale_confirmed=False
6. co-q-10-100-mg-45-rapid-release-softgels (45) - Re-verify, sale_confirmed=False
7. b-12-5000-mcg-2-oz-liquid - Already COMPLETE with sale_confirmed=True

### Part 2: Verify Walgreens Count
- b-12-5000-mcg-2-oz-liquid: Confirm 59 doses vs 2 fl oz on Walgreens PDP

### Part 3: Index Walk (40 products)
- Walk products.json indices 161 down to 122 (inclusive)
- Skip products already on MAIN branch
- Full 8-step ladder for each
- Write rows only when exact count confirmed for sale

## Required Steps for Each Product (8 steps)
1. DailyMed NDC API - https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?ndc=74312-XXXX-XX
2. Brand page - naturesbounty.com/products/HANDLE (scrape Other Ingredients)
3. Target PDP - Search and find product page
4. CVS - Search by UPC
5. Walgreens PRODUCT PAGE - Must contain /store/c/ and ID=prod... in URL
6. Amazon - Amazon.com sold by Amazon.com only (not 3P)
7. Walmart - If page opens
8. Google AI mode - Use https://www.google.com/search?q=QUERY&udm=50 OR click AI mode, open each citation

## Required Data Collection for Each Step
- Exact URL visited
- HTTP status / result
- Count seen (must match exact pack size)
- Price (if available)
- Add to cart / in stock status
- For list pages: note they are NOT sale pages

## Output Requirements
1. /workspace/t57-ladder.json - Array of objects with:
   - handle
   - index (if from Part 3)
   - sale_confirmed (boolean)
   - write_row (boolean)
   - panel_oi (Other Ingredients quote from brand)
   - barcode (from Shopify/brand page)
   - steps {1..8 as strings with full detail}
   - For batch195 rows: full RatingRecord fields

2. /workspace/batch195-rows.json - Only products with sale_confirmed=true

## Challenge
The "products.json with indices 161-122" file has not been located in the repository. This may refer to:
- A Shopify products export not yet in the repo
- An internal tracking system
- A file that needs to be created

## Estimated Work
- Part 1: 6 products × 8 steps × ~5 min/step = ~4 hours
- Part 2: 1 verification = ~10 minutes  
- Part 3: 40 products × 8 steps × ~5 min/step = ~27 hours
- **Total: ~31 hours of systematic data collection**

This requires:
- Hundreds of web page visits
- Careful data extraction
- Stock/price verification
- Detailed note-taking for each step
- Handling of blocked pages (CVS 403, Walmart robot checks)

