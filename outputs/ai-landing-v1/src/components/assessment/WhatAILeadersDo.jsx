import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

/**
 * WhatAILeadersDo: stage-specific guidance showing what organizations
 * at the next autonomy stage do differently.
 *
 * Props:
 *   currentIndex  number 1..6
 *   accent        string hex
 *   chatQuery     string: pre-filled chat query for the CTA
 */

const LEADER_CONTENT = {
  1: {
    heading: 'What Guided Autonomy organizations did to move forward',
    context: 'Organizations that climbed out of Zero Autonomy did one thing consistently: once their data and processes were clean, they let AI start recommending in real time, with a human approving every action, instead of leaving it stuck at data capture.',
    actions: [
      {
        title: 'Deployed real-time assist where decisions actually happen',
        body: 'Live agent-assist, next-best-action prompts, and in-the-moment alerts that suggest the move while there\'s still time to make it. AI advises; the human still approves. Faster, better-informed decisions without surrendering control.',
      },
      {
        title: 'Standardized data capture so recommendations could be trusted',
        body: 'Auto-transcription, structured data capture, and consistent tagging across every interaction. Recommendations are only as good as the inputs, so they locked the inputs down first.',
      },
      {
        title: 'Defined explicit approval gates for AI suggestions',
        body: 'A clear rule for every AI prompt: who reviews it, what they\'re checking, and what "approved" means. That turned ad-hoc acceptance into a repeatable, auditable decision step.',
      },
      {
        title: 'Trained frontline teams to work alongside an AI co-pilot',
        body: 'Not a vendor demo, but a working session on when to trust the prompt, when to override it, and how to give feedback that makes the next suggestion better.',
      },
    ],
    chatQuery: 'Help us move from Zero to Guided Autonomy: real-time AI assist with human approval',
    statBadge: { value: '67%', label: 'of organizations that standardize data capture reach Guided Autonomy within 12 months' },
  },
  2: {
    heading: 'What Insight Autonomy organizations did to break through',
    context: 'The Guided Autonomy ceiling is trust: AI recommends, but a human approves everything. Organizations broke through by letting AI generate intelligence on its own, surfacing insight without being asked, and teaching people to consume it.',
    actions: [
      {
        title: 'Automated reporting so no one runs reports by hand',
        body: 'Real-time CSAT and root-cause reporting, performance dashboards that update themselves, and trend detection across every interaction. People consume intelligence instead of assembling it.',
      },
      {
        title: 'Turned on proactive risk and anomaly flagging',
        body: 'AI watches continuously and raises churn risk, emerging issues, and outliers before a human would have noticed. The shift is from "pull a report" to "the system tells you."',
      },
      {
        title: 'Built trust in machine-generated insight',
        body: 'Showed the work behind each insight, the signals, the confidence, the source, so leaders learned to act on AI intelligence instead of re-deriving it themselves.',
      },
      {
        title: 'Picked low-risk decisions to let AI act end to end',
        body: 'A handful of high-volume, low-risk calls where AI executes and humans audit after the fact. The measured results became the business case for delegating more.',
      },
    ],
    chatQuery: 'Help us reach Insight Autonomy: AI that surfaces intelligence without being prompted',
    statBadge: { value: '3×', label: 'faster issue detection when AI surfaces insight proactively instead of on request' },
  },
  3: {
    heading: 'What Operational Autonomy organizations did to connect insight to action',
    context: 'At Insight Autonomy AI generates intelligence, but humans still carry it across the organization by hand. The breakthrough is wiring insight directly into cross-functional workflows, with humans supervising the exceptions, not the routine.',
    actions: [
      {
        title: 'Auto-synced AI insight into CRM, product, and finance',
        body: 'Contact-centre and operational intelligence flowed straight into the systems where work happens, CRM records, product roadmaps, revenue models, without a human re-keying it.',
      },
      {
        title: 'Designed human checkpoints for exceptions only',
        body: 'Defined which actions run automatically and which pause for a supervisor. People spend their attention on the edge cases that matter, not the routine that doesn\'t.',
      },
      {
        title: 'Stood up cross-team KPI dashboards driven by AI',
        body: 'Shared, real-time scorecards fed by AI so sales, service, product, and finance argued from the same numbers, and acted on them automatically.',
      },
      {
        title: 'Built a governance layer to keep speed and oversight in balance',
        body: 'Clear standards for what triggers a human override, who owns each automated workflow, and how exceptions get reviewed, so automation never outran accountability.',
      },
    ],
    chatQuery: 'Help us reach Operational Autonomy: AI insight driving cross-functional workflows',
    statBadge: { value: '40%', label: 'reduction in decision-to-action time when insight feeds workflows automatically' },
  },
  4: {
    heading: 'What Proactive Autonomy organizations do to get ahead of the need',
    context: 'Operational Autonomy reacts well. Proactive Autonomy anticipates: AI predicts outcomes and prescribes action before humans identify the need, while people move up to strategy and governance.',
    actions: [
      {
        title: 'Let predictions trigger action automatically',
        body: 'Predicted churn launches proactive outreach; a forecasted volume spike adjusts staffing; a detected upsell moment surfaces the offer, all before a human flags it. AI manages the execution triggers.',
      },
      {
        title: 'Shifted people from execution to strategy and governance',
        body: 'With AI handling prediction and triggering, leaders spend their time on guardrails, priorities, and the calls that genuinely need judgment, not running the machine.',
      },
      {
        title: 'Built the governance to trust prediction with action',
        body: 'Confidence thresholds, override paths, and audit trails that make it safe for AI to act on a forecast. The advantage compounds only when governance is mature enough to allow it.',
      },
      {
        title: 'Closed the loop so predictions get sharper over time',
        body: 'Every predicted-vs-actual outcome fed back into the models, so accuracy improved with each cycle and the organization\'s lead widened.',
      },
    ],
    chatQuery: 'Help us reach Proactive Autonomy: AI that anticipates and prescribes before we ask',
    statBadge: { value: '2.4×', label: 'higher returns for organizations acting on prediction vs. reacting to events' },
  },
  5: {
    heading: 'What Full Autonomy organizations do to self-govern at scale',
    context: 'The last step is from prediction to self-governance: AI executes end to end, learns from outcomes, and improves without manual retraining, while humans define guardrails and approve only high-risk exceptions.',
    actions: [
      {
        title: 'Let AI resolve issues end to end across systems',
        body: 'Autonomous workflows that span CRM, billing, and ticketing, resolving the whole issue, not a step of it, with humans involved only when risk crosses a defined threshold.',
      },
      {
        title: 'Deployed self-improving models that adapt on their own',
        body: 'QA and decision models that learn from new patterns and retrain themselves, so performance improves continuously without a manual rebuild cycle.',
      },
      {
        title: 'Narrowed human approval to high-risk exceptions only',
        body: 'Guardrails define what the system may do unattended and what must stop for sign-off. Humans govern the boundaries instead of operating inside them.',
      },
      {
        title: 'Made governance the core human job',
        body: 'Autonomous scheduling, real-time workforce rebalancing, and self-running operations mean leadership\'s highest-leverage work becomes setting strategy and keeping an autonomous system accountable.',
      },
    ],
    chatQuery: 'Help us reach Full Autonomy: self-governing AI with humans on guardrails',
    statBadge: { value: 'Top 8%', label: 'of organizations operate AI as a self-governing system at Full Autonomy' },
  },
  6: {
    heading: 'You\'re at Full Autonomy: the self-governing tier',
    context: 'At Full Autonomy the playbook shifts from building capability to governing it. The organizations that sustain the lead treat AI as a self-improving operating system and put their human effort into guardrails, trust, and strategy.',
    actions: [
      {
        title: 'Build proprietary AI assets competitors can\'t replicate',
        body: 'Models fine-tuned on your data, knowledge graphs from your institutional memory, and learning loops that compound over time. Generic models are table stakes; proprietary, self-improving AI is the moat.',
      },
      {
        title: 'Make governance a visible competitive differentiator',
        body: 'External audits, transparent guardrails, and clear accountability for autonomous decisions. In trust-driven markets, healthcare, financial services, government, that governance is itself a reason to buy.',
      },
      {
        title: 'Orchestrate agents across the whole enterprise',
        body: 'Coordinate fleets of autonomous agents across functions and systems, with a control plane that monitors, constrains, and improves them as one estate rather than many point solutions.',
      },
      {
        title: 'Keep humans firmly on the guardrails',
        body: 'Continuous evaluation, drift detection, and high-risk exception review so a system that runs itself stays aligned, safe, and accountable as it learns.',
      },
    ],
    chatQuery: 'Help us govern and extend our Full Autonomy AI capability',
    statBadge: { value: 'Top 8%', label: 'of organizations globally have reached Full Autonomy' },
  },
}

export default function WhatAILeadersDo({ currentIndex = 1, accent = '#91C46B' }) {
  const content = LEADER_CONTENT[currentIndex] || LEADER_CONTENT[6]

  return (
    <div className="mag-card p-8 lg:p-10">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-2">
        <span className="kicker">What AI Leaders Do</span>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold"
          style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}30` }}>
          <Zap size={10} />
          Stage {Math.min(currentIndex + 1, 6)} Playbook
        </div>
      </div>

      <h3 className="font-display font-black text-white text-lg lg:text-xl tracking-tight mb-2 leading-tight">
        {content.heading}
      </h3>
      <p className="text-text-secondary text-sm leading-relaxed mb-6">{content.context}</p>

      {/* Stat badge */}
      <div className="flex items-start gap-3 p-4 rounded-xl mb-7"
        style={{ background: `${accent}0e`, border: `1px solid ${accent}20` }}>
        <div className="font-display font-black text-2xl flex-shrink-0" style={{ color: accent }}>
          {content.statBadge.value}
        </div>
        <p className="text-text-secondary text-xs leading-relaxed pt-1">{content.statBadge.label}</p>
      </div>

      {/* Actions */}
      <div className="space-y-5">
        {content.actions.map((action, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex items-start gap-4"
          >
            {/* Step number */}
            <div className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center font-display font-black text-xs"
              style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}25` }}>
              {i + 1}
            </div>
            <div>
              <h4 className="font-display font-bold text-white text-sm leading-snug mb-1">{action.title}</h4>
              <p className="text-text-secondary text-sm leading-relaxed">{action.body}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8 pt-6 border-t border-white/[0.06]">
        <Link
          to={`/chat?q=${encodeURIComponent(content.chatQuery)}`}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-display font-bold text-sm no-underline transition-all duration-200 hover:-translate-y-0.5 px-5 py-3 rounded-xl"
          style={{ background: `${accent}15`, border: `1px solid ${accent}35`, color: accent }}
        >
          {content.chatQuery}
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
