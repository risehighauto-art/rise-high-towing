"use client";

import { useState } from "react";

type View = "dispatch" | "providers";
type RecoveryState = "verification" | "recovery";

const tows = [
  {
    id: "RH-2049",
    customer: "Devon Williams",
    vehicle: "2020 Ford Explorer",
    route: "Garland Central → Plano West",
    provider: "No provider yet",
    status: "Providers alerted",
    total: "$179.00",
    deposit: "$44.75 paid",
    balance: "$134.25 at arrival",
    action: "Assign provider",
  },
  {
    id: "RH-2050",
    customer: "Monica Hill",
    vehicle: "2014 Honda Accord",
    route: "Mesquite North → Garland South",
    provider: "Andre T.",
    status: "Picked up",
    total: "$139.00",
    deposit: "$34.75 paid",
    balance: "$104.25 at arrival",
    action: "In transport",
  },
  {
    id: "RH-2051",
    customer: "Troy Daniels",
    vehicle: "2018 Chevrolet Malibu",
    route: "Rowlett West → Garland East",
    provider: "No provider yet",
    status: "New request",
    total: "$139.00",
    deposit: "$34.75 paid",
    balance: "$104.25 at arrival",
    action: "Assign provider",
  },
];

export default function OwnerPage() {
  const [view, setView] = useState<View>("dispatch");
  const [recoveryState, setRecoveryState] =
    useState<RecoveryState>("verification");

  return (
    <main className="dashboard">
      <aside className="sidebar">
        <div className="brand">
          <span>RH</span>
          <div>
            <strong>RISE HIGH</strong>
            <small>TOWING CONTROL</small>
          </div>
        </div>

        <nav>
          <button
            className={view === "dispatch" ? "selected-nav" : ""}
            onClick={() => setView("dispatch")}
          >
            Dispatch board
          </button>
          <button
            className={view === "providers" ? "selected-nav" : ""}
            onClick={() => setView("providers")}
          >
            Provider approvals <b>2</b>
          </button>
        </nav>

        <div className="sidebar-note">
          <span>●</span>
          <p>
            <strong>Dispatch is live</strong>
            <br />
            Offers go only to approved, available, matching providers.
          </p>
        </div>
      </aside>

      <section className="workspace">
        {view === "dispatch" ? (
          <>
            <header className="heading">
              <div>
                <p className="eyebrow">OWNER DISPATCH</p>
                <h1>Active towing jobs</h1>
                <p>Every tow moves independently. Urgent response issues appear first.</p>
              </div>
              <button className="account">Owner account</button>
            </header>

            <section className="metrics">
              <div><span>Active now</span><strong>4</strong></div>
              <div className="attention"><span>Needs action</span><strong>1</strong></div>
              <div><span>On the way</span><strong>1</strong></div>
              <div><span>Vehicles moving</span><strong>1</strong></div>
            </section>

            <section className={`urgent-lane ${recoveryState}`}>
              {recoveryState === "verification" ? (
                <>
                  <div>
                    <p className="eyebrow">DRIVER RESPONSE NEEDED</p>
                    <h2>RH-2048 · Jasmine Carter</h2>
                    <p>
                      Marcus R. is 17 minutes past the expected arrival time.
                      Location has not updated for 2 minutes.
                    </p>
                  </div>

                  <div className="countdown">
                    <span>Driver confirmation window</span>
                    <strong>1:36</strong>
                    <small>Customer balance has not been charged.</small>
                  </div>

                  <button
                    className="urgent-button"
                    onClick={() => setRecoveryState("recovery")}
                  >
                    Start recovery dispatch
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <p className="eyebrow">RECOVERY DISPATCH ACTIVE</p>
                    <h2>Replacement providers alerted</h2>
                    <p>
                      Marcus R. is no longer assigned. Jasmine keeps her original
                      deposit and will not be charged again.
                    </p>
                  </div>

                  <div className="countdown success">
                    <span>Next provider offer expires in</span>
                    <strong>0:34</strong>
                    <small>Two matching providers were alerted.</small>
                  </div>

                  <button className="neutral-button">
                    Open customer update
                  </button>
                </>
              )}
            </section>

            <div className="filter-row">
              <button className="filter-active">Active</button>
              <button>Needs action</button>
              <button>Completed</button>
            </div>

            <section className="tow-list">
              {tows.map((tow) => (
                <article className="tow-row" key={tow.id}>
                  <div className="tow-main">
                    <span className="job-id">{tow.id}</span>
                    <h2>{tow.customer}</h2>
                    <p>{tow.vehicle}</p>
                    <strong className="route">{tow.route}</strong>
                  </div>

                  <div>
                    <span className={`status ${tow.status.toLowerCase().replaceAll(" ", "-")}`}>
                      {tow.status}
                    </span>
                    <p className="label">Provider</p>
                    <strong>{tow.provider}</strong>
                  </div>

                  <div className="money">
                    <strong>{tow.total}</strong>
                    <span>{tow.deposit}</span>
                    <span>{tow.balance}</span>
                  </div>

                  <button className={tow.action === "Assign provider" ? "orange-button" : "neutral-button"}>
                    {tow.action}
                  </button>
                </article>
              ))}
            </section>
          </>
        ) : (
          <>
            <header className="heading">
              <div>
                <p className="eyebrow">OWNER REVIEW</p>
                <h1>Provider approvals</h1>
                <p>Only approved providers can receive towing alerts.</p>
              </div>
            </header>

            <section className="approval-list">
              <article>
                <div className="initial">D</div>
                <div>
                  <strong>Dallas Quick Tow</strong>
                  <p>Flatbed · Garland and surrounding areas</p>
                </div>
                <div className="checks">
                  <span>✓ TDLR checked</span>
                  <span>✓ On-hook coverage submitted</span>
                  <span>✓ Truck permit submitted</span>
                </div>
                <button className="orange-button">Approve provider</button>
              </article>

              <article>
                <div className="initial">S</div>
                <div>
                  <strong>Smith Roadside</strong>
                  <p>Tow dolly · Garland area</p>
                </div>
                <div className="checks">
                  <span>✓ TDLR checked</span>
                  <span>• Insurance review needed</span>
                  <span>✓ Driver license submitted</span>
                </div>
                <button className="neutral-button">Request information</button>
              </article>
            </section>
          </>
        )}
      </section>

      <style jsx global>{`
        * { box-sizing: border-box; }
        body { margin: 0; background: #f4efe5; color: #17212a; font-family: Arial, sans-serif; }
        button { font: inherit; cursor: pointer; }
        .dashboard { display: grid; grid-template-columns: 245px 1fr; min-height: 100vh; }
        .sidebar { display: flex; flex-direction: column; padding: 26px 18px; background: #17212a; color: #fff7e8; }
        .brand { display: flex; align-items: center; gap: 10px; padding: 0 8px 30px; }
        .brand > span { display: grid; place-items: center; width: 39px; height: 39px; background: #e67024; color: #17212a; font-size: 13px; font-weight: 900; }
        .brand strong, .brand small { display: block; letter-spacing: .08em; }
        .brand strong { font-size: 13px; }
        .brand small { margin-top: 3px; color: #aeb8b9; font-size: 9px; }
        nav { display: grid; gap: 5px; }
        nav button { display: flex; justify-content: space-between; padding: 13px 12px; border: 0; background: transparent; color: #c8cfcb; text-align: left; }
        nav .selected-nav { background: #263540; color: #fff7e8; }
        nav b { display: grid; place-items: center; width: 20px; height: 20px; border-radius: 50%; background: #e67024; color: #17212a; font-size: 11px; }
        .sidebar-note { display: flex; gap: 9px; margin-top: auto; padding: 15px 10px 0; border-top: 1px solid rgba(255,255,255,.13); color: #b9c0bc; font-size: 12px; line-height: 1.5; }
        .sidebar-note p { margin: 0; }
        .sidebar-note span { color: #e67024; }
        .workspace { padding: 42px clamp(20px,4vw,62px); }
        .heading { display: flex; justify-content: space-between; gap: 24px; align-items: flex-start; margin-bottom: 31px; }
        .eyebrow { margin: 0 0 9px; color: #bd571c; font-size: 11px; font-weight: 900; letter-spacing: .14em; }
        h1, h2, p { margin-top: 0; }
        h1 { margin-bottom: 9px; font-size: clamp(31px,4vw,48px); line-height: .98; letter-spacing: -.055em; }
        h2 { margin-bottom: 5px; font-size: 19px; }
        .heading > div > p:not(.eyebrow) { color: #63706d; line-height: 1.5; }
        .account, .neutral-button, .orange-button { padding: 10px 12px; font-size: 12px; font-weight: 900; white-space: nowrap; }
        .account, .neutral-button { border: 1px solid #bdb4a3; background: transparent; color: #24312f; }
        .orange-button, .urgent-button { border: 0; background: #e67024; color: #17212a; }
        .metrics { display: grid; grid-template-columns: repeat(4,1fr); margin-bottom: 22px; border: 1px solid #d7cfbd; background: #fbf6eb; }
        .metrics div { display: grid; gap: 8px; padding: 19px; border-right: 1px solid #d7cfbd; }
        .metrics div:last-child { border-right: 0; }
        .metrics span, .money span, .label { color: #68716c; font-size: 12px; }
        .metrics strong { font-size: 28px; letter-spacing: -.04em; }
        .metrics .attention { background: #fff0e3; }
        .urgent-lane { display: grid; grid-template-columns: 1.4fr .9fr auto; gap: 24px; align-items: center; margin-bottom: 24px; padding: 23px; border: 2px solid #cf5520; background: #fff0e3; }
        .urgent-lane.recovery { border-color: #4c7655; background: #e9f2e7; }
        .urgent-lane p:not(.eyebrow) { margin-bottom: 0; color: #663218; line-height: 1.45; }
        .urgent-lane.recovery p:not(.eyebrow) { color: #35553c; }
        .countdown { display: grid; gap: 4px; padding: 14px; background: #17212a; color: #fff7e8; }
        .countdown span, .countdown small { color: #c4cfca; font-size: 11px; }
        .countdown strong { color: #f2a353; font-size: 26px; letter-spacing: -.04em; }
        .countdown.success strong { color: #9ed4aa; }
        .urgent-button { padding: 12px 14px; font-weight: 900; }
        .filter-row { display: flex; gap: 8px; margin-bottom: 14px; }
        .filter-row button { padding: 9px 11px; border: 1px solid #d0c8b8; background: transparent; color: #4f5c59; font-size: 13px; font-weight: 700; }
        .filter-row .filter-active { border-color: #17212a; background: #17212a; color: #fff7e8; }
        .tow-list, .approval-list { display: grid; gap: 10px; }
        .tow-row { display: grid; grid-template-columns: 1.5fr .9fr .8fr auto; gap: 20px; align-items: center; padding: 18px; border: 1px solid #d6cfbf; background: #fbf6eb; }
        .job-id { color: #65716d; font-size: 11px; font-weight: 800; letter-spacing: .09em; }
        .tow-main h2 { margin: 9px 0 5px; }
        .tow-main p { margin-bottom: 7px; color: #63706d; font-size: 12px; }
        .route { font-size: 12px; }
        .status { display: inline-flex; width: fit-content; padding: 5px 8px; margin-bottom: 10px; font-size: 10px; font-weight: 900; }
        .providers-alerted { background: #f8d6b9; color: #803812; }
        .picked-up { background: #d8d8ea; color: #40406f; }
        .new-request { background: #ded3bf; color: #514838; }
        .money { display: grid; gap: 5px; }
        .money > strong { font-size: 16px; }
        .approval-list article { display: grid; grid-template-columns: auto 1fr 1fr auto; gap: 20px; align-items: center; padding: 20px; border: 1px solid #d6cfbf; background: #fbf6eb; }
        .approval-list p { margin: 5px 0 0; color: #64706c; font-size: 12px; }
        .initial { display: grid; place-items: center; width: 43px; height: 43px; border-radius: 50%; background: #17212a; color: #f2a353; font-weight: 900; }
        .checks { display: grid; gap: 5px; color: #64706c; font-size: 12px; }
        @media (max-width: 1000px) {
          .dashboard { grid-template-columns: 1fr; }
          .sidebar { padding: 16px 20px; }
          .brand { padding-bottom: 14px; }
          nav { display: flex; }
          .sidebar-note { display: none; }
          .urgent-lane, .tow-row { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 620px) {
          .workspace { padding: 28px 16px; }
          .heading { display: block; }
          .account { margin-top: 18px; }
          .metrics { grid-template-columns: 1fr 1fr; }
          .metrics div:nth-child(2) { border-right: 0; }
          .metrics div:nth-child(-n+2) { border-bottom: 1px solid #d7cfbd; }
          .urgent-lane, .tow-row, .approval-list article { grid-template-columns: 1fr; gap: 13px; }
          .urgent-lane button, .tow-row button { width: 100%; }
        }
      `}</style>
    </main>
  );
}
