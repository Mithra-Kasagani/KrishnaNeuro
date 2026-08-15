"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-IN">
      <body style={{ margin: 0, minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, fontFamily: "system-ui, sans-serif", background: "#f8fafc", color: "#1e293b" }}>
        <main style={{ maxWidth: 560, textAlign: "center" }}>
          <p style={{ color: "#0f4c81", fontWeight: 800 }}>Krishna Neuro Psychiatric Centre</p>
          <h1 style={{ fontSize: 42, lineHeight: 1.1 }}>We could not load the website.</h1>
          <p style={{ lineHeight: 1.7, color: "#526278" }}>Please try again. For voice calls use 81217 43999; for WhatsApp appointment messages use +91 81257 43999. For immediate danger in India, call 112.</p>
          <button onClick={reset} style={{ marginTop: 20, border: 0, borderRadius: 999, background: "#0f4c81", color: "white", padding: "13px 22px", fontWeight: 800, cursor: "pointer" }}>Try again</button>
        </main>
      </body>
    </html>
  );
}
