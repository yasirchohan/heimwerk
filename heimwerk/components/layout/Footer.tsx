import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-gold/10">
      <div className="max-w-6xl mx-auto px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 py-20">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-serif text-3xl font-light text-ivory tracking-[0.1em] uppercase no-underline">
              Heim<span className="text-gold">Werk</span>
            </Link>
            <p className="font-sans text-[0.78rem] text-text-muted leading-loose mt-4 max-w-xs">
              Handwerkliche Schnitzelküche mit bayerischer Seele in der Düsseldorfer Altstadt. Täglich frisch, regional und mit Liebe zubereitet.
            </p>
            <div className="flex gap-4 mt-5">
              <a href="https://www.instagram.com/heimwerkrestaurant/" target="_blank" rel="noopener" aria-label="Instagram"
                className="flex items-center justify-center w-10 h-10 border border-gold/25 text-text-muted transition-all duration-300 hover:border-gold hover:text-gold hover:bg-gold/5">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://www.facebook.com/heimwerkrestaurant/" target="_blank" rel="noopener" aria-label="Facebook"
                className="flex items-center justify-center w-10 h-10 border border-gold/25 text-text-muted transition-all duration-300 hover:border-gold hover:text-gold hover:bg-gold/5">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-sans text-[0.58rem] font-medium tracking-[0.25em] uppercase text-gold-muted mb-5">Navigieren</h4>
            <ul className="flex flex-col gap-2.5 list-none">
              {[['#story','Über uns'],['#menu','Speisekarte'],['#getraenke','Getränke'],['#standort','Standort'],['#reservierung','Reservierung']].map(([href,label]) => (
                <li key={href}><a href={href} className="font-sans text-[0.78rem] text-text-muted no-underline transition-colors hover:text-ivory-dim">{label}</a></li>
              ))}
            </ul>
          </div>

          {/* Standorte */}
          <div>
            <h4 className="font-sans text-[0.58rem] font-medium tracking-[0.25em] uppercase text-gold-muted mb-5">Standorte</h4>
            <ul className="flex flex-col gap-2.5 list-none">
              {[
                ['https://www.heimwerk-restaurant.de/standorte/duesseldorf-altstadt','Düsseldorf Altstadt'],
                ['https://www.heimwerk-restaurant.de/standorte/duesseldorf-mitte','Düsseldorf Mitte'],
                ['https://www.heimwerk-restaurant.de','München'],
              ].map(([href,label]) => (
                <li key={href}><a href={href} target="_blank" rel="noopener" className="font-sans text-[0.78rem] text-text-muted no-underline transition-colors hover:text-ivory-dim">{label}</a></li>
              ))}
            </ul>
          </div>

          {/* Kontakt & Legal */}
          <div>
            <h4 className="font-sans text-[0.58rem] font-medium tracking-[0.25em] uppercase text-gold-muted mb-5">Kontakt</h4>
            <ul className="flex flex-col gap-2.5 list-none">
              <li><a href="tel:+4921195588600" className="font-sans text-[0.78rem] text-text-muted no-underline transition-colors hover:text-ivory-dim">+49 211 955 886 00</a></li>
              <li><a href="mailto:duesseldorf@heimwerk-restaurant.de" className="font-sans text-[0.78rem] text-text-muted no-underline transition-colors hover:text-ivory-dim">E-Mail senden</a></li>
              <li className="mt-3"><a href="https://www.heimwerk-restaurant.de/impressum" target="_blank" rel="noopener" className="font-sans text-[0.78rem] text-text-muted no-underline transition-colors hover:text-ivory-dim">Impressum</a></li>
              <li><a href="https://www.heimwerk-restaurant.de/datenschutz" target="_blank" rel="noopener" className="font-sans text-[0.78rem] text-text-muted no-underline transition-colors hover:text-ivory-dim">Datenschutz</a></li>
              <li><a href="https://www.lieferando.de/speisekarte/heimwerk-altstadt" target="_blank" rel="noopener" className="font-sans text-[0.78rem] text-text-muted no-underline transition-colors hover:text-ivory-dim">Online bestellen</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold/[0.08] py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-[0.7rem] text-text-dim tracking-[0.05em]">© 2024 HeimWerk Restaurant GmbH · Hafenstraße 9 · 40213 Düsseldorf</p>
          <p className="font-sans text-[0.7rem] text-text-dim">Gestaltet mit Leidenschaft für das Handwerk</p>
        </div>
      </div>
    </footer>
  )
}
