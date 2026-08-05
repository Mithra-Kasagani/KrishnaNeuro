"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, LoaderCircle, LockKeyhole, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/form-controls";
import { appointmentSchema, concernOptions, type AppointmentInput } from "@/lib/appointment-schema";
import { siteConfig } from "@/lib/site";

type Result = { reference: string; delivery: "webhook" | "whatsapp" };
const TODAY = new Date().toISOString().slice(0, 10);

const concernTe: Record<(typeof concernOptions)[number], string> = {
  "Mood or anxiety": "మూడ్ లేదా ఆందోళన",
  "Sleep or stress": "నిద్ర లేదా ఒత్తిడి",
  "Child or adolescent concern": "పిల్లలు లేదా కిశోరుల సమస్య",
  "Alcohol, tobacco or other substance use": "ఆల్కహాల్, పొగాకు లేదా ఇతర పదార్థాలు",
  "Memory or older-adult concern": "జ్ఞాపకం లేదా వృద్ధుల సమస్య",
  "Behaviour, voices or unusual beliefs": "ప్రవర్తన, స్వరాలు లేదా అసాధారణ నమ్మకాలు",
  "Relationship or family guidance": "సంబంధం లేదా కుటుంబ మార్గదర్శకం",
  "Medication or follow-up review": "మందులు లేదా ఫాలో-అప్ సమీక్ష",
  "Prefer to discuss privately": "వ్యక్తిగతంగా చర్చించాలనుకుంటున్నాను",
};

export function TeluguAppointmentForm() {
  const [result, setResult] = useState<Result | null>(null);
  const [serverError, setServerError] = useState("");
  const router = useRouter();
  const { register, handleSubmit, getValues, formState: { errors, isSubmitting } } = useForm<AppointmentInput>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: { appointmentFor: "Self", ageGroup: "18–30", visitType: "In-person", concern: "Prefer to discuss privately", visitStatus: "First consultation", preferredTime: "Any available time", contactMethod: "WhatsApp", accessNote: "" },
  });

  const submit = async (data: AppointmentInput) => {
    setServerError("");
    try {
      const response = await fetch("/api/appointment", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
      const payload = await response.json();
      if (!response.ok || !payload.ok) throw new Error("అభ్యర్థనను సిద్ధం చేయలేకపోయాము. దయచేసి క్లినిక్‌కు కాల్ చేయండి.");
      if (payload.delivery === "webhook") router.push(`/te/appointment/success?reference=${encodeURIComponent(payload.reference)}`);
      else setResult(payload);
    } catch (error) { setServerError(error instanceof Error ? error.message : "దయచేసి మళ్లీ ప్రయత్నించండి."); }
  };

  if (result) {
    const v = getValues();
    const text = ["నమస్కారం Krishna Neuro Psychiatric Centre. నాకు అపాయింట్‌మెంట్ కావాలి.", `రిఫరెన్స్: ${result.reference}`, `పేరు: ${v.fullName}`, `ఫోన్: ${v.phone}`, `అపాయింట్‌మెంట్: ${v.appointmentFor} (${v.ageGroup})`, `సాధారణ సమస్య: ${concernTe[v.concern]}`, `కోరిన తేదీ/సమయం: ${v.preferredDate}, ${v.preferredTime}`, "క్లినిక్ సమాధానం ఇచ్చిన తర్వాతే అపాయింట్‌మెంట్ నిర్ధారితం అని అర్థం చేసుకున్నాను."].join("\n");
    return <div className="rounded-[2rem] border border-secondary/25 bg-card p-8 text-center shadow-soft"><CheckCircle2 className="mx-auto size-12 text-secondary"/><p className="mt-5 text-xs font-extrabold uppercase tracking-wider text-secondary">అభ్యర్థన సిద్ధమైంది · {result.reference}</p><h2 className="mt-3 text-3xl font-extrabold">చివరి దశ: WhatsAppలో పంపండి</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">కింద ఉన్న బటన్‌ను నొక్కి, సిద్ధమైన మెసేజ్‌ను పరిశీలించి WhatsAppలో <strong className="text-foreground">Send</strong> నొక్కండి.</p><Button asChild variant="secondary" size="lg" className="mt-6"><a href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`} target="_blank" rel="noreferrer"><MessageCircle/>WhatsAppకు వెళ్లండి</a></Button><p className="mt-5 text-xs text-muted-foreground">అత్యవసర పరిస్థితికి ఈ ఫారమ్‌ను ఉపయోగించవద్దు. తక్షణ ప్రమాదంలో 112కు కాల్ చేయండి.</p></div>;
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="rounded-[2rem] border border-border bg-card p-6 shadow-soft md:p-9" noValidate>
      <div className="flex items-center gap-3"><span className="flex size-11 items-center justify-center rounded-2xl bg-primary/8 text-primary"><LockKeyhole className="size-5"/></span><div><h2 className="text-2xl font-extrabold">అపాయింట్‌మెంట్ అభ్యర్థన</h2><p className="mt-1 text-sm text-muted-foreground">అవసరమైన బుకింగ్ వివరాలు మాత్రమే ఇవ్వండి.</p></div></div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2"><Label htmlFor="te-name">రోగి పేరు</Label><Input id="te-name" placeholder="పూర్తి పేరు" {...register("fullName")}/>{errors.fullName&&<p className="mt-1 text-xs text-amber-700">దయచేసి సరైన పేరు నమోదు చేయండి.</p>}</div>
        <div><Label htmlFor="te-phone">మొబైల్ నంబర్</Label><Input id="te-phone" inputMode="tel" placeholder="10 అంకెల మొబైల్ నంబర్" {...register("phone")}/>{errors.phone&&<p className="mt-1 text-xs text-amber-700">సరైన మొబైల్ నంబర్ నమోదు చేయండి.</p>}</div>
        <div><Label htmlFor="te-for">ఎవరికి?</Label><Select id="te-for" {...register("appointmentFor")}><option value="Self">నాకు</option><option value="Family member">కుటుంబ సభ్యునికి</option><option value="Child / dependent">పిల్లవాడు / ఆధారిత వ్యక్తి</option></Select></div>
        <div><Label htmlFor="te-age">వయస్సు</Label><Select id="te-age" {...register("ageGroup")}><option>Under 13</option><option>13–17</option><option>18–30</option><option>31–50</option><option>51–64</option><option>65+</option></Select></div>
        <div><Label htmlFor="te-format">సంప్రదింపు విధానం</Label><Select id="te-format" {...register("visitType")}><option value="In-person">క్లినిక్‌లో</option><option value="Ask about teleconsultation">టెలి కన్సల్టేషన్ గురించి అడగండి</option><option value="Either / advise me">ఏది తగినదో సూచించండి</option></Select></div>
        <div className="sm:col-span-2"><Label htmlFor="te-concern">సాధారణ సమస్య</Label><Select id="te-concern" {...register("concern")}>{concernOptions.map(item=><option key={item} value={item}>{concernTe[item]}</option>)}</Select></div>
        <div><Label htmlFor="te-status">విజిట్ రకం</Label><Select id="te-status" {...register("visitStatus")}><option value="First consultation">మొదటి కన్సల్టేషన్</option><option value="Follow-up">ఫాలో-అప్</option><option value="Not sure">తెలియదు</option></Select></div>
        <div><Label htmlFor="te-date">కోరిన తేదీ</Label><Input id="te-date" type="date" min={TODAY} {...register("preferredDate")}/>{errors.preferredDate&&<p className="mt-1 text-xs text-amber-700">తేదీ ఎంచుకోండి.</p>}</div>
        <div><Label htmlFor="te-time">కోరిన సమయం</Label><Select id="te-time" {...register("preferredTime")}><option value="9 AM–12 PM">ఉ. 9–మ. 12</option><option value="12–4 PM">మ. 12–సా. 4</option><option value="4–7 PM">సా. 4–7</option><option value="7–9 PM">రా. 7–9</option><option value="Any available time">అందుబాటులో ఉన్న ఏ సమయమైనా</option></Select></div>
        <div><Label htmlFor="te-reply">సమాధానం ఎలా కావాలి?</Label><Select id="te-reply" {...register("contactMethod")}><option value="WhatsApp">WhatsApp</option><option value="Phone call">ఫోన్ కాల్</option></Select></div>
      </div>
      <div className="mt-6 grid gap-3"><label className="flex gap-3 rounded-xl border border-border p-4 text-sm leading-6"><input type="checkbox" className="mt-1 size-4 accent-[#0F4C81]" {...register("consent")}/><span>ఈ వివరాలను అపాయింట్‌మెంట్‌కు స్పందించేందుకు క్లినిక్ ఉపయోగించడానికి నేను సమ్మతిస్తున్నాను.</span></label>{errors.consent&&<p className="text-xs text-amber-700">సమ్మతి అవసరం.</p>}<label className="flex gap-3 rounded-xl border border-amber-300/50 bg-amber-50 p-4 text-sm leading-6 text-amber-950 dark:bg-amber-950/25 dark:text-amber-100"><input type="checkbox" className="mt-1 size-4 accent-[#0F4C81]" {...register("notEmergency")}/><span>ఇది అత్యవసర పరిస్థితి కాదని ధృవీకరిస్తున్నాను. తక్షణ ప్రమాదంలో 112కు కాల్ చేస్తాను.</span></label>{errors.notEmergency&&<p className="text-xs text-amber-700">ఈ నిర్ధారణ అవసరం.</p>}</div>
      {serverError&&<p role="alert" className="mt-5 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">{serverError}</p>}
      <Button type="submit" size="lg" className="mt-7 w-full" disabled={isSubmitting}>{isSubmitting?<><LoaderCircle className="animate-spin"/>సిద్ధం చేస్తున్నాము…</>:<>అభ్యర్థన సిద్ధం చేయండి</>}</Button>
      <p className="mt-5 text-center text-xs text-muted-foreground">ఫారమ్ ఉపయోగించకూడదనుకుంటే <a href={`tel:${siteConfig.phones[0]}`} className="font-bold text-primary"><Phone className="mr-1 inline size-3.5"/>{siteConfig.displayPhones[0]}</a>కు కాల్ చేయండి.</p>
    </form>
  );
}
