'use client'
// components/sections/Reservation.tsx

import { useState } from 'react'

type FormData = {
  firstName: string
  lastName:  string
  email:     string
  phone:     string
  date:      string
  time:      string
  guests:    string
  notes:     string
}

const TIMES = ['11:30','12:00','12:30','13:00','13:30','14:00','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00']

export default function Reservation() {
  const [form, setForm]     = useState<FormData>({ firstName:'',lastName:'',email:'',phone:'',date:'',time:'',guests:'',notes:'' })
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [errMsg, setErrMsg] = useState('')

  const update = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  async function handleSubmit() {
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.date || !form.time || !form.guests) {
      setErrMsg('Bitte füllen Sie alle Pflichtfelder aus.')
      return
    }
    setStatus('loading')
    setErrMsg('')
    try {
      const res = await fetch('/api/reservations', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...form, guests: parseInt(form.guests) }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Fehler beim Senden')
      setStatus('success')
    } catch (err: unknown) {
      setStatus('error')
      setErrMsg(err instanceof Error ? err.message : 'Unbekannter Fehler')
    }
  }

  const inputClass = "w-full bg-white/[0.03] border border-gold/20 text-ivory font-sans text-sm font-light px-4 py-3 outline-none focus:border-gold transition-colors duration-300 placeholder:text-text-dim"
  const labelClass = "block font-sans text-[0.6rem] tracking-[0.2em] uppercase text-text-muted mb-1.5"

  return (
    <section className="relative bg-wood py-28 overflow-hidden" id="reservierung">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M0 60 L60 0' stroke='rgba(201,168,76,0.06)' stroke-width='1'/%3E%3C/svg%3E\")" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">

          {/* Info side */}
          <div>
            <p className="flex items-center gap-4 font-sans text-[0.62rem] font-normal tracking-[0.32em] uppercase text-gold mb-5">
              <span className="block w-8 h-px bg-gold" />Reservierung
            </p>
            <h2 className="font-serif text-5xl font-light leading-tight text-ivory mb-6">
              Ihren <em className="italic text-gold-light">Tisch</em><br/>reservieren
            </h2>
            <p className="font-sans text-sm font-light text-ivory-dim leading-loose max-w-sm mb-8">
              Für Gruppen, besondere Anlässe oder einfach einen entspannten Abend in der Altstadt.
            </p>

            <h3 className="font-serif text-base font-normal text-gold-light mt-8 mb-2 tracking-wide">Öffnungszeiten</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {[['Mo – Fr','11:30 – 22:00'],['Samstag','11:00 – 22:30'],['Sonntag','11:00 – 21:00']].map(([d,t]) => (
                <>
                  <span key={d} className="font-sans text-xs text-text-muted">{d}</span>
                  <span key={t} className="font-sans text-xs text-ivory-dim">{t}</span>
                </>
              ))}
            </div>

            <h3 className="font-serif text-base font-normal text-gold-light mt-8 mb-2 tracking-wide">Adresse</h3>
            <p className="font-sans text-sm text-ivory-dim leading-relaxed">Hafenstraße 9<br/>40213 Düsseldorf</p>

            <h3 className="font-serif text-base font-normal text-gold-light mt-8 mb-2 tracking-wide">Kontakt</h3>
            <p className="font-sans text-sm leading-relaxed">
              <a href="tel:+4921195588600" className="text-gold hover:underline">+49 211 955 886 00</a><br/>
              <a href="mailto:duesseldorf@heimwerk-restaurant.de" className="text-ivory-dim hover:text-gold transition-colors">duesseldorf@heimwerk-restaurant.de</a>
            </p>
          </div>

          {/* Form side */}
          <div className="bg-black/50 border border-gold/15 p-10 backdrop-blur-md">
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="text-gold text-5xl mb-4 font-serif">✓</div>
                <h3 className="font-serif text-2xl font-light text-ivory mb-3">Reservierung bestätigt!</h3>
                <p className="font-sans text-sm text-ivory-dim leading-relaxed">
                  Wir haben Ihnen eine Bestätigung per E-Mail gesendet.<br/>
                  Wir freuen uns auf Ihren Besuch!
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-2xl font-light text-ivory mb-1">Tischreservierung</h3>
                <p className="font-sans text-xs text-text-muted mb-8 tracking-wide">HeimWerk Düsseldorf Altstadt · Hafenstraße 9</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div><label className={labelClass}>Vorname *</label><input className={inputClass} value={form.firstName} onChange={update('firstName')} placeholder="Max" autoComplete="given-name"/></div>
                  <div><label className={labelClass}>Nachname *</label><input className={inputClass} value={form.lastName} onChange={update('lastName')} placeholder="Mustermann" autoComplete="family-name"/></div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div><label className={labelClass}>E-Mail *</label><input type="email" className={inputClass} value={form.email} onChange={update('email')} placeholder="max@beispiel.de" autoComplete="email"/></div>
                  <div><label className={labelClass}>Telefon *</label><input type="tel" className={inputClass} value={form.phone} onChange={update('phone')} placeholder="+49 211 …" autoComplete="tel"/></div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div><label className={labelClass}>Datum *</label><input type="date" className={inputClass} value={form.date} onChange={update('date')} min={new Date().toISOString().split('T')[0]}/></div>
                  <div>
                    <label className={labelClass}>Uhrzeit *</label>
                    <select className={inputClass} value={form.time} onChange={update('time')} style={{backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M0 0 L6 8 L12 0' fill='none' stroke='%23C9A84C' stroke-width='1'/%3E%3C/svg%3E\")",backgroundRepeat:'no-repeat',backgroundPosition:'right 1rem center',paddingRight:'2.5rem',appearance:'none'}}>
                      <option value="">Bitte wählen</option>
                      {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className={labelClass}>Personen *</label>
                  <select className={inputClass} value={form.guests} onChange={update('guests')} style={{backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M0 0 L6 8 L12 0' fill='none' stroke='%23C9A84C' stroke-width='1'/%3E%3C/svg%3E\")",backgroundRepeat:'no-repeat',backgroundPosition:'right 1rem center',paddingRight:'2.5rem',appearance:'none'}}>
                    <option value="">Bitte wählen</option>
                    {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} {n===1?'Person':'Personen'}</option>)}
                    <option value="15">11–15 Personen</option>
                    <option value="20">Mehr als 15 Personen</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className={labelClass}>Anmerkungen</label>
                  <textarea className={`${inputClass} resize-y min-h-[80px]`} value={form.notes} onChange={update('notes')} placeholder="Allergien, besondere Anlässe, Hochstuhl …"/>
                </div>

                {errMsg && <p className="text-red-400 font-sans text-xs mb-4">{errMsg}</p>}

                <p className="font-sans text-xs text-text-dim leading-relaxed mb-5">
                  Mit dem Absenden stimmen Sie unserer <a href="https://www.heimwerk-restaurant.de/datenschutz" target="_blank" className="text-gold-muted hover:text-gold">Datenschutzerklärung</a> zu.
                </p>

                <button
                  onClick={handleSubmit}
                  disabled={status === 'loading'}
                  className="w-full bg-gold text-black font-sans text-xs font-medium tracking-[0.25em] uppercase py-4 border-none cursor-pointer hover:bg-gold-light transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Wird gesendet …' : 'Anfrage absenden'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
