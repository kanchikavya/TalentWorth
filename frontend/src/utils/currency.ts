export interface CurrencyConfig {
  code: string;
  symbol: string;
  rate: number;
}

export const getCurrencyByLocation = (location: string): CurrencyConfig => {
  const loc = (location || "").toLowerCase();

  if (loc.includes("india") || loc.includes("bangalore") || loc.includes("hyderabad") || loc.includes("mumbai") || loc.includes("delhi")) {
    return { code: "INR", symbol: "₹", rate: 83.2 };
  }

  if (loc.includes("london") || loc.includes("uk") || loc.includes("britain")) {
    return { code: "GBP", symbol: "£", rate: 0.79 };
  }

  if (loc.includes("germany") || loc.includes("berlin") || loc.includes("munich") || loc.includes("netherlands") || loc.includes("amsterdam") || loc.includes("france") || loc.includes("paris") || loc.includes("spain") || loc.includes("madrid") || loc.includes("ireland") || loc.includes("dublin")) {
    return { code: "EUR", symbol: "€", rate: 0.92 };
  }

  if (loc.includes("zurich") || loc.includes("switzerland")) {
    return { code: "CHF", symbol: "CHF", rate: 0.88 };
  }

  if (loc.includes("tokyo") || loc.includes("japan")) {
    return { code: "JPY", symbol: "¥", rate: 154.5 };
  }

  if (loc.includes("singapore")) {
    return { code: "SGD", symbol: "S$", rate: 1.35 };
  }

  if (loc.includes("sydney") || loc.includes("melbourne") || loc.includes("australia")) {
    return { code: "AUD", symbol: "A$", rate: 1.52 };
  }

  if (loc.includes("dubai") || loc.includes("uae") || loc.includes("riyadh") || loc.includes("saudi")) {
    return { code: "AED", symbol: "AED", rate: 3.67 };
  }

  return { code: "USD", symbol: "$", rate: 1.0 };
};

export const formatSalaryByLocation = (usdAmount: number, location: string): string => {
  if (!usdAmount || isNaN(usdAmount)) return "$0 / yr";
  const cfg = getCurrencyByLocation(location);

  if (cfg.code === "INR") {
    const inr = Math.round((usdAmount * cfg.rate) / 10000) * 10000;
    const lakhs = (inr / 100000).toFixed(2);
    return `₹${inr.toLocaleString('en-IN')} (${lakhs} LPA)`;
  }

  const converted = Math.round((usdAmount * cfg.rate) / 500) * 500;
  return `${cfg.symbol}${converted.toLocaleString()} / yr`;
};
