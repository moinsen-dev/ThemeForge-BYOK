import type { Theme } from "./schema";

export function buildDesignMd(theme: Theme): string {
  const { meta, identity, tokens, components } = theme;

  const yamlFrontMatter = `---
name: ${meta.name}
version: ${meta.version}
colors:
  background:
    primary: "${tokens.colors.backgroundPrimary}"
    secondary: "${tokens.colors.backgroundSecondary}"
  surface:
    default: "${tokens.colors.surface}"
  border:
    default: "${tokens.colors.border}"
  text:
    primary: "${tokens.colors.textPrimary}"
    secondary: "${tokens.colors.textSecondary}"
  accent:
    primary: "${tokens.colors.accent}"
  status:
    success: "${tokens.colors.success}"
    warning: "${tokens.colors.warning}"
    danger: "${tokens.colors.danger}"
typography:
  display:
    family: "${tokens.typography.displayFont}"
    weight: 600
    letterSpacing: "${tokens.typography.letterSpacing.display}"
  body:
    family: "${tokens.typography.bodyFont}"
    weight: 400
  mono:
    family: "${tokens.typography.monoFont}"
spacing:
  xs: "${tokens.spacing.xs}"
  sm: "${tokens.spacing.sm}"
  md: "${tokens.spacing.md}"
  lg: "${tokens.spacing.lg}"
  xl: "${tokens.spacing.xl}"
radius:
  sm: "${tokens.radius.sm}"
  md: "${tokens.radius.md}"
  lg: "${tokens.radius.lg}"
motion:
  style: "${tokens.motion.style}"
  durationFast: "${tokens.motion.durationFast}"
  durationNormal: "${tokens.motion.durationNormal}"
---`;

  const body = `
# Visual Identity
${identity.visualIdentity}

# Design Principles
${identity.designPrinciples.map((p) => `- ${p}`).join("\n")}

# Component Guidance
## Buttons
${components.buttons.guidance}

## Panels
${components.cards.guidance}

## Alerts
${components.alerts.guidance}

## Data Visuals
${components.charts.guidance}

# Do Not Use
${identity.doNotUse.map((item) => `- ${item}`).join("\n")}
`;

  return yamlFrontMatter + body;
}
