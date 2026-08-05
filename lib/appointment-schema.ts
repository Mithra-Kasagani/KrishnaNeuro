import { z } from "zod";

export const concernOptions = [
  "Mood or anxiety",
  "Sleep or stress",
  "Child or adolescent concern",
  "Alcohol, tobacco or other substance use",
  "Memory or older-adult concern",
  "Behaviour, voices or unusual beliefs",
  "Relationship or family guidance",
  "Medication or follow-up review",
  "Prefer to discuss privately",
] as const;

export const appointmentSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter the patient's name").max(80, "Name is too long"),
  phone: z.string().trim().regex(/^(?:\+?91[\s-]?)?[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  appointmentFor: z.enum(["Self", "Family member", "Child / dependent"]),
  ageGroup: z.enum(["Under 13", "13–17", "18–30", "31–50", "51–64", "65+"]),
  visitType: z.enum(["In-person", "Ask about teleconsultation", "Either / advise me"]),
  concern: z.enum(concernOptions),
  visitStatus: z.enum(["First consultation", "Follow-up", "Not sure"]),
  preferredDate: z.string().min(1, "Choose a preferred date").refine((value) => !Number.isNaN(Date.parse(value)), "Choose a valid date"),
  preferredTime: z.enum(["9 AM–12 PM", "12–4 PM", "4–7 PM", "7–9 PM", "Any available time"]),
  contactMethod: z.enum(["WhatsApp", "Phone call"]),
  accessNote: z.string().trim().max(140, "Keep this note under 140 characters").optional().or(z.literal("")),
  consent: z.literal(true, { message: "Consent is required to process this request" }),
  notEmergency: z.literal(true, { message: "Please confirm this is not an emergency" }),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;
