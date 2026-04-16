/**
 * Seeds the DB with:
 *  1. Admin user from .env
 *  2. Default content blocks from siteContent static data
 *
 * Run once: node db/seed.js
 */
require('dotenv').config()
const bcrypt = require('bcryptjs')
const pool   = require('./connection')

const defaultContent = {
  brand: {
    name: 'Radiant Digital',
    platformName: 'Radiant Digital AI Platform',
    tagline: 'Enterprise Transformation. Supercharged with AI.',
    description:
      'We believe AI only delivers when it truly understands your business.',
    differentiator:
      'Every AI firm brings models. Only Radiant Digital grounds them with the Precision Context Engine.',
  },
  heroMetrics: [
    { value: '40%', label: 'Avg Cost Reduction' },
    { value: '3x',  label: 'Faster Time to Market' },
    { value: '14+', label: 'Industries Served' },
    { value: '30+', label: 'AI Use Cases Deployed' },
  ],
  proofPoints: [
    { value: '40%', label: 'Average cost reduction across enterprise deployments', accent: '#91C46B' },
    { value: '3x',  label: 'Faster time to market',                               accent: '#F0974E' },
    { value: '30+', label: 'AI use cases deployed across enterprise operations',   accent: '#596AE0' },
  ],
  trustStats: [
    { value: '20+', label: 'Years of Transformation', icon: 'Award'      },
    { value: '50+', label: 'Enterprise Clients',       icon: 'Briefcase' },
    { value: '$2B+',label: 'Programs Powered',         icon: 'TrendingUp'},
    { value: '40%', label: 'Avg Cost Reduction',       icon: 'DollarSign'},
  ],
  caseStudy: {
    kicker:   'Proof, Not Promises',
    headline: 'From reactive troubleshooting.\nTo proactive network intelligence.',
    client:   'Leading Fortune 15 Telecom Enterprise',
    quote:    'The solution elevated operational efficiency and shifted our approach from reactive troubleshooting to proactive network intelligence.',
    metrics: [
      { value: '70%',      label: 'Development Time Reduced'   },
      { value: '50+',      label: 'Screens Delivered in 3 Weeks'},
      { value: '40%',      label: 'Planning Delays Reduced'     },
      { value: 'CIO 100',  label: 'Award Winner 2024'           },
    ],
  },
  socialProof: {
    kicker:   'Customers',
    headline: '50+ Enterprises.\n$2B+ in Programs.\nReal Results.',
    body:     'The proof is in who keeps coming back.',
    compliance: 'CMMC compliant',
  },
  contact: {
    email:   'hello@radiant.digital',
    phone:   '301.306.5102',
    address: '8229 Boone Blvd, Suite 325, Vienna, VA 22182',
    offices: ['USA', 'Canada', 'India', 'Singapore'],
  },
}

async function seed() {
  const conn = await pool.getConnection()
  try {
    // Admin user
    const email    = process.env.ADMIN_EMAIL    || 'admin@radiant.digital'
    const password = process.env.ADMIN_PASSWORD || 'changeme'
    const hash     = await bcrypt.hash(password, 12)

    await conn.execute(
      `INSERT INTO admin_users (email, password_hash, role)
       VALUES (?, ?, 'admin')
       ON DUPLICATE KEY UPDATE role = 'admin'`,
      [email, hash]
    )
    console.log(`Admin user seeded: ${email}`)

    // Content blocks
    for (const [key, data] of Object.entries(defaultContent)) {
      await conn.execute(
        `INSERT INTO content_blocks (section_key, content_data, updated_by)
         VALUES (?, ?, 'seed')
         ON DUPLICATE KEY UPDATE content_data = VALUES(content_data)`,
        [key, JSON.stringify(data)]
      )
      console.log(`Content block seeded: ${key}`)
    }

    console.log('Seed complete.')
  } finally {
    conn.release()
    process.exit(0)
  }
}

seed().catch(err => { console.error(err); process.exit(1) })
