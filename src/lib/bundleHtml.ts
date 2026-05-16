import type { Theme } from "./schema";

export function buildBundleHtml(theme: Theme): string {
  const { meta, identity, tokens } = theme;
  const dark = tokens.colorsDark ?? tokens.colors;
  const hasDarkPalette = !!tokens.colorsDark;

  const css = `
    :root {
      --bg-primary: ${tokens.colors.backgroundPrimary};
      --bg-secondary: ${tokens.colors.backgroundSecondary};
      --surface: ${tokens.colors.surface};
      --border: ${tokens.colors.border};
      --text-primary: ${tokens.colors.textPrimary};
      --text-secondary: ${tokens.colors.textSecondary};
      --accent: ${tokens.colors.accent};
      --success: ${tokens.colors.success};
      --warning: ${tokens.colors.warning};
      --danger: ${tokens.colors.danger};
      --font-display: ${tokens.typography.displayFont}, system-ui, sans-serif;
      --font-body: ${tokens.typography.bodyFont}, system-ui, sans-serif;
      --font-mono: ${tokens.typography.monoFont}, monospace;
      --space-xs: ${tokens.spacing.xs};
      --space-sm: ${tokens.spacing.sm};
      --space-md: ${tokens.spacing.md};
      --space-lg: ${tokens.spacing.lg};
      --space-xl: ${tokens.spacing.xl};
      --radius-sm: ${tokens.radius.sm};
      --radius-md: ${tokens.radius.md};
      --radius-lg: ${tokens.radius.lg};
    }
    [data-theme="dark"] {
      --bg-primary: ${dark.backgroundPrimary};
      --bg-secondary: ${dark.backgroundSecondary};
      --surface: ${dark.surface};
      --border: ${dark.border};
      --text-primary: ${dark.textPrimary};
      --text-secondary: ${dark.textSecondary};
      --accent: ${dark.accent};
      --success: ${dark.success};
      --warning: ${dark.warning};
      --danger: ${dark.danger};
    }
    @media (prefers-color-scheme: dark) {
      :root:not([data-theme="light"]) {
        --bg-primary: ${dark.backgroundPrimary};
        --bg-secondary: ${dark.backgroundSecondary};
        --surface: ${dark.surface};
        --border: ${dark.border};
        --text-primary: ${dark.textPrimary};
        --text-secondary: ${dark.textSecondary};
        --accent: ${dark.accent};
        --success: ${dark.success};
        --warning: ${dark.warning};
        --danger: ${dark.danger};
      }
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: var(--font-body);
      background: var(--bg-primary);
      color: var(--text-primary);
      line-height: 1.6;
      min-height: 100vh;
      transition: background 0.2s, color 0.2s;
    }
    .theme-bar {
      position: sticky;
      top: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--space-sm);
      padding: var(--space-sm) var(--space-xl);
      background: var(--bg-secondary);
      border-bottom: 1px solid var(--border);
      backdrop-filter: blur(8px);
    }
    .theme-bar label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-secondary);
    }
    .theme-bar button {
      padding: var(--space-xs) var(--space-sm);
      font-size: 0.75rem;
      font-family: var(--font-body);
      background: transparent;
      color: var(--text-secondary);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.15s;
    }
    .theme-bar button:hover {
      color: var(--text-primary);
      border-color: var(--text-secondary);
    }
    .theme-bar button.active {
      background: var(--accent);
      color: var(--bg-primary);
      border-color: var(--accent);
    }
    .container { max-width: 1200px; margin: 0 auto; padding: var(--space-xl); }
    header {
      border-bottom: 1px solid var(--border);
      padding-bottom: var(--space-lg);
      margin-bottom: var(--space-xl);
    }
    h1 {
      font-family: var(--font-display);
      font-size: 2.5rem;
      font-weight: 600;
      letter-spacing: ${tokens.typography.letterSpacing.display};
      margin-bottom: var(--space-sm);
    }
    h2 {
      font-family: var(--font-display);
      font-size: 1.5rem;
      font-weight: 600;
      margin: var(--space-xl) 0 var(--space-md);
      letter-spacing: ${tokens.typography.letterSpacing.display};
    }
    h3 {
      font-family: var(--font-display);
      font-size: 1rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: ${tokens.typography.letterSpacing.label};
      margin-bottom: var(--space-md);
      color: var(--text-secondary);
    }
    .subtitle { color: var(--text-secondary); font-size: 1.1rem; }
    .mood-tags {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-sm);
      margin-top: var(--space-md);
    }
    .mood-tag {
      padding: var(--space-xs) var(--space-sm);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-secondary);
    }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-lg); }
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: var(--space-lg);
    }
    .color-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: var(--space-md);
    }
    .color-swatch {
      border-radius: var(--radius-md);
      overflow: hidden;
      border: 1px solid var(--border);
    }
    .color-swatch .color-block { height: 64px; }
    .color-swatch .color-info {
      padding: var(--space-sm);
      background: var(--bg-secondary);
      font-family: var(--font-mono);
      font-size: 0.75rem;
    }
    .color-swatch .color-name {
      font-size: 0.65rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-secondary);
      margin-bottom: var(--space-xs);
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-sm) var(--space-md);
      border-radius: var(--radius-md);
      font-family: var(--font-body);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: opacity 0.15s;
      border: 1px solid transparent;
    }
    .btn:hover { opacity: 0.85; }
    .btn-primary {
      background: var(--accent);
      color: var(--text-primary);
      border-color: var(--accent);
    }
    .btn-outline {
      background: transparent;
      color: var(--text-primary);
      border-color: var(--border);
    }
    .btn-ghost {
      background: transparent;
      color: var(--text-secondary);
      border-color: transparent;
    }
    .input {
      width: 100%;
      padding: var(--space-sm) var(--space-md);
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      font-family: var(--font-body);
      font-size: 0.875rem;
    }
    .input:focus {
      outline: none;
      border-color: var(--accent);
    }
    .alert {
      padding: var(--space-md);
      border-radius: var(--radius-md);
      border: 1px solid var(--border);
      display: flex;
      align-items: flex-start;
      gap: var(--space-md);
    }
    .alert-danger {
      background: color-mix(in srgb, var(--danger) 8%, transparent);
      border-color: var(--danger);
    }
    .alert-warning {
      background: color-mix(in srgb, var(--warning) 8%, transparent);
      border-color: var(--warning);
    }
    .alert-success {
      background: color-mix(in srgb, var(--success) 8%, transparent);
      border-color: var(--success);
    }
    .typo-sample {
      margin-bottom: var(--space-md);
      padding-bottom: var(--space-md);
      border-bottom: 1px solid var(--border);
    }
    .typo-sample:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
    .typo-label {
      font-size: 0.65rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--text-secondary);
      margin-bottom: var(--space-xs);
    }
    .display-lg { font-family: var(--font-display); font-size: 2rem; font-weight: 600; }
    .display-md { font-family: var(--font-display); font-size: 1.5rem; font-weight: 600; }
    .body-lg { font-family: var(--font-body); font-size: 1rem; }
    .body-sm { font-family: var(--font-body); font-size: 0.875rem; color: var(--text-secondary); }
    .mono { font-family: var(--font-mono); font-size: 0.875rem; }
    .component-row {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-md);
      align-items: center;
    }
    footer {
      margin-top: var(--space-xl);
      padding-top: var(--space-lg);
      border-top: 1px solid var(--border);
      text-align: center;
      font-size: 0.75rem;
      color: var(--text-secondary);
    }
    .spacing-demo {
      display: flex;
      align-items: flex-end;
      gap: var(--space-md);
    }
    .spacing-block {
      background: var(--accent);
      opacity: 0.5;
      width: 24px;
    }
    .principles {
      list-style: none;
      padding: 0;
    }
    .principles li {
      padding: var(--space-sm) 0;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      gap: var(--space-sm);
    }
    .principles li::before {
      content: "";
      width: 6px;
      height: 6px;
      background: var(--accent);
      border-radius: 50%;
      flex-shrink: 0;
    }
    .principles li:last-child { border-bottom: none; }
    .legacy-note {
      font-size: 0.7rem;
      color: var(--text-secondary);
      padding: var(--space-xs) var(--space-sm);
      background: color-mix(in srgb, var(--warning) 8%, transparent);
      border: 1px solid var(--warning);
      border-radius: var(--radius-sm);
      margin-top: var(--space-sm);
    }
  `.trim();

  const colors = Object.entries(tokens.colors)
    .map(
      ([name, value]) => `
        <div class="color-swatch">
          <div class="color-block" style="background:${value}"></div>
          <div class="color-info">
            <div class="color-name">${name.replace(/([A-Z])/g, " $1").trim()}</div>
            <div>${value}</div>
          </div>
        </div>`
    )
    .join("");

  const darkColors = hasDarkPalette
    ? Object.entries(dark)
        .map(
          ([name, value]) => `
            <div class="color-swatch">
              <div class="color-block" style="background:${value}"></div>
              <div class="color-info">
                <div class="color-name">${name.replace(/([A-Z])/g, " $1").trim()}</div>
                <div>${value}</div>
              </div>
            </div>`
        )
        .join("")
    : "";

  const principles = identity.designPrinciples
    .map((p) => `<li>${p}</li>`)
    .join("");

  const moodTags = identity.moodKeywords
    .map((k) => `<span class="mood-tag">${k}</span>`)
    .join("");

  const legacyNote = !hasDarkPalette
    ? `<div class="legacy-note">Dark palette not available for this legacy theme. Dark mode uses the light palette as a fallback.</div>`
    : "";

  const darkPaletteSection = hasDarkPalette
    ? `
  <h2>Dark Color Palette</h2>
  <div class="color-grid">${darkColors}</div>`
    : "";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(meta.name)} — Design System Demo</title>
<style>${css}</style>
</head>
<body>
<div class="theme-bar">
  <label>Theme</label>
  <button id="btn-light" onclick="setTheme('light')">Light</button>
  <button id="btn-dark" onclick="setTheme('dark')">Dark</button>
  <button id="btn-auto" onclick="setTheme('auto')">Auto</button>
</div>
<div class="container">
  <header>
    <h1>${escapeHtml(meta.name)}</h1>
    <p class="subtitle">${escapeHtml(identity.summary)}</p>
    <div class="mood-tags">${moodTags}</div>
    ${legacyNote}
  </header>

  <h2>Color Palette</h2>
  <div class="color-grid">${colors}</div>
  ${darkPaletteSection}

  <h2>Typography</h2>
  <div class="grid">
    <div class="card">
      <div class="typo-sample">
        <div class="typo-label">Display</div>
        <div class="display-lg">${escapeHtml(tokens.typography.displayFont)}</div>
        <div class="body-sm" style="margin-top:var(--space-sm)">Letter spacing: ${tokens.typography.letterSpacing.display}</div>
      </div>
      <div class="typo-sample">
        <div class="typo-label">Body</div>
        <div class="body-lg">${escapeHtml(tokens.typography.bodyFont)}</div>
      </div>
      <div class="typo-sample">
        <div class="typo-label">Mono</div>
        <div class="mono">${escapeHtml(tokens.typography.monoFont)}</div>
      </div>
    </div>
    <div class="card">
      <div class="typo-sample">
        <div class="typo-label">Display Large</div>
        <div class="display-lg">The quick brown fox</div>
      </div>
      <div class="typo-sample">
        <div class="typo-label">Display Medium</div>
        <div class="display-md">jumps over the lazy dog</div>
      </div>
      <div class="typo-sample">
        <div class="typo-label">Body / Mono</div>
        <div class="mono">0123 ABCD abcd !@#$</div>
      </div>
    </div>
  </div>

  <h2>Spacing</h2>
  <div class="card">
    <div class="spacing-demo">
      ${Object.entries(tokens.spacing)
        .map(
          ([key, value]) =>
            `<div style="text-align:center"><div class="spacing-block" style="height:${value}"></div><div class="typo-label" style="margin-top:var(--space-sm)">${key}</div></div>`
        )
        .join("")}
    </div>
  </div>

  <h2>Components</h2>
  <div class="grid">
    <div class="card">
      <h3>Buttons</h3>
      <div class="component-row">
        <button class="btn btn-primary">Primary</button>
        <button class="btn btn-outline">Outline</button>
        <button class="btn btn-ghost">Ghost</button>
      </div>
    </div>
    <div class="card">
      <h3>Form Controls</h3>
      <div style="display:flex;flex-direction:column;gap:var(--space-md)">
        <input class="input" type="text" placeholder="Enter text...">
        <input class="input" type="text" value="Focused" style="border-color:var(--accent)">
      </div>
    </div>
    <div class="card">
      <h3>Alerts</h3>
      <div style="display:flex;flex-direction:column;gap:var(--space-md)">
        <div class="alert alert-success">
          <strong>Success</strong> — Operation completed successfully.
        </div>
        <div class="alert alert-warning">
          <strong>Warning</strong> — Please review your input.
        </div>
        <div class="alert alert-danger">
          <strong>Error</strong> — Something went wrong.
        </div>
      </div>
    </div>
    <div class="card">
      <h3>Cards</h3>
      <p class="body-sm">This card demonstrates the surface color, border radius, and border styling from the generated theme.</p>
      <div style="margin-top:var(--space-md)" class="component-row">
        <button class="btn btn-primary">Action</button>
        <button class="btn btn-outline">Cancel</button>
      </div>
    </div>
  </div>

  <h2>Design Principles</h2>
  <div class="card">
    <ul class="principles">${principles}</ul>
  </div>

  <footer>
    <p>Generated by ThemeForge BYOK · ${escapeHtml(meta.name)} v${escapeHtml(meta.version)}</p>
    <p style="margin-top:var(--space-sm)">${escapeHtml(identity.moodKeywords.join(" · "))}</p>
  </footer>
</div>
<script>
  (function() {
    const root = document.documentElement;
    const stored = localStorage.getItem('themeforge-demo-theme');
    function setTheme(mode) {
      if (mode === 'auto') {
        root.removeAttribute('data-theme');
        localStorage.removeItem('themeforge-demo-theme');
      } else {
        root.setAttribute('data-theme', mode);
        localStorage.setItem('themeforge-demo-theme', mode);
      }
      updateButtons(mode);
    }
    function updateButtons(mode) {
      document.getElementById('btn-light').classList.toggle('active', mode === 'light');
      document.getElementById('btn-dark').classList.toggle('active', mode === 'dark');
      document.getElementById('btn-auto').classList.toggle('active', mode === 'auto');
    }
    window.setTheme = setTheme;
    setTheme(stored || 'auto');
  })();
</script>
</body>
</html>`;

  return html;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
