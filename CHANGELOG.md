# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Flutter Theme Export** — Generates a ready-to-use `app_theme.dart` file with:
  - `ThemeData` configured for dark mode
  - `ColorScheme` from generated color tokens
  - `TextTheme` with display, body, and label styles
  - Spacing, radius, and motion constants
  - `CardTheme`, `InputDecorationTheme`, `ElevatedButtonTheme`, `OutlinedButtonTheme`
- **Bundle HTML Demo** — Self-contained `design-system-demo.html` with inline CSS showing:
  - Color palette swatches
  - Typography specimens
  - Spacing visualization
  - Button, form, alert, and card components
  - Design principles
  - Live iframe preview during generation
- Flutter theme download button on the Result screen
- Flutter theme preview in the Generation screen's Live Preview panel
- Bundle HTML download button on the Result screen
- Bundle HTML live iframe preview in the Generation screen
- Footer with credits, GitHub link, and open source notice
- `app_theme.dart` and `design-system-demo.html` included in the zip export bundle

### Changed

- Updated generation time estimate from "30–60 seconds" to "2–5 minutes" to reflect actual per-step model latency
- Changed text generation to use the OpenAI Responses API (`openai.responses()`) for `gpt-5.5` compatibility
- Zod schema: removed all `.default()` and `.optional()` modifiers to satisfy the Responses API's strict JSON schema validation

### Fixed

- **Zip export** — Changed `jszip` from dynamic import to static import to fix Vite dev server 504 errors
- **Error handling** — Added `parseAIError()` utility to extract actual OpenAI API error messages from response bodies
- **Model configuration** — Added Advanced Settings panel with configurable text and image model inputs

## [1.0.0] - 2025-05-16

### Added

- Initial release of ThemeForge BYOK
- Start screen with theme description, product type, mood, output format selection, and OpenAI API key input
- Generation screen with animated 5-step progress tracker
- Result screen with three tabs: Preview, JSON, and DESIGN.md
- Modify screen for one-point iteration on 8 design aspects (color, typography, density, mood, layout, icon style, component style, data visualization style)
- AI-powered design-system generation using AI SDK 6.x with OpenAI provider
- Showcase board image generation via OpenAI image models
- Structured theme JSON output with design tokens, component rules, and image prompts
- DESIGN.md export with YAML front matter and markdown rationale (compatible with google-labs-code/design.md)
- Client-side downloads: theme.json, DESIGN.md, image.png, prompt.txt, and themeforge-export.zip
- API key security: client-side only, optional localStorage persistence, never sent to server
- Cloudflare Pages deployment configuration
