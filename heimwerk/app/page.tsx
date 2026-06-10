import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MenuSection from '@/components/sections/MenuSection'
import ReservationForm from '@/components/sections/ReservationForm'
import { prisma } from '@/lib/db'

async function getMenu() {
  try {
    const kategorien = await prisma.menuKategorie.findMany({
      where: { aktiv: true },
      orderBy: { reihenfolge: 'asc' },
      include: {
        gerichte: { where: { aktiv: true }, orderBy: { preis: 'asc' } },
      },
    })
    return kategorien
  } catch {
    return []
  }
}

export default async function HomePage() {
  const kategorien = await getMenu()

  return (
    <>
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=80"
            alt="HeimWerk Restaurant Atmosphäre"
            fill
            priority
            className="object-cover brightness-50 sepia-[0.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-hblack/30 via-hblack/50 to-hblack/95" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(42,31,20,0.6)_0%,transparent_60%)]" />
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto px-8 animate-fade-up">
          <p className="section-tag justify-center mb-7">Düsseldorf Altstadt · Seit 2019</p>
          <h1 className="font-serif font-light text-ivory leading-[1.05] mb-5" style={{fontSize:'clamp(3.5rem,8vw,7rem)'}}>
            Das Handwerk<br/>des <em className="text-gold-light" style={{fontStyle:'italic'}}>Schnitzels</em>
          </h1>
          <p className="font-sans text-[0.9rem] font-light tracking-[0.12em] text-ivory-dim mb-12 leading-[1.9]">
            Regionale Zutaten · Hauseigene Panade · Slow Food Philosophie<br/>Hafenstraße 9 · Düsseldorf
          </p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <a href="#menu" className="btn-primary">Zur Speisekarte</a>
            <a href="#reservierung" className="btn-ghost">Tisch reservieren</a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 z-10">
          <span className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-text-muted">Entdecken</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent animate-scroll-pulse" />
        </div>
      </section>

      {/* ═══ TICKER ═══ */}
      <div className="bg-gradient-to-r from-charcoal-3 via-wood to-charcoal-3 py-10 border-y border-gold/10 overflow-hidden">
        <div className="flex gap-16 animate-ticker w-max">
          {['Regionale Produkte','Artgerechte Tierhaltung','Vegane Variationen','Hauseigene Panade','Augustiner vom Fass','Täglich frisch','Slow Food Philosophie',
            'Regionale Produkte','Artgerechte Tierhaltung','Vegane Variationen','Hauseigene Panade','Augustiner vom Fass','Täglich frisch','Slow Food Philosophie']
            .map((item, i) => (
            <span key={i} className="flex items-center gap-4 whitespace-nowrap font-sans text-[0.65rem] font-normal tracking-[0.25em] uppercase text-text-muted">
              <span className="w-1 h-1 bg-gold flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ═══ STORY ═══ */}
      <section id="story" className="bg-charcoal">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          <div className="relative overflow-hidden min-h-[400px] lg:min-h-auto">
            <Image
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80"
              alt="Handwerkliche Küche"
              fill
              className="object-cover brightness-75 sepia-[0.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-hblack/40 to-transparent" />
          </div>
          <div className="bg-charcoal-2 px-12 lg:px-16 py-20 flex flex-col justify-center">
            <p className="section-tag">Unsere Geschichte</p>
            <h2 className="section-title mt-3">Wo <em>Handwerk</em><br/>zur Kunst wird</h2>
            <div className="w-14 h-px bg-gold-muted my-8" />
            <p className="font-sans text-[0.9rem] font-light text-ivory-dim leading-loose max-w-lg">
              Seit 2019 bringt HeimWerk die bayerische Schnitzelkultur in die Düsseldorfer Altstadt. Mit Ehrfurcht vor dem Handwerk, Respekt vor regionalen Produzenten und dem unbedingten Willen zur Qualität.
            </p>
            <blockquote className="font-serif text-2xl font-light italic text-ivory my-8 pl-6 border-l-2 border-gold leading-relaxed">
              „Wo zünftige Bayrischkeit auf urbanes Altstadtflair trifft."
            </blockquote>
            <div className="flex gap-12 mt-4">
              {[['2019','Gegründet'],['20+','Schnitzel-Variationen'],['100%','Regional']].map(([num, label]) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="font-serif text-4xl font-light text-gold-light leading-none">{num}</span>
                  <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-text-muted">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PILLARS ═══ */}
      <section className="py-28 bg-hblack">
        <div className="max-w-6xl mx-auto px-12">
          <div className="text-center max-w-lg mx-auto mb-16">
            <p className="section-tag justify-center">Unsere Philosophie</p>
            <h2 className="section-title mt-3">Das <em>HeimWerk</em>-Versprechen</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 border border-gold/12">
            {[
              { num: '01', title: 'Regionale Herkunft', body: 'Wir beziehen unsere Zutaten von lokalen Produzenten und Bauernhöfen aus der Region. Kurze Wege garantieren Frische und Qualität auf jedem Teller.' },
              { num: '02', title: 'Hauseigene Panade', body: 'Jede unserer Panaden wird täglich frisch im Haus hergestellt. Dieses Handwerk verleiht jedem Schnitzel seine unverwechselbare Textur und seinen Charakter.' },
              { num: '03', title: 'Inklusive Küche', body: 'Von klassischem Kalbsschnitzel bis zu veganen Mais- und Sellerieschnitzeln. Unser Angebot richtet sich an alle – ohne Kompromisse bei Qualität.' },
            ].map((p, i) => (
              <div key={i} className={`p-14 relative overflow-hidden group transition-colors duration-400 hover:bg-charcoal ${i < 2 ? 'border-r border-gold/12' : ''}`}>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="font-serif text-6xl font-light text-gold/10 leading-none mb-6">{p.num}</div>
                <h3 className="font-serif text-xl font-normal text-ivory mb-3">{p.title}</h3>
                <p className="font-sans text-[0.82rem] leading-loose text-text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MENU (server component with DB data) ═══ */}
      <MenuSection kategorien={kategorien} />

      {/* ═══ GALLERY ═══ */}
      <section className="bg-charcoal-2">
        <div className="max-w-6xl mx-auto px-12 py-20">
          <div className="text-center mb-16">
            <p className="section-tag justify-center">Atmosphäre & Genuss</p>
            <h2 className="section-title mt-3">Das <em>HeimWerk</em> Erlebnis</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {[
            { src:'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=75', label:'Gemütliche Atmosphäre', span:'col-span-2 row-span-2' },
            { src:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=75', label:'Handwerkskunst', span:'' },
            { src:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=75', label:'Kulinarische Vielfalt', span:'' },
            { src:'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=75', label:'Bar & Getränke', span:'' },
            { src:'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500&q=75', label:'Frische Zutaten', span:'' },
          ].map((img, i) => (
            <div key={i} className={`relative overflow-hidden group ${img.span} ${i===0?'h-[420px]':'h-[206px]'}`}>
              <Image src={img.src} alt={img.label} fill className="object-cover brightness-75 contrast-105 sepia-[0.08] transition-all duration-700 group-hover:scale-105 group-hover:brightness-85"/>
              <div className="absolute inset-0 bg-hblack/0 group-hover:bg-hblack/40 transition-colors duration-400 flex items-end p-6">
                <span className="font-serif text-base italic text-ivory opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ GETRÄNKE ═══ */}
      <section id="getraenke" className="py-28 bg-charcoal-3">
        <div className="max-w-6xl mx-auto px-12">
          <div className="text-center max-w-lg mx-auto mb-16">
            <p className="section-tag justify-center">Zu jeder Mahlzeit</p>
            <h2 className="section-title mt-3">Unsere <em>Getränke</em></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gold/10">
            {[
              { icon:'🍺', name:'Augustiner vom Fass', desc:'Das Original aus München – direkt vom Fass, frisch gezapft. Die perfekte Begleitung zu jedem Schnitzel.', price:'' },
              { icon:'🍷', name:'Ausgewählte Weine', desc:'Grauburgunder Pfalz, Riesling Uli Metzger, Weißburgunder Bimmerle – sorgfältig kuratierte Winzer.', price:'ab 24,00 €' },
              { icon:'🍋', name:'Fritz-Limo & Mehr', desc:'Erfrischende fritz-limos, stilles Kondrauer Mineralwasser und Craftbiere von Maisel & Friends.', price:'ab 3,00 €' },
            ].map(d => (
              <div key={d.name} className="bg-charcoal-3 p-12 text-center transition-colors hover:bg-charcoal-2">
                <span className="block text-4xl mb-5">{d.icon}</span>
                <h3 className="font-serif text-xl font-normal text-ivory mb-2">{d.name}</h3>
                <p className="font-sans text-[0.78rem] text-text-muted leading-loose">{d.desc}</p>
                {d.price && <p className="font-serif text-base text-gold mt-3">{d.price}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RESERVATION ═══ */}
      <section id="reservierung" className="py-28 bg-wood relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(201,168,76,0.06)_0%,transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div>
              <p className="section-tag">Reservierung</p>
              <h2 className="section-title mt-3">Ihren <em>Tisch</em><br/>reservieren</h2>
              <p className="font-sans text-[0.9rem] font-light text-ivory-dim leading-loose mt-5 max-w-md">
                Für Gruppen, besondere Anlässe oder einfach einen entspannten Abend in der Altstadt – wir freuen uns auf Ihren Besuch.
              </p>
              <div className="mt-10 flex flex-col gap-8">
                <div>
                  <h3 className="font-serif text-base font-normal text-gold-light mb-2 tracking-[0.05em]">Öffnungszeiten</h3>
                  <div className="grid grid-cols-2 gap-y-1.5 gap-x-1 mt-2">
                    {[['Mo – Fr','11:30 – 22:00'],['Samstag','11:00 – 22:30'],['Sonntag','11:00 – 21:00']].map(([d,t]) => (
                      <>
                        <span key={d} className="font-sans text-[0.78rem] text-text-muted">{d}</span>
                        <span key={t} className="font-sans text-[0.78rem] text-ivory-dim">{t}</span>
                      </>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-base font-normal text-gold-light mb-2 tracking-[0.05em]">Adresse</h3>
                  <p className="font-sans text-[0.85rem] text-ivory-dim leading-loose">Hafenstraße 9<br/>40213 Düsseldorf</p>
                </div>
                <div>
                  <h3 className="font-serif text-base font-normal text-gold-light mb-2 tracking-[0.05em]">Kontakt</h3>
                  <p className="font-sans text-[0.85rem] leading-loose">
                    <a href="tel:+4921195588600" className="text-gold no-underline hover:underline">+49 211 955 886 00</a><br/>
                    <a href="mailto:duesseldorf@heimwerk-restaurant.de" className="text-gold no-underline hover:underline">duesseldorf@heimwerk-restaurant.de</a>
                  </p>
                </div>
              </div>
            </div>
            <ReservationForm />
          </div>
        </div>
      </section>

      {/* ═══ STANDORT ═══ */}
      <section id="standort" className="py-28 bg-hblack">
        <div className="max-w-6xl mx-auto px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <iframe
                title="HeimWerk Düsseldorf Altstadt"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2497.6!2d6.7708!3d51.2219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDEzJzE4LjkiTiA2wrA0NicxNS4xIkU!5e0!3m2!1sde!2sde!4v1700000000000"
                className="w-full h-[400px] border-0 grayscale invert contrast-90 brightness-[0.65] sepia-20"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 border border-gold/20 pointer-events-none" />
            </div>
            <div className="flex flex-col gap-10">
              <div>
                <p className="section-tag">Wo wir sind</p>
                <h2 className="section-title mt-3">Düsseldorf <em>Altstadt</em></h2>
              </div>
              {[
                { title:'Adresse', content:'Hafenstraße 9\n40213 Düsseldorf\n\nU-Bahn: Heinrich-Heine-Allee (361 m)\nParkhaus IDR Carlsplatz (95 m)' },
                { title:'Öffnungszeiten', content:'Mo – Fr: 11:30 – 22:00 Uhr\nSa: 11:00 – 22:30 Uhr\nSo: 11:00 – 21:00 Uhr' },
                { title:'Ausstattung', content:'Terrasse · Rollstuhlzugang · WLAN\nKreditkarten akzeptiert · Außenbereich' },
              ].map(b => (
                <div key={b.title}>
                  <h4 className="font-serif text-base font-normal text-gold-light mb-1.5 tracking-[0.05em]">{b.title}</h4>
                  <p className="font-sans text-[0.85rem] text-ivory-dim leading-loose whitespace-pre-line">{b.content}</p>
                </div>
              ))}
              <a href="https://maps.google.com/?q=Hafenstraße+9+Düsseldorf" target="_blank" rel="noopener" className="btn-ghost inline-block w-fit">
                Route planen
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
