import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const kategorien = await prisma.menuKategorie.findMany({
      where: { aktiv: true },
      orderBy: { reihenfolge: 'asc' },
      include: {
        gerichte: {
          where: { aktiv: true },
          orderBy: { preis: 'asc' },
        },
      },
    })

    return NextResponse.json(
      { success: true, data: kategorien },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    )
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 })
  }
}
