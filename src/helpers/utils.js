export const trim = (s) => (typeof s === "string" ? s.trim() : s);
export const cleanObject = (o) =>
  Object.fromEntries(Object.entries(o).filter(([, v]) => v !== "" && v !== undefined));
