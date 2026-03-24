import { Clock, Loader2, MapPin, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useSubmitBooking } from "../hooks/useQueries";

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("visible");
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

const CONTACT_CARDS = [
  {
    icon: "address",
    label: "Address",
    value: "Boat House Rd, near Pondy Marina, Pondicherry",
    href: undefined as string | undefined,
  },
  {
    icon: "phone",
    label: "Phone",
    value: "088077 78733",
    href: "tel:08807778733",
  },
  {
    icon: "hours",
    label: "Hours",
    value: "Open All Days | 7:00 AM – 7:00 PM",
    href: undefined,
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

export default function Contact() {
  const [form, setForm] = useState({
    client: "",
    phone: "",
    date: "",
    package: "",
  });
  const { mutateAsync, isPending } = useSubmitBooking();
  const pageRef = useFadeIn();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.client || !form.phone || !form.date || !form.package) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await mutateAsync(form);
      toast.success(
        "Your booking request has been sent! We'll contact you shortly. 🚤",
      );
      setForm({ client: "", phone: "", date: "", package: "" });
    } catch {
      toast.error("Failed to send. Please try again or call us directly.");
    }
  };

  const renderIcon = (icon: string) => {
    if (icon === "phone") return <Phone size={28} />;
    if (icon === "hours") return <Clock size={28} />;
    return <MapPin size={28} />;
  };

  return (
    <div ref={pageRef}>
      <section className="bg-navy py-16 px-4 text-center">
        <h1 className="font-poppins font-black text-white text-4xl md:text-5xl mb-4 fade-up">
          Contact <span className="text-gold">Us</span>
        </h1>
        <p className="text-white/70 font-opensans text-lg fade-up">
          Get in touch to book your adventure
        </p>
      </section>

      <section className="py-16 px-4 bg-[#F0F8FF]">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6 mb-16">
          {CONTACT_CARDS.map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-2xl shadow-md p-6 text-center border-t-4 border-teal fade-up"
            >
              <div className="text-teal flex justify-center mb-3">
                {renderIcon(item.icon)}
              </div>
              <h3 className="font-poppins font-bold text-navy text-lg mb-2">
                {item.label}
              </h3>
              {item.href ? (
                <a
                  href={item.href}
                  data-ocid="contact.phone.link"
                  className="text-gray-600 font-opensans text-sm hover:text-teal transition-colors"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-gray-600 font-opensans text-sm">
                  {item.value}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
          <div className="fade-up rounded-2xl overflow-hidden shadow-xl h-96">
            <iframe
              title="LEO Boating Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.8!2d79.8382!3d11.9335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a536159b6d3e1d1%3A0x1!2sBoat+House+Rd%2C+Pondicherry!5e0!3m2!1sen!2sin!4v1!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-8 space-y-5 fade-up"
            data-ocid="contact.form"
          >
            <h3 className="font-poppins font-black text-navy text-2xl mb-2">
              Book / Enquire
            </h3>
            <div>
              <label
                htmlFor="ct-name"
                className="block font-poppins font-semibold text-navy text-sm mb-1"
              >
                Your Name *
              </label>
              <input
                id="ct-name"
                data-ocid="contact.name.input"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 font-opensans text-sm focus:outline-none focus:ring-2"
                placeholder="Enter your full name"
                value={form.client}
                onChange={(e) =>
                  setForm((p) => ({ ...p, client: e.target.value }))
                }
              />
            </div>
            <div>
              <label
                htmlFor="ct-phone"
                className="block font-poppins font-semibold text-navy text-sm mb-1"
              >
                Phone Number *
              </label>
              <input
                id="ct-phone"
                data-ocid="contact.phone.input"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 font-opensans text-sm focus:outline-none focus:ring-2"
                placeholder="Your phone number"
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
              />
            </div>
            <div>
              <label
                htmlFor="ct-date"
                className="block font-poppins font-semibold text-navy text-sm mb-1"
              >
                Preferred Date *
              </label>
              <input
                id="ct-date"
                type="date"
                data-ocid="contact.date.input"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 font-opensans text-sm focus:outline-none focus:ring-2"
                value={form.date}
                onChange={(e) =>
                  setForm((p) => ({ ...p, date: e.target.value }))
                }
              />
            </div>
            <div>
              <label
                htmlFor="ct-pkg"
                className="block font-poppins font-semibold text-navy text-sm mb-1"
              >
                Package *
              </label>
              <select
                id="ct-pkg"
                data-ocid="contact.package.select"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 font-opensans text-sm focus:outline-none focus:ring-2 bg-white"
                value={form.package}
                onChange={(e) =>
                  setForm((p) => ({ ...p, package: e.target.value }))
                }
              >
                <option value="">Select a package</option>
                {PACKAGES.map((pkg) => (
                  <option key={pkg} value={pkg}>
                    {pkg}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={isPending}
              data-ocid="contact.submit.button"
              className="btn-gold w-full py-4 rounded-full font-poppins font-bold text-white text-sm uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isPending ? (
                <Loader2 size={18} className="animate-spin" />
              ) : null}
              {isPending ? "Sending..." : "🚤 Send Booking Request"}
            </button>
          </form>
        </div>
      </section>

      <section className="py-10 px-4 bg-teal text-center">
        <p className="font-poppins font-bold text-white text-xl mb-4 fade-up">
          Ready to ride? Call us now!
        </p>
        <a
          href="tel:08807778733"
          data-ocid="contact.call_now.button"
          className="inline-flex items-center gap-2 bg-white text-teal font-poppins font-bold px-8 py-3 rounded-full text-sm uppercase tracking-wider hover:bg-navy hover:text-white transition-colors fade-up"
        >
          <Phone size={18} /> 088077 78733
        </a>
      </section>
    </div>
  );
}
