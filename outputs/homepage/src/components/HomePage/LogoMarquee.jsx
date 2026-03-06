import { motion } from 'framer-motion';

const clients = [
  { name: 'Verizon', sector: 'Telecom' },
  { name: 'Navy Federal', sector: 'Finance' },
  { name: 'Halliburton', sector: 'Energy' },
  { name: 'EPA', sector: 'Federal' },
  { name: 'NIH', sector: 'Health' },
  { name: 'USCIS', sector: 'Federal' },
  { name: 'MD Anderson', sector: 'Healthcare' },
  { name: 'Baylor University', sector: 'Education' },
  { name: 'World Table Tennis', sector: 'Sports' },
  { name: 'Brighter Bites', sector: 'Non-Profit' },
];

// Duplicate for seamless loop
const doubled = [...clients, ...clients];

const LogoMarquee = () => {
  return (
    <section className="py-10 bg-white border-y border-border-light/40 overflow-hidden">
      <div className="mb-5 text-center">
        <p className="text-content-muted text-[11px] font-secondary font-bold uppercase tracking-[0.25em]">
          Trusted by industry leaders worldwide
        </p>
      </div>

      <div className="relative overflow-hidden">
        {/* Left/right fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="marquee-track">
          {doubled.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="inline-flex items-center gap-3 mx-6 px-6 py-3 rounded-xl bg-surface-cyan/50 border border-border-light/40 hover:bg-surface-cyan hover:border-teal-border/30 transition-all duration-200 cursor-default group shrink-0"
            >
              <div className="w-2 h-2 rounded-full bg-brand-green/50 group-hover:bg-brand-green transition-colors duration-200" />
              <span className="font-primary font-semibold text-[14px] text-content-body group-hover:text-teal-dark transition-colors duration-200 whitespace-nowrap">
                {client.name}
              </span>
              <span className="text-[11px] font-secondary text-content-muted whitespace-nowrap">
                {client.sector}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
