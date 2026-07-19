export const parsePrice = (priceVal: any) => {
  if (!priceVal) return 0;
  if (typeof priceVal === "string") {
    const cleaned = parseFloat(priceVal.replace(/[^0-9.]/g, ""));
    return isNaN(cleaned) ? 0 : cleaned;
  }
  return Number(priceVal) || 0;
};
