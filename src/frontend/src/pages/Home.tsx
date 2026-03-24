import { DollarSign, MapPin, Shield, Users, ZoomIn } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import BookingModal from "../components/BookingModal";
import { useSubmitBooking } from "../hooks/useQueries";
import { Link } from "../router";

const GALLERY_PREVIEW = [
  {
    src: "/assets/generated/gallery-family.dim_600x400.jpg",
    label: "Family Ride",
  },
  {
    src: "/assets/generated/gallery-couple.dim_600x400.jpg",
    label: "Couple Ride",
  },
  {
    src: "/assets/generated/gallery-group.dim_600x400.jpg",
    label: "Corporate Group",
  },
  {
    src: "/assets/generated/gallery-sunset.dim_600x400.jpg",
    label: "Sunset Ride",
  },
  {
    src: "/assets/generated/gallery-mangrove.dim_600x400.jpg",
    label: "Mangrove View",
  },
  {
    src: "/assets/generated/gallery-marina.dim_600x400.jpg",
    label: "Marina View",
  },
];

const RIDE_POINTS = [
  {
    icon: "🌊",
    label: "Backwater Ride",
    desc: "Glide through serene backwaters",
  },
  {
    icon: "🌅",
    label: "Sunset Point Ride",
    desc: "Witness breathtaking sunsets",
  },
  {
    icon: "🌴",
    label: "Mangrove View Ride",
    desc: "Explore lush mangrove forests",
  },
  {
    icon: "🐦",
    label: "Nature & Bird Watching",
    desc: "Spot exotic coastal birds",
  },
  {
    icon: "🌉",
    label: "Pondy Marina View",
    desc: "See Pondicherry from the sea",
  },
];

const GROUP_ITEMS = [
  {
    icon: "🏢",
    label: "Corporate Events",
    desc: "Impress your clients and partners",
  },
  { icon: "👥", label: "Team Outings", desc: "Build stronger team bonds" },
  {
    icon: "🎯",
    label: "Group Adventures",
    desc: "Thrilling rides for large groups",
  },
  {
    icon: "🎉",
    label: "Private Celebrations",
    desc: "Celebrate milestones on water",
  },
];

const HIGHLIGHT_CARDS = [
  {
    icon: <Shield size={28} />,
    label: "Safety First",
    desc: "Certified lifeguards & life jackets",
  },
  {
    icon: <Users size={28} />,
    label: "Experienced Crew",
    desc: "Trained & licensed boat operators",
  },
  {
    icon: <DollarSign size={28} />,
    label: "Affordable Price",
    desc: "Best rates for all packages",
  },
  {
    icon: <MapPin size={28} />,
    label: "Best Location",
    desc: "Near Pondy Marina beachfront",
  },
];

const PACKAGES = [
  "Speed Boat Ride",
  "Family Ride",
  "Couple Ride",
  "Sunset Ride",
  "Private Boat",
  "Group Ride",
  "Birthday Ride",
  "Corporate Ride",
  "Custom Package",
];

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        }
      },
      { threshold: 0.1 },
    );
    for (const e of Array.from(el.querySelectorAll(".fade-up"))) {
      observer.observe(e);
    }
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [form, setForm] = useState({
    client: "",
    phone: "",
    date: "",
    package: "",
  });
  const { mutateAsync, isPending } = useSubmitBooking();
  const pageRef = useFadeIn();

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.client || !form.phone || !form.date || !form.package) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await mutateAsync(form);
      toast.success("Booking submitted! We'll contact you shortly. 🚤");
      setForm({ client: "", phone: "", date: "", package: "" });
    } catch {
      toast.error("Failed to submit booking. Please try again.");
    }
  };

  return (
    <div ref={pageRef}>
      {/* HERO */}
      <section
        className="relative min-h-[90vh] flex items-center"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-boat.dim_1400x700.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2C4A]/85 to-[#0B2C4A]/40" />
        <div className="relative max-w-7xl mx-auto px-4 py-24 lg:py-32">
          <p className="text-teal font-poppins font-bold uppercase tracking-[0.3em] text-sm mb-3 fade-up">
            LEO BOATING ADVENTURE
          </p>
          <h1 className="text-white font-poppins font-black text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 fade-up max-w-2xl">
            Explore Pondicherry
            <br />
            <span className="text-gold">Like Never Before</span>
          </h1>
          <p className="text-white/80 font-opensans text-lg mb-10 max-w-xl fade-up">
            Luxury boat rides, scenic views &amp; unforgettable moments await
            you.
          </p>
          <div className="flex flex-wrap gap-4 fade-up">
            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              data-ocid="hero.book_now.button"
              className="btn-gold px-8 py-4 rounded-full text-white font-poppins font-bold uppercase tracking-wider text-sm"
            >
              🚤 Book Now
            </button>
            <a
              href="tel:08807778733"
              data-ocid="hero.call_now.button"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-poppins font-bold uppercase tracking-wider text-sm hover:bg-white hover:text-navy transition-colors"
            >
              📞 Call Now
            </a>
          </div>
        </div>

        {/* Highlight cards overlapping hero bottom */}
        <div className="absolute -bottom-20 left-0 right-0 px-4 hidden lg:block">
          <div className="max-w-5xl mx-auto grid grid-cols-4 gap-4">
            {HIGHLIGHT_CARDS.map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-xl shadow-xl p-5 border-t-4 border-teal text-center fade-up"
              >
                <div className="text-teal mb-2 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="font-poppins font-bold text-navy text-sm mb-1">
                  {item.label}
                </h3>
                <p className="text-gray-500 text-xs font-opensans">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile highlight cards */}
      <div className="lg:hidden bg-[#F0F8FF] py-8 px-4">
        <div className="max-w-xl mx-auto grid grid-cols-2 gap-4">
          {HIGHLIGHT_CARDS.map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-xl shadow-md p-4 border-t-4 border-teal text-center fade-up"
            >
              <div className="text-teal mb-2 flex justify-center">
                {item.icon}
              </div>
              <h3 className="font-poppins font-bold text-navy text-sm">
                {item.label}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section className="pt-32 lg:pt-40 pb-20 bg-white px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="fade-up">
            <img
              src="/assets/generated/gallery-family.dim_600x400.jpg"
              alt="About LEO Boating"
              className="rounded-2xl shadow-xl w-full object-cover h-80"
            />
          </div>
          <div className="fade-up">
            <p className="text-teal font-poppins font-bold uppercase tracking-wider text-sm mb-2">
              About Us
            </p>
            <h2 className="font-poppins font-black text-navy text-3xl md:text-4xl mb-4">
              Welcome to LEO Boating Adventure
            </h2>
            <p className="text-gray-600 font-opensans mb-6 leading-relaxed">
              Experience the beauty of Pondicherry's waterways with safe and
              exciting boat rides. Perfect for families, couples, and adventure
              lovers.
            </p>
            <h3 className="font-poppins font-bold text-navy text-lg mb-4">
              🌊 Best Boat Riding Places
            </h3>
            <ul className="space-y-3">
              {RIDE_POINTS.map((p) => (
                <li key={p.label} className="flex items-start gap-3">
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <span className="font-poppins font-semibold text-navy text-sm">
                      {p.label}
                    </span>
                    <span className="text-gray-500 font-opensans text-sm ml-2">
                      — {p.desc}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              to="/about"
              data-ocid="home.about.link"
              className="inline-block mt-6 btn-teal px-6 py-3 rounded-full font-poppins font-bold text-sm text-white"
            >
              Learn More About Us →
            </Link>
          </div>
        </div>
      </section>

      {/* INDUSTRIAL GROUPS */}
      <section className="py-20 px-4 bg-navy">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <p className="text-teal font-poppins font-bold uppercase tracking-wider text-sm mb-2 fade-up">
            For Groups
          </p>
          <h2 className="font-poppins font-black text-white text-3xl md:text-4xl mb-4 fade-up">
            We Create Big Things with{" "}
            <span className="text-gold">Big Ideas</span>
          </h2>
          <p className="text-white/70 font-opensans fade-up">
            Best for companies &amp; large groups
          </p>
        </div>
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GROUP_ITEMS.map((item) => (
            <div
              key={item.label}
              className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-colors fade-up"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-poppins font-bold text-gold text-lg mb-2">
                {item.label}
              </h3>
              <p className="text-white/70 font-opensans text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="py-20 px-4 bg-[#F0F8FF]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-teal font-poppins font-bold uppercase tracking-wider text-sm mb-2 fade-up">
              Memories
            </p>
            <h2 className="font-poppins font-black text-navy text-3xl md:text-4xl mb-4 fade-up">
              Our Gallery
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_PREVIEW.map((img, i) => (
              <Link
                key={img.label}
                to="/gallery"
                data-ocid={`home.gallery.item.${i + 1}`}
                className="gallery-item rounded-xl overflow-hidden fade-up aspect-video block"
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover"
                />
                <div className="gallery-overlay rounded-xl">
                  <div className="text-center text-white">
                    <ZoomIn size={28} className="mx-auto mb-2" />
                    <span className="font-poppins font-bold text-sm">
                      {img.label}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8 fade-up">
            <Link
              to="/gallery"
              data-ocid="home.gallery.view_all.button"
              className="btn-teal px-8 py-3 rounded-full font-poppins font-bold text-white text-sm inline-block"
            >
              View Full Gallery →
            </Link>
          </div>
        </div>
      </section>

      {/* BOOKING SECTION */}
      <section className="py-20 px-4 bg-teal">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-poppins font-black text-white text-3xl md:text-4xl mb-2 fade-up">
              📅 Book Your Ride Now
            </h2>
            <p className="text-white/80 font-opensans fade-up">
              Fill in the form and we'll confirm your booking
            </p>
          </div>
          <form
            onSubmit={handleBookingSubmit}
            className="bg-white rounded-2xl shadow-xl p-8 space-y-5 fade-up"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="hb-name"
                  className="block font-poppins font-semibold text-navy text-sm mb-1"
                >
                  Your Name *
                </label>
                <input
                  id="hb-name"
                  data-ocid="home.booking.name.input"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 font-opensans text-sm focus:outline-none focus:ring-2"
                  placeholder="Your full name"
                  value={form.client}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, client: e.target.value }))
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="hb-phone"
                  className="block font-poppins font-semibold text-navy text-sm mb-1"
                >
                  Phone Number *
                </label>
                <input
                  id="hb-phone"
                  data-ocid="home.booking.phone.input"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 font-opensans text-sm focus:outline-none focus:ring-2"
                  placeholder="Your phone number"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="hb-date"
                  className="block font-poppins font-semibold text-navy text-sm mb-1"
                >
                  Preferred Date *
                </label>
                <input
                  id="hb-date"
                  type="date"
                  data-ocid="home.booking.date.input"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 font-opensans text-sm focus:outline-none focus:ring-2"
                  value={form.date}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, date: e.target.value }))
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="hb-pkg"
                  className="block font-poppins font-semibold text-navy text-sm mb-1"
                >
                  Package *
                </label>
                <select
                  id="hb-pkg"
                  data-ocid="home.booking.package.select"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 font-opensans text-sm focus:outline-none focus:ring-2 bg-white"
                  value={form.package}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, package: e.target.value }))
                  }
                >
                  <option value="">Choose a package</option>
                  {PACKAGES.map((pkg) => (
                    <option key={pkg} value={pkg}>
                      {pkg}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              disabled={isPending}
              data-ocid="home.booking.submit.button"
              className="btn-gold w-full py-4 rounded-full font-poppins font-bold text-white text-sm uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isPending ? (
                <Loader2 size={18} className="animate-spin" />
              ) : null}
              {isPending ? "Submitting..." : "🚤 Confirm Booking"}
            </button>
          </form>
        </div>
      </section>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
