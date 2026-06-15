/**
 * mailer.js — sends the assessment report PDF to the respondent (and notifies
 * the Radiant team) via SMTP using Nodemailer.
 *
 * Configure via .env:
 *   SMTP_HOST, SMTP_PORT (default 587), SMTP_SECURE ("true" for 465),
 *   SMTP_USER, SMTP_PASS, MAIL_FROM (e.g. "Radiant AI <reports@radiant.digital>"),
 *   REPORT_NOTIFY_EMAIL (optional — team inbox to copy on each report)
 *
 * If SMTP is not configured, isMailConfigured() returns false and callers should
 * respond 503 so the frontend can fall back to a direct download.
 */
import nodemailer from 'nodemailer'

export function isMailConfigured() {
  return !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.MAIL_FROM)
}

let transporter = null
function getTransport() {
  if (transporter) return transporter
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })
  return transporter
}

const esc = (s = '') => String(s).replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]))

function respondentHtml({ name, assessment, headline }) {
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#010f1e;color:#e8eef5;padding:32px;border-radius:16px;max-width:560px;margin:auto">
    <div style="font-weight:800;font-size:18px;margin-bottom:18px">RADIANT <span style="color:#91C46B">AI</span></div>
    <h2 style="margin:0 0 12px;font-size:22px;color:#fff">Your ${esc(assessment)} report</h2>
    <p style="line-height:1.7;color:#aebacb;margin:0 0 14px">
      Hi ${esc(name || 'there')}, thanks for completing the ${esc(assessment)} assessment.
      ${esc(headline)} Your full report is attached as a PDF.
    </p>
    <p style="line-height:1.7;color:#aebacb;margin:0 0 14px">
      It covers your maturity, a breakdown by dimension, your strengths and gaps, and a recommended next step.
      If you'd like to talk it through, just reply to this email.
    </p>
    <p style="color:#8899aa;font-size:12px;margin-top:24px">Radiant Digital · hello@radiant.digital · radiant.digital</p>
  </div>`
}

function teamHtml(lead) {
  const row = (k, v) => `<tr><td style="padding:4px 12px 4px 0;color:#888;font-size:13px">${esc(k)}</td><td style="padding:4px 0;font-size:13px"><b>${esc(v || '—')}</b></td></tr>`
  return `
  <div style="font-family:Arial,Helvetica,sans-serif">
    <h3>New assessment report request</h3>
    <table>
      ${row('Assessment', lead.assessment)}
      ${row('Result', lead.headline)}
      ${row('Name', lead.name)}
      ${row('Work email', lead.email)}
      ${row('Company', lead.company)}
      ${row('Sector', lead.sector)}
      ${row('Org size', lead.orgSize)}
      ${row('Department', lead.department)}
      ${row('Consent to contact', lead.consent ? 'Yes' : 'No')}
    </table>
    <p style="color:#888;font-size:12px">The same PDF was emailed to the respondent.</p>
  </div>`
}

/**
 * Sends the report PDF to the respondent and (optionally) notifies the team.
 * @param {object} lead - { name, email, company, sector, orgSize, department, consent, assessment, headline }
 * @param {Buffer} pdfBuffer
 * @param {string} filename
 */
export async function sendReportEmail(lead, pdfBuffer, filename) {
  const t = getTransport()
  const attachments = [{ filename: filename || 'Radiant-Report.pdf', content: pdfBuffer, contentType: 'application/pdf' }]

  await t.sendMail({
    from: process.env.MAIL_FROM,
    to: lead.email,
    subject: `Your ${lead.assessment} report from Radiant Digital`,
    html: respondentHtml(lead),
    attachments,
  })

  if (process.env.REPORT_NOTIFY_EMAIL) {
    await t.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.REPORT_NOTIFY_EMAIL,
      subject: `New ${lead.assessment} lead — ${lead.name || lead.email}`,
      html: teamHtml(lead),
      attachments,
    }).catch(err => console.error('Team notification failed:', err?.message || err))
  }
}
