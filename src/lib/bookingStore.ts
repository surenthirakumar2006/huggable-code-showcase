export interface Booking {
  id: string;
  name: string;
  phone: string;
  arrivalTime: string;
  bookedAt: number;
  status: "active" | "completed" | "expired";
}

const STORAGE_KEY = "tuneup_bookings";

export function getBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveBookings(bookings: Booking[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }
}

export function createBooking(name: string, phone: string, arrivalTime: string): Booking {
  const bookings = getBookings();
  const newBooking: Booking = {
    id: Math.random().toString(36).substr(2, 6).toUpperCase(),
    name,
    phone,
    arrivalTime,
    bookedAt: Date.now(),
    status: "active",
  };
  saveBookings([...bookings, newBooking]);
  return newBooking;
}

export function getActiveBookingForDevice(): Booking | null {
  const bookings = getBookings();
  // For demo purposes, we'll just check if there's any active booking in localStorage
  // since localStorage is per-device.
  const active = bookings.find((b) => b.status === "active");
  
  if (active) {
    // Check expiration (3 hours)
    const threeHours = 3 * 60 * 60 * 1000;
    if (Date.now() - active.bookedAt > threeHours) {
      active.status = "expired";
      saveBookings(bookings);
      return null;
    }
    return active;
  }
  return null;
}

export function updateBookingStatus(id: string, status: "completed" | "expired" | "active") {
  const bookings = getBookings();
  const index = bookings.findIndex(b => b.id === id);
  if (index !== -1) {
    bookings[index].status = status;
    saveBookings(bookings);
  }
}

export function getQueuePosition(id: string): number {
  const bookings = getBookings();
  const activeBookings = bookings.filter(b => b.status === "active").sort((a, b) => a.bookedAt - b.bookedAt);
  const index = activeBookings.findIndex(b => b.id === id);
  return index !== -1 ? index : 0;
}
