export function parseAIError(err: unknown): string {
  if (err instanceof Error) {
    // AI SDK errors often have a data property with the API response
    const data = (err as unknown as Record<string, unknown>).data;
    if (data && typeof data === "object") {
      const errorData = (data as Record<string, unknown>).error;
      if (errorData && typeof errorData === "object") {
        const msg = (errorData as Record<string, unknown>).message;
        if (typeof msg === "string") return msg;
      }
      const msg = (data as Record<string, unknown>).message;
      if (typeof msg === "string") return msg;
    }
    return err.message;
  }
  return "An unknown error occurred";
}
