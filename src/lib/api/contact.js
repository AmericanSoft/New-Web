import { api } from "./http";

/**
 * body المتوقَّع من الـ API:
 * {
 *  name, company_name, email, message,
 *  country, address, mobile_number, whatsapp_number, category_name
 * }
 */
export async function createContact(payload) {
  // لو عندك backend بيطلب form-data بدلاً من JSON:
  // const fd = new FormData(); Object.entries(payload).forEach(([k,v]) => v!=null && fd.append(k, v));
  // return api.post("contact-us", fd);

  return api.post("contact-us", payload);
}
