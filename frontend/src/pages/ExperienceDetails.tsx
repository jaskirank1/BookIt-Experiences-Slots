import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import ExperienceSummaryCard from "../components/ExperienceSummaryCard";
import { asset } from "../assets/asset";

interface FixedSlot {
  time: string;
  maxCapacity: number;
  bookedCount?: number;
  remainingSeats?: number;
}

interface Experience {
  _id: string;
  title: string;
  description: string;
  location: string;
  basePrice: number;
  images: string[];
  imageKey: keyof typeof asset;
  category: string;
  fixedSlots: FixedSlot[];
}

const ExperienceDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [dates, setDates] = useState<string[]>([]);
  const [slotAvailability, setSlotAvailability] = useState<FixedSlot[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const today = new Date();
    const arr: string[] = [];
    for (let i = 0; i < 5; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      arr.push(
        d.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
        })
      );
    }
    setDates(arr);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const r = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/experiences/${id}`);
        setExperience(r.data.data);
        setSlotAvailability(r.data.data.fixedSlots);
      } catch (e) {
        setError("Failed to load experience details");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  useEffect(() => {
    if (!selectedDate || !id) return;
    const [m, d] = selectedDate.split(" ");
    const y = new Date().getFullYear();
    const obj = new Date(`${m} ${d}, ${y}`);
    const formatted = `${obj.getFullYear()}-${String(obj.getMonth() + 1).padStart(2, "0")}-${String(obj.getDate()).padStart(2, "0")}`;

    const load = async () => {
      try {
        const r = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/experiences/${id}/availability?date=${formatted}`
        );
        setSlotAvailability(r.data.data);
      } catch {}
    };
    load();
  }, [selectedDate, id]);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  if (error || !experience) return <p className="text-center mt-10 text-red-500">{error || "Not Found"}</p>;

  const taxes = Math.round(experience.basePrice * 0.12);
  const selectedSlotData = slotAvailability.find(s => s.time === selectedSlot);
  const remainingSlots = selectedSlotData?.remainingSeats ?? 0;

  const handleConfirm = () => {
    if (!selectedDate || !selectedSlot) return;
    navigate("/checkout", {
      state: {
        experienceId: experience._id,
        title: experience.title,
        basePrice: experience.basePrice,
        taxes,
        selectedDate,
        selectedSlot,
        quantity,
      },
    });
  };

  return (
    <div
      className="
        px-4 py-8
        sm:px-5
        md:px-10
        lg:px-20
        xl:px-[124px]
      "
    >

      {/* Back */}
      <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => navigate(-1)}>
        <ArrowLeft className="w-5 h-5 text-black" />
        <span className="text-xs sm:text-sm font-medium text-black">Details</span>
      </div>

      {/* Image + card */}
      <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-start lg:justify-start">

        {/* Image */}
        <div className="w-full rounded-xl overflow-hidden
          h-[200px] sm:h-[240px] md:h-[300px] lg:w-[765px] lg:h-[381px]">
          <img 
            src={asset[experience.imageKey]} 
            alt={experience.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Summary card */}
        <div className="w-full flex justify-center lg:w-auto lg:justify-start">
          <ExperienceSummaryCard
            startsAt={`₹${experience.basePrice}`}
            basePrice={experience.basePrice}
            taxes={taxes}
            dateSelected={!!selectedDate}
            timeSelected={!!selectedSlot}
            remainingSlots={remainingSlots}
            quantity={quantity}
            onQuantityChange={setQuantity}
            onConfirm={handleConfirm}
          />
        </div>

      </div>

      {/* Title + description */}
      <div className="w-full max-w-[765px] mt-10 flex flex-col gap-4 md:px-0">
        <h2 className="text-xl sm:text-2xl md:text-[24px] font-medium text-[#161616]">{experience.title}</h2>
        <p className="text-sm sm:text-[15px] md:text-[16px] text-[#6C6C6C] break-words">
          {experience.description}
        </p>
      </div>

      {/* Choose Date */}
      <div className="w-full max-w-[389px] flex flex-col gap-3 mt-10">
        <h3 className="text-base sm:text-lg md:text-[18px] font-medium text-[#161616]">
          Choose Date
        </h3>

        <div className="flex flex-wrap gap-3 w-full space-between md:justify-start">
          {dates.map(date => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`min-w-[65px] px-3 h-[34px] rounded-md text-[14px] border
                ${selectedDate === date
                  ? "bg-[#FFD643] text-black"
                  : "bg-white text-[#838383] border-[#BDBDBD]"
                }`}
            >
              {date}
            </button>
          ))}
        </div>
      </div>

      {/* Choose Time */}
      <div className="w-full max-w-[600px] flex flex-col gap-3 mt-10 md:px-0">
        <h3 className="text-base sm:text-lg md:text-[18px] font-medium text-[#161616]">Choose Time</h3>

        <div className="flex flex-wrap gap-3 w-full">
          {slotAvailability.map(slot => {
            const sold = slot.remainingSeats === 0;
            const sel = selectedSlot === slot.time;

            return (
              <button
                key={slot.time}
                disabled={!selectedDate || sold}
                onClick={() => !sold && selectedDate && setSelectedSlot(slot.time)}
                className={`flex justify-between items-center min-w-[90px] sm:min-w-[110px] h-[34px] rounded-md px-2 text-[12px] sm:text-[13px] border
                  ${!selectedDate ? "bg-[#f2f2f2] text-[#A0A0A0]" :
                    sold ? "bg-[#CCCCCC]" :
                    sel ? "bg-[#FFD643] text-black" :
                    "bg-transparent text-[#838383] border-[#BDBDBD]"}
                `}
              >
                <span>{slot.time}</span>
                {selectedDate && (
                  <span className={`text-[9px] sm:text-[10px] font-medium ${sold ? "text-[#6A6A6A]" : "text-[#FF4C0A]"}`}>
                    {sold ? "Sold Out" : `${slot.remainingSeats} left`}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <p className="text-[11px] sm:text-[12px] text-[#838383] mt-2">All times are in IST</p>
      </div>

      {/* About */}
      <div className="w-full max-w-[765px] flex flex-col gap-3 mt-10">
        <h3 className="text-base sm:text-lg md:text-[18px] font-medium text-[#161616]">About</h3>

        <div className="bg-[#EEEEEE] rounded-md px-3 py-2">
          <p className="text-[11px] sm:text-[12px] text-[#838383] leading-[16px] break-words">
            Get ready for an exciting experience curated specially for you. You’ll learn, explore & connect!
          </p>
        </div>
      </div>
    </div>
  );
}

export default ExperienceDetails;