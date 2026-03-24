import { CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TESTIMONIALS = [
  {
    name: "Rajesh Kumar",
    location: "Chennai",
    rating: 5,
    text: "Absolutely amazing experience! The sunset boat ride was breathtaking. The crew was professional and made sure we were safe throughout the journey. Highly recommend LEO Boating!",
  },
  {
    name: "Priya Sharma",
    location: "Bangalore",
    rating: 5,
    text: "We took the family ride and our kids absolutely loved it. The mangrove view was spectacular. Very affordable prices for such a premium experience. Will definitely visit again!",
  },
  {
    name: "Arjun & Deepa",
    location: "Hyderabad",
    rating: 5,
    text: "Perfect for our honeymoon! The couple's sunset ride was so romantic. The staff was very courteous and took beautiful photos for us. A memory we'll cherish forever.",
  },
  {
    name: "TechCorp Team",
    location: "Pondicherry",
    rating: 5,
    text: "Our corporate team outing was made special by LEO Boating. They handled our group of 30 people efficiently. Everyone had a great time. Excellent teamwork and service!",
  },
  {
    name: "Meena Iyer",
    location: "Coimbatore",
    rating: 5,
    text: "The bird watching boat ride was a unique experience. We spotted so many exotic birds in the mangroves. A great blend of nature and adventure. Loved every moment!",
  },
];

const WHY_CHOOSE = [
  {
    icon: "🛡️",
    label: "Safety First",
    desc: "All boats are equipped with life jackets, certified crew, and follow all maritime safety protocols.",
  },
  {
    icon: "⚓",
    label: "Experienced Crew",
    desc: "Our boat operators are licensed professionals with years of experience navigating Pondicherry waters.",
  },
  {
    icon: "💰",
    label: "Affordable Price",
    desc: "We offer the best value for money with competitive pricing across all our packages.",
  },
  {
    icon: "📍",
    label: "Best Location",
    desc: "Strategically located near Pondy Marina, offering easy access to the most scenic spots.",
  },
];

const STAR_INDICES = [0, 1, 2, 3, 4];

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

export default function About() {
  const [current, setCurrent] = useState(0);
  const pageRef = useFadeIn();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((p) => (p + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const t = TESTIMONIALS[current];

  return (
    <div ref={pageRef}>
      <section className="bg-navy py-16 px-4 text-center">
        <h1 className="font-poppins font-black text-white text-4xl md:text-5xl mb-4 fade-up">
          About <span className="text-gold">LEO Boating</span>
        </h1>
        <p className="text-white/70 font-opensans text-lg fade-up">
          Our story, our mission, our passion for the sea
        </p>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="fade-up">
            <img
              src="/assets/generated/gallery-speed.dim_600x400.jpg"
              alt="LEO Boating Story"
              className="rounded-2xl shadow-xl w-full object-cover h-80"
            />
          </div>
          <div className="fade-up">
            <p className="text-teal font-poppins font-bold uppercase tracking-wider text-sm mb-2">
              Our Story
            </p>
            <h2 className="font-poppins font-black text-navy text-3xl md:text-4xl mb-4">
              Sailing with Passion Since Day One
            </h2>
            <p className="text-gray-600 font-opensans mb-4 leading-relaxed">
              LEO Boating Adventure was born from a deep love of the sea and a
              desire to share Pondicherry's natural waterway beauty with the
              world. Founded by passionate mariners, we started with a single
              boat and a vision to create unforgettable experiences.
            </p>
            <p className="text-gray-600 font-opensans mb-4 leading-relaxed">
              Today, we operate a fleet of modern, well-maintained boats along
              Pondicherry's stunning coastline and backwaters. From serene
              mangrove explorations to thrilling speed rides, we cater to every
              type of adventure seeker.
            </p>
            <p className="text-gray-600 font-opensans leading-relaxed">
              Our commitment to safety, affordability, and exceptional service
              has made us the #1 choice for boat rides in Pondicherry. Join us
              for an experience that will stay with you long after you return to
              shore.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#F0F8FF]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-teal font-poppins font-bold uppercase tracking-wider text-sm mb-2 fade-up">
              Why Us
            </p>
            <h2 className="font-poppins font-black text-navy text-3xl md:text-4xl mb-4 fade-up">
              Why Choose LEO Boating?
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE.map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-teal fade-up"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 size={18} className="text-teal shrink-0" />
                  <h3 className="font-poppins font-bold text-navy text-lg">
                    {item.label}
                  </h3>
                </div>
                <p className="text-gray-500 font-opensans text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-navy">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-teal font-poppins font-bold uppercase tracking-wider text-sm mb-2 fade-up">
              Reviews
            </p>
            <h2 className="font-poppins font-black text-white text-3xl md:text-4xl mb-4 fade-up">
              What Our Customers Say
            </h2>
          </div>

          <div className="relative fade-up">
            <div className="bg-white/10 border border-white/20 rounded-2xl p-8 md:p-12 text-center min-h-[200px] flex flex-col items-center justify-center">
              <div className="flex gap-1 justify-center mb-4">
                {STAR_INDICES.slice(0, t.rating).map((si) => (
                  <span key={si} className="text-gold text-xl">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-white/90 font-opensans text-lg italic mb-6 leading-relaxed max-w-2xl">
                "{t.text}"
              </p>
              <p className="font-poppins font-bold text-gold">{t.name}</p>
              <p className="text-white/60 font-opensans text-sm">
                {t.location}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setCurrent(
                  (p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
                )
              }
              data-ocid="testimonials.prev.button"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 bg-teal text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gold transition-colors shadow-lg"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => setCurrent((p) => (p + 1) % TESTIMONIALS.length)}
              data-ocid="testimonials.next.button"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 bg-teal text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gold transition-colors shadow-lg"
            >
              ›
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((testimonial, i) => (
              <button
                type="button"
                key={testimonial.name}
                onClick={() => setCurrent(i)}
                data-ocid={`testimonials.dot.${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-gold" : "bg-white/30"}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
