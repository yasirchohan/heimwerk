// lib/validations.ts
import { z } from 'zod'

export const reservationSchema = z.object({
  firstName: z.string().min(2, 'Vorname muss mindestens 2 Zeichen haben'),
  lastName:  z.string().min(2, 'Nachname muss mindestens 2 Zeichen haben'),
  email:     z.string().email('Ungültige E-Mail-Adresse'),
  phone:     z.string().min(6, 'Ungültige Telefonnummer'),
  date:      z.string().min(1, 'Datum ist erforderlich'),
  time:      z.string().min(1, 'Uhrzeit ist erforderlich'),
  guests:    z.number().min(1).max(50),
  notes:     z.string().optional(),
})

export const contactSchema = z.object({
  name:    z.string().min(2),
  email:   z.string().email(),
  message: z.string().min(10),
})

export type ReservationInput = z.infer<typeof reservationSchema>
export type ContactInput     = z.infer<typeof contactSchema>
