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
    function track(name){var allowed=false;try{allowed=localStorage.getItem(KEY)==='accepted'}catch(e){}if(!allowed)return;window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:name,page_path:location.pathname})}
    document.addEventListener('click',function(event){var target=event.target&&event.target.closest?event.target.closest('a'):null;if(!target)return;var href=target.getAttribute('href')||'';if(href.indexOf('tel:')===0)track('clinic_phone_click');else if(href.indexOf('wa.me/')>=0)track('clinic_whatsapp_click');else if(href.indexOf('/appointment')>=0)track('appointment_button_click');else if(href.indexOf('google.com/maps')>=0)track('directions_click');else if(href.indexOf('mailto:')===0)track('clinic_email_click');else if(href==='/contact'||href==='/te/contact')track('clinic_contact_click')});
    document.addEventListener('focusin',function(event){var form=event.target&&event.target.closest?event.target.closest('[data-analytics-form="appointment"]'):null;if(!form||form.getAttribute('data-analytics-started')==='true')return;form.setAttribute('data-analytics-started','true');track('appointment_form_started')});
    window.addEventListener('knpc-safe-event',function(event){if(event.detail&&event.detail.name)track(event.detail.name)});
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
