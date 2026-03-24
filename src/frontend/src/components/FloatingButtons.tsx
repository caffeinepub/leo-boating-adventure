import { MessageCircle, Phone } from "lucide-react";

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-[9999]">
      {/* Call button */}
      <a
        href="tel:08807778733"
        data-ocid="floating.call.button"
        className="float-btn bg-blue-600 text-white group relative"
        title="Call Us"
      >
        <Phone size={20} />
        <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-navy text-white text-xs font-poppins font-semibold px-3 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Call Us
        </span>
      </a>

      {/* WhatsApp button */}
      <a
        href="https://wa.me/918807778733"
        target="_blank"
        rel="noreferrer"
        data-ocid="floating.whatsapp.button"
        className="float-btn bg-green-500 text-white group relative"
        title="WhatsApp"
      >
        <MessageCircle size={20} />
        <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-navy text-white text-xs font-poppins font-semibold px-3 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          WhatsApp
        </span>
      </a>
    </div>
  );
}
