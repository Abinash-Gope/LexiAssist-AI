/**
 * HTTP Client & GenAI Service Engine — Barrel Re-Export
 * Strict isolation - Pure TypeScript, zero React imports.
 *
 * The original monolithic 791-line file has been split into focused service modules:
 *   nimClient.ts       → NVIDIA NIM HTTP transport layer
 *   analyzeService.ts  → Contract analysis & risk scoring
 *   diffService.ts     → Redline diff generation (uploaded & custom)
 *   chatService.ts     → Grounded document Q&A copilot
 *   prepKitService.ts  → Lawyer prep kit synthesis
 *
 * This barrel preserves all public exports so downstream consumers
 * (hooks, queries) require zero changes.
 */

export { callNvidiaNim } from '../services/nimClient';
export { analyzeContract } from '../services/analyzeService';
export {
  generateCustomDiff,
  generateUploadedDocDiff,
  compareContracts,
} from '../services/diffService';
export { askContractQuestion } from '../services/chatService';
export { synthesizeLocalPrepKit, generatePrepKit } from '../services/prepKitService';
