# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
