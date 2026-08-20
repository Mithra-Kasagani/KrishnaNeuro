export type MedicalReference = {
  label: string;
  organization: string;
  href: string;
};

const whoMentalHealth: MedicalReference = {
  label: "Mental health overview",
  organization: "World Health Organization",
  href: "https://www.who.int/health-topics/mental-health",
};

const nimhTopics: MedicalReference = {
  label: "Mental health information and topic guides",
  organization: "National Institute of Mental Health",
  href: "https://www.nimh.nih.gov/health/topics",
};

const referencesBySlug: Record<string, MedicalReference[]> = {
  depression: [
    { label: "Depressive disorder (depression) fact sheet", organization: "World Health Organization", href: "https://www.who.int/news-room/fact-sheets/detail/depression" },
    { label: "Depression in adults: treatment and management (NG222)", organization: "NICE", href: "https://www.nice.org.uk/guidance/ng222" },
  ],
  anxiety: [
    { label: "Anxiety disorders fact sheet", organization: "World Health Organization", href: "https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders" },
    { label: "Generalised anxiety disorder and panic disorder in adults (CG113)", organization: "NICE", href: "https://www.nice.org.uk/guidance/cg113" },
  ],
  "panic-disorder": [
    { label: "Panic disorder: when fear overwhelms", organization: "National Institute of Mental Health", href: "https://www.nimh.nih.gov/health/publications/panic-disorder-when-fear-overwhelms" },
    { label: "Generalised anxiety disorder and panic disorder in adults (CG113)", organization: "NICE", href: "https://www.nice.org.uk/guidance/cg113" },
  ],
  ocd: [
    { label: "Obsessive-compulsive disorder", organization: "National Institute of Mental Health", href: "https://www.nimh.nih.gov/health/topics/obsessive-compulsive-disorder-ocd" },
    { label: "Obsessive-compulsive disorder and body dysmorphic disorder (CG31)", organization: "NICE", href: "https://www.nice.org.uk/guidance/cg31" },
  ],
  "bipolar-disorder": [
    { label: "Bipolar disorder fact sheet", organization: "World Health Organization", href: "https://www.who.int/news-room/fact-sheets/detail/bipolar-disorder" },
    { label: "Bipolar disorder: assessment and management (CG185)", organization: "NICE", href: "https://www.nice.org.uk/guidance/cg185" },
  ],
  schizophrenia: [
    { label: "Schizophrenia fact sheet", organization: "World Health Organization", href: "https://www.who.int/news-room/fact-sheets/detail/schizophrenia" },
    { label: "Psychosis and schizophrenia in adults (CG178)", organization: "NICE", href: "https://www.nice.org.uk/guidance/cg178" },
  ],
  psychosis: [
    { label: "Understanding psychosis", organization: "National Institute of Mental Health", href: "https://www.nimh.nih.gov/health/publications/understanding-psychosis" },
    { label: "Psychosis and schizophrenia in adults (CG178)", organization: "NICE", href: "https://www.nice.org.uk/guidance/cg178" },
  ],
  "alcohol-addiction": [
    { label: "Alcohol fact sheet", organization: "World Health Organization", href: "https://www.who.int/news-room/fact-sheets/detail/alcohol" },
    { label: "Alcohol-use disorders: diagnosis and management (CG115)", organization: "NICE", href: "https://www.nice.org.uk/guidance/cg115" },
  ],
  "drug-addiction": [
    { label: "Drugs, brains, and behavior: the science of addiction", organization: "National Institute on Drug Abuse", href: "https://nida.nih.gov/publications/drugs-brains-behavior-science-addiction/preface" },
    { label: "Drug misuse in over 16s: psychosocial interventions (CG51)", organization: "NICE", href: "https://www.nice.org.uk/guidance/cg51" },
  ],
  "smoking-addiction": [
    { label: "Tobacco fact sheet", organization: "World Health Organization", href: "https://www.who.int/news-room/fact-sheets/detail/tobacco" },
    { label: "Tobacco: preventing uptake, promoting quitting and treating dependence (NG209)", organization: "NICE", href: "https://www.nice.org.uk/guidance/ng209" },
  ],
  "sleep-disorders": [
    { label: "Insomnia", organization: "NHS", href: "https://www.nhs.uk/conditions/insomnia/" },
    { label: "Sleep deprivation and deficiency", organization: "National Heart, Lung, and Blood Institute", href: "https://www.nhlbi.nih.gov/health/sleep-deprivation" },
  ],
  "suicidal-thoughts": [
    { label: "Suicide fact sheet", organization: "World Health Organization", href: "https://www.who.int/news-room/fact-sheets/detail/suicide" },
    { label: "Tele-MANAS national tele-mental health programme", organization: "Government of India", href: "https://dghs.mohfw.gov.in/national-mental-health-programme.php" },
  ],
  dementia: [
    { label: "Dementia fact sheet", organization: "World Health Organization", href: "https://www.who.int/news-room/fact-sheets/detail/dementia" },
    { label: "Dementia: assessment, management and support (NG97)", organization: "NICE", href: "https://www.nice.org.uk/guidance/ng97" },
  ],
  "alzheimers-disease": [
    { label: "Dementia fact sheet", organization: "World Health Organization", href: "https://www.who.int/news-room/fact-sheets/detail/dementia" },
    { label: "Alzheimer's disease", organization: "NHS", href: "https://www.nhs.uk/conditions/alzheimers-disease/" },
  ],
  autism: [
    { label: "Autism fact sheet", organization: "World Health Organization", href: "https://www.who.int/news-room/fact-sheets/detail/autism-spectrum-disorders" },
    { label: "Autism spectrum disorder in under 19s: support and management (CG170)", organization: "NICE", href: "https://www.nice.org.uk/guidance/cg170" },
  ],
  adhd: [
    { label: "Attention-deficit/hyperactivity disorder", organization: "National Institute of Mental Health", href: "https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd" },
    { label: "Attention deficit hyperactivity disorder: diagnosis and management (NG87)", organization: "NICE", href: "https://www.nice.org.uk/guidance/ng87" },
  ],
  "child-psychiatry": [
    { label: "Mental health of adolescents", organization: "World Health Organization", href: "https://www.who.int/news-room/fact-sheets/detail/adolescent-mental-health" },
    { label: "Children and mental health", organization: "National Institute of Mental Health", href: "https://www.nimh.nih.gov/health/publications/children-and-mental-health" },
  ],
  "adolescent-psychiatry": [
    { label: "Mental health of adolescents", organization: "World Health Organization", href: "https://www.who.int/news-room/fact-sheets/detail/adolescent-mental-health" },
    { label: "Children and mental health", organization: "National Institute of Mental Health", href: "https://www.nimh.nih.gov/health/publications/children-and-mental-health" },
  ],
  "postpartum-depression": [
    { label: "Perinatal mental health", organization: "National Institute of Mental Health", href: "https://www.nimh.nih.gov/health/publications/perinatal-depression" },
    { label: "Antenatal and postnatal mental health (CG192)", organization: "NICE", href: "https://www.nice.org.uk/guidance/cg192" },
  ],
};

export function getMedicalReferences(slug: string) {
  return referencesBySlug[slug] || [whoMentalHealth, nimhTopics];
}
