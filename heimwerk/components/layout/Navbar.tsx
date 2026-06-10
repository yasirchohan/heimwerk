'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#story', label: 'Über uns' },
    { href: '#menu', label: 'Speisekarte' },
    { href: '#getraenke', label: 'Getränke' },
    { href: '#standort', label: 'Standort' },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 px-12 flex items-center justify-between h-20 transition-all duration-500 ${scrolled ? 'bg-hblack/92 backdrop-blur-xl border-b border-gold/10' : ''}`}>
        <Link href="/" className="font-serif text-2xl font-medium text-ivory tracking-[0.12em] uppercase no-underline">
          Heim<span className="text-gold">Werk</span>
        </Link>
        <ul className="hidden md:flex items-center gap-10 list-none">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="font-sans text-[0.72rem] font-normal tracking-[0.2em] uppercase text-ivory-dim no-underline transition-colors duration-300 hover:text-gold">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#reservierung" className="hidden md:inline-block border border-gold text-gold font-sans text-[0.65rem] font-medium tracking-[0.25em] uppercase px-7 py-2.5 transition-all duration-300 hover:bg-gold hover:text-hblack no-underline">
          Tisch reservieren
        </a>
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden flex flex-col gap-1.5 bg-transparent border-0 cursor-pointer p-2"
          aria-label="Menü öffnen"
        >
          <span className="block w-6 h-px bg-ivory transition-all" />
          <span className="block w-6 h-px bg-ivory transition-all" />
          <span className="block w-6 h-px bg-ivory transition-all" />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-hblack z-[999] flex flex-col items-center justify-center gap-10 transition-opacity duration-400 ${menuOpen ? 'flex opacity-100' : 'hidden opacity-0'}`}>
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-8 right-8 bg-transparent border-0 text-ivory-dim text-4xl cursor-pointer leading-none"
        >×</button>
        {links.map(l => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setMenuOpen(false)}
            className="font-serif text-4xl font-light text-ivory no-underline tracking-[0.08em] hover:text-gold transition-colors"
          >{l.label}</a>
        ))}
        <a
          href="#reservierung"
          onClick={() => setMenuOpen(false)}
          className="font-serif text-4xl font-light text-gold no-underline tracking-[0.08em]"
        >Reservierung</a>
      </div>
    </>
  )
}
