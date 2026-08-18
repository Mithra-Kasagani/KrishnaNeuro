export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Article = {
  title: string;
  slug: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  lead: string;
  takeaways: string[];
  sections: ArticleSection[];
  faqs: { question: string; answer: string }[];
  internalLinks: { label: string; href: string }[];
  references: { label: string; href: string }[];
};

const commonReferences = [
  { label: "World Health Organization — Mental health", href: "https://www.who.int/health-topics/mental-health" },
  { label: "National Institute of Mental Health and Neuro Sciences (NIMHANS)", href: "https://nimhans.ac.in/" },
];

export const articles: Article[] = [
  {
    title: "When Should You See a Psychiatrist? A Practical Guide",
    slug: "when-to-see-a-psychiatrist",
    description: "Learn which changes in mood, sleep, behaviour, substance use or memory suggest it is time to consult a psychiatrist in Vijayawada.",
    category: "First visit",
    publishedAt: "2026-06-12",
    updatedAt: "2026-08-01",
    readingMinutes: 7,
    lead: "You do not need to be in crisis—or certain of a diagnosis—to ask for a psychiatric assessment. The useful question is whether a change is persistent, distressing, risky or interfering with life.",
    takeaways: ["Seek help for duration, distress, risk or impaired function—not only symptom intensity.", "A psychiatrist considers physical health and medication as well as emotions and behaviour.", "Immediate danger requires emergency care, not a routine online form."],
    sections: [
      { heading: "What a psychiatrist can help assess", paragraphs: ["Psychiatrists are medical doctors trained to assess mental-health conditions, physical contributors, medicine effects and safety. A consultation may lead to education, monitoring, psychological treatment, medication, a medical test or another referral.", "You can come with a concern rather than a label: ‘I have not slept well for a month’, ‘My father is increasingly confused’, or ‘My child is refusing school’ are all valid starting points."], bullets: ["Mood or anxiety that lasts or keeps returning", "Major sleep, appetite, energy or concentration change", "Voices, suspiciousness or markedly unusual behaviour", "Alcohol, tobacco or other substance use that feels hard to control", "Memory, judgement or self-care change", "Child or adolescent development, emotion or behaviour concerns"] },
      { heading: "Four questions that can guide the decision", paragraphs: ["Ask how long the change has lasted, how much distress it causes, what areas of life are affected and whether anyone's safety is uncertain. Even mild symptoms may deserve help if they have continued for months or gradually narrowed life."], bullets: ["Duration: Is it lasting longer than an expected short reaction?", "Distress: Does it feel hard to manage despite usual support?", "Function: Are work, school, relationships, sleep or self-care affected?", "Risk: Is there self-harm, aggression, overdose, severe withdrawal or inability to stay safe?"] },
      { heading: "When not to wait for an appointment", paragraphs: ["Call India emergency services on 112 or go to the nearest emergency department if someone has a current suicide plan or attempt, severe intoxication or overdose, seizure, violent behaviour, severe confusion, or cannot be kept safe. Tele-MANAS offers free 24/7 mental-health support on 14416.", "A clinic message may not be read immediately. Stay with a person at immediate risk if safe to do so and reduce access to dangerous means without putting yourself at risk." ] },
      { heading: "Preparing for the first visit", paragraphs: ["Bring a list or photos of current medicines, key medical reports, a brief timeline and questions you want answered. A trusted relative can help describe changes, but you can also ask for private conversation.", "The goal is not to judge your choices. Honest information about sleep, alcohol, cannabis, non-prescribed tablets and previous treatment helps the doctor recommend safer care." ] },
    ],
    faqs: [
      { question: "Do I need a referral?", answer: "A referral is not usually required for a private psychiatric consultation, but bring one if another doctor has provided it." },
      { question: "Does seeing a psychiatrist mean I will receive medication?", answer: "No. Assessment may lead to several options. Medication is one tool and should be used only when expected benefits justify it." },
      { question: "Can a family member consult first?", answer: "Families can seek guidance. The doctor cannot diagnose an absent person, but can discuss warning signs, communication and safe next steps." },
    ],
    internalLinks: [{ label: "Your first appointment", href: "/patient-journey" }, { label: "Psychiatric consultation", href: "/services/psychiatric-consultation" }, { label: "Request an appointment", href: "/appointment" }],
    references: commonReferences,
  },
  {
    title: "Depression or Sadness? How to Understand the Difference",
    slug: "depression-vs-sadness",
    description: "Sadness is human; depression is a wider pattern affecting body, thinking and function. Learn signs that deserve a professional assessment.",
    category: "Depression",
    publishedAt: "2026-05-24",
    updatedAt: "2026-07-28",
    readingMinutes: 6,
    lead: "Sadness usually responds to events and can sit alongside moments of connection. Depression tends to spread across the day, body and future, making ordinary tasks feel unusually hard.",
    takeaways: ["Depression is identified by a cluster and its impact—not one emotion.", "Physical illness and medicines can sometimes contribute.", "Suicidal thoughts require prompt, direct support."],
    sections: [
      { heading: "Look beyond mood alone", paragraphs: ["A person with depression may not say ‘I feel sad’. They may report fatigue, irritability, body pain, poor sleep, loss of interest, slowed thinking or a sense that they are failing their family.", "Symptoms often persist most days for at least two weeks, but severity and safety matter more than waiting for a date on the calendar."], bullets: ["Loss of interest or pleasure", "Low or irritable mood", "Sleep and appetite change", "Low energy or marked restlessness", "Poor concentration, guilt or hopelessness", "Thoughts of death or self-harm"] },
      { heading: "Context still matters", paragraphs: ["Grief, financial pressure, relationship conflict and illness can all cause deep sadness. A reaction to an event can still become clinically important when it is severe, prolonged or disabling.", "Thyroid problems, anaemia, vitamin deficiency, pain, neurological illness and some medicines can resemble or worsen depression. A medical review may be part of responsible psychiatric care." ] },
      { heading: "Treatment is not one-size-fits-all", paragraphs: ["Mild depression may improve with structured psychological treatment, activity, sleep support and follow-up. More severe, persistent or recurrent depression may benefit from medication alongside psychological and practical care.", "The plan should reflect prior response, health, pregnancy considerations, side effects, preferences and safety. Many people improve, but outcomes vary and ethical care avoids absolute promises." ] },
      { heading: "If hope is disappearing", paragraphs: ["Ask directly about suicide rather than avoiding the subject. If there is a plan, intent, recent attempt or inability to stay safe, call 112 or go to an emergency department now. Tele-MANAS is available on 14416." ] },
    ],
    faqs: [{ question: "Can someone look cheerful and still be depressed?", answer: "Yes. People may mask symptoms at work or around family. Ask about private experience and function rather than appearance alone." }, { question: "Is depression weakness?", answer: "No. It is a health condition shaped by biological, psychological and social factors." }, { question: "Does depression always need medicine?", answer: "No. Need depends on severity, duration, recurrence, safety and preference." }],
    internalLinks: [{ label: "Depression care guide", href: "/conditions/depression" }, { label: "Suicidal thoughts: urgent guidance", href: "/conditions/suicidal-thoughts" }, { label: "Book a consultation", href: "/appointment" }],
    references: commonReferences,
  },
  {
    title: "What Happens During a Panic Attack—and What Helps",
    slug: "panic-attack-what-happens-and-what-helps",
    description: "Understand racing heart, breathlessness and fear during panic, when medical assessment is urgent, and how panic disorder is treated.",
    category: "Anxiety",
    publishedAt: "2026-05-09",
    updatedAt: "2026-07-22",
    readingMinutes: 7,
    lead: "Panic can feel like a heart attack, suffocation or loss of control. The sensations are real: the body's alarm system has surged, even when no external danger is present.",
    takeaways: ["First-time or unusual chest symptoms may need urgent medical assessment.", "Forceful deep breathing can worsen over-breathing; use slower, gentler breaths.", "Avoidance and repeated checking can keep panic going."],
    sections: [
      { heading: "The alarm response", paragraphs: ["Adrenaline increases heart rate, breathing and muscle readiness. Faster breathing may lower carbon dioxide and contribute to tingling, dizziness, chest discomfort and unreality. These sensations are frightening but usually peak and settle.", "Panic disorder develops when attacks recur and fear of the next attack leads to scanning, reassurance-seeking or avoidance." ] },
      { heading: "Do not assume every symptom is panic", paragraphs: ["Seek urgent medical care for severe or new chest pain, fainting, persistent breathlessness, neurological symptoms, symptoms during exertion, or risk factors for a heart or lung condition. A previous panic diagnosis should not be used to dismiss a clearly different episode." ] },
      { heading: "What to do during a known panic episode", paragraphs: ["If a clinician has already ruled out urgent physical causes, try to stay where you are if safe, name the response, loosen tense muscles and allow the wave to pass rather than fighting it."], bullets: ["Breathe gently through the nose with a slightly longer exhale", "Place both feet on the floor and notice five neutral details around you", "Avoid repeated pulse checking or internet searching", "Remind yourself: ‘This is intense, not permanent’"] },
      { heading: "How treatment breaks the cycle", paragraphs: ["Panic-focused CBT and gradual exposure help the brain relearn that body sensations and avoided situations can be tolerated. Medication can help selected people, while dependence-prone calming medicines need caution.", "Recovery means returning to valued activities—not arranging life to guarantee that anxiety never appears." ] },
    ],
    faqs: [{ question: "Can panic attacks harm the heart?", answer: "Panic itself is usually time-limited, but chest symptoms should be medically assessed when new, severe or atypical." }, { question: "Should I take deep breaths?", answer: "Very large or rapid breaths can worsen over-breathing. Aim for quiet, slow and comfortable breathing." }, { question: "Can panic disorder improve?", answer: "Yes. Many people improve substantially with targeted therapy, gradual exposure and appropriate medication when needed." }],
    internalLinks: [{ label: "Panic disorder", href: "/conditions/panic-disorder" }, { label: "Anxiety", href: "/conditions/anxiety" }, { label: "Consultation", href: "/appointment" }],
    references: commonReferences,
  },
  {
    title: "OCD Is More Than Cleanliness: Hidden Symptoms Explained",
    slug: "ocd-more-than-cleanliness",
    description: "Learn how intrusive thoughts, checking, mental rituals and reassurance can be part of OCD—and why thoughts do not define character.",
    category: "OCD",
    publishedAt: "2026-04-19",
    updatedAt: "2026-07-18",
    readingMinutes: 7,
    lead: "OCD is often hidden because its thoughts feel shameful and some compulsions happen entirely in the mind. A person may know the fear is excessive and still feel unable to stop the ritual.",
    takeaways: ["Intrusive thoughts are unwanted and do not equal intention.", "Reassurance can give short relief while strengthening the cycle.", "Exposure and Response Prevention is a first-line psychological treatment."],
    sections: [
      { heading: "Obsessions and compulsions", paragraphs: ["Obsessions are repeated unwanted thoughts, images, doubts or urges. Compulsions are behaviours or mental acts done to reduce distress or prevent a feared outcome.", "Common themes include contamination, harm, religion, sexuality, relationships, mistakes, symmetry and responsibility." ] },
      { heading: "Mental rituals can be easy to miss", paragraphs: ["Repeated reviewing, silent praying, replacing a ‘bad’ thought with a ‘good’ one, checking feelings and seeking certainty online may function like visible washing or checking.", "The problem is not the presence of a strange thought—most people have them. OCD attaches importance to the thought and demands certainty." ] },
      { heading: "Why reassurance has limits", paragraphs: ["Family reassurance may calm anxiety for minutes, but the brain learns to ask again. Family guidance helps relatives validate distress while gradually stepping out of rituals in a planned, compassionate way." ] },
      { heading: "Treatment and hope", paragraphs: ["ERP carefully approaches triggers while reducing rituals. It is collaborative and graded, not forced exposure. Certain antidepressant medicines can also reduce symptoms; choice and monitoring are individual.", "People deserve to describe private thoughts without moral judgement. Risk assessment distinguishes unwanted OCD thoughts from actual intent." ] },
    ],
    faqs: [{ question: "Do violent intrusive thoughts mean I am dangerous?", answer: "Unwanted, distressing OCD thoughts do not by themselves mean intent. A clinician can assess the pattern safely and without judgement." }, { question: "Is OCD just perfectionism?", answer: "No. Preference for order is different from intrusive fear and rituals that consume time or impair life." }, { question: "Can family members join treatment?", answer: "Yes. With consent, family guidance can reduce accommodation and support gradual change." }],
    internalLinks: [{ label: "OCD guide", href: "/conditions/ocd" }, { label: "Family counselling", href: "/services/family-counselling" }, { label: "Request an appointment", href: "/appointment" }],
    references: commonReferences,
  },
  {
    title: "How to Talk to Someone Who May Be Experiencing Psychosis",
    slug: "how-to-talk-to-someone-experiencing-psychosis",
    description: "A calm, practical family guide to voices, suspicious beliefs, confusion and urgent warning signs in psychosis.",
    category: "For families",
    publishedAt: "2026-04-04",
    updatedAt: "2026-07-14",
    readingMinutes: 8,
    lead: "When a person hears voices or holds a belief you do not share, arguing often increases fear. You can acknowledge the distress without confirming or mocking the belief.",
    takeaways: ["Stay calm, use short sentences and reduce stimulation.", "Validate the feeling without agreeing with an unshared belief.", "Sudden confusion, violence risk or inability to care for basic needs requires urgent assessment."],
    sections: [
      { heading: "Start with safety and connection", paragraphs: ["Approach from the front, give personal space and speak with one person at a time. Turn off unnecessary noise and avoid a crowd. Ask what would help the person feel safer.", "Try: ‘I can see this is frightening. I do not hear the voice, but I believe that you are hearing it.’" ] },
      { heading: "What usually makes the situation harder", paragraphs: ["Do not laugh, challenge the person to prove the belief, threaten, corner or suddenly touch them. Long logical arguments are rarely useful during intense symptoms.", "Do not secretly add medicine to food. It damages trust and can be medically unsafe." ] },
      { heading: "Encourage assessment", paragraphs: ["Focus on shared problems such as sleep, fear or eating rather than insisting on a label. Offer choices where possible: who comes, how to travel and what question to ask.", "Early psychosis can have psychiatric, substance-related, neurological or medical causes. A clinician must assess rather than assume schizophrenia." ] },
      { heading: "Emergency warning signs", paragraphs: ["Call 112 or go to an emergency department if there is immediate danger, severe aggression, inability to drink or eat, overdose, seizure, fever with confusion, or voices commanding serious harm. Do not place yourself in danger.", "After the acute crisis, family education, regular sleep, substance avoidance, medication review and meaningful rehabilitation all support recovery." ] },
    ],
    faqs: [{ question: "Should I agree with a delusion to keep the peace?", answer: "You can validate fear without confirming the belief: ‘That sounds frightening; I see it differently, and I want to help you feel safe.’" }, { question: "Is every person with psychosis dangerous?", answer: "No. Most are not violent and may be more vulnerable themselves. Assess specific behaviour and risk rather than stereotypes." }, { question: "Can lack of sleep cause psychotic symptoms?", answer: "Severe sleep loss can contribute, but new psychotic symptoms still need proper assessment." }],
    internalLinks: [{ label: "Psychosis guide", href: "/conditions/psychosis" }, { label: "Schizophrenia", href: "/conditions/schizophrenia" }, { label: "Emergency guidance", href: "/emergency" }],
    references: commonReferences,
  },
  {
    title: "Why Stopping Alcohol Suddenly Can Be Dangerous",
    slug: "alcohol-withdrawal-safety",
    description: "Heavy or dependent alcohol use can cause dangerous withdrawal. Learn warning signs and why a medically planned approach matters.",
    category: "Addiction",
    publishedAt: "2026-03-21",
    updatedAt: "2026-07-10",
    readingMinutes: 7,
    lead: "For a person with physical alcohol dependence, suddenly stopping is not always the safest option. Withdrawal can progress from tremor and sweating to seizures or severe confusion.",
    takeaways: ["Do not attempt unsupervised sudden withdrawal after heavy regular use.", "Past withdrawal seizures or delirium greatly increase concern.", "Detoxification is a beginning, not the whole recovery plan."],
    sections: [
      { heading: "Why withdrawal happens", paragraphs: ["The brain adapts to repeated alcohol. When alcohol is removed, the nervous system can become overactive. Risk depends on amount, regularity, last drink, past withdrawal and physical health." ] },
      { heading: "Warning signs", paragraphs: ["Symptoms may begin within hours and can change quickly. A person should not drive or stay alone when significant withdrawal is possible."], bullets: ["Shaking, sweating, nausea and racing heart", "Severe anxiety, agitation or no sleep", "Seeing or hearing things", "Seizure", "Confusion, disorientation or fever"] },
      { heading: "When emergency care is needed", paragraphs: ["Seizure, hallucinations, severe confusion, collapse, chest pain, repeated vomiting or inability to keep fluids down needs urgent medical care. Call 112 or go to the nearest emergency department.", "Do not give sedatives or someone else's prescription. Mixing alcohol with sedatives can suppress breathing." ] },
      { heading: "Recovery after withdrawal", paragraphs: ["Medical detoxification treats the immediate withdrawal risk. Ongoing care may include anti-craving medication, motivational treatment, family guidance, physical-health care and a relapse plan.", "A lapse should lead to rapid support and learning, not shame. The safest plan is individual and may involve outpatient, inpatient or rehabilitation services." ] },
    ],
    faqs: [{ question: "Can I taper alcohol at home?", answer: "Do not create a home taper without medical advice. Alcohol strength and intake are unreliable, and withdrawal risk can be difficult to predict." }, { question: "Who is at higher risk?", answer: "People with past seizures or delirium, heavy daily use, serious medical illness, older age, pregnancy or sedative use need particular caution." }, { question: "Is detox a cure?", answer: "No. It treats withdrawal. Relapse prevention and treatment of underlying drivers should follow." }],
    internalLinks: [{ label: "Alcohol addiction care", href: "/conditions/alcohol-addiction" }, { label: "De-addiction service", href: "/services/de-addiction" }, { label: "Urgent guidance", href: "/emergency" }],
    references: commonReferences,
  },
  {
    title: "A Better Way to Think About Chronic Insomnia",
    slug: "chronic-insomnia-guide",
    description: "Why chronic insomnia is not solved by sleep hygiene alone, how CBT-I works, and when snoring or daytime sleepiness needs medical review.",
    category: "Sleep",
    publishedAt: "2026-03-08",
    updatedAt: "2026-07-05",
    readingMinutes: 8,
    lead: "After weeks of poor sleep, bed itself can become a place of monitoring and effort. Chronic insomnia is treatable, but forcing sleep often keeps the cycle active.",
    takeaways: ["A consistent wake time is usually more useful than an early forced bedtime.", "CBT-I is a first-line treatment for chronic insomnia.", "Snoring with choking or dangerous daytime sleepiness needs medical assessment."],
    sections: [
      { heading: "What keeps insomnia going", paragraphs: ["Stress or illness may trigger a few bad nights. Then extra time in bed, irregular waking, naps, clock-checking and worry can weaken sleep drive and connect bed with alertness.", "This is not the person's fault. It is a learned pattern that can be changed." ] },
      { heading: "What CBT-I does", paragraphs: ["Cognitive behavioural therapy for insomnia uses a sleep diary, consistent timing, stimulus control, carefully planned time in bed and work with sleep-related fear. It is more structured than generic relaxation advice.", "Time-in-bed changes should be adapted for safety, especially in bipolar disorder, epilepsy, pregnancy, older age or jobs involving driving." ] },
      { heading: "Medicines and substances", paragraphs: ["Caffeine can affect sleep many hours later. Alcohol may bring drowsiness but fragments sleep. Some calming or sleeping medicines can cause tolerance, falls, memory problems or dependence.", "Medication can be appropriate for selected people, but the reason, duration and exit plan should be clear." ] },
      { heading: "Look for another sleep disorder", paragraphs: ["Loud snoring, breathing pauses, morning headache, restless legs, unusual night behaviours or uncontrollable daytime sleepiness need focused assessment. Falling asleep while driving is an urgent safety issue." ] },
    ],
    faqs: [{ question: "Should I go to bed earlier after a bad night?", answer: "Often this adds awake time in bed. Keep a stable wake time and seek individual guidance for a structured schedule." }, { question: "Are sleeping tablets always bad?", answer: "No, but they should have a clear indication, monitoring and duration. Risks differ by medicine and person." }, { question: "Can anxiety and depression cause insomnia?", answer: "Yes, and insomnia can also worsen them. Both parts may need treatment." }],
    internalLinks: [{ label: "Sleep disorders", href: "/conditions/sleep-disorders" }, { label: "Sleep clinic", href: "/services/sleep-clinic" }, { label: "Request a sleep consultation", href: "/appointment" }],
    references: commonReferences,
  },
  {
    title: "When Should a Child See a Psychiatrist?",
    slug: "when-should-a-child-see-a-psychiatrist",
    description: "A parent-friendly guide to emotional, behavioural, school and developmental changes that may deserve child psychiatry assessment.",
    category: "Children & teens",
    publishedAt: "2026-02-22",
    updatedAt: "2026-06-29",
    readingMinutes: 8,
    lead: "Children often show distress through sleep, behaviour, body complaints and school changes rather than through adult words. Context, age and duration matter.",
    takeaways: ["One behaviour in one setting rarely tells the full story.", "Assessment looks at strengths, development, family, school and health.", "Self-harm talk, severe regression or unsafe behaviour needs prompt action."],
    sections: [
      { heading: "Patterns worth noticing", paragraphs: ["Many changes are temporary responses to illness, exams or family transition. Concern rises when a pattern is intense for age, continues, occurs across settings or blocks development."], bullets: ["Persistent sadness, fear, irritability or withdrawal", "School refusal or sudden academic decline", "Frequent severe aggression or tantrums", "Attention, language, learning or social-communication concerns", "Major sleep, eating or toileting change", "Talk of death, self-harm or running away"] },
      { heading: "What assessment involves", paragraphs: ["Parents describe development, routines, health, school and behaviour. The child is seen in an age-appropriate way. Teacher information can help with consent because a child may function differently at school.", "The clinician considers hearing, vision, sleep, learning, ADHD, autism, anxiety, trauma, mood and family stress rather than jumping to a label." ] },
      { heading: "Parents are part of treatment", paragraphs: ["Parent guidance may focus on connection, predictable routines, clear instructions and calm consequences. School supports or specialist psychological, speech-language or educational assessments may be recommended.", "Medication is not automatic. When considered, target symptoms, alternatives, side effects and monitoring should be explained." ] },
      { heading: "Safety comes first", paragraphs: ["Take self-harm statements seriously and ask directly. Immediate danger, overdose, severe violence, psychosis or inability to keep the child safe requires emergency assessment." ] },
    ],
    faqs: [{ question: "Will the doctor blame our parenting?", answer: "Good assessment avoids blame. Parenting patterns may be discussed because they are changeable supports, not because parents caused every difficulty." }, { question: "Should I tell the child about the appointment?", answer: "Use simple, non-stigmatising language: ‘We are meeting someone who helps children with worries, sleep, learning and big feelings.’" }, { question: "Should we bring school reports?", answer: "Yes, if available. Do not delay urgent care to collect paperwork." }],
    internalLinks: [{ label: "Child psychiatry", href: "/conditions/child-psychiatry" }, { label: "ADHD", href: "/conditions/adhd" }, { label: "Child psychiatry service", href: "/services/child-psychiatry" }],
    references: commonReferences,
  },
  {
    title: "ADHD Assessment: What Children and Adults Can Expect",
    slug: "adhd-assessment-what-to-expect",
    description: "ADHD diagnosis requires developmental history, cross-setting impairment and careful exclusion of sleep, mood, learning and medical causes.",
    category: "ADHD",
    publishedAt: "2026-02-08",
    updatedAt: "2026-06-22",
    readingMinutes: 7,
    lead: "ADHD cannot be confirmed by one online quiz, one difficult school term or the ability to focus on a favourite activity. A proper assessment looks across development and settings.",
    takeaways: ["Symptoms begin in development even if recognised later.", "Sleep, anxiety, depression, learning and substances can resemble ADHD.", "Treatment includes systems and skills—not medication alone."],
    sections: [
      { heading: "What clinicians look for", paragraphs: ["ADHD involves persistent difficulty regulating attention, activity or impulses that causes impairment in more than one context. The same person may focus intensely on high-interest tasks and struggle with low-reward tasks.", "Adults may describe chronic lateness, unfinished tasks, financial disorganisation, impulsive decisions or effortful compensation." ] },
      { heading: "Information across time and settings", paragraphs: ["Childhood reports, family observations, school or work examples and rating scales can contribute. Rating scales support clinical judgement; they do not diagnose on their own.", "The clinician asks when symptoms began and whether they occur outside a single stressful environment." ] },
      { heading: "Alternative and coexisting explanations", paragraphs: ["Poor sleep, anxiety, depression, trauma, learning disorder, autism, thyroid problems, medication effects and substance use can look similar or coexist. Treating only attention without this context can miss the real need." ] },
      { heading: "A layered treatment plan", paragraphs: ["External reminders, visible routines, breaking work into short steps, parent or adult coaching and school or workplace supports can reduce impairment. Medication may be considered after health and risk screening and requires regular review.", "The goal is not to change personality. It is to make attention and impulse regulation less costly so strengths are easier to use." ] },
    ],
    faqs: [{ question: "Can adults be diagnosed with ADHD?", answer: "Yes, if evidence shows the pattern began in development and now causes impairment. Recognition may occur later when demands increase." }, { question: "Does screen use cause ADHD?", answer: "Screens can affect sleep and attention habits, but they do not alone explain the neurodevelopmental condition." }, { question: "Is medication the only treatment?", answer: "No. Practical systems, behavioural strategies and environmental supports are important with or without medication." }],
    internalLinks: [{ label: "ADHD guide", href: "/conditions/adhd" }, { label: "Learning disorders", href: "/conditions/learning-disorders" }, { label: "Book an assessment", href: "/appointment" }],
    references: commonReferences,
  },
  {
    title: "Baby Blues, Postpartum Depression or Postpartum Psychosis?",
    slug: "baby-blues-postpartum-depression-psychosis",
    description: "Understand common baby blues, treatable postpartum depression and emergency signs of postpartum psychosis after childbirth.",
    category: "Women's mental health",
    publishedAt: "2026-01-25",
    updatedAt: "2026-06-15",
    readingMinutes: 8,
    lead: "Emotional change after birth is common, but severity and pattern matter. Postpartum psychosis is rare and urgent; postpartum depression is more common and treatable.",
    takeaways: ["Baby blues usually peak in the first days and improve within about two weeks.", "Persistent low mood, anxiety or inability to function deserves assessment.", "Confusion, no need for sleep, unusual beliefs or voices after birth is an emergency."],
    sections: [
      { heading: "Baby blues", paragraphs: ["Tearfulness, sensitivity and overwhelm often begin a few days after delivery and improve with rest, food, reassurance and practical support. Symptoms should not involve severe loss of function, psychosis or ongoing suicidal intent." ] },
      { heading: "Postpartum depression and anxiety", paragraphs: ["Symptoms can include sadness, irritability, guilt, panic, intrusive thoughts, disconnection and sleep difficulty even when the baby sleeps. A parent may appear capable while suffering privately.", "Intrusive unwanted thoughts can occur in postpartum anxiety or OCD and are different from intent, but a professional should assess safety and distress." ] },
      { heading: "Postpartum psychosis", paragraphs: ["Warning signs include extreme energy, little or no need for sleep, severe confusion, rapidly changing mood, suspiciousness, unusual beliefs, voices or markedly disorganised behaviour. Risk can change quickly.", "Do not leave the parent alone with the baby if safety is uncertain. Call 112 or go to an emergency department now. A routine clinic message is not enough." ] },
      { heading: "Treatment can protect the whole family", paragraphs: ["Care may include urgent stabilisation, sleep protection, psychological support, medication and coordination with obstetric or paediatric care. Breastfeeding and medication decisions require individual benefit–risk discussion—not guilt or blanket rules.", "Partners and family can take over practical tasks, protect rest and respond without blaming the parent." ] },
    ],
    faqs: [{ question: "Does postpartum depression mean I am a bad mother?", answer: "No. It is a health condition. Seeking help is a protective parenting action." }, { question: "Can fathers or partners have postpartum depression?", answer: "Yes. Non-birthing parents can also experience significant depression and anxiety after a baby arrives." }, { question: "Can treatment be used while breastfeeding?", answer: "Often yes. Options depend on symptoms, medicine, infant factors and feeding goals and should be discussed individually." }],
    internalLinks: [{ label: "Postpartum depression", href: "/conditions/postpartum-depression" }, { label: "Women's mental health", href: "/conditions/womens-mental-health" }, { label: "Emergency guidance", href: "/emergency" }],
    references: commonReferences,
  },
  {
    title: "Normal Ageing or a Memory Problem? Signs to Notice",
    slug: "normal-ageing-or-memory-problem",
    description: "Learn which everyday memory lapses may be common and which changes in judgement, navigation or independence deserve assessment.",
    category: "Memory & ageing",
    publishedAt: "2026-01-11",
    updatedAt: "2026-06-08",
    readingMinutes: 7,
    lead: "Occasionally forgetting a name and recalling it later is different from repeatedly missing medicines, getting lost or losing the ability to manage familiar tasks.",
    takeaways: ["Change from the person's own baseline matters more than age alone.", "Depression, sleep and medicines can affect memory.", "Sudden confusion over hours or days is urgent."],
    sections: [
      { heading: "Changes that deserve attention", paragraphs: ["Concern rises when memory or thinking problems are progressive, noticed by others or affect safe independent living."], bullets: ["Repeating the same questions", "Medication or money mistakes", "Getting lost in familiar places", "Difficulty using familiar appliances", "Major judgement or personality change", "Increasing need for supervision"] },
      { heading: "Not every memory problem is dementia", paragraphs: ["Poor sleep, depression, anxiety, alcohol, hearing loss, pain and many medicines can reduce attention and recall. Thyroid, vitamin and other medical issues may contribute.", "A careful assessment looks for reversible factors while also considering mild cognitive impairment and different causes of dementia." ] },
      { heading: "What an assessment may include", paragraphs: ["The clinician takes history from the person and, with consent, someone who knows them well. Cognitive screening, functional review, physical examination, blood tests and brain imaging may be recommended depending on the pattern.", "Bring the full medicine list, including over-the-counter sleep or allergy tablets." ] },
      { heading: "Sudden confusion is different", paragraphs: ["Confusion that develops over hours or days, especially with fever, new weakness, fall, seizure, hallucinations or marked drowsiness, may be delirium. Seek urgent medical evaluation rather than assuming dementia." ] },
    ],
    faqs: [{ question: "Is memory loss a normal part of ageing?", answer: "Minor retrieval changes can occur, but loss of independence, navigation or judgement is not something to dismiss as normal." }, { question: "Can depression affect memory?", answer: "Yes. Depression can reduce concentration and recall, and it can coexist with cognitive illness." }, { question: "Should family attend?", answer: "With the person's consent, a family member can describe changes and help with the medicine list and safety context." }],
    internalLinks: [{ label: "Memory problems", href: "/conditions/memory-problems" }, { label: "Dementia", href: "/conditions/dementia" }, { label: "Old age psychiatry", href: "/conditions/old-age-psychiatry" }],
    references: commonReferences,
  },
  {
    title: "Psychiatric Medication: Seven Questions Worth Asking",
    slug: "questions-before-psychiatric-medication",
    description: "A shared-decision guide to the goal, benefits, side effects, monitoring, duration and safe stopping of psychiatric medication.",
    category: "Treatment",
    publishedAt: "2025-12-28",
    updatedAt: "2026-06-01",
    readingMinutes: 7,
    lead: "Good prescribing is a conversation. You should understand what a medicine is targeting, what benefit to look for, what needs monitoring and what the longer-term plan may be.",
    takeaways: ["Know the target symptom and expected time to benefit.", "The lowest effective dose is not always the lowest available dose.", "Never stop abruptly without advice."],
    sections: [
      { heading: "Questions to take into the consultation", paragraphs: ["Write these questions down or ask a family member to help note answers. Not every answer is certain at the beginning, but the plan should be understandable."], bullets: ["What symptom or risk is this medicine intended to improve?", "How soon might benefit appear?", "Which common and serious side effects should I know?", "Does it interact with my other medicines, alcohol or pregnancy plans?", "Do I need blood pressure, weight, blood tests or an ECG?", "How and when will we review whether it is working?", "If I later stop, what would a safe taper involve?"] },
      { heading: "What ‘lowest effective dose’ means", paragraphs: ["The aim is not the smallest number at any cost. It is enough treatment to achieve the agreed clinical goal with an acceptable burden. Too little treatment can leave serious illness active; too much can add side effects without benefit.", "Dose decisions differ for acute episodes, maintenance, age, liver or kidney health and other medicines." ] },
      { heading: "Side effects are data, not a reason for silence", paragraphs: ["Report side effects early. Timing, dose adjustment, switching or physical-health support may help. Some symptoms need urgent advice, while others settle.", "Do not share psychiatric medicine or use someone else's prescription." ] },
      { heading: "Stopping safely", paragraphs: ["Abrupt stopping can cause withdrawal symptoms or relapse, depending on the medicine and condition. A taper should consider duration, dose, past relapse and current stress. Shared review is not unnecessary dependence; it is safer medicine use." ] },
    ],
    faqs: [{ question: "Are all psychiatric medicines addictive?", answer: "No. Some sedative medicines have dependence risk; many antidepressants or antipsychotics are not addictive, though abrupt stopping can still cause problems." }, { question: "Will I need medicine forever?", answer: "Not necessarily. Duration depends on diagnosis, episode history, risk and response and should be reviewed." }, { question: "Can I take herbal remedies too?", answer: "Tell your doctor. ‘Natural’ products can have side effects or interactions and product strength may vary." }],
    internalLinks: [{ label: "Medication management", href: "/services/medication-management" }, { label: "Treatment approach", href: "/treatments" }, { label: "Frequently asked questions", href: "/faqs" }],
    references: commonReferences,
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
