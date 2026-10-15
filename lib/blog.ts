export type CategoryKey =
  | "brain-science"
  | "recovery-tips"
  | "real-stories"
  | "mental-health"
  | "relationships";

export interface CategoryMeta {
  label: string;
  color: string;
  bg: string;
  gradient: string;
}

export const CATEGORIES: Record<CategoryKey, CategoryMeta> = {
  "brain-science": {
    label: "Brain Science",
    color: "#0284c7",
    bg: "#e0f2fe",
    gradient: "linear-gradient(135deg, #0c2340 0%, #0369a1 100%)",
  },
  "recovery-tips": {
    label: "Recovery Tips",
    color: "#059669",
    bg: "#d1fae5",
    gradient: "linear-gradient(135deg, #052e16 0%, #047857 100%)",
  },
  "real-stories": {
    label: "Real Stories",
    color: "#7c3aed",
    bg: "#ede9fe",
    gradient: "linear-gradient(135deg, #1e0a40 0%, #6d28d9 100%)",
  },
  "mental-health": {
    label: "Mental Health",
    color: "#db2777",
    bg: "#fce7f3",
    gradient: "linear-gradient(135deg, #2d0a20 0%, #be185d 100%)",
  },
  relationships: {
    label: "Relationships",
    color: "#d97706",
    bg: "#fef3c7",
    gradient: "linear-gradient(135deg, #2d1a00 0%, #b45309 100%)",
  },
};

export interface Author {
  name: string;
  role: string;
  initials: string;
  color: string;
}

export type ContentBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "quote"; text: string; author?: string }
  | { type: "list"; items: string[] }
  | {
      type: "callout";
      title: string;
      text: string;
      variant: "info" | "tip" | "warning";
    };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: ContentBlock[];
  category: CategoryKey;
  author: Author;
  publishedAt: string;
  readTime: number;
  featured: boolean;
  tags: string[];
}

const AUTHORS: Record<string, Author> = {
  editorial: {
    name: "HYI Editorial Team",
    role: "Editorial",
    initials: "HE",
    color: "#fbe400",
  },
  drRaj: {
    name: "Dr. Rajesh Kumar",
    role: "Neuroscientist",
    initials: "RK",
    color: "#0284c7",
  },
  aryan: {
    name: "Aryan Sharma",
    role: "Recovery Coach",
    initials: "AS",
    color: "#059669",
  },
  priya: {
    name: "Priya Mehta",
    role: "Mental Health Counselor",
    initials: "PM",
    color: "#db2777",
  },
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-pornography-rewires-your-brain",
    title: "How Pornography Rewires Your Brain: The Dopamine Loop",
    excerpt:
      "Understanding the neuroscience behind porn addiction is the first step to breaking free. Learn how dopamine pathways change and what that means for your recovery.",
    category: "brain-science",
    author: AUTHORS.drRaj,
    publishedAt: "2026-05-15",
    readTime: 8,
    featured: true,
    tags: ["dopamine", "neuroscience", "brain rewire", "addiction science"],
    content: [
      { type: "h2", text: "The Dopamine System: Your Brain's Reward Circuit" },
      {
        type: "p",
        text: "Deep within your brain lies a network of structures called the mesolimbic dopamine system — your brain's reward circuit. This system evolved to motivate you toward survival behaviors: eating, social bonding, and reproduction. When you engage in these activities, your brain releases dopamine — a neurotransmitter that signals 'this was good, do it again.'",
      },
      {
        type: "p",
        text: "Pornography exploits this system in a way no natural stimulus can. Where a normal romantic interaction might release a moderate amount of dopamine, internet pornography provides an endless stream of novel stimuli that keeps triggering dopamine release far beyond what your brain evolved to handle.",
      },
      { type: "h2", text: "What Happens When You Watch Pornography" },
      {
        type: "p",
        text: "When you watch pornography, your brain doesn't know it isn't real. It processes the visual stimulus as a genuine sexual opportunity. Your nucleus accumbens floods with dopamine. Your prefrontal cortex — the rational, decision-making part — gets temporarily suppressed.",
      },
      {
        type: "quote",
        text: "The brain does not distinguish between real and virtual rewards — it responds to both with equal neurological intensity.",
        author: "Dr. Norman Doidge, The Brain That Changes Itself",
      },
      { type: "h2", text: "Tolerance and Escalation: The Downward Spiral" },
      {
        type: "p",
        text: "Like all addictive behaviors, pornography consumption follows a predictable pattern of tolerance. Your brain's dopamine receptors begin to downregulate — meaning fewer receptors are available, and those that remain become less sensitive. What once produced a strong dopamine response now produces a weaker one.",
      },
      {
        type: "list",
        items: [
          "Needing more extreme or novel content to feel aroused",
          "Difficulty concentrating on everyday tasks or conversations",
          "Reduced interest in real relationships and intimacy",
          "Feeling depressed, anxious, or emotionally flat when not watching",
          "Failed attempts to cut back or stop entirely",
          "Continuing to watch despite negative consequences",
        ],
      },
      {
        type: "callout",
        title: "The Good News: Neuroplasticity",
        text: "Your brain has the remarkable ability to change and heal itself. With the right approach and enough time, most young men see significant recovery within 60–90 days. The brain can rebuild its dopamine receptor density and restore natural motivation.",
        variant: "tip",
      },
      { type: "h2", text: "The Science of Recovery" },
      {
        type: "p",
        text: "Recovery works by allowing the dopamine system to recalibrate. When you abstain from pornography, your brain gradually restores dopamine receptor sensitivity. Natural rewards — exercise, conversation, achievement — begin to feel pleasurable again. This process isn't instant, but the neuroscience is clear: your brain can heal.",
      },
      { type: "h3", text: "What to Expect During Recovery" },
      {
        type: "p",
        text: "The first 2–3 weeks are typically the hardest. Your brain craves the dopamine hit it's used to, and you may experience mood swings, difficulty concentrating, or a phenomenon called 'the flatline' where you feel temporarily low in motivation. This is normal — it's your brain recalibrating. Push through, and the improvements that follow are real and lasting.",
      },
    ],
  },
  {
    slug: "90-day-reset-what-happens-to-your-brain",
    title: "90-Day Reset: What Actually Happens to Your Brain Week by Week",
    excerpt:
      "A week-by-week breakdown of what to expect when you stop watching pornography. Based on neuroscience and thousands of recovery stories.",
    category: "recovery-tips",
    author: AUTHORS.aryan,
    publishedAt: "2026-05-10",
    readTime: 6,
    featured: false,
    tags: ["90 days", "recovery timeline", "what to expect", "reboot"],
    content: [
      { type: "h2", text: "Why 90 Days?" },
      {
        type: "p",
        text: "The '90-day reboot' has become a common benchmark in porn recovery communities, and for good neurological reason. Research on addiction recovery suggests that significant neurological healing — particularly the restoration of dopamine receptor density — typically begins to plateau around the 60–90 day mark.",
      },
      { type: "h2", text: "Week 1–2: The Storm" },
      {
        type: "p",
        text: "The first two weeks are the hardest for most people. Your brain is accustomed to regular dopamine surges and will push back hard against the withdrawal of its primary stimulant.",
      },
      {
        type: "list",
        items: [
          "Intense urges, especially during times you usually watched",
          "Irritability and mood swings",
          "Difficulty concentrating or feeling mentally foggy",
          "Trouble sleeping or unusually vivid dreams",
          "Possible depression or emotional numbness ('the flatline')",
        ],
      },
      {
        type: "callout",
        title: "Survival Tip for Week 1–2",
        text: "Install content blockers on all your devices before you begin. Remove triggers from your environment. Tell someone you trust. The urges are manageable when you're not fighting alone.",
        variant: "tip",
      },
      { type: "h2", text: "Week 3–4: The Fog Begins to Lift" },
      {
        type: "p",
        text: "Around day 14–21, many people report their first glimpse of clarity. The acute withdrawal phase begins to ease. You might notice you're sleeping better, concentrating more easily, or feeling more present in conversations.",
      },
      { type: "h2", text: "Week 5–8: Real Changes Emerge" },
      {
        type: "p",
        text: "This is where many people begin to notice the changes that make recovery feel genuinely worth it. Energy levels increase. Motivation returns. Social anxiety often decreases significantly.",
      },
      {
        type: "quote",
        text: "Around day 45, something shifted. I started actually enjoying conversations again. I noticed the sky was beautiful. Small things started mattering.",
        author: "Anonymous, HYI Community",
      },
      { type: "h2", text: "Week 9–12: The New Normal" },
      {
        type: "p",
        text: "By the 90-day mark, most men report a substantially improved relationship with their own mind. Urges become less frequent and less intense. The brain has largely recalibrated its dopamine system. Many describe this period as feeling more like their 'true self' than they have in years.",
      },
    ],
  },
  {
    slug: "i-was-16-when-i-first-got-addicted",
    title: "I Was 16 When I First Got Addicted: My Story of Recovery",
    excerpt:
      "A candid account of discovering pornography at 16, the hidden shame of the following years, and the path back to freedom. Written anonymously.",
    category: "real-stories",
    author: { name: "Anonymous", role: "Community Member", initials: "A", color: "#7c3aed" },
    publishedAt: "2026-05-05",
    readTime: 7,
    featured: false,
    tags: ["personal story", "recovery", "young men", "shame", "hope"],
    content: [
      {
        type: "p",
        text: "I want to start by saying something no one told me when I needed to hear it most: this is not a character flaw. It's not proof that you're broken or weak or beyond redemption. I know that because I was there — and I'm not there anymore.",
      },
      { type: "h2", text: "How It Started" },
      {
        type: "p",
        text: "I was 16, curious, and alone with an internet connection late at night. Like millions of boys my age, I stumbled across pornography without anyone to contextualise it. No one had ever talked to me about it. So I went back. And then I kept going back.",
      },
      {
        type: "p",
        text: "Within a year, it was a daily habit I couldn't imagine life without. I told myself it was normal, that everyone did it. What I didn't admit — couldn't yet admit — was that I felt hollow afterward, every single time.",
      },
      { type: "h2", text: "The Years I Lost" },
      {
        type: "p",
        text: "From 16 to 22, I watched the parts of my life I cared about slowly deteriorate. My grades slipped. I withdrew from friends. I developed what I now understand to be social anxiety. I had relationships but never felt truly present in them.",
      },
      {
        type: "quote",
        text: "The worst part wasn't the addiction itself. It was the isolation of carrying it alone, convinced that I was uniquely broken.",
      },
      { type: "h2", text: "The Turning Point" },
      {
        type: "p",
        text: "My turning point came at 22, during my third year of engineering. A close friend confided in me that he was struggling with the same thing. Hearing his words felt like a mirror. For the first time, I understood that I wasn't uniquely broken — this was a real, common, treatable condition.",
      },
      {
        type: "callout",
        title: "You Are Not Alone",
        text: "Research suggests that between 65–80% of young men in India regularly consume pornography. A significant portion develop problematic use patterns. If you're reading this, you're already ahead — most never seek help.",
        variant: "info",
      },
      { type: "h2", text: "Recovery: Messier Than You'd Expect, Better Than You'd Hope" },
      {
        type: "p",
        text: "Recovery wasn't linear. I had long streaks followed by relapses. Each time I got back up, I understood more about my triggers. And eventually, the gaps between relapses grew from days to weeks to months.",
      },
      {
        type: "p",
        text: "Today I'm three years free. I feel present. I feel capable of genuine intimacy. I feel like myself.",
      },
    ],
  },
  {
    slug: "anxiety-porn-connection",
    title: "The Anxiety-Porn Connection: Why You Feel Worse After Watching",
    excerpt:
      "If your anxiety spikes after consuming pornography, you're not imagining it. Here's the neuroscience behind the anxiety-porn cycle and how to break it.",
    category: "mental-health",
    author: AUTHORS.priya,
    publishedAt: "2026-04-28",
    readTime: 5,
    featured: false,
    tags: ["anxiety", "mental health", "dopamine crash", "cortisol"],
    content: [
      { type: "h2", text: "The Post-Porn Anxiety Spiral" },
      {
        type: "p",
        text: "You watch pornography. For a brief moment, there's relief — a dopamine surge that quiets whatever anxiety was driving the behavior. And then, almost immediately, the anxiety returns — often worse than before. This is not a coincidence. It's not a moral phenomenon. It's neurochemistry.",
      },
      { type: "h2", text: "What's Happening in Your Brain" },
      {
        type: "list",
        items: [
          "Dopamine surges during viewing, creating a temporary high",
          "Rapid dopamine drop after orgasm — the 'crash'",
          "Cortisol (stress hormone) levels rise to compensate",
          "Prefrontal cortex rebounds, creating harsh self-judgment",
          "Shame and regret amplify cortisol further",
          "Brain craves more dopamine to counter cortisol — the loop continues",
        ],
      },
      {
        type: "callout",
        title: "Recognizing the Loop",
        text: "Pornography often becomes a 'solution' to anxiety that creates more anxiety. If you find yourself using porn to cope with stress, loneliness, or boredom — you're likely trapped in this cycle.",
        variant: "warning",
      },
      { type: "h2", text: "Breaking the Cycle" },
      {
        type: "p",
        text: "The key is interrupting the cycle at the point of the urge — before the behavior. This requires building what psychologists call 'urge surfing' skills: the ability to observe an urge without acting on it.",
      },
      { type: "h3", text: "Practical Techniques" },
      {
        type: "list",
        items: [
          "5-4-3-2-1 grounding: Name 5 things you can see, 4 you can hear, 3 you can touch",
          "Cold exposure: A 30-second cold shower dramatically lowers arousal state",
          "Physical movement: 10 minutes of exercise redirects nervous energy",
          "Journaling the urge: Writing about what you're feeling builds self-awareness",
          "Contact: Texting or calling someone you trust breaks the isolation",
        ],
      },
    ],
  },
  {
    slug: "5-science-backed-techniques-to-manage-urges",
    title: "5 Science-Backed Techniques to Manage Urges (That Actually Work)",
    excerpt:
      "Proven strategies rooted in cognitive behavioral therapy and neuroscience. Not willpower — smart tools for the moments when it's hardest.",
    category: "recovery-tips",
    author: AUTHORS.aryan,
    publishedAt: "2026-04-20",
    readTime: 6,
    featured: false,
    tags: ["urge management", "CBT", "practical tips", "relapse prevention"],
    content: [
      {
        type: "p",
        text: "Willpower is a finite resource. Telling yourself to 'just stop' is like trying to outrun a car. Effective recovery isn't about having more willpower — it's about using smarter strategies that work with your neurobiology, not against it.",
      },
      { type: "h2", text: "1. Urge Surfing (Mindfulness-Based)" },
      {
        type: "p",
        text: "Developed from Mindfulness-Based Relapse Prevention (MBRP), urge surfing treats an urge like a wave: it rises, peaks, and falls — always. The goal isn't to fight the wave but to observe it without being pulled under. When an urge arrives: name it, locate it in your body, and observe it with curiosity. Most urges peak within 20–30 minutes and subside.",
      },
      { type: "h2", text: "2. Implementation Intentions" },
      {
        type: "p",
        text: "Research by psychologist Peter Gollwitzer shows that 'if-then' planning dramatically improves behavior change success. Create a specific plan before the urge arrives: 'If I feel an urge at night, I will immediately put on my shoes and walk outside for 10 minutes.'",
      },
      { type: "h2", text: "3. Cold Exposure" },
      {
        type: "p",
        text: "A 30–90 second cold shower has measurable physiological effects: it triggers norepinephrine release, reduces cortisol, and activates the sympathetic nervous system in a way that directly competes with the arousal state that fuels urges.",
      },
      { type: "h2", text: "4. Environmental Design" },
      {
        type: "p",
        text: "Rather than relying on willpower, design your environment to make the behavior harder. Install content filters on every device. Keep your phone outside your bedroom. Each barrier you add dramatically reduces the probability of relapse.",
      },
      { type: "h2", text: "5. Competing Response Training" },
      {
        type: "p",
        text: "From Habit Reversal Training: identify a physical behavior that is incompatible with the problematic behavior and automatically substitute it when you notice the urge. Examples: doing 20 push-ups, going for a walk, calling a friend.",
      },
      {
        type: "callout",
        title: "The Most Important Tool",
        text: "Accountability is the most evidence-backed intervention in addiction recovery. Having someone who knows about your goal and checks in with you regularly doubles your chances of long-term success.",
        variant: "tip",
      },
    ],
  },
  {
    slug: "neuroplasticity-your-brain-can-heal",
    title: "Neuroplasticity: The Science of Why Your Brain Can Actually Heal",
    excerpt:
      "Your brain is not permanently damaged. Neuroplasticity means the neural pathways built through addiction can be rebuilt. Here's the science of how healing works.",
    category: "brain-science",
    author: AUTHORS.drRaj,
    publishedAt: "2026-04-15",
    readTime: 7,
    featured: false,
    tags: ["neuroplasticity", "brain healing", "dopamine receptors", "recovery science"],
    content: [
      {
        type: "p",
        text: "One of the most powerful concepts in neuroscience is also one of the most hopeful: neuroplasticity. The brain is not a fixed, hardwired organ. It is constantly remodeling itself in response to your experiences, behaviors, and thoughts.",
      },
      { type: "h2", text: "What Neuroplasticity Actually Means" },
      {
        type: "p",
        text: "Neuroplasticity refers to the brain's ability to reorganize itself by forming new neural connections throughout life. For recovery from addiction, this means the pathways built through compulsive pornography use — the craving circuits, the dopamine dysregulation — can be rewired.",
      },
      {
        type: "quote",
        text: "Neurons that fire together, wire together — and neurons that no longer fire together, gradually unwire.",
        author: "Hebb's Rule, modern neuroscience",
      },
      { type: "h2", text: "The Evidence for Recovery" },
      {
        type: "list",
        items: [
          "Dopamine receptor density begins recovering within 2–4 weeks of abstinence",
          "Prefrontal cortex activity (impulse control) measurably improves by 6–8 weeks",
          "Natural reward sensitivity largely restored by 90 days for most individuals",
          "Long-term structural brain changes show improvement within 6 months",
        ],
      },
      { type: "h2", text: "How to Accelerate Healing" },
      {
        type: "list",
        items: [
          "Aerobic exercise: Stimulates BDNF, literally growing new brain connections",
          "Sleep: The brain consolidates and repairs during deep sleep stages",
          "Meditation: Thickens the prefrontal cortex and improves emotional regulation",
          "Social connection: Activates reward pathways through healthy, natural channels",
          "Learning new skills: Drives neuroplasticity through neural pathway formation",
        ],
      },
      {
        type: "callout",
        title: "A Message for Skeptics",
        text: "If you feel like you've been struggling too long for recovery to be possible, consider this: brain studies showing neuroplastic recovery include individuals with 10–20 year addiction histories. It's never too late.",
        variant: "tip",
      },
    ],
  },
  {
    slug: "talking-to-parents-about-porn-addiction-india",
    title: "How to Talk to Your Parents About Porn Addiction in India",
    excerpt:
      "A sensitive, practical guide for young men navigating the deeply taboo conversation about pornography addiction with Indian parents. What to say, and how.",
    category: "mental-health",
    author: AUTHORS.priya,
    publishedAt: "2026-04-08",
    readTime: 5,
    featured: false,
    tags: ["family", "Indian parents", "conversation guide", "shame", "support"],
    content: [
      {
        type: "p",
        text: "In a culture where conversations about sexuality are often avoided entirely, bringing up pornography addiction with your parents can feel impossible. But research on addiction recovery is consistent: social support, especially from family, is one of the strongest predictors of long-term success.",
      },
      { type: "h2", text: "Do You Even Need to Tell Them?" },
      {
        type: "p",
        text: "Not necessarily. Some people recover with the support of a counselor, a trusted friend, or an online community. But if your addiction has affected your academic performance or mental health in ways your parents have noticed — they deserve context, and you deserve support.",
      },
      { type: "h2", text: "Preparing for the Conversation" },
      {
        type: "list",
        items: [
          "Choose a calm, private moment — not after a conflict or when anyone is stressed",
          "Frame it as a health issue, not a moral one: 'I'm dealing with something affecting my mental health'",
          "Have information ready — neurological explanations can help de-shame the conversation",
          "Have a clear ask: 'I need your support in getting counseling'",
          "Prepare for a difficult initial reaction",
        ],
      },
      {
        type: "callout",
        title: "A Script to Start With",
        text: '"Amma/Appa, there\'s something important I need to tell you. I\'ve been struggling with a mental health issue — a behavioral addiction that\'s been affecting my focus and wellbeing. I\'d like to see a counselor. Can you help me with that?"',
        variant: "info",
      },
      { type: "h2", text: "If the Conversation Doesn't Go Well" },
      {
        type: "p",
        text: "Some parents react with anger, shame, or denial. If this happens, give them time. Your job is to take care of your recovery — not to manage their reaction. Pursue counseling independently if needed. You do not need their permission to heal.",
      },
    ],
  },
  {
    slug: "nofap-vs-noporn-which-works",
    title: "NoFap vs NoPorn: Which Approach Actually Works for Recovery?",
    excerpt:
      "Abstaining from all sexual release vs. abstaining from pornography alone. What does the science say? A nuanced, evidence-based breakdown.",
    category: "recovery-tips",
    author: AUTHORS.aryan,
    publishedAt: "2026-04-01",
    readTime: 6,
    featured: false,
    tags: ["nofap", "noporn", "recovery approach", "abstinence", "science"],
    content: [
      { type: "h2", text: "Defining the Terms" },
      {
        type: "p",
        text: "NoFap refers to abstaining from masturbation and pornography entirely. NoPorn refers specifically to abstaining from pornography while allowing masturbation without pornographic material.",
      },
      { type: "h2", text: "What the Research Suggests" },
      {
        type: "p",
        text: "The scientific literature is clearer on pornography than on masturbation. Studies showing neurological damage and dopamine dysregulation are specifically linked to pornography use — not masturbation in the absence of pornography.",
      },
      {
        type: "quote",
        text: "The goal of recovery is not about what you abstain from. It's about restoring your brain's natural reward sensitivity and your capacity for genuine intimacy.",
      },
      { type: "h2", text: "A Practical Framework" },
      {
        type: "list",
        items: [
          "Start with NoPorn as your minimum commitment — this is non-negotiable",
          "If masturbation consistently leads to relapse, consider NoFap",
          "If you have PIED (pornography-induced erectile dysfunction), a complete reboot is recommended",
          "Track your mood and energy honestly — your experience is valid data",
          "Neither approach requires lifelong celibacy",
        ],
      },
      {
        type: "callout",
        title: "The Bottom Line",
        text: "Don't let the NoFap vs NoPorn debate become a procrastination tool. Start with eliminating pornography today. Everything else is refinement.",
        variant: "tip",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(post: BlogPost, count = 3): BlogPost[] {
  return blogPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const score = (p: BlogPost) =>
        (p.category === post.category ? 2 : 0) +
        (p.tags.some((t) => post.tags.includes(t)) ? 1 : 0);
      return score(b) - score(a);
    })
    .slice(0, count);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
