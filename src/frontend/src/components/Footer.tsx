import { Clock, MapPin, Phone } from "lucide-react";
import { Link } from "../router";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <img
            src="/assets/uploads/logo-019d200e-ffd3-738f-8311-a100ffc97ee4-1.png"
            alt="LEO Boating Adventure"
            className="h-14 mb-4"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <p className="text-white/70 text-sm leading-relaxed font-opensans">
            Experience the beauty of Pondicherry's waterways with safe and
            exciting boat rides.
          </p>
          <div className="flex gap-3 mt-4">
            <a
              href="https://wa.me/918807778733"
              target="_blank"
              rel="noreferrer"
              className="text-teal hover:text-white transition-colors text-sm font-semibold"
            >
              WhatsApp
            </a>
            <span className="text-white/30">|</span>
            <a
              href="tel:08807778733"
              className="text-teal hover:text-white transition-colors text-sm font-semibold"
            >
              Call Us
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-poppins font-bold text-gold uppercase tracking-wider mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2">
            {[
              { label: "Home", path: "/" as const },
              { label: "About", path: "/about" as const },
              { label: "Services", path: "/services" as const },
              { label: "Gallery", path: "/gallery" as const },
              { label: "Contact", path: "/contact" as const },
            ].map((l) => (
              <li key={l.path}>
                <Link
                  to={l.path}
                  data-ocid={`footer.${l.label.toLowerCase()}.link`}
                  className="text-white/70 hover:text-teal transition-colors text-sm font-opensans"
                >
                  → {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-poppins font-bold text-gold uppercase tracking-wider mb-4">
            Our Services
          </h4>
          <ul className="space-y-2">
            {[
              "Speed Boat Ride",
              "Family Ride",
              "Couple Ride",
              "Sunset Ride",
              "Private Boat",
            ].map((s) => (
              <li key={s}>
                <Link
                  to="/services"
                  data-ocid="footer.services.link"
                  className="text-white/70 hover:text-teal transition-colors text-sm font-opensans"
                >
                  → {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-poppins font-bold text-gold uppercase tracking-wider mb-4">
            Contact Us
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-white/70 text-sm font-opensans">
              <MapPin size={16} className="text-teal mt-0.5 shrink-0" />
              Boat House Rd, near Pondy Marina, Pondicherry
            </li>
            <li className="flex items-center gap-2 text-white/70 text-sm font-opensans">
              <Phone size={16} className="text-teal shrink-0" />
              <a
                href="tel:08807778733"
                className="hover:text-teal transition-colors"
              >
                088077 78733
              </a>
            </li>
            <li className="flex items-center gap-2 text-white/70 text-sm font-opensans">
              <Clock size={16} className="text-teal shrink-0" />
              Open All Days
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center">
        <p className="text-white/50 text-sm font-opensans">
          © {year} LEO Boating Adventure | Design by KVS Digital World | Built
          with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noreferrer"
            className="text-teal hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
