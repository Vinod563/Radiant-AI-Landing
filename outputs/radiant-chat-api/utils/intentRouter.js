/**
 * intentRouter.js
 * Fast regex-based intent classifier — runs on every request with zero latency.
 * No extra API call needed: this shapes the system prompt Gemma 4 receives,
 * guiding it to pick the right UI card type for the query.
 *
 * Intent → Card Type Mapping:
 *   case_studies  → case-study-grid
 *   solutions     → service-grid
 *   industries    → industries (static) or list
 *   platforms     → list (platform features)
 *   contact       → contact-details
 *   metrics       → metrics
 *   comparison    → comparison-table
 *   general       → hero + text/list
 */

export const INTENTS = {
  CASE_STUDIES: 'case_studies',
  SOLUTIONS:    'solutions',
  INDUSTRIES:   'industries',
  PLATFORMS:    'platforms',
  CONTACT:      'contact',
  METRICS:      'metrics',
  COMPARISON:   'comparison',
  GENERAL:      'general',
}

/**
 * Classify a user query into one of the predefined intents.
 * Patterns are ordered from most specific to most general.
 *
 * @param {string} query - Raw user message (already trimmed, max 500 chars)
 * @returns {string} One of the INTENTS values
 */
export function classifyIntent(query) {
  const q = query.toLowerCase()

  // ── Contact / Demo / Get Started (check early — high intent) ────────────────
  if (/contact|demo|get started|talk to|schedule|book a meeting|pricing|cost|how much|reach out|email|phone|office|location|address|speak to|connect with|real person/.test(q)) {
    return INTENTS.CONTACT
  }

  // ── Comparison ───────────────────────────────────────────────────────────────
  if (/compar|vs\b|versus|difference between|which is better|better than|how does .* differ|traditional vs|old way|new way/.test(q)) {
    return INTENTS.COMPARISON
  }

  // ── Specific case study queries (also catches industry-specific case studies) ─
  if (/case stud|proof|show me proof|real result|roi\b|success stor|evidence|track record|portfolio|show me work|what did you achiev|who have you worked|more proof|show me more|references|halliburton|navy federal|uscis|florida dcf|florida deo|florida dot|flhsmv|quit4health|brighter bites|quitbuddy|mysmartskin|outage response|network intelligence|telecom capacit|scaling telecom|hospitality|theme park|web service|industrial iot|tracklynk|touchless operation|what have you done for/.test(q)) {
    return INTENTS.CASE_STUDIES
  }

  // ── Solutions / Products / Offerings ────────────────────────────────────────
  if (/solution|offering|what do you offer|what can you do|your product|show me solution|list of solution|all solution|capabilities|features|tools|icx ai|automarc|anomaly detection|touchless it|design.to.code|legacy modern|product launch risk|customer journey intelligen/.test(q)) {
    return INTENTS.SOLUTIONS
  }

  // ── Industries / Markets / Sectors ──────────────────────────────────────────
  if (/industr|market|sector|telecom|healthcare|federal|government|hospitalit|financial serv|defense|education|oil|gas|energy|who do you serve|which sector|what vertical|my industry|work in my|your clients|life sciences/.test(q)) {
    return INTENTS.INDUSTRIES
  }

  // ── Platform / Technology / Architecture ────────────────────────────────────
  if (/platform|technology|architect|how does it work|pce\b|precision context|under the hood|tech stack|framework|agentic|micro.?agent|ai fabric|data fabric|how is it built|technical|foundational|what powers|radiant knowledge hub|semantic data graph|ai.rad|autonomous stack|ai finops/.test(q)) {
    return INTENTS.PLATFORMS
  }

  // ── Numbers / Metrics / Stats ────────────────────────────────────────────────
  if (/\d+%|metric|number|stat\b|by the number|how many|how much|percent|saving|reduction|faster|improvement|growth|benchmark|result/.test(q)) {
    return INTENTS.METRICS
  }

  // ── General ──────────────────────────────────────────────────────────────────
  return INTENTS.GENERAL
}
