/**
 * Business Logic Hook: Lawyer Prep Kit Coordinator & Exporter
 * Generates structured consultation brief, handles PDF and Markdown exports.
 */

import { jsPDF } from 'jspdf';
import { usePrepKitQuery } from '@/state/queries/usePrepKitQuery';
import { ContractDocument } from '@/core/types/contract.types';

export function useLawyerPrepKit(
  document: ContractDocument | undefined,
  /** Optional custom notes to include in exports (passed from PrepKitBrief) */
  customNotes?: string[]
) {
  const { data: prepKit, isLoading, error } = usePrepKitQuery(document);

  const exportAsPdf = (notes?: string[]) => {
    if (!prepKit) return;
    const notesToExport = notes ?? customNotes ?? [];

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;

    // Header Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('ATTORNEY CONSULTATION PREPARATION KIT', 15, y);
    y += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(
      'Prepared by LexiAssist AI • Informational Analysis & Legal Orientation (Not Legal Counsel)',
      15,
      y
    );
    y += 12;

    // Divider
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(15, y, pageWidth - 15, y);
    y += 10;

    // Document Details
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.text(`Document: ${prepKit.documentTitle}`, 15, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.text(`Jurisdiction: ${prepKit.jurisdiction} | Date: ${prepKit.effectiveDate}`, 15, y);
    y += 6;
    doc.text(`Parties: ${prepKit.parties.firstParty} vs. ${prepKit.parties.secondParty}`, 15, y);
    y += 10;

    // Executive Summary
    doc.setFont('helvetica', 'bold');
    doc.text('Executive Risk Summary:', 15, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    const summaryLines = doc.splitTextToSize(prepKit.executiveSummary, pageWidth - 30);
    doc.text(summaryLines, 15, y);
    y += summaryLines.length * 6 + 8;

    // High Priority Questions for Attorney
    doc.setFont('helvetica', 'bold');
    doc.text('Top High-Priority Questions for Counsel (First 30 Minutes):', 15, y);
    y += 8;

    prepKit.topConsultationQuestions.forEach((q) => {
      doc.setFont('helvetica', 'bold');
      const questionText = `${q.questionNumber}. ${q.question}`;
      const qLines = doc.splitTextToSize(questionText, pageWidth - 30);
      doc.text(qLines, 15, y);
      y += qLines.length * 5 + 2;

      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100, 116, 139);
      const rLines = doc.splitTextToSize(`Objective: ${q.suggestedObjective}`, pageWidth - 30);
      doc.text(rLines, 20, y);
      y += rLines.length * 5 + 4;
      doc.setTextColor(15, 23, 42);

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    // Personal Notes section
    if (notesToExport.length > 0) {
      if (y > 240) { doc.addPage(); y = 20; }
      y += 4;
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(146, 64, 14); // amber-700
      doc.text('My Personal Consultation Notes:', 15, y);
      y += 8;
      doc.setTextColor(15, 23, 42);

      notesToExport.forEach((note, i) => {
        doc.setFont('helvetica', 'normal');
        const noteLines = doc.splitTextToSize(`${i + 1}. ${note}`, pageWidth - 30);
        doc.text(noteLines, 15, y);
        y += noteLines.length * 5 + 3;
        if (y > 270) { doc.addPage(); y = 20; }
      });
    }

    doc.save(`LexiAssist_Lawyer_Prep_Kit_${document?.id || 'doc'}.pdf`);
  };

  const exportAsMarkdown = (notes?: string[]) => {
    if (!prepKit) return;
    const notesToExport = notes ?? customNotes ?? [];

    let md = `# Attorney Consultation Brief: ${prepKit.documentTitle}\n\n`;
    md += `**Jurisdiction:** ${prepKit.jurisdiction}  \n`;
    md += `**Effective Date:** ${prepKit.effectiveDate}  \n`;
    md += `**Parties:** ${prepKit.parties.firstParty} vs. ${prepKit.parties.secondParty}  \n`;
    md += `**Overall Score:** ${prepKit.overallScore}/100  \n\n`;

    md += `## Executive Summary\n${prepKit.executiveSummary}\n\n`;

    md += `## Flagged Key Risks\n`;
    prepKit.keyRisks.forEach((r) => {
      md += `* **${r.section} (${r.level})**: ${r.summary} — *${r.identifiedRisk}*\n`;
    });
    md += `\n`;

    md += `## Top 5 High-Priority Questions for Your Attorney\n`;
    prepKit.topConsultationQuestions.forEach((q) => {
      md += `### ${q.questionNumber}. ${q.question}\n`;
      md += `* **Rationale:** ${q.rationale}\n`;
      md += `* **Target Objective:** ${q.suggestedObjective}\n\n`;
    });

    md += `## Recommended Counter-Proposals\n`;
    prepKit.recommendedCounterClauses.forEach((c) => {
      md += `* **${c.section} Proposed Amendment:**\n  > ${c.proposedTerm}\n\n`;
    });

    if (notesToExport.length > 0) {
      md += `## My Personal Consultation Notes\n`;
      notesToExport.forEach((note, i) => {
        md += `${i + 1}. ${note}\n`;
      });
      md += `\n`;
    }

    md += `---\n*Generated by LexiAssist AI. For informational orientation only. Not certified legal counsel.*`;

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `LexiAssist_Prep_Kit_${document?.id || 'doc'}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return {
    prepKit,
    isLoading,
    error,
    exportPdf: exportAsPdf,
    exportMarkdown: exportAsMarkdown,
  };
}
