import { useState } from "react";
import { marked } from "marked";
import { Copy, Check, FileText } from "lucide-react";

export default function DesignMdView({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);
  const [raw, setRaw] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const html = marked.parse(content, { async: false }) as string;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setRaw(false)}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
              !raw
                ? "bg-neutral-800 text-white"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setRaw(true)}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
              raw
                ? "bg-neutral-800 text-white"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
          >
            Raw
          </button>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-md transition-colors"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {raw ? (
        <pre className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg overflow-auto text-sm leading-relaxed font-mono text-neutral-300 whitespace-pre-wrap">
          {content}
        </pre>
      ) : (
        <div
          className="prose prose-invert prose-sm max-w-none p-4 bg-neutral-950 border border-neutral-800 rounded-lg prose-headings:text-white prose-headings:font-semibold prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-white prose-code:text-amber-400 prose-code:bg-neutral-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  );
}
