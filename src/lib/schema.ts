import { z } from "zod";

export const themeSchema = z.object({
  meta: z.object({
    name: z.string().describe("Name of the design system"),
    version: z.string().describe("Version string, e.g. 1.0.0"),
    createdAt: z.string().datetime().describe("ISO-8601 timestamp"),
    sourcePrompt: z.string().describe("Original user prompt that generated this theme"),
    inspiration: z.string().describe("Inspiration reference or 'none'"),
  }),
  identity: z.object({
    summary: z.string().describe("One-paragraph visual identity summary"),
    moodKeywords: z.array(z.string()).describe("Keywords describing the mood"),
    designPrinciples: z.array(z.string()).describe("Design principles list"),
    visualIdentity: z.string().describe("Paragraph for DESIGN.md #Visual Identity section"),
    doNotUse: z.array(z.string()).describe("Items for DESIGN.md #Do Not Use section"),
  }),
  tokens: z.object({
    colors: z.object({
      backgroundPrimary: z.string().describe("Hex color for primary background"),
      backgroundSecondary: z.string().describe("Hex color for secondary background"),
      surface: z.string().describe("Hex color for surface/elevated elements"),
      border: z.string().describe("Hex color for borders and dividers"),
      textPrimary: z.string().describe("Hex color for primary text"),
      textSecondary: z.string().describe("Hex color for secondary/muted text"),
      accent: z.string().describe("Hex color for primary accent/interactive elements"),
      success: z.string().describe("Hex color for success states"),
      warning: z.string().describe("Hex color for warning states"),
      danger: z.string().describe("Hex color for danger/error states"),
    }),
    typography: z.object({
      displayFont: z.string().describe("Font family for display/headings"),
      bodyFont: z.string().describe("Font family for body text"),
      monoFont: z.string().describe("Font family for monospace/code"),
      letterSpacing: z.object({
        display: z.string().describe("Letter spacing for display text"),
        label: z.string().describe("Letter spacing for labels"),
      }),
    }),
    spacing: z.object({
      xs: z.string(),
      sm: z.string(),
      md: z.string(),
      lg: z.string(),
      xl: z.string(),
    }),
    radius: z.object({
      sm: z.string(),
      md: z.string(),
      lg: z.string(),
    }),
    motion: z.object({
      style: z.string().describe("Motion style descriptor"),
      durationFast: z.string().describe("Fast transition duration"),
      durationNormal: z.string().describe("Normal transition duration"),
    }),
  }),
  components: z.object({
    buttons: z.object({
      style: z.string().describe("Short style descriptor"),
      guidance: z.string().describe("Detailed usage guidance for DESIGN.md"),
    }),
    cards: z.object({
      style: z.string().describe("Short style descriptor"),
      guidance: z.string().describe("Detailed usage guidance for DESIGN.md"),
    }),
    alerts: z.object({
      style: z.string().describe("Short style descriptor"),
      guidance: z.string().describe("Detailed usage guidance for DESIGN.md"),
    }),
    charts: z.object({
      style: z.string().describe("Short style descriptor"),
      guidance: z.string().describe("Detailed usage guidance for DESIGN.md"),
    }),
  }),
  imagePrompt: z.object({
    positive: z.string().describe("Full image generation prompt for the showcase board"),
    negative: z.string().describe("Negative prompt to exclude unwanted styles"),
    aspectRatio: z.string().describe("Aspect ratio string, e.g. 16:9"),
    style: z.string().describe("Image style descriptor, e.g. design-system showcase board poster"),
  }),
});

export type Theme = z.infer<typeof themeSchema>;
