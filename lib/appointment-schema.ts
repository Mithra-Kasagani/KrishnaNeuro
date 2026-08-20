import { z } from "zod";

export function todayInIndia(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

function isValidDateOnly(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

export const appointmentSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your name").max(80, "Name is too long"),
  phone: z.string().trim().regex(/^(?:\+?91[\s-]?)?[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  visitType: z.enum(["In-person", "Ask about teleconsultation", "Either / advise me"]),
  preferredDate: z.string().refine(isValidDateOnly, "Choose a valid date").refine((value) => value >= todayInIndia(), "Choose today or a future date"),
  preferredTime: z.enum(["9 AM–12 PM", "12–4 PM", "4–7 PM", "7–9 PM", "Any available time"]),
  contactMethod: z.enum(["WhatsApp", "Phone call"]),
  consent: z.literal(true, { message: "Consent is required to process this request" }),
  notEmergency: z.literal(true, { message: "Please confirm this is not an emergency" }),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;
