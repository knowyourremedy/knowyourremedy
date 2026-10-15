#!/usr/bin/env python3
"""Emit batch195-kyr6c-nb-forty.ts for packs with verified same-count sale pages."""
from __future__ import annotations

import json
import re
import urllib.request
from pathlib import Path

OUT = Path("/workspace/lib/rating-drafts/batch195-kyr6c-nb-forty.ts")

ROWS_SPEC = [
    {
        "id": "natures-bounty-b195-c-rose-hips-500-90",
        "handle": "c-with-rose-hips-500-mg-90-chewable-tablets",
        "productName": "Nature's Bounty Vitamin C with Rose Hips 500 mg (90 chewable tablets)",
        "form": "tablet",
        "formulaId": "natures-bounty-b195-c-rose-hips-500-90",
        "active": "[{ name: 'Vitamin C (as Sodium Ascorbate, Ascorbic Acid)', strength: '500 mg per tablet' }, { name: 'Rose Hips (Rosa canina) (fruit)', strength: '7.5 mg per tablet' }]",
        "flags": [
            ("Sucrose", "limited", "sucrose"),
            ("Sorbitol", "limited", "sorbitol"),
            ("Vegetable Stearic Acid", "cleared", "stearic"),
            ("Annatto Extract (Color)", "limited", "annatto"),
            ("Natural Orange Flavor", "limited", "flavor"),
            ("Silica", "limited", "silica"),
            ("Vegetable Cellulose", "cleared", "cellulose"),
            ("Vegetable Magnesium Stearate", "cleared", "magStearate"),
        ],
        "retailers": "['Amazon']",
        "source": (
            "Brand page c-with-rose-hips-500-mg-90-chewable-tablets was read. Serving size 1 tablet. Servings per container 90. "
            "Other ingredients: sucrose, sorbitol, vegetable stearic acid. Contains <2% of: annatto extract (color), natural orange flavor, silica, vegetable cellulose, vegetable magnesium stearate. "
            "DailyMed NDC 74312-0388-08 returned HTTP 200 with an empty data[] array. Target search did not open a priced 90-count chewable PDP. CVS search returned HTTP 403. "
            "Walgreens vitamin C search showed no Nature's Bounty 500 mg rose hips 90 chewable /ID=prod PDP. "
            "Amazon PDP https://www.amazon.com/Natures-Bounty-Vitamin-Chewable-Tablets/dp/B074V3B6B8 opened with 90 chewable tablets in the title and a buy box when indexed (Nature's Bounty). "
            "Walmart listing https://www.walmart.com/ip/Natures-Bounty-Vitamin-C-With-Rose-Hips-500-Mg-90-Chewable-Tablets/1206070030 showed 90 piece count at $16.81 but sold by Hey Pharma (third party), so it was not used as the named-store sale. "
            "Google AI mode with udm=50 did not render citations in automated fetch."
        ),
        "barcode": "074312038808",
    },
    {
        "id": "natures-bounty-b195-c-rose-hips-1000-100",
        "handle": "c-with-rose-hips-tablets-1000-mg-100-coated-caplets",
        "productName": "Nature's Bounty Vitamin C with Rose Hips 1,000 mg (100 coated caplets)",
        "form": "tablet",
        "formulaId": "natures-bounty-b195-c-rose-hips-1000-100",
        "active": "[{ name: 'Vitamin C (as Ascorbic Acid)', strength: '1,000 mg per caplet' }, { name: 'Rose Hips (Rosa canina) (fruit)', strength: '20 mg per caplet' }]",
        "flags": [
            ("Vegetable Cellulose", "cleared", "cellulose"),
            ("Natural Palm Leaf Glaze", "limited", "carnauba"),
            ("Silica", "limited", "silica"),
            ("Vegetable Magnesium Stearate", "cleared", "magStearate"),
        ],
        "retailers": "['Walgreens']",
        "source": (
            "Brand page c-with-rose-hips-tablets-1000-mg-100-coated-caplets was read. Serving size 1 caplet. Servings per container 100. "
            "Other ingredients: vegetable cellulose. Contains <2% of: natural palm leaf glaze, silica, vegetable magnesium stearate. "
            "DailyMed NDC 74312-0069-06 returned HTTP 200 with an empty data[] array. Target search did not open a priced 100-count caplet PDP. CVS search returned HTTP 403. "
            "Walgreens product page https://www.walgreens.com/store/c/nature's-bounty-vitamin-c-1000mg-plus-rose-hips,-coated-caplets/ID=prod6144800-product is the sale URL for Vitamin C-1000mg Plus Rose Hips Coated Caplets 100 ea; automated fetch returned Access Denied while indexed PDP copy shows $22.99 with Add for shipping. "
            "Amazon UPC search returned HTTP 200 without a parsed 1P buy box. Walmart search returned a robot check. Google AI mode with udm=50 did not render citations in automated fetch."
        ),
        "barcode": "074312006906",
    },
    {
        "id": "natures-bounty-b195-calcium-d-gummies-70",
        "handle": "calcium-plus-vitamin-d-gummies",
        "productName": "Nature's Bounty Calcium + Vitamin D3 + Zinc Gummies (70 gummies)",
        "form": "gummy",
        "formulaId": "natures-bounty-b195-calcium-d-gummies-70",
        "active": "[{ name: 'Calcium (as tricalcium phosphate)', strength: '500 mg per 2 gummies' }, { name: 'Vitamin D3 (cholecalciferol)', strength: '25 mcg (1,000 IU) per 2 gummies' }, { name: 'Zinc (as zinc citrate)', strength: '7.5 mg per 2 gummies' }]",
        "flags": [
            ("Glucose Syrup", "cleared", "glucose"),
            ("Cane Sugar", "cleared", "cane"),
            ("Modified Food Starch", "limited", "maltodextrin"),
            ("Gelatin", "cleared", "gelatin"),
            ("Citric Acid", "cleared", "citric"),
            ("Fruit and Vegetable Juice Concentrate (Color)", "cleared", "juiceColor"),
            ("Lactic Acid", "cleared", "citric"),
            ("Maltodextrin", "limited", "maltodextrin"),
            ("Natural Flavors", "limited", "flavor"),
        ],
        "retailers": "['Amazon']",
        "source": (
            "Brand page calcium-plus-vitamin-d-gummies was read. Serving size 2 gummies. Bottle copy states 70 gummies per bottle (35 servings). "
            "Other ingredients: glucose syrup, cane sugar, modified food starch, gelatin. Contains <2% of: citric acid, fruit and vegetable juice concentrate (color), lactic acid, maltodextrin, natural flavors. Contains bioengineered food ingredients. "
            "DailyMed NDC 74312-6794-14 returned HTTP 200 with an empty data[] array. Target search did not open a priced 70-gummy PDP. CVS search returned HTTP 403. "
            "Walgreens calcium gummies search showed Nature's Bounty Calcium + D3 + Zinc Gummies Orange & Cherry 70 ea at $18.99 with Add to cart on a search results page, not a /ID=prod PDP opened here. "
            "Amazon PDP https://www.amazon.com/Natures-Bounty-Calcium-Supports-Flavored/dp/B0DJG338TD opened with 70 gummies in the title and a buy box when indexed. "
            "Walmart search returned a robot check. Google AI mode with udm=50 did not render citations in automated fetch."
        ),
        "barcode": "074312679414",
    },
    {
        "id": "natures-bounty-b195-coq10-100-75",
        "handle": "co-q-10-100-mg-75-rapid-release-softgels",
        "productName": "Nature's Bounty Co Q-10 100 mg (75 softgels)",
        "form": "softgel",
        "formulaId": "natures-bounty-b195-coq10-100-75",
        "active": "[{ name: 'Coenzyme Q-10 (Q-Sorb)', strength: '100 mg per softgel' }]",
        "flags": [
            ("Rice Bran Oil", "cleared", "riceBranFill"),
            ("Gelatin", "cleared", "gelatin"),
            ("Vegetable Glycerin", "cleared", "glycerin"),
            ("Soy Lecithin", "cleared", "soyLecithin"),
            ("Titanium Dioxide Color", "high", "tio2"),
        ],
        "retailers": "['Amazon']",
        "source": (
            "Brand page co-q-10-100-mg-75-rapid-release-softgels was read. Serving size 1 softgel. Servings per container 75. "
            "Other ingredients: rice bran oil, gelatin, vegetable glycerin. Contains <2% of: soy lecithin, titanium dioxide color. "
            "DailyMed NDC 74312-5113-56 returned HTTP 200 with an empty data[] array. Target search did not open a priced 75-count PDP. CVS search returned HTTP 403. "
            "Walgreens product page https://www.walgreens.com/store/c/nature's-bounty-coq10-softgels,-100-mg/ID=prod3430767-product is the 100 mg CoQ10 URL; indexed copy shows 75 ea (not 45). Automated fetch returned Access Denied. "
            "Amazon PDP https://www.amazon.com/Natures-Bounty-Q-10-100-Softgels/dp/B002JQBC96 opened with 75 count in the title and a buy box when indexed. "
            "Walmart search returned a robot check. Google AI mode with udm=50 did not render citations in automated fetch."
        ),
        "barcode": "074312511356",
    },
    {
        "id": "natures-bounty-b195-folic-acid-250",
        "handle": "folic-acid-800-mcg-250-tablets",
        "productName": "Nature's Bounty Folic Acid 800 mcg (250 tablets)",
        "form": "tablet",
        "formulaId": "natures-bounty-b195-folic-acid-250",
        "active": "[{ name: 'Folic Acid', strength: '800 mcg per tablet' }]",
        "flags": [
            ("Vegetable Cellulose", "cleared", "cellulose"),
            ("Dicalcium Phosphate", "cleared", "dicalcium"),
            ("Silica", "limited", "silica"),
            ("Vegetable Magnesium Stearate", "cleared", "magStearate"),
        ],
        "retailers": "['Amazon']",
        "source": (
            "Brand page folic-acid-800-mcg-250-tablets was read. Serving size 1 tablet. Servings per container 250. "
            "Other ingredients: vegetable cellulose, dicalcium phosphate. Contains <2% of: silica, vegetable magnesium stearate. "
            "DailyMed NDC 74312-0284-34 returned HTTP 200 with an empty data[] array. Target search did not open a priced 250-tablet PDP. CVS search returned HTTP 403. "
            "Walgreens folic acid search did not open a Nature's Bounty 800 mcg 250-tablet /ID=prod PDP. "
            "Amazon PDP https://www.amazon.com/Natures-Bounty-Tablets-Maximum-Strength/dp/B000HRVSP2 opened with 250 tablets in the title and a buy box when indexed. "
            "Walmart search returned a robot check. Google AI mode with udm=50 did not render citations in automated fetch."
        ),
        "barcode": "074312028434",
    },
    {
        "id": "natures-bounty-b195-melatonin-5-90",
        "handle": "melatonin-5-mg-90-tablets",
        "productName": "Nature's Bounty Melatonin 5 mg (90 softgels)",
        "form": "softgel",
        "formulaId": "natures-bounty-b195-melatonin-5-90",
        "active": "[{ name: 'Melatonin', strength: '5 mg per softgel' }]",
        "flags": [
            ("Soybean Oil", "cleared", "soyFill"),
            ("Gelatin", "cleared", "gelatin"),
            ("Vegetable Glycerin", "cleared", "glycerin"),
            ("Yellow Beeswax", "cleared", "beeswax"),
            ("Soy Lecithin", "cleared", "soyLecithin"),
            ("Titanium Dioxide Color", "high", "tio2"),
        ],
        "retailers": "['Amazon']",
        "source": (
            "Brand page melatonin-5-mg-90-tablets was read. The Shopify handle says tablets but the panel is 90 rapid release softgels. Serving size 1 softgel. Servings per container 90. "
            "Other ingredients: soybean oil, gelatin, vegetable glycerin, yellow beeswax. Contains <2% of: soy lecithin, titanium dioxide color. "
            "DailyMed NDC 74312-1574-55 returned HTTP 200 with an empty data[] array. Target search did not open a priced 90-count melatonin 5 mg PDP. CVS search returned HTTP 403. "
            "Walgreens melatonin search did not open a matching 90-count Nature's Bounty /ID=prod PDP. "
            "Amazon PDP https://www.amazon.com/Natures-Bounty-Melatonin-Maximum-Strength/dp/B0061GL4JS opened with 90 softgels in the title and a buy box when indexed. "
            "Walmart search returned a robot check. Google AI mode with udm=50 did not render citations in automated fetch."
        ),
        "barcode": "074312157455",
    },
    {
        "id": "natures-bounty-b195-melatonin-1-180",
        "handle": "melatonin-1-mg-180-tablets",
        "productName": "Nature's Bounty Melatonin 1 mg (180 tablets)",
        "form": "tablet",
        "formulaId": "natures-bounty-b195-melatonin-1-180",
        "active": "[{ name: 'Melatonin', strength: '1 mg per tablet' }]",
        "flags": [
            ("Dicalcium Phosphate", "cleared", "dicalcium"),
            ("Vegetable Cellulose", "cleared", "cellulose"),
            ("Vegetable Magnesium Stearate", "cleared", "magStearate"),
        ],
        "retailers": "['Amazon']",
        "source": (
            "Brand page melatonin-1-mg-180-tablets was read. Serving size 1 tablet. Servings per container 180. "
            "Other ingredients: dicalcium phosphate, vegetable cellulose, vegetable magnesium stearate. "
            "DailyMed NDC 74312-0283-28 returned HTTP 200 with an empty data[] array. Target search did not open a priced 180-tablet PDP. CVS search returned HTTP 403. "
            "Walgreens melatonin search did not open a Nature's Bounty 1 mg 180-tablet /ID=prod PDP. "
            "Amazon PDP https://www.amazon.com/Natures-Bounty-Melatonin-180-Tablets/dp/B0013NB6ZQ opened with 180 tablets in the title and a buy box when indexed. "
            "Walmart search returned a robot check. Google AI mode with udm=50 did not render citations in automated fetch."
        ),
        "barcode": "074312028328",
    },
    {
        "id": "natures-bounty-b195-ginger-100",
        "handle": "ginger-root-550-mg-100-capsules",
        "productName": "Nature's Bounty Ginger Root 550 mg (100 capsules)",
        "form": "capsule",
        "formulaId": "natures-bounty-b195-ginger-100",
        "active": "[{ name: 'Ginger Root Powder (Zingiber officinale)', strength: '550 mg per capsule' }]",
        "flags": [
            ("Gelatin", "cleared", "gelatin"),
            ("Silica", "limited", "silica"),
            ("Vegetable Magnesium Stearate", "cleared", "magStearate"),
        ],
        "retailers": "['Amazon']",
        "source": (
            "Brand page ginger-root-550-mg-100-capsules was read. Serving size 1 capsule. Servings per container 100. "
            "Other ingredients: gelatin. Contains <2% of: silica, vegetable magnesium stearate. "
            "DailyMed NDC 74312-0514-56 returned HTTP 200 with an empty data[] array. Target search did not open a priced 100-capsule PDP. CVS search returned HTTP 403. "
            "Walgreens ginger search did not open a Nature's Bounty 550 mg 100-count /ID=prod PDP. "
            "Amazon PDP https://www.amazon.com/Natures-Bounty-Ginger-Root-Capsules/dp/B000GG13GG opened with 100 capsules in the title when indexed. "
            "Walmart search returned a robot check. Google AI mode with udm=50 did not render citations in automated fetch."
        ),
        "barcode": "074312051456",
    },
    {
        "id": "natures-bounty-b195-ginkgo-120-100",
        "handle": "ginkgo-biloba-120-mg-100-capsules",
        "productName": "Nature's Bounty Ginkgo Biloba 120 mg (100 capsules)",
        "form": "capsule",
        "formulaId": "natures-bounty-b195-ginkgo-120-100",
        "active": "[{ name: 'Ginkgo Biloba Extract (Ginkgo biloba) (leaf)', strength: '120 mg per capsule' }]",
        "flags": [
            ("Rice Flour", "cleared", "cellulose"),
            ("Gelatin", "cleared", "gelatin"),
            ("Silica", "limited", "silica"),
            ("Vegetable Magnesium Stearate", "cleared", "magStearate"),
        ],
        "retailers": "['Amazon']",
        "source": (
            "Brand page ginkgo-biloba-120-mg-100-capsules was read. Serving size 1 capsule. Servings per container 100. "
            "Other ingredients: rice flour, gelatin. Contains <2% of: silica, vegetable magnesium stearate. "
            "DailyMed NDC 74312-0454-48 returned HTTP 200 with an empty data[] array. Target search did not open a priced 100-capsule PDP. CVS search returned HTTP 403. "
            "Walgreens ginkgo search did not open a Nature's Bounty 120 mg 100-count /ID=prod PDP. "
            "Amazon PDP https://www.amazon.com/Natures-Bounty-Ginkgo-Biloba-Capsules/dp/B00028NGEC opened with 100 capsules in the title when indexed. "
            "Walmart search returned a robot check. Google AI mode with udm=50 did not render citations in automated fetch."
        ),
        "barcode": "074312045448",
    },
    {
        "id": "natures-bounty-b195-magnesium-500-100",
        "handle": "magnesium-500-mg-100-tablets",
        "productName": "Nature's Bounty Magnesium 500 mg (100 tablets)",
        "form": "tablet",
        "formulaId": "natures-bounty-b195-magnesium-500-100",
        "active": "[{ name: 'Magnesium (as magnesium oxide)', strength: '500 mg per tablet' }]",
        "flags": [
            ("Vegetable Cellulose", "cleared", "cellulose"),
            ("Dicalcium Phosphate", "cleared", "dicalcium"),
            ("Silica", "limited", "silica"),
            ("Vegetable Magnesium Stearate", "cleared", "magStearate"),
        ],
        "retailers": "['Amazon']",
        "source": (
            "Brand page magnesium-500-mg-100-tablets was read. Serving size 1 tablet. Servings per container 100. "
            "Other ingredients: vegetable cellulose, dicalcium phosphate. Contains <2% of: silica, vegetable magnesium stearate. "
            "DailyMed NDC 74312-0553-55 returned HTTP 200 with an empty data[] array. Target search did not open a priced 100-tablet PDP. CVS search returned HTTP 403. "
            "Walgreens magnesium search did not open a Nature's Bounty 500 mg 100-tablet /ID=prod PDP. "
            "Amazon PDP https://www.amazon.com/Natures-Bounty-Magnesium-Tablets-500mg/dp/B000GG2JAG opened with 100 tablets in the title when indexed. "
            "Walmart search returned a robot check. Google AI mode with udm=50 did not render citations in automated fetch."
        ),
        "barcode": "074312055355",
    },
]

HEADER = """// DRAFT / not verified / batch 195 KYR6-c.
// Nature's Bounty packs from products.json catalog indices 161–121 (forty looked-at handles).
// Rows only where the brand panel was read and a named store showed the same count for sale.
// Part 1 rose hips / gummies packs and Part 3 slice share this file.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const VITAMINS = 'Vitamins';

const METH = {
  annatto: 'Methodology §5 Limited (annatto extract / annatto color).',
  beeswax: 'Methodology §5 Cleared (yellow beeswax / beeswax).',
  cane: 'Methodology §5 Cleared (cane sugar).',
  carnauba: 'Methodology §5 Caution (carnauba wax).',
  cellulose: 'Methodology §5 Cleared (cellulose / microcrystalline cellulose / vegetable cellulose).',
  citric: 'Methodology §5 Cleared (citric acid).',
  dicalcium: 'Methodology §5 Cleared (dicalcium phosphate / dibasic calcium phosphate).',
  flavor: 'Methodology §5 Limited (natural flavors).',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  glucose: 'Methodology §5 Cleared (glucose syrup).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  juiceColor:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color. Not a sugar row. Not Usable. High fructose corn syrup stays its own row. Locked Oct 15, 2026.',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin).',
  riceBranFill: 'Methodology §5 Cleared (rice bran oil as softgel fill — not the gummy base).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide, oral).',
  sorbitol: 'Methodology §5 Limited (sorbitol / sorbitol solution).',
  soyFill: 'Methodology §5 Cleared (soybean oil as softgel fill — not the gummy seed-oil rule).',
  soyLecithin: 'Methodology §5 Cleared (lecithin / soy lecithin / sunflower lecithin).',
  stearic: 'Methodology §5 Cleared (stearic acid — stearate-family lubricant).',
  sucrose: 'Methodology §5 Limited (sucrose).',
  tio2: 'Methodology §5 Avoid (titanium dioxide).',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, methKey: keyof typeof METH): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[methKey]}` };
}

"""


def verdict(flags: list[tuple[str, str, str]]) -> str:
    levels = [f[1] for f in flags]
    if "high" in levels:
        return "avoid"
    if "moderate" in levels or "limited" in levels:
        return "caution"
    return "clean"


def main() -> None:
    parts = [HEADER, "export const BATCH195_KYR6C_NB_FORTY: RatingRecord[] = [\n"]
    for row in ROWS_SPEC:
        panel = f"https://naturesbounty.com/products/{row['handle']}"
        parts.append("  {\n")
        parts.append(f"    id: '{row['id']}',\n")
        parts.append(f"    productName: \"{row['productName']}\",\n")
        parts.append("    brand: \"Nature's Bounty\",\n")
        parts.append("    category: VITAMINS,\n")
        parts.append(f"    formulaId: '{row['formulaId']}',\n")
        parts.append("    audience: ADULT,\n")
        parts.append("    minAge: 18,\n")
        parts.append(f"    form: '{row['form']}',\n")
        parts.append("    recordStatus: UNVERIFIED,\n")
        parts.append("    productType: SUPPLEMENT,\n")
        parts.append(f"    barcode: '{row['barcode']}',\n")
        parts.append(f"    activeIngredients: {row['active']},\n")
        parts.append("    inactiveIngredients: [\n")
        for name, level, meth in row["flags"]:
            parts.append(f"      flag('{panel}', '{name}', '{level}', '{meth}'),\n")
        parts.append("    ],\n")
        parts.append(f"    verdict: '{verdict(row['flags'])}',\n")
        parts.append(f"    retailers: {row['retailers']},\n")
        parts.append("    sourcesGeneral: [\n")
        parts.append(f"      \"{row['source']}\",\n")
        parts.append("    ],\n")
        parts.append("  },\n")
    parts.append("];\n\n")
    n = len(ROWS_SPEC)
    parts.append(
        f"""const ROWS = BATCH195_KYR6C_NB_FORTY;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {{
  const levels = record.inactiveIngredients.map((item) => item.riskLevel);
  if (levels.includes('high')) return 'avoid';
  if (levels.includes('moderate') || levels.includes('limited')) return 'caution';
  return 'clean';
}}

function upcOk(code: string): boolean {{
  if (!/^\\d{{12}}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}}

if (ROWS.length !== {n}) throw new Error(`batch195 row count ${{ROWS.length}}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch195 duplicate id');

for (const record of ROWS) {{
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch195 upc ${{record.id}}`);
  if (record.honestNote) throw new Error(`batch195 unexpected note ${{record.id}}`);
  for (const ingredient of record.inactiveIngredients) {{
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch195 blank why ${{record.id}} ${{ingredient.name}}`);
    if (!ingredient.source?.trim()) throw new Error(`batch195 blank source ${{ingredient.name}}`);
  }}
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch195 verdict ${{record.id}}`);
}}
"""
    )
    OUT.write_text("".join(parts))
    print("wrote", OUT, "rows", n)


if __name__ == "__main__":
    main()
