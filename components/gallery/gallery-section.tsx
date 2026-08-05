import { ArrowRight, Images } from "lucide-react";
import { GallerySlideshow } from "@/components/gallery/gallery-slideshow";
import { BiText } from "@/components/i18n/bilingual-text";
import { Button } from "@/components/ui/button";

export function GallerySection({ compact = true, className = "" }: { compact?: boolean; className?: string }) {
  return (
    <section id="gallery" className={className}>
      <div className="container-page py-18 md:py-24">
        <div className="grid items-end gap-6 md:grid-cols-[1fr_auto]">
          <div className="max-w-3xl"><p className="eyebrow"><BiText en="Gallery" te="గ్యాలరీ" /></p><h2 className="section-title mt-5"><BiText en="A visual archive of awareness, education and community care." te="అవగాహన, విద్య మరియు సమాజ సంరక్షణకు దృశ్య ఆర్కైవ్." /></h2><p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base"><BiText en="Explore selected photographs and press features from the clinic’s Facebook archives. The slideshow pauses on hover and supports keyboard arrows, swipe and reduced motion." te="క్లినిక్ Facebook ఆర్కైవ్‌ల నుంచి ఎంపిక చేసిన చిత్రాలు మరియు పత్రికా కథనాలను చూడండి. హోవర్ చేస్తే స్లైడ్‌షో ఆగుతుంది; కీబోర్డ్ బాణాలు, స్వైప్ మరియు reduced motionకు మద్దతు ఉంది." /></p></div>
          {compact && <Button asChild variant="soft"><a href="/gallery" data-i18n-link><Images /><BiText en="Open full gallery" te="పూర్తి గ్యాలరీ" /><ArrowRight /></a></Button>}
        </div>
        <div className="mt-10"><GallerySlideshow compact={compact} /></div>
        <p className="mt-4 text-xs leading-5 text-muted-foreground"><BiText en="Archive images are locally optimised copies from the public Facebook albums and Photos page supplied by the clinic. Use the external-link button on any slide to view its original source." te="ఆర్కైవ్ చిత్రాలు క్లినిక్ అందించిన పబ్లిక్ Facebook ఆల్బమ్‌లు మరియు Photos పేజీ నుంచి స్థానికంగా ఆప్టిమైజ్ చేసిన కాపీలు. అసలు సోర్స్ చూడటానికి ప్రతి స్లైడ్‌లోని బాహ్య లింక్ బటన్ ఉపయోగించండి." /></p>
      </div>
    </section>
  );
}
