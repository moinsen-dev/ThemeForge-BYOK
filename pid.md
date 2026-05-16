Ja. Hier ist eine kompakte PID für die Web-App.

PID — ThemeForge BYOK

1. Product Vision

Build a mini web app that turns a short visual theme idea into:

1. an AI-generated design-system showcase image
2. an editable iteration workflow for changing one selected design aspect
3. a downloadable machine-readable JSON theme file
4. a downloadable DESIGN.md file compatible with the google-labs-code/design.md concept: YAML design tokens plus markdown design rationale. The referenced format describes DESIGN.md as a plain-text design-system representation for humans and AI agents, combining machine-readable tokens with human-readable rationale.  ￼

2. Product Name

ThemeForge BYOK

Alternative: DesignDNA, Visual Identity Extractor, ThemeSmith

3. Core User Flow

User enters:
- theme idea
- optional inspiration reference
- preferred product context
- OpenAI API key
App generates:
- visual direction
- structured theme JSON
- DESIGN.md
- prompt for image generation
- first showcase image
User selects one change point:
- color
- typography
- density
- mood
- layout
- icon style
- component style
- data visualization style
App regenerates:
- updated image
- updated JSON
- updated DESIGN.md

4. Required Screens

4.1 Start Screen

Fields:

Theme description:
"Dark surveillance UI inspired by Samaritan from Person of Interest"
Product type:
"AI command cockpit / design system"
Mood:
"cold, precise, dystopian, technical, premium"
Output format:
[ ] Image
[ ] JSON
[ ] DESIGN.md
OpenAI API Key:
sk-...

Important: API key is never stored server-side.

4.2 Generation Screen

Shows:

Generating visual identity...
1. Extracting design tokens
2. Creating image prompt
3. Generating showcase image
4. Building JSON
5. Building DESIGN.md

4.3 Result Screen

Three tabs:

Preview
JSON
DESIGN.md

Actions:

Download image
Download theme.json
Download DESIGN.md
Copy prompt
Regenerate
Modify one aspect

4.4 Modify Screen

User chooses exactly one change point:

Change point:
[Accent color]
Instruction:
"Make the red accent more clinical and less aggressive."
Apply to:
[ ] image only
[ ] tokens only
[ ] image + JSON + DESIGN.md

5. Output JSON Schema

{
  "meta": {
    "name": "Samaritan Inspired Design System",
    "version": "1.0.0",
    "createdAt": "ISO-8601",
    "sourcePrompt": "string",
    "inspiration": "string"
  },
  "identity": {
    "summary": "string",
    "moodKeywords": ["cold", "precise", "surveillance", "technical"],
    "designPrinciples": [
      "High contrast",
      "Minimal ornament",
      "Strong information hierarchy",
      "Threat-focused red accent"
    ]
  },
  "tokens": {
    "colors": {
      "backgroundPrimary": "#0A0A0A",
      "backgroundSecondary": "#111214",
      "surface": "#1A1C1E",
      "border": "#2A2D31",
      "textPrimary": "#E6E6E6",
      "textSecondary": "#9A9A9A",
      "accent": "#E02424",
      "success": "#44C46A",
      "warning": "#E7A93B",
      "danger": "#FF2B2B"
    },
    "typography": {
      "displayFont": "SF Pro Display",
      "bodyFont": "Inter",
      "monoFont": "JetBrains Mono",
      "letterSpacing": {
        "display": "0.18em",
        "label": "0.12em"
      }
    },
    "spacing": {
      "xs": "4px",
      "sm": "8px",
      "md": "16px",
      "lg": "24px",
      "xl": "40px"
    },
    "radius": {
      "sm": "2px",
      "md": "4px",
      "lg": "8px"
    },
    "motion": {
      "style": "precise-linear",
      "durationFast": "120ms",
      "durationNormal": "220ms"
    }
  },
  "components": {
    "buttons": {
      "style": "thin border, uppercase label, red active state"
    },
    "cards": {
      "style": "dark transparent panels with subtle border"
    },
    "alerts": {
      "style": "red outline, icon-first, high-urgency"
    },
    "charts": {
      "style": "radial scores, thin lines, minimal labels"
    }
  },
  "imagePrompt": {
    "positive": "string",
    "negative": "string",
    "aspectRatio": "16:9",
    "style": "design-system showcase poster"
  }
}

6. DESIGN.md Export Structure

---
name: Samaritan Inspired Design System
version: 1.0.0
colors:
  background:
    primary: "#0A0A0A"
    secondary: "#111214"
  surface:
    default: "#1A1C1E"
  border:
    default: "#2A2D31"
  text:
    primary: "#E6E6E6"
    secondary: "#9A9A9A"
  accent:
    primary: "#E02424"
typography:
  display:
    family: "SF Pro Display"
    weight: 600
    letterSpacing: "0.18em"
  body:
    family: "Inter"
    weight: 400
  mono:
    family: "JetBrains Mono"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
radius:
  sm: "2px"
  md: "4px"
  lg: "8px"
---
# Visual Identity
A cold, technical, surveillance-inspired interface language for AI command systems, dashboards, threat analysis tools, and agentic control surfaces.
# Design Principles
- High contrast over decoration.
- Thin borders over filled surfaces.
- Red is reserved for attention, risk, command, and threat.
- Typography should feel precise, classified, and system-generated.
- Layouts must look like operational dashboards, not marketing pages.
# Component Guidance
## Buttons
Use uppercase labels, thin outlines, minimal hover effects, and red active states.
## Panels
Panels should feel like transparent surveillance overlays. Avoid soft cards, heavy shadows, gradients, and playful UI.
## Data Visuals
Prefer radial threat scores, activity timelines, network maps, status feeds, and sparse metrics.
# Do Not Use
- Rounded consumer-app aesthetics
- Bright SaaS gradients
- Emoji
- Cartoon icons
- Soft pastel palettes
- Heavy glassmorphism

7. OpenAI Integration

BYOK Rules

- API key entered client-side
- key stored only in memory by default
- optional localStorage toggle
- never logged
- never sent to own backend unless proxy mode is explicitly enabled

Model Usage

Text/model reasoning:
OpenAI Responses API
Image generation:
OpenAI Images API
Recommended pipeline:
1. Prompt → structured theme JSON
2. JSON → DESIGN.md
3. JSON → image prompt
4. image prompt → generated image
5. user modification → patch JSON + regenerate assets

8. Prompt Contract

System Prompt

You are a visual identity extraction engine.
Generate strict design-system outputs from short user descriptions.
Always return:
- structured JSON
- image generation prompt
- DESIGN.md-compatible content
Never include copyrighted logos, exact UI replicas, or protected brand marks.
Create an original visual language inspired by the described mood.

User Prompt Example

Create a dark surveillance UI design system inspired by Samaritan from Person of Interest.
It should feel cold, technical, precise, dystopian, and suitable for an AI command cockpit.
Generate:
1. design tokens
2. component rules
3. image prompt for a design-system showcase poster
4. DESIGN.md content

9. Technical Stack

Frontend:
Astro + React islands
Styling:
Tailwind CSS
Client state:
Zustand
Validation:
Zod
File generation:
Blob API client-side
OpenAI:
openai npm SDK
Deployment:
Cloudflare Pages

10. File Downloads

Generated files:

theme.json
DESIGN.md
image.png
prompt.txt

Optional bundle:

themeforge-export.zip

11. Non-Goals

- No user accounts
- No backend database
- No hosted API-key storage
- No marketplace
- No collaboration
- No Figma plugin in first version

12. Acceptance Criteria

AC-01: User can enter an OpenAI API key and generate one complete theme package.
AC-02: App produces a high-quality design-system showcase image.
AC-03: App produces valid downloadable JSON.
AC-04: App produces downloadable DESIGN.md with YAML front matter and markdown rationale.
AC-05: User can modify one selected design aspect and regenerate outputs.
AC-06: API key is not persisted unless user explicitly enables local storage.
AC-07: Generated design avoids direct trademark/logo reproduction.
AC-08: JSON output validates against the app schema.
AC-09: DESIGN.md can be linted/exported with the design.md tooling where applicable; the package supports linting and export commands according to its release notes.  [oai_citation:1‡GitHub](https://github.com/google-labs-code/design.md/releases?utm_source=chatgpt.com)

13. Core Build Instruction for Coding Agent

Build ThemeForge BYOK as a single-purpose Astro web app.
The app accepts a visual theme description and an OpenAI API key, generates a structured theme JSON, a DESIGN.md file, an image prompt, and a design-system showcase image.
The app must support one-point iteration: the user selects exactly one design aspect to change, enters a short instruction, and the app regenerates the affected outputs while preserving the rest of the theme.
No accounts. No database. No server-side key storage. All downloads must be generated client-side.