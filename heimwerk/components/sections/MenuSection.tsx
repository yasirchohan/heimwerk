'use client'
import { useState } from 'react'
import type { MenuKategorie } from '@/types'

function formatPrice(p: number) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(p)
}

interface Props {
  kategorien: MenuKategorie[]
}

export default function MenuSection({ kategorien }: Props) {
  const [activeSlug, setActiveSlug] = useState(kategorien[0]?.slug || '')
  const active = kategorien.find(k => k.slug === activeSlug)

  return (
    <section id="menu" className="py-28 bg-charcoal">
      <div className="max-w-6xl mx-auto px-12">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="section-tag justify-center">Die Karte</p>
          <h2 className="section-title mt-3">Unsere <em>Speisekarte</em></h2>
          <p className="font-sans text-sm text-text-muted leading-loose mt-5">
            Kleiner oder normaler Appetit? Viele unserer Speisen bieten wir in zwei Größen an – als Snack oder NorMahl.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-gold/15 overflow-x-auto scrollbar-hide mb-12">
          {kategorien.map(k => (
            <button
              key={k.slug}
              onClick={() => setActiveSlug(k.slug)}
              className={`font-sans text-[0.65rem] tracking-[0.2em] uppercase px-7 py-4 border-b-2 transition-all duration-300 whitespace-nowrap bg-transparent cursor-pointer ${
                activeSlug === k.slug
                  ? 'text-gold border-gold'
                  : 'text-text-muted border-transparent hover:text-gold'
              }`}
            >
              {k.name}
            </button>
          ))}
        </div>

        {/* Menu items */}
        {active && (
          <div className="grid grid-cols-1 md:grid-cols-2">
            {active.gerichte?.map((g, i) => (
              <div
                key={g.id}
                className={`p-8 border-b border-gold/[0.08] transition-colors duration-300 hover:bg-gold/[0.04] ${
                  i % 2 === 0 ? 'md:border-r border-gold/[0.08]' : ''
                }`}
              >
                <div className="flex justify-between items-start gap-4 mb-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-serif text-[1.1rem] text-ivory font-normal leading-tight">{g.name}</span>
                    {g.vegan && <span className="font-sans text-[0.55rem] tracking-[0.15em] uppercase px-2 py-1 border border-gold/30 text-gold-muted">Vegan</span>}
                    {g.vegetarisch && !g.vegan && <span className="font-sans text-[0.55rem] tracking-[0.15em] uppercase px-2 py-1 border border-gold/30 text-gold-muted">Vegetarisch</span>}
                    {g.highlight && <span className="font-sans text-[0.55rem] tracking-[0.15em] uppercase px-2 py-1 bg-gold/10 text-gold">Empfehlung</span>}
                  </div>
                  <span className="font-serif text-[1.05rem] text-gold whitespace-nowrap font-light">{formatPrice(g.preis)}</span>
                </div>
                {g.beschreibung && (
                  <p className="font-sans text-[0.78rem] text-text-muted leading-relaxed">{g.beschreibung}</p>
                )}
              </div>
            ))}
          </div>
        )}

        <p className="font-sans text-center text-[0.72rem] text-text-dim mt-10 tracking-[0.08em]">
          Alle Preise inkl. MwSt. Es gilt die jeweils aktuelle Speisekarte im Restaurant.
        </p>
        <div className="text-center mt-8">
          <a href="https://www.lieferando.de/speisekarte/heimwerk-altstadt" target="_blank" rel="noopener" className="btn-ghost">
            Online bestellen via Lieferando
          </a>
        </div>
      </div>
    </section>
  )
}
