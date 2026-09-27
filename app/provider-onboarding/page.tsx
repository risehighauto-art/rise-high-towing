"use client";

import { useState } from "react";

const areas = ["Garland service area", "East Dallas service area", "North Dallas service area"];
const equipment = ["Wheel-lift tow truck", "Flatbed", "Trailer", "Tow dolly"];

export default function ProviderOnboarding() {
  const [step, setStep] = useState(0);
  const [area, setArea] = useState("");
  const [truckType, setTruckType] = useState("");
  const [terms, setTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const steps = [
    {
      label: "Business",
      title: "What is your legal business name?",
      help: "Use the name listed on your Texas towing-company license.",
      placeholder: "Business legal name",
    },
    {
      label: "Owner",
      title: "Who owns or manages this business?",
      help: "This person is responsible for the provider account.",
      placeholder: "Full name",
    },
    {
      label: "TDLR license",
      title: "What is your Texas towing-company license number?",
      help: "We verify it before activating your account.",
      placeholder: "TDLR company license number",
    },
    {
      label: "Service area",
      title: "Which service area do you cover?",
      help: "Choose the main area you can respond to consistently.",
      placeholder: "",
    },
    {
      label: "Equipment",
      title: "What equipment will you use?",
      help: "Only choose equipment you are licensed and insured to operate.",
      placeholder: "",
    },
    {
      label: "Tow vehicle",
      title: "Enter the tow vehicle plate number.",
      help: "This must match the vehicle on your tow permit and insurance.",
      placeholder: "Texas plate number",
    },
    {
      label: "Tow permit",
      title: "Enter the Consent Tow Permit number.",
      help: "Customer-requested tows require a current consent-tow permit.",
      placeholder: "Consent Tow Permit number",
    },
    {
      label: "Driver",
      title: "Enter the primary driver's Consent Tow Operator license.",
      help: "Each driver must have a valid license before taking a job.",
      placeholder: "Consent Tow Operator license number",
    },
    {
      label: "Liability",
      title: "Upload commercial towing liability proof.",
      help: "Minimum requirement: $300,000 commercial for-hire towing liability. Personal auto insurance does not qualify.",
      placeholder: "",
    },
    {
      label: "On-hook coverage",
      title: "Upload proof of on-hook or cargo coverage.",
      help: "Rise High requires at least $50,000 to protect the customer's vehicle while it is being towed.",
      placeholder: "",
    },
    {
      label: "Equipment photos",
      title: "Upload clear photos of your tow equipment.",
      help: "Show the tow vehicle, trailer or dolly, and safety equipment.",
      placeholder: "",
    },
    {
      label: "Agreement",
      title: "Ready for owner review?",
      help: "You cannot receive job alerts until Rise High approves your application.",
      placeholder: "",
    },
  ];

  const current = steps[step];
  const isUpload = step >= 8 && step <= 10;
  const isChoice = step === 3 || step === 4;
  const isFinal = step === 11;

  function next() {
    if (isFinal) {
      setSubmitted(true);
      return;
    }
    setStep((value) => value + 1);
  }

  if (submitted) {
    return (
      <main className="screen">
        <section className="card success">
          <div className="bolt">⚡</div>
          <p className="eyebrow">APPLICATION SUBMITTED</p>
          <h1>You are pending approval.</h1>
          <p>
            Rise High will verify your license, vehicle permit, driver eligibility,
            and insurance. You cannot receive tow alerts until approved.
          </p>
          <div className="status">Status: Owner review required</div>
        </section>
      </main>
    );
  }

  return (
    <main className="screen">
      <header className="topbar">
        <div className="brand">
          <span className="bolt">⚡</span>
          <span>RISE HIGH TOWING</span>
        </div>
        <span className="progress">Step {step + 1} of {steps.length}</span>
      </header>

      <section className="card">
        <p className="eyebrow">{current.label}</p>
        <h1>{current.title}</h1>
        <p className="help">{current.help}</p>

        {!isChoice && !isUpload && !isFinal && (
          <input className="field" placeholder={current.placeholder} autoFocus />
        )}

        {step === 3 && (
          <div className="choices">
            {areas.map((item) => (
              <button
                key={item}
                className={`choice ${area === item ? "selected" : ""}`}
                onClick={() => setArea(item)}
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {step === 4 && (
          <div className="choices">
            {equipment.map((item) => (
              <button
                key={item}
                className={`choice ${truckType === item ? "selected" : ""}`}
                onClick={() => setTruckType(item)}
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {isUpload && (
          <label className="upload">
            <input type="file" accept="image/*,.pdf" />
            <strong>Choose document or photo</strong>
            <span>PDF, JPG, or PNG</span>
          </label>
        )}

        {isFinal && (
          <label className="agreement">
            <input
              type="checkbox"
              checked={terms}
              onChange={(event) => setTerms(event.target.checked)}
            />
            <span>
              I confirm that the information is accurate, my equipment is safe,
              and I will follow Rise High provider rules.
            </span>
          </label>
        )}

        <div className="actions">
          {step > 0 ? (
            <button className="back" onClick={() => setStep((value) => value - 1)}>
              Back
            </button>
          ) : (
            <span />
          )}

          <button
            className="continue"
            disabled={(step === 3 && !area) || (step === 4 && !truckType) || (isFinal && !terms)}
            onClick={next}
          >
            {isFinal ? "Submit for owner review" : "Continue"}
          </button>
        </div>
      </section>

      <style jsx global>{`
        * { box-sizing: border-box; }
        body {
          margin: 0;
          background: #f4ede2;
          color: #142e48;
          font-family: Arial, sans-serif;
        }
        .screen {
          min-height: 100vh;
          padding: 28px;
        }
        .topbar {
          max-width: 760px;
          margin: 0 auto 36px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #d7cbb9;
          padding-bottom: 20px;
          font-weight: 800;
          letter-spacing: .04em;
        }
        .brand { display: flex; align-items: center; gap: 10px; }
        .bolt { color: #ff7024; font-size: 30px; }
        .progress { color: #687887; font-size: 13px; }
        .card {
          max-width: 760px;
          margin: auto;
          background: #fffaf3;
          padding: 48px;
          border: 1px solid #d7cbb9;
          box-shadow: 12px 12px 0 #193854;
        }
        .eyebrow {
          color: #e85e1c;
          font-weight: 800;
          font-size: 12px;
          letter-spacing: .12em;
          margin: 0 0 14px;
        }
        h1 { font-size: clamp(30px, 5vw, 48px); line-height: 1.02; margin: 0 0 16px; }
        .help { color: #526574; font-size: 18px; line-height: 1.5; margin-bottom: 30px; }
        .field {
          width: 100%;
          font-size: 20px;
          padding: 18px;
          border: 2px solid #193854;
          background: white;
          color: #142e48;
        }
        .choices { display: grid; gap: 12px; }
        .choice {
          text-align: left;
          padding: 18px;
          background: white;
          border: 2px solid #cdbfae;
          color: #142e48;
          font-size: 17px;
          font-weight: 700;
          cursor: pointer;
        }
        .choice.selected { border-color: #ff7024; background: #fff0e7; }
        .upload {
          min-height: 150px;
          border: 2px dashed #193854;
          background: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }
        .upload input { position: absolute; opacity: 0; width: 1px; }
        .upload span { color: #687887; }
        .agreement {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          padding: 20px;
          background: #fff0e7;
          line-height: 1.5;
          font-weight: 700;
        }
        .agreement input { width: 22px; height: 22px; }
        .actions {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          margin-top: 34px;
        }
        button {
          font: inherit;
          cursor: pointer;
        }
        .back, .continue {
          padding: 15px 22px;
          font-weight: 800;
          border: 2px solid #142e48;
        }
        .back { background: transparent; color: #142e48; }
        .continue { background: #ff7024; color: white; box-shadow: 4px 4px 0 #142e48; }
        .continue:disabled { opacity: .45; cursor: not-allowed; }
        .success { text-align: center; }
        .status {
          margin-top: 28px;
          padding: 16px;
          background: #142e48;
          color: white;
          font-weight: 800;
        }
        @media (max-width: 600px) {
          .screen { padding: 18px; }
          .topbar { margin-bottom: 28px; }
          .progress { display: none; }
          .card { padding: 30px 22px; box-shadow: 7px 7px 0 #193854; }
        }
      `}</style>
    </main>
  );
}
