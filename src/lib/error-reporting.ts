type ErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

type HostErrorEvents = {
  captureException?: (
    error: unknown,
    context?: Record<string, unknown>,
    options?: ErrorOptions,
  ) => void;
};

// Runtime host hook — key name is a contract with the preview runtime and
// must remain unchanged for error reporting to work.
const HOST_EVENTS_KEY = "__lovableEvents" as const;

declare global {
  interface Window {
    [HOST_EVENTS_KEY]?: HostErrorEvents;
  }
}

export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window[HOST_EVENTS_KEY]?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context,
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error",
    },
  );
}
