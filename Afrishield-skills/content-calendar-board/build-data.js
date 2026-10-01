const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..', 'Afrishield content startegy plan', '180-day-calendar');
const outputJsPath = path.resolve(__dirname, 'content-data.js');
const outputJsonPath = path.resolve(__dirname, 'content-data.json');

// Robust CSV parser handling multiline fields and quotes
function parseCSV(text) {
  const lines = [];
  let row = [];
  let inQuotes = false;
  let currentField = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentField += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(currentField.trim());
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++; // skip LF after CR
      }
      row.push(currentField.trim());
      currentField = '';
      if (row.some(f => f.length > 0)) {
        lines.push(row);
      }
      row = [];
    } else {
      currentField += char;
    }
  }
  if (currentField.length > 0 || row.length > 0) {
    row.push(currentField.trim());
    if (row.some(f => f.length > 0)) {
      lines.push(row);
    }
  }
  return lines;
}

const monthThemes = {
  1: {
    title: "Month 1 — The AI Search Revolution",
    subtitle: "Days 1–30 (2026-08-17 → 2026-09-15)",
    theme: "Teach African businesses that search and discovery have changed.",
    focus: "Make owners feel with receipts that 'I have a website' stopped being a marketing strategy.",
    funnel: "Awareness → Curiosity → Owned Baseline (Comment VISIBLE / AI / AUDIT)",
    color: "#10B981"
  },
  2: {
    title: "Month 2 — GEO & Technical Visibility",
    subtitle: "Days 31–60 (2026-09-16 → 2026-10-15)",
    theme: "Generative Engine Optimization & Authority in AI Answers.",
    focus: "Own the GEO conversation for African businesses. Schema, citations, entity building, and crawler allowlists.",
    funnel: "Education → Audit Request (Comment GEO / DM AUDIT)",
    color: "#06B6D4"
  },
  3: {
    title: "Month 3 — Tourism & Hospitality Domination",
    subtitle: "Days 61–90 (2026-10-16 → 2026-11-14)",
    theme: "The Booking Bleeders: Safari Lodges, Operators & Direct Bookings.",
    focus: "Ending the 15-25% OTA commission bleed. Winning direct international bookings in AI search.",
    funnel: "Direct Booking Math → Free AI Visibility Audit",
    color: "#F59E0B"
  },
  4: {
    title: "Month 4 — AI Agents, Voice & 24/7 Front Desk",
    subtitle: "Days 91–120 (2026-11-15 → 2026-12-14)",
    theme: "SERVED & CONVERTED: AI Receptionists & Midnight Inquiries.",
    focus: "Never lose a high-ticket client to an unanswered phone or dead WhatsApp at 11 PM.",
    funnel: "Missed Call Math → Voice Agent Demo",
    color: "#8B5CF6"
  },
  5: {
    title: "Month 5 — Scaling with Virtual Executive Assistants",
    subtitle: "Days 121–150 (2026-12-15 → 2027-01-13)",
    theme: "SCALED: AI Automation & Virtual Executive Assistants.",
    focus: "Freeing owners from 40 daily emails, quote generation, and repetitive admin.",
    funnel: "Founder Freedom → Workflow Automation Audit",
    color: "#EC4899"
  },
  6: {
    title: "Month 6 — Compounding Growth & Full Ecosystem",
    subtitle: "Days 151–180 (2027-01-14 → 2027-02-12)",
    theme: "Compounding Growth, Authority & 12-in-12 Case Studies.",
    focus: "Receipts of the 12-in-12 public goal, year-in-review, and establishing the complete AI operating engine.",
    funnel: "Case Study Proof → Full-Service Retainer",
    color: "#3B82F6"
  }
};

const allDays = [];

for (let m = 1; m <= 6; m++) {
  const csvFile = path.join(baseDir, `calendar-month-${m}.csv`);
  if (!fs.existsSync(csvFile)) {
    console.error(`Missing file: ${csvFile}`);
    continue;
  }
  const content = fs.readFileSync(csvFile, 'utf8');
  const rows = parseCSV(content);
  if (rows.length < 2) continue;

  const headers = rows[0].map(h => h.trim());
  
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const item = {};
    headers.forEach((h, idx) => {
      item[h] = row[idx] || '';
    });

    const dayNumberMatch = (item["Day"] || "").match(/Day\s+(\d+)/i);
    const dayNumber = dayNumberMatch ? parseInt(dayNumberMatch[1], 10) : (allDays.length + 1);

    const structuredDay = {
      id: `day-${dayNumber}`,
      dayNumber: dayNumber,
      date: item["Date"] || "",
      dayString: item["Day"] || `Day ${dayNumber}`,
      monthNumber: m,
      monthTheme: item["Month"] || monthThemes[m].title,
      week: item["Week"] || `Week ${Math.ceil(dayNumber / 7)}`,
      industry: item["Industry"] || "Tourism & Hospitality",
      niche: item["Niche/Sub-niche"] || "",
      contentPillar: item["Content Pillar"] || "AI Search / AI SEO",
      contentSeries: (item["Content Series"] || "—").replace(/^—$/, "General"),
      contentType: item["Content Type"] || "Story",
      hook: item["Hook"] || "",
      storyAngle: item["Story Angle"] || "",
      mainTopic: item["Main Topic"] || "",
      keyLesson: item["Key Lesson"] || "",
      videoIdea: item["Video/Demo Idea"] || "",
      diySteps: item["DIY Steps"] || "—",
      cta: item["CTA"] || "Follow for the next experiment",
      
      // Platform copies
      platforms: {
        tiktok: item["TikTok Idea"] || "",
        instagramReel: item["Instagram Reel Idea"] || "",
        facebookReel: item["Facebook Reel Idea"] || "",
        youtubeShort: item["YouTube Short Idea"] || "",
        youtubeLong: item["YouTube Long-form Idea"] || "—",
        linkedIn: item["LinkedIn Post Angle"] || "",
        instagramStory: item["Instagram Story"] || "",
        facebookStory: item["Facebook Story"] || ""
      },
      
      caption: item["Caption"] || "",
      seoKeywords: item["SEO Keywords"] || "",
      hashtags: item["Hashtags"] || "",
      status: item["Status"] || "Not Started",
      assetLink: item["Asset Link"] || "",
      performance: item["Performance"] || "",
      views: item["Views"] || "0",
      engagement: item["Engagement"] || "0",
      leads: item["Leads"] || "0"
    };

    allDays.push(structuredDay);
  }
}

// Curated Instagram Meme Library (African AI SEO themed)
const instagramMemes = [
  {
    id: "meme-1",
    title: "The 20% OTA Bleed",
    category: "Commission Math",
    targetNiche: "Booking Bleeders (Safari & Lodges)",
    format: "1:1 / 4:5 Carousel",
    hook: "Lodge owner paying $2,100/mo to Booking.com vs paying their own website $0",
    topText: "LODGE OWNER PAYING $2,500/MO TO BOOKING.COM COMMISSION",
    bottomText: "LODGE OWNER WHEN YOU SUGGEST SPENDING $300 ON AI SEO FOR THEIR OWN SITE",
    punchline: "\"We don't have the budget for marketing this month.\"",
    theme: "dark-emerald",
    style: "split-comparison",
    leftLabel: "Paying 20% Commission to OTAs",
    leftContent: "💸 $2,400/month gone forever\n📉 Zero customer data retained\n🏨 Guest books again via OTA next year",
    rightLabel: "Investing in Direct AI Visibility",
    rightContent: "🦁 Cited directly in ChatGPT & Perplexity\n💵 100% direct bookings kept\n📈 Permanent digital asset owned",
    caption: "You paid Booking.com $2,100 last month. What did you pay your own website? Every OTA booking hands away 15–25% of your hard work. Direct search is the channel you already own. Link in bio for free AI-visibility check.",
    hashtags: "#CommissionMath #SafariOperator #LodgeMarketing #AfricanTourism #DirectBookings #AISEO"
  },
  {
    id: "meme-2",
    title: "The 4-Year-Old Google Business Profile",
    category: "Get Found Africa",
    targetNiche: "All African Businesses",
    format: "1:1 Square",
    hook: "Google trying to verify your business when your last post was from 2021",
    topText: "AI SEARCH ENGINES SEARCHING FOR YOUR BUSINESS IN 2026:",
    bottomText: "YOUR GOOGLE BUSINESS PROFILE LAST UPDATED IN NOVEMBER 2021 WITH A BLURRY PHOTO OF A FLYER",
    punchline: "\"Address: Behind Total Petrol Station, call on Sunday\"",
    theme: "cyber-cyan",
    style: "tweet-card",
    author: "ChatGPT",
    handle: "@openai_ai",
    tweetContent: "I tried recommending this lodge in Arusha, but their website blocks my crawler, their Google Profile has 2 photos from 2019, and their services list says 'call for price'. So I sent the $4,000 traveler to an American aggregator instead. 🤷‍♂️",
    caption: "Your Google Business Profile is quietly one of your most-read pages — by AI engines. If you haven't touched it since 2021, AI considers you closed. Fix it in 10 minutes. Comment 'VISIBLE' for the 6-step checklist.",
    hashtags: "#GetFoundAfrica #LocalSEO #GoogleBusinessProfile #AfricanBusiness #AISearch"
  },
  {
    id: "meme-3",
    title: "The $4,000 Safari Prompt",
    category: "The AI Concierge Test",
    targetNiche: "Safari Operators & Lodges",
    format: "4:5 Carousel / 9:16 Reel",
    hook: "I asked ChatGPT for a $4,000 Tanzania safari. Zero local operators named.",
    topText: "TRAVELER: \"PLAN A 7-DAY SERENGETI SAFARI WITH A LOCAL OPERATOR FOR $4,000\"",
    bottomText: "CHATGPT: RECOMMENDS 2 UK AGGREGATORS, 1 US TRAVEL BLOGGER, AND A 20% COMMISSION PLATFORM",
    punchline: "Tanzanian operators with 1,500 five-star reviews: 🫥 INVISIBLE",
    theme: "amber-luxury",
    style: "headline-card",
    badge: "THE AI CONCIERGE TEST · EPISODE 1",
    subheading: "Why having 500 reviews on TripAdvisor doesn't make you visible in AI answers.",
    caption: "ChatGPT knows Arusha. It knows the Serengeti. It does NOT know your lodge. When money changes hands, AI routes travelers to whoever it can read and verify. Comment 'AI' to see what AI says about your business.",
    hashtags: "#AIConciergeTest #TanzaniaSafari #SafariMarketing #GEO #AIVisibility #AfriShieldAI"
  },
  {
    id: "meme-4",
    title: "The Deleted 74% Keyword List",
    category: "Behind the Desk",
    targetNiche: "Corporate & Trust Sellers",
    format: "1:1 Square",
    hook: "Client watching us delete 74% of their keyword list on day one",
    topText: "CLIENT WATCHING US DELETE 74% OF THEIR 500-KEYWORD LIST ON DAY 1:",
    bottomText: "\"WAIT! BUT WHAT ABOUT 'FREE ACCOUNTING ADVICE PDF DOWNLOAD'?!\"",
    punchline: "The 3-in-4 rule: Filtering noise is what you actually pay for.",
    theme: "dark-emerald",
    style: "tweet-card",
    author: "AfriShield AI SEO",
    handle: "@afrishieldai",
    tweetContent: "Agency A: 'We will target 1,000 keywords for your law firm!' (980 are students doing homework)\n\nAfriShield AI: 'We deleted 74% of your keywords. Here are the 12 that actually bring high-intent retainers.'",
    caption: "Roughly 3 in 4 keywords never earn a page. Ranking for 'what is accounting' gets you high school students. Ranking for 'commercial tax dispute lawyer Nairobi' gets you paying clients. Quality over noise.",
    hashtags: "#KeywordGraveyard #SEOTruths #LawFirmMarketing #ProfessionalServices #B2BMarketing"
  },
  {
    id: "meme-5",
    title: "Voicemail vs AI Receptionist at 11:30 PM",
    category: "AI Agents / Voice",
    targetNiche: "Real Estate & Clinics",
    format: "1:1 / 4:5 Carousel",
    hook: "Client calls your business at 11:30 PM: Voicemail vs AI Voice Agent",
    topText: "HIGH-VALUE CLIENT CALLS YOUR AGENCY AT 11:30 PM FROM LONDON",
    bottomText: "OLD WAY: 4 BEEPS → VOICEMAIL → THEY CALL YOUR COMPETITOR WHO ANSWERS\nNEW WAY: AI RECEPTIONIST ANSWERS IN 2 SECONDS, QUALIFIES BUDGET & BOOKS VIEWING",
    punchline: "Your competitor isn't AI. Your competitor is the missed call.",
    theme: "purple-neon",
    style: "split-comparison",
    leftLabel: "Old Voicemail Way",
    leftContent: "📵 Rings out for 30s\n🛑 'Please leave a message after the tone'\n😴 WhatsApp seen at 10:00 AM next day\n💸 Client booked with someone else at 11:35 PM",
    rightLabel: "AfriShield Voice Agent",
    rightContent: "⚡ Picked up in 1 ring\n🎙️ Natural, warm conversation\n📋 Qualifies budget & bedroom requirements\n📅 Viewing booked in Google Calendar instantly",
    caption: "'Customers hate talking to machines.' No — customers hate talking to voicemail that never answers back. When a $200k property buyer calls from abroad, the first to answer gets the deal.",
    hashtags: "#AIAgents #VoiceAI #RealEstateAfrica #MissedCallMath #247FrontDesk #PropTech"
  },
  {
    id: "meme-6",
    title: "The $2,000 Sitemap Scam",
    category: "SEO Myths & Mistakes",
    targetNiche: "Invisible Hustlers & Small Biz",
    format: "1:1 Square",
    hook: "Someone charged you $2,000 to submit your site to Google",
    topText: "GURU AGENCY: \"THAT WILL BE $2,000 TO MANUALLY SUBMIT YOUR SITEMAP TO SEARCH ENGINES\"",
    bottomText: "GOOGLE SEARCH CONSOLE: \"LITERALLY FREE AND TAKES 4 SECONDS\"",
    punchline: "Anti-guru rule: Receipts or silence.",
    theme: "amber-luxury",
    style: "tweet-card",
    author: "Danielle Ryan Energy",
    handle: "@no_guru_fluff",
    tweetContent: "If an agency charges you for 'sitemap submission' or 'meta keyword optimization' in 2026, call the police. You are being robbed in broad daylight. 😂",
    caption: "Stop paying for 2012 SEO tactics. Submitting a sitemap is free. Meta keywords haven't mattered in 15 years. What matters today is GEO, crawlable plain-text answers, and schema. Learn what works, link in bio.",
    hashtags: "#SEOMyths #AntiGuru #SmallBusinessTips #LearnSEO #AfriShieldAI #DigitalMarketing"
  },
  {
    id: "meme-7",
    title: "London Cousin Syndrome",
    category: "Diaspora Bridge",
    targetNiche: "Tourism & Hotels",
    format: "1:1 Square / 9:16 Story",
    hook: "Your cousin in London trying to search for your lodge back home",
    topText: "YOU: \"MY COUSIN HAS A BEAUTIFUL BOUTIQUE HOTEL IN KIGALI!\"",
    bottomText: "YOUR FRIENDS IN LONDON SEARCHING ON CHATGPT & GOOGLE: 0 RESULTS FOUND",
    punchline: "\"The internet isn't broken. Your local GEO is.\"",
    theme: "cyber-cyan",
    style: "headline-card",
    badge: "DIASPORA BRIDGE · EPISODE 1",
    subheading: "Local word-of-mouth doesn't cross international borders. Structured data does.",
    caption: "Diaspora travelers plan trips from London, Toronto, and Dubai — mostly through AI search now. Local word-of-mouth doesn't reach foreign servers without structured entity signals. Share this with your cousin who owns a lodge!",
    hashtags: "#DiasporaBridge #AfricanDiaspora #KigaliHotel #LocalGEO #AfricanTourism"
  },
  {
    id: "meme-8",
    title: "The 40-Page Agency Report vs 1-Page AfriShield",
    category: "Receipts & Proof",
    targetNiche: "Corporate & Law Firms",
    format: "4:5 Carousel",
    hook: "40-page agency PDF full of vanity metrics vs AfriShield's 1-page report with wins & losses",
    topText: "OTHER AGENCIES: 47-PAGE PDF OF 'IMPRESSIONS', 'KEYWORD DENSITY', AND 'POTENTIAL REACH'",
    bottomText: "AFRISHIELD AI: 1-PAGE REPORT. DIRECT BOOKINGS, AI CITATIONS, WINS AND LOSSES SHOWN PLAINLY.",
    punchline: "Losses go in the report. Real operators don't hide behind graphs.",
    theme: "dark-emerald",
    style: "split-comparison",
    leftLabel: "Traditional Agency PDF",
    leftContent: "📑 47 pages of unreadable graphs\n✨ 'Impressions grew by 300%'\n📉 Zero phone calls or sales tracked\n🙈 Losses conveniently omitted",
    rightLabel: "AfriShield 1-Page Report",
    rightContent: "📄 One plain-language page\n🎯 Exact AI citations tracked\n💵 Direct revenue & leads measured\n🤝 Honest: what worked & what flopped",
    caption: "Every month on Report Day, we show our clients exactly what happened. One page. Wins and losses both included. No dashboard mysteries. Swipe to see what a real report looks like.",
    hashtags: "#ReportDay #ReceiptsOverPromises #TransparentMarketing #B2BSEO #AfriShieldAI"
  },
  {
    id: "meme-9",
    title: "Robots.txt Disallow: /",
    category: "Plain-English SEO School",
    targetNiche: "Web Developers & Owners",
    format: "1:1 Square",
    hook: "When your web developer accidentally blocks GPTBot in robots.txt",
    topText: "BUSINESS OWNER: \"WHY IS CHATGPT RECOMMENDING MY COMPETITOR INSTEAD OF ME?\"",
    bottomText: "THEIR ROBOTS.TXT FILE:\nUser-agent: GPTBot\nDisallow: /",
    punchline: "\"You didn't rank low. You literally locked the front door.\"",
    theme: "cyber-cyan",
    style: "tweet-card",
    author: "Tech Check",
    handle: "@getfoundafrica",
    tweetContent: "Over 35% of African business websites we audited this month had templates that block AI crawlers (GPTBot, PerplexityBot, ClaudeBot) by default. Takes 2 minutes to check: yoursite.com/robots.txt",
    caption: "Some of you are paying thousands for a website that actively tells AI engines to go away. Open yoursite.com/robots.txt right now. If you see Disallow under GPTBot, get that deleted today. Comment 'GEO' for the fix guide.",
    hashtags: "#RobotsTxt #AICrawlers #GetFoundAfrica #GEO #WebDesignAfrica #TechTips"
  },
  {
    id: "meme-10",
    title: "The 10 Blue Links vs AI Shortlist",
    category: "The AI Search Revolution",
    targetNiche: "Cross-Industry",
    format: "4:5 Carousel / 1:1 Square",
    hook: "Old Google giving you 10 links of homework vs AI giving you a vetted 3-name shortlist",
    topText: "SEARCHING IN 2015: 10 BLUE LINKS. YOU CLICK, READ, FILTER, AND RESEARCH.",
    bottomText: "SEARCHING IN 2026: \"HERE ARE THE TOP 3 FIRMS BASED ON VERIFIED REVIEWS, SPECIALIZATION & PRICING.\"",
    punchline: "Being on page 1 of Google is good. Being in the AI answer is revenue.",
    theme: "dark-emerald",
    style: "split-comparison",
    leftLabel: "Old Google SERP",
    leftContent: "🔗 10 links with ad spam\n🔍 User has to open 8 tabs\n⏳ 30 minutes of reading blogs\n📉 Low conversion",
    rightLabel: "New AI Discovery",
    rightContent: "🤖 One synthesized answer\n🏆 Top 3 names recommended\n⭐ Reasons & pricing cited\n🚀 Direct high-intent call",
    caption: "The ten blue links became one answer naming three businesses. Everything we do follows from that. If your business isn't in those three names, you don't exist to modern buyers. Run your free audit at afrishieldai.com",
    hashtags: "#AISearch #TheNewPageOne #GoogleVsAI #AEO #GEO #DigitalTransformation"
  },
  {
    id: "meme-11",
    title: "The 2,000 Five-Star Reviews Trap",
    category: "The AI Concierge Test",
    targetNiche: "Hotels & Safari Operators",
    format: "1:1 Square",
    hook: "2,000 five-star reviews on TripAdvisor and zero citations on ChatGPT",
    topText: "LODGE OWNER: \"WE HAVE 2,000 5-STAR REVIEWS ON TRIPADVISOR, WE DON'T NEED SEO!\"",
    bottomText: "CHATGPT TRYING TO READ REVIEWS LOCKED BEHIND JAVASCRIPT & AGGREGATOR PAYWALLS:",
    punchline: "\"Who? Never heard of them.\"",
    theme: "amber-luxury",
    style: "tweet-card",
    author: "AI Search Bot",
    handle: "@perplexity_ai",
    tweetContent: "AI models don't browse review sites like a human. If your verified customer proof isn't structured on your own domain and third-party entity graphs, it doesn't exist in my answer.",
    caption: "Reputation used to travel by word of mouth. Now it travels by machine-readable data. If your 5-star reputation is trapped on a third-party app that charges you commission, you are held hostage. Build your own entity authority. Link in bio.",
    hashtags: "#TripAdvisorTrap #SafariMarketing #GEO #HotelSEO #AfricanTourism"
  },
  {
    id: "meme-12",
    title: "Lawyer #1 on Google for Name",
    category: "Industry Case Study",
    targetNiche: "Law & Accounting Firms",
    format: "1:1 Square",
    hook: "Law firm partner proud of ranking #1 for his exact full name",
    topText: "MANAGING PARTNER: \"OUR SEO IS GREAT, WE ARE #1 ON GOOGLE FOR 'JOHN DOE & PARTNERS ADVOCATES'\"",
    bottomText: "PROSPECT ASKING CHATGPT: \"WHO IS THE BEST CORPORATE MERGERS LAWYER IN NAIROBI?\"\nAI: RECOMMENDS HIS 3 BIGGEST RIVALS",
    punchline: "\"Ranking for your own business name is called having a website, John.\"",
    theme: "dark-emerald",
    style: "tweet-card",
    author: "AfriShield B2B Lab",
    handle: "@afrishieldai",
    tweetContent: "Nobody who doesn't already know you searches for your full legal company name. They search the problem: 'tax dispute defense lawyer Nairobi' or 'safari operator Arusha migration'. Win the question, not just your name.",
    caption: "He won the old game (referrals and vanity rankings). The new game doesn't read the old scoreboard. If a prospect asks AI for the best firm in your sector tonight, does your name appear? Test it with our free AI audit.",
    hashtags: "#LawFirmSEO #LegalTechAfrica #ProfessionalServices #B2BMarketing #AISEO"
  },
  {
    id: "meme-13",
    title: "The 3-Day WhatsApp Seen",
    category: "AI Agents / Voice",
    targetNiche: "Clinics & Consultancies",
    format: "1:1 Square",
    hook: "WhatsApp inquiry sent on Friday at 6 PM — Blue ticked on Monday at 11 AM",
    topText: "PATIENT / CLIENT: \"HELLO, I WANT TO BOOK A $1,500 CONSULTATION WITH THE DOCTOR\"\nFRIDAY 6:02 PM: 🔵🔵 (READ)",
    bottomText: "RECEPTIONIST ON MONDAY AT 11:15 AM:\n\"HELLO DEAR, HOW MAY I HELP YOU?\"\nCLIENT: \"I ALREADY HAD MY SURGERY AT ANOTHER CLINIC ON SATURDAY.\"",
    punchline: "Speed to lead is everything. AI converts in 3 seconds.",
    theme: "purple-neon",
    style: "tweet-card",
    author: "Speed to Lead Index",
    handle: "@lead_response",
    tweetContent: "Studies show responding to an inquiry within 5 minutes increases conversion by 391%. Waiting until Monday morning decreases conversion to roughly 0%.",
    caption: "Your staff deserves weekends off. Your revenue does not have to stop on Friday at 5 PM. AfriShield AI agents handle booking, FAQ, and calendar scheduling 24/7/365. Comment 'AI' for a live test.",
    hashtags: "#WhatsAppAutomation #AIAgents #ClinicMarketing #SpeedToLead #CustomerServiceAI"
  },
  {
    id: "meme-14",
    title: "The Keyword Graveyard: 'Best Safari Africa'",
    category: "The Keyword Graveyard",
    targetNiche: "Tourism & Safari",
    format: "1:1 Square / 9:16 Story",
    hook: "Here lies 'best safari Africa' (2008-2024). Died of natural causes. RIP.",
    topText: "🪦 HERE LIES 'BEST SAFARI AFRICA' (2008 – 2024)",
    bottomText: "CAUSE OF DEATH: TRAVELERS STOPPED TYPING 3-WORD KEYWORDS AND STARTED ASKING CHATGPT 40-WORD QUESTIONS.",
    punchline: "Mourners will now ask: 'Where to stay in Serengeti with kids in October under $400/night'",
    theme: "dark-emerald",
    style: "tombstone",
    caption: "First burial in the Keyword Graveyard this week: 'best safari Africa'. Nobody searches like a robot anymore. They converse with AI. If your content doesn't answer specific questions, it is buried with this keyword. Link in bio for GEO strategy.",
    hashtags: "#KeywordGraveyard #SEOIsDead #GEO #AfricanTourism #SafariMarketing"
  },
  {
    id: "meme-15",
    title: "AI Voice Agent vs 40 Daily Emails",
    category: "Virtual Executive Assistant",
    targetNiche: "Founders & Owners",
    format: "4:5 Carousel",
    hook: "Clearing 40 repetitive booking emails before breakfast with an AI Assistant",
    topText: "LODGE OWNER RUNNING EVERY DEPARTMENT HIMSELF VS OWNER WITH AN AFRISHIELD AI EXECUTIVE ASSISTANT",
    bottomText: "YOU WERE MEANT TO BUILD A BUSINESS, NOT BE THE WORLD'S MOST EXPENSIVE INBOX MANAGER.",
    punchline: "Automate the repetitive 80%. Protect the creative 20%.",
    theme: "purple-neon",
    style: "split-comparison",
    leftLabel: "Owner Solo (Burnt Out)",
    leftContent: "📧 47 unread emails about rates\n📝 Re-typing the same PDF quote 10x/day\n⏳ 3 hours on invoicing & reminders\n😵 Zero time for guest experience",
    rightLabel: "AfriShield AI VEA",
    rightContent: "⚡ Quotes drafted & sent in 2 minutes\n🤖 Inquiries qualified & CRM updated\n📊 Daily 1-page summary sent at 8 AM\n🧘 Owner focuses 100% on hospitality",
    caption: "The customer journey moved to AI — and your internal operations should too. Discovered → Converted → Served → Scaled. When your business runs with AI agents, you get your life back. Comment 'SCALE' to see how it works.",
    hashtags: "#AIAssistant #VirtualExecutiveAssistant #AutomationAfrica #ScaleYourBusiness #FounderLife"
  }
];

// Strategy Metadata
const strategyMetadata = {
  brand: {
    name: "AfriShield AI",
    website: "https://afrishieldai.com",
    tagline: "Be the Answer.",
    publicGoal: "12 African tourism businesses onto page 1 and into AI answers in 12 months. This is where we document it.",
    fourLoops: [
      { name: "1. DISCOVERED", desc: "AI SEO, GEO, crawler allowlists, entity building, structured schema." },
      { name: "2. CONVERTED", desc: "AI booking engines, instant qualification agents, frictionless inquiry capture." },
      { name: "3. SERVED", desc: "Voice AI receptionists, 24/7 midnight answer bots, instant multilingual support." },
      { name: "4. SCALED", desc: "Virtual executive assistants, automated quoting, invoice routing, owner freedom." }
    ],
    nichePriority: [
      { tier: "PRIMARY (Launch - M1-M6)", niche: "Tourism & Hospitality", share: "55–60%", pain: "15–25% OTA commission bleed, invisible to high-paying international travelers in AI." },
      { tier: "SECONDARY (Month 2+)", niche: "Professional Services (Law, Accounting, Tax)", share: "25%", pain: "Drying referral pipelines, competitors recommended by AI over established partners." },
      { tier: "SUB-NICHE", niche: "Real Estate & Property Developers", share: "10%", pain: "Missed after-hours inquiries from diaspora buyers, poor crawler optimization." },
      { tier: "EXPERIMENTAL", niche: "Beauty Clinics & Skincare", share: "5%", pain: "Instagram fame failing to translate into search and AI recommendations." }
    ]
  },
  recurringSeries: [
    { name: "The AI Concierge Test", tag: "#AIConciergeTest", freq: "Weekly, Fridays", desc: "Flagship series. Ask ChatGPT/Perplexity a real buyer question, audit recommendations, show the fix." },
    { name: "Get Found Africa", tag: "#GetFoundAfrica", freq: "Weekly, Tuesdays", desc: "Numbered one-fix DIY tutorials (Ep 1, 2, 3...) that an owner can apply in 10 minutes." },
    { name: "Commission Math", tag: "#CommissionMath", freq: "2x/month, Wednesdays", desc: "Blunt breakdown of the 15-25% OTA commission bleed vs direct AI SEO investment." },
    { name: "The Keyword Graveyard", tag: "#KeywordGraveyard", freq: "2x/month, Wednesdays", desc: "Tombstone graphics roasting dead keywords that no longer convert in the AI era." },
    { name: "Report Day", tag: "#ReportDay", freq: "Monthly, Thursdays", desc: "The actual one-page client report on camera — showing both wins AND losses." },
    { name: "Roast My Rankings", tag: "#RoastMyRankings", freq: "2x/month, Thursdays", desc: "Kind-but-blunt live teardowns of real volunteer websites and search footprints." },
    { name: "Diaspora Bridge", tag: "#DiasporaBridge", freq: "2x/month, Mondays", desc: "Showing why family businesses back home are invisible when searched from London, Dubai, or NYC." },
    { name: "60-Second GEO", tag: "#60SecondGEO", freq: "Weekly, Tuesdays", desc: "One Generative Engine Optimization concept explained in plain English without jargon." },
    { name: "WOULD AI RECOMMEND YOU?", tag: "#WouldAIRecommendYou", freq: "Weekly, Fridays", desc: "Audit an African business live on camera, then query multiple AI engines to see if it gets cited." },
    { name: "AI VS GOOGLE", tag: "#AIvsGoogle", freq: "2x/month, Fridays", desc: "Head-to-head comparison: 10 blue links on Google vs synthesized AI shortlist." },
    { name: "Ask Elodie", tag: "#AskElodie", freq: "2x/month, Sundays", desc: "Real questions received by the website's AI assistant, answered on camera as a demo." },
    { name: "We Were Wrong", tag: "#WeWereWrong", freq: "Monthly, Saturdays", desc: "Public corrections of failed hypotheses or algorithm changes that reinforce brand honesty." }
  ],
  creatorSwipeFile: [
    { name: "David Blake (@davidblake3472)", platform: "TikTok (50.9K)", mechanism: "Number + constraint + named viewer hook; build-in-public public revenue goal.", transform: "AfriShield's 12-in-12 public goal ('12 businesses in 12 months') and 'Page 4 to Page 1 in 11 weeks' receipts." },
    { name: "Saratta Murphy (@sarattaspeaks)", platform: "TikTok (104.5K)", mechanism: "Direct-to-camera mentor energy, opening with a sharp pain question naming the exact viewer.", transform: "Opening lines targeting safari owners with exact numbers: 'I asked ChatGPT to plan a $4,000 safari. Your lodge does not exist.'" },
    { name: "Danielle Ryan (@itsdanielleryan)", platform: "TikTok (68.7K)", mechanism: "Anti-guru positioning ('NOT a coach'), credibility stack with verifiable spreadsheets and receipts.", transform: "'We've audited hundreds of African tourism websites (NOT an agency selling buzzwords) — here's the one-page report.'" },
    { name: "Sarah (@creativevaconnection)", platform: "TikTok (103.7K)", mechanism: "One concrete feature/fix, screen-demoed, payoff in seconds. Low production, monthly calendar rhythm.", transform: "Get Found Africa episodes: one screen-recorded fix per video (e.g. GBP services tab, robots.txt check, schema FAQ block)." },
    { name: "Rashida Mourae (@rashidamourae)", platform: "TikTok (63.6K)", mechanism: "Comment-keyword CTA device ('Comment AUDIT and I'll send you the checklist').", transform: "Our primary lead capture: Comment 'VISIBLE', 'GEO', 'AI', or 'AUDIT' to receive instant checklist DMs." },
    { name: "Adriaan Dekker", platform: "LinkedIn (179K+)", mechanism: "Live, DIY-replicable experiments tracking whether AI tools mention a brand. Blunt one-line hook, arrow bullets.", transform: "The AI Concierge Test and LinkedIn experiment drops tracking AI citations for Nairobi accountants and Arusha lodges." },
    { name: "Ryan Law", platform: "LinkedIn (31K+)", mechanism: "Data-backed, research-first original studies on AI Overviews and citation mechanics.", transform: "Monthly 'Does AI recommend African businesses yet?' benchmark studies (50 prompts × 3 engines × 5 cities)." }
  ],
  humorRules: [
    { rule: "1. Be yourself", detail: "Deliver to camera like you are texting a friend who owns a lodge, not narrating a corporate ad." },
    { rule: "2. Keep it light-hearted", detail: "The joke is always on the industry, on dead algorithms, or on us — never on the viewer or a competitor by name." },
    { rule: "3. Universal references first", detail: "Shared African business realities (the WhatsApp Business page nobody checks, the OTA payout email) over short-shelf-life memes." },
    { rule: "4. PG-13 audience-matched", detail: "Full warm personality for Invisible Hustler content; wry and dignified for Trust Sellers and corporate buyers." },
    { rule: "5. Sprinkle, don't slather", detail: "One punchline per video. Let the screen recording or stat be the payoff — humor is the hook that earns the watch-through." }
  ]
};

const fullOutput = {
  generatedAt: new Date().toISOString(),
  totalDays: allDays.length,
  monthThemes: monthThemes,
  days: allDays,
  instagramMemes: instagramMemes,
  strategy: strategyMetadata
};

// Write to JSON
fs.writeFileSync(outputJsonPath, JSON.stringify(fullOutput, null, 2), 'utf8');

// Write to standalone JS file for browser usage without fetch/CORS restrictions
const jsContent = `// AfriShield Content Calendar & Strategy Data Engine
// Generated automatically from 180-day strategy files
window.AFRISHIELD_DATA = ${JSON.stringify(fullOutput, null, 2)};
`;
fs.writeFileSync(outputJsPath, jsContent, 'utf8');

console.log(`Successfully compiled ${allDays.length} days across 6 months into:`);
console.log(`- ${outputJsonPath}`);
console.log(`- ${outputJsPath}`);
console.log(`- ${instagramMemes.length} curated Instagram Memes included.`);
