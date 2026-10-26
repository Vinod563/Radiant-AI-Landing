import { buildAiExecutiveReportDoc } from './aiExecutiveReport.js'

/**
 * Builds the AI assessment report as a jsPDF doc (no save). The CX report is
 * rendered with @react-pdf/renderer only (see getReportPdfBase64).
 * @returns {{ doc: import('jspdf').jsPDF, filename: string }}
 */
export function buildReportDoc({ kind, profile, answers }) {
  if (kind === 'ai') return buildAiExecutiveReportDoc({ profile, answers })
  throw new Error(`buildReportDoc: no jsPDF builder for "${kind}", use getReportPdfBase64`)
}

/** Builds the report and triggers a browser download. */
export function generateReportPdf(args) {
  const { doc, filename } = buildReportDoc(args)
  doc.save(filename)
}

/** Builds the report and returns its base64 (no data-URI prefix) + filename, for emailing.
 *  Both executive editions render via @react-pdf/renderer (real layout engine). */
export async function getReportPdfBase64(args) {
  if (args.kind === 'ai') {
    const { getAiReportPdfBase64 } = await import('./aiReportPdf.jsx')
    return getAiReportPdfBase64({ profile: args.profile, answers: args.answers })
  }
  const { getCxReportPdfBase64 } = await import('./cxReportPdf.jsx')
  return getCxReportPdfBase64({ profile: args.profile, answers: args.answers })
}
