import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ReservationEmailData {
  vorname: string
  nachname: string
  email: string
  telefon: string
  datum: string
  uhrzeit: string
  personen: number
  anmerkung?: string
}

export async function sendReservationConfirmation(data: ReservationEmailData) {
  const { error } = await resend.emails.send({
    from: process.env.FROM_EMAIL || 'reservierung@heimwerk-duesseldorf.de',
    to: data.email,
    subject: `Reservierungsbestätigung – HeimWerk Düsseldorf Altstadt`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #050402; color: #F5F0E8; padding: 40px;">
        <h1 style="color: #C9A84C; font-size: 28px; margin-bottom: 8px;">HeimWerk Düsseldorf</h1>
        <p style="color: #7A7162; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 32px;">Altstadt · Hafenstraße 9</p>
        <h2 style="font-size: 22px; font-weight: 300; margin-bottom: 24px;">Ihre Reservierung ist eingegangen</h2>
        <p style="color: #D4CCBC; margin-bottom: 32px;">Liebe/r ${data.vorname} ${data.nachname}, wir haben Ihre Tischanfrage erhalten und bestätigen diese in Kürze telefonisch oder per E-Mail.</p>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
          <tr style="border-bottom: 1px solid #1A1108;">
            <td style="padding: 12px 0; color: #7A7162; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Datum</td>
            <td style="padding: 12px 0; color: #F5F0E8;">${data.datum}</td>
          </tr>
          <tr style="border-bottom: 1px solid #1A1108;">
            <td style="padding: 12px 0; color: #7A7162; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Uhrzeit</td>
            <td style="padding: 12px 0; color: #F5F0E8;">${data.uhrzeit} Uhr</td>
          </tr>
          <tr style="border-bottom: 1px solid #1A1108;">
            <td style="padding: 12px 0; color: #7A7162; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Personen</td>
            <td style="padding: 12px 0; color: #F5F0E8;">${data.personen}</td>
          </tr>
          ${data.anmerkung ? `<tr><td style="padding: 12px 0; color: #7A7162; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Anmerkung</td><td style="padding: 12px 0; color: #F5F0E8;">${data.anmerkung}</td></tr>` : ''}
        </table>
        <p style="color: #7A7162; font-size: 13px; line-height: 1.8;">Bei Fragen erreichen Sie uns unter <a href="tel:+4921195588600" style="color: #C9A84C;">+49 211 955 886 00</a></p>
        <hr style="border: none; border-top: 1px solid #1A1108; margin: 32px 0;" />
        <p style="color: #4A4438; font-size: 11px;">HeimWerk Restaurant · Hafenstraße 9 · 40213 Düsseldorf</p>
      </div>
    `,
  })
  return { error }
}

export async function sendReservationNotification(data: ReservationEmailData) {
  const { error } = await resend.emails.send({
    from: process.env.FROM_EMAIL || 'reservierung@heimwerk-duesseldorf.de',
    to: process.env.TO_EMAIL || 'duesseldorf@heimwerk-restaurant.de',
    subject: `Neue Reservierung: ${data.vorname} ${data.nachname} – ${data.datum} ${data.uhrzeit}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2>Neue Tischreservierung</h2>
        <p><strong>Name:</strong> ${data.vorname} ${data.nachname}</p>
        <p><strong>E-Mail:</strong> ${data.email}</p>
        <p><strong>Telefon:</strong> ${data.telefon}</p>
        <p><strong>Datum:</strong> ${data.datum}</p>
        <p><strong>Uhrzeit:</strong> ${data.uhrzeit}</p>
        <p><strong>Personen:</strong> ${data.personen}</p>
        ${data.anmerkung ? `<p><strong>Anmerkung:</strong> ${data.anmerkung}</p>` : ''}
      </div>
    `,
  })
  return { error }
}
