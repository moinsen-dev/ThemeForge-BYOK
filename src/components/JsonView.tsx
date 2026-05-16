import { useState } from "react";
import { Copy, Check } from "lucide-react";

function syntaxHighlight(json: string): string {
  return json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?)/g,
      (match) => {
        let cls = "text-sky-400";
        if (/:$/.test(match)) {
          cls = "text-amber-400";
        }
        return `<span class="${cls}">${match}</span>`;
      }
    )
    .replace(/\b(true|false)\b/g, '<span class="text-purple-400">$1</span>')
    .replace(/\b(null)\b/g, '<span class="text-neutral-500">$1</span>')
    .replace(/\b(\d+(\.\d+)?)\b/g, '<span class="text-emerald-400">$1</span>');
}

export default function JsonView({ json }: { json: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-md transition-colors"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
        {copied ? "Copied" : "Copy"}
      </button>
      <pre
        className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg overflow-auto text-sm leading-relaxed font-mono"
        dangerouslySetInnerHTML={{ __html: syntaxHighlight(json) }}
      />
    </div>
  );
}
