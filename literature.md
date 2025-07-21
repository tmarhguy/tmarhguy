Below is a **fully‑specified, engineering‑ready MVP blueprint** for your personal site—**tailored to you (Tyrone Marhguy)**—so you can open VS Code tonight and begin coding with _zero ambiguity_.

---

# 0. Project Snapshot

| Item       | Value                                                                                                |
| ---------- | ---------------------------------------------------------------------------------------------------- |
| **Repo**   | `tmarhguy.dev` (public)                                                                              |
| **Stack**  | **Next.js 14 (app dir, static export)** · **TypeScript** · **TailwindCSS** · **shadcn/ui** · **MDX** |
| **Deploy** | GitHub Pages via `actions-gh-pages`                                                                  |
| **Domain** | `tyrone.tech` (suggested) → CNAME to `tmarhguy.github.io`                                            |
| **Goal**   | A recruiter gets _proof_ of your depth in **< 30 s**, then optional deep dives.                      |

---

# 1. Information Architecture

```
/
├─ index                ← Hero + flagship showcase
├─ projects/
│   ├─ hardware/
│   │   ├─ cpu
│   │   ├─ memory
│   │   ├─ calculator
│   │   └─ clock
│   ├─ software/
│   │   ├─ music-and-you
│   │   ├─ unibridge
│   │   ├─ color-game
│   │   ├─ yt-spotify-cli
│   │   └─ kv-store
│   └─ research/        ← optional white‑paper style pages
├─ blog/ (optional)
├─ about
└─ contact              ← Email + Calendly pop‑up
```

---

# 2. Design Token Sheet (Tailwind + CSS variables)

```js
// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6", // primary accent
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        graphite: {
          // neutral dark
          900: "#0f1117",
          800: "#1b1e26",
          700: "#2b2f3a",
        },
      },
      fontFamily: {
        sans: ["Space Grotesk", "ui-sans-serif", "system-ui"],
        mono: ["IBM Plex Mono", "ui-monospace"],
      },
      spacing: {
        xs: "0.875rem", //14 px
        sm: "1rem", //16
        md: "1.5rem", //24
        lg: "2rem", //32
        xl: "3rem", //48
      },
      transitionTimingFunction: {
        swift: "cubic-bezier(.25,.8,.25,1)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.15s ease-out",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
```

---

# 3. Component Map

| Component             | Purpose                                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------------------- |
| `<Hero />`            | Headline + rotating tagline (typewriter of “Hardware Hacker”, “ML Researcher”, “Civic‑Tech Builder”) |
| `<FlagshipCard />`    | Big card with hover lift, image/GIF, KPI stats, CTA link                                             |
| `<ProjectTimeline />` | Horizontal chips showing milestone dates                                                             |
| `<MetricTable />`     | Two‑column table auto‑styled (used across pages)                                                     |
| `<Sparkline />`       | Tiny chart (react‑sparklines) for metrics                                                            |
| `<WasmPlayground />`  | WASM Terminal embed for CPU simulator                                                                |
| `<RestPlayground />`  | SwaggerUI‑lite for UniBridge API                                                                     |
| `<BlogList />`        | Latest three posts                                                                                   |

**shadcn/ui primitives used:** `Card`, `Tabs`, `Accordion`, `Badge`, `Button`, `Tooltip`.

---

# 4. Repo Structure

```
tmarhguy.dev/
├─ app/
│   ├─ layout.tsx        ← global <html>
│   ├─ page.tsx          ← Hero / landing
│   ├─ projects/
│   │   ├─ layout.tsx    ← side nav for project area
│   │   ├─ hardware/
│   │   │   └─ cpu.mdx
│   │   └─ software/
│   │       └─ music-and-you.mdx
│   ├─ api/              ← optional static JSON endpoints
│   └─ 404.tsx
├─ components/
│   ├─ Hero.tsx
│   ├─ FlagshipCard.tsx
│   ├─ ProjectTimeline.tsx
│   ├─ MetricTable.tsx
│   ├─ Sparkline.tsx
│   └─ WasmPlayground.tsx
├─ public/
│   ├─ images/ (og + project shots)
│   └─ wasm/  (cpu.wasm, glue.js)
├─ scripts/
│   └─ build-feed.ts (pull GitHub commit feed)
├─ contentlayer.config.ts (if using contentlayer for MDX)
├─ tailwind.config.js
├─ next.config.js
└─ .github/workflows/deploy.yml
```

---

# 5. Key MDX Front‑Matter Template

```mdx
---
title: "8‑bit Transistor CPU"
date: "2025-05-04"
type: "hardware"
tags: ["hardware", "cpu", "digital-design"]
hero: "/images/cpu/alu_scope.png"
metrics:
  transistors: 734
  max_freq_khz: 4.3
  power_ma: 180
  test_pass_pct: 100
github: "https://github.com/tmarhguy/transistor-cpu"
video: "https://youtu.be/abcd1234"
---

import {
  MetricTable,
  ProjectTimeline,
  Sparkline,
  WasmPlayground,
} from "@/components";

<MetricTable
  rows={[
    { label: "Transistors", value: "734" },
    { label: "Max Stable Freq", value: "4.3 kHz" },
    { label: "Power @5 V", value: "180 mA" },
    { label: "Instruction Test Pass", value: "100 %" },
  ]}
/>

<ProjectTimeline
  items={[
    { label: "ISA Spec", date: "2024‑09" },
    { label: "Simulator v1", date: "2024‑11" },
    { label: "Hardware Bring‑Up", date: "2025‑01" },
    { label: "Fibonacci Demo", date: "2025‑03" },
  ]}
/>

<WasmPlayground />
```

The MDX front‑matter will power OpenGraph images and listing pages automatically.

---

# 6. WASM Playground Stub (CPU)

```tsx
"use client";
import React, { useEffect, useState } from "react";
import initWasm from "@/public/wasm/cpu_sim.js";

export default function WasmPlayground() {
  const [ready, setReady] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [code, setCode] = useState("LOAD R1,2\nLOAD R2,3\nADD R3,R1,R2\nHALT");

  useEffect(() => {
    initWasm().then((wasm) => {
      setReady(true);
      (window as any).wasmCpu = wasm; // expose for debugging
    });
  }, []);

  const run = async () => {
    const lines = (window as any).wasmCpu.run(code);
    setOutput(lines.split("\n"));
  };

  return (
    <div className="border rounded p-4 mt-6 bg-graphite-800 text-sm font-mono">
      <textarea
        className="w-full h-32 bg-graphite-700 p-2 rounded"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        disabled={!ready}
        className="mt-2 px-3 py-1 bg-brand-600 rounded hover:bg-brand-500 transition-swift"
        onClick={run}
      >
        {ready ? "Run" : "Loading…"}
      </button>
      <pre className="mt-3 text-brand-200">{output.join("\n")}</pre>
    </div>
  );
}
```

Build your Rust/Python simulator to WASM with `wasm-pack` or `pyodide` and place artifacts in `public/wasm/`.

---

# 7. REST Playground for UniBridge (Swagger‑Lite)

Use **Swagger‑UI React** component:

```tsx
import dynamic from "next/dynamic";
const SwaggerUI = dynamic<{}>(() => import("swagger-ui-react"), { ssr: false });

export default function RestPlayground() {
  return <SwaggerUI url="/api/openapi.json" docExpansion="none" />;
}
```

Generate `openapi.json` from your FastAPI build, export to `public/api/openapi.json`, commit as static file.

---

# 8. GitHub Actions Workflow

```yaml
name: Build & Deploy Personal Site

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    concurrency: ci-${{ github.ref }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run build && npm run export
      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: site
          path: out
      - name: Deploy to GH Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

Add `"export": "next build && next export"` to `package.json`.

---

# 9. Analytics & Feedback

1. Add Plausible (script tag in `layout.tsx`):

   ```tsx
   {
     process.env.NODE_ENV === "production" && (
       <script
         async
         defer
         data-domain="tyrone.tech"
         src="https://plausible.io/js/script.js"
       />
     );
   }
   ```

2. Track outbound resume click and GitHub stars via `plausible('DownloadResume')`.

---

# 🔟 7‑Day Execution Timeline

| Day   | Deliverables                                                                       |
| ----- | ---------------------------------------------------------------------------------- |
| **1** | Repo init, Tailwind, shadcn, deploy bare home page to GH Pages.                    |
| **2** | Implement Hero + FlagshipCards (CPU, Music & You, UniBridge).                      |
| **3** | Create MDX pages for CPU & Music & You, add MetricTable & Timeline.                |
| **4** | Add WasmPlayground stub (place dummy wasm), deploy update.                         |
| **5** | Author UniBridge page + embed Swagger UI; add Contact page.                        |
| **6** | Add sparkline component, blog scaffold with first log post.                        |
| **7** | Lighthouse perf pass, favicon, OpenGraph images, resume PDF, custom domain config. |

> _Time‑boxed each day to \~3 hr focus block._

---

# 11. “Definition of Done” Checklist

- [ ] **Build** passes in CI, Pages auto‑deploys.
- [ ] Lighthouse **Performance & A11y ≥ 90**.
- [ ] Each flagship page contains **hero image, metrics table, timeline, CTA button, GitHub link**.
- [ ] **WASM simulator** runs “ADD 2 3” demo.
- [ ] Swagger UI shows _at least_ `/auth/register` and `/applications` GET.
- [ ] Contact CTA opens mailto **`tmarhguy@gmail.com?subject=Let's Chat`**.
- [ ] `README.md` explains local dev in 3 commands.

---

### 🚀 You’re Ready

Clone, scaffold, commit **today**.
If you want **starter code** (Next.js project with Tailwind & Hero component), reply **“drop starter”**, and I’ll paste the files you can copy‑paste directly into your repo.
