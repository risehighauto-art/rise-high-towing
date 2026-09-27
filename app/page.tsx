"use client";

import { FormEvent, useMemo, useState } from "react";

type Area = "local" | "adjacent";
type Vehicle = "Car" | "SUV" | "Pickup";
type Condition = "Rolls" | "Does not roll";
type Screen = "home" | "request" | "review" | "success" | "provider";

const pricing = {
  local: {
    label: "Local service area",
    total: 139,
    miles: "Up to 7 loaded miles",
    payout: 119,
    platform: 20,
  },
  adjacent: {
    label: "Adjacent service area",
    total: 179,
    miles: "Up to 15 loaded miles",
    payout: 154,
    platform: 25,
  },
};

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [area, setArea] = useState<Area>("local");
  const [vehicle, setVehicle] = useState<Vehicle>("Car");
  const [condition, setCondition] = useState<Condition>("Rolls");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [providerAvailable, setProviderAvailable] = useState(true);
  const [jobAccepted, setJobAccepted] = useState(false);

  const quote = useMemo(() => pricing[area], [area]);
  const needsReview = condition === "Does not roll";

  function startRequest() {
    setScreen("request");
  }

  function reviewRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!pickup.trim() || !destination.trim()) {
      return;
    }

    setScreen("review");
  }

  function submitRequest() {
    setScreen("success");
  }

  return (
    <main className="rt-app">
      <style jsx global>{`
        :root {
          --ink: #0b1420;
          --navy: #102b46;
          --orange: #f26a21;
          --cream: #f7f1e8;
          --paper: #fffdf9;
          --slate: #526170;
          --line: #d9d5ce;
          --success: #176b4a;
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: var(--cream);
          color: var(--ink);
          font-family: Arial, Helvetica, sans-serif;
        }

        button,
        input {
          font: inherit;
        }

        button {
          cursor: pointer;
        }

        .rt-app {
          min-height: 100vh;
          background:
            radial-gradient(circle at 92% 6%, rgba(242, 106, 33, 0.15), transparent 24rem),
            var(--cream);
        }

        .rt-shell {
          width: min(1120px, calc(100% - 32px));
          margin: 0 auto;
        }

        .rt-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          min-height: 78px;
          border-bottom: 1px solid rgba(16, 43, 70, 0.16);
        }

        .rt-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--navy);
          font-size: 1rem;
          font-weight: 900;
          letter-spacing: -0.04em;
        }

        .rt-brand-mark {
          display: grid;
          place-items: center;
          width: 32px;
          height: 32px;
          color: var(--paper);
          background: var(--orange);
          clip-path: polygon(45% 0, 100% 0, 65% 43%, 96% 43%, 30% 100%, 48% 57%, 10% 57%);
        }

        .rt-brand span:last-child {
          display: block;
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          color: var(--slate);
        }

        .rt-text-button {
          border: 0;
          padding: 9px 0;
          color: var(--navy);
          background: transparent;
          font-weight: 800;
        }

        .rt-home {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 48px;
          align-items: center;
          padding: 76px 0 58px;
        }

        .rt-eyebrow {
          margin: 0 0 14px;
          color: var(--orange);
          font-size: 0.72rem;
          font-weight: 900;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        h1,
        h2,
        h3,
        p {
          margin-top: 0;
        }

        h1 {
          max-width: 760px;
          margin-bottom: 20px;
          color: var(--navy);
          font-size: clamp(2.75rem, 6vw, 5.5rem);
          line-height: 0.93;
          letter-spacing: -0.075em;
        }

        h2 {
          color: var(--navy);
          font-size: clamp(2rem, 4vw, 3.5rem);
          line-height: 0.98;
          letter-spacing: -0.06em;
        }

        .rt-lead {
          max-width: 58ch;
          color: var(--slate);
          font-size: 1.08rem;
          line-height: 1.65;
        }

        .rt-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 54px;
          border: 0;
          padding: 0 22px;
          color: var(--paper);
          background: var(--orange);
          font-weight: 900;
          box-shadow: 5px 5px 0 var(--navy);
        }

        .rt-primary:hover {
          transform: translate(-2px, -2px);
          box-shadow: 7px 7px 0 var(--navy);
        }

        .rt-primary:focus-visible,
        .rt-text-button:focus-visible,
        .rt-option:focus-visible {
          outline: 3px solid var(--orange);
          outline-offset: 3px;
        }

        .rt-note {
          margin: 20px 0 0;
          color: var(--slate);
          font-size: 0.88rem;
        }

        .rt-quote-panel {
          padding: 28px;
          color: var(--paper);
          background: var(--navy);
          box-shadow: 12px 12px 0 rgba(16, 43, 70, 0.16);
        }

        .rt-quote-panel h3 {
          margin-bottom: 6px;
          font-size: 1.55rem;
          letter-spacing: -0.05em;
        }

        .rt-quote-panel p {
          color: #cdd8e2;
          line-height: 1.5;
        }

        .rt-price-row {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          padding: 17px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        .rt-price-row strong {
          color: #ffb078;
          font-size: 1.35rem;
        }

        .rt-price-row span {
          color: #cdd8e2;
          font-size: 0.86rem;
        }

        .rt-page {
          width: min(760px, calc(100% - 32px));
          margin: 0 auto;
          padding: 48px 0 72px;
        }

        .rt-back {
          border: 0;
          padding: 0;
          color: var(--navy);
          background: transparent;
          font-weight: 800;
        }

        .rt-form-card,
        .rt-success-card,
        .rt-provider-card {
          margin-top: 28px;
          padding: clamp(22px, 4vw, 38px);
          background: var(--paper);
          border: 1px solid var(--line);
          box-shadow: 8px 8px 0 rgba(16, 43, 70, 0.08);
        }

        .rt-section {
          margin-top: 30px;
        }

        .rt-section-label {
          display: block;
          margin-bottom: 10px;
          color: var(--navy);
          font-size: 0.78rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .rt-input {
          width: 100%;
          min-height: 54px;
          border: 1px solid var(--line);
          padding: 0 15px;
          color: var(--ink);
          background: #fff;
        }

        .rt-input:focus {
          border-color: var(--orange);
          outline: 3px solid rgba(242, 106, 33, 0.16);
        }

        .rt-options {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .rt-options.two {
          grid-template-columns: repeat(2, 1fr);
        }

        .rt-option {
          min-height: 52px;
          border: 1px solid var(--line);
          padding: 12px;
          color: var(--navy);
          background: #fff;
          font-weight: 800;
        }

        .rt-option.active {
          border-color: var(--navy);
          color: var(--paper);
          background: var(--navy);
        }

        .rt-callout {
          margin-top: 22px;
          padding: 16px;
          color: #71451f;
          background: #fff0df;
          line-height: 1.5;
        }

        .rt-review-price {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          margin: 26px 0;
          padding: 22px 0;
          border-top: 2px solid var(--navy);
          border-bottom: 1px solid var(--line);
        }

        .rt-review-price span {
          display: block;
          color: var(--slate);
          font-size: 0.9rem;
        }

        .rt-review-price strong {
          color: var(--orange);
          font-size: 3rem;
          letter-spacing: -0.07em;
        }

        .rt-detail-list {
          display: grid;
          gap: 12px;
          padding: 0;
          margin: 0 0 28px;
          list-style: none;
        }

        .rt-detail-list li {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--line);
        }

        .rt-detail-list span {
          color: var(--slate);
        }

        .rt-timeline {
          display: grid;
          gap: 0;
          margin: 30px 0;
        }

        .rt-step {
          display: grid;
          grid-template-columns: 32px 1fr;
          gap: 14px;
          align-items: center;
          min-height: 60px;
        }

        .rt-step-dot {
          display: grid;
          place-items: center;
          width: 28px;
          height: 28px;
          color: var(--paper);
          background: var(--navy);
          border-radius: 50%;
          font-size: 0.75rem;
          font-weight: 900;
        }

        .rt-step.pending .rt-step-dot {
          color: var(--slate);
          background: #ded9d0;
        }

        .rt-step small {
          display: block;
          margin-top: 3px;
          color: var(--slate);
        }

        .rt-provider-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
        }

        .rt-status {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--success);
          font-size: 0.9rem;
          font-weight: 900;
        }

        .rt-status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: currentColor;
        }

        .rt-secondary {
          min-height: 44px;
          border: 1px solid var(--navy);
          padding: 0 16px;
          color: var(--navy);
          background: transparent;
          font-weight: 900;
        }

        .rt-job {
          margin-top: 26px;
          padding-top: 24px;
          border-top: 1px solid var(--line);
        }

        .rt-job-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          margin: 20px 0;
        }

        .rt-job-grid div {
          padding: 14px;
          background: #f2eee7;
        }

        .rt-job-grid span {
          display: block;
          margin-bottom: 5px;
          color: var(--slate);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }

        .rt-job-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        @media (max-width: 760px) {
          .rt-home {
            grid-template-columns: 1fr;
            gap: 34px;
            padding-top: 48px;
          }

          .rt-nav {
            min-height: 68px;
          }

          .rt-options {
            grid-template-columns: 1fr;
          }

          .rt-options.two {
            grid-template-columns: 1fr;
          }

          .rt-job-grid {
            grid-template-columns: 1fr;
          }

          .rt-review-price {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>

      <div className="rt-shell">
        <header className="rt-nav">
          <div className="rt-brand" aria-label="Rise High Towing">
            <span className="rt-brand-mark" aria-hidden="true" />
            <div>
              RISE HIGH TOWING
              <span>GARLAND SERVICE AREA</span>
            </div>
          </div>

          <button className="rt-text-button" onClick={() => { window.location.href = "/provider-onboarding"; }}>

            Tow provider
          </button>
        </header>
      </div>

      {screen === "home" && (
        <section className="rt-shell rt-home">
          <div>
            <p className="rt-eyebrow">Clear prices. Real providers.</p>
            <h1>Need a tow?</h1>
            <p className="rt-lead">
              Request a tow in the Garland service area. See your total before
              sending your request.
            </p>
            <button className="rt-primary" onClick={startRequest}>
              Request a tow
            </button>
            <p className="rt-note">
              Standard passenger vehicles only. Recovery and special-equipment
              jobs are reviewed before dispatch.
            </p>
          </div>

          <aside className="rt-quote-panel">
            <p className="rt-eyebrow">Starting flat rates</p>
            <h3>Know the price first.</h3>
            <p>No surprise fees after a provider accepts your request.</p>

            <div className="rt-price-row">
              <div>
                <strong>$139</strong>
                <span>Local service area</span>
              </div>
              <span>Up to 7 loaded miles</span>
            </div>

            <div className="rt-price-row">
              <div>
                <strong>$179</strong>
                <span>Adjacent service area</span>
              </div>
              <span>Up to 15 loaded miles</span>
            </div>
          </aside>
        </section>
      )}

      {screen === "request" && (
        <section className="rt-page">
          <button className="rt-back" onClick={() => setScreen("home")}>
            ← Back
          </button>
          <p className="rt-eyebrow">Tow request</p>
          <h2>Where does your vehicle need to go?</h2>

          <form className="rt-form-card" onSubmit={reviewRequest}>
            <div className="rt-section">
              <label className="rt-section-label" htmlFor="pickup">
                Pickup location
              </label>
              <input
                id="pickup"
                className="rt-input"
                placeholder="Enter pickup address"
                value={pickup}
                onChange={(event) => setPickup(event.target.value)}
                required
              />
            </div>

            <div className="rt-section">
              <label className="rt-section-label" htmlFor="destination">
                Destination
              </label>
              <input
                id="destination"
                className="rt-input"
                placeholder="Enter destination address"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                required
              />
            </div>

            <div className="rt-section">
              <span className="rt-section-label">Service area</span>
              <div className="rt-options two">
                <button
                  type="button"
                  className={`rt-option ${area === "local" ? "active" : ""}`}
                  onClick={() => setArea("local")}
                >
                  Local area
                </button>
                <button
                  type="button"
                  className={`rt-option ${area === "adjacent" ? "active" : ""}`}
                  onClick={() => setArea("adjacent")}
                >
                  Adjacent area
                </button>
              </div>
            </div>

            <div className="rt-section">
              <span className="rt-section-label">Vehicle type</span>
              <div className="rt-options">
                {(["Car", "SUV", "Pickup"] as Vehicle[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`rt-option ${vehicle === item ? "active" : ""}`}
                    onClick={() => setVehicle(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="rt-section">
              <span className="rt-section-label">Can the vehicle roll?</span>
              <div className="rt-options two">
                {(["Rolls", "Does not roll"] as Condition[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`rt-option ${condition === item ? "active" : ""}`}
                    onClick={() => setCondition(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {needsReview && (
              <div className="rt-callout">
                This request needs review before a provider is dispatched.
                Recovery, winching, special equipment, and non-rolling vehicles
                are not automatically priced.
              </div>
            )}

            <div className="rt-section">
              <button className="rt-primary" type="submit">
                Review request
              </button>
            </div>
          </form>
        </section>
      )}

      {screen === "review" && (
        <section className="rt-page">
          <button className="rt-back" onClick={() => setScreen("request")}>
            ← Edit request
          </button>
          <p className="rt-eyebrow">Review your request</p>
          <h2>Your price before dispatch.</h2>

          <div className="rt-form-card">
            {needsReview ? (
              <>
                <div className="rt-callout">
                  Your request needs a provider review before a final price is
                  shown. We will not charge you automatically.
                </div>
                <button className="rt-primary" onClick={submitRequest}>
                  Send review request
                </button>
              </>
            ) : (
              <>
                <div className="rt-review-price">
                  <div>
                    <strong>${quote.total}</strong>
                    <span>{quote.label}</span>
                  </div>
                  <span>{quote.miles}</span>
                </div>

                <ul className="rt-detail-list">
                  <li>
                    <span>Pickup</span>
                    <strong>{pickup}</strong>
                  </li>
                  <li>
                    <span>Destination</span>
                    <strong>{destination}</strong>
                  </li>
                  <li>
                    <span>Vehicle</span>
                    <strong>
                      {vehicle} · {condition}
                    </strong>
                  </li>
                </ul>

                <p className="rt-note">
                  Your total is shown before a provider is asked to accept the
                  job.
                </p>

                <button className="rt-primary" onClick={submitRequest}>
                  Send tow request
                </button>
              </>
            )}
          </div>
        </section>
      )}

      {screen === "success" && (
        <section className="rt-page">
          <p className="rt-eyebrow">Request received</p>
          <h2>We are finding an available provider.</h2>

          <div className="rt-success-card">
            <p className="rt-lead">
              Your request has been sent. This demo does not dispatch a real
              provider yet.
            </p>

            <div className="rt-timeline">
              <div className="rt-step">
                <span className="rt-step-dot">1</span>
                <div>
                  <strong>Request received</strong>
                  <small>Your details are ready for provider matching.</small>
                </div>
              </div>
              <div className="rt-step pending">
                <span className="rt-step-dot">2</span>
                <div>
                  <strong>Provider assigned</strong>
                  <small>Waiting for an approved provider.</small>
                </div>
              </div>
              <div className="rt-step pending">
                <span className="rt-step-dot">3</span>
                <div>
                  <strong>On the way</strong>
                  <small>You will see this after a provider accepts.</small>
                </div>
              </div>
              <div className="rt-step pending">
                <span className="rt-step-dot">4</span>
                <div>
                  <strong>Arrived</strong>
                  <small>The provider confirms arrival.</small>
                </div>
              </div>
              <div className="rt-step pending">
                <span className="rt-step-dot">5</span>
                <div>
                  <strong>Tow complete</strong>
                  <small>Your completed service record will appear here.</small>
                </div>
              </div>
            </div>

            <button className="rt-secondary" onClick={() => setScreen("home")}>
              Return home
            </button>
          </div>
        </section>
      )}

      {screen === "provider" && (
        <section className="rt-page">
          <button className="rt-back" onClick={() => setScreen("home")}>
            ← Customer view
          </button>
          <p className="rt-eyebrow">Tow provider preview</p>
          <h2>See the payout before you accept.</h2>

          <div className="rt-provider-card">
            <div className="rt-provider-head">
              <div>
                <h3>Availability</h3>
                <div className="rt-status">
                  <span className="rt-status-dot" />
                  {providerAvailable ? "Available for requests" : "Unavailable"}
                </div>
              </div>

              <button
                className="rt-secondary"
                onClick={() => setProviderAvailable((value) => !value)}
              >
                Set {providerAvailable ? "unavailable" : "available"}
              </button>
            </div>

            <div className="rt-job">
              <p className="rt-eyebrow">Incoming request</p>
              <h3>{jobAccepted ? "Job accepted" : "Local area tow"}</h3>

              <div className="rt-job-grid">
                <div>
                  <span>Pickup area</span>
                  Garland service area
                </div>
                <div>
                  <span>Destination area</span>
                  Local service area
                </div>
                <div>
                  <span>Vehicle</span>
                  Car · Rolls
                </div>
                <div>
                  <span>Your payout</span>
                  $119
                </div>
              </div>

              <div className="rt-job-actions">
                {jobAccepted ? (
                  <button className="rt-primary" onClick={() => setJobAccepted(false)}>
                    Mark unavailable
                  </button>
                ) : (
                  <>
                    <button className="rt-primary" onClick={() => setJobAccepted(true)}>
                      Accept job
                    </button>
                    <button className="rt-secondary">Decline</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
