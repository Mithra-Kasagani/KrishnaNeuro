"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, LoaderCircle, LockKeyhole, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, Select } from "@/components/ui/form-controls";
import { appointmentSchema, todayInIndia, type AppointmentInput } from "@/lib/appointment-schema";
import { siteConfig } from "@/lib/site";

type ApiResult = { ok: boolean; reference: string; delivery: "webhook" | "whatsapp"; message: string };
const TODAY = todayInIndia();

export function AppointmentForm() {
  const [result, setResult] = useState<ApiResult | null>(null);
  const [serverError, setServerError] = useState("");
  const router = useRouter();
  const { register, handleSubmit, getValues, formState: { errors, isSubmitting } } = useForm<AppointmentInput>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: { visitType: "In-person", preferredTime: "Any available time", contactMethod: "WhatsApp" },
  });

  const onSubmit = async (data: AppointmentInput) => {
    setServerError("");
    try {
      const response = await fetch("/api/appointment", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
      const payload = await response.json();
      if (!response.ok || !payload.ok) throw new Error(payload.message || "Could not prepare the request.");
      window.dispatchEvent(new CustomEvent("knpc-safe-event", { detail: { name: "appointment_form_submitted" } }));
      if (payload.delivery === "webhook") router.push(`/appointment/success?reference=${encodeURIComponent(payload.reference)}`);
      else setResult(payload);
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Something went wrong. Please call the clinic.");
    }
  };

  if (result) {
    const values = getValues();
    const message = [
      "Hello Krishna Neuro Psychiatric Centre. I would like to request an appointment.",
      `Reference: ${result.reference}`,
      `Name: ${values.fullName}`,
      `Phone: ${values.phone}`,
      `Consultation preference: ${values.visitType}`,
      `Preferred: ${values.preferredDate}, ${values.preferredTime}`,
      `Reply by: ${values.contactMethod}`,
      "I understand this is a request and is confirmed only after the clinic replies.",
    ].join("\n");
    const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
    return <div className="rounded-[2rem] bg-card p-7 text-center shadow-soft md:p-10" aria-live="polite"><CheckCircle2 className="mx-auto size-12 text-secondary"/><p className="mt-5 text-xs font-extrabold uppercase tracking-wider text-secondary">Request prepared · {result.reference}</p><h2 className="mt-3 text-3xl font-extrabold">Send the request to the clinic</h2><p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-muted-foreground">Review the prepared message, then press <strong className="text-foreground">Send</strong> in WhatsApp to {siteConfig.whatsappDisplay}. No symptoms or diagnosis were collected.</p><Button asChild variant="secondary" size="lg" className="mt-7"><a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => window.setTimeout(() => router.push(`/appointment/success?reference=${encodeURIComponent(result.reference)}`),350)}><MessageCircle/>Send to {siteConfig.whatsappDisplay}</a></Button><p className="mt-6 text-xs text-muted-foreground">For voice calls use <a href={`tel:${siteConfig.phones[0]}`} className="font-bold text-primary">{siteConfig.displayPhones[0]}</a>. This is not an emergency service.</p></div>;
  }

  return <form onSubmit={handleSubmit(onSubmit)} data-analytics-form="appointment" className="rounded-[2rem] bg-card p-6 shadow-soft md:p-9" noValidate><div className="flex gap-4"><span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/8 text-primary"><LockKeyhole className="size-5"/></span><div><h2 className="text-2xl font-extrabold">Request an appointment</h2><p className="mt-1 text-sm leading-6 text-muted-foreground">Only essential scheduling details are collected. Do not enter symptoms, diagnoses or medical records.</p></div></div><div className="mt-8 grid gap-5 sm:grid-cols-2"><div className="sm:col-span-2"><Label htmlFor="fullName">Name</Label><Input id="fullName" autoComplete="name" placeholder="Full name" {...register("fullName")}/><FieldError>{errors.fullName?.message}</FieldError></div><div><Label htmlFor="phone">Phone</Label><Input id="phone" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile number" {...register("phone")}/><FieldError>{errors.phone?.message}</FieldError></div><div><Label htmlFor="visitType">Consultation preference</Label><Select id="visitType" {...register("visitType")}><option value="In-person">In-person</option><option value="Ask about teleconsultation">Ask about teleconsultation</option><option value="Either / advise me">Either / advise me</option></Select></div><div><Label htmlFor="preferredDate">Preferred date</Label><Input id="preferredDate" type="date" min={TODAY} {...register("preferredDate")}/><FieldError>{errors.preferredDate?.message}</FieldError></div><div><Label htmlFor="preferredTime">Preferred time</Label><Select id="preferredTime" {...register("preferredTime")}><option>9 AM–12 PM</option><option>12–4 PM</option><option>4–7 PM</option><option>7–9 PM</option><option>Any available time</option></Select></div><div><Label htmlFor="contactMethod">Preferred reply</Label><Select id="contactMethod" {...register("contactMethod")}><option>WhatsApp</option><option>Phone call</option></Select></div></div><div className="mt-6 grid gap-3"><label className="flex gap-3 rounded-xl bg-muted/55 p-4 text-sm leading-6"><input type="checkbox" className="mt-1 size-4 accent-[#0F4C81]" {...register("consent")}/><span>I consent to use of these details only to respond to this appointment request and have read the <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-bold text-primary underline">privacy policy</a>.</span></label><FieldError>{errors.consent?.message}</FieldError><label className="flex gap-3 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-950 dark:bg-amber-950/25 dark:text-amber-100"><input type="checkbox" className="mt-1 size-4 accent-[#0F4C81]" {...register("notEmergency")}/><span>I confirm this is not an emergency. For immediate danger, I will call 112 or go to an emergency department.</span></label><FieldError>{errors.notEmergency?.message}</FieldError></div>{serverError&&<p role="alert" className="mt-5 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">{serverError}</p>}<Button type="submit" size="lg" className="mt-7 w-full" disabled={isSubmitting}>{isSubmitting?<><LoaderCircle className="animate-spin"/>Preparing…</>:<>Prepare appointment request</>}</Button><div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="size-4 text-secondary"/>No symptom or diagnosis field · WhatsApp: {siteConfig.whatsappDisplay}</div><a href={`tel:${siteConfig.phones[0]}`} className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-primary"><Phone className="size-4"/>Call the clinic: {siteConfig.displayPhones[0]}</a></form>;
}
