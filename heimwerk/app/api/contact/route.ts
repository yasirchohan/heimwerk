import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  betreff: z.string().min(3),
  nachricht: z.string().min(10),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validated = contactSchema.parse(body)

    await prisma.kontakt.create({ data: validated })

    return NextResponse.json({
      success: true,
      message: 'Nachricht erfolgreich gesendet!',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      )
    }
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
