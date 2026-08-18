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
  note: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    name: "Psychiatric Consultation",
    slug: "psychiatric-consultation",
    short: "A careful, confidential assessment—not a rushed label.",
    description:
      "An initial consultation brings together symptoms, medical health, sleep, medicines, relationships and daily function. Dr. Krishna Das explains the working understanding and options in simple language.",
    includes: ["Clinical history and mental-state assessment", "Physical-health and medication review", "Safety and support assessment", "Shared next-step plan"],
    suitableFor: ["A first mental-health concern", "A second opinion", "Return of previous symptoms", "Family guidance"],
    note: "An assessment does not automatically mean medication or admission.",
    icon: Brain,
  },
  {
    name: "Medication Management",
    slug: "medication-management",
    short: "Thoughtful prescribing with clear goals and regular review.",
    description:
      "When medication is clinically appropriate, the choice is based on expected benefit, health conditions, other medicines, daily routine and preferences. The aim is the lowest effective treatment burden consistent with safety and recovery.",
    includes: ["Benefit–risk discussion", "Dose and side-effect review", "Relevant physical-health monitoring", "Safe taper planning when appropriate"],
    suitableFor: ["Starting treatment", "Side-effect concerns", "Complex medicine lists", "Relapse-prevention review"],
    note: "Never start, share, reduce or stop psychiatric medication without individual medical advice.",
    icon: BriefcaseMedical,
  },
  {
    name: "Counselling",
    slug: "counselling",
    short: "A structured conversation that builds understanding and practical skills.",
    description:
      "Counselling supports coping, problem solving, emotional regulation and behaviour change. The recommended approach and session frequency depend on the concern and may involve referral to an appropriate therapist.",
    includes: ["Shared goals", "Evidence-informed coping skills", "Progress review", "Referral when specialist therapy is needed"],
    suitableFor: ["Stress and adjustment", "Anxiety or low mood", "Grief", "Relapse prevention"],
    note: "Counselling is collaborative; it is not advice-giving, judgement or forced disclosure.",
    icon: MessagesSquare,
  },
  {
    name: "Family Counselling",
    slug: "family-counselling",
    short: "Help families understand illness, communicate and support recovery.",
    description:
      "Sessions can reduce blame, clarify boundaries and give families practical ways to respond to symptoms, relapse signs, addiction or caregiver strain.",
    includes: ["Psychoeducation", "Communication planning", "Boundaries and roles", "Caregiver wellbeing"],
    suitableFor: ["Severe mental illness", "Addiction recovery", "Repeated conflict", "Caregiver stress"],
    note: "Patient consent and privacy are respected. Immediate safety can require a different approach.",
    icon: Users,
  },
  {
    name: "Child & Adolescent Psychiatry",
    slug: "child-psychiatry",
    short: "Developmentally informed care for children, teenagers and caregivers.",
    description:
      "Assessment considers development, school, family, strengths, physical health and the young person's own experience. Parents and teachers may contribute with appropriate consent.",
    includes: ["Developmental and behavioural assessment", "Parent guidance", "School recommendations", "Care plan and follow-up"],
    suitableFor: ["Attention or learning concerns", "Anxiety or mood change", "Behaviour problems", "Autism-related support"],
    note: "A parent or legal guardian is normally involved; confidentiality limits are explained clearly.",
    icon: House,
  },
  {
    name: "De-addiction Care",
    slug: "de-addiction",
    short: "Non-judgemental help for alcohol, tobacco and other substance use.",
    description:
      "Care begins with safety: the substance, withdrawal and overdose risk determine whether outpatient treatment, medical detoxification or a higher level of care is needed.",
    includes: ["Use and withdrawal assessment", "Motivational treatment", "Medication when indicated", "Relapse and family plan"],
    suitableFor: ["Alcohol", "Tobacco or nicotine", "Prescription drug misuse", "Other substances"],
    note: "Suddenly stopping heavy alcohol or sedative use can be dangerous. Seek medical advice first.",
    icon: CigaretteOff,
  },
  {
    name: "Stress Management",
    slug: "stress-management",
    short: "Turn an overwhelming problem into clear, workable next steps.",
    description:
      "Stress care maps demands, recovery time, habits and supports. It also checks whether depression, anxiety, insomnia or burnout requires more specific treatment.",
    includes: ["Stress and coping map", "Breathing and attention skills", "Boundary and problem-solving plan", "Sleep and routine support"],
    suitableFor: ["Work or study pressure", "Caregiver strain", "Relationship stress", "Major life transitions"],
    note: "Stress skills complement—not replace—treatment for a medical or psychiatric condition.",
    icon: ShieldCheck,
  },
  {
    name: "Sleep Clinic",
    slug: "sleep-clinic",
    short: "Understand the pattern before reaching for a sleeping tablet.",
    description:
      "A focused sleep review examines timing, routine, snoring, restless legs, medicines, substances, mood and daytime impact. Tests or specialist referral are arranged when needed.",
    includes: ["Sleep history and diary", "Insomnia-focused plan", "Medicine and substance review", "Sleep-study referral if indicated"],
    suitableFor: ["Insomnia", "Irregular body clock", "Daytime sleepiness", "Possible sleep apnoea"],
    note: "Loud snoring with choking, driving sleepiness or breathing pauses needs prompt medical assessment.",
    icon: MoonStar,
  },
  {
    name: "Tele Consultation",
    slug: "tele-consultation",
    short: "Remote follow-up and selected consultations, subject to clinical suitability.",
    description:
      "Teleconsultation can improve continuity when travel is difficult. Identity, consent, location and clinical appropriateness are confirmed in line with applicable telemedicine standards.",
    includes: ["Secure appointment process", "Clinical review", "Digital care instructions", "In-person referral when required"],
    suitableFor: ["Selected follow-ups", "People outside central Vijayawada", "Family guidance", "Continuity while travelling"],
    note: "Not every concern or medicine can be managed remotely. Call to confirm availability; teleconsultation is not an emergency service.",
    icon: Laptop,
  },
  {
    name: "Urgent Consultation Guidance",
    slug: "emergency-consultation",
    short: "Call for same-day availability; immediate danger belongs in emergency care.",
    description:
      "The clinic can guide families facing rapid symptom worsening and advise whether a scheduled consultation is suitable. It is not a 24-hour emergency department.",
    includes: ["Phone triage for clinic suitability", "Same-day availability check", "Family safety guidance", "Referral to emergency services when needed"],
    suitableFor: ["Rapid mood or behaviour change", "Possible psychosis", "Severe withdrawal concern", "Postpartum warning signs"],
    note: "For immediate risk of suicide, violence, overdose, severe confusion, seizure or medical danger, call 112 or go to the nearest emergency department now.",
    icon: HeartHandshake,
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
