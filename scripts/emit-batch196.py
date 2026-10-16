#!/usr/bin/env python3
"""Emit batch196 from t60-walk-output.json written rows."""
from __future__ import annotations

import json
import re
from pathlib import Path

OUT = Path("/workspace/lib/rating-drafts/batch196-kyr6c-nb-forty.ts")
DATA = json.loads(Path("/workspace/t60-walk-output.json").read_text())

METH_KEYS = {
    "gelatin": ("cleared", "gelatin"),
    "vegetable glycerin": ("cleared", "glycerin"),
    "glycerin": ("cleared", "glycerin"),
    "soybean oil": ("cleared", "soyFill"),
    "corn oil": ("cleared", "cornOil"),
    "coconut oil": ("cleared", "coconutFill"),
    "olive oil": ("cleared", "oliveFill"),
    "castor oil": ("cleared", "castor"),
    "vegetable cellulose": ("cleared", "cellulose"),
    "dicalcium phosphate": ("cleared", "dicalcium"),
    "vegetable magnesium stearate": ("cleared", "magStearate"),
    "vegetable stearic acid": ("cleared", "stearic"),
    "silica": ("limited", "silica"),
    "rice flour": ("limited", "riceFlour"),
    "pectin": ("cleared", "pectin"),
    "glucose syrup": ("cleared", "glucose"),
    "corn syrup": ("cleared", "glucose"),
    "cane sugar": ("cleared", "cane"),
    "sugar": ("limited", "sucrose"),
    "modified food starch": ("limited", "maltodextrin"),
    "maltodextrin": ("limited", "maltodextrin"),
    "natural flavors": ("limited", "flavor"),
    "natural flavor": ("limited", "flavor"),
    "natural cherry flavor": ("limited", "flavor"),
    "natural strawberry flavor": ("limited", "flavor"),
    "mannitol": ("limited", "mannitol"),
    "dextrose": ("limited", "fructose"),
    "tapioca syrup": ("cleared", "tapioca"),
    "crospovidone": ("cleared", "crospovidone"),
    "ascorbic acid": ("cleared", "citric"),
    "vegetable juice color": ("cleared", "juiceColor"),
    "mixed natural tocopherols": ("cleared", "tocopherol"),
    "lime oil": ("cleared", "limeOil"),
    "polyethylene glycol": ("moderate", "peg"),
    "brewer’s yeast": ("cleared", "yeast"),
    "brewer's yeast": ("cleared", "yeast"),
    "dried ferrous sulfate": ("cleared", "ferrous"),
    "natural caramel color": ("high", "caramel"),
}

METH_BLOCK = r"""
const METH = {
  beeswax: 'Methodology §5 Cleared (yellow beeswax / beeswax).',
  caramel: 'Methodology §5 Avoid (caramel color — class not named as I or II).',
  cane: 'Methodology §5 Cleared (cane sugar).',
  caramel: 'Methodology §5 Avoid (caramel color — class not named as I or II).',
  castor: 'Methodology §5 Cleared (castor oil / polyoxyl castor oil derivatives — oral).',
  cellulose: 'Methodology §5 Cleared (cellulose / microcrystalline cellulose / vegetable cellulose).',
  citric: 'Methodology §5 Cleared (citric acid).',
  coconutFill: 'Methodology §5 Cleared (coconut oil as softgel fill — not the gummy seed-oil rule).',
  cornOil: 'Methodology §5 Cleared (corn oil, not the gummy base).',
  crospovidone: 'Methodology §5 Cleared (crospovidone / povidone family).',
  dicalcium: 'Methodology §5 Cleared (dicalcium phosphate / dibasic calcium phosphate).',
  flavor: 'Methodology §5 Limited (natural flavors).',
  ferrous: 'Methodology §5 Cleared (ferrous sulfate as mineral salt).',
  fructose: 'Methodology §5 Limited (fructose).',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  glucose: 'Methodology §5 Cleared (glucose syrup).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  limeOil: 'Methodology §5 Cleared (lime oil flavor in a softgel fill).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin).',
  mannitol: 'Methodology §5 Limited (mannitol).',
  oliveFill: 'Methodology §5 Cleared (olive oil as softgel fill).',
  peg: 'Methodology §5 Moderate (polyethylene glycol).',
  pectin: 'Methodology §5 Cleared (pectin).',
  riceFlour: 'Methodology §5 Limited (rice flour — exact token; distinct from Cleared rice-hull family).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide, oral).',
  soyFill: 'Methodology §5 Cleared (soybean oil as softgel fill — not the gummy seed-oil rule).',
  stearic: 'Methodology §5 Cleared (stearic acid — stearate-family lubricant).',
  sucrose: 'Methodology §5 Limited (sucrose).',
  tapioca: 'Methodology §5 Cleared (tapioca starch / tapioca syrup).',
  juiceColor:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color. Not a sugar row. Not Usable. High fructose corn syrup stays its own row. Locked Oct 15, 2026.',
  tocopherol: 'Methodology §5 Cleared (tocopherols).',
  yeast: 'Methodology §5 Cleared (brewer’s yeast / nutritional yeast).',
} as const;
"""

UNGRADED: list[str] = []


def slug_id(handle: str, servings: str) -> str:
    base = handle.replace("_", "-")
    if len(base) > 42:
        base = "-".join(handle.split("-")[:5])
    return f"natures-bounty-b196-{base}-{servings}"


def infer_form(title: str, handle: str) -> str:
    t = (title + " " + handle).lower()
    if "gumm" in t:
        return "gummy"
    if "softgel" in t or "softgels" in t:
        return "softgel"
    if "liquid" in t:
        return "liquid"
    if "caplet" in t:
        return "tablet"
    if "capsule" in t:
        return "capsule"
    if "tablet" in t:
        return "tablet"
    return "tablet"


def parse_ingredients(oi: str) -> list[tuple[str, str, str]]:
    oi = re.sub(r"\s*Contains.*", "", oi, flags=re.I)
    oi = oi.split(". The Flaxseed")[0]
    parts = [p.strip() for p in oi.split(",") if p.strip()]
    out = []
    for p in parts:
        key = p.lower().strip().strip(".")
        if "ferrous sulfate" in key or "ferrous sulphate" in key:
            continue
        if key not in METH_KEYS:
            UNGRADED.append(key)
            continue
        risk, meth = METH_KEYS[key]
        display = p.strip().rstrip(".").replace("\u2019", "'")
        if key in ("brewer’s yeast", "brewer's yeast"):
            display = "Cultured Yeast"
        if key == "lime oil":
            display = "Natural Flavors"
            risk, meth = ("limited", "flavor")
        out.append((display, risk, meth))
    return out


def upc_ok(code: str) -> bool:
    if not re.fullmatch(r"\d{12}", code or ""):
        return False
    s = sum(int(code[i]) * (3 if i % 2 == 0 else 1) for i in range(11))
    return (10 - (s % 10)) % 10 == int(code[11])


def sources_from_steps(steps: dict, sale: dict) -> str:
    parts = []
    for i in range(1, 9):
        s = steps.get(str(i)) or steps.get(i)
        if s and s.startswith("Opened"):
            parts.append(s.rstrip("."))
    return " ".join(parts) + "."


def esc(s: str) -> str:
    return s.replace("\\", "\\\\").replace("'", "\\'")


def active_line(title: str, form: str, handle: str) -> str:
    if "iron" in handle:
        return "[{ name: 'Iron (ferrous sulfate)', strength: '65 mg elemental iron per tablet' }]"
    name = title.replace("Nature's Bounty", "").strip() or title
    return f"[{{ name: '{esc(name)}', strength: 'per {form} (see brand panel)' }}]"


def form_plural(form: str) -> str:
    return {"gummy": "gummies", "softgel": "softgels", "tablet": "tablets", "capsule": "capsules", "liquid": "liquid"}.get(
        form, form + "s"
    )


written = DATA["written"]
rows_ts = []
for w in sorted(written, key=lambda x: -x["index"]):
    b = w["brand"]
    handle = w["handle"]
    panel = b["panel"]
    servings = b["servings"]
    form = infer_form(b["title"], handle)
    row_id = slug_id(handle, servings)
    formula_id = row_id
    flags = parse_ingredients(b["oi"])
    if not flags:
        raise SystemExit(f"No graded flags for {handle}")
    flag_lines = []
    for name, risk, meth in flags:
        flag_lines.append(
            f"      flag('{panel}', '{esc(name)}', '{risk}', METH.{meth}),"
        )
    levels = [f[1] for f in flags]
    verdict = "avoid" if "high" in levels else ("caution" if any(x in levels for x in ("moderate", "limited")) else "clean")
    barcode = b["barcode"] if upc_ok(b.get("barcode", "")) else ""
    sale = w["sale"]
    retailers = f"['{sale['store']}']"
    pname = f"Nature's Bounty {b['title']} ({servings} {form_plural(form)})"
    src = sources_from_steps(w["steps"], sale)
    rows_ts.append(
        f"""  {{
    id: '{row_id}',
    productName: "{pname}",
    brand: "Nature's Bounty",
    category: VITAMINS,
    formulaId: '{formula_id}',
    audience: ADULT,
    minAge: 18,
    form: '{form}',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '{barcode}',
    activeIngredients: {active_line(b['title'], form, handle)},
    inactiveIngredients: [
{chr(10).join(flag_lines)}
    ],
    verdict: '{verdict}',
    retailers: {retailers},
    sourcesGeneral: [
      "{src.replace('"', '\\"')}",
    ],
  }},"""
    )

if UNGRADED:
    print("UNGRADED TOKENS:", sorted(set(UNGRADED)))
    raise SystemExit(1)

header = f"""// DRAFT / not verified / batch 196 KYR6-c.
// Nature's Bounty packs from products.json catalog indices 120–42 (t60u).
// Rows only where the brand panel was read and a named store showed the same count for sale.

import type {{ IngredientFlag, RatingRecord, RiskLevel }} from '../ratingRecord';
import {{ plainIngredientWhy }} from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const VITAMINS = 'Vitamins';
{METH_BLOCK}
function flag(panel: string, name: string, riskLevel: RiskLevel, methKey: keyof typeof METH): IngredientFlag {{
  return {{ name, riskLevel, source: `${{panel}}; ${{METH[methKey]}}` }};
}}

export const BATCH196_KYR6C_NB_FORTY: RatingRecord[] = [
"""
footer = f"""
];

const ROWS = BATCH196_KYR6C_NB_FORTY;

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

if (ROWS.length !== {len(written)}) throw new Error(`batch196 row count ${{ROWS.length}}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch196 duplicate id');

for (const record of ROWS) {{
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch196 upc ${{record.id}}`);
  if (record.honestNote) throw new Error(`batch196 unexpected note ${{record.id}}`);
  for (const ingredient of record.inactiveIngredients) {{
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch196 blank why ${{record.id}} ${{ingredient.name}}`);
    if (!ingredient.source?.trim()) throw new Error(`batch196 blank source ${{ingredient.name}}`);
  }}
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch196 verdict ${{record.id}}`);
}}
"""

OUT.write_text(header + "\n".join(rows_ts) + footer)
print(f"Wrote {OUT} with {len(written)} rows")
