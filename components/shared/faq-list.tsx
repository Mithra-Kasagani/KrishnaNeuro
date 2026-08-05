import { FAQJsonLd } from "@/components/seo/json-ld";

export function FAQList({ faqs, schema = true }: { faqs: { question: string; answer: string }[]; schema?: boolean }) {
  return (
    <>
      {schema && <FAQJsonLd faqs={faqs} />}
      <div className="w-full">
        {faqs.map((faq) => (
          <details key={faq.question} className="group border-b border-border">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left text-[1rem] font-bold leading-snug tracking-[-0.015em] transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
              {faq.question}
              <span className="shrink-0 text-lg leading-none text-muted-foreground transition-transform duration-200 group-open:rotate-180" aria-hidden="true">⌄</span>
            </summary>
            <div className="pb-5 pr-9 text-sm leading-7 text-muted-foreground">{faq.answer}</div>
          </details>
        ))}
      </div>
    </>
  );
}
