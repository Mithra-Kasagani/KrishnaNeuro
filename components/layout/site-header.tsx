import { CalendarDays, Menu, Phone, ShieldAlert, X } from "lucide-react";
import { BrandLogo } from "@/components/brand/logo";
import { BiText, LanguageToggle } from "@/components/i18n/bilingual-text";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const navigation = [
  { en: "Home", te: "హోమ్", href: "/" },
  { en: "Doctor", te: "డాక్టర్", href: "/doctor/pamarthi-krishna-das" },
  { en: "Conditions", te: "పరిస్థితులు", href: "/conditions" },
  { en: "Services", te: "సేవలు", href: "/services" },
  { en: "Clinic", te: "క్లినిక్", href: "/clinic-vijayawada" },
  { en: "Articles", te: "వ్యాసాలు", href: "/blog" },
  { en: "Contact", te: "సంప్రదించండి", href: "/contact" },
  { en: "Treatment approach", te: "చికిత్స విధానం", href: "/treatments" },
  { en: "Resources", te: "వనరులు", href: "/resources" },
  { en: "Gallery", te: "గ్యాలరీ", href: "/gallery" },
  { en: "FAQs", te: "ప్రశ్నలు", href: "/faq" },
];

export function SiteHeader() {
  return (
    <>
      <div className="relative z-50 bg-[#0b3458] text-white">
        <div className="container-page flex min-h-9 items-center justify-between gap-4 text-[0.69rem] font-semibold tracking-wide">
          <p className="truncate"><BiText en={`Confidential care · ${siteConfig.hours.short}`} te="గోప్యమైన సేవలు · సోమ–శని · ఉ. 9–రా. 9" /></p>
          <a href="/emergency" data-i18n-link className="inline-flex shrink-0 items-center gap-1.5 rounded-md py-1 text-white/88 transition hover:text-white"><ShieldAlert className="size-3.5 text-amber-300" aria-hidden="true" /> <BiText en="Urgent help" te="అత్యవసర సహాయం" /></a>
        </div>
      </div>
      <header className="glass sticky top-0 z-40 border-b border-border/80 shadow-[0_8px_28px_-20px_rgb(15_23_42/.5)]">
        <div className="container-page flex h-19 items-center justify-between gap-3">
          <BrandLogo />
          <nav aria-label="Main navigation" className="hidden items-center gap-0.5 lg:flex">
            {navigation.slice(0, 7).map((item) => <a key={item.href} href={item.href} data-i18n-link className="rounded-full px-3 py-2 text-[0.8rem] font-bold text-muted-foreground transition-colors hover:bg-muted hover:text-primary"><BiText en={item.en} te={item.te} /></a>)}
          </nav>
          <div className="flex items-center gap-1">
            <LanguageToggle />
            <ThemeToggle />
            <Button asChild size="sm" className="hidden xl:inline-flex"><a href="/appointment" data-i18n-link><CalendarDays aria-hidden="true" /> <BiText en="Book appointment" te="అపాయింట్‌మెంట్" /></a></Button>
            <details className="group lg:hidden">
              <summary className="relative z-[70] flex size-11 cursor-pointer list-none items-center justify-center rounded-full transition hover:bg-muted [&::-webkit-details-marker]:hidden" aria-label="Toggle website navigation">
                <Menu className="size-5 group-open:hidden" aria-hidden="true" /><X className="hidden size-5 group-open:block" aria-hidden="true" />
              </summary>
              <div className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm">
                <nav aria-label="Mobile navigation" className="absolute inset-y-0 right-0 w-[min(92vw,24rem)] overflow-y-auto border-l border-border bg-card p-6 pt-20 shadow-2xl">
                  <p className="text-xs font-extrabold uppercase tracking-[0.13em] text-muted-foreground"><BiText en="Explore" te="వెబ్‌సైట్ విభాగాలు" /></p>
                  <div className="mt-3 grid">
                    {navigation.map((item) => <a key={`${item.href}-${item.en}`} href={item.href} data-i18n-link className="border-b border-border/70 py-3.5 text-sm font-bold text-foreground"><BiText en={item.en} te={item.te} /></a>)}
                  </div>
                  <div className="mt-7 grid grid-cols-2 gap-3"><Button asChild variant="outline"><a href={`tel:${siteConfig.phones[0]}`}><Phone aria-hidden="true"/> <BiText en="Call" te="కాల్" /></a></Button><Button asChild><a href="/appointment" data-i18n-link><CalendarDays aria-hidden="true"/> <BiText en="Book" te="బుక్ చేయండి" /></a></Button></div>
                  <p className="mt-5 text-xs leading-5 text-muted-foreground"><BiText en="Appointments are confirmed only after the clinic replies. For immediate danger, call 112." te="క్లినిక్ సమాధానం ఇచ్చిన తర్వాతే అపాయింట్‌మెంట్ నిర్ధారితం. తక్షణ ప్రమాదంలో 112కు కాల్ చేయండి." /></p>
                </nav>
              </div>
            </details>
          </div>
        </div>
      </header>
    </>
  );
}
