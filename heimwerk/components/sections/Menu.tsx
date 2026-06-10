'use client'
// components/sections/Menu.tsx

import { useState } from 'react'
import { menuCategories, type MenuItem } from '@/lib/menu-data'

function Badge({ type }: { type: 'vegan' | 'vegetarisch' }) {
  return (
    <span className="inline-block font-sans text-[0.55rem] tracking-[0.15em] uppercase px-2 py-0.5 border border-gold/30 text-gold-muted ml-2 align-middle">
      {type}
    </span>
  )
}

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="p-6 border-b border-r border-gold/8 hover:bg-gold/[0.02] transition-colors duration-300">
      <div className="flex justify-between items-baseline gap-4 mb-1.5">
        <span className="font-serif text-lg font-normal text-ivory leading-snug">
          {item.name}
          {item.badges?.map(b => <Badge key={b} type={b} />)}
        </span>
        <span className="font-serif text-base font-light text-gold whitespace-nowrap">
          {item.price.toFixed(2).replace('.', ',')} €
        </span>
      </div>
      {item.desc && <p className="font-sans text-xs text-text-muted leading-relaxed">{item.desc}</p>}
    </div>
  )
}

export default function Menu() {
  const [active, setActive] = useState('vorweg')
  const current = menuCategories.find(c => c.id === active)

  return (
    <section className="bg-charcoal py-28" id="menu">
      <div className="max-w-6xl mx-auto px-12">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="flex items-center justify-center gap-4 font-sans text-[0.62rem] tracking-[0.32em] uppercase text-gold mb-4">
            <span className="block w-8 h-px bg-gold" />Die Karte
          </p>
          <h2 className="font-serif text-5xl font-light text-ivory mb-4">
            Unsere <em className="italic text-gold-light">Speisekarte</em>
          </h2>
          <p className="font-sans text-sm font-light text-text-muted leading-loose">
            Viele unserer Speisen bieten wir in zwei Größen an — als Snack oder NorMahl. Um Speiseabfälle zu vermeiden.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-gold/15 mb-0 overflow-x-auto scrollbar-none">
          {menuCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`font-sans text-[0.65rem] tracking-[0.2em] uppercase px-6 py-4 border-none cursor-pointer whitespace-nowrap transition-all duration-300 border-b-2 -mb-px ${
                active === cat.id
                  ? 'text-gold border-gold bg-transparent'
                  : 'text-text-muted border-transparent bg-transparent hover:text-gold'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Items grid */}
        {current && (
          <div className="grid grid-cols-1 md:grid-cols-2 border-l border-t border-gold/8">
            {current.items.map((item, i) => (
              <div key={item.id} className={i % 2 === 0 ? '' : 'border-r-0'}>
                <MenuCard item={item} />
              </div>
            ))}
          </div>
        )}

        <p className="text-center font-sans text-xs text-text-dim mt-8 tracking-wide">
          Alle Preise in Euro inkl. MwSt. Es gilt die jeweils aktuelle Speisekarte im Restaurant.
        </p>

        <div className="text-center mt-8">
          <a
            href="https://www.lieferando.de/speisekarte/heimwerk-altstadt"
            target="_blank" rel="noopener noreferrer"
            className="inline-block border border-gold/30 text-ivory-dim font-sans text-xs tracking-[0.25em] uppercase px-10 py-3 hover:border-gold hover:text-gold transition-all duration-300"
          >
            Online bestellen via Lieferando
          </a>
        </div>
      </div>
    </section>
  )
}
