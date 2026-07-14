"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Cpu, Layers, Printer, Mail, Database, Music, Video, Sparkles, Terminal, Info, Calendar } from "lucide-react";

const projects = [
  {
    id: "auto-negotiator",
    title: "Auto Negotiator",
    category: "Agentic AI",
    tech: ["AI Agents", "Tool Use", "Email API", "Calendar API", "Python"],
    description:
      "Multi-tool AI agent orchestrating email, calendar, and records APIs to automate procurement negotiation end-to-end.",
    goal: "Eliminate manual back-and-forth on routine procurement requests through autonomous agent decision-making.",
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
    goal:
      "Replace 4-window context switching with actionable ML intelligence surfaced directly in the workflow.",
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
    goal:
      "Give facility and operations teams live visibility into asset status without requiring on-site presence.",
    metric: "Operational visibility for global facility teams across multiple sites",
    highlight: false,
    liveUrl: "https://opensesame.fightingwind.com",
    image: "/screenshots/opensesame.png",
  },
  {
    id: "buslari",
    title: "Buslari",
    category: "Web App · API",
    tech: ["LTA API", "Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    description:
      "Solari board-inspired transit dashboard integrating Singapore's Land Transport Authority (LTA) API for real-time bus arrival timings.",
    goal:
      "Build a beautiful, retro-styled solari display to show live bus arrival updates for public transit.",
    metric: "Responsive Solari animations with live bus arrival updates",
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
    goal:
      "Remove IT dependency from routine device transactions and create an auditable device lifecycle record.",
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
    goal:
      "Eliminate manual label generation errors and give ops teams remote visibility and control of all printer hardware.",
    metric:
      "95% reduction in label generation time · Global rollout across APAC and ME regions",
    highlight: false,
  },
  {
    id: "tourism-photobooth",
    title: "Tourism Photobooth",
    category: "Creative · Generative AI",
    tech: ["Generative AI", "Image Pipeline", "React", "Node", "Print API"],
    description:
      "Generative AI-powered photobooth experience themed around airline and tourism aesthetics.",
    goal:
      "Demonstrate end-to-end creative AI application — from prompt design to physical printed output.",
    metric: "Creative GenAI and Interactive Kiosk for user engagement and content creation.",
    highlight: false,
    liveUrl: "https://photobooth.fightingwind.com",
    image: "/screenshots/tourism-photobooth.png",
  },
];

interface ProjectDetail {
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
  systemIntegrations?: {
    verification: string;
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
    highlightedTools: [
      {
        title: "Google Calendar API",
        description: "Checks local store manager calendar events to verify conflicting schedules like promotions or audits.",
        contribution: "Enables the agent to confirm manager claims about conflicts and perform automated concessions without human coordinator overhead.",
        icon: <Calendar className="w-5 h-5 text-[#2D6A2D]" />
      },
      {
        title: "Inventory Database / API",
        description: "Tracks active stock levels and shortage thresholds of scanners (TC58) and printers (ZQ521) across the network.",
        contribution: "Queries live hardware counts to locate potential donor stores with spare units that meet the minimum stock constraints.",
        icon: <Database className="w-5 h-5 text-[#2D6A2D]" />
      },
      {
        title: "Leaflet & OpenStreetMap",
        description: "Calculates geographic routing distances between ClickShop sites using GPS coordinates.",
        contribution: "Powers the donor selection engine, ranking candidate donor stores to minimize logistics time and courier distance.",
        icon: <Layers className="w-5 h-5 text-[#2D6A2D]" />
      }
    ],
    designChoices: [
      {
        title: "Concession Protocol",
        choice: "Verifying manager's claimed calendar conflicts before conceding and rerouting to the next donor.",
        rationale: "Ensures the agent is not easily blocked by managers refusing to share assets, whilst automatically respecting actual store events."
      },
      {
        title: "Decentralized Negotiation",
        choice: "Allowing regional site managers to respond to requests directly rather than relying on a central coordinator.",
        rationale: "Removes the coordination bottleneck and cognitive load by presenting site managers with clear choices accompanied by verifiable proofs."
      },
      {
        title: "Distance-Stock Balancing",
        choice: "Restricting small/medium stores from acting as donors and prioritizing donors by haversine distance.",
        rationale: "Keeps small, fast stores stocked with critical devices and ensures courier transfer routes are optimized regionally."
      }
    ],
    agentCapabilities: [
      "Google Calendar API to inspect scheduled local events and upcoming promotions",
      "Gmail / Email API for automated stakeholder notifications, negotiation threads, and proof delivery",
      "Inventory Database tracking real-time device counts of scanners (TC58) and printers (ZQ521)",
      "Distance & Route Optimization mapping coordinate coordinates to find the nearest donor shop"
    ],
    systemIntegrations: {
      verification: "The agent checks the manager's claimed calendar event against Google Calendar, verifying scheduled dates/times to confirm if they can actually spare the requested hardware.",
      dispatch: "Once a site manager agrees to the transfer (or when an override is approved), the agent initiates the courier dispatch, records the transfer in the Inventory DB, and emails proof of transaction."
    },
    steps: [
      {
        title: "Eastern Singapore ClickShop Map View",
        description: "Presents a live, interactive OSM/Leaflet map displaying ClickShop stores (XL, L, M, S sizes) and their current hardware counts.",
        image: "/screenshots/auto-negotiator/1_dashboard.png"
      },
      {
        title: "Simulating Device Shortage",
        description: "An operator triggers a shortage of scanners or printers at a receiver site, immediately initializing the agentic transfer search loop.",
        image: "/screenshots/auto-negotiator/2_negotiation_start.png"
      },
      {
        title: "Agent Decision Timeline",
        description: "The AI agent executes search and ranking queries, runs calendar verifications, and manages email communication logs in the console.",
        image: "/screenshots/auto-negotiator/3_agent_timeline.png"
      },
      {
        title: "Concession & Rerouting State",
        description: "Shows the agent successfully verifying a calendar promotion, conceding the request to Bedok, and negotiating with Tampines instead.",
        image: "/screenshots/auto-negotiator/4_concession_protocol.png"
      }
    ],
    techStack: {
      languages: "Python, JavaScript, HTML, CSS",
      frontend: "Vanilla JS, Leaflet Map, CSS Tokens, Base UI",
      databases: "SQLite / In-Memory Inventory DB, Local Logs",
      aiOrSystems: "Google Calendar API, Gmail API, LLM Agent Tool Use",
      aiOrSystemsLabel: "Agent Tool Use & APIs"
    }
  },
  "tourism-photobooth": {
    highlightedTools: [
      {
        title: "Suno Music Generation",
        description: "Mimics Singapore Airlines (SIA) boarding atmosphere using music generation prompts.",
        contribution: "Crafts custom theme songs and cabin hums to shape the ambient backdrop of the kiosk's virtual flight deck.",
        icon: <Music className="w-5 h-5 text-[#2D6A2D]" />
      },
      {
        title: "Gemini Video Structured Prompting",
        description: "Uses JSON structured prompts to define camera motion, framing constraints, and visual styling templates.",
        contribution: "Maintains consistent flight-theme aesthetics and transition effects even when generating disparate video assets.",
        icon: <Video className="w-5 h-5 text-[#2D6A2D]" />
      },
      {
        title: "Gemini LLM (Haiku Receipt)",
        description: "Synthesizes themed haikus on the fly based on the user's selected journey details.",
        contribution: "Generates quick, low-latency poetic text that prints onto the physical boarding ticket in real-time.",
        icon: <Sparkles className="w-5 h-5 text-[#2D6A2D]" />
      }
    ],
    designChoices: [
      {
        title: "Structured GenAI Asset Creation",
        choice: "Thematic video loops and cabin boarding music are pre-authored using GenAI prompts.",
        rationale: "Establishes a structured creative use of GenAI asset creation for the project goal, securing direct alignment with the Singapore Airlines brand narrative and visual experience."
      },
      {
        title: "On-the-fly Haiku Text Prompting",
        choice: "Invoking the Gemini LLM dynamically at runtime for the receipt boarding poetry.",
        rationale: "Integrates personalized content generation instantly into the user flow without disrupting the high-pace kiosk experience."
      },
      {
        title: "Node/FFmpeg Processing Server",
        choice: "Routing captured webcam media to a background server running FFmpeg.",
        rationale: "Maintains absolute control over visual borders, cropping and reframing the photo/video assets dynamically for the airline boarding pass layout."
      }
    ],
    kioskHardware: [
      "Connected webcam for live high-definition video/photo captures",
      "Interactive retro-telephone microphone for voice-theme selection",
      "Touch screen monitor acting as the main dashboard and terminal console",
      "Connected Zebra printer for receipt/boarding pass ZPL ticket prints"
    ],
    mediaPipeline: {
      captureAndFormat: "Webcam feeds are captured via media streams, sent to a background server running FFmpeg to crop, format, and overlay the signature boarding frame, then saved under Cloudinary storage.",
      emailDelivery: "Immediately after the ZPL receipt prints, a customized HTML email is dispatched via API containing CDN-hosted download links for the passenger's photo/video along with the printed haiku."
    },
    steps: [
      {
        title: "Kiosk Vibe Selection Dashboard",
        description: "Passengers choose between four custom travel media modules (Photo Strip, Breath Fog, Video Call, or Poem Receipt) styled with airline flight deck aesthetics.",
        image: "/screenshots/tourism-photobooth/1_home.png"
      },
      {
        title: "Poem Receipt Generation",
        description: "Selecting flight preferences prompts the real-time Gemini LLM to compile a custom-themed haiku printed directly on the passenger boarding card.",
        image: "/screenshots/tourism-photobooth/2_poem_select.png"
      },
      {
        title: "Photo Strip Webcam Capture",
        description: "Connected HD webcams capture passenger poses, reframing them via a background FFmpeg pipeline to apply custom border overlays.",
        image: "/screenshots/tourism-photobooth/3_photo_view.png"
      },
      {
        title: "Interactive Breath Fog Canvas",
        description: "Allows passengers to draw sketches or message marks over a fogged cabin window simulation during flight boarding.",
        image: "/screenshots/tourism-photobooth/4_fog_view.png"
      }
    ],
    techStack: {
      languages: "TypeScript, React, Node.js, Python, ZPL",
      frontend: "Next.js, Tailwind CSS, Vercel, Framer Motion",
      databases: "Neon Postgres, Cloudinary API, SendGrid",
      aiOrSystems: "Gemini LLM, Gemini Video (JSON Prompts), Suno AI",
      aiOrSystemsLabel: "Generative AI"
    }
  }
};

function ProjectCard({ project, onClick }: { project: (typeof projects)[0]; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`relative bg-white rounded-2xl p-7 border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer group flex flex-col justify-between h-full ${
        project.highlight
          ? "border-[#2D6A2D] shadow-sm"
          : "border-[#DDD8CC]"
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
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
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
                      
                      {/* User Capture */}
                      <div className="w-[140px] flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-[#E0EBE0] border border-[#2D6A2D] flex items-center justify-center text-[#2D6A2D] font-bold mb-2">
                          1
                        </div>
                        <span className="text-xs font-bold text-[#1A2E1A]">Passenger Desk</span>
                        <span className="text-[10px] text-[#556B55] mt-1 leading-snug">
                          Touch Screen<br/>Webcam & Phone Mic
                        </span>
                      </div>

                      {/* Flow Line 1 */}
                      <div className="flex-1 h-[2px] bg-[#DDD8CC] mx-2 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t-2 border-r-2 border-[#556B55] rotate-45" />
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] text-[#556B55] whitespace-nowrap bg-[#FAF8F4] px-1 font-medium">Capture Feed</span>
                      </div>

                      {/* Backend API Server */}
                      <div className="w-[150px] flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-[#E0EBE0] border border-[#2D6A2D] flex items-center justify-center text-[#2D6A2D] font-bold mb-2">
                          2
                        </div>
                        <span className="text-xs font-bold text-[#1A2E1A]">Serverless Backend</span>
                        <span className="text-[10px] text-[#556B55] mt-1 leading-snug">
                          Node API (Vercel)<br/>FFmpeg reframing server
                        </span>
                      </div>

                      {/* Flow Line 2 */}
                      <div className="flex-1 h-[2px] bg-[#DDD8CC] mx-2 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t-2 border-r-2 border-[#556B55] rotate-45" />
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] text-[#556B55] whitespace-nowrap bg-[#FAF8F4] px-1 font-medium">Process & DB</span>
                      </div>

                      {/* Services/Outputs */}
                      <div className="w-[140px] flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-[#E0EBE0] border border-[#2D6A2D] flex items-center justify-center text-[#2D6A2D] font-bold mb-2">
                          3
                        </div>
                        <span className="text-xs font-bold text-[#1A2E1A]">Terminal Outputs</span>
                        <span className="text-[10px] text-[#556B55] mt-1 leading-snug">
                          Zebra ZPL Ticket<br/>Cloudinary & Email
                        </span>
                      </div>

                    </div>

                    {/* Subagent / Cloud connections */}
                    <div className="grid grid-cols-3 mt-6 pt-5 border-t border-[#EAE6DB] text-center">
                      <div className="text-[10px] text-[#556B55] px-2 border-r border-[#EAE6DB]">
                        <span className="font-semibold block text-[#1A2E1A]">Pre-generated GenAI</span>
                        Suno Cabin Music & Gemini Video theme templates are pre-rendered to save latency.
                      </div>
                      <div className="text-[10px] text-[#556B55] px-2 border-r border-[#EAE6DB]">
                        <span className="font-semibold block text-[#1A2E1A]">Real-time LLM Call</span>
                        Gemini LLM queries live during UI selection to generate custom themed haikus.
                      </div>
                      <div className="text-[10px] text-[#556B55] px-2">
                        <span className="font-semibold block text-[#1A2E1A]">Serverless Database</span>
                        Neon Serverless Postgres tracks active sessions, user choices, and capture logs.
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
                        <span className="text-xs font-bold text-[#1A2E1A]">Receiver Site</span>
                        <span className="text-[10px] text-[#556B55] mt-1 leading-snug">
                          Shortage Detected<br/>(e.g., Bedok L store)
                        </span>
                      </div>

                      {/* Flow Line 1 */}
                      <div className="flex-1 h-[2px] bg-[#DDD8CC] mx-2 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t-2 border-r-2 border-[#556B55] rotate-45" />
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] text-[#556B55] whitespace-nowrap bg-[#FAF8F4] px-1 font-medium">Trigger Transfer</span>
                      </div>

                      {/* AI Agent Loop */}
                      <div className="w-[150px] flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-[#E0EBE0] border border-[#2D6A2D] flex items-center justify-center text-[#2D6A2D] font-bold mb-2">
                          2
                        </div>
                        <span className="text-xs font-bold text-[#1A2E1A]">AI Agent Loop</span>
                        <span className="text-[10px] text-[#556B55] mt-1 leading-snug">
                          Query APIs & Reroute<br/>via Concession Protocol
                        </span>
                      </div>

                      {/* Flow Line 2 */}
                      <div className="flex-1 h-[2px] bg-[#DDD8CC] mx-2 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t-2 border-r-2 border-[#556B55] rotate-45" />
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] text-[#556B55] whitespace-nowrap bg-[#FAF8F4] px-1 font-medium">Dispatch Courier</span>
                      </div>

                      {/* Transfer Outcome */}
                      <div className="w-[140px] flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-[#E0EBE0] border border-[#2D6A2D] flex items-center justify-center text-[#2D6A2D] font-bold mb-2">
                          3
                        </div>
                        <span className="text-xs font-bold text-[#1A2E1A]">Asset Transferred</span>
                        <span className="text-[10px] text-[#556B55] mt-1 leading-snug">
                          Stock DB Updated<br/>& Email Proof Sent
                        </span>
                      </div>

                    </div>

                    {/* Subagent / Cloud connections */}
                    <div className="grid grid-cols-3 mt-6 pt-5 border-t border-[#EAE6DB] text-center">
                      <div className="text-[10px] text-[#556B55] px-2 border-r border-[#EAE6DB]">
                        <span className="font-semibold block text-[#1A2E1A]">Calendar & Inventory APIs</span>
                        Checks donor's Google Calendar and stock metrics to verify if assets can actually be spared.
                      </div>
                      <div className="text-[10px] text-[#556B55] px-2 border-r border-[#EAE6DB]">
                        <span className="font-semibold block text-[#1A2E1A]">Concession Protocol</span>
                        If donor manager replies with calendar conflicts, agent validates and falls back to next donor.
                      </div>
                      <div className="text-[10px] text-[#556B55] px-2">
                        <span className="font-semibold block text-[#1A2E1A]">Distance & Stock Routing</span>
                        Prioritizes donor search based on distance (haversine distance) and stock levels.
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Use of Multimodal Generative AI */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-[#1A2E1A] flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4CAF50]" />
                  Use of Multimodal Generative AI
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {details.highlightedTools.map((tool, idx) => (
                    <div key={idx} className="bg-white border border-[#DDD8CC] rounded-xl p-5 flex flex-col justify-between">
                      <div>
                        <div className="p-2 rounded-lg bg-[#FAF8F4] border border-[#DDD8CC] w-fit mb-3">
                          {tool.icon}
                        </div>
                        <h4 className="font-bold text-[#1A2E1A] text-sm mb-1.5">{tool.title}</h4>
                        <p className="text-xs text-[#556B55] leading-relaxed mb-3">{tool.description}</p>
                      </div>
                      <div className="border-t border-[#EAE6DB] pt-3 text-[11px] text-[#2D6A2D]">
                        <span className="font-semibold block uppercase tracking-wider text-[9px] mb-1">Contribution:</span>
                        {tool.contribution}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hardware / Agent Capabilities & Pipelines */}
              {(details.kioskHardware || details.agentCapabilities || details.mediaPipeline || details.systemIntegrations) && (
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
                          <li key={idx} className="text-xs text-[#556B55] flex items-start gap-2">
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
                        Agent Tool Integration & APIs
                      </h3>
                      <ul className="space-y-2.5">
                        {details.agentCapabilities.map((item, idx) => (
                          <li key={idx} className="text-xs text-[#556B55] flex items-start gap-2">
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
                          <span className="font-bold text-[#1A2E1A]">Media Format: </span>
                          {details.mediaPipeline.captureAndFormat}
                        </p>
                      </div>
                      <div className="border-t border-[#EAE6DB] pt-3">
                        <p className="text-xs text-[#556B55] leading-relaxed">
                          <span className="font-bold text-[#1A2E1A]">Email & Retrieval: </span>
                          {details.mediaPipeline.emailDelivery}
                        </p>
                      </div>
                    </div>
                  ) : details.systemIntegrations ? (
                    <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold text-[#1A2E1A] mb-2 flex items-center gap-1.5">
                          <Mail className="w-4 h-4 text-[#2D6A2D]" />
                          Automated Verification & Proofs
                        </h3>
                        <p className="text-xs text-[#556B55] leading-relaxed">
                          <span className="font-bold text-[#1A2E1A]">Verification: </span>
                          {details.systemIntegrations.verification}
                        </p>
                      </div>
                      <div className="border-t border-[#EAE6DB] pt-3">
                        <p className="text-xs text-[#556B55] leading-relaxed">
                          <span className="font-bold text-[#1A2E1A]">Proof Delivery: </span>
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
                        <tr key={idx} className="hover:bg-[#FAF8F4]/50 transition-colors">
                          <td className="p-3 font-semibold text-[#1A2E1A]">{choice.title}</td>
                          <td className="p-3">{choice.choice}</td>
                          <td className="p-3 leading-relaxed">{choice.rationale}</td>
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
                    <div key={idx} className="bg-white border border-[#DDD8CC] rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
                      <div className="relative aspect-video w-full bg-[#FAF8F4] border-b border-[#DDD8CC]">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-start">
                        <h4 className="font-bold text-[#1A2E1A] text-xs mb-1">{step.title}</h4>
                        <p className="text-[11px] text-[#556B55] leading-relaxed">{step.description}</p>
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
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D6A2D] block mb-1">Languages</span>
                    <div className="flex flex-wrap gap-1 text-[11px] text-[#556B55]">
                      {details.techStack?.languages || "TypeScript, React, Node.js, Python, ZPL"}
                    </div>
                  </div>
                  <div className="p-3 bg-[#FAF8F4] border border-[#DDD8CC] rounded-lg">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D6A2D] block mb-1">Frontend & Hosting</span>
                    <div className="flex flex-wrap gap-1 text-[11px] text-[#556B55]">
                      {details.techStack?.frontend || "Next.js, Tailwind CSS, Vercel, Framer Motion"}
                    </div>
                  </div>
                  <div className="p-3 bg-[#FAF8F4] border border-[#DDD8CC] rounded-lg">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D6A2D] block mb-1">Databases & Infrastructure</span>
                    <div className="flex flex-wrap gap-1 text-[11px] text-[#556B55]">
                      {details.techStack?.databases || "Neon Postgres, Cloudinary API, SendGrid"}
                    </div>
                  </div>
                  <div className="p-3 bg-[#FAF8F4] border border-[#DDD8CC] rounded-lg">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D6A2D] block mb-1">
                      {details.techStack?.aiOrSystemsLabel || "Generative AI"}
                    </span>
                    <div className="flex flex-wrap gap-1 text-[11px] text-[#556B55]">
                      {details.techStack?.aiOrSystems || "Gemini LLM, Gemini Video (JSON Prompts), Suno AI"}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="py-12 text-center bg-white rounded-xl border border-[#DDD8CC]">
              <Info className="w-10 h-10 text-[#556B55]/50 mx-auto mb-3" />
              <h4 className="font-bold text-[#1A2E1A] mb-1">Detailed Case Study Coming Soon</h4>
              <p className="text-xs text-[#556B55] max-w-sm mx-auto leading-relaxed">
                Full structural analysis, architectural workflows, and media capture recordings for this project are currently in progress.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#DDD8CC] bg-white">
          <p className="text-[11px] text-[#556B55] italic">
            Press <kbd className="font-semibold bg-[#F0EBE1] px-1 py-0.5 rounded border border-[#DDD8CC]">Esc</kbd> to close.
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
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

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
            integrations. Click on any card below to read the case study deep-dives.
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
