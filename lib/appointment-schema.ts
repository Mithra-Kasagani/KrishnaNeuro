import { z } from "zod";

export const appointmentSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your name").max(80, "Name is too long"),
  phone: z.string().trim().regex(/^(?:\+?91[\s-]?)?[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  visitType: z.enum(["In-person", "Ask about teleconsultation", "Either / advise me"]),
  preferredDate: z.string().min(1, "Choose a preferred date").refine((value) => !Number.isNaN(Date.parse(value)), "Choose a valid date"),
  preferredTime: z.enum(["9 AM–12 PM", "12–4 PM", "4–7 PM", "7–9 PM", "Any available time"]),
  contactMethod: z.enum(["WhatsApp", "Phone call"]),
  consent: z.literal(true, { message: "Consent is required to process this request" }),
  notEmergency: z.literal(true, { message: "Please confirm this is not an emergency" }),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;
