import { pdf, Document, Page, Text, View, Image, Link, Svg, Line, Ellipse, Circle } from '@react-pdf/renderer'
import {
  getCxQuestions, scoreCx, buildCxFindings, recommendCxNextStep, cxPositioningRead,
  sections, scoreBarStyle, roles, STAGE_LADDER, TOTAL_STAGES,
} from '../data/cxAssessment.js'
import {
  cxRadiantRead, CX_LEADER_CONTENT, cxSuggestedNextSteps, cxTiltSentence, CX_PATH_BODY,
  cxConclusionClosing, cxInOneLine, CX_DIMENSION_DEFINITIONS,
} from '../data/cxReportEditorial.js'
import { scoreSpreadSummary, balancedHeadline, topVsLowRead, conclusionComparison } from '../data/reportEditorial.js'
import {
  C, SP, clean, titleCase, lc, pickIcon, st, T, Icon, Section, Kicker, NumberedTitle, TitleBlock,
  P, SubHead, Callout, NumberCard, TableBlock, Chrome,
} from './aiReportPdf.jsx'
import { RADIANT_LOGO_DARK } from './radiantLogo.js'

/* ─────────────────────────────────────────────────────────────────────────────
   CX Maturity Assessment — Executive Briefing, rendered with @react-pdf/renderer.
   Same layout system as the AI Executive Edition (aiReportPdf.jsx); section
   structure follows radiant-cx-assessment-executive-briefing-sample.pdf.
   ──────────────────────────────────────────────────────────────────────────── */

const DIM_ICON = { Strategy: 'scale', Insight: 'magnifying_glass', Design: 'cycle_arrows', Culture: 'person_heart' }
const roleLabel = (key) => roles.find(r => r.key === key)?.name || 'Executive'
const NWORD = { 1: 'One', 2: 'Two', 3: 'Three', 4: 'Four' }

/* ── charts ───────────────────────────────────────────────────────────────── */
function Ladder({ stageIndex }) {
  const heights = [0.40, 0.55, 0.70, 0.85, 1.0]
  const maxH = 132
  return (
    <View style={{ marginBottom: SP.lg }}>
      <View style={st.ladderRow}>
        {STAGE_LADDER.map((r, i) => {
          const here = r.index === stageIndex
          return (
            <View key={r.index} style={st.rung}>
              {here && <View style={{ position: 'absolute', top: -18, width: 120, alignItems: 'center' }}><Text style={st.hereTag}>YOU ARE HERE</Text><Text style={{ color: C.teal, fontSize: 10 }}>v</Text></View>}
              <View style={[st.rungBox, {
                height: heights[i] * maxH,
                backgroundColor: here ? C.green : C.white,
                borderWidth: here ? 0 : 1.2, borderColor: C.hair,
              }]}>
                <Text style={[st.rungNum, { color: here ? '#22350f' : C.navy }]}>{r.index}</Text>
                <Text style={[st.rungName, { color: here ? '#22350f' : C.navy }]}>{r.name}</Text>
              </View>
            </View>
          )
        })}
      </View>
      <View style={[st.ladderRow, { height: 'auto', alignItems: 'flex-start', marginTop: 6 }]}>
        {STAGE_LADDER.map(r => <View key={r.index} style={st.rung}><Text style={st.rungSub}>{r.tagline}</Text></View>)}
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
        <Line x1={1} y1={0} x2={1} y2={H} stroke={C.hair} strokeWidth={1.2} />
        <Line x1={1} y1={H - 1} x2={W} y2={H - 1} stroke={C.hair} strokeWidth={1.2} />
        <Line x1={0} y1={H} x2={W} y2={0} stroke="#c9d3df" strokeWidth={1} strokeDasharray="3 3" />
        <Ellipse cx={0.22 * W} cy={0.80 * H} rx={0.18 * W} ry={0.11 * H} fill="#e9ecf1" />
        <Ellipse cx={0.56 * W} cy={0.46 * H} rx={0.15 * W} ry={0.10 * H} fill="#dbeaf0" />
        <Ellipse cx={0.82 * W} cy={0.18 * H} rx={0.14 * W} ry={0.09 * H} fill="#e4f0d6" />
        <Circle cx={dotX} cy={dotY} r={7} fill={C.green} stroke="#5f8a2e" strokeWidth={2.5} />
      </Svg>
      <Text style={{ position: 'absolute', top: 0.80 * H + 8, left: 0.22 * W - 20, fontSize: 9, color: '#3a4658', fontFamily: 'Helvetica-Bold' }}>Early Movers</Text>
      <Text style={{ position: 'absolute', top: 0.46 * H + 8, left: 0.56 * W - 20, fontSize: 9, color: '#3a4658', fontFamily: 'Helvetica-Bold' }}>Progressing</Text>
      <Text style={{ position: 'absolute', top: 0.18 * H + 8, left: 0.82 * W - 18, fontSize: 9, color: '#4a5f2c', fontFamily: 'Helvetica-Bold' }}>CX Leaders</Text>
      <Text style={{ position: 'absolute', top: dotY - 2, left: Math.min(dotX + 12, W - 90), fontSize: 9, color: C.navy, fontFamily: 'Helvetica-Bold' }}>Your organization</Text>
      <Text style={{ textAlign: 'right', fontSize: 8, color: C.muted, marginTop: 2 }}>Execution Readiness (higher)</Text>
    </View>
  )
}

/* ── the document ─────────────────────────────────────────────────────────── */
function ReportDoc({ profile, answers }) {
  const scored = scoreCx(answers, getCxQuestions(profile.role))
  const { stage, sectionAverages = {} } = scored
  const findings = buildCxFindings(sectionAverages)
  const nextStep = recommendCxNextStep(sectionAverages)
  const suggested = cxSuggestedNextSteps({ sectionAverages })
  const pos = cxPositioningRead({ sectionAverages, stageIndex: stage.index })
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
  const finalStage = stage.index >= TOTAL_STAGES
  const nextStageIdx = Math.min(stage.index + 1, TOTAL_STAGES)
  const bandPhrase = pos.group === 'leaders' ? 'in or near the CX Leaders group' : `in the ${pos.groupLabel} group`
  const firstStep = suggested.steps[0]?.title

  const metaBits = [profile.sector, profile.orgSize ? `${profile.orgSize} employees` : null, profile.department,
    profile.role ? `${roleLabel(profile.role)} Track` : null].filter(Boolean).join('  ·  ')
  const preparedFor = [fullName, companyName].filter(Boolean).join('  ·  ')

  const leaders = CX_LEADER_CONTENT[stage.index] || CX_LEADER_CONTENT[TOTAL_STAGES]
  const strengths = findings.strengths || []
  const gaps = findings.gaps || []
  const considerations = gaps.length
    ? gaps.slice(0, 2).map(g => ({ title: `${g.section}: ${g.title}`, body: g.body }))
    : [{ title: 'Insight volume without conversion', body: 'As listening expands, unactioned feedback accumulates its own cost. Customers who report an issue twice and see nothing change disengage faster than customers who were never asked. Collection outpacing response is a liability, not a neutral state.' }]
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
    ['02', 'About This Assessment & Scores by Dimension', 'about'],
    ['03', 'Competitive Positioning', 'positioning'],
    ['04', 'What We See', 'see'],
    ['05', "Your Recommended Next Step & Radiant's Read", 'next'],
    ['06', 'What CX Leaders Do', 'leaders'],
    ['07', 'Your Next Move & Assessment Methodology', 'move'],
    ['08', 'Conclusion', 'conclusion'],
    ['09', 'Get in Touch', 'touch'],
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
          <Kicker>An Executive Briefing on Customer Experience Maturity</Kicker>
          <T style={[st.h1, { marginBottom: 12 }]}>CX Maturity Assessment</T>
          <T style={{ fontSize: 12, color: C.body, lineHeight: 1.5, maxWidth: '80%' }}>A structured diagnostic of your organization's CX maturity, execution readiness, and the fastest path to compounding advantage.</T>
        </View>
        <View style={{ height: 1, backgroundColor: C.hair, marginVertical: 24 }} />
        {preparedFor ? <T style={{ fontFamily: 'Helvetica-Bold', fontSize: 13, color: C.ink, marginBottom: 6 }}>{`Prepared for ${preparedFor}`}</T> : null}
        {metaBits ? <T style={{ fontSize: 9.5, color: C.muted, marginBottom: 3 }}>{metaBits}</T> : null}
        <T style={{ fontSize: 9.5, color: C.muted }}>{dateStr}</T>
        <View style={{ marginTop: 28 }}>
          <Kicker>{`Your stage: ${stage.index} of ${TOTAL_STAGES}, and the profile is ${balanced ? 'balanced' : 'uneven'}`}</Kicker>
        </View>
        <View style={{ marginTop: 24 }}>
          <Ladder stageIndex={stage.index} />
          <Text style={[st.exhibit, { marginBottom: SP.md }]}>EXHIBIT 1, THE FIVE-STAGE CX MATURITY LADDER</Text>
        </View>
        <Callout label="Your Assessment Finding" title={stage.tagline} body={stage.description} />
      </Page>

      {/* ── PAGE 2+ — CONTENTS then sections (flow) ── */}
      <Page size="A4" style={st.page}>
        <Chrome yr={yr} />

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
            body={`${who} scores as Stage ${stage.index}, ${stage.name}, ${bandPhrase} (Execution Readiness ${pos.execPct}/100, Strategic Maturity ${pos.stratPct}/100). ${cxTiltSentence(pos)} The single highest-leverage next step is to ${lc(firstStep || 'run a focused readiness review')}, because ${lowDim.label} is the dimension most likely to gate progress${finalStage ? ' from here' : ` toward Stage ${nextStageIdx}`}.`} />
          <SubHead>Key takeaways</SubHead>
          <NumberCard n={1} title={balanced ? balancedHeadline(minV, maxV) : 'A profile with clear leaders and laggards'}
            body={balanced
              ? scoreSpreadSummary(dims)
              : `${topDim.label} leads at ${maxV.toFixed(1)} while ${lowDim.label} trails at ${minV.toFixed(1)} of 5. The spread is where focused effort pays off fastest.`} />
          <NumberCard n={2} title={`${topDim.label} leads, ${lowDim.label} is the priority`}
            body={topVsLowRead({ topLabel: topDim.label, topScore: maxV, lowLabel: lowDim.label, lowScore: minV })} />
          <NumberCard n={3} title={finalStage ? `Sustaining Stage ${TOTAL_STAGES} runs through ${lowDim.label}` : `Progress to Stage ${nextStageIdx} runs through ${lowDim.label}`}
            body={CX_PATH_BODY[lowDim.key]} />
          <TableBlock title="Recommended sequence"
            cols={[{ header: 'Step', width: 40, color: C.ink }, { header: 'Action', width: 190, color: C.ink }, { header: 'Why now', flex: 1, color: C.ink }]}
            rows={suggested.steps.map((s, i) => [String(i + 1), s.title, s.why])} />
        </Section>

        {/* 02 ABOUT + SCORES */}
        <Section id="about" minRoom={130}>
          <NumberedTitle num="02">About This Assessment</NumberedTitle>
          <P>This executive briefing presents the findings, scores, and recommendation from your CX Maturity Assessment responses, with supporting exhibits matched to the web assessment and a methodology section.</P>
          <View style={st.infoRow}>
            {[
              { k: 'Scope', icon: 'connected_nodes', v: profile.department || 'Customer Experience / CX', d: [profile.sector, profile.orgSize ? `${profile.orgSize} employees` : null].filter(Boolean).join(', ') },
              { k: 'Track', icon: 'upward_chart', v: `${roleLabel(profile.role)} Track`, d: profile.role === 'practitioner' ? 'Practitioner-level readout and roadmap' : 'Leadership-level readout and roadmap' },
              { k: 'Prepared', icon: 'document_check', v: dateStr, d: 'Radiant Digital, CX Maturity Assessment' },
            ].map((c, i) => (
              <View key={i} style={st.infoCard}>
                <Icon name={c.icon} style={st.infoIcon} />
                <T style={st.infoK}>{c.k.toUpperCase()}</T>
                <T style={st.infoV}>{c.v}</T>
                {c.d ? <T style={st.infoD}>{c.d}</T> : null}
              </View>
            ))}
          </View>
          <View style={{ marginTop: SP.xl }}>
            <TitleBlock eyebrow="Scores by Dimension">{balanced ? 'A well-rounded profile' : 'A profile with room to balance'}</TitleBlock>
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

        {/* 03 COMPETITIVE POSITIONING */}
        <Section id="positioning" keepTogether>
          <NumberedTitle num="03">Where you sit relative to CX Leaders</NumberedTitle>
          <P style={{ fontSize: 10 }}>{`Reading the shape: Strategic Maturity scores ${pos.stratPct}/100 and Execution Readiness ${pos.execPct}/100. ${topDim.label} leads at ${maxV.toFixed(1)}, while ${lowDim.label} at ${minV.toFixed(1)} is the lever most likely to gate further gains.`}</P>
          <Quadrant execPct={pos.execPct} stratPct={pos.stratPct} />
          <Text style={st.exhibit}>EXHIBIT 3, EXECUTION READINESS VERSUS STRATEGIC MATURITY</Text>
        </Section>

        {/* 04 WHAT WE SEE */}
        <Section id="see" minRoom={130}>
          <View wrap={false}>
          <NumberedTitle num="04">What We See</NumberedTitle>
          <View style={st.statRow}>
            <View style={st.statCard}><View style={st.statTextWrap}><T style={st.statK}>EXECUTION READINESS</T><T style={st.statV}>{`${pos.execPct} / 100`}</T></View><Icon name="gear" style={st.statIcon} /></View>
            <View style={st.statCard}><View style={st.statTextWrap}><T style={st.statK}>STRATEGIC MATURITY</T><T style={st.statV}>{`${pos.stratPct} / 100`}</T></View><Icon name="bar_chart" style={st.statIcon} /></View>
          </View>
          <View style={{ marginTop: SP.md }}>
            <Callout label={`${pos.groupLabel} · ${pos.stageRange}`} body={pos.meansText} />
          </View>
          </View>
          <TitleBlock eyebrow="Findings" mb={SP.md}>{leadingHeading}</TitleBlock>
          {strengths.length
            ? strengths.map((f, i) => (<View key={i}><SubHead first={i === 0}>{`${f.section}: ${f.title}`}</SubHead><P>{f.body}</P></View>))
            : (<View><SubHead first>{`${topDim.label}: your leading dimension`}</SubHead><P>{`At ${maxV.toFixed(1)} out of 5, ${topDim.label} is your highest-scoring dimension and provides the strongest current base for the roadmap.`}</P></View>)}
          <View style={st.sectionRule} />
          <SubHead first>Considerations to watch</SubHead>
          <P>{consIntro}</P>
          {considerations.map((c, i) => <NumberCard key={i} icon={pickIcon(c.title)} title={c.title} body={c.body} />)}
        </Section>

        {/* 05 NEXT STEP + RADIANT'S READ */}
        <Section id="next" minRoom={120}>
          <View wrap={false}>
            <NumberedTitle num="05">Your Recommended Next Step</NumberedTitle>
            <Callout label={`Priority: ${nextStep.section}`} accent={C.coral} tint="#fbefeb" labelColor={C.coral} body={nextStep.text} />
          </View>
          <TableBlock title={`Illustrative 60-day breakdown: the ${suggested.sprint.name}`}
            cols={[{ header: 'Phase', width: 90 }, { header: 'Weeks', width: 70 }, { header: 'Focus', flex: 1 }]}
            rows={suggested.sprint.rows} />
          <View style={{ marginTop: SP.xl }}>
            <TitleBlock eyebrow="Radiant's Read">{`Our perspective on Stage ${stage.index} organizations`}</TitleBlock>
            <P>{cxRadiantRead[stage.index] || cxRadiantRead[TOTAL_STAGES]}</P>
          </View>
        </Section>

        {/* 06 WHAT CX LEADERS DO */}
        <Section id="leaders" minRoom={140}>
          <View wrap={false}>
            <NumberedTitle num="06">What CX Leaders Do</NumberedTitle>
            <T style={[st.h3, { marginBottom: SP.sm }]}>{leaders.heading}</T>
            <P>{leaders.context}</P>
          </View>
          {leaders.benchmark ? <Callout label={leaders.benchmark.label} body={leaders.benchmark.body} /> : null}
          {leaders.actions.map((a, i) => <NumberCard key={i} icon={pickIcon(a.title)} title={a.title} body={a.body} />)}
        </Section>

        {/* 07 NEXT MOVE + METHODOLOGY */}
        <Section id="move" minRoom={150}>
          <View wrap={false}>
          <NumberedTitle num="07">Your Next Move</NumberedTitle>
          <View style={st.cta}>
            <T style={st.ctaBig}>{finalStage ? 'Sustaining an embedded CX operating model?' : `Ready to move to Stage ${nextStageIdx}?`}</T>
            <T style={[st.ctaUrl, { lineHeight: 1.5, marginTop: 4 }]}>Radiant Digital has helped organizations across the public and private sectors mature how they understand and serve their customers. A 30-minute conversation is enough to map exactly where to start.</T>
            <T style={[st.ctaK, { marginTop: 14, marginBottom: 4 }]}>SCHEDULE 30 MINUTES WITH RADIANT DIGITAL</T>
            <T style={st.ctaUrl}>hello@radiant.digital  ·  radiant.digital</T>
          </View>
          </View>
          <View style={{ marginTop: SP.xl }}>
            <TitleBlock eyebrow="Methodology">Assessment Methodology</TitleBlock>
            <P>The assessment scores four dimensions on a 5-point scale, then rolls them into two composite indices, Execution Readiness and Strategic Maturity, which place the organization on the five-stage maturity ladder shown on the cover. Strategic Maturity averages Strategy & Leadership and Insight & Understanding; Execution Readiness averages Design & Delivery and Culture & Accountability, each expressed out of 100.</P>
            <P>Results are directional. They reflect what your responses report, and they are not an audit, an external benchmark, or a comparison against verified data from other organizations. Because each role track answers a different question set, scores are best compared within the same track over time.</P>
            <TableBlock title="Scoring dimensions"
              cols={[{ header: 'Dimension', width: 170 }, { header: 'What it measures', flex: 1 }]}
              rows={CX_DIMENSION_DEFINITIONS} />
            <TableBlock title="1 to 5 scale"
              cols={[{ header: 'Score', width: 90 }, { header: 'Interpretation', flex: 1 }]}
              rows={[
                ['1 to 2', 'Nascent, informal or absent'],
                ['3', 'Developing, present but inconsistent'],
                ['4', 'Strong, consistent and reasonably mature'],
                ['5', 'Leading, best practice, enterprise-wide'],
              ]} />
          </View>
        </Section>

        {/* 08 CONCLUSION */}
        <Section id="conclusion" minRoom={140}>
          <NumberedTitle num="08">Conclusion</NumberedTitle>
          <Callout label="In One Line" body={cxInOneLine({ stageIndex: stage.index, groupLabel: pos.groupLabel, lowKey: lowDim.key, firstStep })} />
          <P>{`${who} sits at Stage ${stage.index} of ${TOTAL_STAGES}, ${stage.name}, ${bandPhrase}. Execution Readiness scores ${pos.execPct} of 100 and Strategic Maturity ${pos.stratPct} of 100, and the dimension scores range from ${minV.toFixed(1)} to ${maxV.toFixed(1)} of 5.`}</P>
          <P>{conclusionComparison({ topLabel: topDim.label, topScore: maxV, lowLabel: lowDim.label, lowScore: minV })}</P>
          <P>{`The recommended sequence follows directly: ${stepList}. Executed in order along Radiant Digital's Assess, Train, Adopt, Scale, and Sustain model, these moves convert today's position into durable, compounding advantage.`}</P>
          <P>{cxConclusionClosing({ stageIndex: stage.index, lowKey: lowDim.key, lowScore: minV })}</P>
        </Section>

        {/* 09 GET IN TOUCH */}
        {/* Production note (spec §8): replace this card with the named CX assessment
            owner(s), photo, title, and direct email before launch. */}
        <Section id="touch" keepTogether>
          <NumberedTitle num="09">Get in Touch</NumberedTitle>
          <P>Speak directly with the Radiant Digital team behind this assessment. They can map exactly where to start and what the next stage looks like for your organization.</P>
          <View wrap={false} style={{ alignSelf: 'center', width: 280, borderWidth: 1, borderColor: C.hair, borderRadius: 10, paddingVertical: 20, paddingHorizontal: 22, alignItems: 'center' }}>
            <T style={st.personName}>Radiant Digital CX Practice</T>
            <T style={st.personTitle}>Customer Experience Research & Strategy</T>
            <Link src="mailto:hello@radiant.digital" style={st.personEmail}>hello@radiant.digital</Link>
          </View>
          <T style={{ fontSize: 8.5, color: C.muted, marginTop: SP.md, textAlign: 'center' }}>Reach out directly, or email hello@radiant.digital to schedule a 30-minute conversation.</T>
        </Section>
      </Page>
    </Document>
  )
}

export async function getCxReportPdfBase64({ profile = {}, answers = {} }) {
  const blob = await pdf(<ReportDoc profile={profile} answers={answers} />).toBlob()
  const buf = await blob.arrayBuffer()
  const bytes = new Uint8Array(buf)
  let bin = ''
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i])
  const safe = (profile.companyName || profile.fullName || 'Radiant').replace(/[^a-z0-9]+/gi, '-')
  return { base64: btoa(bin), filename: `CX-Maturity-Assessment-Executive-${safe}.pdf` }
}
