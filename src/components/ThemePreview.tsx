import type { Theme } from "@/lib/schema";

export default function ThemePreview({
  theme,
  imageUrl,
}: {
  theme: Theme;
  imageUrl: string | null;
}) {
  const { tokens, identity, components } = theme;

  const colorEntries = Object.entries(tokens.colors);

  return (
    <div className="space-y-8">
      {imageUrl && (
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Showcase Board
          </h3>
          <div className="border border-neutral-800 rounded-lg overflow-hidden bg-neutral-900">
            <img
              src={imageUrl}
              alt="Design system showcase"
              className="w-full h-auto"
            />
          </div>
        </div>
      )}

      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Color Palette
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {colorEntries.map(([name, value]) => (
            <div
              key={name}
              className="group rounded-md border border-neutral-800 overflow-hidden"
            >
              <div
                className="h-16 w-full"
                style={{ backgroundColor: value }}
              />
              <div className="px-2 py-1.5 bg-neutral-900">
                <p className="text-[10px] uppercase tracking-wider text-neutral-500 truncate">
                  {name.replace(/([A-Z])/g, " $1").trim()}
                </p>
                <p className="text-xs font-mono text-neutral-300">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Typography
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 border border-neutral-800 rounded-md bg-neutral-900">
            <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-1">
              Display
            </p>
            <p
              className="text-lg"
              style={{ fontFamily: tokens.typography.displayFont }}
            >
              Aa
            </p>
            <p className="text-xs text-neutral-400 mt-1">
              {tokens.typography.displayFont}
            </p>
          </div>
          <div className="p-3 border border-neutral-800 rounded-md bg-neutral-900">
            <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-1">
              Body
            </p>
            <p
              className="text-sm"
              style={{ fontFamily: tokens.typography.bodyFont }}
            >
              The quick brown fox
            </p>
            <p className="text-xs text-neutral-400 mt-1">
              {tokens.typography.bodyFont}
            </p>
          </div>
          <div className="p-3 border border-neutral-800 rounded-md bg-neutral-900">
            <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-1">
              Mono
            </p>
            <p
              className="text-sm font-mono"
              style={{ fontFamily: tokens.typography.monoFont }}
            >
              console.log("ok")
            </p>
            <p className="text-xs text-neutral-400 mt-1">
              {tokens.typography.monoFont}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Spacing & Radius
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 border border-neutral-800 rounded-md bg-neutral-900">
            <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-2">
              Spacing
            </p>
            <div className="flex items-end gap-2">
              {Object.entries(tokens.spacing).map(([key, value]) => (
                <div key={key} className="flex flex-col items-center gap-1">
                  <div
                    className="bg-neutral-700"
                    style={{
                      width: "16px",
                      height: value,
                      minHeight: "4px",
                    }}
                  />
                  <span className="text-[10px] text-neutral-500">{key}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-3 border border-neutral-800 rounded-md bg-neutral-900">
            <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-2">
              Radius
            </p>
            <div className="flex items-center gap-3">
              {Object.entries(tokens.radius).map(([key, value]) => (
                <div key={key} className="flex flex-col items-center gap-1">
                  <div
                    className="w-8 h-8 border-2 border-neutral-600"
                    style={{ borderRadius: value }}
                  />
                  <span className="text-[10px] text-neutral-500">{key}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Motion
        </h3>
        <div className="p-3 border border-neutral-800 rounded-md bg-neutral-900">
          <p className="text-sm text-neutral-300">
            Style: {tokens.motion.style}
          </p>
          <p className="text-sm text-neutral-400 mt-1">
            Fast: {tokens.motion.durationFast} · Normal:{" "}
            {tokens.motion.durationNormal}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Components
        </h3>
        <div className="space-y-2">
          {Object.entries(components).map(([key, comp]) => (
            <div
              key={key}
              className="p-3 border border-neutral-800 rounded-md bg-neutral-900"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                {key}
              </p>
              <p className="text-sm text-neutral-300">{comp.style}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Identity
        </h3>
        <div className="p-3 border border-neutral-800 rounded-md bg-neutral-900 space-y-2">
          <p className="text-sm text-neutral-300">{identity.summary}</p>
          <div className="flex flex-wrap gap-1.5">
            {identity.moodKeywords.map((k) => (
              <span
                key={k}
                className="px-2 py-0.5 text-[10px] uppercase tracking-wider bg-neutral-800 text-neutral-400 rounded"
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
