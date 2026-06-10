'use client'
import { useState } from 'react'
import type { ReservationFormData, ApiResponse } from '@/types'

const ZEITEN = ['11:30','12:00','12:30','13:00','13:30','14:00','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00']

export default function ReservationForm() {
  const [form, setForm] = useState<ReservationFormData>({
    vorname: '', nachname: '', email: '', telefon: '',
    datum: '', uhrzeit: '', personen: '', anmerkung: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data: ApiResponse = await res.json()

      if (data.success) {
        setStatus('success')
        setMessage(data.message || 'Reservierung eingegangen!')
        setForm({ vorname:'',nachname:'',email:'',telefon:'',datum:'',uhrzeit:'',personen:'',anmerkung:'' })
      } else {
        setStatus('error')
        setMessage(data.error || 'Ein Fehler ist aufgetreten.')
      }
    } catch {
      setStatus('error')
      setMessage('Verbindungsfehler. Bitte versuchen Sie es erneut.')
    }
  }

  return (
    <div className="bg-hblack/50 border border-gold/15 p-12 backdrop-blur-xl">
      <h3 className="font-serif text-3xl font-light text-ivory mb-1">Tischreservierung</h3>
      <p className="font-sans text-[0.78rem] text-text-muted mb-10 tracking-[0.05em]">HeimWerk Düsseldorf Altstadt · Hafenstraße 9</p>

      {status === 'success' ? (
        <div className="text-center py-12">
          <div className="text-gold font-serif text-5xl mb-4">✓</div>
          <h4 className="font-serif text-2xl font-light text-ivory mb-3">Vielen Dank!</h4>
          <p className="font-sans text-sm text-ivory-dim leading-loose">{message}<br/>Sie erhalten in Kürze eine Bestätigungsmail.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="form-label" htmlFor="vorname">Vorname *</label>
              <input id="vorname" name="vorname" type="text" required value={form.vorname} onChange={handleChange} placeholder="Max" className="form-input" autoComplete="given-name"/>
            </div>
            <div>
              <label className="form-label" htmlFor="nachname">Nachname *</label>
              <input id="nachname" name="nachname" type="text" required value={form.nachname} onChange={handleChange} placeholder="Mustermann" className="form-input" autoComplete="family-name"/>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="form-label" htmlFor="email">E-Mail *</label>
              <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="max@beispiel.de" className="form-input" autoComplete="email"/>
            </div>
            <div>
              <label className="form-label" htmlFor="telefon">Telefon *</label>
              <input id="telefon" name="telefon" type="tel" required value={form.telefon} onChange={handleChange} placeholder="+49 211 …" className="form-input" autoComplete="tel"/>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="form-label" htmlFor="datum">Datum *</label>
              <input id="datum" name="datum" type="date" required value={form.datum} onChange={handleChange} className="form-input" min={new Date().toISOString().split('T')[0]}/>
            </div>
            <div>
              <label className="form-label" htmlFor="uhrzeit">Uhrzeit *</label>
              <select id="uhrzeit" name="uhrzeit" required value={form.uhrzeit} onChange={handleChange} className="form-input appearance-none">
                <option value="">Bitte wählen</option>
                {ZEITEN.map(z => <option key={z} value={z}>{z} Uhr</option>)}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label" htmlFor="personen">Anzahl Personen *</label>
            <select id="personen" name="personen" required value={form.personen} onChange={handleChange} className="form-input appearance-none">
              <option value="">Bitte wählen</option>
              {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} {n===1?'Person':'Personen'}</option>)}
              <option value="11">Mehr als 10 Personen</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="form-label" htmlFor="anmerkung">Anmerkungen (optional)</label>
            <textarea id="anmerkung" name="anmerkung" value={form.anmerkung} onChange={handleChange} rows={3} placeholder="Allergien, besondere Anlässe, Hochstuhl …" className="form-input resize-y"/>
          </div>

          {status === 'error' && (
            <p className="font-sans text-[0.78rem] text-red-400 mb-4">{message}</p>
          )}

          <p className="font-sans text-[0.72rem] text-text-dim leading-relaxed mb-6">
            Mit dem Absenden stimmen Sie unserer{' '}
            <a href="https://www.heimwerk-restaurant.de/datenschutz" target="_blank" className="text-gold-muted hover:text-gold transition-colors no-underline">Datenschutzerklärung</a> zu.
            Für Gruppen ab 10 Personen bitten wir um telefonische Voranmeldung.
          </p>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-gold text-hblack font-sans text-[0.65rem] font-medium tracking-[0.25em] uppercase py-4 border-0 cursor-pointer transition-all duration-300 hover:bg-gold-light disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Wird gesendet …' : 'Anfrage absenden'}
          </button>
        </form>
      )}
    </div>
  )
}
