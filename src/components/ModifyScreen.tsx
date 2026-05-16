import { useState } from "react";
import { useThemeStore } from "@/stores/themeStore";
import { ArrowLeft, Loader2, Wand2 } from "lucide-react";
import { parseAIError } from "@/lib/errors";
import { buildFlutterTheme } from "@/lib/flutterTheme";
import { buildBundleHtml } from "@/lib/bundleHtml";

const changePoints = [
  "color",
  "typography",
  "density",
  "mood",
  "layout",
  "icon style",
  "component style",
  "data visualization style",
];

export default function ModifyScreen() {
  const {
    theme,
    apiKey,
    imageUrl,
    textModel,
    imageModel,
    modifyAspect,
    modifyInstruction,
    modifyScope,
    setModifyAspect,
    setModifyInstruction,
    setModifyScope,
    setScreen,
    setGenerationStep,
    setGenerationError,
    updateResult,
  } = useThemeStore();

  const [isLoading, setIsLoading] = useState(false);

  const canApply =
    modifyAspect && modifyInstruction.trim().length > 0 && theme && apiKey;

  const handleApply = async () => {
    if (!canApply || !theme) return;
    setIsLoading(true);
    setGenerationError(null);
    setScreen("generating");

    try {
      const { modifyTheme, generateShowcaseImage } = await import("@/lib/ai");
      const { buildDesignMd } = await import("@/lib/designMd");

      let updatedTheme = theme;
      let updatedImageUrl: string | null = null;

      if (modifyScope === "tokens" || modifyScope === "all") {
        setGenerationStep(1);
        updatedTheme = await modifyTheme(
          theme,
          modifyAspect,
          modifyInstruction,
          apiKey,
          textModel
        );
        useThemeStore.setState({ theme: updatedTheme });
      }

      if (modifyScope === "image" || modifyScope === "all") {
        setGenerationStep(3);
        updatedImageUrl = await generateShowcaseImage(updatedTheme, apiKey, imageModel);
        useThemeStore.setState({ imageUrl: updatedImageUrl });
      }

      setGenerationStep(5);
      const designMd = buildDesignMd(updatedTheme);
      const flutterTheme = buildFlutterTheme(updatedTheme);
      const bundleHtml = buildBundleHtml(updatedTheme);
      useThemeStore.setState({ designMd, flutterTheme, bundleHtml });

      updateResult(
        updatedTheme,
        modifyScope === "tokens" ? imageUrl : updatedImageUrl,
        designMd,
        flutterTheme,
        bundleHtml
      );
    } catch (err) {
      const message = parseAIError(err);
      console.error("Modification error:", err);
      setGenerationError(message);
      setScreen("modify");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 flex items-center justify-center px-4">
      <div className="w-full max-w-xl space-y-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setScreen("result")}
            className="text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-semibold text-white">
              Modify One Aspect
            </h2>
            <p className="text-sm text-neutral-500">
              Select exactly one change point and describe the modification.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Change Point
            </label>
            <select
              value={modifyAspect ?? ""}
              onChange={(e) => setModifyAspect(e.target.value || null)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-colors appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: "right 0.5rem center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "1.5em 1.5em",
                paddingRight: "2.5rem",
              }}
            >
              <option value="" disabled>
                Select an aspect...
              </option>
              {changePoints.map((point) => (
                <option key={point} value={point}>
                  {point.charAt(0).toUpperCase() + point.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Instruction
            </label>
            <textarea
              value={modifyInstruction}
              onChange={(e) => setModifyInstruction(e.target.value)}
              placeholder="Make the red accent more clinical and less aggressive."
              rows={3}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm placeholder:text-neutral-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-colors resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Apply To
            </label>
            <div className="space-y-2">
              {(
                [
                  ["image", "Image only"],
                  ["tokens", "Tokens only (JSON + DESIGN.md)"],
                  ["all", "Image + JSON + DESIGN.md"],
                ] as const
              ).map(([value, label]) => (
                <label
                  key={value}
                  className="flex items-center gap-2 text-sm text-neutral-300 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="modifyScope"
                    value={value}
                    checked={modifyScope === value}
                    onChange={(e) =>
                      setModifyScope(e.target.value as typeof modifyScope)
                    }
                    className="border-neutral-700 bg-neutral-900 text-red-500 focus:ring-red-500/20"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleApply}
            disabled={!canApply || isLoading}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-medium py-2.5 rounded-md transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Wand2 className="w-4 h-4" />
            )}
            {isLoading ? "Applying..." : "Apply Modification"}
          </button>
        </div>
      </div>
    </div>
  );
}
