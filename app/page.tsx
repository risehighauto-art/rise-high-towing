"use client";

import { useState } from "react";

const total = 139;
const deposit = total * 0.25;
const remaining = total - deposit;

const money = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

const addressFields = [
  { key: "number", title: "What is the street number?", placeholder: "Example: 1234", optional: false },
  { key: "street", title: "What is the street name?", placeholder: "Example: Main Street", optional: false },
  { key: "unit", title: "Apartment, suite, or building number?", placeholder: "Optional", optional: true },
  { key: "state", title: "What state is this in?", placeholder: "Example: Texas", optional: false },
  { key: "city", title: "What city is this in?", placeholder: "Example: Garland", optional: false },
  { key: "zip", title: "What is the ZIP code?", placeholder: "Example: 75040", optional: false },
];

type View =
  | "home"
  | "location-choice"
  | "address-field"
  | "vehicle"
  | "condition"
  | "price"
  | "deposit"
  | "request-sent"
  | "review-needed";

export default function Home() {
  const [view, setView] = useState<View>("home");
  const [locationTarget, setLocationTarget] = useState<"pickup" | "dropoff">("pickup");
  const [addressIndex, setAddressIndex] = useState(0);
  const [locationMessage, setLocationMessage] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [condition, setCondition] = useState("");
  const [addressValues, setAddressValues] = useState<Record<string, string>>({});

  const field = addressFields[addressIndex];
  const locationLabel = locationTarget === "pickup" ? "pickup" : "drop-off";

  function beginTowRequest() {
    setView("location-choice");
    setLocationTarget("pickup");
    setAddressIndex(0);
  }

  function chooseManualAddress() {
    setLocationMessage("");
    setAddressIndex(0);
    setView("address-field");
  }

  function finishLocation() {
    if (locationTarget === "pickup") {
      setLocationTarget("dropoff");
      setAddressIndex(0);
      setView("location-choice");
      return;
    }

    setView("vehicle");
  }

  function shareLocation() {
    setLocationMessage("Requesting your location…");

    if (!navigator.geolocation) {
      setLocationMessage("Location sharing is unavailable on this device. Enter the address manually.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        setLocationMessage("Location shared.");
        window.setTimeout(finishLocation, 600);
      },
      () => {
        setLocationMessage("Location permission was not allowed. Enter the address manually.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  function continueAddress() {
    if (!field.optional && !addressValues[`${locationTarget}-${field.key}`]?.trim()) return;

    if (addressIndex < addressFields.length - 1) {
      setAddressIndex((value) => value + 1);
      return;
    }

    finishLocation();
  }

  function goBack() {
    if (view === "location-choice") {
      if (locationTarget === "dropoff") {
        setLocationTarget("pickup");
        setAddressIndex(addressFields.length - 1);
        setView("address-field");
      } else {
        setView("home");
      }
      return;
    }

    if (view === "address-field") {
      if (addressIndex > 0) {
        setAddressIndex((value) => value - 1);
      } else {
        setView("location-choice");
      }
      return;
    }

    if (view === "vehicle") {
      setLocationTarget("dropoff");
      setAddressIndex(addressFields.length - 1);
      setView("address-field");
      return;
    }

    if (view === "condition") {
      setView("vehicle");
      return;
    }

    if (view === "price") {
      setView("condition");
      return;
    }

    if (view === "deposit") {
      setView("price");
    }
  }

  const progress = {
    "location-choice": "Step 1 of 6",
    "address-field": "Location details",
    vehicle: "Step 3 of 6",
    condition: "Step 4 of 6",
    price: "Step 5 of 6",
    deposit: "Step 6 of 6",
  }[view];

  return (
    <main className="tow-app">
      <header className="topbar">
        <button className="brand" onClick={() => setView("home")} aria-label="Return home">
          <span className="bolt">⚡</span>
          <span>
            <strong>RISE HIGH TOWING</strong>
            <small>Garland service area</small>
          </span>
        </button>

        <a className="provider-link" href="/provider-onboarding">
          Tow provider
        </a>
      </header>

      {view !== "home" && view !== "request-sent" && view !== "review-needed" && (
        <div className="progress-wrap">
          <span>{progress}</span>
          <div className="progress-line">
            <span
              style={{
                width:
                  view === "location-choice" || view === "address-field"
                    ? "22%"
                    : view === "vehicle"
                    ? "46%"
                    : view === "condition"
                    ? "62%"
                    : view === "price"
                    ? "80%"
                    : "100%",
              }}
            />
          </div>
        </div>
      )}

      {view === "home" && (
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">CLEAR PRICE. REAL PROVIDERS.</p>
            <h1>Need a tow?</h1>
            <p className="intro">
              Request towing in the Garland service area. See your exact total before requesting a provider.
            </p>
            <button className="primary-button" onClick={beginTowRequest}>
              Request a tow
            </button>
            <p className="trust-note">
              A 25% booking deposit applies to your tow. If no driver arrives, it is refunded.
            </p>
          </div>

          <aside className="price-card">
            <p className="eyebrow">STARTING FLAT RATE</p>
            <h2>Know your total first.</h2>
            <p>No surprise charges after you approve your tow.</p>
            <div className="price-row">
              <strong>$139</strong>
              <span>Local service area<br />Includes towing up to 7 miles</span>
            </div>
            <div className="price-row">
              <strong>$179</strong>
              <span>Adjacent service area<br />Includes towing up to 15 miles</span>
            </div>
          </aside>
        </section>
      )}

      {view === "location-choice" && (
        <section className="flow-card">
          <p className="eyebrow">{locationTarget === "pickup" ? "PICKUP LOCATION" : "DROP-OFF LOCATION"}</p>
          <h1>Where is the {locationLabel}?</h1>
          <p className="helper">
            Share your current location or enter the address one detail at a time.
          </p>

          <div className="choice-stack">
            <button className="location-button" onClick={shareLocation}>
              <span className="location-icon">⌖</span>
              <span>
                <strong>Share my location</strong>
                <small>Fastest option on iPhone and Android</small>
              </span>
            </button>

            <button className="manual-button" onClick={chooseManualAddress}>
              Enter address manually
            </button>
          </div>

          {locationMessage && <p className="location-message">{locationMessage}</p>}

          <div className="flow-actions">
            <button className="back-button" onClick={goBack}>Back</button>
          </div>
        </section>
      )}

      {view === "address-field" && (
        <section className="flow-card">
          <p className="eyebrow">
            {locationTarget === "pickup" ? "PICKUP LOCATION" : "DROP-OFF LOCATION"} · {addressIndex + 1} OF {addressFields.length}
          </p>
          <h1>{field.title}</h1>
          <input
            className="big-input"
            autoFocus
            value={addressValues[`${locationTarget}-${field.key}`] || ""}
            placeholder={field.placeholder}
            onChange={(event) =>
              setAddressValues((current) => ({
                ...current,
                [`${locationTarget}-${field.key}`]: event.target.value,
              }))
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") continueAddress();
            }}
          />

          <div className="flow-actions">
            <button className="back-button" onClick={goBack}>Back</button>
            <button className="primary-button" onClick={continueAddress}>
              {field.optional ? "Skip or continue" : "Continue"}
            </button>
          </div>
        </section>
      )}

      {view === "vehicle" && (
        <section className="flow-card">
          <p className="eyebrow">YOUR VEHICLE</p>
          <h1>What type of vehicle needs towing?</h1>
          <div className="option-grid">
            {["Car", "SUV", "Pickup truck", "Motorcycle"].map((item) => (
              <button
                key={item}
                className={`option ${vehicle === item ? "selected" : ""}`}
                onClick={() => setVehicle(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flow-actions">
            <button className="back-button" onClick={goBack}>Back</button>
            <button className="primary-button" disabled={!vehicle} onClick={() => setView("condition")}>
              Continue
            </button>
          </div>
        </section>
      )}

      {view === "condition" && (
        <section className="flow-card">
          <p className="eyebrow">VEHICLE CONDITION</p>
          <h1>Can the vehicle roll and steer?</h1>
          <div className="option-stack">
            <button className={`option ${condition === "rolling" ? "selected" : ""}`} onClick={() => setCondition("rolling")}>
              Yes, it rolls and steers
            </button>
            <button className={`option ${condition === "notRolling" ? "selected" : ""}`} onClick={() => setCondition("notRolling")}>
              No, it does not roll
            </button>
            <button className={`option ${condition === "special" ? "selected" : ""}`} onClick={() => setCondition("special")}>
              It needs recovery or special equipment
            </button>
          </div>

          <div className="flow-actions">
            <button className="back-button" onClick={goBack}>Back</button>
            <button
              className="primary-button"
              disabled={!condition}
              onClick={() => setView(condition === "rolling" ? "price" : "review-needed")}
            >
              Continue
            </button>
          </div>
        </section>
      )}

      {view === "price" && (
        <section className="flow-card price-review">
          <p className="eyebrow">YOUR EXACT TOW PRICE</p>
          <h1>{money(total)}</h1>
          <p className="helper">Local service area tow for a {vehicle}. Includes towing up to 7 miles.</p>

          <div className="breakdown">
            <div><span>Total tow price</span><strong>{money(total)}</strong></div>
            <div><span>Booking deposit due now, 25%</span><strong>{money(deposit)}</strong></div>
            <div><span>Remaining balance when driver arrives</span><strong>{money(remaining)}</strong></div>
          </div>

          <p className="trust-note">
            If no approved driver arrives, your booking deposit is automatically refunded.
          </p>

          <div className="flow-actions">
            <button className="back-button" onClick={goBack}>Back</button>
            <button className="primary-button" onClick={() => setView("deposit")}>
              Approve {money(total)}
            </button>
          </div>
        </section>
      )}

      {view === "deposit" && (
        <section className="flow-card">
          <p className="eyebrow">SECURE BOOKING DEPOSIT</p>
          <h1>Save your card and request a provider.</h1>
          <p className="helper">
            You pay {money(deposit)} now. It applies to your tow. The remaining {money(remaining)} is charged only when your driver arrives.
          </p>

          <div className="secure-panel">
            <span>▣</span>
            <div>
              <strong>Secure card setup</strong>
              <small>Your card details are handled by the payment provider, not Rise High.</small>
            </div>
          </div>

          <p className="trust-note">
            If no driver arrives, your {money(deposit)} booking deposit is refunded.
          </p>

          <div className="flow-actions">
            <button className="back-button" onClick={goBack}>Back</button>
            <button className="primary-button" onClick={() => setView("request-sent")}>
              Pay {money(deposit)} and request provider
            </button>
          </div>
        </section>
      )}

      {view === "review-needed" && (
        <section className="flow-card success-card">
          <span className="bolt large">⚡</span>
          <p className="eyebrow">PRICE REVIEW NEEDED</p>
          <h1>This tow needs review before pricing.</h1>
          <p className="helper">
            Non-running vehicles, recovery work, and special equipment need a verified provider review before a price is confirmed.
          </p>
          <button className="primary-button" onClick={() => setView("home")}>
            Return home
          </button>
        </section>
      )}

      {view === "request-sent" && (
        <section className="flow-card success-card">
          <span className="bolt large">⚡</span>
          <p className="eyebrow">REQUEST SENT</p>
          <h1>We are notifying eligible providers.</h1>
          <p className="helper">
            Your {money(deposit)} deposit has been applied to your {money(total)} tow total. We will show your driver once one accepts the request.
          </p>
          <div className="status-box">
            <strong>Status: Waiting for a provider</strong>
            <span>You are not charged the remaining {money(remaining)} until your driver arrives.</span>
          </div>
        </section>
      )}

      <style jsx global>{`
        :root {
          --navy: #142e48;
          --orange: #ff7024;
          --cream: #f4ede2;
          --surface: #fffaf3;
          --muted: #5e7180;
          --line: #d8cbbb;
          --ink: #142e48;
        }
        * { box-sizing: border-box; }
        body {
          margin: 0;
          background: var(--cream);
          color: var(--ink);
          font-family: "Avenir Next", Avenir, Helvetica, sans-serif;
        }
        button, input { font: inherit; }
        .tow-app { min-height: 100vh; padding: 28px; }
        .topbar {
          max-width: 1180px;
          margin: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 22px;
          border-bottom: 1px solid var(--line);
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 11px;
          background: transparent;
          border: 0;
          color: var(--navy);
          padding: 0;
          cursor: pointer;
          text-align: left;
        }
        .bolt { color: var(--orange); font-size: 34px; line-height: 1; }
        .brand strong, .brand small { display: block; }
        .brand strong { font-size: 15px; letter-spacing: .03em; }
        .brand small { color: var(--muted); font-size: 11px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
        .provider-link { color: var(--navy); font-weight: 800; text-decoration: none; }
        .progress-wrap {
          max-width: 680px;
          margin: 28px auto 0;
          color: var(--muted);
          font-size: 13px;
          font-weight: 800;
        }
        .progress-line { height: 5px; background: #ddd1c1; margin-top: 9px; }
        .progress-line span { display: block; height: 100%; background: var(--orange); transition: width .2s ease; }
        .hero {
          max-width: 1180px;
          min-height: 620px;
          margin: auto;
          display: grid;
          grid-template-columns: 1.15fr .85fr;
          gap: 60px;
          align-items: center;
        }
        .hero-copy { max-width: 620px; }
        .eyebrow { color: #dc581b; font-size: 12px; font-weight: 900; letter-spacing: .12em; margin: 0 0 16px; }
        h1 { margin: 0; font-size: clamp(42px, 7vw, 78px); line-height: .96; letter-spacing: -.05em; }
        .intro, .helper { color: var(--muted); font-size: 18px; line-height: 1.55; max-width: 55ch; }
        .primary-button, .back-button, .manual-button, .location-button, .option {
          cursor: pointer;
          border: 2px solid var(--navy);
          font-weight: 850;
        }
        .primary-button {
          background: var(--orange);
          color: #fffaf3;
          padding: 16px 22px;
          box-shadow: 5px 5px 0 var(--navy);
        }
        .primary-button:disabled { opacity: .45; cursor: not-allowed; }
        .trust-note { color: var(--muted); font-size: 14px; line-height: 1.45; max-width: 440px; }
        .price-card { background: var(--navy); color: #f7f0e7; padding: 30px; box-shadow: 12px 12px 0 #c7bcae; }
        .price-card .eyebrow { color: #ffa273; }
        .price-card h2 { font-size: 32px; margin: 0; letter-spacing: -.04em; }
        .price-card p:not(.eyebrow) { color: #d4e0e7; line-height: 1.45; }
        .price-row { display: grid; grid-template-columns: 92px 1fr; gap: 8px; padding: 18px 0; border-top: 1px solid #486077; align-items: center; }
        .price-row strong { color: #ffae7b; font-size: 25px; }
        .price-row span { color: #e4edf1; font-size: 14px; line-height: 1.45; }
        .flow-card {
          max-width: 680px;
          margin: 68px auto;
          background: var(--surface);
          padding: 48px;
          border: 1px solid var(--line);
          box-shadow: 10px 10px 0 #c7bcae;
        }
        .flow-card h1 { font-size: clamp(34px, 5vw, 56px); }
        .big-input {
          width: 100%;
          padding: 18px;
          color: var(--navy);
          font-size: 20px;
          border: 2px solid var(--navy);
          background: #fffdf8;
          margin-top: 20px;
        }
        .choice-stack, .option-stack { display: grid; gap: 12px; margin-top: 28px; }
        .location-button {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          text-align: left;
          background: var(--navy);
          color: #fffaf3;
        }
        .location-button strong, .location-button small { display: block; }
        .location-button small { color: #d4e0e7; margin-top: 4px; }
        .location-icon { font-size: 35px; color: #ff9a61; }
        .manual-button, .back-button { background: transparent; color: var(--navy); padding: 15px 18px; }
        .location-message { color: #a4471b; font-weight: 800; }
        .option-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 28px; }
        .option { background: #fffdf8; color: var(--navy); padding: 17px; text-align: left; }
        .option.selected { background: #fff0e7; border-color: var(--orange); }
        .flow-actions { display: flex; justify-content: space-between; gap: 15px; margin-top: 36px; }
        .price-review h1 { color: var(--orange); }
        .breakdown { margin-top: 30px; border-top: 1px solid var(--line); }
        .breakdown div { display: flex; justify-content: space-between; gap: 20px; padding: 17px 0; border-bottom: 1px solid var(--line); }
        .breakdown span { color: var(--muted); }
        .breakdown strong { text-align: right; }
        .secure-panel {
          display: flex;
          gap: 15px;
          margin-top: 28px;
          padding: 19px;
          background: #e5f0e9;
          color: #1a5d3c;
        }
        .secure-panel span { font-size: 24px; }
        .secure-panel strong, .secure-panel small { display: block; }
        .secure-panel small { margin-top: 4px; line-height: 1.4; }
        .success-card { text-align: center; }
        .large { font-size: 58px; display: block; margin-bottom: 18px; }
        .success-card .helper { margin: 20px auto 28px; }
        .status-box {
          display: grid;
          gap: 6px;
          text-align: left;
          background: var(--navy);
          color: #fffaf3;
          padding: 19px;
          margin-top: 26px;
        }
        .status-box span { color: #d4e0e7; line-height: 1.4; }
        @media (max-width: 760px) {
          .tow-app { padding: 18px; }
          .hero { grid-template-columns: 1fr; min-height: auto; padding: 55px 0; gap: 44px; }
          .price-card { box-shadow: 7px 7px 0 #c7bcae; }
          .flow-card { margin: 42px auto; padding: 30px 22px; box-shadow: 7px 7px 0 #c7bcae; }
        }
        @media (max-width: 430px) {
          .topbar { align-items: flex-start; }
          .provider-link { font-size: 14px; padding-top: 7px; }
          .option-grid { grid-template-columns: 1fr; }
          .flow-actions .primary-button, .flow-actions .back-button { padding: 14px 12px; }
        }
      `}</style>
    </main>
  );
}
