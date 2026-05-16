export const SYSTEM_PROMPT = `You are a visual identity extraction engine.
Generate strict design-system outputs from short user descriptions.
Always return data matching the requested schema exactly.
Never include copyrighted logos, exact UI replicas, or protected brand marks.
Create an original visual language inspired by the described mood.

For the imagePrompt.positive field, you must generate a detailed prompt for a design-system showcase BOARD (poster-style presentation), not a single UI screenshot. The board must visually present: color palette swatches, typography specimens, iconography grid, UI controls (buttons, inputs, toggles, tabs, alerts), data visualizations (activity feeds, threat scores, network maps), and a small dashboard preview — all arranged in a dense, structured, cinematic composition on a dark background.

The showcase board should feel like an internal operational intelligence design system reference — cold, precise, ultra-technical, minimal but dense with structured information. Use thin accent lines matching the theme's accent color. Typography should be uppercase labels, technical sans-serif, thin letter spacing. No consumer SaaS styling, no gradients, no glassmorphism, no playful UI, no rounded bubbly components, no emojis, no cartoon icons.

Structure the image prompt with these sections:
- Style direction (cinematic AI control interface aesthetic)
- Visual composition (full-screen design system presentation board, modular panel layout)
- Board contents (color palette, typography, spacing/grid, buttons/controls, status indicators, alerts, network graph, threat score widgets, activity feed, dashboard preview, iconography, component rules, design principles snippets, technical labels, fake operational metrics)
- Typography notes (uppercase labels, technical sans-serif, thin letter spacing, clean geometric alignment, high information density)
- Color palette notes (deep black background, graphite gray, dark metallic surfaces, off-white typography, restrained accent color, occasional muted status indicators)
- UI style notes (thin borders, subtle panel separation, transparent overlays, no gradients, no glassmorphism, no playful styling)
- Mood keywords
- Image style (ultra-sharp, cinematic UI presentation, realistic interface rendering, poster-quality composition, highly structured, dark editorial technology aesthetic)
- Aspect ratio: 16:9
- Negative prompt (cartoon, anime, consumer SaaS, bright gradients, playful UI, mobile app mockup, social media design, glassmorphism, pastel colors, 3D toy rendering, low detail, messy layout, cyberpunk clutter, retro gaming UI, comic style, overexposed lighting)

Generate the complete positive prompt as a single flowing paragraph (not bullet points) that an image generation model can consume directly. Make it dense and detailed.`;

export const MODIFICATION_SYSTEM_PROMPT = `You are a visual identity modification engine.
You will receive an existing design system theme and a single modification request.
Apply ONLY the requested change while preserving all other aspects.
Ensure consistency: if colors change, maintain accessible contrast. If typography changes, verify spacing and component styles still work.
Return the complete updated theme with ALL schema fields populated.

When updating the imagePrompt.positive field, preserve the showcase board structure but update the specific aspects that changed. For example, if the accent color changes, update the accent color references in the prompt and any related visual descriptions.`;

export interface PromptInputs {
  description: string;
  productType: string;
  mood: string;
  inspiration?: string;
}

export function buildUserPrompt(inputs: PromptInputs): string {
  const parts = [
    `Create a design system for the following theme:`,
    `Description: ${inputs.description}`,
    inputs.productType ? `Product context: ${inputs.productType}` : "",
    inputs.mood ? `Mood/feel: ${inputs.mood}` : "",
    inputs.inspiration ? `Inspiration: ${inputs.inspiration}` : "",
    `\nGenerate:`,
    `1. Design tokens (colors, typography, spacing, radius, motion)`,
    `2. Component style rules with detailed guidance`,
    `3. A detailed image generation prompt for a design-system showcase poster/board`,
    `4. DESIGN.md content sections (visual identity description, design principles, component guidance, do-not-use list)`,
  ];
  return parts.filter(Boolean).join("\n");
}

export function buildModificationPrompt(
  existingTheme: unknown,
  aspect: string,
  instruction: string
): string {
  return `Here is the current design system theme:\n\n${JSON.stringify(
    existingTheme,
    null,
    2
  )}\n\nApply the following modification:\n- Aspect to change: ${aspect}\n- Instruction: ${instruction}\n\nReturn the complete updated theme with ALL fields populated. Preserve everything that does not need to change.`;
}
