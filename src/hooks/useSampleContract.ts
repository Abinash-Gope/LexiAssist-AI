/**
 * Business Logic Hook: Sample Contract & Upload Coordinator
 * Manages 1-click presets and custom file ingestion.
 */

import { useState } from 'react';
import { useAppDispatch } from '@/state/store';
import { setActivePreset, setCustomContract } from '@/state/slices/contractUiSlice';

function extractTextFromPdf(raw: string): string {
  // Extract text within Tj / TJ operators
  const matches = raw.match(/\(([^()]{2,})\)\s*(?:Tj|TJ|\'|\")/g);
  if (matches && matches.length > 5) {
    const extracted = matches
      .map((m) => m.replace(/^\(/, '').replace(/\)\s*(?:Tj|TJ|\'|\")?$/, ''))
      .filter((t) => t.length > 1 && !/[^\x20-\x7E\s]/.test(t))
      .join(' ');
    if (extracted.length > 80) return extracted;
  }
  // Fallback: extract continuous readable ASCII blocks
  const blocks = raw.match(/[A-Za-z0-9,.:;'"\-\s]{30,}/g);
  if (blocks && blocks.length > 0) {
    const cleanBlocks = blocks.filter(
      (b) => !b.includes('endobj') && !b.includes('/Filter') && !b.includes('/Length') && !b.includes('/Type')
    );
    if (cleanBlocks.length > 0) {
      return cleanBlocks.join('\n\n');
    }
  }
  return '';
}

export function useSampleContract() {
  const dispatch = useAppDispatch();
  const [customFileText, setCustomFileText] = useState<string>('');
  const [customFileName, setCustomFileName] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const loadPreset = (preset: 'LEASE' | 'MSA') => {
    dispatch(setActivePreset(preset));
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setCustomFileName(file.name);

    try {
      let rawText = await file.text();
      let cleanText = rawText;

      if (file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf') {
        const extracted = extractTextFromPdf(rawText);
        if (extracted && extracted.trim().length > 50) {
          cleanText = extracted;
        }
      }

      setCustomFileText(cleanText);
      const cleanTitle = file.name === 'pasted-contract.txt' 
        ? 'Custom Uploaded Legal Agreement' 
        : file.name.replace(/\.[^/.]+$/, '');
      dispatch(setCustomContract({ text: cleanText, title: cleanTitle }));
    } catch (e) {
      console.error('File read error:', e);
    } finally {
      setIsUploading(false);
    }
  };

  const loadSampleCustomContract = (text: string, title: string) => {
    setCustomFileText(text);
    setCustomFileName(title);
    dispatch(setCustomContract({ text, title }));
  };

  return {
    customFileText,
    customFileName,
    isUploading,
    loadPreset,
    uploadFile: handleFileUpload,
    loadSampleCustomContract,
  };
}
