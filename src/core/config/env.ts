/**
 * Application Environment Configuration
 * Strict isolation - Pure TypeScript.
 */

export const ENV = {
  APP_NAME: 'LexiAssist AI',
  APP_THEME: 'AI for Legal Assistance & Access',
  VERSION: '1.0.0',
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY || '',
  GEMINI_MODEL: import.meta.env.VITE_GEMINI_MODEL || 'gemini-3.6-flash',
  NVIDIA_NIM_API_KEY: import.meta.env.VITE_NVIDIA_NIM_API_KEY || '',
  NVIDIA_NIM_MODEL:
    import.meta.env.VITE_NVIDIA_NIM_MODEL || 'meta/llama-3.2-11b-vision-instruct',
  NVIDIA_NIM_ENDPOINT: (() => {
    if (typeof window === 'undefined') return 'https://integrate.api.nvidia.com/v1/chat/completions';
    const origin = window.location.origin;
    const isLocal = origin.includes('localhost') || origin.includes('127.0.0.1');
    return isLocal ? '/api/nvidia/v1/chat/completions' : 'https://integrate.api.nvidia.com/v1/chat/completions';
  })(),
  ENABLE_LOCAL_MOCK_FALLBACK: true, // Guarantees seamless demo operation even if user has no API key entered
} as const;
