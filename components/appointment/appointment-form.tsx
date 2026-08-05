"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, LoaderCircle, LockKeyhole, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, Select } from "@/components/ui/form-controls";
import { appointmentSchema, concernOptions, type AppointmentInput } from "@/lib/appointment-schema";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const stepFields: (keyof AppointmentInput)[][] = [
  ["fullName", "phone", "appointmentFor", "ageGroup"],
  ["visitType", "concern", "visitStatus", "preferredDate", "preferredTime", "accessNote"],
  ["contactMethod", "consent", "notEmergency"],
];

const labels = ["Who is visiting", "Visit preferences", "Review & consent"];

type ApiResult = { ok: boolean; reference: string; delivery: "webhook" | "whatsapp"; message: string };

export function AppointmentForm() {
  const [step, setStep] = useState(0);
  const [serverError, setServerError] = useState("");
  const [result, setResult] = useState<ApiResult | null>(null);
  const reduceMotion = useReducedMotion();
  const router = useRouter();
  const today = useMemo(() => {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
    return local.toISOString().slice(0, 10);
  }, []);

  const { register, handleSubmit, trigger, control, formState: { errors, isSubmitting } } = useForm<AppointmentInput>({
    resolver: zodResolver(appointmentSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "", phone: "", appointmentFor: "Self", ageGroup: "18–30", visitType: "In-person", concern: "Prefer to discuss privately", visitStatus: "First consultation", preferredDate: "", preferredTime: "Any available time", contactMethod: "WhatsApp", accessNote: "", consent: undefined, notEmergency: undefined,
    },
  });

  const next = async () => {
    const valid = await trigger(stepFields[step], { shouldFocus: true });
    if (valid) { setServerError(""); setStep((value) => Math.min(2, value + 1)); }
  };

  const onSubmit = async (data: AppointmentInput) => {
    setServerError("");
    try {
      const response = await fetch("/api/appointment", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
      const payload = await response.json();
      if (!response.ok || !payload.ok) throw new Error(payload.message || "Could not prepare the request.");
      if (payload.delivery === "webhook") {
        router.push(`/appointment/success?reference=${encodeURIComponent(payload.reference)}`);
        return;
      }
      setResult(payload);
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Something went wrong. Please call the clinic.");
    }
  };

  const values = useWatch({ control });
  const whatsappMessage = result ? [
    "Hello Krishna Neuro Psychiatric Centre. I would like to request an appointment.",
    `Reference: ${result.reference}`,
    `Name: ${values.fullName}`,
    `Phone: ${values.phone}`,
    `For: ${values.appointmentFor} (${values.ageGroup})`,
    `Visit: ${values.visitStatus}; ${values.visitType}`,
    `General concern: ${values.concern}`,
    `Preferred: ${values.preferredDate}, ${values.preferredTime}`,
    `Reply by: ${values.contactMethod}`,
    values.accessNote ? `Access/language note: ${values.accessNote}` : "",
    "I understand this is a request and the appointment is confirmed only after the clinic replies.",
  ].filter(Boolean).join("\n") : "";
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  if (result) {
    return (
      <div className="rounded-[2rem] border border-secondary/25 bg-card p-7 text-center shadow-soft md:p-10" aria-live="polite">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-secondary/12 text-secondary"><CheckCircle2 className="size-7" aria-hidden="true"/></span>
        <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.13em] text-secondary">Request prepared · {result.reference}</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em]">One final step: send it to the clinic.</h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-muted-foreground">For privacy, this website has not stored or delivered your details. Tap below, review the pre-filled message and press <strong className="text-foreground">Send</strong> in WhatsApp.</p>
        <Button asChild variant="secondary" size="lg" className="mt-7"><a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => window.setTimeout(() => router.push(`/appointment/success?reference=${encodeURIComponent(result.reference)}`), 350)}><MessageCircle aria-hidden="true"/>Continue to WhatsApp</a></Button>
        <div className="mt-5"><Button variant="ghost" size="sm" onClick={() => setResult(null)}>Review request</Button></div>
        <p className="mt-6 border-t border-border pt-5 text-xs leading-5 text-muted-foreground">No WhatsApp? Call <a href={`tel:${siteConfig.phones[0]}`} className="font-bold text-primary underline">{siteConfig.displayPhones[0]}</a>. Do not use this flow for an emergency.</p>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-border bg-card p-5 shadow-soft sm:p-7 md:p-9">
      <div className="mb-8 grid grid-cols-3 gap-2" aria-label={`Step ${step + 1} of 3`}>
        {labels.map((label, index) => <div key={label} className="min-w-0"><div className={cn("h-1.5 rounded-full transition-colors", index <= step ? "bg-primary" : "bg-muted")}/><p className={cn("mt-2 truncate text-[0.65rem] font-extrabold uppercase tracking-wider", index === step ? "text-primary" : "text-muted-foreground")}>{index + 1}. <span className="hidden sm:inline">{label}</span></p></div>)}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={step} initial={reduceMotion ? false : { opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -18 }} transition={{ duration: 0.22 }}>
            {step === 0 && (
              <fieldset><legend className="text-2xl font-extrabold tracking-[-0.035em]">Who is the appointment for?</legend><p className="mt-2 text-sm leading-6 text-muted-foreground">Use a mobile number the clinic can reach. Please avoid sharing detailed clinical history here.</p><div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2"><Label htmlFor="fullName">Patient name</Label><Input id="fullName" autoComplete="name" placeholder="Full name" aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName?"fullName-error":undefined} {...register("fullName")}/><FieldError id="fullName-error">{errors.fullName?.message}</FieldError></div>
                <div><Label htmlFor="phone">Mobile number</Label><Input id="phone" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile number" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone?"phone-error":undefined} {...register("phone")}/><FieldError id="phone-error">{errors.phone?.message}</FieldError></div>
                <div><Label htmlFor="appointmentFor">Appointment for</Label><Select id="appointmentFor" {...register("appointmentFor")}><option>Self</option><option>Family member</option><option>Child / dependent</option></Select><FieldError>{errors.appointmentFor?.message}</FieldError></div>
                <div><Label htmlFor="ageGroup">Age group</Label><Select id="ageGroup" {...register("ageGroup")}><option>Under 13</option><option>13–17</option><option>18–30</option><option>31–50</option><option>51–64</option><option>65+</option></Select><FieldError>{errors.ageGroup?.message}</FieldError></div>
              </div></fieldset>
            )}
            {step === 1 && (
              <fieldset><legend className="text-2xl font-extrabold tracking-[-0.035em]">Visit preferences</legend><p className="mt-2 text-sm leading-6 text-muted-foreground">Preferences help scheduling; the clinic may suggest a different time or in-person visit.</p><div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div><Label htmlFor="visitType">Visit format</Label><Select id="visitType" {...register("visitType")}><option>In-person</option><option>Ask about teleconsultation</option><option>Either / advise me</option></Select><FieldError>{errors.visitType?.message}</FieldError></div>
                <div><Label htmlFor="visitStatus">Visit type</Label><Select id="visitStatus" {...register("visitStatus")}><option>First consultation</option><option>Follow-up</option><option>Not sure</option></Select><FieldError>{errors.visitStatus?.message}</FieldError></div>
                <div className="sm:col-span-2"><Label htmlFor="concern">General concern</Label><Select id="concern" {...register("concern")}>{concernOptions.map((option)=><option key={option}>{option}</option>)}</Select><p className="mt-1.5 text-xs text-muted-foreground">Choose “Prefer to discuss privately” if you do not want to specify.</p><FieldError>{errors.concern?.message}</FieldError></div>
                <div><Label htmlFor="preferredDate">Preferred date</Label><Input id="preferredDate" type="date" min={today} aria-invalid={Boolean(errors.preferredDate)} {...register("preferredDate")}/><FieldError>{errors.preferredDate?.message}</FieldError></div>
                <div><Label htmlFor="preferredTime">Preferred time</Label><Select id="preferredTime" {...register("preferredTime")}><option>9 AM–12 PM</option><option>12–4 PM</option><option>4–7 PM</option><option>7–9 PM</option><option>Any available time</option></Select><FieldError>{errors.preferredTime?.message}</FieldError></div>
                <div className="sm:col-span-2"><Label htmlFor="accessNote">Language or accessibility note <span className="font-normal text-muted-foreground">(optional)</span></Label><Input id="accessNote" maxLength={140} placeholder="Example: please call in Telugu" {...register("accessNote")}/><FieldError>{errors.accessNote?.message}</FieldError></div>
              </div></fieldset>
            )}
            {step === 2 && (
              <fieldset><legend className="text-2xl font-extrabold tracking-[-0.035em]">Review and consent</legend><p className="mt-2 text-sm leading-6 text-muted-foreground">A preferred slot is a request, not a confirmed appointment.</p>
                <dl className="mt-7 grid gap-3 rounded-2xl bg-muted/55 p-5 text-sm"><div className="flex justify-between gap-4"><dt className="text-muted-foreground">Patient</dt><dd className="text-right font-bold">{values.fullName} · {values.ageGroup}</dd></div><div className="flex justify-between gap-4"><dt className="text-muted-foreground">Visit</dt><dd className="text-right font-bold">{values.visitStatus} · {values.visitType}</dd></div><div className="flex justify-between gap-4"><dt className="text-muted-foreground">Preferred</dt><dd className="text-right font-bold">{values.preferredDate || "Not chosen"} · {values.preferredTime}</dd></div><div className="flex justify-between gap-4"><dt className="text-muted-foreground">Concern</dt><dd className="text-right font-bold">{values.concern}</dd></div></dl>
                <div className="mt-6"><Label htmlFor="contactMethod">Preferred reply method</Label><Select id="contactMethod" {...register("contactMethod")}><option>WhatsApp</option><option>Phone call</option></Select></div>
                <div className="mt-6 grid gap-4">
                  <label className="flex cursor-pointer gap-3 rounded-2xl border border-border p-4 text-sm leading-6"><input type="checkbox" className="mt-1 size-4 accent-[#0F4C81]" {...register("consent")}/><span>I consent to the clinic using these details to respond to my appointment request and have read the <Link href="/privacy-policy" target="_blank" className="font-bold text-primary underline">privacy policy</Link>.</span></label><FieldError>{errors.consent?.message}</FieldError>
                  <label className="flex cursor-pointer gap-3 rounded-2xl border border-amber-300/45 bg-amber-50 p-4 text-sm leading-6 text-amber-950 dark:border-amber-400/25 dark:bg-amber-950/25 dark:text-amber-100"><input type="checkbox" className="mt-1 size-4 accent-[#0F4C81]" {...register("notEmergency")}/><span>I confirm this is not an emergency. For immediate danger, I will call 112 or go to an emergency department.</span></label><FieldError>{errors.notEmergency?.message}</FieldError>
                </div>
              </fieldset>
            )}
          </motion.div>
        </AnimatePresence>

        {serverError && <p role="alert" className="mt-6 rounded-xl border border-amber-300/50 bg-amber-50 p-4 text-sm font-semibold text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">{serverError}</p>}
        <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-6">
          {step > 0 ? <Button type="button" variant="ghost" onClick={() => setStep((value) => value - 1)} disabled={isSubmitting}><ArrowLeft/>Back</Button> : <span/>}
          {step < 2 ? <Button type="button" onClick={next}>Continue<ArrowRight/></Button> : <Button type="submit" disabled={isSubmitting}>{isSubmitting ? <><LoaderCircle className="animate-spin"/>Preparing…</> : <><LockKeyhole/>Prepare request</>}</Button>}
        </div>
      </form>
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.68rem] font-semibold text-muted-foreground"><span className="inline-flex items-center gap-1.5"><ShieldCheck className="size-3.5 text-secondary"/>No advertising use</span><span className="inline-flex items-center gap-1.5"><Check className="size-3.5 text-secondary"/>Minimal information only</span><a href={`tel:${siteConfig.phones[0]}`} className="inline-flex items-center gap-1.5 hover:text-primary"><Phone className="size-3.5"/>Call instead</a></div>
    </div>
  );
}
