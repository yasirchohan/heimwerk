import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { sendReservationConfirmation, sendReservationNotification } from '@/lib/email'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'

const reservationSchema = z.object({
  vorname: z.string().min(2, 'Vorname muss mindestens 2 Zeichen haben'),
  nachname: z.string().min(2, 'Nachname muss mindestens 2 Zeichen haben'),
  email: z.string().email('Bitte gültige E-Mail-Adresse eingeben'),
  telefon: z.string().min(6, 'Bitte gültige Telefonnummer eingeben'),
  datum: z.string().min(1, 'Datum ist erforderlich'),
  uhrzeit: z.string().min(1, 'Uhrzeit ist erforderlich'),
  personen: z.string().min(1, 'Personenanzahl ist erforderlich'),
  anmerkung: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validated = reservationSchema.parse(body)

    const datumObj = new Date(validated.datum)

    // Save to database
    const reservation = await prisma.reservation.create({
      data: {
        vorname: validated.vorname,
        nachname: validated.nachname,
        email: validated.email,
        telefon: validated.telefon,
        datum: datumObj,
        uhrzeit: validated.uhrzeit,
        personen: parseInt(validated.personen),
        anmerkung: validated.anmerkung || null,
      },
    })

    const formattedDate = format(datumObj, 'dd. MMMM yyyy', { locale: de })

    // Send emails (non-blocking)
    await Promise.allSettled([
      sendReservationConfirmation({
        ...validated,
        datum: formattedDate,
        personen: parseInt(validated.personen),
      }),
      sendReservationNotification({
        ...validated,
        datum: formattedDate,
        personen: parseInt(validated.personen),
      }),
    ])

    return NextResponse.json({
      success: true,
      message: 'Reservierung erfolgreich eingegangen!',
      data: { id: reservation.id },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      )
    }
    console.error('Reservation error:', error)
    return NextResponse.json(
      { success: false, error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const datum = searchParams.get('datum')

  try {
    const reservations = await prisma.reservation.findMany({
      where: datum ? { datum: new Date(datum) } : undefined,
      orderBy: { datum: 'asc' },
      select: {
        id: true,
        vorname: true,
        nachname: true,
        datum: true,
        uhrzeit: true,
        personen: true,
        status: true,
      },
    })

    return NextResponse.json({ success: true, data: reservations })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 })
  }
}
