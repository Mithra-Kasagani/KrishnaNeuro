const base = "/images/ai";

export const aiImages = {
  wellbeing: `${base}/wellbeing-overview.webp`,
  mood: `${base}/mood-recovery.webp`,
  anxiety: `${base}/anxiety-grounding.webp`,
  psychosis: `${base}/psychosis-support.webp`,
  addiction: `${base}/addiction-recovery.webp`,
  sleep: `${base}/sleep-rest.webp`,
  memory: `${base}/memory-ageing.webp`,
  child: `${base}/child-adolescent.webp`,
  women: `${base}/women-postpartum.webp`,
  family: `${base}/relationship-family.webp`,
} as const;

const conditionBase = "/images/conditions/individual";

const conditionMap: Record<string, string> = {
  "depression": `${conditionBase}/depression.webp`,
  "anxiety": `${conditionBase}/anxiety.webp`,
  "panic-disorder": `${conditionBase}/panic-disorder.webp`,
  "ocd": `${conditionBase}/ocd.webp`,
  "bipolar-disorder": `${conditionBase}/bipolar-disorder.webp`,
  "schizophrenia": `${conditionBase}/schizophrenia.webp`,
  "psychosis": `${conditionBase}/psychosis.webp`,
  "alcohol-addiction": `${conditionBase}/alcohol-addiction.webp`,
  "drug-addiction": `${conditionBase}/drug-addiction.webp`,
  "smoking-addiction": `${conditionBase}/smoking-addiction.webp`,
  "sleep-disorders": `${conditionBase}/sleep-disorders.webp`,
  "stress": `${conditionBase}/stress.webp`,
  "suicidal-thoughts": `${conditionBase}/suicidal-thoughts.webp`,
  "memory-problems": `${conditionBase}/memory-problems.webp`,
  "dementia": `${conditionBase}/dementia.webp`,
  "alzheimers-disease": `${conditionBase}/alzheimers-disease.webp`,
  "child-psychiatry": `${conditionBase}/child-psychiatry.webp`,
  "adolescent-psychiatry": `${conditionBase}/adolescent-psychiatry.webp`,
  "behavior-problems": `${conditionBase}/behavior-problems.webp`,
  "learning-disorders": `${conditionBase}/learning-disorders.webp`,
  "autism": `${conditionBase}/autism.webp`,
  "adhd": `${conditionBase}/adhd.webp`,
  "old-age-psychiatry": `${conditionBase}/old-age-psychiatry.webp`,
  "womens-mental-health": `${conditionBase}/womens-mental-health.webp`,
  "postpartum-depression": `${conditionBase}/postpartum-depression.webp`,
  "sexual-disorders": `${conditionBase}/sexual-disorders.webp`,
  "personality-disorders": `${conditionBase}/personality-disorders.webp`,
  "relationship-counselling": `${conditionBase}/relationship-counselling.webp`,
  "family-counselling": `${conditionBase}/family-counselling.webp`,
  "grief-counselling": `${conditionBase}/grief-counselling.webp`,
};
const serviceMap: Record<string, string> = {
  "psychiatric-consultation": aiImages.wellbeing,
  "medication-management": `${conditionBase}/psychosis.webp`,
  counselling: `${conditionBase}/relationship-counselling.webp`,
  "family-counselling": `${conditionBase}/family-counselling.webp`,
  "child-psychiatry": `${conditionBase}/child-psychiatry.webp`,
  "de-addiction": `${conditionBase}/alcohol-addiction.webp`,
  "stress-management": `${conditionBase}/stress.webp`,
  "sleep-clinic": `${conditionBase}/sleep-disorders.webp`,
  "tele-consultation": aiImages.wellbeing,
  "emergency-consultation": `${conditionBase}/suicidal-thoughts.webp`,
};

const articleMap: Record<string, string> = {
  "when-to-see-a-psychiatrist": aiImages.wellbeing,
  "depression-vs-sadness": `${conditionBase}/depression.webp`,
  "panic-attack-what-happens-and-what-helps": `${conditionBase}/panic-disorder.webp`,
  "ocd-more-than-cleanliness": `${conditionBase}/ocd.webp`,
  "how-to-talk-to-someone-experiencing-psychosis": `${conditionBase}/psychosis.webp`,
  "alcohol-withdrawal-safety": `${conditionBase}/alcohol-addiction.webp`,
  "chronic-insomnia-guide": `${conditionBase}/sleep-disorders.webp`,
  "when-should-a-child-see-a-psychiatrist": `${conditionBase}/child-psychiatry.webp`,
  "adhd-assessment-what-to-expect": `${conditionBase}/adhd.webp`,
  "baby-blues-postpartum-depression-psychosis": `${conditionBase}/postpartum-depression.webp`,
  "normal-ageing-or-memory-problem": `${conditionBase}/memory-problems.webp`,
  "questions-before-psychiatric-medication": aiImages.wellbeing,
};

const pageMap: Record<string, string> = {
  home: aiImages.wellbeing,
  "about-doctor": aiImages.wellbeing,
  conditions: aiImages.wellbeing,
  treatments: aiImages.psychosis,
  services: aiImages.wellbeing,
  "patient-journey": aiImages.wellbeing,
  resources: aiImages.wellbeing,
  blog: aiImages.wellbeing,
  faqs: aiImages.family,
  appointment: aiImages.wellbeing,
  contact: aiImages.mood,
  "clinic-vijayawada": "/images/doctor-office.webp",
  "medical-disclaimer": aiImages.wellbeing,
  emergency: aiImages.wellbeing,
  locations: aiImages.mood,
  "privacy-policy": aiImages.wellbeing,
  terms: aiImages.wellbeing,
  "psychiatrist-in-vijayawada": aiImages.mood,
};

export function conditionImage(slug: string) { return conditionMap[slug] || aiImages.wellbeing; }
export function serviceImage(slug: string) { return serviceMap[slug] || aiImages.wellbeing; }
export function articleImage(slug: string) { return articleMap[slug] || aiImages.wellbeing; }
export function pageImage(page: string) { return pageMap[page] || aiImages.wellbeing; }
export function locationImage() { return aiImages.mood; }

export function aiImageAlt(subject: string, language: "en" | "te" = "en") {
  return language === "te"
    ? `${subject}కు సంబంధించిన లక్షణాలు మరియు సహాయాన్ని చూపించే గౌరవప్రదమైన చిత్రం`
    : `Dignified editorial photograph illustrating symptoms and support related to ${subject}`;
}
