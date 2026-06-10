import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  if (!body.vorname || !body.datum || !body.uhrzeit || !body.personen) {
    return NextResponse.json(
      { success: false, error: 'Bitte alle Pflichtfelder ausfüllen.' },
      { status: 400 }
    )
  }
  return NextResponse.json({
    success: true,
    message: 'Reservierung erfolgreich eingegangen!',
  })
}

export async function GET() {
  return NextResponse.json({ success: true, data: [] })
}