// All site copy lives here. Technical content only.

export const site = {
  name: "Scott Haeger",
  role: "Full Stack Developer",
  location: "Asheville, NC",
  email: "scottahaeger@gmail.com",
  headline: "Systems that run the business, built to keep running.",
  summary:
    "Software engineering lead and project manager with 20+ years designing, building, and operating business-critical systems. 11 years of technical ownership of a multi-tenant CRM/ERP serving 65+ franchise locations, with hands-on depth in third-party integrations, AWS operations, security hardening, and AI agent infrastructure.",
};

export const facts = [
  { k: "Experience", v: "20+ yrs" },
  { k: "Tenants", v: "65+ DBs" },
  { k: "Platform", v: "AWS" },
  { k: "Current", v: "AI agents" },
];

export const expertise = [
  "Multi-tenant SaaS and ERP architecture",
  "Distributed and asynchronous processing",
  "Enterprise integration",
  "Domain-driven design",
  "Architecture decision records",
  "Security and identity",
  "Cloud operations and cost optimization",
  "AI agent infrastructure",
];

export type Project = {
  id: string;
  title: string;
  tag: string;
  blurb: string;
  bullets: string[];
  stack: string[];
};

export const projects: Project[] = [
  {
    id: "mobilink",
    title: "Mobilink CRM and ERP",
    tag: "Multi-tenant platform · 2015–2026",
    blurb:
      "PHP/Yii2 platform for the nationwide 101 Mobility franchise network, with corporate, franchisee, and background-job tiers covering sales, rentals, service, inventory, accounting, and marketing.",
    bullets: [
      "Engineering lead for 65+ franchise and corporate tenants, each with its own database; per-tenant switching at login and schema changes rolled out across every tenant.",
      "Migrated a legacy code-generator codebase to Yii2 while moving the platform onto AWS (EC2, RDS, EFS) with ProxySQL for database access.",
      "Scheduled credential and API token rotation, plus regular security scans.",
    ],
    stack: ["PHP", "Yii2", "MySQL", "ProxySQL", "AWS EC2/RDS/EFS"],
  },
  {
    id: "quickbooks",
    title: "QuickBooks Online integration",
    tag: "Accounting sync",
    blurb:
      "Runs alongside the existing QuickBooks Desktop Web Connector, with dependency-ordered queues, idempotent retries, audit trails, and reconciliation reporting.",
    bullets: [
      "Handled sales tax, FIFO inventory costs, refunds, discrepancy management, cash vs. accrual accounting, and rental-equipment depreciation with the client's accountant.",
    ],
    stack: ["QuickBooks Online", "Web Connector", "Queues", "PHP"],
  },
  {
    id: "messaging",
    title: "SMS and telephony",
    tag: "Real-time messaging",
    blurb:
      "Sakari SMS with inbound messages pushed to the browser in real time by a Go server-sent-events service, plus Call Tracking Metrics phone integration.",
    bullets: [],
    stack: ["Go", "SSE", "Sakari", "CTM"],
  },
  {
    id: "integrations",
    title: "Other integrations",
    tag: "Third-party systems",
    blurb:
      "HubSpot client and location syncing, embedded Power BI reports, JustiFi online payments (fully implemented, never released), automated multi-vendor lead intake, Google Maps scheduling assistant, and Google/Outlook calendar sync.",
    bullets: [],
    stack: ["HubSpot", "Power BI", "JustiFi", "Google Maps", "Calendar APIs"],
  },
  {
    id: "agentic-chat",
    title: "Agentic chat",
    tag: "Exploratory · Next.js / TypeScript",
    blurb:
      "Owned the agentic chat feature for a new multi-tenant SaaS ERP built with TypeScript in a domain-driven monorepo.",
    bullets: [
      "Defined 86+ requirements, security guardrails, and service-level targets; implemented 10 user stories covering session startup, streaming, reconnect, cancellation, and retry.",
      "Led a seven-phase migration to a sandbox-agent SDK using Agent Client Protocol, with Docker and E2B adapters, persisted agent events for audit and replay, and streaming integrated with tenant authentication.",
    ],
    stack: ["Claude Code", "Rivet", "Agent Client Protocol", "E2B", "Daytona"],
  },
];

export const experience = [
  {
    period: "2015 – 2026",
    title: "Full Stack Developer and Project Manager",
    org: "Wide Open Technologies",
    note: "Remote forward deployed engineer for the client; Mobilink CRM/ERP and agentic chat.",
  },
  {
    period: "2010 – 2015",
    title: "Independent Web Developer and Systems Administrator",
    org: "Self-employed",
    note: "Custom reporting and scheduling systems, e-commerce applications, and WordPress sites; hosting and DNS.",
  },
  {
    period: "2008 – 2010",
    title: "Web and Systems Developer",
    org: "America's Auction Network Television",
    note: "Web and mobile sites and internal systems for video capture, security, archiving, live streaming, and integration using PHP, Python, MySQL, and ffmpeg.",
  },
  {
    period: "2007 – 2008",
    title: "Software Engineer",
    org: "Mozilla Foundation",
    note: "Implemented ARIA support in Orca for Firefox 3; built regression tests and improved performance with AT-SPI Collection.",
  },
  {
    period: "2006 – 2007",
    title: "Contract Developer",
    org: "Computer Technology Group, contract to IBM",
    note: "Co-developed Braille output and Firefox modules for IBM's Linux screen reader.",
  },
  {
    period: "2005 – 2007",
    title: "Owner and Lead Engineer",
    org: "BASH Automation LLC",
    note: "Web-based PLC controls and telemetry system with real-time alarms and historical trends, shown on a custom open source SVG HMI environment.",
  },
  {
    period: "2004 – 2006",
    title: "Systems Engineer",
    org: "L-3 Communications",
    note: "Extended a C++ baggage-screening application, focusing on 2-D and 3-D image enhancement; built a Qt-based installer/troubleshooter for field technicians.",
  },
];

export const skills = [
  {
    group: "Languages & frameworks",
    items: ["PHP", "TypeScript", "JavaScript", "SQL", "Python", "Go", "Yii2", "Next.js", "React", "Node.js", "oRPC", "Prisma", "C/C++ (earlier)", "Java (earlier)"],
  },
  {
    group: "Cloud & data",
    items: ["AWS EC2", "RDS", "EFS", "S3", "IAM", "CloudWatch", "CloudTrail", "GuardDuty", "EventBridge", "SNS", "ACM", "Linux", "Docker", "MySQL", "PostgreSQL", "ProxySQL", "Redis/Valkey", "Microsoft Entra ID"],
  },
  {
    group: "AI & delivery",
    items: ["Claude Code", "E2B", "Agent Client Protocol", "Git/GitHub", "Vitest", "Testcontainers", "Playwright", "Codeception", "Sentry", "CI/CD", "Release & rollback planning"],
  },
];

export const education = [
  "M.S. Computer Science, University of South Florida",
  "M.S. Microbiology, University of Texas at Austin",
  "B.S. Biology, University of South Florida",
];
