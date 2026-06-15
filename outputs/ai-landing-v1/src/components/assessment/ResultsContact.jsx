import { Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react'
import ContactForm from '../shared/ContactForm'

const contactItems = [
  { icon: Mail, label: 'Email', value: 'hello@radiant.digital', href: 'mailto:hello@radiant.digital' },
  { icon: Phone, label: 'Phone', value: '301.306.5102', href: 'tel:3013065102' },
  { icon: MapPin, label: 'Office', value: '8229 Boone Blvd, Suite 325, Vienna, VA 22182' },
]

/**
 * Two-column contact block for assessment results.
 * Left: heading, copy, contact details, trust bullets. Right: shared ContactForm.
 */
export default function ResultsContact({
  accent = '#91C46B',
  kicker = 'Get in Touch',
  title,
  body,
  bullets = [],
  subjectPrefix,
  meta,
  defaults,
}) {
  return (
    <div className="mag-card p-8 lg:p-10 no-print">
      <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
        {/* Left — context + details */}
        <div>
          <span className="kicker mb-4">{kicker}</span>
          <h3 className="font-display font-black text-white text-xl lg:text-2xl tracking-tight mb-3">{title}</h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-7">{body}</p>

          {bullets.length > 0 && (
            <div className="space-y-3 mb-8">
              {bullets.map(b => (
                <div key={b} className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color: accent }} />
                  <span className="text-text-secondary text-sm leading-relaxed">{b}</span>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-4">
            {contactItems.map(item => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${accent}14`, border: `1px solid ${accent}26` }}>
                  <item.icon size={16} style={{ color: accent }} />
                </div>
                <div>
                  <div className="text-text-muted text-[10px] font-display font-semibold uppercase tracking-widest mb-0.5">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="text-white text-sm font-semibold hover:text-brand-green transition-colors">{item.value}</a>
                  ) : (
                    <span className="text-white text-sm font-semibold">{item.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div>
          <ContactForm accent={accent} subjectPrefix={subjectPrefix} meta={meta} defaults={defaults} />
        </div>
      </div>
    </div>
  )
}
