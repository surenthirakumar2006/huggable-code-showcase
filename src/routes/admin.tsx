import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getBookings, updateBookingStatus, Booking } from "@/lib/bookingStore";
import { getGalleryImages, addGalleryImage, removeGalleryImage, GalleryImage } from "@/lib/galleryStore";
import { Icon } from "@/components/site/Icon";

export const Route = createFileRoute("/admin")({
  component: AdminPanel,
});

function AdminPanel() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageAlt, setNewImageAlt] = useState("");

  useEffect(() => {
    // Poll for new bookings every 5 seconds
    const fetchData = () => {
      setBookings(getBookings());
      setGalleryImages(getGalleryImages());
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = (id: string, status: "active" | "completed" | "expired") => {
    updateBookingStatus(id, status);
    setBookings(getBookings());
  };

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim()) return;
    addGalleryImage(newImageUrl, newImageAlt);
    setGalleryImages(getGalleryImages());
    setNewImageUrl("");
    setNewImageAlt("");
  };

  const handleRemoveImage = (id: string) => {
    removeGalleryImage(id);
    setGalleryImages(getGalleryImages());
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

        <div className="mt-16">
          <h2 className="headline-sm text-on-surface mb-6 border-b border-outline-variant/20 pb-2">Gallery Management</h2>
          
          <form onSubmit={handleAddImage} className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label htmlFor="imageUrl" className="label-md block text-on-surface-variant mb-2">Image URL</label>
              <input
                id="imageUrl"
                type="url"
                required
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full bg-surface-lowest border border-outline-variant/40 px-4 py-2 text-on-surface focus:border-primary focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="imageAlt" className="label-md block text-on-surface-variant mb-2">Description (Alt Text)</label>
              <input
                id="imageAlt"
                type="text"
                value={newImageAlt}
                onChange={(e) => setNewImageAlt(e.target.value)}
                placeholder="Brief description of the style"
                className="w-full bg-surface-lowest border border-outline-variant/40 px-4 py-2 text-on-surface focus:border-primary focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-6 py-2 uppercase tracking-widest hover:bg-primary/90 transition-colors h-[42px]"
            >
              Add Image
            </button>
          </form>

          {galleryImages.length === 0 ? (
            <p className="body-md text-on-surface-variant italic">No images in gallery.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map((img) => (
                <div key={img.id} className="relative group border border-outline-variant/20 rounded-sm overflow-hidden bg-surface-lowest aspect-square">
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => handleRemoveImage(img.id)}
                      className="bg-red-500/90 text-white rounded-full p-3 hover:bg-red-600 transition-colors"
                      title="Delete Image"
                    >
                      <Icon name="delete" className="text-[24px]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
