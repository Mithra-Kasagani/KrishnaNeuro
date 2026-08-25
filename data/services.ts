import type { LucideIcon } from "lucide-react";
import {
  Brain,
  BriefcaseMedical,
  CigaretteOff,
  HeartHandshake,
  House,
  Laptop,
  MessagesSquare,
  MoonStar,
  ShieldCheck,
  Users,
} from "lucide-react";

export type Service = {
  name: string;
  slug: string;
  short: string;
  description: string;
  includes: string[];
  suitableFor: string[];
  relatedConditions: string[];
  faqs: { question: string; answer: string }[];
  note: string;
  icon: LucideIcon;
  updatedAt: string;
};

export const services: Service[] = [
  {
    name: "Psychiatric Consultation",
    slug: "psychiatric-consultation",
    updatedAt: "2026-08-20",
    short: "A careful, confidential assessment—not a rushed label.",
    description:
      "An initial consultation brings together symptoms, medical health, sleep, medicines, relationships and daily function. Dr. Pamarthi Krishna Das explains the working understanding and options in simple language.",
    includes: ["Clinical history and mental-state assessment", "Physical-health and medication review", "Safety and support assessment", "Shared next-step plan"],
    suitableFor: ["A first mental-health concern", "A second opinion", "Return of previous symptoms", "Family guidance"],
    relatedConditions: ["depression", "anxiety", "psychosis", "sleep-disorders"],
    faqs: [
      { question: "Do I need to know my diagnosis before a psychiatric consultation?", answer: "No. You can describe the changes you or your family have noticed. Assessment helps clarify the pattern, possible causes, urgency and suitable next steps." },
      { question: "Does a first psychiatric consultation automatically mean medication?", answer: "No. The next step may involve education, monitoring, practical changes, counselling or therapy, medical tests, medication, another referral or a combination based on individual need." },
      { question: "Can a family member join the consultation?", answer: "A trusted family member may join if the patient wishes. Private discussion and consent remain important; a clinician cannot diagnose an absent person from a family account alone." },
    ],
    note: "An assessment does not automatically mean medication or admission.",
    icon: Brain,
  },
  {
    name: "Medication Management",
    slug: "medication-management",
    updatedAt: "2026-08-20",
    short: "Thoughtful prescribing with clear goals and regular review.",
    description:
      "When medication is clinically appropriate, the choice is based on expected benefit, health conditions, other medicines, daily routine and preferences. The aim is the lowest effective treatment burden consistent with safety and recovery.",
    includes: ["Benefit–risk discussion", "Dose and side-effect review", "Relevant physical-health monitoring", "Safe taper planning when appropriate"],
    suitableFor: ["Starting treatment", "Side-effect concerns", "Complex medicine lists", "Relapse-prevention review"],
    relatedConditions: ["bipolar-disorder", "schizophrenia", "depression", "ocd"],
    faqs: [
      { question: "Should I stop a psychiatric medicine if I notice side effects?", answer: "Do not stop suddenly unless emergency medical advice tells you to. Contact the prescribing clinician promptly; the safest response depends on the medicine, reaction, dose and health situation." },
      { question: "Will medication management always require blood tests?", answer: "No. Monitoring depends on the medicine and individual health risks. Some treatments need weight, blood pressure, glucose, lipids, blood counts, liver, kidney, thyroid or medicine-level checks; others do not." },
      { question: "What is reviewed during a medication follow-up?", answer: "The clinician reviews the target symptoms, benefit, side effects, adherence, other medicines, physical health, daily functioning and whether the current dose and duration still have a clear purpose." },
    ],
    note: "Never start, share, reduce or stop psychiatric medication without individual medical advice.",
    icon: BriefcaseMedical,
  },
  {
    name: "Counselling",
    slug: "counselling",
    updatedAt: "2026-08-20",
    short: "A structured conversation that builds understanding and practical skills.",
    description:
      "Counselling supports coping, problem solving, emotional regulation and behaviour change. The recommended approach and session frequency depend on the concern and may involve referral to an appropriate therapist.",
    includes: ["Shared goals", "Evidence-informed coping skills", "Progress review", "Referral when specialist therapy is needed"],
    suitableFor: ["Stress and adjustment", "Anxiety or low mood", "Grief", "Relapse prevention"],
    relatedConditions: ["anxiety", "depression", "stress", "grief-counselling"],
    faqs: [
      { question: "Is counselling the same as receiving advice?", answer: "No. Counselling is a collaborative process that helps clarify patterns, goals and practical skills. The clinician should not impose personal decisions or force disclosure." },
      { question: "How many counselling sessions will I need?", answer: "There is no responsible fixed number for everyone. Frequency and duration depend on the concern, goals, severity, progress, treatment approach and whether specialist therapy or another service is more suitable." },
      { question: "Can the clinic refer me for a specific therapy?", answer: "Yes. When a concern needs a particular evidence-based therapy or level of care, assessment may lead to referral to an appropriately trained professional or service." },
    ],
    note: "Counselling is collaborative; it is not advice-giving, judgement or forced disclosure.",
    icon: MessagesSquare,
  },
  {
    name: "Family Counselling",
    slug: "family-counselling",
    updatedAt: "2026-08-20",
    short: "Help families understand illness, communicate and support recovery.",
    description:
      "Sessions can reduce blame, clarify boundaries and give families practical ways to respond to symptoms, relapse signs, addiction or caregiver strain.",
    includes: ["Psychoeducation", "Communication planning", "Boundaries and roles", "Caregiver wellbeing"],
    suitableFor: ["Severe mental illness", "Addiction recovery", "Repeated conflict", "Caregiver stress"],
    relatedConditions: ["schizophrenia", "alcohol-addiction", "family-counselling", "relationship-counselling"],
    faqs: [
      { question: "Does the patient need to attend family counselling?", answer: "It depends on the purpose, consent and safety. Families can seek general guidance, but an absent person cannot be diagnosed and their private clinical information cannot be disclosed without an appropriate basis." },
      { question: "How is confidentiality handled in family sessions?", answer: "The clinician explains who is participating, what information may be shared and the limits of confidentiality. Separate discussion may be needed when privacy or safety requires it." },
      { question: "Is family counselling suitable during violence or immediate danger?", answer: "Not automatically. Active violence, coercion or immediate danger requires safety planning and emergency or safeguarding support; joint sessions can sometimes be unsafe." },
    ],
    note: "Patient consent and privacy are respected. Immediate safety can require a different approach.",
    icon: Users,
  },
  {
    name: "Child & Adolescent Psychiatry",
    slug: "child-psychiatry",
    updatedAt: "2026-08-20",
    short: "Developmentally informed care for children, teenagers and caregivers.",
    description:
      "Assessment considers development, school, family, strengths, physical health and the young person's own experience. Parents and teachers may contribute with appropriate consent.",
    includes: ["Developmental and behavioural assessment", "Parent guidance", "School recommendations", "Care plan and follow-up"],
    suitableFor: ["Attention or learning concerns", "Anxiety or mood change", "Behaviour problems", "Autism-related support"],
    relatedConditions: ["child-psychiatry", "adhd", "autism", "behavior-problems"],
    faqs: [
      { question: "Will the psychiatrist need information from school?", answer: "School information can be helpful when concerns involve learning, attention, behaviour or attendance, but it is requested with appropriate parent or guardian involvement, consent and privacy." },
      { question: "Does child psychiatric assessment automatically lead to medication?", answer: "No. Recommendations may include parent guidance, school support, psychological or developmental intervention, monitoring, medical evaluation, medication when indicated or referral." },
      { question: "Can a child or teenager speak privately with the psychiatrist?", answer: "Age-appropriate private conversation may be offered. The clinician explains confidentiality and its safety or legal limits to the young person and caregiver." },
    ],
    note: "A parent or legal guardian is normally involved; confidentiality limits are explained clearly.",
    icon: House,
  },
  {
    name: "De-addiction Care",
    slug: "de-addiction",
    updatedAt: "2026-08-20",
    short: "Non-judgemental help for alcohol, tobacco and other substance use.",
    description:
      "Care begins with safety: the substance, withdrawal and overdose risk determine whether outpatient treatment, medical detoxification or a higher level of care is needed.",
    includes: ["Use and withdrawal assessment", "Motivational treatment", "Medication when indicated", "Relapse and family plan"],
    suitableFor: ["Alcohol", "Tobacco or nicotine", "Prescription drug misuse", "Other substances"],
    relatedConditions: ["alcohol-addiction", "drug-addiction", "smoking-addiction", "sleep-disorders"],
    faqs: [
      { question: "Is it safe to stop heavy alcohol use suddenly at home?", answer: "It may be dangerous when physical dependence is present. Shaking, sweating, hallucinations, confusion or seizures can require urgent medical care. Seek substance-specific medical advice before stopping." },
      { question: "Is addiction treatment confidential?", answer: "Information is handled respectfully under professional and applicable legal duties. The clinician should explain privacy and its limits, especially where immediate safety or a legal requirement applies." },
      { question: "Does a lapse mean treatment has failed?", answer: "No. A lapse is important information about triggers, support and treatment needs. It should prompt timely review rather than shame or abandonment of the recovery plan." },
    ],
    note: "Suddenly stopping heavy alcohol or sedative use can be dangerous. Seek medical advice first.",
    icon: CigaretteOff,
  },
  {
    name: "Stress Management",
    slug: "stress-management",
    updatedAt: "2026-08-20",
    short: "Turn an overwhelming problem into clear, workable next steps.",
    description:
      "Stress care maps demands, recovery time, habits and supports. It also checks whether depression, anxiety, insomnia or burnout requires more specific treatment.",
    includes: ["Stress and coping map", "Breathing and attention skills", "Boundary and problem-solving plan", "Sleep and routine support"],
    suitableFor: ["Work or study pressure", "Caregiver strain", "Relationship stress", "Major life transitions"],
    relatedConditions: ["stress", "anxiety", "sleep-disorders", "depression"],
    faqs: [
      { question: "Is stress always a psychiatric disorder?", answer: "No. Stress is a normal response to demands, but prolonged or severe stress can impair sleep, health and functioning or overlap with anxiety, depression, trauma, burnout or substance use." },
      { question: "Does stress management require medication?", answer: "Not automatically. Care may focus on problem solving, boundaries, sleep, recovery, psychological skills and practical support. A related psychiatric or medical condition may need separate treatment." },
      { question: "How can I prepare for a stress-management consultation?", answer: "Note the main demands, what has changed, sleep pattern, physical symptoms, coping habits, supports and which areas of daily life are being affected." },
    ],
    note: "Stress skills complement—not replace—treatment for a medical or psychiatric condition.",
    icon: ShieldCheck,
  },
  {
    name: "Sleep Clinic",
    slug: "sleep-clinic",
    updatedAt: "2026-08-20",
    short: "Understand the pattern before reaching for a sleeping tablet.",
    description:
      "A focused sleep review examines timing, routine, snoring, restless legs, medicines, substances, mood and daytime impact. Tests or specialist referral are arranged when needed.",
    includes: ["Sleep history and diary", "Insomnia-focused plan", "Medicine and substance review", "Sleep-study referral if indicated"],
    suitableFor: ["Insomnia", "Irregular body clock", "Daytime sleepiness", "Possible sleep apnoea"],
    relatedConditions: ["sleep-disorders", "anxiety", "depression", "old-age-psychiatry"],
    faqs: [
      { question: "Will a sleep-clinic consultation automatically result in sleeping tablets?", answer: "No. The first step is understanding the sleep pattern and causes. Chronic insomnia often needs behavioural treatment, while breathing, movement, mood, medical or medicine-related problems require different care." },
      { question: "Does everyone need a sleep study?", answer: "No. A sleep study is considered when the history suggests sleep apnoea, unusual movements or behaviours, unexplained sleepiness or another condition that needs objective measurement." },
      { question: "When do snoring and sleepiness need prompt assessment?", answer: "Seek prompt medical assessment for breathing pauses, choking during sleep, severe driving sleepiness, new neurological symptoms or other safety concerns." },
    ],
    note: "Loud snoring with choking, driving sleepiness or breathing pauses needs prompt medical assessment.",
    icon: MoonStar,
  },
  {
    name: "Tele Consultation",
    slug: "tele-consultation",
    updatedAt: "2026-08-20",
    short: "Remote follow-up and selected consultations, subject to clinical suitability.",
    description:
      "Teleconsultation can improve continuity when travel is difficult. Identity, consent, location and clinical appropriateness are confirmed in line with applicable telemedicine standards.",
    includes: ["Secure appointment process", "Clinical review", "Digital care instructions", "In-person referral when required"],
    suitableFor: ["Selected follow-ups", "People outside central Vijayawada", "Family guidance", "Continuity while travelling"],
    relatedConditions: ["depression", "anxiety", "sleep-disorders", "stress"],
    faqs: [
      { question: "Is teleconsultation available for every psychiatric concern?", answer: "No. Availability and suitability must be confirmed. Some symptoms, examinations, emergencies, medicines or legal requirements need an in-person or higher level of care." },
      { question: "Can teleconsultation be used during an emergency?", answer: "No. A routine video or phone appointment is not an emergency service. Immediate danger, overdose, seizure, severe confusion or inability to stay safe requires 112 or the nearest emergency department." },
      { question: "What is needed for a teleconsultation?", answer: "The clinic may need to confirm identity, consent, current location, privacy, a working device and whether remote care is clinically appropriate. Call first for the current process." },
    ],
    note: "Not every concern or medicine can be managed remotely. Call to confirm availability; teleconsultation is not an emergency service.",
    icon: Laptop,
  },
  {
    name: "Urgent Consultation Guidance",
    slug: "emergency-consultation",
    updatedAt: "2026-08-20",
    short: "Call for same-day availability; immediate danger belongs in emergency care.",
    description:
      "The clinic can guide families facing rapid symptom worsening and advise whether a scheduled consultation is suitable. It is not a 24-hour emergency department.",
    includes: ["Phone triage for clinic suitability", "Same-day availability check", "Family safety guidance", "Referral to emergency services when needed"],
    suitableFor: ["Rapid mood or behaviour change", "Possible psychosis", "Severe withdrawal concern", "Postpartum warning signs"],
    relatedConditions: ["suicidal-thoughts", "psychosis", "bipolar-disorder", "postpartum-depression"],
    faqs: [
      { question: "Is the clinic an emergency department?", answer: "No. The clinic may discuss whether a scheduled or same-day consultation is suitable, but it is not a 24-hour emergency or ambulance service." },
      { question: "When should I call 112 instead of waiting for a clinic appointment?", answer: "Call 112 or go to the nearest emergency department for a suicide attempt or current plan, overdose, seizure, severe violence, severe confusion, dangerous withdrawal or inability to keep someone safe." },
      { question: "Is a same-day appointment guaranteed?", answer: "No. Call to ask about current availability. The clinic may advise emergency, medical or another service when waiting for a routine consultation would be unsafe or inappropriate." },
    ],
    note: "For immediate risk of suicide, violence, overdose, severe confusion, seizure or medical danger, call 112 or go to the nearest emergency department now.",
    icon: HeartHandshake,
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
