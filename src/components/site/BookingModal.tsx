import { useState, useEffect } from "react";
import { Icon } from "./Icon";
import { createBooking, getActiveBookingForDevice, getQueuePosition, Booking } from "@/lib/bookingStore";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  
  const [expireTimeLeft, setExpireTimeLeft] = useState<string>("");
  const [seatFreeTimeLeft, setSeatFreeTimeLeft] = useState<string>("");
  const [queuePos, setQueuePos] = useState<number>(0);

  // Check for existing booking when modal opens
  useEffect(() => {
    if (isOpen) {
      const existing = getActiveBookingForDevice();
      setActiveBooking(existing);
    }
  }, [isOpen]);

  // Timers logic
  useEffect(() => {
    if (!activeBooking) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const threeHours = 3 * 60 * 60 * 1000;
      const expiresAt = activeBooking.bookedAt + threeHours;
      const diffExpire = expiresAt - now;

      if (diffExpire <= 0) {
        setExpireTimeLeft("Expired");
      } else {
        const h = Math.floor(diffExpire / (1000 * 60 * 60));
        const m = Math.floor((diffExpire % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diffExpire % (1000 * 60)) / 1000);
        setExpireTimeLeft(`${h}h ${m}m ${s}s`);
      }

      const qPos = getQueuePosition(activeBooking.id);
      setQueuePos(qPos);
      
      // Seat will be free in roughly 30 mins per person in queue (mock logic)
      // Since booking might have been made a while ago, let's just do a static countdown from booking time
      const estimatedWaitTime = (qPos + 1) * 30 * 60 * 1000; 
      const seatFreeAt = activeBooking.bookedAt + estimatedWaitTime;
      const diffSeat = seatFreeAt - now;

      if (diffSeat <= 0) {
        setSeatFreeTimeLeft("Ready now!");
      } else {
        const mh = Math.floor(diffSeat / (1000 * 60 * 60));
        const mm = Math.floor((diffSeat % (1000 * 60 * 60)) / (1000 * 60));
        const ms = Math.floor((diffSeat % (1000 * 60)) / 1000);
        setSeatFreeTimeLeft(`${mh > 0 ? mh + 'h ' : ''}${mm}m ${ms}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeBooking]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !arrivalTime) return;
    const newBooking = createBooking(name, phone, arrivalTime);
    setActiveBooking(newBooking);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-surface-lowest border border-outline-variant/30 p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-on-surface-variant hover:text-primary transition-colors"
        >
          <Icon name="close" />
        </button>

        {activeBooking ? (
          <div className="text-center">
            <Icon name="check_circle" className="text-[48px] text-primary mb-4" />
            <h2 className="headline-sm text-on-surface mb-2">Booking Confirmed</h2>
            <p className="body-md text-on-surface-variant mb-6">Show this ticket when you arrive.</p>
            
            <div className="bg-surface-low border border-primary/20 p-6 mb-6">
              <p className="label-sm uppercase tracking-widest text-on-surface-variant mb-1">Ticket ID</p>
              <p className="display-sm text-primary mb-6">{activeBooking.id}</p>
              
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <p className="label-sm text-on-surface-variant">Queue Ahead</p>
                  <p className="title-md text-on-surface">{queuePos} Person(s)</p>
                </div>
                <div>
                  <p className="label-sm text-on-surface-variant">Expected Arrival</p>
                  <p className="title-md text-on-surface">{activeBooking.arrivalTime}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
                <span className="body-sm text-on-surface-variant">Seat Free In (Est.)</span>
                <span className="title-md text-primary">{seatFreeTimeLeft || "Calculating..."}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="body-sm text-on-surface-variant">Booking Expires In</span>
                <span className="title-md text-on-surface">{expireTimeLeft || "Calculating..."}</span>
              </div>
            </div>
            
            <p className="body-sm text-on-surface-variant mt-6 italic">
              Note: You can only have one active booking per device.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="headline-sm text-on-surface mb-2 uppercase text-primary">Book Appointment</h2>
            <p className="body-sm text-on-surface-variant mb-6">
              No upfront payment required. Join the queue digitally.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label-sm block text-on-surface mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surface-low border border-outline-variant/30 px-4 py-3 text-on-surface focus:border-primary focus:outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="label-sm block text-on-surface mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  maxLength={10}
                  title="Please enter exactly 10 digits"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  className="w-full bg-surface-low border border-outline-variant/30 px-4 py-3 text-on-surface focus:border-primary focus:outline-none"
                  placeholder="9876543210"
                />
              </div>
              <div>
                <label className="label-sm block text-on-surface mb-1">Expected Arrival Time</label>
                <input
                  type="time"
                  required
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                  className="w-full bg-surface-low border border-outline-variant/30 px-4 py-3 text-on-surface focus:border-primary focus:outline-none"
                />
              </div>
              
              <button
                type="submit"
                className="w-full rounded-full bg-primary text-primary-foreground py-4 mt-4 uppercase tracking-widest label-md hover:brightness-110 transition-all gold-glow"
              >
                Join Queue
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
