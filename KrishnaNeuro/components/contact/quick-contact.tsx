"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/form-controls";
import { siteConfig } from "@/lib/site";

export function QuickContact() {
  const [name, setName] = useState("");
  const [reason, setReason] = useState("Appointment availability");
  const message = `Hello Krishna Neuro Psychiatric Centre. My name is ${name || "—"}. I would like help with: ${reason}. Please tell me the next step.`;
  return (
    <form onSubmit={(event)=>{event.preventDefault(); window.open(`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`,"_blank","noopener,noreferrer");}} className="rounded-[1.8rem] border border-border bg-card p-6 shadow-card md:p-8">
      <h2 className="text-2xl font-extrabold tracking-[-0.035em]">Send a simple WhatsApp enquiry</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">No diagnosis or medical history needed. WhatsApp opens with a message you can review before sending.</p>
      <div className="mt-6 grid gap-5"><div><Label htmlFor="quick-name">Your name</Label><Input id="quick-name" value={name} onChange={(e)=>setName(e.target.value)} required minLength={2} maxLength={80} autoComplete="name" placeholder="Full name"/></div><div><Label htmlFor="quick-reason">How can the clinic help?</Label><Select id="quick-reason" value={reason} onChange={(e)=>setReason(e.target.value)}><option>Appointment availability</option><option>Clinic directions</option><option>Teleconsultation availability</option><option>Follow-up scheduling</option><option>Service information</option></Select></div><Button type="submit" variant="secondary"><MessageCircle/>WhatsApp {siteConfig.whatsappDisplay}<ArrowRight/></Button></div>
      <p className="mt-5 text-xs leading-5 text-muted-foreground">Do not send emergency or highly sensitive information here. WhatsApp is a third-party service with its own privacy terms.</p>
    </form>
  );
}
