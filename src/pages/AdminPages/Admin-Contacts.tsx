import { useState, useEffect } from "react";
import ContactDelete from "../../components/Admintool/Delete-Contact";

type Contact = {
  id: number;
  name?: string;
  email?: string;
  mobile_number?: string;
  company_name?: string;
  category_name?: string;
  country?: string;   // ISO-2 (EG, US, SA ...)
  message?: string;   // notes
};

export default function OurContactus() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog للـ Notes
  const [noteOpen, setNoteOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    try {
      const response = await fetch(
        "https://sfgukli.american-softwares.com/api/contact-us",
        { headers: { Accept: "application/json" } }
      );
      const data = await response.json();
      if (response.ok) {
        setContacts(Array.isArray(data) ? data : data?.data ?? []);
      } else {
        console.error("Error fetching contacts:", (data && data.message) || data);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  }

  const removeFromList = (id: number) =>
    setContacts((prev) => prev.filter((c) => c.id !== id));

  const openNotes = (text?: string) => {
    setNoteText((text || "").trim());
    setNoteOpen(true);
  };

  const copy = async (val?: string) => {
    if (!val) return;
    try {
      await navigator.clipboard.writeText(val);
      // ممكن تستبدلها بـ toast لو حابب
      console.log("Copied:", val);
    } catch {}
  };

  const preview = (txt?: string, n = 120) => {
    if (!txt) return "";
    const clean = String(txt).replace(/\s+/g, " ").trim();
    return clean.length > n ? clean.slice(0, n) + "…" : clean;
  };

  const flagFromCountry = (cc?: string) => {
    if (!cc || cc.length !== 2) return "";
    const up = cc.toUpperCase();
    // تحويل ISO-2 لإيموجي علم
    return String.fromCodePoint(...[...up].map((c) => 0x1f1e6 - 65 + c.charCodeAt(0)));
  };

  return (
    <section className="p-4 md:p-6 lg:p-8">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-rose-600">Client Contact Requests</h2>
          <p className="text-sm text-gray-500 mt-1">
            Total: {contacts.length.toLocaleString()}
          </p>
        </div>
        <button
          onClick={fetchContacts}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
        >
          Refresh
        </button>
      </header>

      {loading ? (
        <TableSkeleton />
      ) : contacts.length === 0 ? (
        <EmptyState onRefresh={fetchContacts} />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <table className="min-w-[1200px] w-full table-fixed">
            <thead className="sticky top-0 z-10 bg-gray-900 text-white dark:bg-gray-800">
              <tr>
                <Th className="w-14">#</Th>
                <Th className="w-44">Name</Th>
                <Th className="w-56">Email</Th>
                <Th className="w-40">Mobile</Th>
                <Th className="w-40">Country</Th>
                <Th className="w-48">Company</Th>
                <Th className="w-[28rem]">Notes</Th>
                <Th className="w-44">Category</Th>
                <Th className="w-32">Actions</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {contacts.map((c, idx) => {
                const notes = c?.message ?? "";
                return (
                  <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/60">
                    <Td className="text-center">{idx + 1}</Td>

                    <Td title={c.name} className="truncate">{c.name ?? "—"}</Td>

                    <Td title={c.email} className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="truncate">{c.email ?? "—"}</span>
                        {c.email && (
                          <button
                            type="button"
                            onClick={() => copy(c.email)}
                            className="rounded border px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100"
                            title="Copy email"
                          >
                            Copy
                          </button>
                        )}
                      </div>
                    </Td>

                    <Td title={c.mobile_number} className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="truncate">{c.mobile_number ?? "—"}</span>
                        {c.mobile_number && (
                          <button
                            type="button"
                            onClick={() => copy(c.mobile_number)}
                            className="rounded border px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100"
                            title="Copy mobile"
                          >
                            Copy
                          </button>
                        )}
                      </div>
                    </Td>

                    <Td className="truncate" title={c.country}>
                      {c.country ? (
                        <span className="inline-flex items-center gap-1">
                          <span aria-hidden>{flagFromCountry(c.country)}</span>
                          <span className="text-xs rounded-full border px-2 py-0.5">
                            {c.country.toUpperCase()}
                          </span>
                        </span>
                      ) : (
                        "—"
                      )}
                    </Td>

                    <Td title={c.company_name} className="truncate">
                      {c.company_name ?? "—"}
                    </Td>

                    {/* Notes */}
                    <Td title={notes} className="align-top">
                      {notes ? (
                        <div className="flex items-start gap-3">
                          <div className="flex-1 text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
                            {preview(notes)}
                          </div>
                          {String(notes).length > 120 && (
                            <button
                              type="button"
                              onClick={() => openNotes(notes)}
                              className="shrink-0 rounded border px-2 py-1 text-xs text-gray-700 hover:bg-gray-100"
                              aria-haspopup="dialog"
                              aria-controls="notes-dialog"
                            >
                              View
                            </button>
                          )}
                        </div>
                      ) : (
                        "—"
                      )}
                    </Td>

                    <Td className="truncate">
                      <span className="inline-flex max-w-full items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-200 dark:ring-indigo-700/40">
                        {c.category_name ?? "—"}
                      </span>
                    </Td>

                    <Td className="text-center">
                      <ContactDelete id={c.id} onDeleteSuccess={() => removeFromList(c.id)} />
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Notes Dialog */}
      {noteOpen && (
        <NotesDialog text={noteText} onClose={() => setNoteOpen(false)} />
      )}
    </section>
  );
}

/* ---------- Dialog لعرض الملاحظات ---------- */
function NotesDialog({ text, onClose }: { text: string; onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="notes-title"
      id="notes-dialog"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white p-5 shadow-xl dark:bg-gray-900">
        <div className="mb-3 flex items-center justify-between">
          <h3 id="notes-title" className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Notes
          </h3>
          <button
            onClick={onClose}
            className="rounded-full px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="max-h-[60vh] overflow-auto whitespace-pre-wrap break-words text-gray-800 dark:text-gray-200">
          {text || "—"}
        </div>
      </div>
    </div>
  );
}

/* ---------- Helpers ---------- */
function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th className={`px-4 py-3 text-left text-sm font-semibold tracking-wide ${className}`}>
      {children}
    </th>
  );
}

function Td({
  children,
  className = "",
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <td
      className={`px-4 py-3 text-sm text-gray-800 dark:text-gray-200 ${className}`}
      title={title}
    >
      {children}
    </td>
  );
}

/* ---------- Skeleton while loading ---------- */
function TableSkeleton() {
  const Row = () => (
    <tr className="animate-pulse">
      {Array.from({ length: 9 }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
        </td>
      ))}
    </tr>
  );

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <table className="min-w-[1200px] w-full">
        <thead className="bg-gray-100 dark:bg-gray-800/60">
          <tr>
            {Array.from({ length: 9 }).map((_, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300"
              >
                &nbsp;
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {Array.from({ length: 6 }).map((_, i) => (
            <Row key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Empty state ---------- */
function EmptyState({ onRefresh }: { onRefresh: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <p className="mb-2 text-lg font-medium text-gray-800 dark:text-gray-100">
        No contact data available
      </p>
      <p className="mb-6 max-w-md text-sm text-gray-600 dark:text-gray-300">
        You can refresh to fetch the latest client requests.
      </p>
      <button
        onClick={onRefresh}
        className="rounded-md bg-indigo-600 px-4 py-2 text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Refresh
      </button>
    </div>
  );
}
