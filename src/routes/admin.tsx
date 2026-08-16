import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getBookings, updateBookingStatus, Booking } from "@/lib/bookingStore";

export const Route = createFileRoute("/admin")({
  component: AdminPanel,
});

function AdminPanel() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Poll for new bookings every 5 seconds
    const fetchBookings = () => {
      setBookings(getBookings());
    };
    fetchBookings();
    const interval = setInterval(fetchBookings, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = (id: string, status: "active" | "completed" | "expired") => {
    updateBookingStatus(id, status);
    setBookings(getBookings());
  };

  const activeBookings = bookings.filter(b => b.status === "active").sort((a, b) => a.bookedAt - b.bookedAt);
  const pastBookings = bookings.filter(b => b.status !== "active").sort((a, b) => b.bookedAt - a.bookedAt);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="display-sm text-primary mb-8 uppercase tracking-widest border-b border-primary/20 pb-4">
          Admin Dashboard
        </h1>

        <div className="mb-12">
          <h2 className="headline-sm text-on-surface mb-6">Active Queue</h2>
          {activeBookings.length === 0 ? (
            <p className="body-md text-on-surface-variant italic">No active bookings right now.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/30 text-on-surface-variant text-sm uppercase tracking-wider">
                    <th className="p-4">Queue #</th>
                    <th className="p-4">Ticket ID</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Arrival Time</th>
                    <th className="p-4">Booked At</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activeBookings.map((b, index) => (
                    <tr key={b.id} className="border-b border-outline-variant/10 hover:bg-surface-low transition-colors text-on-surface">
                      <td className="p-4 font-bold text-primary">{index + 1}</td>
                      <td className="p-4 font-mono">{b.id}</td>
                      <td className="p-4">{b.name}</td>
                      <td className="p-4">{b.phone}</td>
                      <td className="p-4">{b.arrivalTime}</td>
                      <td className="p-4 text-sm text-on-surface-variant">
                        {new Date(b.bookedAt).toLocaleTimeString()}
                      </td>
                      <td className="p-4 flex gap-2">
                        <button
                          onClick={() => handleStatusChange(b.id, "completed")}
                          className="bg-green-600/20 text-green-500 border border-green-600/30 px-3 py-1 text-sm hover:bg-green-600/40 transition-colors"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => handleStatusChange(b.id, "expired")}
                          className="bg-red-600/20 text-red-500 border border-red-600/30 px-3 py-1 text-sm hover:bg-red-600/40 transition-colors"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div>
          <h2 className="headline-sm text-on-surface mb-6">Past Bookings</h2>
          {pastBookings.length === 0 ? (
            <p className="body-md text-on-surface-variant italic">No past bookings.</p>
          ) : (
             <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse opacity-70">
                <thead>
                  <tr className="border-b border-outline-variant/30 text-on-surface-variant text-sm uppercase tracking-wider">
                    <th className="p-4">Ticket ID</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pastBookings.map(b => (
                    <tr key={b.id} className="border-b border-outline-variant/10 text-on-surface">
                      <td className="p-4 font-mono">{b.id}</td>
                      <td className="p-4">{b.name}</td>
                      <td className="p-4">{b.phone}</td>
                      <td className="p-4 capitalize">
                        <span className={b.status === "completed" ? "text-green-500" : "text-red-500"}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
