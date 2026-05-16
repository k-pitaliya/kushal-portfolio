# Portfolio v2 — Design Plan ("Signal Path")

> Plan-only. No execution until explicit approval.

---

## 0. Brutal-honest read on the current site

The current portfolio is **good**. It scored "premium-2024-tech-bro template" — which is fine, but it's not what you asked for and not the bar for a $2000-equivalent DV-focused portfolio.

What's working (don't break):
- Real content + real numbers (41 bugs, 89 coverage points, 17 covergroups)
- DV positioning is clean
- Headshot, OG image, resume preview, working contact form
- Tech foundation: Next.js 16, Tailwind 4, Framer Motion — solid
- The CredibilityStrip is the strongest new element

What's wrong / cliché:
1. **Three.js particle field background** — generic 2023 SaaS aesthetic, not VLSI-themed
2. **Glass cards everywhere** — overused
3. **Giant translucent section numbers (01, 02, 03)** — decoration without function
4. **Custom cursor** — fights native UX, fragile on touch
5. **Aurora shader / blob gradients** — peak "AI-generated landing page" cliché
6. **Magnetic buttons** — overused micro-interaction
7. **Skill percentage bars** (already partially removed) — subjective, unprovable
8. **Konami easter egg, sound toggle** — cute, but noise
9. **10 sections** is too many — recruiters skim, IA bloated
10. **Information density is low** — lots of empty space without intent

The core sin: it looks like every 2023 portfolio rendered through a Next.js + Framer Motion lens. Nothing about it says "this engineer verifies silicon."

---

## 1. Design direction — "Signal Path"

**The thesis:** Make it feel like the inside of a verification environment. Calm, technical, intentional. Linear meets oscilloscope. Substance carries the design, not the other way around.

**Reference quality bar:** linear.app · vercel.com/home · anthropic.com · modal.com · raycast.com

**On the "AI-generated aesthetic" ask:** I'm reading that as "the look that AI-tooling companies use in 2026" — restrained, generative-feeling backgrounds, big variable typography, monochrome with one accent, code-as-design-element. NOT actual generative slop. Authenticity matters: your content is real verification work, the design should match that integrity.

**Design tokens (v2):**

```
Color (drastic simplification)
- bg            #0A0A0B      (warm-black, was #0A0A0A)
- bg-elevated   #111114      (cards, panels)
- text          #FAFAFA      (kept)
- text-muted    #A1A1A1      (kept, AAA contrast)
- text-dim      #6E6E78      (kept-ish, AA contrast)
- accent        #00BFFF      (electric cyan — kept, on-brand for DV)
- accent-soft   #00BFFF20    (subtle washes)
- divider       #20202A      (subtle separators)
- success       #4ADE80      (status indicators)
- warning       #FBBF24      (severity badges)
- error         #F87171      (severity badges)

DROP: accent-warm (orange), gradient pinks/violets — single-accent discipline

Typography (premium hierarchy)
- Display: Geist Display (variable)         — hero h1, section h2
- Body:    Inter Variable                   — paragraphs
- Mono:    JetBrains Mono (already in use)  — code, metrics, labels, timestamps

Scale (clamped fluid):
- display-xl   clamp(3.5rem, 8vw, 7rem)     — Hero name
- display-lg   clamp(2.5rem, 5vw, 4rem)     — Section titles
- display-md   clamp(1.5rem, 3vw, 2.25rem)  — Subsection titles
- body-lg      clamp(1.05rem, 1.5vw, 1.25rem)
- body         clamp(0.95rem, 1.1vw, 1.05rem)
- caption      0.875rem
- mono-sm      0.75rem
- mono-xs      0.6875rem

Motion (less is more)
- Default ease: cubic-bezier(0.22, 1, 0.36, 1)
- Default duration: 280ms (was 400-800ms across the site)
- Reveal: opacity-only, no Y translation (less janky)
- No magnetic buttons. No 3D card tilts (except About photo — keep that one).

Space (8pt grid)
- Section padding: clamp(4rem, 10vw, 7rem) top/bottom
- Card padding: 1.5rem mobile / 2rem desktop
- Max content width: 1100px (was 1280px, tighter feels premium)
```

---

## 2. New information architecture (10 → 7 sections)

| Order | Section | Was | Why |
|---|---|---|---|
| 1 | **Hero** | Hero | Radically simplified — see below |
| 2 | **Credibility Strip** | (same) | Kept, refined |
| 3 | **Now / Currently** *(NEW)* | — | Live-feeling status — what you're shipping THIS week |
| 4 | **Selected Work** | Projects | Tall case-study cards, not horizontal-scroll |
| 5 | **Bug Atlas** *(NEW)* | — | Differentiating section. Real bug examples, before/after code |
| 6 | **Stack & Approach** | Skills + Methodology MERGED | One section, no bars, just structured chips + paragraphs |
| 7 | **Background** | Experience + Education + Certifications MERGED | Single chronological timeline |
| 8 | **Writeups** | Blog | Slim list, 3 entries, links to GitHub markdown |
| 9 | **About** | About | Moved later — recruiters care about work FIRST |
| 10 | **Contact** | Contact | Cleaner, single column |
| Footer | — | Footer | Engineering metadata (build hash, deploy timestamp, source link) |

**Removed entirely:**
- Testimonials — only 2 testimonials, reads as thin. Move the prof quote inline into About if you want to keep it.
- Standalone Education section
- Standalone Certifications section
- All section "big number" watermarks

---

## 3. Section-by-section redesign

### 3.1 Hero (the biggest change)

**Currently:** name + typewriter + tagline + 3D scene + floating badges + scroll parallax + 2 CTAs. Too much.

**v2:** Surgical minimum.

```
[ subtle grid pattern background, 4% opacity ]

                  ▮ AVAILABLE FOR DV ROLES · IST/UTC

              KUSHAL PITALIYA
              (Geist Display, 7rem on desktop)

       Design Verification Engineer

  I find bugs in silicon before silicon finds them in production.
  (body-lg, max-width 600px)

  🟢 Now: closing coverage on the I2C UVM testbench

  [ View Work → ]    [ Resume ⌘R ]

                  ↓
```

Key changes:
- Drop the Three.js particle scene entirely
- Drop the typewriter (overused)
- Drop the 8 floating badges
- One sentence positioning statement (not three)
- "Now" indicator with green dot — live-feeling, manual-update string
- ⌘R hint on Resume button to advertise the Cmd+K command palette
- Massive name in Geist Display Variable weight 700 → 900 hover transition

**Background:** Replace particle field with a SUBTLE animated dot grid (think Linear / Vercel). Lightweight, on-brand. ~30 lines of code, GPU-light.

### 3.2 Credibility Strip (refined)

- Add 4th stat: **2 protocols verified** (I2C + AXI4-Lite)
- Add tiny mono description under each number
- Lose the rounded background; use just border-top/bottom
- Counters animate on scroll-into-view (already do)

### 3.3 Now / Currently (NEW — 4 lines, 1 section)

```
  CURRENT FOCUS · WEEK OF MAY 16, 2026

  Closing coverage holes on the I2C UVM testbench —
  stretch×read cell (CG17) and rep_dir×WRITE cell (CG14).
  Targeting 17/17 covergroup closure by end of week.

  next.git.commit  →  github.com/k-pitaliya/i2c-protocol-dv
```

This is the most differentiating addition. Recruiters see this and know you're ACTIVE, not a frozen portfolio. Just text + timestamp. No graphics needed. You update the copy when you ship something.

### 3.4 Selected Work (case-study treatment)

**Currently:** 6 cards in horizontal scroll. Equal weight.

**v2:** 3 featured projects as full-bleed case studies, then a compact "Also" grid for the rest.

Each featured case study:

```
┌─────────────────────────────────────────────────────────┐
│ FEATURED · MAY 2026                  github.com/.../axi  │
│                                                          │
│ AXI4-Lite 4×4 Crossbar UVM Testbench                    │
│ (display-md)                                             │
│                                                          │
│ Full UVM 1.2 verification of a 4-master × 4-slave AXI   │
│ crossbar with round-robin arbitration and DECERR.       │
│                                                          │
│  25         8          3                                 │
│  Bugs       Tests      Covergroups                       │
│                                                          │
│  [ Architecture diagram — inline SVG, 16:9 ]            │
│                                                          │
│  Stack                                                   │
│  SystemVerilog · UVM 1.2 · AXI4-Lite                    │
│  QuestaSim · Riviera-PRO · EDA Playground               │
│                                                          │
│  [ View Repo ↗ ]  [ EDA Playground ↗ ]  [ Writeup ↗ ]   │
└─────────────────────────────────────────────────────────┘
```

Three featured: AXI Crossbar, I2C UVM, FSM Controller.

Architecture diagrams: inline SVG block diagrams I generate — much higher signal than the current chip glyph. For each featured project, a real schematic showing the UVM hierarchy or DUT block diagram. ~80 lines of SVG per project.

"Also" grid below: FIFO, Audio Spectrum, Ultrasonic — compact 3-up grid, minimal styling.

### 3.5 Bug Atlas (NEW — the differentiator)

The single biggest differentiator vs every other ECE undergrad portfolio.

A grid of 6-8 bugs across both UVM projects, each as a card:

```
┌──────────────────────────────────────┐
│ BUG #1 · CRITICAL                    │
│ I2C Slave Controller                 │
│                                      │
│ Shift register captures ACK bit as   │
│ data byte                            │
│                                      │
│  ─ before                            │
│  always_ff @(posedge scl_pos)        │
│    shift_reg <= {shift_reg[6:0],sda};│
│                                      │
│  ─ after                             │
│  always_ff @(posedge scl_pos)        │
│    if (bit_count < 8)                │
│      shift_reg <= {shift_reg[6:0],   │
│                    sda};             │
│                                      │
│  RCA: counter ignored — captured ACK │
│  on 9th clock as data byte.          │
└──────────────────────────────────────┘
```

Code blocks rendered with syntax highlighting via `shiki` (Vercel-grade, build-time, zero runtime JS). Filterable by severity (Critical/Major/Moderate).

**This is the single most valuable section to add.** A Qualcomm/Synopsys recruiter sees this, they know you actually do DV.

### 3.6 Stack & Approach (Skills + Methodology merged)

Three columns, no bars:

```
LANGUAGES                  TOOLS                        METHODOLOGY
SystemVerilog              QuestaSim                    UVM 1.2 architecture
Verilog HDL                ModelSim                     Constrained-random
C / C++                    Riviera-PRO                  Coverage-driven closure
Python                     EDA Playground               SVA property binding
GNU Make                   Xilinx Vivado / ISE          Scoreboard with refmodel
Bash                       Git / GitHub                 Bug → RCA documented in MD
```

One paragraph below the columns describing your verification philosophy. Like a designer's statement, but for DV.

### 3.7 Background (Experience + Education + Certifications, single timeline)

Vertical timeline, reverse chronological:

```
2026 MAY · Present     CHARUSAT VLSI Internship 2026
                       Design Verification Intern
                       — AXI4-Lite crossbar (25 bugs), I2C UVM (16 bugs)

2025 AUG · Present     CHARUSAT ECE — UGSF
                       Undergraduate Student Fellow
                       — Digital design lab, FPGA workshops for 50+

2025 MAY · Jul         Kudos Technolabs
                       Cloud Tech Intern
                       — Production serverless document pipeline

2024                   Design of Digital Circuits — L&T EduTech (cert)
                       Undergraduate Student Fellow — CHARUSAT (cert)

2023 · 2027 (exp.)     CHARUSAT — B.Tech ECE
                       CGPA 8.74 · JEE 93 percentile
```

Single visual element. Half the screen scroll height of current 3 sections combined.

### 3.8 Writeups (slim)

Just a list:
- Closing Coverage on I2C UVM — 89 points · 17 covergroups   →
- 25 Bugs in an AI-Generated AXI Crossbar   →
- I2C Slave Controller — 16 RTL Bugs, 9 Categories   →

No card UI. List view. Date + title + arrow. Click goes to GitHub markdown.

### 3.9 About (moved later, tightened)

- Headshot on the right (kept — it's great)
- 2 paragraphs of narrative (cut from 3)
- Below: "Outside engineering" — 1 sentence on what you do for fun (humanizes)

### 3.10 Contact (cleaner)

- Big headline: "Want to work together?"
- Single-column layout (not split)
- Form inputs without glass styling — clean rounded borders
- Below form: "Or email me directly: pitaliyakushal@gmail.com" + LinkedIn + GitHub buttons
- Resend integration kept (already working)

### 3.11 Footer (engineering metadata)

```
KUSHAL PITALIYA
Design Verification Engineer · Rajkot, Gujarat

— signal-path/v2.0
— last deploy 2026-05-16 17:42:18 IST
— commit a7f3c92
— built with Next.js 16 + Tailwind 4

github.com/k-pitaliya/kushal-portfolio · source
```

Mono font, dim color, left-aligned. Reads like a `__version__` block.

---

## 4. Components to BUILD

| New component | Lines | Purpose |
|---|---|---|
| `Hero/v2.tsx` | ~150 | Simplified hero (no Three.js, no typewriter, no badges) |
| `NowPanel.tsx` | ~50 | Current-focus block |
| `CaseStudy.tsx` | ~200 | Tall featured-project card with architecture diagram slot |
| `BugAtlas.tsx` | ~250 | Filterable grid of bug cards |
| `BugCard.tsx` | ~120 | Single bug with before/after code (shiki) |
| `Timeline.tsx` | ~150 | Background section vertical timeline |
| `WriteupsList.tsx` | ~50 | Slim list (replaces Blog) |
| `DotGridBg.tsx` | ~30 | Subtle animated dot grid (replaces particle field) |
| `Footer/v2.tsx` | ~80 | Engineering metadata footer |
| `lib/architecture-svgs/*.tsx` | ~80 each | Inline SVG diagrams (3 of these — AXI, I2C, FSM) |

## 5. Components to DELETE

| Drop | Why |
|---|---|
| `CustomCursor.tsx` | Fights native UX, fragile |
| `Spotlight.tsx` | Heavy, generic |
| `KonamiEaster.tsx` | Cute but noise |
| `SoundToggle.tsx` | Unused |
| `MagneticButton.tsx` | Overused micro-interaction |
| `AuroraShader.tsx` | Generic decoration |
| `ParticleField.tsx` | Cliché 3D background |
| `Scene.tsx` (Three.js root) | Goes with above |
| `Marquee.tsx` + `MarqueeDivider.tsx` | Replaced with subtle dividers |
| `Testimonials.tsx` | Too thin to warrant a section |
| `Skills.tsx` (current) | Folded into Stack & Approach |
| `Methodology.tsx` (just built) | Folded into Stack & Approach |
| `Education.tsx` | Folded into Timeline |
| `Certifications.tsx` | Folded into Timeline |
| `Blog.tsx` (current) | Replaced with WriteupsList |

## 6. Components KEPT (refined)

| Keep | Refinement |
|---|---|
| `Preloader.tsx` | Simplified — drop the monogram circle, just name + progress |
| `Navbar.tsx` | Trim items to new IA (Home / Work / Stack / Background / Writeups / About / Contact) |
| `CommandPalette.tsx` | Make MORE discoverable — small Cmd+K hint in nav |
| `useSmoothScroll.ts` (Lenis) | Kept — works well |
| `CredibilityStrip.tsx` | Add 4th stat + per-stat description |
| `ResumePreviewModal.tsx` | Kept as-is, refined styling |
| `Contact.tsx` | Restyled, mailto fallback kept, Resend wiring kept |

---

## 7. Phased execution (so we don't break what works)

**Phase 1 — Foundation (4 hrs)**
- New design tokens (colors, type scale, motion)
- New Tailwind config
- Geist Display font integration
- DotGridBg component
- DELETE the kill-list components
- Keep page rendering even if rough — incremental

**Phase 2 — Hero + Credibility (2 hrs)**
- New Hero (simplified)
- Refined CredibilityStrip
- NowPanel

**Phase 3 — Selected Work (5 hrs)**
- CaseStudy component
- 3 architecture SVG diagrams (AXI, I2C, FSM)
- "Also" compact grid for remaining 3 projects

**Phase 4 — Bug Atlas (4 hrs)**
- Set up shiki for syntax highlighting (build-time)
- BugCard + BugAtlas components
- Author 6-8 bug entries from your I2C/AXI bug reports

**Phase 5 — Stack + Background + Writeups (3 hrs)**
- Stack & Approach (3-column)
- Background timeline
- WriteupsList

**Phase 6 — About + Contact + Footer (2 hrs)**
- Reorder, restyle
- Engineering footer

**Phase 7 — Polish (2 hrs)**
- Mobile audit on every new component
- Animation pass — drop the noisy ones, keep the intentional
- Lighthouse pass

**Total: ~22 hours of focused dev work.** Parallelizable to ~10–12 hours real-time using 2-3 subagents.

---

## 8. Content audit (during execution)

I'll verify each piece of content as I go:
- Every project metric checked against your BUG_REPORT.md / COVERAGE_CLOSURE_REPORT.md / FINAL_REPORT.md
- Every GitHub link tested (curl 200 verification)
- Every date, every claim — cross-checked against the source docs
- Resume PDF version current (last swapped May 16)
- OG image card current
- Sitemap + robots accurate

The content is already mostly correct (verified in the audit you just approved). The redesign won't introduce content drift if I do it right.

---

## 9. Risks & trade-offs (what could go wrong)

| Risk | Likelihood | Mitigation |
|---|---|---|
| Removing Three.js means losing "wow factor" first impression | Med | The Bug Atlas + Selected Work are higher-signal "wows." A senior recruiter prefers proof over particles. |
| Variable font (Geist Display) adds ~80KB | Low | Use `next/font` subset to weights 400/700/900, ~40KB |
| Bug Atlas requires curating bug content — text work, not code | Med | I have your full BUG_REPORT.md context; I draft, you review |
| shiki syntax highlighting at build time bloats build | Low | shiki is tree-shakeable to just Verilog/SystemVerilog grammars + 1 theme |
| Killing 9 components is a lot of churn | Med | Phased — keep current site live, build v2 in branch, swap when ready |
| Timeline may feel "thin" without certs scattered | Low | Background section is shorter on purpose — info density is the goal |

---

## 10. Decision points — I need answers before executing

1. **Accent color** — keep electric cyan `#00BFFF`? Or shift to something more distinctive? (Suggest: stay with cyan — on-brand for DV displays, and you've established it.)
2. **Display typeface** — Geist Display (modern, Vercel's font), Inter Display (workhorse), or something more distinctive like Söhne / GT Walsheim (paid)?
3. **Bug Atlas scope** — 6 bugs (manageable) or 8 (more comprehensive)? Source bugs from I2C only, AXI only, or mixed?
4. **Branch strategy** — build v2 in a `v2-redesign` git branch and deploy to a preview URL first, then swap to main once approved? (Recommended — zero risk to live site.)
5. **Three.js removal** — fully remove the dependency from package.json? (Saves ~600KB. Recommended unless you want to keep the option for a future iteration.)
6. **Testimonials** — drop entirely, or move the prof's quote inline into About? (Recommended: inline into About as a pull-quote, drop the standalone section.)

---

## 11. What this WON'T do

Just being clear about what's out of scope:

- **Won't migrate off Next.js / React** — overhaul, not rewrite
- **Won't add a custom domain** (`kushalpitaliya.dev`) — that's a separate purchase decision
- **Won't add /blog routes with MDX rendering** — the writeups stay on GitHub
- **Won't add a CMS** — overkill, content lives in code
- **Won't redesign the resume PDF** — that's a separate task
- **Won't add light mode** — dark-only is on-brand for DV/engineering audiences

---

## 12. Recommendation

**Ship Phase 1 (Foundation) first as a small standalone commit.** That alone improves the site by killing the cliché elements and tightening typography. If you don't like the new direction after Phase 1, we revert cleanly.

If Phase 1 lands well, continue with Phase 2 → 6. Phase 7 (polish) is always last.

**My single highest-confidence recommendation:** even if you reject this whole plan, **add the Bug Atlas section anyway**. It is the most differentiating thing a DV portfolio can show, and your existing content (BUG_REPORT.md across both projects) is right there waiting to be lifted into the site.

---

## Next step

Read this, push back on anything you disagree with, answer the 6 decision-point questions in §10, and tell me which phases to execute. I won't touch a file until you do.
