import { useThemeStore } from "@/stores/themeStore";
import { Loader2, Check, AlertCircle, X } from "lucide-react";

const steps = [
  "Extracting design tokens",
  "Creating image prompt",
  "Generating showcase image",
  "Building JSON",
  "Building DESIGN.md",
];

export default function GenerationScreen() {
  const { generationStep, generationError, setScreen, reset } =
    useThemeStore();

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
    <div className="min-h-screen bg-neutral-950 text-neutral-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
          </div>
          <h2 className="text-xl font-semibold text-white">
            Generating visual identity...
          </h2>
          <p className="text-sm text-neutral-500">
            This may take 30–60 seconds depending on the model.
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
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
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
