import { useState } from "react";
import { useThemeStore } from "@/stores/themeStore";
import ThemePreview from "./ThemePreview";
import JsonView from "./JsonView";
import DesignMdView from "./DesignMdView";
import {
  FileJson,
  FileText,
  Image,
  Copy,
  Wand2,
  SlidersHorizontal,
  ArrowLeft,
  Package,
  Check,
  Code,
  Globe,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import {
  downloadThemeJson,
  downloadDesignMd,
  downloadImage,
  downloadFlutterTheme,
  downloadBundleHtml,
  buildZip,
} from "@/lib/download";

type Tab = "preview" | "json" | "designmd";

export default function ResultScreen() {
  const { theme, imageUrl, designMd, flutterTheme, bundleHtml, themeMode, setScreen, setThemeMode, inputs, apiKey } =
    useThemeStore();
  const [activeTab, setActiveTab] = useState<Tab>("preview");
  const [downloading, setDownloading] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  if (!theme || !designMd) return null;

  const handleDownloadZip = async () => {
    setDownloading(true);
    try {
      const blob = await buildZip(theme, imageUrl, designMd);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "themeforge-export.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "preview", label: "Preview" },
    { key: "json", label: "JSON" },
    { key: "designmd", label: "DESIGN.md" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">{theme.meta.name}</h1>
            <p className="text-sm text-neutral-500">
              {theme.identity.moodKeywords.join(" · ")}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-md p-0.5">
              {(
                [
                  ["light", Sun],
                  ["dark", Moon],
                  ["auto", Monitor],
                ] as const
              ).map(([mode, Icon]) => (
                <button
                  key={mode}
                  onClick={() => setThemeMode(mode)}
                  title={mode.charAt(0).toUpperCase() + mode.slice(1)}
                  className={`p-1.5 rounded transition-colors ${
                    themeMode === mode
                      ? "bg-neutral-700 text-white"
                      : "text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
            <button
              onClick={() => setScreen("start")}
              className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              New Theme
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-neutral-800 pb-px">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? "border-red-500 text-white"
                  : "border-transparent text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="min-h-[400px]">
          {activeTab === "preview" && (
            <ThemePreview theme={theme} imageUrl={imageUrl} mode={themeMode} />
          )}
          {activeTab === "json" && (
            <JsonView json={JSON.stringify(theme, null, 2)} />
          )}
          {activeTab === "designmd" && <DesignMdView content={designMd} />}
        </div>

        {/* Actions */}
        <div className="border-t border-neutral-800 pt-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            {imageUrl && (
              <button
                onClick={() => downloadImage(imageUrl)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 rounded-md transition-colors"
              >
                <Image className="w-4 h-4" />
                Download Image
              </button>
            )}
            <button
              onClick={() => downloadThemeJson(theme)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 rounded-md transition-colors"
            >
              <FileJson className="w-4 h-4" />
              Download JSON
            </button>
            <button
              onClick={() => downloadDesignMd(designMd)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 rounded-md transition-colors"
            >
              <FileText className="w-4 h-4" />
              Download DESIGN.md
            </button>
            {flutterTheme && (
              <button
                onClick={() => downloadFlutterTheme(flutterTheme)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 rounded-md transition-colors"
              >
                <Code className="w-4 h-4" />
                Download app_theme.dart
              </button>
            )}
            {bundleHtml && (
              <button
                onClick={() => downloadBundleHtml(bundleHtml)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 rounded-md transition-colors"
              >
                <Globe className="w-4 h-4" />
                Download Demo HTML
              </button>
            )}
            <button
              onClick={async () => {
                await navigator.clipboard.writeText(theme.imagePrompt.positive);
                setCopiedPrompt(true);
                setTimeout(() => setCopiedPrompt(false), 2000);
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-sm bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 rounded-md transition-colors"
            >
              {copiedPrompt ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copiedPrompt ? "Copied!" : "Copy Prompt"}
            </button>
            <button
              onClick={handleDownloadZip}
              disabled={downloading}
              className="flex items-center gap-1.5 px-3 py-2 text-sm bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 rounded-md transition-colors disabled:opacity-50"
            >
              <Package className="w-4 h-4" />
              {downloading ? "Building..." : "Export Zip"}
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setScreen("start")}
              className="flex items-center gap-1.5 px-4 py-2 text-sm bg-neutral-800 hover:bg-neutral-700 text-white rounded-md transition-colors"
            >
              <Wand2 className="w-4 h-4" />
              Regenerate
            </button>
            <button
              onClick={() => setScreen("modify")}
              className="flex items-center gap-1.5 px-4 py-2 text-sm bg-red-600 hover:bg-red-500 text-white rounded-md transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Modify One Aspect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
