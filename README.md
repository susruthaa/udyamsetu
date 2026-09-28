# UDYAMSETU AI — One Guided Journey to the Right Financing Route

> **SIH 2026 Hackathon Prototype**  
> *AI-Driven & Rule-Verified Scheme Matching for Marginalized Entrepreneurs*

---

## 📌 Executive Summary & Problem Statement

Micro, Small, and Medium Enterprises (MSMEs)—especially those led by women, Scheduled Castes (SC), Scheduled Tribes (ST), Other Backward Classes (OBC), and rural entrepreneurs—face critical hurdles when seeking government financing:

1. **Information Asymmetry**: Dozens of central and state financing schemes exist (PMEGP, MUDRA, Stand-Up India, PM Vishwakarma, PM-SURAJ, PM SVANidhi), but guidelines are fragmented across multiple portals.
2. **Eligibility Ambiguity**: Technical criteria (age bounds, category quotas, income ceilings, project cost limits) make it hard for entrepreneurs to know if they qualify before applying.
3. **Complex Calculations**: Lack of transparent EMI, interest subsidy, and moratorium calculators leads to unexpected repayment burdens.
4. **Fragmented Routing**: Applicants do not know which physical channel partner (District Lead Banks, KVIC, DIC, State Channelizing Agencies) processes their application.

**UDYAMSETU AI** solves this by consolidating the entire financing journey into **one guided, transparent, and keyless workflow**.

---

## 🎯 Proposed Solution & Key Features

* **Smart Profile Assistant (Local NLP Parser)**: Converts natural-language conversational input into structured entrepreneur facts using rule-based pattern matching (zero API keys required).
* **Deterministic Rule Engine**: Evaluates every applicant against verified scheme criteria producing transparent **PASS**, **FAIL**, or **UNKNOWN** outcomes.
* **Explainable Scheme Matching**: Ranks suitable financing schemes based on criteria satisfied, loan range compatibility, and business sector alignment—without opaque "black-box" scores.
* **Interactive Financial Calculator**: Real mathematical EMI, interest, and moratorium schedule calculator with visual pie charts and user sliders.
* **Channel Partner Locator & Application Router**: Directs entrepreneurs to verified District Lead Banks, DIC Centers, State Channelizing Agencies, and official government application portals.

---

## 🏗️ System Architecture

UDYAMSETU AI follows a decoupled, pipeline-based architecture:

```
+-------------------------------------------------------+
|  User Natural Language / Conversational Profile Input |
+-------------------------------------------------------+
                           |
                           v
+-------------------------------------------------------+
|        1. Smart Profile Assistant (Local Parser)      |
|     (Regex & Pattern Matching for Age, Sector, Loan)  |
+-------------------------------------------------------+
                           |
                           v
+-------------------------------------------------------+
|           2. Structured Entrepreneur Profile          |
|    (Age, Category, State, Business Sector, Financing) |
+-------------------------------------------------------+
                           |
                           v
+-------------------------------------------------------+
|       3. Deterministic Rule Engine (Local Logic)      |
|  Evaluates Age, Category, Loan Ceiling, State, Sector |
|            Outputs: PASS / FAIL / UNKNOWN             |
+-------------------------------------------------------+
                           |
                           v
+-------------------------------------------------------+
|          4. Explainable Scheme Matching               |
|      (Ranks Verified Schemes with Rationale)          |
+-------------------------------------------------------+
                           |
                           v
+-------------------------------------------------------+
|       5. Financial Repayment & EMI Calculator         |
|      (Compound Interest Math + Moratorium Schedule)   |
+-------------------------------------------------------+
                           |
                           v
+-------------------------------------------------------+
|       6. Channel Partner & Official Route Guidance    |
|   (KVIC, DIC, Banks, Stand-Up Mitra, PM Vishwakarma)  |
+-------------------------------------------------------+
```

---

## 🧠 Local Natural Language Understanding (NLP Parser)

To ensure **100% keyless, offline, and deterministic execution** without relying on paid or rate-limited external LLM APIs (Gemini/OpenAI), UDYAMSETU AI includes a custom local NLP parser (`src/utils/localParser.ts`).

### How It Works:
1. **Age Extraction**: Regex matches numeric age patterns like `"32 year old"`, `"age 28"`, `"45 yrs"`.
2. **Gender Identification**: Pattern matching for `"woman"`, `"female"`, `"man"`, `"male"`, `"transgender"`.
3. **State & Location Detection**: Matches names across all 28 Indian States and Union Territories.
4. **Loan Amount Normalization**: Parses Indian number notations like `"3 lakh"`, `"₹5L"`, `"50 thousand"`, `"10 Lakhs"`, converting them to exact numbers in INR (`300000`, `500000`, etc.).
5. **Business Sector Classification**: Classifies phrases like `"tailoring business"`, `"food processing"`, `"retail shop"`, `"handicraft"`, `"dairy farm"` into standard sectors (*Manufacturing*, *Services*, *Trading*, *Food Processing*, *Handicrafts / Artisans*).
6. **Financing Purpose & Stage**: Distinguishes between `"start new venture"` vs. `"expand existing unit"`, and `"purchase machinery"` vs. `"working capital"`.

---

## ⚡ Deterministic Rule Engine Logic

The Rule Engine (`src/utils/ruleEngine.ts`) evaluates every scheme against 7 core criteria:

| Rule Check | Status Condition | Explanation |
| :--- | :--- | :--- |
| **1. Applicant Age** | `PASS` / `FAIL` | `profile.age >= minAge && profile.age <= maxAge` |
| **2. Social Category** | `PASS` / `FAIL` | Checks if category (SC/ST/OBC/General) matches scheme targets |
| **3. Loan Amount** | `PASS` / `FAIL` | Checks if requested loan is within `[minLoan, maxLoan]` range |
| **4. Business Sector** | `PASS` / `FAIL` | Validates sector compatibility and project cost caps |
| **5. Geographic Coverage** | `PASS` / `FAIL` | Verifies state coverage (`All` or specific state) |
| **6. Income Ceiling** | `PASS` / `FAIL` / `UNKNOWN` | Evaluates annual family income; flags `UNKNOWN` if certificate pending |
| **7. Udyam Registration** | `PASS` / `UNKNOWN` | Checks MSME registration; flags `UNKNOWN` if not yet registered |

---

## 🧮 Financial Repayment Calculator Math

The Financial Calculator (`src/utils/emiCalculator.ts`) uses standard compound interest monthly reducing balance equations:

$$EMI = P \times r \times \frac{(1+r)^n}{(1+r)^n - 1}$$

Where:
* $P$ = Loan Amount (Project Cost minus Own Contribution)
* $r$ = Monthly Interest Rate ($\text{Annual Interest Rate} / 12 / 100$)
* $n$ = Active Repayment Months ($\text{Tenure Years} \times 12 - \text{Moratorium Months}$)

---

## 📚 Verified Scheme Dataset & Official Sources

All scheme criteria used in UDYAMSETU AI are grounded in real, official government documentation:

1. **PMEGP (Prime Minister Employment Generation Programme)**  
   * *Official Source*: [KVIC Online Portal](https://www.kviconline.gov.in/pmegp/) (Ministry of MSME)
2. **Pradhan Mantri MUDRA Yojana (Shishu / Kishor / Tarun)**  
   * *Official Source*: [MUDRA Official Portal](https://www.mudra.org.in/) (Ministry of Finance / SIDBI)
3. **Stand-Up India Scheme**  
   * *Official Source*: [Stand-Up Mitra Portal](https://www.standupmitra.in/) (Department of Financial Services / SIDBI)
4. **PM Vishwakarma Scheme**  
   * *Official Source*: [PM Vishwakarma Portal](https://pmvishwakarma.gov.in/) (Ministry of MSME)
5. **NSFDC Concessional Term Loan**  
   * *Official Source*: [NSFDC Official Site](https://nsfdc.nic.in/) (Ministry of Social Justice & Empowerment)
6. **PM SVANidhi Micro Credit Scheme**  
   * *Official Source*: [PM SVANidhi Portal](https://pmsvanidhi.mohua.gov.in/) (Ministry of Housing and Urban Affairs)

---

## 🛠️ Technology Stack

* **Frontend Framework**: React 19 + TypeScript + Vite
* **Styling**: Tailwind CSS v4 (Public-Service Government Theme)
* **Icons**: Lucide React
* **Charts**: Recharts
* **State Management**: React Context (`JourneyContext`)

---

## 🚀 Installation & Running Guide

### Prerequisites:
* Node.js (v18 or higher recommended)
* npm (v9 or higher)

### Setup & Run:

1. **Clone & Install Dependencies**:
   ```bash
   npm install
   ```

2. **Launch Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## ⚠️ Prototype Design Choice & Limitation Statement

> **Notice for SIH Judges**:  
> The current prototype intentionally uses **local rule-based natural-language parsing** and a **local deterministic rule engine** rather than an external LLM API (such as Gemini or OpenAI).  
> This architectural decision ensures:
> 1. **Zero Key Dependency**: The prototype runs 100% offline without requiring any API keys or network latency.
> 2. **Deterministic & Explainable Outputs**: Eligibility decisions are 100% auditable and reproducible without hallucinated criteria.
> 3. **Future Extensibility**: The modular architecture is designed so that an LLM API endpoint can be plugged into the parser layer in a future production release without altering the rule engine or financial routing pipeline.
