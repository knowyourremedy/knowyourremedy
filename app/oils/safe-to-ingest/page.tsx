'use client'

import Link from 'next/link'

export default function SafeToIngestPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#faf7f2' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '1.5rem 1.5rem 4rem' }}>

        {/* Back link */}
        <Link href="/oils" style={{
          display: 'inline-block',
          fontSize: '0.85rem',
          color: '#4a6741',
          textDecoration: 'none',
          marginBottom: '1.25rem',
          fontFamily: 'var(--font-inter), sans-serif',
        }}>← All oils</Link>

        {/* Title */}
        <div style={{
          marginBottom: '1.5rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid #e8e0d0',
        }}>
          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '2rem',
            fontWeight: 700,
            color: '#2d4a3e',
            margin: '0 0 0.35rem',
            letterSpacing: '-0.01em',
          }}>Safe to ingest? Read this first.</h1>
          <p style={{
            fontSize: '0.92rem',
            fontStyle: 'italic',
            color: '#7a8a78',
            margin: 0,
            fontFamily: 'var(--font-playfair), Georgia, serif',
          }}>The one rule that tells you what&rsquo;s safe to swallow — and what isn&rsquo;t.</p>
        </div>

        {/* The rule, up front */}
        <div style={{
          background: '#f0fdf4',
          border: '1.5px solid #c8ddc0',
          borderRadius: '12px',
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
        }}>
          <div style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            color: '#166534',
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            marginBottom: '0.5rem',
            fontFamily: 'var(--font-inter), sans-serif',
          }}>The one reliable indicator</div>
          <div style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '1.35rem',
            fontWeight: 700,
            color: '#166534',
            lineHeight: 1.35,
            marginBottom: '0.5rem',
          }}>
            A Supplement Facts panel on the label.
          </div>
          <div style={{
            fontSize: '0.92rem',
            color: '#166534',
            lineHeight: 1.6,
            fontFamily: 'var(--font-inter), sans-serif',
          }}>
            If the bottle has a Supplement Facts panel, the FDA has cleared it for internal use. If it doesn&rsquo;t, no marketing claim — &ldquo;100% pure,&rdquo; &ldquo;therapeutic grade,&rdquo; &ldquo;natural,&rdquo; or any brand certification — qualifies it for ingestion.
          </div>
        </div>

        {/* Section 1 — What is a Supplement Facts panel */}
        <section style={{ marginBottom: '2rem' }}>
          <div style={sectionLabelStyle}>What is a Supplement Facts panel?</div>
          <div style={sectionRuleStyle}></div>
          <p style={proseStyle}>
            A Supplement Facts panel is a black-bordered box on the label of any product the FDA recognizes as a dietary supplement. It looks similar to a Nutrition Facts panel on food, but with different headings.
          </p>
          <p style={proseStyle}>
            The panel lists serving size, amount per serving, and active ingredients with their daily values. The FDA requires this label on any product sold for internal use under dietary supplement laws.
          </p>
          <div style={{
            background: '#fff',
            border: '1px solid #e8e0d0',
            borderRadius: '10px',
            padding: '1rem 1.25rem',
            marginTop: '1rem',
          }}>
            <div style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              color: '#5c4a1f',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.5rem',
              fontFamily: 'var(--font-inter), sans-serif',
            }}>What it looks like</div>
            <div style={{
              fontFamily: 'monospace',
              fontSize: '0.78rem',
              color: '#2d4a3e',
              border: '2px solid #2d4a3e',
              padding: '0.75rem',
              borderRadius: '4px',
              lineHeight: 1.5,
              background: '#fff',
            }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.3rem' }}>Supplement Facts</div>
              <div style={{ borderBottom: '1px solid #2d4a3e', paddingBottom: '0.3rem', marginBottom: '0.3rem' }}>
                Serving Size: 1 softgel
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #2d4a3e', paddingBottom: '0.3rem', marginBottom: '0.3rem' }}>
                <span style={{ fontWeight: 700 }}>Amount Per Serving</span>
                <span style={{ fontWeight: 700 }}>% Daily Value</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Peppermint Oil (leaf)</span>
                <span>90 mg</span>
              </div>
              <div style={{ fontSize: '0.7rem', marginTop: '0.4rem', fontStyle: 'italic' }}>
                * Daily Value not established
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 — What does NOT qualify */}
        <section style={{ marginBottom: '2rem' }}>
          <div style={sectionLabelStyle}>What does NOT qualify</div>
          <div style={sectionRuleStyle}></div>
          <p style={proseStyle}>
            The essential oil industry uses many official-sounding marketing terms that imply ingestion safety. None of them are FDA-cleared indicators. The most common offenders:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
            {[
              { phrase: '"100% Pure"', meaning: 'A purity claim only. Says nothing about ingestion safety. A pure oil can still be unsafe to swallow.' },
              { phrase: '"Therapeutic Grade"', meaning: 'A marketing term created by essential oil companies. Has no regulatory meaning. The FDA does not recognize this classification.' },
              { phrase: '"Certified Pure" / "CPTG"', meaning: 'Internal certifications from specific brands (e.g., doTERRA). Self-issued. Not FDA-recognized.' },
              { phrase: '"Food Grade"', meaning: 'Used loosely. Sometimes means flavoring-grade (for industrial food production) but not safe for direct consumption. Not the same as Supplement Facts.' },
              { phrase: '"GRAS"', meaning: 'Generally Recognized As Safe. A real FDA category, but applies to specific food additives in specific amounts. Bulk essential oil bottles labeled GRAS are not authorized for ingestion as drops.' },
              { phrase: '"Natural" / "Organic"', meaning: 'Sourcing claims. Tell you nothing about ingestion safety. Plenty of natural and organic substances are toxic when swallowed.' },
            ].map((item) => (
              <div key={item.phrase} style={{
                background: '#fff',
                border: '1px solid #e8e0d0',
                borderRadius: '8px',
                padding: '0.85rem 1rem',
              }}>
                <div style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: '#c0392b',
                  marginBottom: '0.2rem',
                  fontFamily: 'var(--font-inter), sans-serif',
                }}>
                  {item.phrase}
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  color: '#5a7a6e',
                  lineHeight: 1.55,
                  fontFamily: 'var(--font-inter), sans-serif',
                }}>
                  {item.meaning}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 — Why does this matter? */}
        <section style={{ marginBottom: '2rem' }}>
          <div style={sectionLabelStyle}>Why does this matter?</div>
          <div style={sectionRuleStyle}></div>
          <p style={proseStyle}>
            Essential oils are concentrated. A single drop can be the equivalent of 15-40 cups of the source herb in tea form. When the oil is intended for aromatherapy (smelling, diffusing) or topical use (applied diluted to skin), the body absorbs only a fraction of the active compounds.
          </p>
          <p style={proseStyle}>
            When you swallow that same drop, you absorb the full concentration into your gut and bloodstream within minutes. The metabolic load on your liver, the impact on gut bacteria, and the risk of mucous-membrane irritation are dramatically higher.
          </p>
          <p style={proseStyle}>
            The Supplement Facts panel exists because the FDA has verified that the specific product, in the specific dose listed, has been formulated and packaged for safe internal use. The same oil sold without that panel hasn&rsquo;t been verified for ingestion — even if the chemistry seems identical.
          </p>
        </section>

        {/* Section 4 — Which oils have ingestible options */}
        <section style={{ marginBottom: '2rem' }}>
          <div style={sectionLabelStyle}>Which oils have ingestible options?</div>
          <div style={sectionRuleStyle}></div>
          <p style={proseStyle}>
            Several oils have legitimate ingestible product forms — typically capsules, softgels, or culinary-grade liquid drops. The product itself carries the Supplement Facts panel; the same oil sold for aromatherapy does not.
          </p>
          <div style={{ marginTop: '1rem' }}>
            {[
              { name: 'Peppermint Oil', forms: 'Enteric-coated capsules (IBgard, Pepogest) for IBS and digestive use. Some FDA-cleared culinary drops.', slug: 'peppermint-oil' },
              { name: 'Oregano Oil', forms: 'Enteric-coated softgels (10:1 extract) for antimicrobial use. Adults only. Very potent.', slug: 'oregano-oil' },
              { name: 'Lemon Oil', forms: 'FDA-cleared culinary-grade liquid for baking, beverages, and dressings. Look for "for culinary use" on the label plus a Supplement Facts panel.', slug: 'lemon-oil' },
              { name: 'Sweet Orange Oil', forms: 'FDA-cleared culinary-grade liquid for baking and beverages. Same rules as lemon.', slug: 'sweet-orange-oil' },
              { name: 'Ginger Essential Oil', forms: 'Standardized ginger capsules (250-500 mg). FDA-cleared liquid drops for tea or honey, adults only.', slug: 'ginger-essential-oil' },
              { name: 'Frankincense Oil', forms: 'Standardized boswellic acid capsules (300-500 mg) for joint and anti-inflammatory use. Adults only.', slug: 'frankincense-oil' },
            ].map((item) => (
              <div key={item.slug} style={{
                background: '#fff',
                border: '1px solid #e8e0d0',
                borderRadius: '8px',
                padding: '0.85rem 1rem',
                marginBottom: '0.5rem',
              }}>
                <Link href={`/oils/${item.slug}`} style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: '#2d4a3e',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-inter), sans-serif',
                  display: 'inline-block',
                  marginBottom: '0.2rem',
                }}>
                  {item.name} <span style={{ color: '#4a6741', fontWeight: 500 }}>→</span>
                </Link>
                <div style={{
                  fontSize: '0.85rem',
                  color: '#5a7a6e',
                  lineHeight: 1.55,
                  fontFamily: 'var(--font-inter), sans-serif',
                }}>
                  {item.forms}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5 — Practical buying guidance */}
        <section style={{ marginBottom: '2rem' }}>
          <div style={sectionLabelStyle}>Practical buying guidance</div>
          <div style={sectionRuleStyle}></div>
          <p style={proseStyle}>
            When shopping for an ingestible oil product, here is the order to check:
          </p>
          <ol style={{
            paddingLeft: '1.25rem',
            fontSize: '0.92rem',
            color: '#5a7a6e',
            lineHeight: 1.7,
            fontFamily: 'var(--font-inter), sans-serif',
            marginBottom: '0.5rem',
          }}>
            <li><strong style={{ color: '#2d4a3e' }}>Look at the label.</strong> Find the Supplement Facts panel. No panel? Stop. This product is not for ingestion.</li>
            <li><strong style={{ color: '#2d4a3e' }}>Read the serving size.</strong> Use exactly what the label says. Do not estimate from a bulk bottle.</li>
            <li><strong style={{ color: '#2d4a3e' }}>Check the active ingredient amount.</strong> Higher dose is not better. Established clinical doses are usually moderate.</li>
            <li><strong style={{ color: '#2d4a3e' }}>Verify the manufacturer follows GMP.</strong> Reputable brands display NSF, USP, or ConsumerLab certification. The Supplement Facts panel is the FDA gate; these third-party certifications add quality assurance.</li>
            <li><strong style={{ color: '#2d4a3e' }}>Ignore the marketing.</strong> &ldquo;Therapeutic grade,&rdquo; &ldquo;100% pure,&rdquo; and similar phrases on the front of the bottle are not relevant to ingestion safety. The Supplement Facts panel on the back is.</li>
          </ol>
        </section>

        {/* Section 6 — What about Worwood's culinary recommendations? */}
        <section style={{ marginBottom: '2rem' }}>
          <div style={sectionLabelStyle}>What about culinary recipes using essential oils?</div>
          <div style={sectionRuleStyle}></div>
          <p style={proseStyle}>
            Some aromatherapy literature, including Valerie Ann Worwood&rsquo;s widely-cited <em>Complete Book of Essential Oils and Aromatherapy</em>, includes recipes for adding drops of essential oils to food, baking, or beverages. These recipes can be safe — but only when the oil itself has been cleared for internal use.
          </p>
          <p style={proseStyle}>
            A drop of FDA-cleared culinary lemon oil in salad dressing is reasonable. A drop of aromatherapy-grade lemon oil from the same brand, in the same dressing, is not — because the aromatherapy version was never verified for ingestion.
          </p>
          <p style={proseStyle}>
            The Supplement Facts panel rule still applies. The delivery method (capsule, drops in food, drops in honey) is a secondary choice. The gate is always whether the specific bottle in your hand is FDA-cleared for internal use.
          </p>
        </section>

        {/* Section 7 — When in doubt */}
        <section style={{ marginBottom: '2rem' }}>
          <div style={sectionLabelStyle}>When in doubt</div>
          <div style={sectionRuleStyle}></div>
          <p style={proseStyle}>
            Don&rsquo;t ingest it. Use the oil topically (diluted in a carrier oil) or aromatically (diffuser, inhalation) instead. Both delivery methods are well-studied for the therapeutic benefits most people are seeking.
          </p>
          <p style={proseStyle}>
            If you have a specific therapeutic goal that genuinely requires ingestion — for example, peppermint capsules for IBS — buy the FDA-cleared product designed for that purpose, not the aromatherapy bottle.
          </p>
        </section>

        {/* Sources */}
        <section style={{
          paddingTop: '1rem',
          borderTop: '1px solid #e8e0d0',
          fontFamily: 'var(--font-inter), sans-serif',
        }}>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: 600,
            color: '#5a7a6e',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginRight: '0.45rem',
          }}>Sources</span>
          <span style={{
            fontSize: '0.72rem',
            color: '#9aa39a',
            fontStyle: 'italic',
            lineHeight: 1.55,
          }}>
            FDA Dietary Supplement Health and Education Act (DSHEA) · FDA 21 CFR Part 111 (Good Manufacturing Practices) · Worwood VA: Complete Book of Essential Oils and Aromatherapy 2nd ed. 2016 · Tisserand R, Young R: Essential Oil Safety 2nd ed. 2014 · NIH NCCIH — Dietary Supplement Fact Sheets.
          </span>
        </section>

      </div>
    </main>
  )
}

// ─── Styles ────────────────────────────────────────────────────

const sectionLabelStyle: React.CSSProperties = {
  fontSize: '1.15rem',
  fontWeight: 700,
  color: '#2d4a3e',
  marginBottom: '0.35rem',
  fontFamily: 'var(--font-playfair), Georgia, serif',
}

const sectionRuleStyle: React.CSSProperties = {
  width: '28px',
  height: '2px',
  background: '#4a6781',
  borderRadius: '2px',
  marginBottom: '0.85rem',
}

const proseStyle: React.CSSProperties = {
  fontSize: '0.92rem',
  color: '#5a7a6e',
  lineHeight: 1.7,
  fontFamily: 'var(--font-inter), sans-serif',
  marginBottom: '0.85rem',
}