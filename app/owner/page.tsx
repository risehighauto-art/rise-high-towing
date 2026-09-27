"use client";

import { useState } from "react";

type ReviewStatus = "pending" | "approved" | "needs-info";

export default function OwnerDashboard() {
  const [status, setStatus] = useState<ReviewStatus>("pending");

  const statusText = {
    pending: "Pending owner review",
    approved: "Approved and eligible for alerts",
    "needs-info": "Waiting for provider information",
  }[status];

  return (
    <main className="owner-page">
      <header className="owner-header">
        <div className="owner-brand">
          <span>⚡</span>
          <div>
            <strong>RISE HIGH TOWING</strong>
            <small>Owner dashboard</small>
          </div>
        </div>
        <div className="secure">Secure-link owner access</div>
      </header>

      <section className="owner-intro">
        <p className="eyebrow">OWNER CONTROL CENTER</p>
        <h1>Keep every tow provider verified.</h1>
        <p>
          Providers cannot receive a tow alert until you approve their license,
          vehicle permit, driver eligibility, and coverage.
        </p>
      </section>

      <section className="metrics">
        <div className="metric">
          <span>New tow requests</span>
          <strong>0</strong>
        </div>
        <div className="metric highlight">
          <span>Provider applications</span>
          <strong>1</strong>
        </div>
        <div className="metric">
          <span>Available providers</span>
          <strong>{status === "approved" ? "1" : "0"}</strong>
        </div>
        <div className="metric">
          <span>Completed tows</span>
          <strong>0</strong>
        </div>
      </section>

      <section className="review-layout">
        <article className="application">
          <div className="application-top">
            <div>
              <p className="eyebrow">PROVIDER APPLICATION</p>
              <h2>Garland Tow & Transport</h2>
              <p className="muted">Submitted today, Garland service area</p>
            </div>
            <span className={`status ${status}`}>{statusText}</span>
          </div>

          <div className="checklist">
            <Check label="Texas towing-company license" value="TDLR #123456" />
            <Check label="Consent Tow Operator license" value="Driver verified" />
            <Check label="Tow vehicle and consent-tow permit" value="Vehicle submitted" />
            <Check label="Commercial towing liability" value="$300,000 minimum confirmed" />
            <Check label="On-hook or cargo coverage" value="$50,000 confirmed" />
            <Check label="Equipment photos and capacity" value="Submitted" />
            <Check label="Service area" value="Garland service area" />
          </div>

          {status === "pending" && (
            <div className="owner-actions">
              <button className="needs-info" onClick={() => setStatus("needs-info")}>
                Request missing information
              </button>
              <button className="approve" onClick={() => setStatus("approved")}>
                Approve provider
              </button>
            </div>
          )}

          {status === "needs-info" && (
            <div className="notice">
              Provider is paused. They cannot receive job alerts until the requested
              information is submitted and reviewed.
            </div>
          )}

          {status === "approved" && (
            <div className="notice approved-notice">
              Provider is active. They may receive private tow alerts for their
              approved service area and equipment type.
            </div>
          )}
        </article>

        <aside className="dispatch-card">
          <p className="eyebrow">DISPATCH RULE</p>
          <h2>Who receives an alert?</h2>
          <ul>
            <li>Only owner-approved providers</li>
            <li>Only providers marked available</li>
            <li>Only matching service area and equipment</li>
            <li>First accepted provider receives the job</li>
          </ul>
          <p className="muted">
            Customer payment remains pending until the provider marks Arrived.
          </p>
        </aside>
      </section>

      <style jsx global>{`
        * { box-sizing: border-box; }
        body {
          margin: 0;
          background: #f4ede2;
          color: #142e48;
          font-family: Arial, sans-serif;
        }
        .owner-page {
          max-width: 1180px;
          margin: auto;
          padding: 26px;
        }
        .owner-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #d7cbb9;
          padding-bottom: 20px;
        }
        .owner-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .owner-brand > span {
          font-size: 31px;
          color: #ff7024;
        }
        .owner-brand strong, .owner-brand small {
          display: block;
        }
        .owner-brand strong {
          letter-spacing: .04em;
          font-size: 15px;
        }
        .owner-brand small, .muted {
          color: #617180;
        }
        .secure {
          background: #142e48;
          color: white;
          padding: 10px 13px;
          font-size: 12px;
          font-weight: 800;
        }
        .owner-intro {
          max-width: 700px;
          margin: 58px 0 34px;
        }
        .eyebrow {
          color: #e85e1c;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .12em;
          margin: 0 0 10px;
        }
        h1 {
          font-size: clamp(36px, 6vw, 64px);
          line-height: .98;
          margin: 0 0 18px;
        }
        h2 { margin: 0 0 10px; }
        .owner-intro p:not(.eyebrow) {
          color: #526574;
          font-size: 18px;
          line-height: 1.5;
        }
        .metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 28px;
        }
        .metric {
          padding: 20px;
          background: #fffaf3;
          border: 1px solid #d7cbb9;
        }
        .metric span {
          display: block;
          color: #617180;
          font-size: 14px;
        }
        .metric strong {
          display: block;
          font-size: 34px;
          margin-top: 10px;
        }
        .metric.highlight {
          border: 2px solid #ff7024;
        }
        .review-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.55fr) minmax(280px, .8fr);
          gap: 22px;
          align-items: start;
        }
        .application, .dispatch-card {
          background: #fffaf3;
          border: 1px solid #d7cbb9;
          padding: 30px;
        }
        .application-top {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          border-bottom: 1px solid #d7cbb9;
          padding-bottom: 20px;
        }
        .status {
          align-self: start;
          padding: 9px 11px;
          font-size: 12px;
          font-weight: 800;
          white-space: nowrap;
        }
        .status.pending { background: #fff0d5; color: #875200; }
        .status.approved { background: #dff3e6; color: #17653a; }
        .status.needs-info { background: #fde4dc; color: #9b3211; }
        .checklist {
          display: grid;
          gap: 13px;
          padding: 24px 0;
        }
        .check {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }
        .check-icon {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          background: #dff3e6;
          color: #17653a;
          font-weight: 900;
        }
        .check strong, .check span { display: block; }
        .check span { color: #617180; margin-top: 3px; font-size: 14px; }
        .owner-actions {
          display: flex;
          justify-content: flex-end;
          flex-wrap: wrap;
          gap: 12px;
          padding-top: 20px;
          border-top: 1px solid #d7cbb9;
        }
        button {
          padding: 14px 17px;
          border: 2px solid #142e48;
          font-weight: 800;
          cursor: pointer;
          font: inherit;
        }
        .needs-info { background: transparent; color: #142e48; }
        .approve {
          background: #ff7024;
          color: white;
          box-shadow: 4px 4px 0 #142e48;
        }
        .notice {
          background: #fde4dc;
          color: #7b2e10;
          padding: 16px;
          line-height: 1.45;
          font-weight: 700;
        }
        .approved-notice {
          background: #dff3e6;
          color: #17653a;
        }
        .dispatch-card {
          background: #142e48;
          color: white;
          box-shadow: 8px 8px 0 #b8b0a5;
        }
        .dispatch-card .eyebrow { color: #ff9a61; }
        .dispatch-card h2 { font-size: 27px; }
        .dispatch-card ul {
          padding-left: 21px;
          line-height: 1.55;
        }
        .dispatch-card .muted { color: #cfdae2; }
        @media (max-width: 800px) {
          .metrics { grid-template-columns: repeat(2, 1fr); }
          .review-layout { grid-template-columns: 1fr; }
        }
        @media (max-width: 520px) {
          .owner-page { padding: 18px; }
          .secure { display: none; }
          .metrics { gap: 10px; }
          .application, .dispatch-card { padding: 22px; }
          .application-top { flex-direction: column; }
        }
      `}</style>
    </main>
  );
}

function Check({ label, value }: { label: string; value: string }) {
  return (
    <div className="check">
      <span className="check-icon">✓</span>
      <div>
        <strong>{label}</strong>
        <span>{value}</span>
      </div>
    </div>
  );
}
