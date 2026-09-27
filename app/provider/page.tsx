"use client";

import { useState } from "react";

type JobState = "offline" | "available" | "alert" | "accepted" | "on-my-way" | "arrived" | "picked-up" | "dropped-off";

export default function ProviderPage() {
  const [state, setState] = useState<JobState>("offline");

  const nextAction = {
    accepted: "On my way",
    "on-my-way": "Arrived",
    arrived: "Picked up",
    "picked-up": "Dropped off",
  }[state];

  function advanceJob() {
    if (state === "accepted") setState("on-my-way");
    if (state === "on-my-way") setState("arrived");
    if (state === "arrived") setState("picked-up");
    if (state === "picked-up") setState("dropped-off");
  }

  return (
    <main className="provider-app">
      <header className="provider-topbar">
        <a href="/" className="provider-brand">
          <span>⚡</span>
          <div>
            <strong>RISE HIGH TOWING</strong>
            <small>Provider portal</small>
          </div>
        </a>

        <span className="verified">Approved provider</span>
      </header>

      <section className="provider-shell">
        {state === "offline" && (
          <div className="empty-state">
            <p className="eyebrow">YOU ARE OFFLINE</p>
            <h1>Ready to take towing jobs?</h1>
            <p>
              When available, you only receive private alerts that match your approved
              service area and equipment.
            </p>
            <button className="primary" onClick={() => setState("available")}>
              Go available
            </button>
          </div>
        )}

        {state === "available" && (
          <div className="empty-state">
            <p className="eyebrow">YOU ARE AVAILABLE</p>
            <h1>Waiting for a matching tow request.</h1>
            <p>
              You will see the payout, vehicle type, pickup area, and drop-off area
              before accepting any job.
            </p>
            <button className="primary" onClick={() => setState("alert")}>
              Preview new job alert
            </button>
            <button className="text-button" onClick={() => setState("offline")}>
              Go offline
            </button>
          </div>
        )}

        {state === "alert" && (
          <section className="job-alert">
            <p className="eyebrow">NEW TOW REQUEST</p>
            <h1>Garland service area</h1>

            <div className="job-grid">
              <Info label="Pickup" value="2.1 miles away" />
              <Info label="Drop-off" value="Garland service area" />
              <Info label="Vehicle" value="Passenger car, rolls and steers" />
              <Info label="Your payout" value="$119.00" emphasis />
            </div>

            <p className="notice">
              The customer approved a $139 tow and paid a booking deposit. The remaining
              balance is charged when you arrive.
            </p>

            <button className="primary" onClick={() => setState("accepted")}>
              Accept job
            </button>
          </section>
        )}

        {(state === "accepted" ||
          state === "on-my-way" ||
          state === "arrived" ||
          state === "picked-up") && (
          <section className="active-job">
            <div className="active-job-top">
              <div>
                <p className="eyebrow">ACTIVE TOW</p>
                <h1>
                  {state === "accepted" && "Job accepted"}
                  {state === "on-my-way" && "On your way"}
                  {state === "arrived" && "You have arrived"}
                  {state === "picked-up" && "Vehicle picked up"}
                </h1>
              </div>
              <span className="payout">Payout $119</span>
            </div>

            <div className="route-card">
              <div>
                <span className="route-label">Pickup</span>
                <strong>1234 Main Street, Garland, TX</strong>
              </div>
              <div className="route-line" />
              <div>
                <span className="route-label">Drop-off</span>
                <strong>5678 Service Road, Garland, TX</strong>
              </div>
            </div>

            {state === "on-my-way" && (
              <p className="tracking-note">
                Customer can see your en-route location until you mark Arrived.
              </p>
            )}

            {state === "arrived" && (
              <p className="tracking-note">
                Customer location tracking has stopped. The remaining customer balance is now charged.
              </p>
            )}

            {state === "picked-up" && (
              <p className="tracking-note">
                Customer sees: “Your vehicle is being transported.” Your live location is not shared.
              </p>
            )}

            <button className="primary next-action" onClick={advanceJob}>
              {nextAction}
            </button>
          </section>
        )}

        {state === "dropped-off" && (
          <div className="empty-state complete">
            <span className="bolt">⚡</span>
            <p className="eyebrow">TOW COMPLETED</p>
            <h1>Job closed.</h1>
            <p>
              The customer can now leave a review. Customer location and conversation access are closed for this completed job.
            </p>
            <button className="primary" onClick={() => setState("available")}>
              Return to available
            </button>
          </div>
        )}
      </section>

      <style jsx global>{`
        :root {
          --navy: #142e48;
          --orange: #ff7024;
          --cream: #f4ede2;
          --surface: #fffaf3;
          --muted: #60717f;
          --line: #d8cbbb;
        }
        * { box-sizing: border-box; }
        body {
          margin: 0;
          background: var(--cream);
          color: var(--navy);
          font-family: "Avenir Next", Avenir, Helvetica, sans-serif;
        }
        button { font: inherit; }
        .provider-app { min-height: 100vh; padding: 28px; }
        .provider-topbar {
          max-width: 880px;
          margin: auto;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--line);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .provider-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: var(--navy);
        }
        .provider-brand > span, .bolt {
          color: var(--orange);
          font-size: 32px;
        }
        .provider-brand strong, .provider-brand small { display: block; }
        .provider-brand strong { font-size: 15px; letter-spacing: .04em; }
        .provider-brand small {
          color: var(--muted);
          text-transform: uppercase;
          font-weight: 800;
          font-size: 11px;
          letter-spacing: .08em;
        }
        .verified {
          background: #dff2e6;
          color: #17653a;
          padding: 9px 11px;
          font-size: 12px;
          font-weight: 800;
        }
        .provider-shell {
          max-width: 880px;
          margin: 72px auto;
        }
        .empty-state, .job-alert, .active-job {
          background: var(--surface);
          border: 1px solid var(--line);
          padding: 46px;
          box-shadow: 10px 10px 0 #c6bbae;
        }
        .empty-state { max-width: 650px; }
        .eyebrow {
          color: #dc581b;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .12em;
          margin: 0 0 14px;
        }
        h1 {
          margin: 0;
          font-size: clamp(36px, 6vw, 58px);
          line-height: .98;
          letter-spacing: -.05em;
        }
        p:not(.eyebrow) {
          color: var(--muted);
          max-width: 58ch;
          font-size: 18px;
          line-height: 1.55;
        }
        .primary {
          display: block;
          border: 2px solid var(--navy);
          background: var(--orange);
          color: #fffaf3;
          font-weight: 850;
          padding: 16px 22px;
          box-shadow: 5px 5px 0 var(--navy);
          cursor: pointer;
          margin-top: 28px;
        }
        .text-button {
          border: 0;
          color: var(--navy);
          background: transparent;
          font-weight: 800;
          margin-top: 25px;
          padding: 0;
          cursor: pointer;
        }
        .job-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: var(--line);
          border: 1px solid var(--line);
          margin: 32px 0 24px;
        }
        .info {
          background: #fffdf8;
          min-height: 108px;
          padding: 18px;
        }
        .info span {
          color: var(--muted);
          font-size: 13px;
          display: block;
          margin-bottom: 8px;
        }
        .info strong { font-size: 17px; line-height: 1.35; }
        .info.emphasis strong { color: #d65318; font-size: 24px; }
        .notice, .tracking-note {
          background: #fff0e7;
          color: #884018 !important;
          padding: 16px;
          font-size: 15px !important;
          font-weight: 700;
        }
        .active-job-top {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          align-items: flex-start;
        }
        .payout {
          background: var(--navy);
          color: #fffaf3;
          padding: 12px;
          font-weight: 850;
          white-space: nowrap;
        }
        .route-card {
          background: var(--navy);
          color: #fffaf3;
          margin: 32px 0 20px;
          padding: 24px;
        }
        .route-card div:not(.route-line) {
          display: grid;
          gap: 7px;
        }
        .route-label {
          color: #ffa273;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .1em;
        }
        .route-line {
          width: 1px;
          height: 25px;
          background: #7190a6;
          margin: 12px 0 12px 7px;
        }
        .next-action { margin-left: auto; }
        .complete { text-align: center; margin: auto; }
        .complete p { margin-left: auto; margin-right: auto; }
        @media (max-width: 640px) {
          .provider-app { padding: 18px; }
          .provider-shell { margin: 44px auto; }
          .empty-state, .job-alert, .active-job { padding: 30px 22px; box-shadow: 7px 7px 0 #c6bbae; }
          .job-grid { grid-template-columns: 1fr; }
          .active-job-top { display: grid; }
          .next-action { margin-left: 0; }
          .verified { font-size: 10px; }
        }
      `}</style>
    </main>
  );
}

function Info({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className={`info ${emphasis ? "emphasis" : ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
