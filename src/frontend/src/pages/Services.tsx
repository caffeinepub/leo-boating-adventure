import { useEffect, useRef, useState } from "react";
import BookingModal from "../components/BookingModal";

const SERVICES = [
  {
    icon: "⚡",
    title: "Speed Boat Ride",
    desc: "Feel the thrill of cutting through waves at high speed. An adrenaline rush you'll never forget.",
    price: "₹500/person",
    duration: "30 min",
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Family Ride",
    desc: "A comfortable and safe boat ride designed for the whole family. Kids and parents alike will love it.",
    price: "₹1500/family",
    duration: "45 min",
  },
  {
    icon: "💑",
    title: "Couple Ride",
    desc: "A romantic private boat experience for couples. Ideal for honeymoons, anniversaries, and date nights.",
    price: "₹800/couple",
    duration: "45 min",
  },
  {
    icon: "🌅",
    title: "Sunset Ride",
    desc: "Watch the magical Pondicherry sunset from the water. The golden sky and calm seas create a perfect backdrop.",
    price: "₹600/person",
    duration: "1 hour",
  },
  {
    icon: "🚢",
    title: "Private Boat",
    desc: "Book an entire boat for your group. Customize your route and enjoy complete privacy on the water.",
    price: "₹3000/boat",
    duration: "1 hour",
  },
  {
    icon: "👥",
    title: "Group Ride",
    desc: "Perfect for friends and large groups. Share the excitement of a boat ride with up to 20 people.",
    price: "₹300/person",
    duration: "45 min",
  },
  {
    icon: "🎂",
    title: "Birthday Ride",
    desc: "Make your birthday truly special with a themed boat ride, decorations, and celebration on the water.",
    price: "₹2500",
    duration: "1.5 hours",
  },
  {
    icon: "🏢",
    title: "Corporate Ride",
    desc: "Team building and corporate outings on the water. A refreshing break for your team with customized packages.",
    price: "Custom Pricing",
    duration: "Flexible",
  },
  {
    icon: "✨",
    title: "Custom Package",
    desc: "Have a specific idea in mind? We create fully customized experiences tailored to your requirements.",
    price: "Contact Us",
    duration: "Custom",
  },
];

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

export default function Services() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const pageRef = useFadeIn();

  return (
    <div ref={pageRef}>
      <section className="bg-navy py-16 px-4 text-center">
        <h1 className="font-poppins font-black text-white text-4xl md:text-5xl mb-4 fade-up">
          Our <span className="text-gold">Services</span>
        </h1>
        <p className="text-white/70 font-opensans text-lg fade-up">
          Choose from our wide range of boat ride packages
        </p>
      </section>

      <section className="py-20 px-4 bg-[#F0F8FF]">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc, i) => (
              <div
                key={svc.title}
                data-ocid={`services.card.item.${i + 1}`}
                className="service-card bg-white rounded-2xl shadow-md overflow-hidden fade-up"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="bg-navy p-6 text-center">
                  <div className="text-5xl mb-2">{svc.icon}</div>
                  <h3 className="font-poppins font-bold text-white text-xl">
                    {svc.title}
                  </h3>
                  <div className="flex justify-center gap-4 mt-3">
                    <span className="bg-teal/20 text-teal text-xs font-poppins font-semibold px-3 py-1 rounded-full">
                      {svc.duration}
                    </span>
                    <span className="bg-gold/20 text-gold text-xs font-poppins font-semibold px-3 py-1 rounded-full">
                      {svc.price}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 font-opensans text-sm leading-relaxed mb-4">
                    {svc.desc}
                  </p>
                  <button
                    type="button"
                    onClick={() => setBookingOpen(true)}
                    data-ocid={`services.book_now.button.${i + 1}`}
                    className="btn-gold w-full py-3 rounded-full font-poppins font-bold text-white text-sm uppercase tracking-wider"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
