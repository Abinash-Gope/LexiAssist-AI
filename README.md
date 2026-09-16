# LexiAssist AI — Legal Intelligence & Access Platform

[![PromptWars](https://img.shields.io/badge/PromptWars-Virtual_Exclusive_Edition-2563EB.svg)](https://hack2skill.com/event/pwvirtualsept)
[![Theme](https://img.shields.io/badge/Theme-AI_for_Legal_Assistance_%26_Access-0F172A.svg)](#)
[![Model](https://img.shields.io/badge/GenAI-Google_Gemini_Flash-10B981.svg)](#)
[![Architecture](https://img.shields.io/badge/Pattern-4--Layer_Unidirectional-blue.svg)](#)
[![Repo Size](https://img.shields.io/badge/Repo_Size-%3C_10_MB-brightgreen.svg)](#)

Empowering everyday individuals, tenants, freelancers, and small businesses with GenAI-powered legal literacy, contract risk scoring, semantic diff comparisons, and lawyer consultation prep kits.

---

## 📌 Problem Statement: AI for Legal Assistance & Access

Legal documents, residential leases, and freelancer work orders are dense, opaque, and heavily skewed in favor of the drafting party. Non-lawyers often sign contracts without understanding hidden liabilities or cannot afford costly preliminary attorney consultations. When individuals do seek a lawyer, they frequently arrive unprepared, wasting billable hours on routine document orientation.

**LexiAssist AI** levels the playing field by translating complex legalese into plain English, color-coding hidden risks (Red/Yellow/Green), comparing contract versions side-by-side, answering natural language questions with direct clause citations, and generating an actionable **Lawyer Consultation Prep Kit**.

> [!IMPORTANT]
> **Core Guardrail:** LexiAssist AI strictly provides **legal information and document comprehension assistance**, NOT certified legal advice or attorney-client representation. Every view and output features prominent ethical disclaimers.

---

## 🚀 Key Features & Capabilities

1. **Plain-English Clause Simplifier & Glossary:** Translates dense legal jargon, Latin terms (*indemnification, liquidated damages, force majeure*), and complex indemnity clauses into easily digestible bullet points.
2. **Automated Risk & Obligation Scoring (Red / Yellow / Green):** Color-coded flagging of high liabilities, automatic 12-month renewals, 15% rent hikes, and non-refundable fees with an overall safety gauge (0–100).
3. **Side-by-Side Version Diff & Policy Comparison:** Dual-column synchronized redline viewer displaying statutory baseline precedents vs. counter-proposals with strike-throughs, green insertions, and risk delta metrics (+38%).
4. **Document-Grounded Q&A (RAG):** Conversational AI copilot answering inquiries (*"What happens if I terminate early?"*) with clickable clause citations and zero-hallucination fallbacks.
5. **Lawyer Consultation Prep Kit Generator:** Synthesizes an executive risk matrix and the **Top 5 High-Priority Questions** to ask during the first 30 minutes of a legal consultation. One-click export to PDF or clean Markdown.
6. **100% Confidential & Ephemeral Data Processing:** No permanent contract PII storage. A 1-click **Wipe Session Data** button purges all active document memory immediately.
7. **Instant Evaluator Guest Demo:** Hackathon judges can bypass account creation with 1 click to test 3 rich pre-loaded scenarios (*Residential Lease, Freelance MSA, Mutual NDA*) or upload custom files.

---

## 🏛️ 4-Layer Unidirectional Architecture

The codebase strictly adheres to a robust **4-Layer Architecture** where data flows unidirectionally downwards:

```
┌─────────────────────────────────────────────────────────┐
│ Layer 1: CORE / INFRASTRUCTURE (src/core/)              │
│ Raw HTTP client, DTOs, parsers, presets, env constants  │
│ Strict isolation — Zero React or UI dependencies        │
└───────────────────────────┬─────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────┐
│ Layer 2: STATE & DATA FETCHING (src/state/)             │
│ Server State: TanStack Query (queries, mutations)       │
│ Client UI State: Redux Toolkit (modals, active clause)  │
│ Strict rule: Server data is never mirrored in Redux     │
└───────────────────────────┬─────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────┐
│ Layer 3: BUSINESS LOGIC / CUSTOM HOOKS (src/hooks/)     │
│ Coordinators combining queries, mutations & UI state    │
│ (useDocumentAnalysis, useContractDiff, useDocumentChat) │
└───────────────────────────┬─────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────┐
│ Layer 4: PRESENTATION LAYER (src/components/, src/pages)│
│ Pure UI primitives, feature widgets & 6 route pages     │
│ Routed via react-router-dom (createBrowserRouter)       │
└─────────────────────────────────────────────────────────┘
```

---

## 🤖 GenAI Integration & Model Specifications

* **Primary Reasoning & Deep Analysis Model:** **NVIDIA NIM** (`meta/llama-3.2-90b-vision-instruct`)
  * Hosts Meta's 89B parameter model via NVIDIA Inference Microservices (`https://integrate.api.nvidia.com/v1`).
  * Powers clause extraction, statutory violation detection, interactive document Q&A copilot, and strategic Lawyer Prep Kit synthesis.
* **Large-Document Ingestion Model:** **Google Gemini 2.5 Flash / 1.5 Flash** (`gemini-2.5-flash`)
  * Full-context ingestion exploiting Gemini's 1M+ token window for 50+ page legal filings without vector chunk loss.
* **Deterministic Fallback Engine:** Pure TypeScript deterministic legal parser ensuring 100% testable uptime during hackathon evaluations.
* **Detailed Documentation:** See [`GENAI_ARCHITECTURE.md`](./GENAI_ARCHITECTURE.md) for full pipeline specs.

---

## 💻 Tech Stack & Design Tokens

* **Framework:** React 18+ with TypeScript & Vite
* **Routing:** `react-router-dom` v6 (`createBrowserRouter`)
* **Server State:** TanStack Query (`@tanstack/react-query`)
* **UI State:** Redux Toolkit (`@reduxjs/toolkit` + `react-redux`)
* **Styling:** Tailwind CSS (configured with **LexiAssist AI Precision** design tokens)
* **Icons:** Lucide React
* **PDF Engine:** jsPDF

---

## ⚡ Quick Start & Local Setup

### 1. Clone Repository & Install Dependencies
```bash
git clone https://github.com/Abinash-Gope/LexiAssist-AI.git
cd LexiAssist-AI
npm install
```

### 2. Environment Configuration (Optional)
```bash
cp .env.example .env
# Add your Gemini API key if live cloud calls are desired:
# VITE_GEMINI_API_KEY=your_key_here
```
*(Note: LexiAssist AI has a built-in offline legal intelligence engine and rich presets, functioning out of the box with or without an API key).*

### 3. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build & Verification
```bash
npm run build
```

---

## 🎬 4-Minute Demo Video Walkthrough Script

1. **Minute 0:00–0:45 (Introduction & Problem):**
   * Introduce LexiAssist AI on the Landing Page (`/`).
   * Highlight the problem: Information asymmetry in standard leases and freelance agreements.
   * Click **"Start Free Contract Review"** or use the 1-Click Guest Demo on the Sign In page (`/login`).
2. **Minute 0:45–2:00 (Live Document Review & Risk Heatmap):**
   * On `/dashboard`, explore the Residential Lease preset.
   * Point out the **Risk Gauge (62/100 Moderate Risk)** and the 2 High Risk red flags.
   * Click **Section 12.2** (Automatic 15% Rent Escalation) and **Section 14.1** (Unilateral Tenant Indemnity).
   * Demonstrate the **Plain-English Breakdown** and click **"Copy Language"** on the fair counter-proposal.
   * In the **Grounded Chat Copilot**, type: *"What is the automatic renewal penalty?"* and show the cited provision link.
3. **Minute 2:00–3:15 (Side-by-Side Contract Comparison):**
   * Navigate to `/compare`.
   * Show the **Metric Delta Strip** (+38% Risk Delta, 2 New Liabilities, 1 Protection Omitted).
   * Showcase synchronized scrolling and redline strike-throughs vs. green statutory insertions.
   * Demonstrate the **"Draft Counter-Offer Email"** trigger.
4. **Minute 3:15–4:00 (Lawyer Prep Kit & Guardrails):**
   * Navigate to `/prep-kit`.
   * Display the publication-ready **Attorney Consultation Brief**.
   * Highlight the **Top 5 High-Priority Questions** for counsel's first 30 minutes.
   * Click **"Download PDF Brief"**.
   * Highlight the persistent **Non-Legal Advice Disclaimer** and trigger the 1-click **"Wipe Session Data"** button to prove zero data retention.

---

## 📄 License & Compliance

Distributed under the MIT License. LexiAssist AI is built as a submission for the **PromptWars: Virtual (Exclusive Edition)** hackathon.
