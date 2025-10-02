// src/helpers/phone.js

/** تحويل الأرقام العربية/الفارسية إلى إنجليزية */
export const toWesternDigits = (s = "") => {
  const map = {
    "٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5",
    "٦":"6","٧":"7","٨":"8","٩":"9",
    "۰":"0","۱":"1","۲":"2","۳":"3","۴":"4",
    "۵":"5","۶":"6","۷":"7","۸":"8","۹":"9"
  };
  return String(s).replace(/[٠-٩۰-۹]/g, (d) => map[d] || d);
};

/** تنسيق الرقم المصري المحلي (01...) */
export const normalizeEgLocal = (raw) => {
  let d = toWesternDigits(raw).replace(/\D/g, "");
  d = d.replace(/^(0020|020|20)/, "");
  if (d.length === 10 && /^1[0125]\d{8}$/.test(d)) d = "0" + d;
  if (!d.startsWith("0")) d = "0" + d;
  return d.slice(0, 11);
};

/** تحقق أنه رقم مصري صحيح */
export const isValidEgMobile = (v) => /^01(0|1|2|5)\d{8}$/.test(v);
