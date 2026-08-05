import { BiText } from "@/components/i18n/bilingual-text";
import { Button } from "@/components/ui/button";

export function AnalyticsConsent() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "";
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "";
  const script = `(function(){
    var KEY='knpc-analytics-consent', box=document.getElementById('analytics-consent');
    function load(){
      var gtm=${JSON.stringify(gtmId)}, ga=${JSON.stringify(gaId)};
      if(gtm&&!document.getElementById('knpc-gtm')){window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});var s=document.createElement('script');s.id='knpc-gtm';s.async=true;s.src='https://www.googletagmanager.com/gtm.js?id='+encodeURIComponent(gtm);document.head.appendChild(s)}
      else if(ga&&!document.getElementById('knpc-ga')){var s=document.createElement('script');s.id='knpc-ga';s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(ga);document.head.appendChild(s);window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};window.gtag('js',new Date());window.gtag('config',ga,{anonymize_ip:true})}
    }
    var choice=null;try{choice=localStorage.getItem(KEY)}catch(e){}
    if(choice==='accepted')load(); else if(!choice&&box)box.hidden=false;
    var yes=document.getElementById('analytics-accept'), no=document.getElementById('analytics-decline');
    function decide(value){try{localStorage.setItem(KEY,value)}catch(e){}if(box)box.hidden=true;if(value==='accepted')load()}
    if(yes)yes.addEventListener('click',function(){decide('accepted')});
    if(no)no.addEventListener('click',function(){decide('declined')});
  })();`;

  return (
    <>
      <div id="analytics-consent" hidden role="dialog" aria-label="Analytics preferences" className="fixed bottom-22 left-3 right-3 z-50 mx-auto max-w-2xl rounded-2xl border border-border bg-card/96 p-4 shadow-2xl backdrop-blur-xl md:bottom-5 md:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-muted-foreground"><strong className="text-foreground"><BiText en="Your privacy matters. " te="మీ గోప్యత ముఖ్యం. " /></strong><BiText en="Optional analytics help improve this website. No health information from the appointment form is used for advertising." te="ఐచ్ఛిక అనలిటిక్స్ వెబ్‌సైట్‌ను మెరుగుపరచడంలో సహాయపడతాయి. అపాయింట్‌మెంట్ ఆరోగ్య వివరాలు ప్రకటనలకు ఉపయోగించబడవు." /></p>
          <div className="flex shrink-0 gap-2">
            <Button id="analytics-decline" type="button" variant="ghost" size="sm"><BiText en="Decline" te="వద్దు" /></Button>
            <Button id="analytics-accept" type="button" size="sm"><BiText en="Allow analytics" te="అనుమతించండి" /></Button>
          </div>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </>
  );
}
