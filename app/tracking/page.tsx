"use client";

import { useState } from "react";

type TowStatus = "on_the_way" | "arrived" | "transporting" | "complete";

const statusCopy: Record<
  TowStatus,
  { eyebrow: string; title: string; detail: string; showMap: boolean }
> = {
  on_the_way: {
    eyebrow: "LIVE DRIVER UPDATE",
    title: "Your driver is on the way",
    detail: "Marcus is heading to your pickup location now.",
    showMap: true,
  },
  arrived: {
    eyebrow: "DRIVER HAS ARRIVED",
    title: "Your driver is at pickup",
    detail: "Your remaining balance will be charged now. Please meet your driver when it is safe.",
    showMap: false,
  },
  transporting: {
    eyebrow: "VEHICLE IN TRANSPORT",
    title: "Your vehicle is being transported",
    detail: "Your driver is taking your vehicle to the drop-off location.",
    showMap: false,
  },
  complete: {
    eyebrow: "TOW COMPLETE",
    title: "Your vehicle has been delivered",
    detail: "Thank you for choosing Rise High Towing.",
    showMap: false,
  },
};

export default function TrackingPage() {
  const [status, setStatus] = useState<TowStatus>("on_the_way");
  const current = statusCopy[status];

  const nextStatus = () => {
    if (status === "on_the_way") setStatus("arrived");
    if (status === "arrived") setStatus("transporting");
    if (status === "transporting") setStatus("complete");
  };

  return (
    <main className="tracking-shell">
      <section className="tracking-card">
        <header className="topbar">
          <div className="brand">
            <span className="brand-mark">RH</span>
            <span>RISE HIGH TOWING</span>
          </div>
          <span className="job-id">JOB #RH-2048</span>
        </header>

        <div className="content">
          <p className="eyebrow">{current.eyebrow}</p>
          <h1>{current.title}</h1>
          <p className="intro">{current.detail}</p>

          {current.showMap && (
            <>
              <section className="map-card" aria-label="Driver en route map">
                <div className="map-grid" />
                <div className="route route-one" />
                <div className="route route-two" />
                <div className="pickup-pin">
                  <span>Your pickup</span>
                  <strong>●</strong>
                </div>
                <div className="truck">
                  <span>🚚</span>
                </div>
                <div className="eta">
                  <strong>18 min</strong>
                  <span>estimated arrival</span>
                </div>
              </section>

              <p className="privacy-note">
                Live location is available while your driver is traveling to you.
                Tracking ends once the driver arrives.
              </p>
            </>
          )}

          {status === "arrived" && (
            <section className="arrival-card">
              <span className="arrival-icon">✓</span>
              <div>
                <strong>Driver arrived at your pickup</strong>
                <p>
                  $104.25 remaining balance charged. Your $34.75 booking deposit
                  was applied to the $139.00 tow total.
                </p>
              </div>
            </section>
          )}

          {status === "transporting" && (
            <section className="arrival-card">
              <span className="arrival-icon">↗</span>
              <div>
                <strong>On the way to your drop-off</strong>
                <p>
                  For safety, driver location is no longer shared after vehicle pickup.
                </p>
              </div>
            </section>
          )}

          {status === "complete" && (
            <section className="review-card">
              <p className="eyebrow">HOW DID WE DO?</p>
              <h2>Leave a quick review</h2>
              <div className="stars" aria-label="Five star review">
                ★ ★ ★ ★ ★
              </div>
              <button className="review-button">Rate your tow</button>
            </section>
          )}

          {status !== "complete" && (
            <section className="driver-card">
              <div className="driver-avatar">M</div>
              <div className="driver-details">
                <strong>Marcus R.</strong>
                <span>Verified Rise High provider</span>
                <span className="truck-type">Flatbed tow truck</span>
              </div>
              <a href="tel:+12145550123" className="call-button">
                Call
              </a>
            </section>
          )}

          <section className="price-card">
            <div>
              <span>Tow total</span>
              <strong>$139.00</strong>
            </div>
            <div>
              <span>Booking deposit paid</span>
              <strong className="paid">$34.75</strong>
            </div>
            <div>
              <span>Balance due at arrival</span>
              <strong>$104.25</strong>
            </div>
          </section>

          <button className="help-button">Need help with this tow?</button>

          <button className="demo-button" onClick={nextStatus}>
            Preview next driver update
          </button>
        </div>
      </section>

      <style jsx>{`
        :global(*) {
          box-sizing: border-box;
        }

        :global(body) {
          margin: 0;
          background: #111820;
          color: #f8f0df;
          font-family: Arial, sans-serif;
        }

        .tracking-shell {
          min-height: 100vh;
          padding: 20px;
          background:
            radial-gradient(circle at 85% 0%, rgba(230, 112, 36, 0.2), transparent 30rem),
            #111820;
        }

        .tracking-card {
          width: min(100%, 680px);
          margin: 0 auto;
          min-height: calc(100vh - 40px);
          background: #19232d;
          border: 1px solid rgba(248, 240, 223, 0.13);
        }

        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 20px;
          border-bottom: 1px solid rgba(248, 240, 223, 0.12);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        .brand-mark {
          display: grid;
          place-items: center;
          width: 34px;
          height: 34px;
          background: #e67024;
          color: #111820;
          font-size: 12px;
        }

        .job-id {
          color: #aeb7bc;
          font-size: 11px;
          letter-spacing: 0.08em;
        }

        .content {
          padding: 34px 20px 42px;
        }

        .eyebrow {
          margin: 0 0 10px;
          color: #f2a353;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.14em;
        }

        h1,
        h2,
        p {
          margin-top: 0;
        }

        h1 {
          max-width: 12ch;
          margin-bottom: 12px;
          font-size: clamp(32px, 8vw, 50px);
          line-height: 0.96;
          letter-spacing: -0.055em;
        }

        .intro {
          max-width: 47ch;
          margin-bottom: 28px;
          color: #cbd0cb;
          font-size: 16px;
          line-height: 1.55;
        }

        .map-card {
          position: relative;
          overflow: hidden;
          min-height: 300px;
          background: #d9d2bf;
          color: #17212a;
        }

        .map-grid {
          position: absolute;
          inset: 0;
          opacity: 0.55;
          background-image:
            linear-gradient(28deg, transparent 48%, #aaa38f 49%, #aaa38f 51%, transparent 52%),
            linear-gradient(118deg, transparent 49%, #b8b09b 50%, #b8b09b 52%, transparent 53%),
            linear-gradient(0deg, transparent 49%, #c0b8a5 50%, #c0b8a5 51%, transparent 52%);
          background-size: 120px 80px, 160px 100px, 100px 100px;
        }

        .route {
          position: absolute;
          width: 64%;
          height: 20px;
          border-top: 7px solid #e67024;
          border-radius: 50%;
          transform: rotate(-19deg);
        }

        .route-one {
          top: 48%;
          left: 13%;
        }

        .route-two {
          top: 59%;
          right: 4%;
          width: 35%;
          transform: rotate(39deg);
        }

        .pickup-pin,
        .truck,
        .eta {
          position: absolute;
          z-index: 1;
          box-shadow: 0 8px 22px rgba(17, 24, 32, 0.2);
        }

        .pickup-pin {
          right: 16%;
          top: 25%;
          display: grid;
          justify-items: center;
          gap: 4px;
          color: #17212a;
          font-size: 11px;
          font-weight: 800;
        }

        .pickup-pin strong {
          color: #e67024;
          font-size: 32px;
          line-height: 0.7;
          text-shadow: 0 1px 0 #fff;
        }

        .truck {
          top: 53%;
          left: 18%;
          padding: 10px;
          background: #17212a;
          border: 3px solid #f8f0df;
          border-radius: 50%;
          font-size: 24px;
        }

        .eta {
          left: 16px;
          bottom: 16px;
          display: grid;
          gap: 2px;
          padding: 13px 15px;
          background: #17212a;
          color: #f8f0df;
        }

        .eta strong {
          font-size: 20px;
        }

        .eta span {
          color: #cbd0cb;
          font-size: 11px;
        }

        .privacy-note {
          margin: 13px 0 28px;
          color: #aeb7bc;
          font-size: 12px;
          line-height: 1.5;
        }

        .driver-card,
        .arrival-card,
        .price-card,
        .review-card {
          margin-top: 20px;
          background: #222f3a;
          border: 1px solid rgba(248, 240, 223, 0.13);
        }

        .driver-card {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 16px;
        }

        .driver-avatar {
          display: grid;
          place-items: center;
          width: 45px;
          height: 45px;
          background: #e67024;
          color: #17212a;
          border-radius: 50%;
          font-weight: 900;
        }

        .driver-details {
          display: grid;
          gap: 3px;
          flex: 1;
        }

        .driver-details strong {
          font-size: 16px;
        }

        .driver-details span {
          color: #b8c0bd;
          font-size: 12px;
        }

        .driver-details .truck-type {
          color: #f2a353;
        }

        .call-button,
        .review-button,
        .help-button,
        .demo-button {
          border: 0;
          cursor: pointer;
          font: inherit;
          text-decoration: none;
        }

        .call-button {
          padding: 11px 14px;
          background: #f8f0df;
          color: #17212a;
          font-size: 13px;
          font-weight: 800;
        }

        .arrival-card {
          display: flex;
          gap: 13px;
          padding: 18px;
        }

        .arrival-icon {
          display: grid;
          place-items: center;
          flex: 0 0 30px;
          width: 30px;
          height: 30px;
          background: #e67024;
          color: #17212a;
          border-radius: 50%;
          font-weight: 900;
        }

        .arrival-card strong {
          display: block;
          margin-bottom: 5px;
        }

        .arrival-card p {
          margin: 0;
          color: #cbd0cb;
          font-size: 13px;
          line-height: 1.5;
        }

        .price-card {
          display: grid;
          gap: 14px;
          padding: 17px;
        }

        .price-card div {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          color: #cbd0cb;
          font-size: 13px;
        }

        .price-card strong {
          color: #f8f0df;
        }

        .price-card .paid {
          color: #f2a353;
        }

        .review-card {
          padding: 22px;
          text-align: center;
        }

        .review-card h2 {
          margin-bottom: 14px;
          font-size: 25px;
        }

        .stars {
          margin-bottom: 18px;
          color: #f2a353;
          font-size: 27px;
          letter-spacing: 3px;
        }

        .review-button {
          width: 100%;
          padding: 15px;
          background: #e67024;
          color: #17212a;
          font-weight: 900;
        }

        .help-button {
          width: 100%;
          margin-top: 22px;
          padding: 13px;
          background: transparent;
          color: #f8f0df;
          border: 1px solid rgba(248, 240, 223, 0.4);
          font-weight: 800;
        }

        .demo-button {
          width: 100%;
          margin-top: 14px;
          padding: 11px;
          background: transparent;
          color: #9eaaa8;
          font-size: 12px;
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .tracking-shell {
            padding: 0;
          }

          .tracking-card {
            min-height: 100vh;
            border: 0;
          }

          .topbar {
            padding: 16px;
          }

          .content {
            padding: 28px 16px 34px;
          }
        }
      `}</style>
    </main>
  );
}
