import {
  pdf, Font, Document, Page, Text, View, Image, Link, StyleSheet,
  Svg, Rect, Line, Ellipse, Circle,
} from '@react-pdf/renderer'
import {
  getAQ, scoreAssessment, buildFindings, sections, scoreBarStyle,
} from '../data/aiAssessment.js'
import {
  aiRadiantRead, suggestedNextSteps, positioningRead, sectorCopy,
  SIXTY_DAY_PLAN, scoreSpreadSummary, balancedHeadline, topVsLowRead,
  conclusionComparison, conclusionClosing,
} from '../data/reportEditorial.js'
import { LEADER_CONTENT } from '../components/assessment/WhatAILeadersDo.jsx'
import { PRAFULL_PHOTO, SRINIVAS_PHOTO } from './leaderPhotos.js'
import { RADIANT_LOGO_DARK } from './radiantLogo.js'
import { ICONS } from './reportIcons.js'

/* ─────────────────────────────────────────────────────────────────────────────
   AI Adoption Assessment — Executive Edition, rendered with @react-pdf/renderer.
   Real flexbox layout engine: spacing is margins/gap, not hand-computed y offsets.
   Runs client-side, so it drops into the existing emailed-PDF flow.
   ──────────────────────────────────────────────────────────────────────────── */

// Brand palette (radiant-onepager system)
const C = {
  navy: '#074661', teal: '#0596ae', green: '#91C36C', cream: '#E6E1CC',
  coral: '#e46240', ink: '#231f20', body: '#4a5568', muted: '#838ea0',
  hair: '#e4e8ee', tintB: '#edf5f7', tintG: '#f2f7ec', white: '#ffffff',
  linkedin: '#0a66c2',
}

// One spacing scale, applied as real margins (engine handles the rest).
const SP = { xs: 4, sm: 8, md: 12, lg: 16, xl: 22, section: 26 }

const clean = (s = '') => String(s)
  .replace(/→/g, '->').replace(/←/g, '<-')
  .replace(/[‘’‛]/g, "'").replace(/[“”]/g, '"')
  .replace(/[–—]/g, '-').replace(/…/g, '...').replace(/ /g, ' ')

// Helvetica has no hyphenation dictionary here, so the default callback split
// words at arbitrary points ("En-ablement") and those breaks read as spelling
// errors. Words now wrap whole instead of breaking mid-word.
Font.registerHyphenationCallback(word => [word])

const ROLE_LABEL = { exec: 'Executive', tech: 'Technology Leader', biz: 'Business Leader', consultant: 'AI Practitioner' }
// Title-case user-entered names/company: uppercase the first letter of each word,
// leave the rest as typed (so "vinod"->"Vinod", "rj"->"Rj", "IBM" stays "IBM").
const titleCase = (s = '') => String(s).trim().replace(/\b\w/g, c => c.toUpperCase())
const firstSentence = (s = '') => { const m = String(s).match(/^.*?[.!?](\s|$)/); return (m ? m[0] : String(s)).trim() }
const lc = (s = '') => s.charAt(0).toLowerCase() + s.slice(1)

const LADDER = [
  { n: 1, name: 'Zero', sub: 'AI assists, humans act' },
  { n: 2, name: 'Guided', sub: 'AI recommends, humans approve' },
  { n: 3, name: 'Insight', sub: 'AI infers unprompted' },
  { n: 4, name: 'Operational', sub: 'AI acts, humans supervise' },
  { n: 5, name: 'Proactive', sub: 'AI predicts, humans steer' },
  { n: 6, name: 'Full', sub: 'AI self-governs, humans guide' },
]
const DIM_ICON = { Strategy: 'scale', Data: 'data_integration', People: 'shield', Adoption: 'upward_chart' }
const ICON_MAP = [
  [/data|integration|semantic|pipeline|inventory/i, 'data_integration'],
  [/governance|guardrail|complian|security|trust|oversight|approval|checkpoint/i, 'shield'],
  [/analytic|insight|report|dashboard|\bkpi\b|metric|scorecard/i, 'bar_chart'],
  [/automat|workflow|orchestrat|operational|\bops\b|routine/i, 'gear'],
  [/agent|\bbot\b/i, 'robot'],
  [/search|discover|audit|readiness/i, 'magnifying_glass'],
  [/cost|token|budget|\bvalue\b|\broi\b/i, 'dollar'],
  [/alert|monitor|observab|drift|anomaly|flag/i, 'bell'],
  [/resilien|recovery|\bhealth/i, 'heartbeat'],
  [/code|legacy|develop|engineer/i, 'code_brackets'],
  [/regulat|policy|explainab|document/i, 'document_check'],
  [/\brisk\b|warning/i, 'warning_triangle'],
  [/reconcil|\bsync\b|loop|continuous|feedback/i, 'cycle_arrows'],
  [/conversation|\bchat\b|\bnlp\b/i, 'speech_bubbles'],
  [/knowledge|literacy|training|\blearn|hub|wiki/i, 'book'],
  [/customer|\bcx\b|experience|people|\bteam|stakeholder/i, 'person_heart'],
  [/network|graph|connect|cross-functional|enterprise/i, 'connected_nodes'],
  [/speed|performance|fast|acceler|rapid/i, 'lightning'],
  [/partner|collaborat|align|leadership/i, 'handshake'],
  [/ethic|balance|fair|strateg/i, 'scale'],
  [/growth|scale|prescri|prioriti|adopt|productio/i, 'upward_chart'],
  [/predict|intelligen|machine learning|\bai\b|model|smart/i, 'ai_brain'],
  [/cloud|migrat|infrastructure/i, 'cloud'],
  [/build|tooling|deploy/i, 'wrench_gear'],
]
const pickIcon = (t = '') => { for (const [re, n] of ICON_MAP) if (re.test(t)) return n; return 'gear' }

const st = StyleSheet.create({
  // page
  cover: { fontFamily: 'Helvetica', fontSize: 10.5, color: C.body, paddingTop: 44, paddingBottom: 40, paddingHorizontal: 54 },
  page: { fontFamily: 'Helvetica', fontSize: 10.5, color: C.body, paddingTop: 92, paddingBottom: 52, paddingHorizontal: 54 },
  topbar: { position: 'absolute', top: 0, left: 0, right: 0, height: 4, backgroundColor: C.green },
  // running header (content pages)
  runHead: { position: 'absolute', top: 40, left: 54, right: 54 },
  runHeadRule: { height: 1, backgroundColor: C.hair, marginTop: 8 },
  logo: { height: 15, width: 120 },
  logoCover: { height: 19, width: 152 },
  // footer
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 26, backgroundColor: C.navy,
            flexDirection: 'row', alignItems: 'center', paddingHorizontal: 54 },
  footL: { color: '#cedde6', fontSize: 7, flex: 1 },
  footC: { color: '#96b0be', fontSize: 7, flex: 1, textAlign: 'center' },
  footR: { color: C.white, fontSize: 8, fontFamily: 'Helvetica-Bold', flex: 1, textAlign: 'right' },
  // type
  kicker: { fontFamily: 'Helvetica-Bold', fontSize: 8.5, color: C.teal, letterSpacing: 1.4, marginBottom: 4 },
  h1: { fontFamily: 'Helvetica-Bold', fontSize: 30, color: C.navy, lineHeight: 1.1 },
  h2: { fontFamily: 'Helvetica-Bold', fontSize: 20, color: C.navy },
  numRow: { flexDirection: 'row', alignItems: 'baseline' },
  numPrefix: { fontFamily: 'Helvetica-Bold', fontSize: 20, color: C.teal, marginRight: 12 },
  h3: { fontFamily: 'Helvetica-Bold', fontSize: 12, color: C.navy },
  p: { fontSize: 10.5, color: C.body, lineHeight: 1.5 },
  // section wrapper
  sectionRule: { height: 1, backgroundColor: C.hair, marginBottom: SP.section },
  // callout
  callout: { flexDirection: 'row', borderRadius: 6, overflow: 'hidden' },
  calloutAccent: { width: 4 },
  calloutBody: { flex: 1, padding: 14 },
  calloutLabel: { fontFamily: 'Helvetica-Bold', fontSize: 8, letterSpacing: 1.2, marginBottom: 6 },
  // number/icon card
  card: { flexDirection: 'row', backgroundColor: C.tintB, borderRadius: 8, padding: 14 },
  cardBadge: { width: 24, height: 24, borderRadius: 12, backgroundColor: C.teal, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  cardBadgeTxt: { color: C.white, fontFamily: 'Helvetica-Bold', fontSize: 11 },
  cardIconTile: { width: 30, height: 30, borderRadius: 7, backgroundColor: C.white, borderWidth: 0.75, borderColor: C.hair, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  cardIcon: { width: 20, height: 20 },
  cardTitle: { fontFamily: 'Helvetica-Bold', fontSize: 11.5, color: C.navy, marginBottom: 4 },
  cardBody: { fontSize: 10.5, color: C.body, lineHeight: 1.45 },
  // info cards row
  infoRow: { flexDirection: 'row', gap: 14 },
  infoCard: { flex: 1, backgroundColor: '#f7f9fc', borderRadius: 8, padding: 16 },
  infoIcon: { width: 26, height: 26, marginBottom: 10 },
  infoK: { fontFamily: 'Helvetica-Bold', fontSize: 8, letterSpacing: 1, color: C.teal, marginBottom: 6 },
  infoV: { fontFamily: 'Helvetica-Bold', fontSize: 13, color: C.navy, lineHeight: 1.2 },
  infoD: { fontSize: 8.5, color: C.muted, marginTop: 6, lineHeight: 1.35 },
  // stat cards
  statRow: { flexDirection: 'row', gap: 14 },
  statCard: { flex: 1, borderWidth: 1, borderColor: C.hair, borderRadius: 8, padding: 16, flexDirection: 'row', alignItems: 'center' },
  statTextWrap: { flex: 1 },
  statK: { fontFamily: 'Helvetica-Bold', fontSize: 8, letterSpacing: 1, color: C.teal, marginBottom: 6 },
  statV: { fontFamily: 'Helvetica-Bold', fontSize: 19, color: C.navy },
  statIcon: { width: 26, height: 26 },
  // score bar
  barRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 3 },
  barIcon: { width: 15, height: 15, marginRight: 6 },
  barLabel: { fontFamily: 'Helvetica-Bold', fontSize: 10.5, color: C.ink, flex: 1 },
  barVal: { fontSize: 9.5, color: C.muted },
  barTrack: { height: 10, backgroundColor: '#eef1f4', borderRadius: 3, overflow: 'hidden' },
  barFill: { height: 10, backgroundColor: C.green, borderRadius: 3 },
  // table
  tRow: { flexDirection: 'row', borderBottomWidth: 0.75, borderBottomColor: C.hair, paddingVertical: 9 },
  tHead: { flexDirection: 'row', borderBottomWidth: 1.5, borderBottomColor: C.teal, paddingBottom: 5 },
  tHeadCell: { fontFamily: 'Helvetica-Bold', fontSize: 8, letterSpacing: 0.5, color: C.teal },
  tCell: { fontSize: 9.5, color: C.body, lineHeight: 1.45, paddingRight: 8 },
  exhibit: { fontFamily: 'Helvetica-Bold', fontSize: 8.5, color: C.teal, letterSpacing: 0.5 },
  // CTA
  cta: { backgroundColor: C.navy, borderRadius: 10, padding: 24 },
  ctaK: { fontFamily: 'Helvetica-Bold', fontSize: 8.5, color: C.green, letterSpacing: 1.2, marginBottom: 10 },
  ctaBig: { fontFamily: 'Helvetica-Bold', fontSize: 17, color: C.white, marginBottom: 4 },
  ctaUrl: { fontSize: 9.5, color: '#9fb2c4' },
  ctaBtn: { alignSelf: 'flex-start', marginTop: 14, backgroundColor: C.green, color: '#22350f', fontFamily: 'Helvetica-Bold', fontSize: 9, letterSpacing: 1, paddingVertical: 7, paddingHorizontal: 16, borderRadius: 4 },
  // toc
  tocRow: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.75, borderBottomColor: C.hair, paddingVertical: 8 },
  tocNum: { fontFamily: 'Helvetica-Bold', fontSize: 10, color: C.teal, width: 34 },
  tocTitle: { fontSize: 11, color: C.teal, flex: 1 },
  // ladder
  ladderRow: { flexDirection: 'row', alignItems: 'flex-end', height: 150, gap: 12 },
  rung: { flex: 1, alignItems: 'center' },
  rungBox: { width: '100%', borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  rungNum: { fontFamily: 'Helvetica-Bold', fontSize: 15 },
  rungName: { fontFamily: 'Helvetica-Bold', fontSize: 8.5, marginTop: 2 },
  rungSub: { fontSize: 6.8, color: C.muted, textAlign: 'center', marginTop: 6, lineHeight: 1.25 },
  hereTag: { fontFamily: 'Helvetica-Bold', fontSize: 7.5, color: C.teal, letterSpacing: 0.8, textAlign: 'center', marginBottom: 3 },
  // person cards
  people: { flexDirection: 'row', gap: 20 },
  person: { flex: 1, borderWidth: 1, borderColor: C.hair, borderRadius: 10, padding: 22, alignItems: 'center' },
  avatar: { width: 64, height: 64, borderRadius: 32, marginBottom: 14 },
  personName: { fontFamily: 'Helvetica-Bold', fontSize: 13, color: C.navy, textAlign: 'center' },
  personTitle: { fontSize: 9, color: C.body, textAlign: 'center', lineHeight: 1.4, marginVertical: 8 },
  personEmail: { fontFamily: 'Helvetica-Bold', fontSize: 9.5, color: C.teal, textAlign: 'center', marginBottom: 8 },
  liBadge: { width: 18, height: 18, borderRadius: 3, backgroundColor: C.linkedin, alignItems: 'center', justifyContent: 'center' },
  liTxt: { color: C.white, fontFamily: 'Helvetica-Bold', fontSize: 10 },
})

/* ── small presentational helpers ─────────────────────────────────────────── */
const T = ({ style, children }) => <Text style={style}>{clean(String(children))}</Text>

const Icon = ({ name, style }) => <Image src={ICONS[name] || ICONS.gear} style={style} />

// Section: a rule + generous top space for every major section except the first.
// keepTogether (for compact sections led by a big indivisible visual, e.g. the
// positioning chart) moves the whole section — rule included — to the next page
// rather than orphaning its title. Tall sections must NOT keepTogether: they wrap.
const Section = ({ id, first, minRoom = 90, keepTogether, children }) => (
  <View id={id} break={first} wrap={!keepTogether} style={{ marginTop: first ? 0 : SP.section }}>
    {!first && <View style={st.sectionRule} />}
    {keepTogether ? children : <View minPresenceAhead={minRoom}>{children}</View>}
  </View>
)

const Kicker = ({ children }) => <T style={st.kicker}>{String(children).toUpperCase()}</T>

const NumberedTitle = ({ num, children }) => (
  <View style={[st.numRow, { marginBottom: SP.lg }]}>
    <Text style={st.numPrefix}>{num}</Text>
    <Text style={st.h2}>{clean(String(children))}</Text>
  </View>
)
// eyebrow + title unit (non-numbered sections)
const TitleBlock = ({ eyebrow, children, mb = SP.lg }) => (
  <View style={{ marginBottom: mb }}>
    <Kicker>{eyebrow}</Kicker>
    <T style={st.h2}>{children}</T>
  </View>
)

const P = ({ children, style }) => <Text style={[st.p, { marginBottom: SP.md }, style]}>{clean(String(children))}</Text>

// Sub-heading: marginTop separates it from the block above; small marginBottom
// couples it to the block below. With a real box model these behave correctly.
const SubHead = ({ children, first }) => (
  <Text style={[st.h3, { marginTop: first ? 0 : SP.xl, marginBottom: SP.sm }]}>{clean(String(children))}</Text>
)

const Callout = ({ label, title, body, accent = C.green, tint = C.tintG, labelColor = C.teal }) => (
  <View wrap={false} style={[st.callout, { backgroundColor: tint, marginBottom: SP.md }]}>
    <View style={[st.calloutAccent, { backgroundColor: accent }]} />
    <View style={st.calloutBody}>
      {label ? <T style={[st.calloutLabel, { color: labelColor }]}>{String(label).toUpperCase()}</T> : null}
      {title ? <T style={{ fontFamily: 'Helvetica-Bold', fontSize: 12, color: C.navy, marginBottom: body ? 6 : 0, lineHeight: 1.3 }}>{title}</T> : null}
      {body ? <T style={{ fontSize: 10.5, color: C.body, lineHeight: 1.5 }}>{body}</T> : null}
    </View>
  </View>
)

const NumberCard = ({ n, icon, title, body }) => (
  <View wrap={false} style={[st.card, { marginBottom: SP.md }]}>
    {icon
      ? <View style={st.cardIconTile}><Icon name={icon} style={st.cardIcon} /></View>
      : <View style={st.cardBadge}><Text style={st.cardBadgeTxt}>{String(n)}</Text></View>}
    <View style={{ flex: 1 }}>
      <T style={st.cardTitle}>{title}</T>
      {body ? <T style={st.cardBody}>{body}</T> : null}
    </View>
  </View>
)

// Tables in this report are short (3-4 rows), so they move to the next page as a
// unit rather than orphaning a row from its title and column headers.
const Tbl = ({ cols, rows, headColor = C.body }) => (
  <View wrap={false} style={{ marginBottom: SP.md }}>
    <View style={st.tHead}>
      {cols.map((c, i) => <Text key={i} style={[st.tHeadCell, { width: c.width, flex: c.flex }]}>{clean(c.header).toUpperCase()}</Text>)}
    </View>
    {rows.map((r, ri) => (
      <View key={ri} wrap={false} style={st.tRow}>
        {r.map((cell, ci) => <Text key={ci} style={[st.tCell, { width: cols[ci].width, flex: cols[ci].flex, color: cols[ci].color || headColor }]}>{clean(String(cell))}</Text>)}
      </View>
    ))}
  </View>
)

// A table travels with its own heading: a heading stranded at the foot of one
// page, with the column labels overleaf, leaves the rows without their context.
const TableBlock = ({ title, cols, rows }) => (
  <View wrap={false}>
    <SubHead>{title}</SubHead>
    <Tbl cols={cols} rows={rows} />
  </View>
)

/* ── charts ───────────────────────────────────────────────────────────────── */
function Ladder({ stageIndex }) {
  const heights = [0.34, 0.48, 0.60, 0.74, 0.88, 1.0]
  const maxH = 132
  return (
    <View style={{ marginBottom: SP.lg }}>
      <View style={st.ladderRow}>
        {LADDER.map((r, i) => {
          const here = r.n === stageIndex
          const bh = heights[i] * maxH
          return (
            <View key={r.n} style={st.rung}>
              {here && <View style={{ position: 'absolute', top: -18, width: 120, alignItems: 'center' }}><Text style={st.hereTag}>YOU ARE HERE</Text><Text style={{ color: C.teal, fontSize: 10 }}>v</Text></View>}
              <View style={[st.rungBox, {
                height: bh,
                backgroundColor: here ? C.green : C.white,
                borderWidth: here ? 0 : 1.2, borderColor: C.hair,
              }]}>
                <Text style={[st.rungNum, { color: here ? '#22350f' : C.navy }]}>{r.n}</Text>
                <Text style={[st.rungName, { color: here ? '#22350f' : C.navy }]}>{r.name}</Text>
              </View>
            </View>
          )
        })}
      </View>
      <View style={[st.ladderRow, { height: 'auto', alignItems: 'flex-start', marginTop: 6 }]}>
        {LADDER.map(r => <View key={r.n} style={st.rung}><Text style={st.rungSub}>{r.sub}</Text></View>)}
      </View>
    </View>
  )
}

function Quadrant({ execPct, stratPct }) {
  const W = 487, H = 300
  const ex = Math.min(0.94, Math.max(0.06, execPct / 100))
  const sy = Math.min(0.94, Math.max(0.06, stratPct / 100))
  const dotX = ex * W, dotY = H - sy * H
  return (
    <View style={{ marginBottom: SP.md }}>
      <Text style={{ fontSize: 8, color: C.muted, marginBottom: 2 }}>Strategic Maturity (higher)</Text>
      <Svg width={W} height={H}>
        {/* axes */}
        <Line x1={1} y1={0} x2={1} y2={H} stroke={C.hair} strokeWidth={1.2} />
        <Line x1={1} y1={H - 1} x2={W} y2={H - 1} stroke={C.hair} strokeWidth={1.2} />
        {/* diagonal */}
        <Line x1={0} y1={H} x2={W} y2={0} stroke="#c9d3df" strokeWidth={1} strokeDasharray="3 3" />
        {/* bands */}
        <Ellipse cx={0.22 * W} cy={0.80 * H} rx={0.18 * W} ry={0.11 * H} fill="#e9ecf1" />
        <Ellipse cx={0.50 * W} cy={0.52 * H} rx={0.17 * W} ry={0.11 * H} fill="#dbeaf0" />
        <Ellipse cx={0.78 * W} cy={0.26 * H} rx={0.16 * W} ry={0.10 * H} fill="#e4f0d6" />
        {/* dot */}
        <Circle cx={dotX} cy={dotY} r={7} fill={C.green} stroke="#5f8a2e" strokeWidth={2.5} />
      </Svg>
      {/* labels overlaid via absolute Views */}
      <Text style={{ position: 'absolute', top: 0.80 * H + 8, left: 0.22 * W - 20, fontSize: 9, color: '#3a4658', fontFamily: 'Helvetica-Bold' }}>Early Movers</Text>
      <Text style={{ position: 'absolute', top: 0.52 * H + 8, left: 0.50 * W - 20, fontSize: 9, color: '#3a4658', fontFamily: 'Helvetica-Bold' }}>Progressing</Text>
      <Text style={{ position: 'absolute', top: 0.26 * H + 8, left: 0.78 * W - 14, fontSize: 9, color: '#4a5f2c', fontFamily: 'Helvetica-Bold' }}>AI Leaders</Text>
      <Text style={{ position: 'absolute', top: dotY - 2, left: dotX + 12, fontSize: 9, color: C.navy, fontFamily: 'Helvetica-Bold' }}>Your organization</Text>
      <Text style={{ textAlign: 'right', fontSize: 8, color: C.muted, marginTop: 2 }}>Execution Readiness (higher)</Text>
    </View>
  )
}

/* ── chrome (runs on every content page) ──────────────────────────────────── */
const Chrome = ({ yr }) => (
  <>
    <View fixed style={st.topbar} />
    <View fixed style={st.runHead}>
      <Image src={RADIANT_LOGO_DARK} style={st.logo} />
      <View style={st.runHeadRule} />
    </View>
    <View fixed style={st.footer}>
      <Text style={st.footL}>{clean(`© ${yr} Radiant Digital  ·  hello@radiant.digital`)}</Text>
      <Text style={st.footC} render={({ pageNumber }) => `Page ${pageNumber}`} />
      <Text style={st.footR}>www.radiant.digital</Text>
    </View>
  </>
)

/* ── the document ─────────────────────────────────────────────────────────── */
function ReportDoc({ profile, answers }) {
  const scored = scoreAssessment(answers, getAQ(profile.role))
  const { stage, sectionAverages = {} } = scored
  const findings = buildFindings(sectionAverages)
  const suggested = suggestedNextSteps({ role: profile.role, stageIndex: stage.index, sectionAverages })
  const pos = positioningRead({ sectionAverages, stageIndex: stage.index })
  const yr = new Date().getFullYear()
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  const fullName = titleCase(profile.fullName || '')
  const companyName = titleCase(profile.companyName || '')
  const who = companyName || (fullName ? `${fullName}'s organization` : 'Your organization')
  const dims = sections.map(s => ({ key: s.key, label: s.label, v: sectionAverages[s.key] || 0 }))
  const ranked = [...dims].sort((a, b) => b.v - a.v)
  const topDim = ranked[0], lowDim = ranked[ranked.length - 1]
  const minV = lowDim.v, maxV = topDim.v
  const balanced = (maxV - minV) <= 0.8
  const sector = sectorCopy(profile.sector || '')
  const adoptionV = sectionAverages.Adoption || 0
  const adoptionLive = adoptionV >= 4 ? 'AI is live, executive backed, and generating tracked value'
    : adoptionV >= 3 ? 'AI is in production in selected areas and is beginning to demonstrate measurable value'
    : 'AI is early, with the first use cases still proving their value'
  const finalStage = stage.index >= 6
  const nextStageIdx = Math.min(stage.index + 1, 6)
  const bandPhrase = pos.groupLabel === 'AI Leaders' ? 'in or near the AI Leaders band' : `in the ${pos.groupLabel} group`

  const metaBits = [profile.sector, profile.orgSize ? `${profile.orgSize} employees` : null, profile.department,
    profile.role ? `${ROLE_LABEL[profile.role] || profile.role} Track` : null].filter(Boolean).join('  ·  ')
  const preparedFor = [fullName, companyName].filter(Boolean).join('  ·  ')

  const leaders = LEADER_CONTENT[stage.index] || LEADER_CONTENT[6]
  const strengths = findings.strengths || []
  const gaps = findings.gaps || []
  const considerations = []
  if (gaps.length) gaps.slice(0, 2).forEach(g => considerations.push({ title: `${g.section}: ${g.title}`, body: g.body }))
  else considerations.push({ title: 'Prediction accuracy without adequate monitoring', body: 'As AI moves from recommending to prescribing, the cost of an unmonitored bad prediction rises. Model drift and edge-case monitoring become governance requirements, not optional data science practices.' })
  if (sector) considerations.push(sector.consideration)
  const NWORD = { 1: 'One', 2: 'Two', 3: 'Three', 4: 'Four' }
  // The intro has to describe what the section actually shows: with no dimension
  // at strength level there is nothing to pair a risk with, so it names the
  // priority areas directly instead.
  const consIntro = strengths.length
    ? `A rigorous diagnostic pairs every strength with a corresponding risk. ${considerations.length === 1
      ? `One consideration is particularly relevant for organizations at Stage ${stage.index} and is worth tracking deliberately:`
      : `${NWORD[considerations.length] || considerations.length} considerations are typical for organizations at Stage ${stage.index} and worth tracking deliberately:`}`
    : (considerations.length === 1
      ? 'One priority area requires focused attention.'
      : `The assessment identifies the following ${(NWORD[considerations.length] || considerations.length).toLowerCase()} priority areas for focused attention:`)
  const leadingHeading = strengths.length > 1 ? 'Strengths' : strengths.length === 1 ? 'Strength' : 'Leading area'
  const stepList = suggested.steps.map((s, i) => `${i + 1}) ${lc(s.title)}`).join(', ')

  const toc = [
    ['01', 'Executive Summary & Recommendations', 'exec'],
    ['02', 'About This Assessment', 'about'],
    ['03', 'Scores by Dimension', 'scores'],
    ['04', 'Maturity Positioning', 'positioning'],
    ['05', 'What We See', 'see'],
    ['06', 'Your Recommended Next Step', 'next'],
    ['07', "Radiant's Read", 'radiant'],
    ['08', 'What AI Leaders Do', 'leaders'],
    ['09', 'Your Next Move', 'move'],
    ['10', 'Assessment Methodology', 'methodology'],
    ['11', 'Conclusion', 'conclusion'],
    ['12', 'Get in Touch', 'touch'],
  ]
  const people = [
    { photo: PRAFULL_PHOTO, name: 'Prafull Khare', title: 'Executive Director | Global Head of AI Strategy, Solution Engineering, & New Technology Enablement  ·  Radiant Digital', email: 'prafull.khare@radiant.digital', linkedin: 'linkedin.com/in/prafull-khare' },
    { photo: SRINIVAS_PHOTO, name: 'Srinivas Chamarthi', title: 'SVP & Business Head  ·  Radiant Digital', email: 'srinivas.chamarthi@radiant.digital', linkedin: 'linkedin.com/in/srinivaschamarthi' },
  ]

  return (
    <Document>
      {/* ── PAGE 1 — COVER ── */}
      <Page size="A4" style={st.cover}>
        <View fixed style={st.topbar} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Image src={RADIANT_LOGO_DARK} style={st.logoCover} />
          <T style={{ fontFamily: 'Helvetica-Bold', fontSize: 8.5, color: C.muted, letterSpacing: 1.6, marginTop: 4 }}>CONFIDENTIAL, EXECUTIVE BRIEFING</T>
        </View>
        <View style={{ marginTop: 60 }}>
          <Kicker>An Executive Briefing on Enterprise AI Maturity</Kicker>
          <T style={[st.h1, { marginBottom: 12 }]}>AI Adoption Assessment Report</T>
          <T style={{ fontSize: 12, color: C.body, lineHeight: 1.5, maxWidth: '80%' }}>A structured assessment of your organization's AI maturity, execution readiness, and priority actions for progressing to the next stage.</T>
        </View>
        <View style={{ height: 1, backgroundColor: C.hair, marginVertical: 24 }} />
        {preparedFor ? <T style={{ fontFamily: 'Helvetica-Bold', fontSize: 13, color: C.ink, marginBottom: 6 }}>{`Prepared for ${preparedFor}`}</T> : null}
        {metaBits ? <T style={{ fontSize: 9.5, color: C.muted, marginBottom: 3 }}>{metaBits}</T> : null}
        <T style={{ fontSize: 9.5, color: C.muted }}>{dateStr}</T>
        <View style={{ marginTop: 28 }}>
          <Kicker>{`Your current stage: ${stage.index} of 6`}</Kicker>
        </View>
        <View style={{ marginTop: 24 }}>
          <Ladder stageIndex={stage.index} />
          <Text style={[st.exhibit, { marginBottom: SP.md }]}>EXHIBIT 1, THE SIX-STAGE AI AUTONOMY LADDER</Text>
        </View>
        <Callout label="Your Assessment Finding" title={stage.tagline} body={stage.description} />
      </Page>

      {/* ── PAGE 2+ — CONTENTS then sections (flow) ── */}
      <Page size="A4" style={st.page}>
        <Chrome yr={yr} />

        {/* TOC */}
        <View id="toc">
          <T style={[st.h2, { fontSize: 22, marginBottom: SP.md }]}>Contents</T>
          {toc.map(([num, title, id]) => (
            <Link key={id} src={`#${id}`} style={st.tocRow}>
              <Text style={st.tocNum}>{num}</Text>
              <Text style={st.tocTitle}>{clean(title)}</Text>
            </Link>
          ))}
        </View>

        {/* 01 EXECUTIVE SUMMARY */}
        <Section id="exec" first minRoom={140}>
          <NumberedTitle num="01">Executive Summary & Recommendations</NumberedTitle>
          <Callout label="Bottom Line"
            body={`Your organization is assessed at Stage ${stage.index}, placing you ${bandPhrase}, with an Execution Readiness score of ${pos.execPct}/100 and a Strategic Maturity score of ${pos.stratPct}/100. ${adoptionLive}. Your most important next step is to ${lc(suggested.steps[0]?.title || 'a focused readiness audit')}, because ${lowDim.label} is the dimension most likely to limit further progress${finalStage ? ' from here' : ` toward Stage ${nextStageIdx}`}.`} />
          <SubHead>Key takeaways</SubHead>
          <NumberCard n={1} title={balanced
            ? balancedHeadline(minV, maxV)
            : (strengths.length ? 'Your results show clear strengths and priority areas' : 'Your results show a clear priority area')}
            body={balanced
              ? scoreSpreadSummary(dims)
              : `${topDim.label} leads at ${maxV.toFixed(1)}, while ${lowDim.label} is at ${minV.toFixed(1)} out of 5. This difference shows where focused effort can deliver the greatest impact.`} />
          <NumberCard n={2} title={`${topDim.label} leads, ${lowDim.label} is the priority`}
            body={topVsLowRead({ topLabel: topDim.label, topScore: maxV, lowLabel: lowDim.label, lowScore: minV })} />
          <NumberCard n={3} title={finalStage ? `Sustaining Stage 6 runs through ${lowDim.label}` : `Progress to Stage ${nextStageIdx} runs through ${lowDim.label}`}
            body={`Your path forward depends on strengthening ${lowDim.label}${sector ? sector.clause : ''} - including governance, guardrails, and readiness - not on deploying more models.`} />
          <TableBlock title="Recommended sequence"
            cols={[{ header: 'Step', width: 40, color: C.ink }, { header: 'Action', width: 190, color: C.ink }, { header: 'Why now', flex: 1, color: C.ink }]}
            rows={suggested.steps.map((s, i) => [String(i + 1), s.title, firstSentence(s.detail)])} />
        </Section>

        {/* 02 ABOUT + 03 SCORES */}
        <Section id="about" minRoom={130}>
          <NumberedTitle num="02">About This Assessment</NumberedTitle>
          <P>This executive briefing presents the findings, scores, and recommendations from your AI Adoption Assessment responses.</P>
          <View style={st.infoRow}>
            {[
              { k: 'Scope', icon: 'connected_nodes', v: profile.department || 'Enterprise / Cross-functional', d: [profile.sector, profile.orgSize ? `${profile.orgSize} employees` : null].filter(Boolean).join(', ') },
              { k: 'Track', icon: 'upward_chart', v: `${ROLE_LABEL[profile.role] || 'Executive'} Track`, d: 'Leadership-level readout and roadmap' },
              { k: 'Prepared', icon: 'document_check', v: dateStr, d: 'Radiant Digital, AI Adoption Assessment' },
            ].map((c, i) => (
              <View key={i} style={st.infoCard}>
                <Icon name={c.icon} style={st.infoIcon} />
                <T style={st.infoK}>{c.k.toUpperCase()}</T>
                <T style={st.infoV}>{c.v}</T>
                {c.d ? <T style={st.infoD}>{c.d}</T> : null}
              </View>
            ))}
          </View>
          <View id="scores" style={{ marginTop: SP.xl }}>
            <TitleBlock eyebrow="Scores by Dimension">{balanced ? 'A well-rounded profile' : 'Your AI maturity profile has room for greater balance'}</TitleBlock>
            {dims.map(d => (
              <View key={d.key} style={{ marginBottom: 10 }}>
                <View style={st.barRow}>
                  <Icon name={DIM_ICON[d.key]} style={st.barIcon} />
                  <Text style={st.barLabel}>{clean(d.label)}</Text>
                  <Text style={st.barVal}>{`${d.v ? d.v.toFixed(1) : '--'} / 5   ·   ${scoreBarStyle(d.v).label}`}</Text>
                </View>
                <View style={st.barTrack}><View style={[st.barFill, { width: `${Math.max(4, (d.v / 5) * 100)}%` }]} /></View>
              </View>
            ))}
            <Text style={[st.exhibit, { marginTop: 4 }]}>EXHIBIT 2, DIMENSION SCORECARD</Text>
          </View>
        </Section>

        {/* 04 COMPETITIVE POSITIONING */}
        <Section id="positioning" keepTogether>
          <TitleBlock eyebrow="Maturity Positioning">Where your assessment scores place you</TitleBlock>
          <P style={{ fontSize: 10 }}>{`Based on your assessment scores, ${topDim.label} leads at ${maxV.toFixed(1)}, while ${lowDim.label} at ${minV.toFixed(1)} is the area most likely to limit further progress. This aligns with the ${lowDim.label} recommendation later in this report.`}</P>
          <Quadrant execPct={pos.execPct} stratPct={pos.stratPct} />
          <Text style={st.exhibit}>EXHIBIT 3, EXECUTION READINESS VERSUS STRATEGIC MATURITY</Text>
        </Section>

        {/* 05 WHAT WE SEE */}
        <Section id="see" minRoom={130}>
          <View style={st.statRow}>
            <View style={st.statCard}><View style={st.statTextWrap}><T style={st.statK}>EXECUTION READINESS</T><T style={st.statV}>{`${pos.execPct} / 100`}</T></View><Icon name="gear" style={st.statIcon} /></View>
            <View style={st.statCard}><View style={st.statTextWrap}><T style={st.statK}>STRATEGIC MATURITY</T><T style={st.statV}>{`${pos.stratPct} / 100`}</T></View><Icon name="bar_chart" style={st.statIcon} /></View>
          </View>
          <View style={{ marginTop: SP.md }}>
            <Callout label={`${pos.groupLabel} · ${pos.stageRange}`} body={pos.meansText} />
          </View>
          <TitleBlock eyebrow="What We See" mb={SP.md}>{leadingHeading}</TitleBlock>
          {strengths.length
            ? strengths.map((f, i) => (<View key={i}><SubHead first={i === 0}>{`${f.section}: ${f.title}`}</SubHead><P>{f.body}</P></View>))
            : (<View><SubHead first>{`${topDim.label}: your leading dimension`}</SubHead><P>{`At ${maxV.toFixed(1)} out of 5, ${topDim.label} is your highest-scoring dimension and provides the strongest current base for the roadmap.`}</P></View>)}
          <View style={st.sectionRule} />
          <SubHead first>Considerations to watch</SubHead>
          <P>{consIntro}</P>
          {considerations.map((c, i) => <NumberCard key={i} icon={pickIcon(c.title)} title={c.title} body={c.body} />)}
        </Section>

        {/* 06 NEXT STEP + 07 RADIANT'S READ */}
        <Section id="next" minRoom={120}>
          <TitleBlock eyebrow="Your Recommended Next Step">{`Priority: ${lowDim.label}`}</TitleBlock>
          <P>{suggested.steps[0]?.detail || `Strengthen ${lowDim.label} before the next major deployment.`}</P>
          <TableBlock title="Illustrative 60-day breakdown"
            cols={[{ header: 'Phase', width: 90 }, { header: 'Weeks', width: 70 }, { header: 'Focus', flex: 1 }]}
            rows={SIXTY_DAY_PLAN[lowDim.key] || SIXTY_DAY_PLAN.Strategy} />
          <View id="radiant" style={{ marginTop: SP.xl }}>
            <TitleBlock eyebrow="Radiant's Read">{`Our perspective on Stage ${stage.index} organizations`}</TitleBlock>
            <P>{aiRadiantRead[stage.index] || aiRadiantRead[6]}</P>
          </View>
        </Section>

        {/* 08 WHAT AI LEADERS DO */}
        <Section id="leaders" minRoom={140}>
          <TitleBlock eyebrow="What AI Leaders Do">{leaders.heading}</TitleBlock>
          <P>{leaders.context}</P>
          {leaders.actions.map((a, i) => <NumberCard key={i} icon={pickIcon(a.title)} title={a.title} body={a.body} />)}
          {sector ? <Callout label={sector.callout.label} body={sector.callout.body} /> : null}
        </Section>

        {/* 09 NEXT MOVE + 10 METHODOLOGY */}
        <Section id="move" minRoom={150}>
          <TitleBlock eyebrow="Your Next Move">{finalStage ? 'Sustaining Full Autonomy' : `Ready to move to Stage ${nextStageIdx}?`}</TitleBlock>
          <P>{finalStage
            ? 'A 30-minute conversation with Radiant Digital can help you identify where to focus next in sustaining your current stage of AI maturity.'
            : 'A 30-minute conversation with Radiant Digital can help you identify the right starting point for your next stage of AI maturity.'}</P>
          <View wrap={false} style={st.cta}>
            <T style={st.ctaK}>SCHEDULE 30 MINUTES WITH RADIANT DIGITAL</T>
            <T style={st.ctaBig}>hello@radiant.digital</T>
            <T style={st.ctaUrl}>radiant.digital</T>
            <Text style={st.ctaBtn}>SCHEDULE A CALL</Text>
          </View>
          <View id="methodology" style={{ marginTop: SP.xl }}>
            <NumberedTitle num="10">Assessment Methodology</NumberedTitle>
            <P>This report is based on a self-assessment. Your responses to the question set for your role are averaged by dimension, and each dimension is scored on a 5-point scale.</P>
            <P>{`Those dimension scores produce the rest of the report. Execution Readiness combines Data & Technology with Adoption & Value. Strategic Maturity combines Strategy & Leadership with People & Governance. Your overall stage on the six-stage maturity ladder is the average of all your responses. Because each role track answers a different question set, scores are best compared within the same track over time rather than across tracks.`}</P>
            <P>Results are directional. They reflect what your responses report, and they are not an audit, an external benchmark, or a comparison against verified data from other organizations.</P>
            <TableBlock title="Scoring dimensions"
              cols={[{ header: 'Dimension', width: 170 }, { header: 'What it measures', flex: 1 }]}
              rows={[
                ['Strategy & Leadership', 'Executive alignment, stated direction, and resourcing behind the AI agenda'],
                ['Data & Technology', 'Data readiness, tooling, and infrastructure available to support deployment'],
                ['People & Governance', 'Skills, change management, and the guardrails that govern AI decisions'],
                ['Adoption & Value', 'Breadth of live deployments and evidence of tracked, measurable impact'],
              ]} />
            <TableBlock title="1 to 5 scale"
              cols={[{ header: 'Score', width: 90 }, { header: 'Interpretation', flex: 1 }]}
              rows={[
                ['1 to 2', 'Nascent, informal, or absent'],
                ['3', 'Developing, present but inconsistent'],
                ['4', 'Strong, consistent, and reasonably mature'],
                ['5', 'Leading, aligned with best practices, and enterprise-wide'],
              ]} />
          </View>
        </Section>

        {/* 11 CONCLUSION */}
        <Section id="conclusion" minRoom={140}>
          <NumberedTitle num="11">Conclusion</NumberedTitle>
          <Callout label="In One Line" body={`You are a Stage ${stage.index} organization ${bandPhrase}. ${finalStage ? 'Sustaining this stage' : 'Reaching the next stage'} depends on strengthening ${lowDim.label}, not simply deploying more models.`} />
          <P>{`Your organization is at Stage ${stage.index} of 6, placing you ${bandPhrase}. Your Execution Readiness score is ${pos.execPct}/100, and your Strategic Maturity score is ${pos.stratPct}/100. Your dimension scores range from ${minV.toFixed(1)} to ${maxV.toFixed(1)} out of 5. ${adoptionLive}.`}</P>
          <P>{conclusionComparison({ topLabel: topDim.label, topScore: maxV, lowLabel: lowDim.label, lowScore: minV })}</P>
          <P>{`The recommended sequence follows directly: ${stepList}. Radiant Digital's Assess, Train, Adopt, Scale, and Sustain model can support sustained progress ${finalStage ? 'at this stage' : 'toward the next stage'}.`}</P>
          <P>{conclusionClosing({ stageIndex: stage.index, lowKey: lowDim.key, lowLabel: lowDim.label, lowScore: minV })}</P>
        </Section>

        {/* 12 GET IN TOUCH */}
        <Section id="touch" keepTogether>
          <NumberedTitle num="12">Get in Touch</NumberedTitle>
          <P>Speak directly with the Radiant Digital experts behind your assessment. They can help you identify where to start and what the next stage could look like for your organization.</P>
          <View wrap={false} style={st.people}>
            {people.map((p, i) => (
              <View key={i} style={st.person}>
                <Image src={p.photo} style={st.avatar} />
                <T style={st.personName}>{p.name}</T>
                <T style={st.personTitle}>{p.title}</T>
                <Link src={`mailto:${p.email}`} style={st.personEmail}>{clean(p.email)}</Link>
                <Link src={`https://www.${p.linkedin}`} style={st.liBadge}><Text style={st.liTxt}>in</Text></Link>
              </View>
            ))}
          </View>
          <T style={{ fontSize: 8.5, color: C.muted, marginTop: SP.md }}>Reach either of us directly, or email hello@radiant.digital to schedule a 30-minute conversation.</T>
        </Section>
      </Page>
    </Document>
  )
}

export async function getAiReportPdfBase64({ profile = {}, answers = {} }) {
  const blob = await pdf(<ReportDoc profile={profile} answers={answers} />).toBlob()
  const buf = await blob.arrayBuffer()
  const bytes = new Uint8Array(buf)
  let bin = ''
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i])
  const safe = (profile.companyName || profile.fullName || 'Radiant').replace(/[^a-z0-9]+/gi, '-')
  return { base64: btoa(bin), filename: `AI-Adoption-Assessment-Executive-${safe}.pdf` }
}
