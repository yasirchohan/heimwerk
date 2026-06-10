export interface MenuItem {
  id: string
  name: string
  beschreibung?: string | null
  preis: number
  preisSnack?: number | null
  vegan: boolean
  vegetarisch: boolean
  highlight: boolean
  aktiv: boolean
  bildUrl?: string | null
  kategorieId: string
}

export interface MenuKategorie {
  id: string
  name: string
  slug: string
  reihenfolge: number
  aktiv: boolean
  gerichte?: MenuItem[]
}

export interface ReservationFormData {
  vorname: string
  nachname: string
  email: string
  telefon: string
  datum: string
  uhrzeit: string
  personen: string
  anmerkung?: string
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
