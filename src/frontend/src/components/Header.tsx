import { Clock, MapPin, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { Link, useRouter } from "../router";
import BookingModal from "./BookingModal";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const { page } = useRouter();

  const navLinks = [
    { label: "Home", path: "/" as const },
    { label: "About", path: "/about" as const },
    { label: "Services", path: "/services" as const },
    { label: "Gallery", path: "/gallery" as const },
    { label: "Contact", path: "/contact" as const },
  ];

  return (
    <>
      <div className="sticky-header">
        {/* Top bar */}
        <div className="bg-navy py-2 px-4 text-white text-sm">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="tel:08807778733"
                className="flex items-center gap-1 hover:text-teal transition-colors"
                data-ocid="header.phone.link"
              >
                <Phone size={14} />
                <span>088077 78733</span>
              </a>
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                <span>Boat House Rd, Pondicherry</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                <span>Open All Days</span>
              </span>
            </div>
            <span className="text-teal font-semibold hidden sm:block">
              🚤 Premium Boat Rides in Pondicherry
            </span>
          </div>
        </div>

        {/* Main navbar */}
        <nav className="bg-teal shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" data-ocid="header.home.link">
              <img
                src="/assets/uploads/logo-019d200e-ffd3-738f-8311-a100ffc97ee4-1.png"
                alt="LEO Boating Adventure"
                className="h-14 w-auto"
                onError={(e) => {
                  const t = e.currentTarget;
                  t.style.display = "none";
                  const parent = t.parentElement;
                  if (parent) {
                    parent.innerHTML =
                      '<span style="color:white;font-family:Poppins,sans-serif;font-weight:900;font-size:1.2rem">🚤 LEO BOATING</span>';
                  }
                }}
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  data-ocid={`header.${link.label.toLowerCase()}.link`}
                  className={`font-poppins text-sm uppercase tracking-wider transition-colors ${
                    page === link.path
                      ? "text-white border-b-2 border-white font-bold"
                      : "text-white/85 hover:text-white font-semibold"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => setBookingOpen(true)}
                data-ocid="header.book_now.button"
                className="btn-gold px-5 py-2 rounded-full text-sm font-poppins font-bold uppercase tracking-wider"
              >
                🔥 Book Now
              </button>
            </div>

            <button
              type="button"
              className="md:hidden text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-ocid="header.mobile_menu.toggle"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileOpen && (
            <div className="md:hidden bg-navy px-4 pb-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  data-ocid={`header.mobile.${link.label.toLowerCase()}.link`}
                  onClick={() => setMobileOpen(false)}
                  className="text-white font-poppins font-semibold py-2 border-b border-white/10 block"
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  setBookingOpen(true);
                  setMobileOpen(false);
                }}
                data-ocid="header.mobile.book_now.button"
                className="btn-gold px-5 py-2 rounded-full text-sm font-poppins font-bold uppercase tracking-wider mt-2"
              >
                🔥 Book Now
              </button>
            </div>
          )}
        </nav>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
