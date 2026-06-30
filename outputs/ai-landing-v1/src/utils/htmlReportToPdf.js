import { buildAiReportHtml, buildCxReportHtml } from '../components/assessment/HTMLReportViewer.jsx'

/**
 * Generate the downloadable PDF by rendering the *same* branded HTML report the
 * user sees in "View report online", then converting it to a multi-page PDF.
 * This keeps the downloaded PDF visually identical to the online report instead
 * of maintaining a separate jsPDF layout.
 *
 * The report HTML is written into an off-screen iframe (its own document) so its
 * global CSS (`* { margin:0 }`, `body { background }`, font @imports) can't leak
 * into the live app. html2canvas rasterises it; the bitmap is sliced into A4 pages.
 *
 * @param {{ kind:'ai'|'cx', profile:object, result:object }} args
 */
export async function generateReportPdfFromHtml({ kind, profile, result }) {
  const [{ jsPDF }, html2canvasMod] = await Promise.all([
    import('jspdf'),
    import('html2canvas'),
  ])
  const html2canvas = html2canvasMod.default || html2canvasMod

  const html = kind === 'ai'
    ? buildAiReportHtml(profile, result)
    : buildCxReportHtml(profile, result)

  // Off-screen isolated document
  const iframe = document.createElement('iframe')
  Object.assign(iframe.style, {
    position: 'fixed', left: '-99999px', top: '0',
    width: '800px', height: '1200px', border: '0', background: '#ffffff',
  })
  document.body.appendChild(iframe)

  const idoc = iframe.contentDocument || iframe.contentWindow.document
  idoc.open(); idoc.write(html); idoc.close()

  try {
    // Let webfonts + layout settle so the capture isn't blank/unstyled
    if (idoc.fonts && idoc.fonts.ready) await idoc.fonts.ready
  } catch { /* fonts API unavailable, fall through */ }
  await new Promise(r => setTimeout(r, 350))

  const target = idoc.querySelector('.report') || idoc.body

  const filename = `radiant-${kind}-assessment-report-${(profile?.fullName || 'report').toLowerCase().replace(/\s+/g, '-')}.pdf`

  try {
    const canvas = await html2canvas(target, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      width: 800,
      windowWidth: 800,
    })

    const pdf = new jsPDF('p', 'pt', 'a4')
    const pageW = pdf.internal.pageSize.getWidth()
    const pageH = pdf.internal.pageSize.getHeight()
    const imgW = pageW
    const imgH = (canvas.height * imgW) / canvas.width
    const imgData = canvas.toDataURL('image/jpeg', 0.95)

    let position = 0
    let remaining = imgH
    pdf.addImage(imgData, 'JPEG', 0, position, imgW, imgH)
    remaining -= pageH
    while (remaining > 0) {
      position -= pageH
      pdf.addPage()
      pdf.addImage(imgData, 'JPEG', 0, position, imgW, imgH)
      remaining -= pageH
    }

    pdf.save(filename)
  } finally {
    document.body.removeChild(iframe)
  }
}
