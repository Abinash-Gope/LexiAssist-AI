/**
 * Business Logic Hook: Sample Contract & Upload Coordinator
 * Manages 1-click presets and custom file ingestion.
 */

import { useState } from 'react';
import { useAppDispatch } from '@/state/store';
import { setActivePreset } from '@/state/slices/contractUiSlice';

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
      const text = await file.text();
      setCustomFileText(text);
      dispatch(setActivePreset('CUSTOM'));
    } catch (e) {
      console.error('File read error:', e);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    customFileText,
    customFileName,
    isUploading,
    loadPreset,
    uploadFile: handleFileUpload,
  };
}
