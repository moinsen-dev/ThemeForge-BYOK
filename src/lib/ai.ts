import { generateObject, generateImage } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { themeSchema, type Theme } from "./schema";
import {
  SYSTEM_PROMPT,
  MODIFICATION_SYSTEM_PROMPT,
  buildUserPrompt,
  buildModificationPrompt,
  type PromptInputs,
} from "./prompts";

function getOpenAI(apiKey: string) {
  return createOpenAI({ apiKey });
}

export async function createTheme(
  inputs: PromptInputs,
  apiKey: string,
  textModel: string
): Promise<Theme> {
  const openai = getOpenAI(apiKey);
  const { object } = await generateObject({
    model: openai.responses(textModel),
    schema: themeSchema,
    system: SYSTEM_PROMPT,
    prompt: buildUserPrompt(inputs),
  });
  return object as Theme;
}

export async function generateShowcaseImage(
  theme: Theme,
  apiKey: string,
  imageModel: string
): Promise<string> {
  const openai = getOpenAI(apiKey);
  const { image } = await generateImage({
    model: openai.image(imageModel),
    prompt: theme.imagePrompt.positive,
  });
  return `data:${image.mediaType};base64,${image.base64}`;
}

export async function modifyTheme(
  existing: Theme,
  aspect: string,
  instruction: string,
  apiKey: string,
  textModel: string
): Promise<Theme> {
  const openai = getOpenAI(apiKey);
  const { object } = await generateObject({
    model: openai.responses(textModel),
    schema: themeSchema,
    system: MODIFICATION_SYSTEM_PROMPT,
    prompt: buildModificationPrompt(existing, aspect, instruction),
  });
  return object as Theme;
}
