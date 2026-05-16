import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Theme } from "@/lib/schema";

export type AppScreen = "start" | "generating" | "result" | "modify";

export type ModifyScope = "image" | "tokens" | "all";

export interface AppState {
  screen: AppScreen;

  inputs: {
    description: string;
    productType: string;
    mood: string;
    outputs: { image: boolean; json: boolean; designMd: boolean; flutter: boolean; bundle: boolean };
  };

  apiKey: string;
  rememberApiKey: boolean;

  generationStep: number;
  generationError: string | null;

  theme: Theme | null;
  imageUrl: string | null;
  designMd: string | null;
  flutterTheme: string | null;
  bundleHtml: string | null;

  modifyAspect: string | null;
  modifyInstruction: string;
  modifyScope: ModifyScope;

  textModel: string;
  imageModel: string;
}

export interface AppActions {
  setScreen: (screen: AppScreen) => void;
  setInputs: (inputs: Partial<AppState["inputs"]>) => void;
  setApiKey: (apiKey: string) => void;
  setRememberApiKey: (remember: boolean) => void;
  setGenerationStep: (step: number) => void;
  setGenerationError: (error: string | null) => void;
  setResult: (theme: Theme, imageUrl: string | null, designMd: string, flutterTheme?: string, bundleHtml?: string) => void;
  updateResult: (theme: Theme, imageUrl: string | null, designMd: string, flutterTheme?: string, bundleHtml?: string) => void;
  setModifyAspect: (aspect: string | null) => void;
  setModifyInstruction: (instruction: string) => void;
  setModifyScope: (scope: ModifyScope) => void;
  setTextModel: (model: string) => void;
  setImageModel: (model: string) => void;
  reset: () => void;
}

const initialState: AppState = {
  screen: "start",
  inputs: {
    description: "",
    productType: "",
    mood: "",
    outputs: { image: true, json: true, designMd: true, flutter: false, bundle: false },
  },
  apiKey: "",
  rememberApiKey: false,
  generationStep: 0,
  generationError: null,
  theme: null,
  imageUrl: null,
  designMd: null,
  flutterTheme: null,
  bundleHtml: null,
  modifyAspect: null,
  modifyInstruction: "",
  modifyScope: "all",
  textModel: "gpt-5.5",
  imageModel: "gpt-image-2",
};

export const useThemeStore = create<AppState & AppActions>()(
  persist(
    (set) => ({
      ...initialState,

      setScreen: (screen) => set({ screen }),

      setInputs: (inputs) =>
        set((state) => ({
          inputs: { ...state.inputs, ...inputs },
        })),

      setApiKey: (apiKey) => set({ apiKey }),

      setRememberApiKey: (rememberApiKey) => set({ rememberApiKey }),

      setGenerationStep: (generationStep) => set({ generationStep }),

      setGenerationError: (generationError) => set({ generationError }),

      setResult: (theme, imageUrl, designMd, flutterTheme, bundleHtml) =>
        set({
          theme,
          imageUrl,
          designMd,
          flutterTheme: flutterTheme ?? null,
          bundleHtml: bundleHtml ?? null,
          screen: "result",
          generationStep: 0,
          generationError: null,
        }),

      updateResult: (theme, imageUrl, designMd, flutterTheme, bundleHtml) =>
        set({
          theme,
          imageUrl,
          designMd,
          flutterTheme: flutterTheme ?? null,
          bundleHtml: bundleHtml ?? null,
          screen: "result",
          generationStep: 0,
          generationError: null,
        }),

      setModifyAspect: (modifyAspect) => set({ modifyAspect }),

      setModifyInstruction: (modifyInstruction) => set({ modifyInstruction }),

      setModifyScope: (modifyScope) => set({ modifyScope }),

      setTextModel: (textModel) => set({ textModel }),

      setImageModel: (imageModel) => set({ imageModel }),

      reset: () => set(initialState),
    }),
    {
      name: "themeforge-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        apiKey: state.rememberApiKey ? state.apiKey : "",
        rememberApiKey: state.rememberApiKey,
        theme: state.theme,
        imageUrl: state.imageUrl,
        designMd: state.designMd,
        flutterTheme: state.flutterTheme,
        bundleHtml: state.bundleHtml,
        inputs: state.inputs,
        textModel: state.textModel,
        imageModel: state.imageModel,
      }),
    }
  )
);
