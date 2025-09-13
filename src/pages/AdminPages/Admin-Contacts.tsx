import { useState, useEffect } from "react";
import ContactDelete from "../../components/Admintool/Delete-Contact";

export default function OurContactus() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    try {
      const response = await fetch(
        "https://american-softwares.com/api/public/index.php/api/contact-us",
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

  return (
    <section className="p-4 md:p-6 lg:p-8">
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-rose-600">Client Contact Requests</h2>
        <button
          onClick={fetchContacts}
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
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
          <table className="min-w-[1000px] w-full table-fixed">
            <thead className="bg-gray-900 text-white dark:bg-gray-800">
              <tr>
                <Th className="w-14">#</Th>
                <Th className="w-44">Name</Th>
                <Th className="w-56">Email</Th>
                <Th className="w-40">Mobile</Th>
                <Th className="w-48">Company</Th>
                <Th className="w-64">Address</Th>
                <Th className="w-44">Category</Th>
                <Th className="w-32">Actions</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {contacts.map((contact, idx) => (
                <tr
                  key={contact.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/60"
                >
                  <Td className="text-center">{idx + 1}</Td>
                  <Td title={contact.name} className="truncate">
                    {contact.name ?? "-"}
                  </Td>
                  <Td title={contact.email} className="truncate">
                    {contact.email ?? "-"}
                  </Td>
                  <Td title={contact.mobile_number} className="truncate">
                    {contact.mobile_number ?? "-"}
                  </Td>
                  <Td title={contact.company_name} className="truncate">
                    {contact.company_name ?? "-"}
                  </Td>
                  <Td title={contact.address} className="truncate">
                    {contact.address ?? "-"}
                  </Td>
                  <Td className="truncate">
                    <span className="inline-flex max-w-full items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-200 dark:ring-indigo-700/40">
                      {contact.category_name ?? "—"}
                    </span>
                  </Td>
                  <Td className="text-center">
                    <ContactDelete id={contact.id} onDeleteSuccess={() => removeFromList(contact.id)} />
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
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
    <th
      className={`px-3 py-3 text-left text-sm font-semibold tracking-wide ${className}`}
    >
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
      className={`px-3 py-3 text-sm text-gray-800 dark:text-gray-200 ${className}`}
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
      {Array.from({ length: 8 }).map((_, i) => (
        <td key={i} className="px-3 py-3">
          <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
        </td>
      ))}
    </tr>
  );

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <table className="min-w-[1000px] w-full">
        <thead className="bg-gray-100 dark:bg-gray-800/60">
          <tr>
            {Array.from({ length: 8 }).map((_, i) => (
              <th key={i} className="px-3 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
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
