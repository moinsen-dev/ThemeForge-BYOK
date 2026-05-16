import type { Theme } from "./schema";

export function downloadFile(
  content: string | Blob,
  filename: string,
  mime: string
): void {
  const blob =
    typeof content === "string"
      ? new Blob([content], { type: mime })
      : content;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadThemeJson(theme: Theme): void {
  const content = JSON.stringify(theme, null, 2);
  downloadFile(content, "theme.json", "application/json");
}

export function downloadDesignMd(designMd: string): void {
  downloadFile(designMd, "DESIGN.md", "text/markdown");
}

export function downloadPrompt(theme: Theme): void {
  downloadFile(theme.imagePrompt.positive, "prompt.txt", "text/plain");
}

export function downloadImage(dataUrl: string, filename = "image.png"): void {
  fetch(dataUrl)
    .then((res) => res.blob())
    .then((blob) => downloadFile(blob, filename, blob.type || "image/png"));
}

export async function buildZip(
  theme: Theme,
  imageDataUrl: string | null,
  designMd: string
): Promise<Blob> {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();

  zip.file("theme.json", JSON.stringify(theme, null, 2));
  zip.file("DESIGN.md", designMd);
  zip.file("prompt.txt", theme.imagePrompt.positive);

  if (imageDataUrl) {
    const base64 = imageDataUrl.split(",")[1];
    if (base64) {
      zip.file("image.png", base64, { base64: true });
    }
  }

  return zip.generateAsync({ type: "blob" });
}
