import { useThemeStore } from "@/stores/themeStore";
import { useState } from "react";
import { Wand2, Key, Eye, EyeOff, Settings2 } from "lucide-react";
import { buildFlutterTheme } from "@/lib/flutterTheme";
import { buildBundleHtml } from "@/lib/bundleHtml";
import { parseAIError } from "@/lib/errors";

export default function StartScreen() {
  const {
    inputs,
    apiKey,
    rememberApiKey,
    textModel,
    imageModel,
    setInputs,
    setApiKey,
    setRememberApiKey,
    setTextModel,
    setImageModel,
    setScreen,
    setGenerationStep,
    setGenerationError,
    setResult,
  } = useThemeStore();

  const [showKey, setShowKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const canGenerate =
    inputs.description.trim().length > 0 &&
    apiKey.trim().length > 0 &&
    (inputs.outputs.image || inputs.outputs.json || inputs.outputs.designMd);

  const handleGenerate = async () => {
    if (!canGenerate) return;
    setIsLoading(true);
    setGenerationError(null);
    setGenerationStep(1);
    setScreen("generating");

    try {
      const { createTheme, generateShowcaseImage } = await import("@/lib/ai");
      const { buildDesignMd } = await import("@/lib/designMd");

      setGenerationStep(1);
      const theme = await createTheme(
        {
          description: inputs.description,
          productType: inputs.productType,
          mood: inputs.mood,
        },
        apiKey,
        textModel
      );

      setGenerationStep(2);
      useThemeStore.setState({ theme });

      let imageUrl: string | null = null;
      if (inputs.outputs.image) {
        setGenerationStep(3);
        imageUrl = await generateShowcaseImage(theme, apiKey, imageModel);
        useThemeStore.setState({ imageUrl });
      }

      setGenerationStep(4);

      setGenerationStep(5);
      const designMd = buildDesignMd(theme);
      const flutterTheme = inputs.outputs.flutter ? buildFlutterTheme(theme) : "";
      const bundleHtml = inputs.outputs.bundle ? buildBundleHtml(theme) : "";
      useThemeStore.setState({ designMd, flutterTheme, bundleHtml });

      setResult(theme, imageUrl, designMd, flutterTheme, bundleHtml);
    } catch (err) {
      const message = parseAIError(err);
      console.error("Generation error:", err);
      setGenerationError(message);
      setScreen("start");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            ThemeForge <span className="text-red-500">BYOK</span>
          </h1>
          <p className="text-neutral-400 text-sm">
            Generate design systems from a short description. Bring your own
            OpenAI API key.
          </p>
        </div>

        <div className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Theme Description
            </label>
            <textarea
              value={inputs.description}
              onChange={(e) =>
                setInputs({ description: e.target.value })
              }
              placeholder="Dark surveillance UI inspired by Samaritan from Person of Interest"
              rows={3}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm placeholder:text-neutral-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-colors resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Product Type
            </label>
            <input
              type="text"
              value={inputs.productType}
              onChange={(e) =>
                setInputs({ productType: e.target.value })
              }
              placeholder="AI command cockpit / design system"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm placeholder:text-neutral-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Mood
            </label>
            <input
              type="text"
              value={inputs.mood}
              onChange={(e) => setInputs({ mood: e.target.value })}
              placeholder="cold, precise, dystopian, technical, premium"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm placeholder:text-neutral-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Output Format
            </label>
            <div className="flex gap-4">
              {(
                [
                  ["image", "Image"],
                  ["json", "JSON"],
                  ["designMd", "DESIGN.md"],
                  ["flutter", "Flutter Theme"],
                  ["bundle", "Bundle HTML"],
                ] as const
              ).map(([key, label]) => (
                <label
                  key={key}
                  className="flex items-center gap-2 text-sm text-neutral-300 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={inputs.outputs[key]}
                    onChange={(e) =>
                      setInputs({
                        outputs: {
                          ...inputs.outputs,
                          [key]: e.target.checked,
                        },
                      })
                    }
                    className="rounded border-neutral-700 bg-neutral-900 text-red-500 focus:ring-red-500/20"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              OpenAI API Key
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
              <input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full bg-neutral-900 border border-neutral-800 rounded-md pl-9 pr-10 py-2 text-sm placeholder:text-neutral-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-colors font-mono"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-neutral-400"
              >
                {showKey ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-neutral-600">
              Your key is never sent to our servers.
            </p>
          </div>

          <label className="flex items-center gap-2 text-sm text-neutral-400 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberApiKey}
              onChange={(e) => setRememberApiKey(e.target.checked)}
              className="rounded border-neutral-700 bg-neutral-900 text-red-500 focus:ring-red-500/20"
            />
            Remember API key in this browser
          </label>

          <button
            onClick={handleGenerate}
            disabled={!canGenerate || isLoading}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-medium py-2.5 rounded-md transition-colors"
          >
            <Wand2 className="w-4 h-4" />
            {isLoading ? "Starting..." : "Generate Theme"}
          </button>

          <div className="text-center space-y-1 pt-4 border-t border-neutral-800">
            <p className="text-xs text-neutral-500">
              Built from an experiment by{" "}
              <a
                href="https://github.com/moinsen-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors underline underline-offset-2"
              >
                Moinsen development Hamburg
              </a>
            </p>
            <p className="text-[10px] text-neutral-600">
              © 2026 Ulrich Diedrichsen · Free to use · No tracking · No spy software ·{" "}
              <a
                href="https://github.com/moinsen-dev/ThemeForge-BYOK"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-neutral-400 transition-colors underline underline-offset-2"
              >
                Open Source on GitHub
              </a>
            </p>
          </div>

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-center gap-2 text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            <Settings2 className="w-4 h-4" />
            {showAdvanced ? "Hide Advanced" : "Advanced Settings"}
          </button>

          {showAdvanced && (
            <div className="space-y-4 p-4 border border-neutral-800 rounded-md bg-neutral-900/50">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Text Model
                </label>
                <input
                  type="text"
                  value={textModel}
                  onChange={(e) => setTextModel(e.target.value)}
                  placeholder="gpt-5.5"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm placeholder:text-neutral-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-colors font-mono"
                />
                <p className="text-xs text-neutral-600">
                  e.g. gpt-5.5, gpt-4o, gpt-4.5-turbo
                </p>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Image Model
                </label>
                <input
                  type="text"
                  value={imageModel}
                  onChange={(e) => setImageModel(e.target.value)}
                  placeholder="gpt-image-2"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm placeholder:text-neutral-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-colors font-mono"
                />
                <p className="text-xs text-neutral-600">
                  e.g. gpt-image-2, dall-e-3, dall-e-2
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
