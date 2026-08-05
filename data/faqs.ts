export type FAQ = {
  question: string;
  answer: string;
  category: "First visit" | "Treatment" | "Privacy" | "Family" | "Practical";
};

export const faqs: FAQ[] = [
  {
    question: "When should I consult a psychiatrist?",
    answer:
      "Consider a consultation when changes in mood, worry, sleep, behaviour, substance use, memory or perception persist, recur, cause distress or affect daily life. You do not need to wait for a crisis.",
    category: "First visit",
  },
  {
    question: "What happens during the first appointment?",
    answer:
      "You will be invited to describe what has changed, when it began and how it affects life. The doctor may ask about sleep, physical health, medicines, family history, substances, supports and safety. You receive an initial understanding and options; some diagnoses require observation over time.",
    category: "First visit",
  },
  {
    question: "Should a family member come with me?",
    answer:
      "You may bring someone you trust, especially when symptoms affect memory, judgement or communication. Part of the visit can still be private. For children, a parent or legal guardian is normally involved.",
    category: "Family",
  },
  {
    question: "Will I definitely be prescribed medication?",
    answer:
      "No. Assessment does not automatically lead to medication. Recommendations depend on severity, evidence, health, preferences and safety, and may include education, therapy, practical changes, monitoring or referral.",
    category: "Treatment",
  },
  {
    question: "Will psychiatric medicines cause dependence?",
    answer:
      "Most psychiatric medicines are not addictive, but some calming or sleeping medicines can cause dependence when used in certain ways. Benefits, risks and duration should be discussed. Do not stop any medicine suddenly without medical advice.",
    category: "Treatment",
  },
  {
    question: "How long will treatment take?",
    answer:
      "It varies by condition, severity, response and goals. Some concerns improve with brief support; recurring conditions may need longer follow-up. The plan should be reviewed regularly rather than continued automatically.",
    category: "Treatment",
  },
  {
    question: "Is consultation confidential?",
    answer:
      "Clinical information is kept private within professional and legal limits. Exceptions can apply when there is serious immediate risk, safeguarding concern or a legal requirement. The doctor can explain these limits before sensitive discussion.",
    category: "Privacy",
  },
  {
    question: "Can my employer or relatives get my records?",
    answer:
      "Records should not be shared simply because someone asks. Disclosure normally requires your valid consent or a lawful basis. For minors and people who cannot make a particular decision, applicable legal and safety duties are considered.",
    category: "Privacy",
  },
  {
    question: "Do you offer online consultation?",
    answer:
      "Teleconsultation may be available for clinically suitable situations and selected follow-ups, subject to applicable regulations. Call the clinic to confirm. Emergencies and some assessments require in-person care.",
    category: "Practical",
  },
  {
    question: "What are the clinic timings?",
    answer:
      "The supplied clinic brochure lists Monday to Saturday, 9:00 AM to 9:00 PM, with Sunday closed. Please call before travelling because schedules and doctor availability can change.",
    category: "Practical",
  },
  {
    question: "How do I request an appointment?",
    answer:
      "Use the short appointment form, WhatsApp the clinic on 81217 43999, or call 81217 43999 / 81257 43999. A requested time is not confirmed until the clinic replies.",
    category: "Practical",
  },
  {
    question: "Can family members seek guidance if the patient refuses help?",
    answer:
      "Yes. Families can learn safer communication, warning signs and options, although the doctor cannot diagnose an absent person or disclose a patient's private information without a lawful basis.",
    category: "Family",
  },
  {
    question: "What if someone may harm themselves or another person?",
    answer:
      "Do not use a routine appointment form. If danger is immediate, call India emergency services on 112 or go to the nearest emergency department. Tele-MANAS provides free 24/7 support on 14416. Stay with the person if safe and reduce access to dangerous means.",
    category: "Family",
  },
  {
    question: "Is seeking psychiatric help a sign of weakness?",
    answer:
      "No. Mental-health conditions can affect anyone. Asking for an assessment is an informed health decision and often protects family, work, studies and physical wellbeing.",
    category: "First visit",
  },
  {
    question: "Can I get a second opinion?",
    answer:
      "Yes. Bring available prescriptions, reports, treatment timelines and a current medicine list. A second opinion should clarify options respectfully and should not require criticising previous clinicians.",
    category: "Treatment",
  },
];
