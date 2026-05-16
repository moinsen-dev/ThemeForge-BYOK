import { useThemeStore } from "@/stores/themeStore";
import { Loader2, Check, AlertCircle, X, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const steps = [
  "Extracting design tokens",
  "Creating image prompt",
  "Generating showcase image",
  "Building JSON",
  "Building DESIGN.md",
];

export default function GenerationScreen() {
  const { generationStep, generationError, theme, imageUrl, designMd, flutterTheme, bundleHtml, setScreen, reset } =
    useThemeStore();

  const [showPreview, setShowPreview] = useState(true);

  if (generationError) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-200 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-500" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-white">
              Generation Failed
            </h2>
            <p className="text-sm text-neutral-400">{generationError}</p>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setScreen("start")}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-sm rounded-md transition-colors"
            >
              Back to Start
            </button>
            <button
              onClick={() => reset()}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm rounded-md transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 flex items-start justify-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
          </div>
          <h2 className="text-xl font-semibold text-white">
            Generating visual identity...
          </h2>
          <p className="text-sm text-neutral-500">
            Each step takes 30–90 seconds. Total time: 2–5 minutes.
          </p>
        </div>

        <div className="space-y-3">
          {steps.map((step, i) => {
            const stepNum = i + 1;
            const isActive = generationStep === stepNum;
            const isDone = generationStep > stepNum;

            return (
              <div
                key={step}
                className={`flex items-center gap-3 px-4 py-3 rounded-md border transition-colors ${
                  isDone
                    ? "bg-neutral-900/50 border-neutral-800"
                    : isActive
                    ? "bg-neutral-900 border-red-500/30"
                    : "bg-neutral-900/30 border-neutral-800/50"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${
                    isDone
                      ? "bg-red-500/20 text-red-400"
                      : isActive
                      ? "bg-red-500 text-white"
                      : "bg-neutral-800 text-neutral-600"
                  }`}
                >
                  {isDone ? <Check className="w-3.5 h-3.5" /> : stepNum}
                </div>
                <span
                  className={`text-sm ${
                    isDone
                      ? "text-neutral-400"
                      : isActive
                      ? "text-white"
                      : "text-neutral-600"
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        {/* Live Preview */}
        {theme && (
          <div className="border border-neutral-800 rounded-lg overflow-hidden">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="w-full flex items-center justify-between px-4 py-3 bg-neutral-900 hover:bg-neutral-800 transition-colors"
            >
              <span className="text-sm font-medium text-white">Live Preview</span>
              {showPreview ? (
                <ChevronUp className="w-4 h-4 text-neutral-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-neutral-500" />
              )}
            </button>

            {showPreview && (
              <div className="px-4 py-4 space-y-5 bg-neutral-950">
                {/* Theme Name & Mood */}
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {theme.meta.name}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {theme.identity.moodKeywords.map((k) => (
                      <span
                        key={k}
                        className="px-2 py-0.5 text-[10px] uppercase tracking-wider bg-neutral-800 text-neutral-400 rounded"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Color Palette */}
                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase tracking-wider text-neutral-500">
                    Color Palette
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(theme.tokens.colors).map(([name, value]) => (
                      <div key={name} className="flex items-center gap-1.5">
                        <div
                          className="w-5 h-5 rounded border border-neutral-700"
                          style={{ backgroundColor: value }}
                        />
                        <span className="text-[10px] text-neutral-500">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Typography */}
                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase tracking-wider text-neutral-500">
                    Typography
                  </p>
                  <div className="flex gap-3 text-xs text-neutral-400">
                    <span>Display: {theme.tokens.typography.displayFont}</span>
                    <span>Body: {theme.tokens.typography.bodyFont}</span>
                    <span>Mono: {theme.tokens.typography.monoFont}</span>
                  </div>
                </div>

                {/* Image Prompt */}
                {generationStep >= 2 && (
                  <div className="space-y-1.5">
                    <p className="text-[10px] uppercase tracking-wider text-neutral-500">
                      Image Prompt
                    </p>
                    <p className="text-xs text-neutral-400 line-clamp-4">
                      {theme.imagePrompt.positive}
                    </p>
                  </div>
                )}

                {/* Generated Image */}
                {imageUrl && generationStep >= 3 && (
                  <div className="space-y-1.5">
                    <p className="text-[10px] uppercase tracking-wider text-neutral-500">
                      Showcase Image
                    </p>
                    <img
                      src={imageUrl}
                      alt="Generated showcase"
                      className="w-full rounded-md border border-neutral-800"
                    />
                  </div>
                )}

                {/* JSON Preview */}
                {generationStep >= 4 && (
                  <div className="space-y-1.5">
                    <p className="text-[10px] uppercase tracking-wider text-neutral-500">
                      JSON Preview
                    </p>
                    <pre className="p-2 bg-neutral-900 rounded-md text-[10px] text-neutral-400 overflow-auto max-h-32 font-mono">
                      {JSON.stringify(theme, null, 2).slice(0, 800)}
                      {JSON.stringify(theme, null, 2).length > 800 ? "..." : ""}
                    </pre>
                  </div>
                )}

                {/* DESIGN.md Preview */}
                {designMd && generationStep >= 5 && (
                  <div className="space-y-1.5">
                    <p className="text-[10px] uppercase tracking-wider text-neutral-500">
                      DESIGN.md Preview
                    </p>
                    <pre className="p-2 bg-neutral-900 rounded-md text-[10px] text-neutral-400 overflow-auto max-h-32 font-mono whitespace-pre-wrap">
                      {designMd.slice(0, 800)}
                      {designMd.length > 800 ? "..." : ""}
                    </pre>
                  </div>
                )}

                {/* Flutter Theme Preview */}
                {flutterTheme && generationStep >= 5 && (
                  <div className="space-y-1.5">
                    <p className="text-[10px] uppercase tracking-wider text-neutral-500">
                      Flutter Theme Preview
                    </p>
                    <pre className="p-2 bg-neutral-900 rounded-md text-[10px] text-neutral-400 overflow-auto max-h-32 font-mono">
                      {flutterTheme.slice(0, 800)}
                      {flutterTheme.length > 800 ? "..." : ""}
                    </pre>
                  </div>
                )}

                {/* Bundle HTML Preview */}
                {bundleHtml && generationStep >= 5 && (
                  <div className="space-y-1.5">
                    <p className="text-[10px] uppercase tracking-wider text-neutral-500">
                      Bundle HTML Preview
                    </p>
                    <div className="border border-neutral-800 rounded-md overflow-hidden">
                      <iframe
                        srcDoc={bundleHtml}
                        title="Design System Demo"
                        className="w-full h-48 bg-white"
                        sandbox="allow-same-origin"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => setScreen("start")}
          className="w-full flex items-center justify-center gap-2 text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
      </div>
    </div>
  );
}
