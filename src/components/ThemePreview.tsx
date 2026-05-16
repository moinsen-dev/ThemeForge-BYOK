import type { Theme } from "@/lib/schema";

type ThemeMode = "light" | "dark" | "auto";

export default function ThemePreview({
  theme,
  imageUrl,
  mode = "auto",
}: {
  theme: Theme;
  imageUrl: string | null;
  mode?: ThemeMode;
}) {
  const { tokens, identity, components } = theme;

  const resolvedMode: "light" | "dark" =
    mode === "auto"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : mode;

  const palette = resolvedMode === "dark" && tokens.colorsDark
    ? tokens.colorsDark
    : tokens.colors;

  const hasDarkPalette = !!tokens.colorsDark;
  const isDarkFallback = resolvedMode === "dark" && !hasDarkPalette;

  const colorEntries = Object.entries(palette);

  const containerStyle: React.CSSProperties = {
    backgroundColor: palette.backgroundPrimary,
    color: palette.textPrimary,
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: palette.surface,
    borderColor: palette.border,
    borderWidth: "1px",
    borderStyle: "solid",
  };

  const secondaryBgStyle: React.CSSProperties = {
    backgroundColor: palette.backgroundSecondary,
  };

  return (
    <div className="space-y-8" style={containerStyle}>
      {isDarkFallback && (
        <div
          className="px-3 py-2 text-xs rounded-md border"
          style={{
            backgroundColor: "color-mix(in srgb, " + palette.warning + " 10%, transparent)",
            borderColor: palette.warning,
            color: palette.textSecondary,
          }}
        >
          Dark palette not available for this legacy theme. Using light palette as fallback.
        </div>
      )}

      {imageUrl && (
        <div className="space-y-2">
          <h3
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: palette.textSecondary }}
          >
            Showcase Board
          </h3>
          <div
            className="rounded-lg overflow-hidden"
            style={cardStyle}
          >
            <img
              src={imageUrl}
              alt="Design system showcase"
              className="w-full h-auto"
            />
          </div>
        </div>
      )}

      <div className="space-y-3">
        <h3
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: palette.textSecondary }}
        >
          Color Palette{resolvedMode === "dark" ? " (Dark)" : " (Light)"}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {colorEntries.map(([name, value]) => (
            <div
              key={name}
              className="group rounded-md overflow-hidden"
              style={cardStyle}
            >
              <div
                className="h-16 w-full"
                style={{ backgroundColor: value }}
              />
              <div className="px-2 py-1.5" style={secondaryBgStyle}>
                <p
                  className="text-[10px] uppercase tracking-wider truncate"
                  style={{ color: palette.textSecondary }}
                >
                  {name.replace(/([A-Z])/g, " $1").trim()}
                </p>
                <p
                  className="text-xs font-mono"
                  style={{ color: palette.textPrimary }}
                >
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: palette.textSecondary }}
        >
          Typography
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-md" style={cardStyle}>
            <p
              className="text-[10px] uppercase tracking-wider mb-1"
              style={{ color: palette.textSecondary }}
            >
              Display
            </p>
            <p
              className="text-lg"
              style={{ fontFamily: tokens.typography.displayFont, color: palette.textPrimary }}
            >
              Aa
            </p>
            <p className="text-xs mt-1" style={{ color: palette.textSecondary }}>
              {tokens.typography.displayFont}
            </p>
          </div>
          <div className="p-3 rounded-md" style={cardStyle}>
            <p
              className="text-[10px] uppercase tracking-wider mb-1"
              style={{ color: palette.textSecondary }}
            >
              Body
            </p>
            <p
              className="text-sm"
              style={{ fontFamily: tokens.typography.bodyFont, color: palette.textPrimary }}
            >
              The quick brown fox
            </p>
            <p className="text-xs mt-1" style={{ color: palette.textSecondary }}>
              {tokens.typography.bodyFont}
            </p>
          </div>
          <div className="p-3 rounded-md" style={cardStyle}>
            <p
              className="text-[10px] uppercase tracking-wider mb-1"
              style={{ color: palette.textSecondary }}
            >
              Mono
            </p>
            <p
              className="text-sm font-mono"
              style={{ fontFamily: tokens.typography.monoFont, color: palette.textPrimary }}
            >
              console.log("ok")
            </p>
            <p className="text-xs mt-1" style={{ color: palette.textSecondary }}>
              {tokens.typography.monoFont}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: palette.textSecondary }}
        >
          Spacing &amp; Radius
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-md" style={cardStyle}>
            <p
              className="text-[10px] uppercase tracking-wider mb-2"
              style={{ color: palette.textSecondary }}
            >
              Spacing
            </p>
            <div className="flex items-end gap-2">
              {Object.entries(tokens.spacing).map(([key, value]) => (
                <div key={key} className="flex flex-col items-center gap-1">
                  <div
                    style={{
                      width: "16px",
                      height: value,
                      minHeight: "4px",
                      backgroundColor: palette.accent,
                      opacity: 0.5,
                    }}
                  />
                  <span className="text-[10px]" style={{ color: palette.textSecondary }}>{key}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-3 rounded-md" style={cardStyle}>
            <p
              className="text-[10px] uppercase tracking-wider mb-2"
              style={{ color: palette.textSecondary }}
            >
              Radius
            </p>
            <div className="flex items-center gap-3">
              {Object.entries(tokens.radius).map(([key, value]) => (
                <div key={key} className="flex flex-col items-center gap-1">
                  <div
                    className="w-8 h-8 border-2"
                    style={{ borderRadius: value, borderColor: palette.border }}
                  />
                  <span className="text-[10px]" style={{ color: palette.textSecondary }}>{key}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: palette.textSecondary }}
        >
          Motion
        </h3>
        <div className="p-3 rounded-md" style={cardStyle}>
          <p className="text-sm" style={{ color: palette.textPrimary }}>
            Style: {tokens.motion.style}
          </p>
          <p className="text-sm mt-1" style={{ color: palette.textSecondary }}>
            Fast: {tokens.motion.durationFast} · Normal:{" "}
            {tokens.motion.durationNormal}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h3
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: palette.textSecondary }}
        >
          Components
        </h3>
        <div className="space-y-2">
          {Object.entries(components).map(([key, comp]) => (
            <div
              key={key}
              className="p-3 rounded-md"
              style={cardStyle}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-1"
                style={{ color: palette.textSecondary }}
              >
                {key}
              </p>
              <p className="text-sm" style={{ color: palette.textPrimary }}>{comp.style}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: palette.textSecondary }}
        >
          Identity
        </h3>
        <div className="p-3 rounded-md space-y-2" style={cardStyle}>
          <p className="text-sm" style={{ color: palette.textPrimary }}>{identity.summary}</p>
          <div className="flex flex-wrap gap-1.5">
            {identity.moodKeywords.map((k) => (
              <span
                key={k}
                className="px-2 py-0.5 text-[10px] uppercase tracking-wider rounded"
                style={{
                  backgroundColor: palette.backgroundSecondary,
                  color: palette.textSecondary,
                }}
              >
                {k}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
