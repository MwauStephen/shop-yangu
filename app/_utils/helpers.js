export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "KSH" }).format(
    value
  );
