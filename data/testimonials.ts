export type PatientStory = {
  quote: string;
  perspective: string;
  context: string;
};

// Ethical note: These are explicitly labelled composite examples on every surface.
// Replace only with consented, verifiable patient feedback before presenting as reviews.
export const patientStories: PatientStory[] = [
  {
    quote:
      "The first helpful change was understanding that the symptoms had a pattern and were not a personal failure. The plan felt manageable, one step at a time.",
    perspective: "Adult seeking care for mood and sleep",
    context: "Composite care scenario",
  },
  {
    quote:
      "Our family learned to speak more calmly, notice early warning signs and support treatment without turning every conversation into an argument.",
    perspective: "Family caregiver",
    context: "Composite care scenario",
  },
  {
    quote:
      "We were listened to before any decision was made. School, sleep and learning were considered—not only the difficult behaviour.",
    perspective: "Parent of a school-age child",
    context: "Composite care scenario",
  },
  {
    quote:
      "The goal was not simply to remove every feeling. It was to return to work, reconnect with people and feel capable again.",
    perspective: "Adult in follow-up care",
    context: "Composite care scenario",
  },
  {
    quote:
      "Medication questions were answered clearly. We understood the target, possible side effects and when the plan would be reviewed.",
    perspective: "Patient and family",
    context: "Composite care scenario",
  },
  {
    quote:
      "As a caregiver, I also needed guidance. Clear boundaries and a crisis plan helped our home feel safer and less reactive.",
    perspective: "Older-adult caregiver",
    context: "Composite care scenario",
  },
];
