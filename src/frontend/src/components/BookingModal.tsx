import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitBooking } from "../hooks/useQueries";

interface Props {
  open: boolean;
  onClose: () => void;
}

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

export default function BookingModal({ open, onClose }: Props) {
  const [form, setForm] = useState({
    client: "",
    phone: "",
    date: "",
    package: "",
  });
  const { mutateAsync, isPending } = useSubmitBooking();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.client || !form.phone || !form.date || !form.package) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await mutateAsync(form);
      toast.success("Booking submitted! We'll contact you shortly. 🚤");
      setForm({ client: "", phone: "", date: "", package: "" });
      onClose();
    } catch {
      toast.error("Failed to submit booking. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md" data-ocid="booking.modal">
        <DialogHeader>
          <DialogTitle className="font-poppins text-navy text-xl font-bold">
            🚤 Book Your Ride
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <Label
              htmlFor="bm-name"
              className="font-poppins text-navy font-semibold"
            >
              Your Name
            </Label>
            <Input
              id="bm-name"
              data-ocid="booking.name.input"
              placeholder="Enter your full name"
              value={form.client}
              onChange={(e) =>
                setForm((p) => ({ ...p, client: e.target.value }))
              }
            />
          </div>
          <div>
            <Label
              htmlFor="bm-phone"
              className="font-poppins text-navy font-semibold"
            >
              Phone Number
            </Label>
            <Input
              id="bm-phone"
              data-ocid="booking.phone.input"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={(e) =>
                setForm((p) => ({ ...p, phone: e.target.value }))
              }
            />
          </div>
          <div>
            <Label
              htmlFor="bm-date"
              className="font-poppins text-navy font-semibold"
            >
              Preferred Date
            </Label>
            <Input
              id="bm-date"
              type="date"
              data-ocid="booking.date.input"
              value={form.date}
              onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
            />
          </div>
          <div>
            <Label className="font-poppins text-navy font-semibold">
              Select Package
            </Label>
            <Select
              value={form.package}
              onValueChange={(v) => setForm((p) => ({ ...p, package: v }))}
            >
              <SelectTrigger data-ocid="booking.package.select">
                <SelectValue placeholder="Choose a package" />
              </SelectTrigger>
              <SelectContent>
                {PACKAGES.map((pkg) => (
                  <SelectItem key={pkg} value={pkg}>
                    {pkg}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <button
            type="submit"
            disabled={isPending}
            data-ocid="booking.submit.button"
            className="btn-gold w-full py-3 rounded-full font-poppins font-bold text-white flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isPending ? <Loader2 size={18} className="animate-spin" /> : null}
            {isPending ? "Submitting..." : "Confirm Booking"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
