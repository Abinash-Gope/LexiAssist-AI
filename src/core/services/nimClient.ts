/**
 * NVIDIA NIM HTTP Transport Client
 * Handles all network communication with the NVIDIA NIM LLM API,
 * including timeout management via AbortController.
 * Strict isolation - Pure TypeScript, zero React imports.
 */

import { ENV } from '../config/env';

export async function callNvidiaNim(
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  options?: { responseJson?: boolean; maxTokens?: number; timeoutMs?: number }
): Promise<string | null> {
  const apiKey = ENV.NVIDIA_NIM_API_KEY;
  if (!apiKey) return null;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options?.timeoutMs ?? 4000);

  try {
    const payload = {
      model: ENV.NVIDIA_NIM_MODEL,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
      max_tokens: options?.maxTokens ?? 1500,
      temperature: 0.2,
      stream: false,
    };

    const res = await fetch(ENV.NVIDIA_NIM_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) return null;

    const data = await res.json();
    return (data.choices?.[0]?.message?.content as string) || null;
  } catch {
    clearTimeout(timeoutId);
    return null;
  }
}
