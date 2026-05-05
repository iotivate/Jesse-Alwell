"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";

export default function StudioPage() {
  if (!projectId) return <SetupScreen />;
  return <NextStudio config={config} />;
}

function SetupScreen() {
  return (
    <div
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0c0a08",
        color: "#f5f1ea",
        fontFamily: "system-ui, sans-serif",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: 640 }}>
        <p
          style={{
            fontSize: 12,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#e3a06b",
            marginBottom: 16,
          }}
        >
          Studio · Setup Needed
        </p>
        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: 600,
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Sanity isn&apos;t connected yet.
        </h1>
        <p style={{ opacity: 0.75, lineHeight: 1.6, marginBottom: 24 }}>
          The Studio loads from a Sanity project that hasn&apos;t been created
          yet. Run the steps below in your terminal, restart the dev server,
          and refresh this page.
        </p>
        <ol
          style={{
            paddingLeft: "1.25rem",
            lineHeight: 1.7,
            fontSize: 14,
            opacity: 0.85,
          }}
        >
          <li>
            <code style={code}>npx sanity@latest init --env .env.local</code>
            <br />
            <span style={{ opacity: 0.65 }}>
              Create a free Sanity account, give the project a name, choose
              &quot;production&quot; dataset.
            </span>
          </li>
          <li style={{ marginTop: 12 }}>
            Add a write token in the Sanity dashboard (API → Tokens, Editor
            scope) → paste into <code style={code}>.env.local</code> as{" "}
            <code style={code}>SANITY_WRITE_TOKEN</code>.
          </li>
          <li style={{ marginTop: 12 }}>
            <code style={code}>npm run seed</code>
            <br />
            <span style={{ opacity: 0.65 }}>
              Pushes the placeholder works/collections/press into your dataset.
            </span>
          </li>
          <li style={{ marginTop: 12 }}>
            Stop and restart <code style={code}>npm run dev</code>, then
            refresh this page.
          </li>
        </ol>
      </div>
    </div>
  );
}

const code: React.CSSProperties = {
  fontFamily: "ui-monospace, monospace",
  fontSize: 13,
  backgroundColor: "rgba(245,241,234,0.08)",
  padding: "2px 6px",
  borderRadius: 3,
};
