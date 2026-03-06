import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle, LayoutDashboard, Brain, Zap, Target, FileText, Settings } from 'lucide-react'

const features = [
  'Real-time CX monitoring across all channels and segments',
  'AI-driven root-cause insights with drill-down capabilities',
  'Configurable alerts with AI-prioritized action queues',
  'Executive summaries and board-ready impact reports',
]

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard',    active: true },
  { icon: Brain,           label: 'Intelligence' },
  { icon: Zap,             label: 'Workflows' },
  { icon: Target,          label: 'Actions' },
  { icon: FileText,        label: 'Reports' },
  { icon: Settings,        label: 'Settings' },
]

const issues = [
  { issue: 'Checkout friction', impact: 'High', status: 'Reviewing',  statusColor: 'text-brand-orange', action: 'Auto-route →' },
  { issue: 'App load latency',  impact: 'Med',  status: 'Resolved',   statusColor: 'text-brand-green',  action: 'View report' },
  { issue: 'Support backlog',   impact: 'High', status: 'Escalated',  statusColor: 'text-brand-purple', action: 'Workflow →' },
]

const DashboardMockup = () => (
  <div className="bg-brand-dark border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
    {/* Title bar */}
    <div className="flex items-center gap-2 px-5 py-3 bg-brand-secondary border-b border-white/[0.07]">
      <div className="flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
      </div>
      <div className="ml-3 flex gap-5">
        {['Overview', 'Root Cause', 'Workflows', 'Reports'].map((t, i) => (
          <span key={t} className={`font-display text-[0.68rem] font-medium pb-0.5 cursor-pointer transition-colors ${i === 0 ? 'text-brand-green border-b border-brand-green' : 'text-text-muted hover:text-text-secondary'}`}>{t}</span>
        ))}
      </div>
    </div>

    <div className="flex">
      {/* Sidebar */}
      <div className="w-11 flex flex-col items-center gap-5 py-5 bg-brand-secondary/40 border-r border-white/[0.06]">
        {sidebarItems.map(s => {
          const Icon = s.icon
          return (
            <div key={s.label} title={s.label}
              className={`w-7 h-7 rounded-xl flex items-center justify-center cursor-pointer transition-colors ${s.active ? 'bg-brand-green/15 text-brand-green' : 'text-text-muted hover:text-text-secondary'}`}>
              <Icon size={13} />
            </div>
          )
        })}
      </div>

      {/* Main content */}
      <div className="flex-1 p-5">
        {/* KPI row */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            { val: '94.2', label: 'CSAT', c: 'text-brand-green' },
            { val: '+18',  label: 'NPS',  c: 'text-brand-orange' },
            { val: '41%',  label: 'Res.', c: 'text-brand-green' },
            { val: '3.4×', label: 'ROI',  c: 'text-brand-purple' },
          ].map(k => (
            <div key={k.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-2.5 text-center">
              <div className={`font-display text-lg font-black ${k.c} leading-none`}>{k.val}</div>
              <div className="text-[0.55rem] text-text-muted mt-0.5">{k.label}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl px-3 pt-3 pb-2 mb-4 h-14 flex items-end gap-1">
          {[40, 60, 48, 80, 55, 95, 70, 100].map((h, i) => (
            <div key={i} style={{ height: `${h}%` }}
              className={`flex-1 rounded-sm ${i >= 5 ? 'bg-brand-green' : 'bg-brand-green/20'}`} />
          ))}
        </div>

        {/* Two cols */}
        <div className="grid grid-cols-5 gap-3">
          {/* Alerts */}
          <div className="col-span-2 space-y-2">
            {[
              { dot: 'bg-brand-green',  text: 'NPS up +18pts' },
              { dot: 'bg-brand-orange', text: 'Checkout drop' },
              { dot: 'bg-brand-purple', text: '1,240 resolved' },
              { dot: 'bg-brand-green',  text: 'SLA: 98.4% ✓' },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-white/[0.02] border border-white/[0.05] text-[0.6rem] text-text-secondary">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${a.dot}`} />
                {a.text}
              </div>
            ))}
          </div>

          {/* Issues table */}
          <div className="col-span-3">
            <div className="grid grid-cols-4 gap-1 mb-2 text-[0.55rem] text-text-muted font-display font-semibold uppercase tracking-widest px-1">
              <span>Issue</span><span>Impact</span><span>Status</span><span>Action</span>
            </div>
            {issues.map(row => (
              <div key={row.issue} className="grid grid-cols-4 gap-1 px-1 py-1.5 bg-white/[0.02] border border-white/[0.04] rounded-lg mb-1 text-[0.6rem]">
                <span className="text-text-primary font-medium truncate">{row.issue}</span>
                <span className={row.impact === 'High' ? 'text-brand-orange' : 'text-text-muted'}>{row.impact}</span>
                <span className={row.statusColor}>{row.status}</span>
                <span className="text-brand-green cursor-pointer hover:opacity-80">{row.action}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default function ICXSPOG() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-32 bg-brand-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* Left */}
          <motion.div ref={ref}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="kicker">Product Interface</span>
            <h2 className="font-display font-black leading-[0.95] tracking-tight mb-5"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              One Dashboard to<br />
              See <span className="grad-text">Everything</span><br />
              That Matters.
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              The CX Single Pane of Glass (SPOG) gives CX leaders, analysts, and executives a complete, real-time view of customer experience health — from raw signal all the way to resolution status.
            </p>
            <ul className="space-y-4 mb-10">
              {features.map(f => (
                <li key={f} className="flex items-start gap-3 text-sm text-text-secondary">
                  <CheckCircle size={16} className="text-brand-green flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <a href="#contact" className="btn-primary text-sm">See Live Demo <span className="ml-1">→</span></a>
          </motion.div>

          {/* Right – dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
