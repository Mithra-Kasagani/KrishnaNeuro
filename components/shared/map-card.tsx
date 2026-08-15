import { Clock3, ExternalLink, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig, whatsappHref } from "@/lib/site";

export function MapCard() {
  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-border bg-card shadow-card lg:grid-cols-[.9fr_1.1fr]">
      <div className="p-6 md:p-9">
        <p className="eyebrow">Clinic location</p>
        <h3 className="mt-4 text-3xl font-extrabold tracking-[-0.04em] text-foreground">Central Vijayawada, near Nakkala Road</h3>
        <div className="mt-6 grid gap-5 text-sm leading-6 text-muted-foreground">
          <div className="flex gap-3"><MapPin className="mt-0.5 size-5 shrink-0 text-secondary" aria-hidden="true"/><span>{siteConfig.address.line1}<br/>{siteConfig.address.line2}<br/>{siteConfig.address.locality}, {siteConfig.address.city} – {siteConfig.address.postalCode}</span></div>
          <div className="flex gap-3"><Clock3 className="mt-0.5 size-5 shrink-0 text-secondary" aria-hidden="true"/><span>{siteConfig.hours.summary}<br/>{siteConfig.hours.closed} · Please call to confirm</span></div>
          <div className="flex gap-3"><Phone className="mt-0.5 size-5 shrink-0 text-secondary" aria-hidden="true"/><span><strong className="text-foreground">Calls:</strong> {siteConfig.displayPhones[0]}</span></div>
          <div className="flex gap-3"><MessageCircle className="mt-0.5 size-5 shrink-0 text-secondary" aria-hidden="true"/><a href={whatsappHref()} target="_blank" rel="noreferrer"><strong className="text-foreground">WhatsApp:</strong> {siteConfig.whatsappDisplay}</a></div>
        </div>
        <Button asChild variant="outline" className="mt-7"><a href={siteConfig.googleMapsUrl} target="_blank" rel="noreferrer">Open directions <ExternalLink aria-hidden="true"/></a></Button>
      </div>
      <div className="relative min-h-80 border-t border-border bg-muted lg:min-h-full lg:border-l lg:border-t-0">
        <iframe src={siteConfig.googleMapsEmbed} className="absolute inset-0 h-full w-full border-0 grayscale-[10%]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Map showing Krishna Neuro Psychiatric Centre in Suryaraopet, Vijayawada" />
      </div>
    </div>
  );
}
