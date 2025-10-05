// import { api } from "./http";

// /**
//  * body المتوقَّع من الـ API:
//  * {
//  *  name, company_name, email, message,
//  *  country, address, mobile_number, whatsapp_number, category_name
//  * }
//  */
// export async function createContact(payload) {
//   // لو عندك backend بيطلب form-data بدلاً من JSON:
//   // const fd = new FormData(); Object.entries(payload).forEach(([k,v]) => v!=null && fd.append(k, v));
//   // return api.post("contact-us", fd);

//   return api.post("contact-us", payload);
// }


// src/lib/api/contact.js
import { api } from "./http";

/**
 * body المتوقع من الـ API:
 * {
 *  name, company_name, email, message,
 *  country, address, mobile_number, whatsapp_number, category_name
 * }
 */
export async function createContact(payload) {
  // ملاحظة: نحط "/" في الأول لضمان concat صح مع baseURL
  return api.post("/contact-us", payload);
}
