export type ConditionCategory =
  | "Mood & anxiety"
  | "Thought & perception"
  | "Addiction"
  | "Sleep & stress"
  | "Memory & ageing"
  | "Children & adolescents"
  | "Life stages & relationships";

export type Condition = {
  name: string;
  slug: string;
  category: ConditionCategory;
  summary: string;
  overview: string;
  symptoms: string[];
  causes: string[];
  riskFactors: string[];
  diagnosis: string;
  treatments: { title: string; description: string }[];
  whenToConsult: string[];
  earlyTreatment: string;
  faqs: { question: string; answer: string }[];
  related: string[];
  urgent?: boolean;
  ageNote?: string;
};

type ConditionSeed = Omit<
  Condition,
  "whenToConsult" | "earlyTreatment" | "faqs"
> & {
  whenToConsult?: string[];
  earlyTreatment?: string;
  faqs?: { question: string; answer: string }[];
};

const commonWhenToConsult = (name: string) => [
  `Symptoms linked with ${name.toLowerCase()} are continuing, returning, or becoming harder to manage.`,
  "Sleep, studies, work, relationships, self-care, or physical health are being affected.",
  "You are relying on alcohol, tobacco, non-prescribed medicines, or other substances to cope.",
  "You or your family are worried about safety, major behaviour change, or loss of day-to-day functioning.",
];

function createCondition(seed: ConditionSeed): Condition {
  return {
    ...seed,
    whenToConsult: seed.whenToConsult || commonWhenToConsult(seed.name),
    earlyTreatment:
      seed.earlyTreatment ||
      `Early assessment can clarify what is happening, rule out medical causes, reduce disruption and help you begin the least intensive effective care. Treatment for ${seed.name.toLowerCase()} is personalised; progress may take time, but support can improve function, confidence and quality of life.`,
    faqs:
      seed.faqs ||
      [
        {
          question: `Is ${seed.name.toLowerCase()} treatable?`,
          answer: `Many people improve with the right combination of education, practical changes, psychological support and, when clinically appropriate, medication. The plan depends on symptoms, health, preferences and goals. Outcomes vary, and responsible care avoids absolute promises.`,
        },
        {
          question: "Will I need medication for life?",
          answer:
            "Not necessarily. The need, dose and duration vary. Medication is prescribed only when the expected benefit outweighs risk, reviewed regularly and kept to the lowest effective amount when appropriate. Never stop psychiatric medicine suddenly without medical advice.",
        },
        {
          question: "What happens at the first appointment?",
          answer:
            "The psychiatrist listens to your concerns, timeline, sleep, physical health, current medicines and life context. You can bring a trusted family member if you wish. Assessment does not automatically mean medication.",
        },
      ],
  };
}

export const conditions: Condition[] = [
  createCondition({
    name: "Depression",
    slug: "depression",
    category: "Mood & anxiety",
    summary:
      "Persistent low mood or loss of interest can affect sleep, energy, thinking and hope. Depression is a health condition—not a personal failure.",
    overview:
      "Depression is more than a difficult day. It involves a pattern of emotional, physical and thinking changes that lasts and interferes with life. It can be mild or severe, occur once or recur, and often improves with timely, evidence-based care.",
    symptoms: [
      "Low, empty or irritable mood most days",
      "Loss of interest or pleasure",
      "Low energy, slowed activity or restlessness",
      "Sleep or appetite changes",
      "Poor concentration, guilt or hopelessness",
      "Thoughts of death or self-harm",
    ],
    causes: [
      "A combination of biological vulnerability and life stress",
      "Grief, conflict, isolation, financial or work pressure",
      "Physical illness, pain, hormonal change or some medicines",
      "Postpartum, perimenopausal or other life-stage changes",
    ],
    riskFactors: [
      "Personal or family history of depression",
      "Trauma or sustained stress",
      "Chronic illness or poor sleep",
      "Alcohol or substance use",
    ],
    diagnosis:
      "Diagnosis is based on a careful clinical interview: symptoms, duration, effect on daily life, safety, medical history and medicines. Physical examination or tests may be advised when thyroid, anaemia, vitamin deficiency or another medical cause is possible.",
    treatments: [
      { title: "Understanding the pattern", description: "Psychoeducation and a shared plan reduce confusion and self-blame." },
      { title: "Psychological therapy", description: "Approaches such as CBT, behavioural activation and supportive therapy can build useful skills." },
      { title: "Medication when indicated", description: "Antidepressants may be considered for moderate, severe or persistent symptoms and are monitored for benefit and side effects." },
      { title: "Rhythm and support", description: "Sleep, movement, nutrition, meaningful activity and family support are part of recovery—not substitutes for needed care." },
    ],
    related: ["anxiety", "sleep-disorders", "stress", "suicidal-thoughts"],
    urgent: true,
  }),
  createCondition({
    name: "Anxiety",
    slug: "anxiety",
    category: "Mood & anxiety",
    summary:
      "When worry and physical tension feel difficult to control, structured treatment can help restore calm and confidence.",
    overview:
      "Anxiety is a normal alarm system, but it becomes a clinical concern when fear or worry is excessive, persistent, hard to control and limits everyday life. Different anxiety disorders can overlap, so assessment matters.",
    symptoms: [
      "Constant worry or expecting the worst",
      "Restlessness, irritability or feeling on edge",
      "Racing heart, sweating, trembling or stomach discomfort",
      "Muscle tension, headache or fatigue",
      "Poor sleep or concentration",
      "Avoiding places, people or responsibilities",
    ],
    causes: [
      "Temperament and inherited vulnerability",
      "Stressful experiences, uncertainty or major change",
      "Learned patterns of threat and avoidance",
      "Thyroid problems, stimulants, caffeine or some medicines",
    ],
    riskFactors: ["Family history", "Trauma", "Chronic stress", "Poor sleep or high stimulant use"],
    diagnosis:
      "A psychiatrist explores the kind of worry, triggers, physical symptoms, avoidance and impact. Medical causes and related conditions such as depression, panic, OCD or substance use are considered.",
    treatments: [
      { title: "Skills-based therapy", description: "CBT, graded exposure and relaxation skills help change the anxiety–avoidance cycle." },
      { title: "Medication if helpful", description: "Options are selected carefully based on severity, health and dependence risk." },
      { title: "Sleep and stimulant review", description: "Reducing caffeine, improving sleep and pacing demands can lower the body's alarm load." },
      { title: "Relapse plan", description: "Recognising early signs and continuing learned skills can protect progress." },
    ],
    related: ["panic-disorder", "ocd", "stress", "sleep-disorders"],
  }),
  createCondition({
    name: "Panic Disorder",
    slug: "panic-disorder",
    category: "Mood & anxiety",
    summary:
      "Repeated panic attacks can feel dangerous, even when tests are normal. The cycle is real—and it can be treated.",
    overview:
      "A panic attack is a sudden surge of intense fear with strong body symptoms. Panic disorder involves repeated unexpected attacks and ongoing fear or avoidance because another attack might happen.",
    symptoms: ["Sudden racing heart or chest tightness", "Breathlessness or choking sensation", "Dizziness, shaking or sweating", "Fear of dying, fainting or losing control", "Feeling unreal or detached", "Avoiding travel, crowds or being alone"],
    causes: ["An over-sensitive fight-or-flight response", "Stress or illness around the first attack", "Fearful interpretation of normal body sensations", "Caffeine, stimulants or substance withdrawal"],
    riskFactors: ["Family history of panic", "Anxiety sensitivity", "Major stress", "Smoking or high caffeine intake"],
    diagnosis:
      "Because chest pain and breathlessness can have medical causes, urgent or first-time severe symptoms may need medical evaluation. Psychiatric assessment then examines attack pattern, anticipatory fear and avoidance.",
    treatments: [
      { title: "Panic-focused CBT", description: "Learn what body sensations mean and gradually reduce fear and avoidance." },
      { title: "Breathing retraining", description: "Gentle, regular breathing—not forceful deep breathing—can reduce over-breathing." },
      { title: "Medication when appropriate", description: "Longer-term non-addictive options may help; habit-forming medicines require particular caution." },
      { title: "Exposure and recovery plan", description: "Step-by-step return to avoided activities rebuilds trust in the body." },
    ],
    related: ["anxiety", "depression", "stress", "sleep-disorders"],
  }),
  createCondition({
    name: "Obsessive-Compulsive Disorder (OCD)",
    slug: "ocd",
    category: "Mood & anxiety",
    summary:
      "Unwanted thoughts and repeated rituals can consume time and cause distress. OCD is not a character flaw or a preference for neatness.",
    overview:
      "OCD involves intrusive, unwanted thoughts, images or urges (obsessions) and repetitive actions or mental rituals (compulsions) performed to reduce distress. People often recognise that the cycle is excessive but still feel trapped by it.",
    symptoms: ["Contamination fears and repeated washing", "Doubts and repeated checking", "Need for symmetry or exactness", "Unwanted aggressive, sexual or religious thoughts", "Counting, repeating, praying or reassurance seeking", "Rituals taking significant time or limiting life"],
    causes: ["Brain circuits involved in error detection and habit", "Genetic vulnerability", "Learning that rituals temporarily reduce anxiety", "Stress can worsen symptoms but is not the only cause"],
    riskFactors: ["Family history", "Childhood or early adult onset", "Tic disorders", "High responsibility beliefs or intolerance of uncertainty"],
    diagnosis:
      "The clinician asks about private thoughts without judgement, distinguishes OCD from ordinary habits or psychosis, measures time and impairment, and checks for depression, tics and safety concerns.",
    treatments: [
      { title: "ERP", description: "Exposure and Response Prevention gradually faces triggers while reducing rituals; it is a first-line psychological treatment." },
      { title: "CBT and education", description: "Understand how reassurance and avoidance keep the cycle going." },
      { title: "Medication", description: "Certain antidepressants can reduce OCD symptoms, often with careful dose and duration review." },
      { title: "Family guidance", description: "Families learn to support the person without becoming part of rituals." },
    ],
    related: ["anxiety", "depression", "personality-disorders", "child-psychiatry"],
  }),
  createCondition({
    name: "Bipolar Disorder",
    slug: "bipolar-disorder",
    category: "Mood & anxiety",
    summary:
      "Bipolar disorder causes distinct episodes of unusually elevated or irritable mood and often depression. Stable, meaningful life is possible with ongoing care.",
    overview:
      "Bipolar disorder is an episodic mood condition. Mania or hypomania is different from ordinary happiness: sleep, judgement, speech, energy and behaviour change noticeably. Accurate diagnosis matters because treatment differs from depression alone.",
    symptoms: ["Much less need for sleep without feeling tired", "Unusually fast speech, racing thoughts or distractibility", "Marked confidence, irritability or increased activity", "Risky spending, driving, sexual or business decisions", "Periods of depression, low energy or hopelessness", "Clear change from the person's usual functioning"],
    causes: ["Strong genetic and biological vulnerability", "Sleep disruption or major stress can trigger episodes", "Postpartum hormonal and sleep changes", "Some substances or medicines can mimic or trigger mood elevation"],
    riskFactors: ["Close relative with bipolar disorder", "Past hypomanic or manic symptoms", "Postpartum period", "Substance use or repeated sleep loss"],
    diagnosis:
      "Diagnosis uses a detailed lifetime timeline, collateral history from a trusted person when permitted, medicine and substance review, and checks for thyroid, neurological or other causes. One brief mood change is not enough for diagnosis.",
    treatments: [
      { title: "Mood-stabilising treatment", description: "Medication is usually central and selected according to episode type, health and pregnancy considerations." },
      { title: "Sleep and routine protection", description: "Regular sleep and early response to warning signs help reduce relapse risk." },
      { title: "Psychological and family support", description: "Education, therapy and a shared crisis plan improve recognition and coping." },
      { title: "Long-term review", description: "Benefits, side effects, blood tests where needed and goals are reviewed together." },
    ],
    related: ["depression", "psychosis", "sleep-disorders", "postpartum-depression"],
    urgent: true,
  }),
  createCondition({
    name: "Schizophrenia",
    slug: "schizophrenia",
    category: "Thought & perception",
    summary:
      "Schizophrenia can affect perception, beliefs, thinking and motivation. Early, respectful treatment supports safety, functioning and recovery.",
    overview:
      "Schizophrenia is a long-term psychiatric condition with varied experiences. It does not mean a 'split personality', and most people are not violent. Care should protect dignity, involve family with consent and focus on the person's own life goals.",
    symptoms: ["Hearing or seeing things others do not", "Strong beliefs not shared by others", "Disorganised speech or behaviour", "Reduced motivation, expression or social connection", "Difficulty concentrating or planning", "Decline in self-care, work or studies"],
    causes: ["Interaction of genetic and developmental factors", "Differences in brain signalling", "Stress may trigger symptoms in a vulnerable person", "Cannabis or other substances can increase psychosis risk"],
    riskFactors: ["Family history of psychosis", "Previous psychotic episode", "Substance use", "Major sleep loss or stopping treatment abruptly"],
    diagnosis:
      "Assessment includes the person's experiences, functioning and physical health, usually with family input when consented. Substance, mood, neurological and medical causes must be considered before diagnosis is confirmed over time.",
    treatments: [
      { title: "Antipsychotic medication", description: "Chosen collaboratively and monitored for symptom benefit, movement effects, weight, sugar and lipids." },
      { title: "Family education", description: "Calm communication, relapse signs and practical support reduce distress." },
      { title: "Psychosocial rehabilitation", description: "Skills, supported education or work and social recovery are important treatment goals." },
      { title: "Physical health care", description: "Sleep, nutrition, activity, tobacco use and regular health checks deserve equal attention." },
    ],
    related: ["psychosis", "bipolar-disorder", "drug-addiction", "sleep-disorders"],
    urgent: true,
  }),
  createCondition({
    name: "Psychosis",
    slug: "psychosis",
    category: "Thought & perception",
    summary:
      "A person experiencing psychosis may hear voices, hold unusual beliefs or become confused. Early assessment is important and should remain calm and respectful.",
    overview:
      "Psychosis describes difficulty distinguishing shared reality from internal experiences. It can occur in several psychiatric, substance-related, neurological or medical conditions. It is a symptom cluster, not automatically schizophrenia.",
    symptoms: ["Hearing voices or seeing things", "Strong suspicious or unusual beliefs", "Confused or hard-to-follow speech", "Markedly changed behaviour or self-care", "Severe sleep loss, agitation or withdrawal", "Difficulty recognising that help may be needed"],
    causes: ["Schizophrenia-spectrum or mood disorders", "Alcohol, cannabis, stimulants or withdrawal", "Severe sleep deprivation", "Neurological, infectious, hormonal or other medical illness"],
    riskFactors: ["Previous episode", "Family history", "Substance use", "Recent childbirth, severe stress or sleep loss"],
    diagnosis:
      "Urgent assessment checks immediate safety, onset, medical symptoms, substances and medicines. Physical examination and tests may be needed, especially with sudden onset, fever, confusion, seizures, head injury or older age.",
    treatments: [
      { title: "Safety and calm", description: "Reduce stimulation, communicate simply and address food, fluids, sleep and immediate risk." },
      { title: "Treat the cause", description: "Treatment differs for a medical cause, substance effect, mood episode or primary psychotic disorder." },
      { title: "Medication when required", description: "Antipsychotic medicine can reduce acute symptoms and is reviewed for benefit and adverse effects." },
      { title: "Recovery support", description: "Family education, therapy, routine and return to meaningful roles continue after the acute phase." },
    ],
    whenToConsult: ["New voices, strong suspicious beliefs or severe confusion appear.", "The person is not sleeping, eating, drinking or caring for themselves.", "Behaviour is suddenly unsafe, highly agitated or difficult to understand.", "Symptoms begin after childbirth, substance use, stopping alcohol, fever, seizure or head injury."],
    related: ["schizophrenia", "bipolar-disorder", "drug-addiction", "old-age-psychiatry"],
    urgent: true,
  }),
  createCondition({
    name: "Alcohol Addiction",
    slug: "alcohol-addiction",
    category: "Addiction",
    summary:
      "Alcohol dependence is a health condition, not a lack of willpower. Confidential, non-judgemental care can support safer change.",
    overview:
      "Alcohol use disorder involves difficulty controlling drinking despite harm. Some people develop physical dependence, where sudden stopping can cause dangerous withdrawal; a medically planned approach is safer.",
    symptoms: ["Drinking more or longer than intended", "Craving or repeated failed attempts to cut down", "Tolerance or withdrawal symptoms", "Problems at home, work, finances or with the law", "Continuing despite liver, sleep, mood or memory problems", "Hiding use or spending much time recovering"],
    causes: ["Reward and stress systems adapting to repeated alcohol", "Genetic vulnerability", "Social availability, coping patterns or peer use", "Untreated anxiety, trauma, depression or insomnia"],
    riskFactors: ["Daily or heavy use", "Past withdrawal seizure or delirium", "Family history", "Other substance use or mental illness"],
    diagnosis:
      "Assessment covers amount, pattern, last drink, withdrawal history, physical health, medicines, mood and safety. Blood tests or medical referral may be advised. Information is handled respectfully and as privately as the law allows.",
    treatments: [
      { title: "Safe withdrawal plan", description: "People with dependence may need supervised detoxification; do not stop suddenly without advice." },
      { title: "Anti-craving options", description: "Medication may reduce craving or relapse risk when medically suitable." },
      { title: "Motivational and relapse-prevention therapy", description: "Identify triggers, strengthen reasons for change and practise alternatives." },
      { title: "Family and peer support", description: "Clear boundaries and recovery support can help without blame or enabling." },
    ],
    earlyTreatment: "Earlier care can prevent withdrawal emergencies, accidents, liver and nerve injury, relationship loss and worsening mood. If shaking, sweating, confusion, hallucinations or seizures occur after reducing alcohol, seek emergency medical care now.",
    related: ["drug-addiction", "smoking-addiction", "depression", "sleep-disorders"],
    urgent: true,
  }),
  createCondition({
    name: "Drug Addiction",
    slug: "drug-addiction",
    category: "Addiction",
    summary:
      "Dependence on prescription or illicit drugs can change judgement and health. Treatment is confidential, practical and tailored to the substance involved.",
    overview:
      "Substance use disorder means use continues or becomes difficult to control despite harm. Opioids, sedatives, cannabis, stimulants and other drugs have different risks and withdrawal patterns, so honest substance-specific assessment is essential.",
    symptoms: ["Craving and loss of control", "Tolerance or withdrawal", "Neglect of responsibilities or self-care", "Risky use, overdose or accidents", "Mood, sleep, memory or suspiciousness changes", "Repeated use despite health or relationship harm"],
    causes: ["Brain reward and learning changes", "Genetic and developmental vulnerability", "Pain, trauma, stress or untreated symptoms", "Availability and social environment"],
    riskFactors: ["Mixing substances", "Injection use", "Prior overdose", "Using alone or after a period of abstinence"],
    diagnosis:
      "The psychiatrist asks what is used, how, how often and when last used; checks overdose and withdrawal risk; and reviews physical and mental health. Tests may support care but should not replace a respectful conversation.",
    treatments: [
      { title: "Withdrawal and overdose safety", description: "Medical supervision and emergency planning are matched to the substance." },
      { title: "Evidence-based medication", description: "Certain addictions have effective medicines for withdrawal or longer-term recovery." },
      { title: "Behavioural treatment", description: "Motivational work, trigger planning and structured follow-up support change." },
      { title: "Recovery environment", description: "Family guidance, peer support and rehabilitation may be included according to need." },
    ],
    related: ["alcohol-addiction", "smoking-addiction", "psychosis", "depression"],
    urgent: true,
  }),
  createCondition({
    name: "Smoking Addiction",
    slug: "smoking-addiction",
    category: "Addiction",
    summary:
      "Nicotine dependence is powerful, but a planned quit attempt with treatment can be more effective than willpower alone.",
    overview:
      "Tobacco dependence can involve cigarettes, bidis, chewing tobacco or vaping products. Withdrawal causes irritability and craving, but these symptoms pass and can be managed.",
    symptoms: ["Strong cravings", "Use soon after waking", "Difficulty cutting down", "Irritability or poor concentration when stopping", "Using despite breathing, heart or dental problems", "Avoiding places where tobacco is not allowed"],
    causes: ["Rapid nicotine reinforcement", "Habit cues linked to tea, meals, driving or stress", "Social modelling", "Using nicotine to manage mood or attention"],
    riskFactors: ["Early age of starting", "High daily use", "Other substance use", "Depression, anxiety or ADHD"],
    diagnosis:
      "Assessment identifies all tobacco products, daily pattern, previous quit attempts, withdrawal, health conditions and current medicines before setting a quit or reduction plan.",
    treatments: [
      { title: "Quit plan", description: "Choose a date or gradual pathway, remove cues and prepare for high-risk moments." },
      { title: "Nicotine replacement", description: "Patches, gum or lozenges may reduce withdrawal when used correctly." },
      { title: "Prescription support", description: "Non-nicotine medicines can help some people after medical screening." },
      { title: "Follow-up", description: "A lapse is information, not failure; rapid review improves the next attempt." },
    ],
    related: ["alcohol-addiction", "drug-addiction", "anxiety", "stress"],
  }),
  createCondition({
    name: "Sleep Disorders",
    slug: "sleep-disorders",
    category: "Sleep & stress",
    summary:
      "Persistent difficulty sleeping, excessive sleepiness or disrupted rhythms deserve assessment—not just sleeping tablets.",
    overview:
      "Sleep problems can result from habits, stress, depression, anxiety, breathing disorders, restless legs, medicines or body-clock disruption. The correct treatment depends on the pattern.",
    symptoms: ["Difficulty falling or staying asleep", "Waking too early", "Unrefreshing sleep or daytime sleepiness", "Snoring, choking or pauses in breathing", "Restless legs or unusual night behaviours", "Irregular sleep timing"],
    causes: ["Insomnia and conditioned alertness", "Mood, anxiety or substance problems", "Sleep apnoea or movement disorders", "Pain, medical illness, shift work or medicines"],
    riskFactors: ["Irregular schedule", "High caffeine, alcohol or screen use", "Obesity or breathing risk", "Chronic pain or mental health conditions"],
    diagnosis:
      "A sleep history covers timing, routine, snoring, movement, naps, medicines and daytime impact. A sleep diary, medical tests or sleep-study referral may be recommended when indicated.",
    treatments: [
      { title: "CBT for insomnia", description: "Structured sleep scheduling and reducing bed-related alertness are first-line for chronic insomnia." },
      { title: "Treat the underlying cause", description: "Mood, pain, breathing, movement or substance problems require specific care." },
      { title: "Medication review", description: "Short-term or targeted medication may help, but benefits and dependence risks are reviewed." },
      { title: "Circadian support", description: "Light, consistent wake time and timing of activity can reset the body clock." },
    ],
    related: ["stress", "anxiety", "depression", "old-age-psychiatry"],
  }),
  createCondition({
    name: "Stress",
    slug: "stress",
    category: "Sleep & stress",
    summary:
      "Stress is understandable, but prolonged overload can affect body, mood and relationships. Practical support can make demands feel manageable again.",
    overview:
      "Stress is the mind and body's response to demands. It is not itself always a psychiatric disorder, but sustained stress can worsen sleep, blood pressure, anxiety, depression, substance use and family conflict.",
    symptoms: ["Constant tension or racing thoughts", "Irritability, tearfulness or emotional numbness", "Headache, muscle pain or stomach symptoms", "Poor sleep and fatigue", "Reduced concentration or productivity", "Withdrawing or using substances to cope"],
    causes: ["Workload, caregiving or study pressure", "Financial, health or relationship uncertainty", "Loss, relocation or role change", "Too little recovery time and support"],
    riskFactors: ["Multiple simultaneous demands", "Perfectionism or difficulty setting limits", "Poor sleep", "Limited practical or emotional support"],
    diagnosis:
      "Assessment maps demands, coping, sleep and functioning, while checking whether anxiety, depression, trauma, burnout or a medical condition better explains the symptoms.",
    treatments: [
      { title: "Problem mapping", description: "Separate what can be changed, delegated, accepted or approached step by step." },
      { title: "Skills and counselling", description: "Breathing, attention, communication and boundary skills are practised—not simply advised." },
      { title: "Recovery routine", description: "Sleep, movement, breaks and supportive connection protect the nervous system." },
      { title: "Treat related conditions", description: "Clinical anxiety, depression or addiction may need dedicated treatment." },
    ],
    related: ["anxiety", "sleep-disorders", "depression", "relationship-counselling"],
  }),
  createCondition({
    name: "Suicidal Thoughts",
    slug: "suicidal-thoughts",
    category: "Mood & anxiety",
    summary:
      "Thoughts of suicide are a signal for urgent support, not shame. You do not have to manage this moment alone.",
    overview:
      "Suicidal thoughts range from wishing not to wake up to planning an attempt. Asking directly does not create the idea; it opens a path to safety. Immediate danger needs emergency help rather than an online form or routine appointment.",
    symptoms: ["Thinking life is not worth living", "Looking for methods or making a plan", "Giving away possessions or saying goodbye", "Feeling trapped, unbearable pain or hopelessness", "Sudden calm after severe distress", "Recent self-harm, attempt or dangerous substance use"],
    causes: ["Depression, bipolar disorder, psychosis or substance use", "Acute loss, conflict, debt, pain or legal stress", "Trauma, isolation or severe insomnia", "Impulsive crisis with access to lethal means"],
    riskFactors: ["A specific plan, intent or available means", "Past attempt", "Intoxication, agitation or psychosis", "Recent major loss or discharge from care"],
    diagnosis:
      "A clinician asks clearly about thoughts, plan, intent, access to means, past attempts, substances, protective supports and ability to stay safe. This guides the least restrictive safe level of care.",
    treatments: [
      { title: "Immediate safety", description: "Stay with the person, reduce access to medicines, weapons, pesticides or other means, and seek emergency help." },
      { title: "Safety plan", description: "Identify warning signs, coping steps, people to contact and professional support." },
      { title: "Treat drivers of risk", description: "Depression, psychosis, addiction, pain and sleep loss need active treatment." },
      { title: "Close follow-up", description: "Support should continue after the immediate crisis; risk can change quickly." },
    ],
    whenToConsult: ["If there is a current plan, intent, attempt, severe agitation or inability to stay safe, call 112 or go to the nearest emergency department now.", "Call Tele-MANAS 14416 for free 24/7 mental-health support in India.", "Do not leave a person at immediate risk alone; remove access to lethal means if this can be done safely.", "For thoughts without immediate intent, arrange a prompt psychiatric assessment and tell a trusted person today."],
    earlyTreatment: "A suicidal crisis can change. Rapid support creates time, reduces access to danger and treats the pain driving the thoughts. This website and clinic appointment form are not emergency services.",
    faqs: [
      { question: "Will asking about suicide put the idea in someone's mind?", answer: "No. Calm, direct questions can reduce isolation and help a person tell you what they are experiencing." },
      { question: "What should I say?", answer: "Try: ‘I’m glad you told me. Are you thinking of suicide? Do you have a plan? I will stay with you while we get help.’ Avoid debate, blame or promises of secrecy." },
      { question: "What if danger feels immediate?", answer: "Call India emergency services on 112 or go to the nearest emergency department. Tele-MANAS is available on 14416. Do not rely on website messages for an emergency." },
    ],
    related: ["depression", "bipolar-disorder", "alcohol-addiction", "psychosis"],
    urgent: true,
  }),
  createCondition({
    name: "Memory Problems",
    slug: "memory-problems",
    category: "Memory & ageing",
    summary:
      "Forgetfulness can come from stress, sleep, depression, medicines or neurological illness. Assessment can clarify the pattern.",
    overview:
      "Not every memory lapse is dementia. The key questions are what has changed, how quickly, which thinking skills are affected and whether daily independence is changing.",
    symptoms: ["Repeating questions or misplacing items often", "Missing appointments or medication", "Difficulty finding words or following steps", "Getting lost in familiar places", "Reduced judgement or personality change", "Concern noticed by family"],
    causes: ["Poor sleep, stress, depression or anxiety", "Medication, alcohol or substance effects", "Thyroid, vitamin, infection or other medical problems", "Mild cognitive impairment or dementia"],
    riskFactors: ["Older age", "Stroke, diabetes or blood pressure", "Head injury", "Family history of dementia"],
    diagnosis:
      "Assessment includes history from the person and, with consent, someone who knows them well; cognitive screening; mood and medicine review; physical examination and tests or specialist referral when needed.",
    treatments: [
      { title: "Address reversible factors", description: "Sleep, mood, hearing, medicines, vitamin or thyroid problems may contribute." },
      { title: "Cognitive and daily supports", description: "Routines, calendars, labels and simplified steps protect independence." },
      { title: "Risk reduction", description: "Manage blood pressure, diabetes, activity, tobacco and alcohol with medical advice." },
      { title: "Family planning", description: "Discuss safety, driving, finances and future preferences early and respectfully." },
    ],
    related: ["dementia", "alzheimers-disease", "old-age-psychiatry", "depression"],
  }),
  createCondition({
    name: "Dementia",
    slug: "dementia",
    category: "Memory & ageing",
    summary:
      "Dementia affects thinking enough to interfere with independence. A diagnosis can guide treatment, safety and family support.",
    overview:
      "Dementia is an umbrella term, not one disease. Alzheimer's disease, vascular disease and other conditions can affect memory, language, judgement, behaviour and daily function in different ways.",
    symptoms: ["Progressive memory and learning difficulty", "Trouble managing money, medicines or travel", "Language, judgement or visual-spatial problems", "Personality, sleep or behaviour change", "Loss of previously mastered daily skills", "Increasing need for supervision"],
    causes: ["Alzheimer's disease", "Vascular brain injury", "Lewy body, frontotemporal or mixed conditions", "Some treatable illnesses can mimic dementia"],
    riskFactors: ["Age", "Cardiovascular disease", "Family history", "Past stroke or head injury"],
    diagnosis:
      "Diagnosis requires history, cognitive and functional assessment, medicine review, physical examination and often blood tests or brain imaging. Sudden confusion over hours or days is delirium and needs urgent medical evaluation.",
    treatments: [
      { title: "Cause-specific care", description: "Some medicines may modestly support symptoms in selected types of dementia." },
      { title: "Environment and routine", description: "Familiar structure, cues and meaningful activity reduce confusion." },
      { title: "Behaviour support", description: "Look first for pain, infection, fear, constipation, overstimulation or unmet needs." },
      { title: "Caregiver wellbeing", description: "Education, respite, legal planning and support protect the whole family." },
    ],
    related: ["alzheimers-disease", "memory-problems", "old-age-psychiatry", "sleep-disorders"],
    ageNote: "Sudden confusion, fever, new weakness, seizure or rapid decline is a medical emergency—not normal ageing.",
  }),
  createCondition({
    name: "Alzheimer's Disease",
    slug: "alzheimers-disease",
    category: "Memory & ageing",
    summary:
      "Alzheimer's disease is a common cause of dementia. Early assessment supports planning, symptom care and family understanding.",
    overview:
      "Alzheimer's disease gradually affects new learning and later other thinking and daily skills. Each person's pace is different. Care aims to preserve function, comfort, connection and dignity.",
    symptoms: ["Forgetting recent conversations or events", "Repeating questions", "Difficulty with complex tasks", "Word-finding and orientation problems", "Changes in judgement or initiative", "Later need for help with personal care"],
    causes: ["Progressive brain changes involving amyloid and tau proteins", "Age-related and genetic vulnerability", "Vascular health can influence symptoms", "Most cases are not caused by one inherited gene"],
    riskFactors: ["Increasing age", "Family history", "Down syndrome", "Stroke and cardiovascular risks"],
    diagnosis:
      "A clinical diagnosis combines symptom history, cognitive testing, functional change, examination, laboratory tests and usually imaging to exclude other causes. Biomarker testing is available only in selected settings and is not always necessary.",
    treatments: [
      { title: "Cognitive symptom medicines", description: "Selected medicines may support symptoms for some people; expectations should be realistic." },
      { title: "Healthy routine", description: "Activity, sleep, social connection, hearing care and vascular health support function." },
      { title: "Practical adaptation", description: "Simplify choices, use cues and preserve familiar roles safely." },
      { title: "Advance planning", description: "Discuss care preferences and legal or financial decisions while the person can participate." },
    ],
    related: ["dementia", "memory-problems", "old-age-psychiatry", "depression"],
  }),
  createCondition({
    name: "Child Psychiatry",
    slug: "child-psychiatry",
    category: "Children & adolescents",
    summary:
      "Children express distress through behaviour, body complaints, sleep and school changes. Assessment looks at the whole child—not a label.",
    overview:
      "Child psychiatry supports emotional, behavioural, developmental and learning concerns. Parents, school context, physical health and the child's own voice all matter. Treatment is age-appropriate and family-centred.",
    symptoms: ["Persistent worry, sadness or irritability", "Frequent severe tantrums or aggression", "Sleep, eating or toileting changes", "School refusal or sudden academic decline", "Attention, communication or social difficulties", "Self-harm talk or major regression"],
    causes: ["Developmental and temperamental differences", "Family, school or peer stress", "Learning, attention or communication needs", "Medical illness, trauma or neurodevelopmental conditions"],
    riskFactors: ["Developmental delay", "Bullying or trauma", "Family mental health history", "Chronic illness or major family change"],
    diagnosis:
      "Assessment usually includes parent and child interviews, development and school history, observation and questionnaires. Information from teachers may help with consent. A single behaviour in one setting rarely tells the whole story.",
    treatments: [
      { title: "Parent guidance", description: "Predictable routines, connection and consistent responses are tailored to the child." },
      { title: "Child-focused therapy", description: "Play, behavioural or skills-based approaches match age and ability." },
      { title: "School collaboration", description: "Reasonable supports can reduce stress and reveal strengths." },
      { title: "Medication only when indicated", description: "If considered, goals, side effects and growth or health monitoring are discussed carefully." },
    ],
    related: ["adhd", "autism", "learning-disorders", "behavior-problems"],
    ageNote: "A parent or legal guardian is normally involved. Privacy is respected within age, safety and legal limits.",
  }),
  createCondition({
    name: "Adolescent Psychiatry",
    slug: "adolescent-psychiatry",
    category: "Children & adolescents",
    summary:
      "Adolescence brings rapid change. Confidential, respectful assessment can help when mood, behaviour, identity or functioning becomes difficult.",
    overview:
      "Teen mental health care balances the young person's voice with family involvement and safety. Normal development is distinguished from depression, anxiety, ADHD, eating concerns, substance use, self-harm and emerging severe illness.",
    symptoms: ["Persistent withdrawal, sadness or irritability", "School decline or refusal", "Self-harm, suicidal talk or risky behaviour", "Severe worry, panic or compulsions", "Substance use, aggression or running away", "Major sleep, eating or body-image change"],
    causes: ["Biological and developmental vulnerability", "Academic, peer, family or identity stress", "Bullying, trauma or online harms", "Sleep disruption or substance use"],
    riskFactors: ["Past self-harm", "Bullying or abuse", "Family mental illness", "LGBTQ+ stigma or other social exclusion"],
    diagnosis:
      "The adolescent is usually offered some private conversation, with clear explanation of confidentiality limits. Family, school, development, physical health, substances and online context are considered.",
    treatments: [
      { title: "Therapeutic alliance", description: "Respect and shared goals improve engagement more than lectures or blame." },
      { title: "Skills-based therapy", description: "CBT, emotion regulation and problem solving are adapted to the teen." },
      { title: "Family work", description: "Communication, routines, boundaries and safety plans involve caregivers." },
      { title: "Medication when appropriate", description: "Expected benefit, monitoring and the young person's concerns are discussed." },
    ],
    related: ["depression", "anxiety", "adhd", "behavior-problems"],
    ageNote: "Immediate self-harm risk, overdose, violence, severe intoxication or psychosis requires emergency assessment.",
    urgent: true,
  }),
  createCondition({
    name: "Behavior Problems",
    slug: "behavior-problems",
    category: "Children & adolescents",
    summary:
      "Repeated aggression, defiance or rule-breaking may communicate unmet developmental, emotional or learning needs.",
    overview:
      "Behaviour is influenced by age, temperament, communication, attention, sleep, family patterns and environment. Assessment avoids blaming the child or parent and identifies what happens before and after difficult moments.",
    symptoms: ["Frequent intense tantrums beyond developmental expectations", "Aggression or property damage", "Persistent defiance across settings", "Lying, stealing or serious rule violations", "School suspension or peer conflict", "Behaviour linked to frustration or transitions"],
    causes: ["Attention, language or learning difficulty", "Anxiety, trauma, mood or sleep problems", "Inconsistent or escalating interaction cycles", "Neurodevelopmental differences"],
    riskFactors: ["Early severe behaviour", "Family stress", "School mismatch or bullying", "Exposure to violence"],
    diagnosis:
      "A functional assessment maps triggers, skills, consequences and setting differences. Development, ADHD, autism, learning, mood, trauma, sleep and medical issues are screened before applying a diagnosis.",
    treatments: [
      { title: "Parent management skills", description: "Increase positive attention, clear instructions and calm, predictable consequences." },
      { title: "Child skills", description: "Build communication, frustration tolerance and problem solving." },
      { title: "School plan", description: "Consistent expectations and appropriate learning support reduce repeated failure." },
      { title: "Treat underlying needs", description: "Attention, anxiety, trauma, sleep or learning problems may be driving behaviour." },
    ],
    related: ["child-psychiatry", "adhd", "learning-disorders", "autism"],
  }),
  createCondition({
    name: "Learning Disorders",
    slug: "learning-disorders",
    category: "Children & adolescents",
    summary:
      "Persistent difficulty with reading, writing or mathematics is not laziness. The right assessment can unlock practical support.",
    overview:
      "Specific learning disorders affect particular academic skills despite opportunity to learn. Intelligence is not defined by a learning disorder, and many children have strong creative, verbal or practical abilities.",
    symptoms: ["Slow or inaccurate reading", "Persistent spelling or written-expression difficulty", "Trouble learning number facts or calculations", "Large gap between effort and academic output", "Avoidance, headaches or distress around schoolwork", "Skills remaining difficult despite targeted teaching"],
    causes: ["Neurodevelopmental differences in processing academic information", "Genetic vulnerability", "Language or attention difficulties can coexist", "Poor teaching alone does not define a disorder"],
    riskFactors: ["Family history", "Prematurity", "Language delay", "ADHD or developmental coordination problems"],
    diagnosis:
      "Evaluation reviews development, teaching exposure, vision, hearing, language, attention and emotional wellbeing. Standardised educational or psychological assessment may be recommended; a brief clinic visit alone cannot establish every learning profile.",
    treatments: [
      { title: "Targeted remediation", description: "Structured, explicit teaching focuses on the specific academic skill." },
      { title: "School accommodations", description: "Extra time, format changes or assistive technology may reduce barriers." },
      { title: "Strength-based support", description: "Protect confidence and recognise abilities beyond marks." },
      { title: "Treat coexisting needs", description: "ADHD, anxiety, sleep or language difficulties may need parallel care." },
    ],
    related: ["adhd", "child-psychiatry", "behavior-problems", "autism"],
  }),
  createCondition({
    name: "Autism",
    slug: "autism",
    category: "Children & adolescents",
    summary:
      "Autism is a neurodevelopmental difference affecting communication, social interaction, sensory experience and patterns of interest.",
    overview:
      "Autistic people vary widely in strengths and support needs. Assessment should not aim to erase identity or promise a cure; it should improve communication, participation, comfort, safety and family understanding.",
    symptoms: ["Differences in social communication or back-and-forth interaction", "Repetitive movement, play, speech or routines", "Strong focused interests", "Sensory sensitivity or seeking", "Difficulty with unexpected change", "Developmental differences noticed early or masked until demands increase"],
    causes: ["Complex genetic and developmental factors", "Differences begin in early brain development", "Parenting and vaccines do not cause autism", "Coexisting language, attention, sleep or anxiety needs may shape presentation"],
    riskFactors: ["Family history", "Certain genetic conditions", "Prematurity", "Developmental concerns in early childhood"],
    diagnosis:
      "Diagnosis uses developmental history, direct observation and information across settings. Hearing, language, learning, ADHD and mental health are considered. No blood test or brain scan alone diagnoses autism.",
    treatments: [
      { title: "Communication support", description: "Speech-language, visual or alternative communication support is matched to the person." },
      { title: "Environmental adaptation", description: "Predictability, sensory adjustments and clear expectations reduce overload." },
      { title: "Skill and participation support", description: "Occupational, educational and behavioural supports focus on meaningful goals." },
      { title: "Treat coexisting concerns", description: "Medication does not treat autism itself but may help specific severe coexisting symptoms after assessment." },
    ],
    earlyTreatment: "Early, respectful support can strengthen communication, daily skills and family confidence. Beware programmes that promise to ‘cure’ autism or blame parents; goals should be practical, humane and individualised.",
    related: ["child-psychiatry", "adhd", "learning-disorders", "behavior-problems"],
  }),
  createCondition({
    name: "ADHD",
    slug: "adhd",
    category: "Children & adolescents",
    summary:
      "ADHD affects attention, impulse control and activity regulation across settings. It is not simply poor discipline.",
    overview:
      "Attention-deficit/hyperactivity disorder begins in development and can continue into adulthood. Symptoms must be persistent, impairing and present in more than one context—not only during boring tasks or a short stressful period.",
    symptoms: ["Losing focus, instructions or belongings", "Difficulty starting and completing tasks", "Forgetfulness and poor time sense", "Fidgeting, restlessness or excessive talking", "Interrupting or acting before thinking", "Academic, work or relationship impact"],
    causes: ["Strong genetic and neurodevelopmental factors", "Executive-function differences", "Prematurity or some early developmental risks", "Screens may worsen habits but do not by themselves cause ADHD"],
    riskFactors: ["Family history", "Prematurity", "Learning or language disorder", "Sleep problems"],
    diagnosis:
      "Assessment covers childhood history, multiple settings, impairment and alternative explanations such as anxiety, depression, trauma, sleep, thyroid, substance use or learning difficulty. Rating scales support but do not replace clinical judgement.",
    treatments: [
      { title: "Practical systems", description: "External reminders, short steps, routines and reduced distraction support executive skills." },
      { title: "Parent or adult coaching", description: "Behavioural strategies and accountability are adapted to age." },
      { title: "School or workplace support", description: "Reasonable structure can improve performance without lowering expectations." },
      { title: "Medication when indicated", description: "Stimulant or non-stimulant options require diagnosis, health screening and regular review." },
    ],
    related: ["learning-disorders", "child-psychiatry", "behavior-problems", "anxiety"],
  }),
  createCondition({
    name: "Old Age Psychiatry",
    slug: "old-age-psychiatry",
    category: "Memory & ageing",
    summary:
      "Later-life mental health care considers mood, memory, medicines, physical illness, independence and caregiver wellbeing together.",
    overview:
      "Depression, anxiety, sleep problems, psychosis and cognitive disorders can occur in older adults but are not inevitable parts of ageing. Symptoms may present through memory, body complaints or reduced function.",
    symptoms: ["New withdrawal, sadness or anxiety", "Memory or judgement change", "Sleep reversal or night-time confusion", "Suspicion, hallucinations or major personality change", "Loss of self-care or medication errors", "Caregiver stress or safety concerns"],
    causes: ["Depression, grief or isolation", "Dementia or delirium", "Medication interactions or sensory loss", "Stroke, Parkinson's disease or other medical illness"],
    riskFactors: ["Multiple medicines", "Recent hospitalisation", "Bereavement or isolation", "Cognitive or physical illness"],
    diagnosis:
      "Assessment integrates mental state, cognition, physical health, hearing and vision, medicines and daily function. Family information is helpful with consent. Sudden change suggests delirium and needs urgent medical review.",
    treatments: [
      { title: "Medication simplification", description: "Older adults may be more sensitive to side effects; start-low, review-often principles matter." },
      { title: "Psychological support", description: "Therapy can be effective and is adapted for health, grief and cognitive needs." },
      { title: "Function and safety", description: "Falls, driving, nutrition and home support are addressed without unnecessary loss of autonomy." },
      { title: "Caregiver partnership", description: "Education and respite reduce burnout and improve care." },
    ],
    related: ["memory-problems", "dementia", "alzheimers-disease", "depression"],
  }),
  createCondition({
    name: "Women's Mental Health",
    slug: "womens-mental-health",
    category: "Life stages & relationships",
    summary:
      "Mental health can be shaped by reproductive life stages, caregiving, relationships, safety and physical health.",
    overview:
      "Women's mental health care may involve premenstrual symptoms, pregnancy, postpartum changes, infertility, perimenopause, trauma or caregiving. Treatment respects autonomy and coordinates with medical care when needed.",
    symptoms: ["Mood or anxiety linked to menstrual cycle", "Distress during infertility, pregnancy or loss", "Postpartum sadness, worry or intrusive thoughts", "Perimenopausal sleep and mood change", "Trauma or relationship-related symptoms", "Caregiver exhaustion"],
    causes: ["Hormonal and biological sensitivity", "Sleep disruption", "Social, caregiving and work pressures", "Violence, discrimination or reproductive loss"],
    riskFactors: ["Previous mood disorder", "Trauma or unsafe relationship", "Pregnancy or postpartum transition", "Limited support"],
    diagnosis:
      "Assessment considers symptom timing, cycle or reproductive stage, medicines, thyroid and anaemia risk, pregnancy or feeding, safety at home and the person's treatment preferences.",
    treatments: [
      { title: "Life-stage informed therapy", description: "Support addresses identity, grief, boundaries, trauma or role change." },
      { title: "Medication planning", description: "Benefits and risks are weighed for pregnancy, breastfeeding and physical health." },
      { title: "Sleep and practical support", description: "Care plans include rest, feeding realities, workload and available help." },
      { title: "Collaborative care", description: "Coordination with obstetric, gynaecological or medical teams may be helpful." },
    ],
    related: ["postpartum-depression", "depression", "anxiety", "relationship-counselling"],
  }),
  createCondition({
    name: "Postpartum Depression",
    slug: "postpartum-depression",
    category: "Life stages & relationships",
    summary:
      "Depression after childbirth is common, treatable and never a sign of being a bad parent. Help supports both parent and baby.",
    overview:
      "Postpartum depression lasts longer and affects function more than short-lived ‘baby blues’. Severe confusion, extreme energy, no need for sleep, unusual beliefs or voices after childbirth may indicate postpartum psychosis—an emergency.",
    symptoms: ["Persistent sadness, anxiety or irritability", "Loss of interest or connection", "Severe guilt or feeling like a bad parent", "Sleep difficulty even when the baby sleeps", "Intrusive frightening thoughts", "Thoughts of self-harm or harm to the baby"],
    causes: ["Biological change after birth", "Severe sleep loss", "Birth complications, feeding difficulties or pain", "Limited support, relationship stress or past trauma"],
    riskFactors: ["Past depression or bipolar disorder", "Postpartum illness in a previous pregnancy", "Complicated birth or infant illness", "Isolation or violence"],
    diagnosis:
      "Assessment distinguishes baby blues, depression, anxiety, OCD, bipolar symptoms and psychosis; reviews safety, sleep, feeding, physical recovery and support. Obstetric or medical coordination may be needed.",
    treatments: [
      { title: "Immediate practical support", description: "Protect sleep, nutrition and safe help with baby care." },
      { title: "Psychological therapy", description: "Evidence-based therapy addresses guilt, worry, adjustment and relationships." },
      { title: "Medication when indicated", description: "Options can be considered during breastfeeding through individual benefit–risk discussion." },
      { title: "Family safety plan", description: "Partners and relatives learn warning signs and how to respond without blame." },
    ],
    whenToConsult: ["Low mood, anxiety or inability to function lasts beyond two weeks or is severe at any time.", "There are intrusive thoughts, self-harm thoughts or fear of harming the baby.", "The parent is barely sleeping, unusually energetic, confused, suspicious, hearing voices or behaving very differently—seek emergency care now.", "Support, feeding or relationship difficulties are worsening mental health."],
    earlyTreatment: "Early care can protect bonding, sleep, safety and family wellbeing. Postpartum psychosis can worsen quickly: do not leave the parent alone with the baby if immediate safety is uncertain; call 112 or go to an emergency department.",
    related: ["womens-mental-health", "depression", "bipolar-disorder", "anxiety"],
    urgent: true,
  }),
  createCondition({
    name: "Sexual Disorders",
    slug: "sexual-disorders",
    category: "Life stages & relationships",
    summary:
      "Sexual concerns are common and deserve private, respectful, medically informed care without judgement.",
    overview:
      "Concerns may involve desire, arousal, erection, ejaculation, orgasm, pain, compulsive behaviour or distress about sexual functioning. Physical, relationship, medication and psychological factors often interact.",
    symptoms: ["Low or mismatched desire causing distress", "Erection, arousal or orgasm difficulty", "Early or delayed ejaculation", "Pain or fear related to sexual activity", "Compulsive sexual behaviour", "Performance anxiety or relationship conflict"],
    causes: ["Diabetes, cardiovascular, hormonal or neurological conditions", "Medication or substance effects", "Anxiety, depression, trauma or shame", "Relationship, communication or pain issues"],
    riskFactors: ["Chronic illness", "Psychiatric or blood-pressure medicines", "Alcohol or tobacco use", "Trauma or relationship distress"],
    diagnosis:
      "A private, consent-based history considers physical health, medicines, relationship context, onset and distress. Physical examination, laboratory tests or referral to a relevant medical specialist may be appropriate.",
    treatments: [
      { title: "Clear education", description: "Correct myths and understand normal variation." },
      { title: "Treat contributing health issues", description: "Medical, medication and substance factors are reviewed." },
      { title: "Psychological or couple work", description: "Reduce performance pressure and improve communication and gradual intimacy." },
      { title: "Specific treatment", description: "Medication or specialist referral is used only when indicated; unproven ‘guaranteed’ remedies should be avoided." },
    ],
    related: ["relationship-counselling", "depression", "anxiety", "alcohol-addiction"],
  }),
  createCondition({
    name: "Personality Disorders",
    slug: "personality-disorders",
    category: "Life stages & relationships",
    summary:
      "Long-standing patterns of emotion, relationships and coping can become painful or inflexible. A diagnosis should guide care—not define a person.",
    overview:
      "Personality disorders describe enduring patterns that cause distress or impairment across contexts. Traits exist on a spectrum. Assessment should be careful, culturally aware and usually made over time—not during one crisis.",
    symptoms: ["Repeated intense or unstable relationships", "Difficulty regulating emotion or impulses", "Persistent mistrust, avoidance or perfectionism", "Unstable self-image or chronic emptiness", "Self-harm or crisis patterns", "The same difficulties recurring across settings"],
    causes: ["Temperament and developmental factors", "Attachment and early relationship experiences", "Trauma or invalidating environments", "Learned survival and coping patterns"],
    riskFactors: ["Childhood adversity", "Family vulnerability", "Repeated trauma", "Coexisting mood or substance problems"],
    diagnosis:
      "A longitudinal interview examines patterns across years, strengths, context, trauma, mood, ADHD, autism and substance use. Labels are discussed transparently because stigma and misdiagnosis can cause harm.",
    treatments: [
      { title: "Structured psychotherapy", description: "DBT, mentalisation-based, schema or other evidence-informed approaches may help." },
      { title: "Skills and crisis planning", description: "Build emotional regulation, distress tolerance and safer relationships." },
      { title: "Medication for specific symptoms", description: "There is no single medicine for personality; unnecessary polypharmacy is avoided." },
      { title: "Consistent care", description: "Clear goals, boundaries and regular review support steady change." },
    ],
    related: ["relationship-counselling", "family-counselling", "depression", "self-harm"].map((item) => item === "self-harm" ? "suicidal-thoughts" : item),
  }),
  createCondition({
    name: "Relationship Counselling",
    slug: "relationship-counselling",
    category: "Life stages & relationships",
    summary:
      "Counselling can help partners understand repeating patterns, communicate safely and make thoughtful decisions.",
    overview:
      "Relationship counselling offers a structured space to explore conflict, distance, trust, intimacy or life transitions. The goal is not to take sides or guarantee that a relationship continues.",
    symptoms: ["The same conflict repeats without resolution", "Communication becomes criticism, silence or defensiveness", "Loss of trust or emotional connection", "Intimacy or sexual concerns", "Stress around parenting, finances or extended family", "Uncertainty about staying together"],
    causes: ["Different needs or communication styles", "Accumulated hurt and unresolved events", "Mental illness, addiction or caregiving stress", "Major transitions or external pressure"],
    riskFactors: ["Contempt or escalating conflict", "Untreated addiction", "Infidelity or secrecy", "Violence or coercive control"],
    diagnosis:
      "Counselling begins by hearing goals, patterns and safety concerns. Active violence or coercive control requires individual safety planning; joint sessions may be unsafe and are not automatically recommended.",
    treatments: [
      { title: "Pattern mapping", description: "See the cycle each person is caught in rather than deciding who is ‘the problem’." },
      { title: "Communication practice", description: "Learn to listen, make clear requests and repair after conflict." },
      { title: "Shared decisions", description: "Clarify values, boundaries and realistic next steps." },
      { title: "Individual care when needed", description: "Depression, addiction, trauma or sexual health may need parallel treatment." },
    ],
    related: ["family-counselling", "sexual-disorders", "stress", "grief-counselling"],
  }),
  createCondition({
    name: "Family Counselling",
    slug: "family-counselling",
    category: "Life stages & relationships",
    summary:
      "Families can become powerful partners in recovery when they understand illness, communicate calmly and protect everyone's wellbeing.",
    overview:
      "Family counselling addresses interaction patterns, caregiver strain, boundaries and support around mental illness, addiction, child concerns or life transitions. It does not assign one person all the blame.",
    symptoms: ["Conflict around treatment or medication", "Caregiver exhaustion", "Repeated crisis and rescue cycles", "Communication dominated by criticism or fear", "Unclear boundaries or roles", "Children affected by adult conflict"],
    causes: ["Stress of illness or caregiving", "Different beliefs about mental health", "Communication and boundary patterns", "Financial, cultural or intergenerational pressures"],
    riskFactors: ["Severe untreated illness", "Addiction", "Violence or coercion", "Limited support"],
    diagnosis:
      "The clinician clarifies each person's goals, the identified patient's consent, safety, family structure and the practical problem. Separate sessions may be used when privacy or safety requires it.",
    treatments: [
      { title: "Psychoeducation", description: "Understand symptoms, treatment and early warning signs." },
      { title: "Communication skills", description: "Use calmer, clearer and less blaming conversations." },
      { title: "Boundaries and roles", description: "Support recovery without over-control, secrecy or enabling." },
      { title: "Caregiver plan", description: "Rest, shared responsibility and support protect long-term care." },
    ],
    related: ["relationship-counselling", "grief-counselling", "alcohol-addiction", "schizophrenia"],
  }),
  createCondition({
    name: "Grief Counselling",
    slug: "grief-counselling",
    category: "Life stages & relationships",
    summary:
      "Grief has no single timetable. Support can help when loss feels isolating, traumatic or difficult to carry.",
    overview:
      "Grief after death, pregnancy loss, illness, separation, disability or other major change can involve sadness, anger, guilt, relief and numbness. It is not automatically a disorder, but professional support may be useful.",
    symptoms: ["Intense yearning or preoccupation with the loss", "Guilt, anger or unanswered questions", "Numbness or disbelief", "Sleep, appetite and concentration changes", "Avoiding reminders or feeling unable to reconnect with life", "Depression, trauma symptoms or suicidal thoughts"],
    causes: ["Death or anticipated death", "Pregnancy, relationship or role loss", "Sudden, violent or ambiguous loss", "Multiple losses with little support"],
    riskFactors: ["Traumatic circumstances", "Dependent or conflicted relationship", "Previous depression", "Isolation or ongoing practical stress"],
    diagnosis:
      "Assessment respects cultural and spiritual grieving practices, examines time and function, and checks for depression, trauma, substance use and safety. Grief is not pathologised simply because it is painful.",
    treatments: [
      { title: "Supportive counselling", description: "Tell the story at a tolerable pace and make room for mixed emotions." },
      { title: "Practical stabilisation", description: "Sleep, meals, responsibilities and supportive contact matter in early grief." },
      { title: "Grief-focused therapy", description: "When grief remains severely impairing, structured approaches can help adaptation." },
      { title: "Treat coexisting illness", description: "Depression, trauma or addiction may need additional care." },
    ],
    related: ["depression", "stress", "family-counselling", "relationship-counselling"],
  }),
];

export const conditionCategories = [
  "Mood & anxiety",
  "Thought & perception",
  "Addiction",
  "Sleep & stress",
  "Memory & ageing",
  "Children & adolescents",
  "Life stages & relationships",
] as const satisfies readonly ConditionCategory[];

export function getCondition(slug: string) {
  return conditions.find((condition) => condition.slug === slug);
}

export function getRelatedConditions(condition: Condition) {
  return condition.related
    .map((slug) => getCondition(slug))
    .filter((item): item is Condition => Boolean(item));
}
