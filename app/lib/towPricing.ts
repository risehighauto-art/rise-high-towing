export const AFTER_HOURS_FEE = 35;
export const NORMAL_DEPOSIT_RATE = 0.25;
export const AFTER_HOURS_DEPOSIT_RATE = 0.4;

export function isAfterHours(date = new Date()) {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Chicago",
      hour: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(date)
      .find((part) => part.type === "hour")?.value ?? "12",
  );

  return hour >= 19 || hour < 7;
}

export function getTowPricing(baseTowTotal: number, date = new Date()) {
  const afterHours = isAfterHours(date);
  const afterHoursFee = afterHours ? AFTER_HOURS_FEE : 0;
  const total = baseTowTotal + afterHoursFee;
  const depositRate = afterHours
    ? AFTER_HOURS_DEPOSIT_RATE
    : NORMAL_DEPOSIT_RATE;
  const deposit = Number((total * depositRate).toFixed(2));
  const balance = Number((total - deposit).toFixed(2));

  return {
    afterHours,
    afterHoursFee,
    total,
    depositRate,
    deposit,
    balance,
  };
}
