// src/utils/phone.js
const onlyDigits = (v) => String(v || "").replace(/\D/g, "");

export function buildMobileForApi(dial, rawPhone, country) {
  const cc = onlyDigits(dial);      // "+20" -> "20"
  const ph = onlyDigits(rawPhone);  // "11 55-..." -> "1155..."

  if (country === "EG") {
    if (/^1\d{9}$/.test(ph)) return `0${ph}`;   // 115... -> 0115...
    if (/^01\d{9}$/.test(ph)) return ph;        // محلي صحيح
    if (ph.startsWith("20") && ph.length >= 12) {
      const local = ph.slice(2);
      return local.startsWith("1") ? `0${local}` : local;
    }
  }
  // باقي الدول: أرقام فقط بدون +
  return `${cc}${ph}`;
}
