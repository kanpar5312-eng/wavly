export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  /** Array of paragraphs / headings. Lines starting with "## " render as headings. */
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "reduce-no-shows-telegram-clinics",
    title: "5 ways Telegram automation cuts no-shows for clinics",
    excerpt:
      "No-shows quietly drain 15–20% of a clinic's revenue. Here's how a simple Telegram bot brings most of those patients back.",
    category: "Clinics",
    date: "26 May 2026",
    readTime: "4 min read",
    body: [
      "If you run a clinic in India, you already know the quiet killer of your schedule: the no-show. A patient books a slot, you hold it open, and they never arrive. Industry-wide, that's 15–20% of appointments — and every empty chair is lost revenue you can't get back.",
      "The good news: most no-shows aren't deliberate. People forget, get busy, or assume they can reschedule later. A timely nudge fixes the vast majority of them. Here's how clinics are using Telegram automation to do exactly that.",
      "## 1. Send a confirmation the moment they book",
      "The instant a patient books, your bot replies with a clear confirmation — date, time, doctor, and address. This single message removes the #1 cause of confusion-driven no-shows.",
      "## 2. Remind them 1 hour before",
      "A reminder one hour before the appointment, with a one-tap YES/NO button, catches people while they can still act. Wavly's data shows this recovers the largest share of would-be no-shows.",
      "## 3. Add a 30-minute final nudge",
      "For appointments people tend to drift on, a short final reminder 30 minutes before keeps you top of mind without being annoying.",
      "## 4. Make rescheduling effortless",
      "Half of no-shows happen because rescheduling feels like a hassle. If your bot lets patients tap 'Reschedule' and pick a new slot in seconds, they'll move the appointment instead of ghosting it.",
      "## 5. Re-engage the ones who slip through",
      "When someone does miss, an automatic, friendly follow-up ('We missed you — want to rebook?') wins back a surprising number of patients within 48 hours.",
      "Put together, these five automations typically cut a clinic's no-show rate by more than half — often paying for the whole tool several times over in recovered bookings.",
    ],
  },
  {
    slug: "salons-fill-quiet-days-telegram",
    title: "How Indian salons fill quiet days with Telegram bots",
    excerpt:
      "Tuesdays and rainy afternoons don't have to be dead. A two-line broadcast can fill your chairs in an hour.",
    category: "Salons",
    date: "21 May 2026",
    readTime: "3 min read",
    body: [
      "Every salon owner knows the rhythm: weekends are packed, mid-week is a graveyard. Those slow Tuesday afternoons aren't just boring — they're money sitting idle while your stylists wait.",
      "The fastest fix isn't more ads. It's talking to the customers you already have.",
      "## Your customer list is your best asset",
      "You've already served hundreds of people. Their numbers are sitting in your phone. A single, well-timed Telegram broadcast to that list — 'Free this Tuesday? 20% off all facials, reply BOOK' — can fill a quiet day in under an hour.",
      "## Segment for better results",
      "Don't blast everyone the same thing. Send VIPs early access to new services. Win back dormant clients with a small 'we miss you' offer. New customers get a warm welcome and a first-visit nudge. Wavly lets you pick these segments in one tap.",
      "## Keep it human, not spammy",
      "The trick is restraint. One thoughtful message a week beats daily noise. Personalize it with the customer's name, keep the offer genuine, and always give them an easy way to book right from the chat.",
      "Salons using broadcasts smartly report filling 20–40% of their slow slots — turning dead afternoons into real revenue, without spending a rupee on ads.",
    ],
  },
  {
    slug: "telegram-vs-whatsapp-business-automation",
    title: "Telegram vs WhatsApp for business automation in 2026",
    excerpt:
      "Both are huge in India. But for automation, bots, and getting started fast, they're not equal. Here's the honest comparison.",
    category: "Guides",
    date: "16 May 2026",
    readTime: "5 min read",
    body: [
      "If you want to automate customer conversations, you'll eventually face the question: Telegram or WhatsApp? Both have massive reach in India. But under the hood, they're built very differently — and that difference matters a lot when you're a small business getting started.",
      "## Getting started: Telegram wins on speed",
      "With Telegram, you create a bot through @BotFather in two minutes, copy a token, and you're live. No business verification, no approvals, no waiting. WhatsApp's Business API, by contrast, requires Meta verification, an approved business, and often a paid provider to even begin.",
      "## Cost: Telegram is free to automate",
      "Telegram's Bot API is completely free, with no per-message charges. WhatsApp charges per conversation and usually requires a paid provider on top. For a small business watching every rupee, that's a real difference.",
      "## Flexibility: bots, buttons, and more",
      "Telegram bots support rich buttons, inline menus, and instant interactions out of the box — perfect for booking flows and quick replies. It's genuinely built for automation.",
      "## Where WhatsApp still leads",
      "Let's be honest: WhatsApp has deeper penetration among older and less tech-savvy customers in India. For some businesses, that reach is decisive. The ideal is to start where it's easy and add WhatsApp later as you grow.",
      "## Our take",
      "For a business that wants to automate today — without verification headaches, approval delays, or per-message bills — Telegram is the faster, cheaper place to start. That's exactly why we built Wavly on Telegram first, with WhatsApp on our roadmap.",
    ],
  },
  {
    slug: "10-minute-telegram-bot-for-coaches",
    title: "The 10-minute Telegram bot every coach should set up",
    excerpt:
      "Coaches lose hours answering the same questions. Here's a simple bot setup that handles them for you — built in under ten minutes.",
    category: "Coaches",
    date: "9 May 2026",
    readTime: "4 min read",
    body: [
      "If you coach — fitness, business, life, anything — your day gets eaten alive by the same handful of questions. 'What are your timings?' 'How much per session?' 'Do you have a slot this week?' Answering them one by one is a quiet productivity killer.",
      "Here's a bot setup you can build in ten minutes that handles all of it.",
      "## Step 1: Connect your bot (2 min)",
      "Create a bot with @BotFather, paste the token into Wavly, and you're connected. No code, no technical setup.",
      "## Step 2: Add your top 5 auto-replies (4 min)",
      "Think of the five questions you answer most. Write a clear, friendly reply for each, set the keyword that triggers it, and turn them on. Now those questions answer themselves — instantly, even at 2 AM.",
      "## Step 3: Turn on booking (2 min)",
      "Let clients pick a session slot right inside the chat. It syncs to your calendar and confirms automatically — no more back-and-forth.",
      "## Step 4: Switch on reminders (2 min)",
      "A reminder before each session keeps your clients showing up and your schedule full.",
      "That's it. Ten minutes of setup buys back hours every week — time you can spend actually coaching, not typing the same answers over and over.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
