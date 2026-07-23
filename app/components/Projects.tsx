"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Cpu,
  Layers,
  Printer,
  Mail,
  Database,
  Sparkles,
  Terminal,
  Info,
  Calendar,
} from "lucide-react";

const projects = [
  {
    id: "auto-negotiator",
    title: "Auto Negotiator",
    category: "Agentic AI",
    tech: ["Gemini API", "Node.js/TypeScript", "Neon Postgres", "Vercel Functions", "Agent Tool Use"],
    description:
      "A live LLM agent that negotiates hardware transfers between stores over a mocked email/calendar toolbelt — every reasoning step and drafted email is genuine inference against real Postgres state, never a scripted walkthrough.",
    goal: "Eliminate manual back-and-forth on routine hardware-shortage requests through autonomous, verifiable agent decision-making.",
    metric: "Target: zero human touchpoints on standard negotiation cycles",
    highlight: true,
    liveUrl: "https://negotiate.fightingwind.com",
    image: "/screenshots/auto-negotiator.png",
  },
  {
    id: "procurement-classifier",
    title: "Procurement Classifier",
    category: "ML · Web App",
    tech: ["ML Classification", "Flask", "Python", "AWS", "React"],
    description:
      "ML classification model integrated into a Flask web application delivering single-click procurement categorization.",
    goal: "Replace 4-window context switching with actionable ML intelligence surfaced directly in the workflow.",
    metric: "Deployed to 100+ operational stakeholders across APAC",
    highlight: false,
  },
  {
    id: "opensesame",
    title: "OpenSesame",
    category: "Systems · 3D Web",
    tech: ["PDF Extraction", "SVG Processing", "Three.js", "Python", "Node"],
    description:
      "PDF extraction → SVG processing → 3D web rendering pipeline for real-time indoor asset fault reporting and wayfinding.",
    goal: "Give facility and operations teams live visibility into asset status without requiring on-site presence.",
    metric:
      "Operational visibility for global facility teams across multiple sites",
    highlight: false,
    liveUrl: "https://opensesame.fightingwind.com",
    image: "/screenshots/opensesame.png",
  },
  {
    id: "buslari",
    title: "Buslari",
    category: "Home Kiosk · Full-Stack",
    tech: [
      "LTA API",
      "Next.js",
      "Neon Postgres",
      "Drizzle ORM",
      "Telegram Bot API",
    ],
    description:
      "A split-flap Solari board (Bus + Solari) reborn as a home dashboard — repurposing an old iPad to show live Singapore bus arrivals, prayer times, and messages texted in over Telegram.",
    goal: "Give a spare iPad a second life as a retro flip-board kiosk that earns its spot on the wall: live transit info alongside prayer/holiday panels and a personal message board the household can update remotely.",
    metric:
      "Adaptive LTA cache (20s–2min TTL) keeps 3 bus stops live without hammering rate limits",
    highlight: false,
    liveUrl: "https://buslari.fightingwind.com",
    image: "/screenshots/buslari.png",
  },
  {
    id: "eucd-kiosks",
    title: "EUCD Device Kiosks",
    category: "Systems Integration",
    tech: ["Hardware Integration", "Python", "Kiosk UI", "Asset DB", "REST"],
    description:
      "End-to-end hardware-software systems integration powering self-service device check-in/check-out lifecycle management.",
    goal: "Remove IT dependency from routine device transactions and create an auditable device lifecycle record.",
    metric: "500 devices managed across 3 operational sites",
    highlight: false,
  },
  {
    id: "printer-fleet",
    title: "Zebra Printer Fleet Tool",
    category: "Fleet Management",
    tech: ["ZPL", "Headless Printing", "Python", "Dashboard", "Fleet API"],
    description:
      "ZPL-based headless printing engine with fleet management dashboard providing single-pane remote control of hardware.",
    goal: "Eliminate manual label generation errors and give ops teams remote visibility and control of all printer hardware.",
    metric:
      "95% reduction in label generation time · Global rollout across APAC and ME regions",
    highlight: false,
  },
  {
    id: "tourism-photobooth",
    title: "UWU Airwaves Photo Booth",
    category: "Interactive Kiosk · GenAI",
    tech: [
      "Gemini API",
      "Next.js",
      "Cloudinary",
      "Upstash Redis",
      "Resend",
      "ZPL",
    ],
    description:
      "A fictional premium-airline photobooth built for creative engagement with Airport Experience and Tourism Stakeholders — four experience modes (Photo Strip, Breath Fog, Video Call, Poem Receipt) that all share one procedurally generated boarding pass.",
    goal: "Ship an end-to-end creative kiosk: browser capture → Cloudinary/Redis session pipeline → a Gemini-personalized poem and Satori-rendered boarding pass → Zebra ZPL thermal print.",
    metric:
      "4 experience modes sharing one boarding-pass spine · barcode encodes a live retrieval URL scannable straight from a phone camera",
    highlight: false,
    liveUrl: "https://photobooth.fightingwind.com",
    image: "/screenshots/tourism-photobooth.png",
  },
];

interface ProjectDetail {
  highlightedToolsLabel?: string;
  highlightedTools: {
    title: string;
    description: string;
    contribution: string;
    icon: React.ReactNode;
  }[];
  designChoices: {
    title: string;
    choice: string;
    rationale: string;
  }[];
  kioskHardware?: string[];
  mediaPipeline?: {
    captureAndFormat: string;
    emailDelivery: string;
  };
  steps: {
    title: string;
    description: string;
    image: string;
  }[];
  agentCapabilities?: string[];
  agentCapabilitiesLabel?: string;
  systemIntegrations?: {
    label?: string;
    verificationLabel?: string;
    verification: string;
    dispatchLabel?: string;
    dispatch: string;
  };
  techStack?: {
    languages: string;
    frontend: string;
    databases: string;
    aiOrSystems: string;
    aiOrSystemsLabel?: string;
  };
}

const projectDetailsRegistry: Record<string, ProjectDetail> = {
  "auto-negotiator": {
    highlightedToolsLabel: "Live LLM Reasoning & Real-World Grounding",
    highlightedTools: [
      {
        title: "Gemini via an Enforced Thought/Tool-Call Envelope",
        description:
          "The `openai` SDK is pointed at Gemini's own OpenAI-compatible endpoint rather than a Google-native SDK, and every turn is forced through a {\"thought\", \"tool_call\"} JSON envelope regardless of provider — one retry on schema failure, then a visible error, never a silent hang.",
        contribution:
          "Keeps the Agent Console's reasoning trace identical no matter which LLM Engine is configured, and means the live demo can never lock up on an infinite retry loop.",
        icon: <Sparkles className="w-5 h-5 text-[#2D6A2D]" />,
      },
      {
        title: "Haversine Donor Ranking Over Real MRT Coordinates",
        description:
          "Every ClickShop site is pinned to a real Eastern Singapore MRT station's lat/long; the same haversine distance calc backs the donor-ranking query, the courier ETA narration, and the Leaflet map — one source of truth instead of a cosmetic map plus a hand-assigned distance tier.",
        contribution:
          "Lets donor selection, dispatch ETAs, and the map view all agree with each other by construction, since they read the same coordinates.",
        icon: <Layers className="w-5 h-5 text-[#2D6A2D]" />,
      },
      {
        title: "Mocked Toolbelt, Genuinely Live Reasoning",
        description:
          "Email/Calendar/Logistics/ZPL/ITSM are in-process mocks backed by Neon Postgres — no real Gmail OAuth or courier API — but the LLM calls behind every drafted email and decision are real, live inference against current DB state, never a scripted walkthrough.",
        contribution:
          "Avoids OAuth/secrets surface area in a public repo while keeping the one thing worth proving — the agent's actual reasoning — completely un-staged.",
        icon: <Database className="w-5 h-5 text-[#2D6A2D]" />,
      },
    ],
    designChoices: [
      {
        title: "Node.js/TypeScript Over the Original Python/Flask Draft",
        choice:
          "Rebuilt the backend in Node/TypeScript once the final architecture (stateless Vercel functions, no background thread, no ML libraries) no longer had any actual reason to be Python.",
        rationale:
          "The Python choice was carried over from an early draft that assumed self-hosted models — once that assumption was dropped, Node.js was simply the more idiomatic fit for Vercel's serverless functions and the JS-first dependency set.",
      },
      {
        title: "Mocked Integrations, Never a Scripted Demo",
        choice:
          "Faked the Email/Calendar/Logistics/ZPL/ITSM APIs entirely in-process instead of wiring up real Gmail OAuth or a courier API, but routed the operator's manager-reply presets and free-text replies through the exact same parsing code path as the agent's own tool calls.",
        rationale:
          "A real Gmail integration would only make the demo look more convincing at the cost of OAuth/secrets in a public repo — the one thing a reviewer can actually verify is that the reasoning isn't canned, which this preserves.",
      },
      {
        title: "Uber-Dispatch Donor Ranking, No Site-Type Allowlist",
        choice:
          "Every site is a ranking candidate regardless of its XL/L/M/S type; eligibility is just 'would donating this leave the donor below its own operating threshold' filtered by haversine proximity.",
        rationale:
          "Hardcoding 'small stores can't donate' invites brittle edge cases — in practice S/XL sites rarely rank highly since their own threshold leaves little surplus room, so the same effect falls out of the eligibility math without a hand-maintained rule.",
      },
    ],
    agentCapabilities: [
      "Inventory API — real-time stock, 7-day depletion trend, and haversine-ranked donor candidates",
      "Email API — drafts/reads the negotiation thread as rows in a mocked, Postgres-backed mailbox",
      "Calendar API — checks seeded promo/foot-traffic events to verify a manager's Concession claim",
      "Logistics API — dispatches a synthetic courier (Lalamove/GrabExpress) with a distance-based ETA",
      "ZPL Provisioning API — generates the printer reconfiguration payload for the receiving site",
      "ITSM API — opens and closes one ticket per Transfer for the full negotiation lifecycle",
    ],
    agentCapabilitiesLabel: "Agent Toolbelt (lib/tools/)",
    systemIntegrations: {
      label: "Concession, Firmness & Escalation Protocols",
      verificationLabel: "Concession & Firmness",
      verification:
        "If a manager cites a specific conflict (e.g. a promo), the agent calls the mocked Calendar API to verify it before conceding and re-ranking donors. If the manager refuses without evidence, the agent cites hard numbers from the Inventory API instead (\"your threshold is 3, you're at 6\") and sends a Firmness-lock email.",
      dispatchLabel: "Escalation & Dispatch",
      dispatch:
        "Two rejections on the same Transfer trigger 'absolute deadlock,' escalating to a Regional Director persona in the console. Once a donor agrees, the agent opens an ITSM ticket, dispatches a courier, pushes a ZPL config to the receiving printer, and closes the ticket — one ticket per Transfer, start to finish.",
    },
    steps: [
      {
        title: "Eastern Singapore ClickShop Map View",
        description:
          "A live Leaflet/OSM map plots all 13 stores (XL/L/M/S) at their real MRT coordinates, alongside the Transfers list and Network Status panel showing live stock vs. threshold.",
        image: "/screenshots/auto-negotiator/1_dashboard.png",
      },
      {
        title: "Simulating a Device Shortage",
        description:
          "The Simulate Incident control drops a chosen site's scanner or printer count below its operating threshold, firing the inline monitor check that kicks off the agent loop.",
        image: "/screenshots/auto-negotiator/2_negotiation_start.png",
      },
      {
        title: "Agent Decision Timeline",
        description:
          "The Agent Timeline panel exposes the live {\"thought\", \"tool_call\"} envelope turn-by-turn — here the agent reasons through selecting the top-ranked donor before drafting the request email.",
        image: "/screenshots/auto-negotiator/3_agent_timeline.png",
      },
      {
        title: "Firmness Protocol Lock",
        description:
          "Having verified the manager's promotion claim was false and found a 21-unit surplus, the agent applies the Firmness Protocol and locks the transfer with a numbers-backed reply.",
        image: "/screenshots/auto-negotiator/4_concession_protocol.png",
      },
    ],
    techStack: {
      languages: "TypeScript, JavaScript, HTML, CSS",
      frontend: "Vanilla JS, Leaflet Map, CSS Tokens, Base UI",
      databases: "Neon Serverless Postgres (Sites, Transfers, Messages, Tickets)",
      aiOrSystems: "Gemini 3.5 Flash (OpenAI-compatible endpoint), Enforced Thought/Tool-Call Envelope, Vercel Serverless Functions",
      aiOrSystemsLabel: "Agent Tool Use & APIs",
    },
  },
  "tourism-photobooth": {
    highlightedTools: [
      {
        title: "Gemini 2.5 Flash — Weather-Aware Poem Generation",
        description:
          "The Poem Receipt mode feeds an emoji theme picker, the destination city, and live Open-Meteo weather for that city into one prompt; Gemini returns a haiku (5-7-5, ~50% of sessions) or a short free-verse poem.",
        contribution:
          "Makes every printed receipt genuinely different per session instead of a templated fill-in-the-blank, while staying fast enough for a walk-up kiosk.",
        icon: <Sparkles className="w-5 h-5 text-[#2D6A2D]" />,
      },
      {
        title: "Satori — Boarding Pass Rendering Without a Browser",
        description:
          "The shared Boarding Pass artifact (flight number, route, seat, gate, QR code, Code 128 barcode) is rendered server-side as HTML/CSS via Satori + resvg straight to a PNG — no headless browser at request time.",
        contribution:
          "Keeps boarding-pass generation fast and stateless on serverless functions, since spinning up a real browser per request would be far too slow for a live kiosk queue.",
        icon: <Terminal className="w-5 h-5 text-[#2D6A2D]" />,
      },
      {
        title: "Cloudinary + Upstash Redis Session Pipeline",
        description:
          "All four modes' media (strip PNGs, 15s/10s videos, GIFs) go through Cloudinary; session state and a 7-day TTL live in Upstash Redis, so a daily cron purges both in lockstep once a session expires.",
        contribution:
          "One storage/session backbone serves four very different capture types — photos, canvas video, webcam video, generated poem — without mode-specific plumbing.",
        icon: <Database className="w-5 h-5 text-[#2D6A2D]" />,
      },
    ],
    designChoices: [
      {
        title: "Shared Boarding Pass Spine Across 4 Modes",
        choice:
          "Every mode — Photo Strip, Breath Fog, Video Call, Poem Receipt — produces the same Boarding Pass as a constant output, with only the mode-specific artifact layered on top.",
        rationale:
          "Keeps the UWU Airwaves identity consistent no matter which mode a guest picks, and gives every session the same scannable Session ID and retrieval mechanism instead of four bespoke output documents.",
      },
      {
        title:
          "Barcode Encodes the Full Retrieval URL, Not Just the Session ID",
        choice:
          "The boarding pass's Code 128 barcode encodes the entire retrieval-page URL (e.g. .../session/UWU-2847-SIN-TYO) instead of the bare session ID.",
        rationale:
          "A URL opens directly from a phone camera's viewfinder with zero typing; a bare session ID string gives no such affordance and would need to be typed in by hand.",
      },
      {
        title: "Mode Selection Comes Before Check-In",
        choice:
          "The first screen a guest sees is 'pick your adventure' — four large tiles for the four experience modes — before any destination or name is entered.",
        rationale:
          "The mode choice is the exciting part and the strongest hook at a kiosk; asking for a destination and name first would put a boring form between the guest and the reason they walked up.",
      },
    ],
    kioskHardware: [
      "Connected webcam for Photo Strip, Breath Fog, and Video Call capture via the browser getUserMedia API",
      "Touch-screen kiosk display running the full Next.js app locally at events",
      "Zebra ZD620 thermal printer driven by a Next.js API route that generates ZPL — functional only in the local/event deployment, not the public Vercel demo",
      "No barcode scanner needed: the boarding pass's Code 128 barcode encodes a full URL, openable straight from any phone camera",
    ],
    mediaPipeline: {
      captureAndFormat:
        "Photo Strip composites 4 frames vertically inside the aircraft-window mask; Breath Fog and Video Call capture a canvas/webcam recording. All media uploads to Cloudinary, chosen specifically because Vercel Blob (the original choice) has no video transcoding.",
      emailDelivery:
        "Digital Copy delivery via Resend, styled as a UWU Airwaves confirmation email with the strip/boarding-pass PNGs and an animated GIF attached; sessions and their Cloudinary assets are purged after a 7-day Redis TTL via a daily cron.",
    },
    steps: [
      {
        title: "Pick Your Adventure — Four Experience Modes",
        description:
          "The entry screen: four touch tiles for Photo Strip, Breath Fog, Video Call, and Poem Receipt, each producing a different primary artifact but sharing one boarding pass.",
        image: "/screenshots/tourism-photobooth/1_home.png",
      },
      {
        title: "Destination Check-In",
        description:
          "Airport autocomplete over ~500 major international airports resolves a typed city, country, or IATA code; origin is always fixed as Singapore (SIN). Name and email (with one-tap domain suffixes) are optional.",
        image: "/screenshots/tourism-photobooth/2_destination.png",
      },
      {
        title: "Poem Receipt: Emoji Theme Picker",
        description:
          "Guests tap travel themes — Food, Culture, Scenery, Music, Shopping, Rest, Adventure, Magic — that, combined with live destination weather, drive the Gemini prompt.",
        image: "/screenshots/tourism-photobooth/3_poem_theme.png",
      },
      {
        title: "Showcase: Real-Time Poem + Boarding Pass",
        description:
          "The actual Gemini-generated poem on a torn-edge thermal receipt, alongside the procedurally generated boarding pass — flight number, seat, gate, QR code, and barcode — all produced live for this session.",
        image: "/screenshots/tourism-photobooth/4_showcase.png",
      },
    ],
    techStack: {
      languages: "TypeScript, React",
      frontend:
        "Next.js App Router, Tailwind CSS, Satori/resvg (boarding pass rendering)",
      databases: "Upstash Redis (session/TTL), Cloudinary (media storage)",
      aiOrSystems: "Gemini 2.5 Flash, Resend (email), Zebra ZD620 ZPL printing",
      aiOrSystemsLabel: "Generative AI & Integrations",
    },
  },
  buslari: {
    highlightedToolsLabel: "Key Integrations & Tools",
    highlightedTools: [
      {
        title: "LTA DataMall Bus Arrival & BusStops APIs",
        description:
          "Polls Singapore's LTA DataMall Bus Arrival (v3) and BusStops endpoints per configured stop, proxied server-side so the API key never reaches the browser.",
        contribution:
          "Feeds real-time arrival minutes into the board, with automatic stop-name lookup so adding a new bus stop code renders correctly without manual entry.",
        icon: <Database className="w-5 h-5 text-[#2D6A2D]" />,
      },
      {
        title: "Adaptive Arrival Cache",
        description:
          "A per-stop in-memory cache whose TTL shrinks as the soonest bus gets closer — 20s when a bus is imminent, up to 2 minutes when nothing is due soon.",
        contribution:
          "Keeps the board accurate as buses approach while staying well under LTA's rate limits — accuracy where it matters, patience where it doesn't.",
        icon: <Terminal className="w-5 h-5 text-[#2D6A2D]" />,
      },
      {
        title: "Telegram Bot + NextAuth/Drizzle/Neon",
        description:
          "A linked Telegram bot posts straight into a board's Messages panel; NextAuth (Google/GitHub) plus Drizzle ORM on Neon Postgres gives every signed-in user their own persisted board.",
        contribution:
          "Turns the board into a two-way personal message board you can update from your phone, without ever touching the admin panel.",
        icon: <Mail className="w-5 h-5 text-[#2D6A2D]" />,
      },
    ],
    designChoices: [
      {
        title: "Two-Layer Split-Flap Animation",
        choice:
          "Each character tile is built from two independently shaded, clip-path-split halves with a 0.1s rotateX flip and a deliberate offset between the halves.",
        rationale:
          "A single flat flip looked too clean and digital — splitting the halves with gradient shading per half mimics the physical seam and worn imperfection of a real airport/train Solari board.",
      },
      {
        title: "Adaptive Cache Over Fixed Polling",
        choice:
          "Cache TTL scales with how soon the next bus is arriving instead of polling on a flat interval.",
        rationale:
          "LTA DataMall rate-limits aggressively; a flat poll wastes quota on a bus 20 minutes out while a bus 1 minute out needs to be fresh. Adaptive TTL puts the budget where accuracy actually matters.",
      },
      {
        title: "Home Kiosk, Not a Moving Product",
        choice:
          "No geolocation or nearby-stop detection — bus stops are entered once by hand and renamed in the admin panel, on the assumption the board lives at a fixed physical location.",
        rationale:
          "Bus Lari (a play on 'bus' and 'Solari') is built to run on a repurposed old iPad mounted at home, not travel with you — so it optimizes for a stable, always-on display, with Telegram messaging and Prayer/Holiday panels layered on so it earns its place on the wall beyond just bus times.",
      },
    ],
    agentCapabilities: [
      "LTA DataMall Bus Arrival (v3) API for live arrival timings per stop and service",
      "LTA DataMall BusStops API for automatic stop-name lookup on add",
      "Telegram Bot API webhook, linked per-user via a short-lived code",
      "NextAuth (Google/GitHub) with Drizzle adapter for multi-user, database-backed sessions",
    ],
    agentCapabilitiesLabel: "System Integrations & APIs",
    systemIntegrations: {
      label: "Telegram Linking & Message Flow",
      verificationLabel: "Account Linking",
      verification:
        "A user generates a short-lived link code in the admin panel and sends `/start <code>` to their Telegram bot; the webhook matches the code, links the chat ID to their account, and the code is consumed.",
      dispatchLabel: "Message Delivery",
      dispatch:
        "From then on, any message sent to the bot is appended to that user's Messages panel — reviewable and removable from the same Custom Messages list the admin page manages directly.",
    },
    steps: [
      {
        title: "Live Multi-Stop Bus Board",
        description:
          "Three bus stops (Downstairs, Main Road, Opposite) grouped and flipping in real time, with a blinking LED-style marker simulating the physical board's arrival indicator.",
        image: "/screenshots/buslari/1_board.png",
      },
      {
        title: "Admin: Bus Stops, Panels & Board Settings",
        description:
          "Add and reorder bus stops and panels, tune flip animation speed and page duration, plus a per-device animation override for older tablets that can't render the full-speed flip smoothly.",
        image: "/screenshots/buslari/2_admin.png",
      },
      {
        title: "Custom Messages & Telegram Linking",
        description:
          "A linked Telegram bot lets you text your own board — messages land in the Custom Messages queue here, reviewable and removable from the same panel.",
        image: "/screenshots/buslari/3_telegram.png",
      },
      {
        title: "Messages Panel on the Board",
        description:
          "The Messages panel rotates through custom quotes and Telegram-submitted notes on the physical display, alongside the Bus, Prayer, and Holiday panels.",
        image: "/screenshots/buslari/4_messages.png",
      },
    ],
    techStack: {
      languages: "JavaScript, SQL, CSS",
      frontend: "Next.js App Router, NextAuth, Vanilla CSS Animations",
      databases: "Neon Postgres (serverless), Drizzle ORM",
      aiOrSystems: "LTA DataMall API, Telegram Bot API, Google/GitHub OAuth",
      aiOrSystemsLabel: "Integrations & APIs",
    },
  },
};

function ProjectCard({
  project,
  onClick,
}: {
  project: (typeof projects)[0];
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`relative bg-white rounded-2xl p-7 border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer group flex flex-col justify-between h-full ${
        project.highlight ? "border-[#2D6A2D] shadow-sm" : "border-[#DDD8CC]"
      }`}
    >
      <div>
        {project.highlight && (
          <div className="absolute -top-3 left-6 z-10">
            <span className="bg-[#4CAF50] text-white text-xs font-semibold px-3 py-1 rounded-full">
              Featured
            </span>
          </div>
        )}

        {project.image && (
          <div className="relative z-0 -mx-7 -mt-7 mb-5 aspect-video overflow-hidden rounded-t-2xl border-b border-[#DDD8CC] bg-[#FAF8F4]">
            <Image
              src={project.image}
              alt={`${project.title} screenshot`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-top"
            />
          </div>
        )}

        <div className="flex items-start justify-between mb-4">
          <span className="text-xs font-semibold tracking-wider text-[#4CAF50] uppercase">
            {project.category}
          </span>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs text-white bg-[#2D6A2D] hover:bg-[#245424] transition-colors px-2.5 py-1 rounded-full"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                className="text-white"
              >
                <path
                  d="M2 8L8 2M8 2H3.5M8 2V6.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              View live
            </a>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-[#556B55] bg-[#FAF8F4] border border-[#DDD8CC] px-2.5 py-1 rounded-full">
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                className="text-[#556B55]"
              >
                <rect
                  x="1"
                  y="4"
                  width="8"
                  height="6"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M3 4V3a2 2 0 0 1 4 0v1"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
              Case study
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-[#1A2E1A] mb-2 group-hover:text-[#2D6A2D] transition-colors">
          {project.title}
        </h3>

        <p className="text-[#556B55] text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        <p className="text-[#556B55] text-sm leading-relaxed mb-5">
          <span className="text-[#1A2E1A] font-medium">Goal: </span>
          {project.goal}
        </p>
      </div>

      <div>
        <div className="bg-[#FAF8F4] rounded-xl px-4 py-3 mb-5 border border-[#DDD8CC]">
          <p className="text-xs text-[#2D6A2D] font-semibold leading-relaxed">
            {project.metric}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs bg-[#F0EBE1] text-[#556B55] px-2.5 py-1 rounded-md font-medium"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof projects)[0];
  onClose: () => void;
}) {
  const details = projectDetailsRegistry[project.id];

  useEffect(() => {
    // `scrollbar-gutter: stable` (globals.css) only reserves space for the
    // auto/scroll case — overflow: hidden drops the gutter reservation
    // entirely per spec, so the removed scrollbar's width is compensated
    // here directly to prevent the page from shifting horizontally.
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[#1A2E1A]/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="relative bg-[#FAF8F4] w-full max-w-4xl max-h-[85vh] md:max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-[#DDD8CC]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#DDD8CC] bg-white">
          <div>
            <span className="text-xs font-semibold tracking-wider text-[#4CAF50] uppercase">
              {project.category}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-[#1A2E1A]">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F0EBE1] text-[#556B55] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8 flex-1">
          {/* Tech Badges */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs bg-[#F0EBE1] text-[#556B55] px-2.5 py-1.5 rounded-md font-medium"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border border-[#DDD8CC]">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#2D6A2D] mb-1.5 flex items-center gap-1.5">
                <Cpu className="w-4 h-4" /> Project Goal
              </h3>
              <p className="text-sm text-[#556B55] leading-relaxed">
                {project.goal}
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#2D6A2D]/30 bg-[#FAFBF9]">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#2D6A2D] mb-1.5 flex items-center gap-1.5">
                <Layers className="w-4 h-4" /> Impact & Metric
              </h3>
              <p className="text-sm text-[#2D6A2D] font-medium leading-relaxed">
                {project.metric}
              </p>
            </div>
          </div>

          {details ? (
            <>
              {/* Architecture Diagram */}
              <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 md:p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-[#1A2E1A] mb-5 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4CAF50]" />
                  System Architecture & Data Flow
                </h3>

                {project.id === "tourism-photobooth" && (
                  <div className="relative p-4 bg-[#FAF8F4] border border-[#DDD8CC] rounded-lg overflow-x-auto min-w-[500px]">
                    <div className="flex items-center justify-between text-center relative z-10">
                      {/* Guest Capture */}
                      <div className="w-[140px] flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-[#E0EBE0] border border-[#2D6A2D] flex items-center justify-center text-[#2D6A2D] font-bold mb-2">
                          1
                        </div>
                        <span className="text-xs font-bold text-[#1A2E1A]">
                          Kiosk Capture
                        </span>
                        <span className="text-[10px] text-[#556B55] mt-1 leading-snug">
                          4 Experience Modes
                          <br />
                          Webcam / Canvas / Emoji Picker
                        </span>
                      </div>

                      {/* Flow Line 1 */}
                      <div className="flex-1 h-[2px] bg-[#DDD8CC] mx-2 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t-2 border-r-2 border-[#556B55] rotate-45" />
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] text-[#556B55] whitespace-nowrap bg-[#FAF8F4] px-1 font-medium">
                          Upload / Prompt
                        </span>
                      </div>

                      {/* Next.js API Routes */}
                      <div className="w-[150px] flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-[#E0EBE0] border border-[#2D6A2D] flex items-center justify-center text-[#2D6A2D] font-bold mb-2">
                          2
                        </div>
                        <span className="text-xs font-bold text-[#1A2E1A]">
                          Next.js API Routes
                        </span>
                        <span className="text-[10px] text-[#556B55] mt-1 leading-snug">
                          Gemini Poem · Satori Boarding Pass
                          <br />
                          Redis Session (7-day TTL)
                        </span>
                      </div>

                      {/* Flow Line 2 */}
                      <div className="flex-1 h-[2px] bg-[#DDD8CC] mx-2 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t-2 border-r-2 border-[#556B55] rotate-45" />
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] text-[#556B55] whitespace-nowrap bg-[#FAF8F4] px-1 font-medium">
                          Store & Output
                        </span>
                      </div>

                      {/* Outputs */}
                      <div className="w-[140px] flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-[#E0EBE0] border border-[#2D6A2D] flex items-center justify-center text-[#2D6A2D] font-bold mb-2">
                          3
                        </div>
                        <span className="text-xs font-bold text-[#1A2E1A]">
                          Outputs
                        </span>
                        <span className="text-[10px] text-[#556B55] mt-1 leading-snug">
                          Cloudinary Media
                          <br />
                          Zebra ZPL Print & Resend Email
                        </span>
                      </div>
                    </div>

                    {/* Subagent / Cloud connections */}
                    <div className="grid grid-cols-3 mt-6 pt-5 border-t border-[#EAE6DB] text-center">
                      <div className="text-[10px] text-[#556B55] px-2 border-r border-[#EAE6DB]">
                        <span className="font-semibold block text-[#1A2E1A]">
                          Weather-Aware Poem
                        </span>
                        Gemini 2.5 Flash generates a haiku or free-verse poem
                        live from emoji themes + destination weather.
                      </div>
                      <div className="text-[10px] text-[#556B55] px-2 border-r border-[#EAE6DB]">
                        <span className="font-semibold block text-[#1A2E1A]">
                          Shared Boarding Pass
                        </span>
                        Every mode renders the same Satori boarding pass —
                        procedurally generated flight, seat, gate, QR code, and
                        barcode.
                      </div>
                      <div className="text-[10px] text-[#556B55] px-2">
                        <span className="font-semibold block text-[#1A2E1A]">
                          7-Day Session Lifecycle
                        </span>
                        Upstash Redis TTL and a daily cron keep Redis and
                        Cloudinary assets in sync, purging both together.
                      </div>
                    </div>
                  </div>
                )}

                {project.id === "auto-negotiator" && (
                  <div className="relative p-4 bg-[#FAF8F4] border border-[#DDD8CC] rounded-lg overflow-x-auto min-w-[500px]">
                    <div className="flex items-center justify-between text-center relative z-10">
                      {/* Receiver Site */}
                      <div className="w-[140px] flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-[#E0EBE0] border border-[#2D6A2D] flex items-center justify-center text-[#2D6A2D] font-bold mb-2">
                          1
                        </div>
                        <span className="text-xs font-bold text-[#1A2E1A]">
                          Receiver Site
                        </span>
                        <span className="text-[10px] text-[#556B55] mt-1 leading-snug">
                          Shortage Detected
                          <br />
                          (e.g., Bedok L store)
                        </span>
                      </div>

                      {/* Flow Line 1 */}
                      <div className="flex-1 h-[2px] bg-[#DDD8CC] mx-2 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t-2 border-r-2 border-[#556B55] rotate-45" />
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] text-[#556B55] whitespace-nowrap bg-[#FAF8F4] px-1 font-medium">
                          Trigger Transfer
                        </span>
                      </div>

                      {/* AI Agent Loop */}
                      <div className="w-[150px] flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-[#E0EBE0] border border-[#2D6A2D] flex items-center justify-center text-[#2D6A2D] font-bold mb-2">
                          2
                        </div>
                        <span className="text-xs font-bold text-[#1A2E1A]">
                          AI Agent Loop
                        </span>
                        <span className="text-[10px] text-[#556B55] mt-1 leading-snug">
                          Query APIs & Reroute
                          <br />
                          via Concession Protocol
                        </span>
                      </div>

                      {/* Flow Line 2 */}
                      <div className="flex-1 h-[2px] bg-[#DDD8CC] mx-2 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t-2 border-r-2 border-[#556B55] rotate-45" />
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] text-[#556B55] whitespace-nowrap bg-[#FAF8F4] px-1 font-medium">
                          Dispatch Courier
                        </span>
                      </div>

                      {/* Transfer Outcome */}
                      <div className="w-[140px] flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-[#E0EBE0] border border-[#2D6A2D] flex items-center justify-center text-[#2D6A2D] font-bold mb-2">
                          3
                        </div>
                        <span className="text-xs font-bold text-[#1A2E1A]">
                          Asset Transferred
                        </span>
                        <span className="text-[10px] text-[#556B55] mt-1 leading-snug">
                          Stock DB Updated
                          <br />& Email Proof Sent
                        </span>
                      </div>
                    </div>

                    {/* Subagent / Cloud connections */}
                    <div className="grid grid-cols-3 mt-6 pt-5 border-t border-[#EAE6DB] text-center">
                      <div className="text-[10px] text-[#556B55] px-2 border-r border-[#EAE6DB]">
                        <span className="font-semibold block text-[#1A2E1A]">
                          Mocked Calendar & Inventory APIs
                        </span>
                        Checks seeded promo events and live stock metrics in
                        Neon Postgres to verify if assets can actually be spared.
                      </div>
                      <div className="text-[10px] text-[#556B55] px-2 border-r border-[#EAE6DB]">
                        <span className="font-semibold block text-[#1A2E1A]">
                          Concession Protocol
                        </span>
                        If donor manager replies citing a conflict, agent
                        verifies it and falls back to the next-ranked donor.
                      </div>
                      <div className="text-[10px] text-[#556B55] px-2">
                        <span className="font-semibold block text-[#1A2E1A]">
                          Distance & Stock Routing
                        </span>
                        Prioritizes donor search based on distance (haversine
                        distance) and stock levels.
                      </div>
                    </div>
                  </div>
                )}

                {project.id === "buslari" && (
                  <div className="relative p-4 bg-[#FAF8F4] border border-[#DDD8CC] rounded-lg overflow-x-auto min-w-[500px]">
                    <div className="flex items-center justify-between text-center relative z-10">
                      {/* Kiosk Display */}
                      <div className="w-[140px] flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-[#E0EBE0] border border-[#2D6A2D] flex items-center justify-center text-[#2D6A2D] font-bold mb-2">
                          1
                        </div>
                        <span className="text-xs font-bold text-[#1A2E1A]">
                          Home Kiosk Display
                        </span>
                        <span className="text-[10px] text-[#556B55] mt-1 leading-snug">
                          Repurposed iPad
                          <br />
                          Split-Flap Board UI
                        </span>
                      </div>

                      {/* Flow Line 1 */}
                      <div className="flex-1 h-[2px] bg-[#DDD8CC] mx-2 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t-2 border-r-2 border-[#556B55] rotate-45" />
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] text-[#556B55] whitespace-nowrap bg-[#FAF8F4] px-1 font-medium">
                          Poll Board Data
                        </span>
                      </div>

                      {/* Next.js Server */}
                      <div className="w-[150px] flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-[#E0EBE0] border border-[#2D6A2D] flex items-center justify-center text-[#2D6A2D] font-bold mb-2">
                          2
                        </div>
                        <span className="text-xs font-bold text-[#1A2E1A]">
                          Next.js Route Handlers
                        </span>
                        <span className="text-[10px] text-[#556B55] mt-1 leading-snug">
                          Adaptive LTA Cache
                          <br />
                          Drizzle / Neon Postgres
                        </span>
                      </div>

                      {/* Flow Line 2 */}
                      <div className="flex-1 h-[2px] bg-[#DDD8CC] mx-2 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t-2 border-r-2 border-[#556B55] rotate-45" />
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] text-[#556B55] whitespace-nowrap bg-[#FAF8F4] px-1 font-medium">
                          Proxy & Persist
                        </span>
                      </div>

                      {/* External Services */}
                      <div className="w-[140px] flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-[#E0EBE0] border border-[#2D6A2D] flex items-center justify-center text-[#2D6A2D] font-bold mb-2">
                          3
                        </div>
                        <span className="text-xs font-bold text-[#1A2E1A]">
                          External Services
                        </span>
                        <span className="text-[10px] text-[#556B55] mt-1 leading-snug">
                          LTA DataMall API
                          <br />
                          Telegram Bot API
                        </span>
                      </div>
                    </div>

                    {/* Subagent / Cloud connections */}
                    <div className="grid grid-cols-3 mt-6 pt-5 border-t border-[#EAE6DB] text-center">
                      <div className="text-[10px] text-[#556B55] px-2 border-r border-[#EAE6DB]">
                        <span className="font-semibold block text-[#1A2E1A]">
                          Adaptive LTA Cache
                        </span>
                        Bus Arrival responses are cached 20s-2min per stop based
                        on the soonest arrival, keeping the board fresh without
                        exceeding LTA's rate limits.
                      </div>
                      <div className="text-[10px] text-[#556B55] px-2 border-r border-[#EAE6DB]">
                        <span className="font-semibold block text-[#1A2E1A]">
                          Telegram Webhook
                        </span>
                        Incoming bot messages are matched to a linked account
                        via chat ID and appended straight to that user's
                        Messages panel.
                      </div>
                      <div className="text-[10px] text-[#556B55] px-2">
                        <span className="font-semibold block text-[#1A2E1A]">
                          Multi-User Boards
                        </span>
                        NextAuth (Google/GitHub) plus Drizzle/Neon gives each
                        signed-in user their own persisted board, bus stops, and
                        settings.
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Use of Multimodal Generative AI */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-[#1A2E1A] flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4CAF50]" />
                  {details.highlightedToolsLabel ||
                    "Use of Multimodal Generative AI"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {details.highlightedTools.map((tool, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-[#DDD8CC] rounded-xl p-5 flex flex-col justify-between"
                    >
                      <div>
                        <div className="p-2 rounded-lg bg-[#FAF8F4] border border-[#DDD8CC] w-fit mb-3">
                          {tool.icon}
                        </div>
                        <h4 className="font-bold text-[#1A2E1A] text-sm mb-1.5">
                          {tool.title}
                        </h4>
                        <p className="text-xs text-[#556B55] leading-relaxed mb-3">
                          {tool.description}
                        </p>
                      </div>
                      <div className="border-t border-[#EAE6DB] pt-3 text-[11px] text-[#2D6A2D]">
                        <span className="font-semibold block uppercase tracking-wider text-[9px] mb-1">
                          Contribution:
                        </span>
                        {tool.contribution}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hardware / Agent Capabilities & Pipelines */}
              {(details.kioskHardware ||
                details.agentCapabilities ||
                details.mediaPipeline ||
                details.systemIntegrations) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column: Kiosk Hardware OR Agent Capabilities */}
                  {details.kioskHardware ? (
                    <div className="bg-white border border-[#DDD8CC] rounded-xl p-5">
                      <h3 className="text-sm font-semibold text-[#1A2E1A] mb-4 flex items-center gap-1.5">
                        <Printer className="w-4 h-4 text-[#2D6A2D]" />
                        Physical Kiosk Integration
                      </h3>
                      <ul className="space-y-2.5">
                        {details.kioskHardware.map((item, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-[#556B55] flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] mt-1.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : details.agentCapabilities ? (
                    <div className="bg-white border border-[#DDD8CC] rounded-xl p-5">
                      <h3 className="text-sm font-semibold text-[#1A2E1A] mb-4 flex items-center gap-1.5">
                        <Terminal className="w-4 h-4 text-[#2D6A2D]" />
                        {details.agentCapabilitiesLabel ||
                          "Agent Tool Integration & APIs"}
                      </h3>
                      <ul className="space-y-2.5">
                        {details.agentCapabilities.map((item, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-[#556B55] flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] mt-1.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {/* Right Column: Media Pipeline OR System Integrations */}
                  {details.mediaPipeline ? (
                    <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold text-[#1A2E1A] mb-2 flex items-center gap-1.5">
                          <Mail className="w-4 h-4 text-[#2D6A2D]" />
                          Processing & Delivery
                        </h3>
                        <p className="text-xs text-[#556B55] leading-relaxed">
                          <span className="font-bold text-[#1A2E1A]">
                            Media Format:{" "}
                          </span>
                          {details.mediaPipeline.captureAndFormat}
                        </p>
                      </div>
                      <div className="border-t border-[#EAE6DB] pt-3">
                        <p className="text-xs text-[#556B55] leading-relaxed">
                          <span className="font-bold text-[#1A2E1A]">
                            Email & Retrieval:{" "}
                          </span>
                          {details.mediaPipeline.emailDelivery}
                        </p>
                      </div>
                    </div>
                  ) : details.systemIntegrations ? (
                    <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold text-[#1A2E1A] mb-2 flex items-center gap-1.5">
                          <Mail className="w-4 h-4 text-[#2D6A2D]" />
                          {details.systemIntegrations.label ||
                            "Automated Verification & Proofs"}
                        </h3>
                        <p className="text-xs text-[#556B55] leading-relaxed">
                          <span className="font-bold text-[#1A2E1A]">
                            {details.systemIntegrations.verificationLabel ||
                              "Verification"}
                            :{" "}
                          </span>
                          {details.systemIntegrations.verification}
                        </p>
                      </div>
                      <div className="border-t border-[#EAE6DB] pt-3">
                        <p className="text-xs text-[#556B55] leading-relaxed">
                          <span className="font-bold text-[#1A2E1A]">
                            {details.systemIntegrations.dispatchLabel ||
                              "Proof Delivery"}
                            :{" "}
                          </span>
                          {details.systemIntegrations.dispatch}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}

              {/* Key Design Understandings */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-[#1A2E1A] flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4CAF50]" />
                  Key Design Understandings & Choices
                </h3>
                <div className="border border-[#DDD8CC] rounded-xl overflow-hidden bg-white">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#FAF8F4] border-b border-[#DDD8CC] font-bold text-[#1A2E1A]">
                        <th className="p-3">Design Decision</th>
                        <th className="p-3">Chosen Implementation</th>
                        <th className="p-3">Design Rationale & Project Goal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DDD8CC] text-[#556B55]">
                      {details.designChoices.map((choice, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-[#FAF8F4]/50 transition-colors"
                        >
                          <td className="p-3 font-semibold text-[#1A2E1A]">
                            {choice.title}
                          </td>
                          <td className="p-3">{choice.choice}</td>
                          <td className="p-3 leading-relaxed">
                            {choice.rationale}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Screenshots & Interactive Gallery */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-[#1A2E1A] flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4CAF50]" />
                  Project Screenshots & Key Interactions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {details.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-[#DDD8CC] rounded-xl overflow-hidden shadow-sm flex flex-col justify-between"
                    >
                      <div className="relative aspect-video w-full bg-[#FAF8F4] border-b border-[#DDD8CC]">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-start">
                        <h4 className="font-bold text-[#1A2E1A] text-xs mb-1">
                          {step.title}
                        </h4>
                        <p className="text-[11px] text-[#556B55] leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Stack Grid */}
              <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 md:p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-[#1A2E1A] mb-4 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4CAF50]" />
                  Technology Stack
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
                  <div className="p-3 bg-[#FAF8F4] border border-[#DDD8CC] rounded-lg">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D6A2D] block mb-1">
                      Languages
                    </span>
                    <div className="flex flex-wrap gap-1 text-[11px] text-[#556B55]">
                      {details.techStack?.languages ||
                        "TypeScript, React, Node.js, Python, ZPL"}
                    </div>
                  </div>
                  <div className="p-3 bg-[#FAF8F4] border border-[#DDD8CC] rounded-lg">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D6A2D] block mb-1">
                      Frontend & Hosting
                    </span>
                    <div className="flex flex-wrap gap-1 text-[11px] text-[#556B55]">
                      {details.techStack?.frontend ||
                        "Next.js, Tailwind CSS, Vercel, Framer Motion"}
                    </div>
                  </div>
                  <div className="p-3 bg-[#FAF8F4] border border-[#DDD8CC] rounded-lg">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D6A2D] block mb-1">
                      Databases & Infrastructure
                    </span>
                    <div className="flex flex-wrap gap-1 text-[11px] text-[#556B55]">
                      {details.techStack?.databases ||
                        "Neon Postgres, Cloudinary API, SendGrid"}
                    </div>
                  </div>
                  <div className="p-3 bg-[#FAF8F4] border border-[#DDD8CC] rounded-lg">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D6A2D] block mb-1">
                      {details.techStack?.aiOrSystemsLabel || "Generative AI"}
                    </span>
                    <div className="flex flex-wrap gap-1 text-[11px] text-[#556B55]">
                      {details.techStack?.aiOrSystems ||
                        "Gemini LLM, Gemini Video (JSON Prompts), Suno AI"}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="py-12 text-center bg-white rounded-xl border border-[#DDD8CC]">
              <Info className="w-10 h-10 text-[#556B55]/50 mx-auto mb-3" />
              <h4 className="font-bold text-[#1A2E1A] mb-1">
                Detailed Case Study Coming Soon
              </h4>
              <p className="text-xs text-[#556B55] max-w-sm mx-auto leading-relaxed">
                Full structural analysis, architectural workflows, and media
                capture recordings for this project are currently in progress.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#DDD8CC] bg-white">
          <p className="text-[11px] text-[#556B55] italic">
            Press{" "}
            <kbd className="font-semibold bg-[#F0EBE1] px-1 py-0.5 rounded border border-[#DDD8CC]">
              Esc
            </kbd>{" "}
            to close.
          </p>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white bg-[#2D6A2D] hover:bg-[#245424] transition-colors px-4 py-2 rounded-full font-medium"
            >
              View Live Demo <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  return (
    <section id="projects" className="py-24 px-6 border-t border-[#DDD8CC]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14">
          <span className="text-xs font-semibold tracking-widest text-[#4CAF50] uppercase">
            Projects
          </span>
          <h2 className="text-3xl font-bold text-[#1A2E1A] mt-3">
            What I build
          </h2>
          <p className="text-[#556B55] mt-3 max-w-xl">
            Applied AI and systems work — from agentic pipelines to hardware
            integrations. Click on any card below to read the case study
            deep-dives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
