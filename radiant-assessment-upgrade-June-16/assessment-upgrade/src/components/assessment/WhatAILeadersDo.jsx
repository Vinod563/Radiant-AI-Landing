import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

/**
 * WhatAILeadersDo — stage-specific guidance showing what organizations
 * at the next maturity level do differently.
 *
 * Props:
 *   currentIndex  number 1..5
 *   accent        string hex
 *   chatQuery     string — pre-filled chat query for the CTA
 */

const LEADER_CONTENT = {
  1: {
    heading: 'What Stage 2 organizations did to move forward',
    context: 'Organizations that successfully moved out of Stage 1 did one thing consistently: they stopped debating AI in the abstract and committed to three specific use cases — with names, owners, and timelines attached.',
    actions: [
      {
        title: 'Produced a one-page AI brief — not a strategy deck',
        body: 'Not a 40-slide strategy deck. A one-page document: three AI outcomes for the next 12 months, who owns each, and how success is measured. Leadership alignment in 90 minutes, not 6 months.',
      },
      {
        title: 'Named a single accountable executive',
        body: 'They didn\'t form a committee. One person — CTO, CDO, or a designated VP — owned the AI agenda with a budget and authority to act. Committees produce reports. Owners produce outcomes.',
      },
      {
        title: 'Started one pilot with real data and a real success metric',
        body: 'Not a proof of concept with synthetic data. A live workflow — customer support, document processing, demand forecasting — with a baseline measurement and a target they could miss.',
      },
      {
        title: 'Ran a 2-hour AI literacy session for the executive team',
        body: 'Not a vendor demo. A working session: what AI can and can\'t do, where the organization\'s data is already good enough to start, and what the first decision gate looks like.',
      },
    ],
    chatQuery: 'Help us build a 90-day AI action plan to move from Stage 1 to Stage 2',
    statBadge: { value: '67%', label: 'of Stage 1 orgs that formalize ownership reach Stage 2 within 12 months' },
  },
  2: {
    heading: 'What Stage 3 organizations did to break through',
    context: 'The Stage 2 trap is having pilots that work technically but don\'t spread. Stage 3 organizations closed that gap by treating the human adoption problem as seriously as the technical one.',
    actions: [
      {
        title: 'Built a role-differentiated AI training program',
        body: 'Not a single "AI for everyone" course. Separate tracks: what executives need to decide, what managers need to lead, what frontline staff need to use. Different content, different formats, mandatory not optional.',
      },
      {
        title: 'Formalized a GenAI policy before the next deployment',
        body: 'Shadow GenAI use was already happening. They got ahead of it: a two-page acceptable use policy, approved tools list, and a clear process for requesting new tools. Written and enforced before the next use case went live.',
      },
      {
        title: 'Assigned a change management lead to every AI project',
        body: 'Not an afterthought. A named person responsible for: who needs to change their workflow, what the rollout plan looks like, and how adoption gets measured. Part of project kickoff, not post-launch.',
      },
      {
        title: 'Cleaned one critical dataset end-to-end',
        body: 'Picked the data domain that would unblock the most AI use cases, ran a 60-day quality sprint, and documented what was clean enough to use. That inventory became the foundation for the next three pilots.',
      },
    ],
    chatQuery: 'Help us scale our AI pilots beyond the technical team into the broader organization',
    statBadge: { value: '3×', label: 'faster time to enterprise deployment when change management is built in from day one' },
  },
  3: {
    heading: 'What Stage 4 organizations did to govern at scale',
    context: 'Moving from Adopt to Govern is about infrastructure — not technology infrastructure, but the organizational infrastructure that lets AI scale without creating compounding risk. Stage 4 organizations built that infrastructure before they needed it.',
    actions: [
      {
        title: 'Published a formal AI governance policy with enforcement teeth',
        body: 'Not aspirational principles. Documented standards: which AI deployments require ethics review, who approves model changes, what triggers a human override, and what happens when something goes wrong. Board-approved and tied to project gates.',
      },
      {
        title: 'Built an AI portfolio management process',
        body: 'Stopped treating each AI initiative as a standalone project. Created a portfolio view: all active use cases, their ROI metrics, their data dependencies, and their governance status. One owner. Reviewed monthly with executives.',
      },
      {
        title: 'Established pre/post ROI measurement as standard practice',
        body: 'Every AI investment — before it was approved — had a baseline measurement and a defined success metric. After deployment, the same team measured the outcome. That data funded the next round of investment.',
      },
      {
        title: 'Stood up an internal AI Center of Excellence',
        body: 'A small team (4–8 people) whose job was to make every other team\'s AI projects faster: shared tooling, reusable components, deployment standards, and a playbook for moving from pilot to production.',
      },
    ],
    chatQuery: 'Help us build the governance infrastructure to scale AI across our enterprise',
    statBadge: { value: '40%', label: 'reduction in deployment time for organizations with a formal AI Center of Excellence' },
  },
  4: {
    heading: 'What Stage 5 organizations do to compound the advantage',
    context: 'The difference between Stage 4 and Stage 5 is mindset, not technology. Stage 5 organizations stopped treating AI as a separate initiative and integrated it into how the organization operates, decides, and learns.',
    actions: [
      {
        title: 'Embedded AI KPIs in the executive performance scorecard',
        body: 'AI outcome metrics — not just deployment counts, but revenue attribution, cost reduction, and experience improvements — were tied to executive compensation. That changed the conversation from "AI projects" to "how we run the business."',
      },
      {
        title: 'Built a continuous learning loop from every deployment',
        body: 'Every production AI system had a feedback mechanism: model performance monitoring, drift detection, user feedback collection, and a retraining protocol. Outcomes from each use case informed the next investment decision.',
      },
      {
        title: 'Created a factory model for AI deployment',
        body: 'Standardized the path from pilot to production. Any use case that passed the business value threshold followed the same intake, build, review, deploy, and measure sequence. Speed to value dropped from 18 months to under 90 days.',
      },
      {
        title: 'Started publishing their AI maturity journey externally',
        body: 'Thought leadership, public case studies, and board-level reporting on AI outcomes. This created recruiting advantage, enterprise credibility, and a feedback loop that further sharpened their internal capability.',
      },
    ],
    chatQuery: 'Help us build a factory model for enterprise AI deployment at Stage 5 maturity',
    statBadge: { value: '2.4×', label: 'higher AI-attributed revenue growth for Stage 5 organizations vs. Stage 3 peers' },
  },
  5: {
    heading: 'You\'re in the AI Leaders tier',
    context: 'At Stage 5, the playbook shifts from building capability to compounding it. The organizations that sustain the advantage are the ones that treat AI as an operating system, not a project portfolio.',
    actions: [
      {
        title: 'Pursue agentic AI as the next capability frontier',
        body: 'Move beyond models that respond to humans to systems that initiate multi-step actions across tools, data, and workflows. The organizations deploying agentic AI today are building a 24-month lead over peers still operating reactive AI.',
      },
      {
        title: 'Build proprietary AI assets that competitors can\'t replicate',
        body: 'Fine-tuned models trained on your proprietary data, knowledge graphs built from your institutional knowledge, and evaluation frameworks calibrated to your specific outcomes. Generic models are table stakes. Proprietary AI is moat.',
      },
      {
        title: 'Export your AI capability as a product or partnership',
        body: 'Organizations at this stage are monetizing their AI infrastructure: through platform licensing, joint ventures with partners, or AI-powered service offerings. The capability becomes a revenue line, not just a cost reduction.',
      },
      {
        title: 'Invest in AI governance as a competitive differentiator',
        body: 'Public reporting on AI ethics, external audits, and regulatory leadership. In markets where trust is a purchase driver — healthcare, financial services, government — governance transparency is a direct source of competitive advantage.',
      },
    ],
    chatQuery: 'Help us identify the next frontier for our Stage 5 AI capability',
    statBadge: { value: 'Top 8%', label: 'of organizations globally have reached Stage 5 AI maturity' },
  },
}

export default function WhatAILeadersDo({ currentIndex = 1, accent = '#91C46B' }) {
  const content = LEADER_CONTENT[currentIndex] || LEADER_CONTENT[5]

  return (
    <div className="mag-card p-8 lg:p-10">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-2">
        <span className="kicker">What AI Leaders Do</span>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold"
          style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}30` }}>
          <Zap size={10} />
          Stage {Math.min(currentIndex + 1, 5)} Playbook
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
