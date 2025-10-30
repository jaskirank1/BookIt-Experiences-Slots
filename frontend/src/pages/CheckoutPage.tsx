import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CheckoutSummaryCard from "../components/CheckoutSummaryCard";

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Destructure values from state
  const {
    experienceId,
    title,
    basePrice,
    taxes,
    selectedDate,
    selectedSlot,
    quantity,
  } = state || {};

  const subtotal = basePrice * quantity;
  const total = subtotal + taxes;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(total);
  const [promoMessage, setPromoMessage] = useState("");

  // redirect if accessed directly without data
  useEffect(() => {
    if (!state) navigate("/");
  }, [state, navigate]);

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setPromoMessage("Please enter a promo code.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/promo/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: promoCode,
          totalAmount: total,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setPromoMessage(data.message || "Invalid promo code.");
        setDiscount(0);
        setFinalAmount(total);
        return;
      }

      setDiscount(data.data.discount);
      setFinalAmount(data.data.finalAmount);
      setPromoMessage(`Promo applied! You saved ₹${data.data.discount}`);
    } catch (error) {
      console.error("Error applying promo:", error);
      setPromoMessage("Something went wrong. Please try again.");
    }
  };

  const handlePayConfirm = async () => {
    if (!agreed) {
      alert("Please agree to the terms and safety policy before continuing.");
      return;
    }

    if (!fullName || !email) {
      alert("Please fill in your full name and email.");
      return;
    }

    if (!selectedDate) return;
    
    const [m, d] = selectedDate.split(" ");
    const y = new Date().getFullYear();
    const obj = new Date(`${m} ${d}, ${y}`);
    const formatted = `${obj.getFullYear()}-${String(obj.getMonth() + 1).padStart(2, "0")}-${String(obj.getDate()).padStart(2, "0")}`;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experienceId,
          date: formatted,
          time: selectedSlot,
          quantity,
          user: {
            name: fullName,
            email: email,
          },
          promoCode: promoCode || null,
          discountAmount: discount,
          totalPrice: finalAmount,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/confirmation", {
          state: { bookingId: data.data._id },
        });
      } else {
        alert(data.message || "Failed to confirm booking");
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-[124px] py-6 sm:py-8">
      {/* Back + Details Heading */}
      <div
        className="flex items-center gap-2 mb-6 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-5 h-5 text-black" />
        <span className="text-[14px] font-medium text-black">Details</span>
      </div>

      {/* Two-column layout: Form (left) + Summary Card (right) */}
      <div className="flex flex-wrap justify-center items-start gap-8 w-full">
        {/* LEFT SIDE FORM */}
        <form
          className="w-[780px] max-w-full bg-[#EFEFEF] rounded-[12px] p-4 sm:p-6 flex flex-col gap-4 font-inter"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-wrap gap-x-6 gap-y-3 w-full">

            {/* Full Name */}
            <div className="flex flex-col gap-2 flex-1 min-w-[250px] max-[460px]:min-w-[180px] max-[350px]:min-w-[140px]">
              <label className="text-[14px] text-[#5B5B5B]">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full h-[42px] bg-[#DDDDDD] rounded-[6px] px-4 text-[14px] text-[#161616] outline-none"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2 flex-1 min-w-[250px] max-[460px]:min-w-[180px] max-[350px]:min-w-[140px]">
              <label className="text-[14px] text-[#5B5B5B]">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[42px] bg-[#DDDDDD] rounded-[6px] px-4 text-[14px] text-[#161616] outline-none"
              />
            </div>

          </div>

          {/* Promo Code + Apply Button */}
          <div className="flex flex-wrap items-center gap-4 w-full">
            <input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 min-w-[200px] h-[42px] bg-[#DDDDDD] rounded-[6px] px-4 text-[14px] text-[#161616] outline-none"
            />

            <button
              type="button"
              onClick={handleApplyPromo}
              className="
                w-[120px] h-[42px] bg-[#161616] rounded-[6px] text-white text-[15px] font-medium md:w-[104px]
                max-[460px]:w-[90px] max-[460px]:text-[13px] max-[460px]:h-[38px]
              "
            >
              Apply
            </button>

            {/* Promo Message */}
            {promoMessage && (
              <p
                className={`text-[13px] ${
                  promoMessage.includes("saved") ? "text-green-600" : "text-red-600"
                }`}
              >
                {promoMessage}
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-center gap-2 mt-1">
            <input
              id="agree"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 accent-[#161616]"
            />
            <label htmlFor="agree" className="text-[12px] text-[#5B5B5B]">
              I agree to the terms and safety policy
            </label>
          </div>
        </form>

        {/* RIGHT SIDE SUMMARY CARD */}
        <div className="flex-shrink-0 max-[416px]:w-full">
          <CheckoutSummaryCard
            experienceName={title}
            date={selectedDate}
            time={selectedSlot}
            quantity={quantity}
            subtotal={subtotal}
            taxes={taxes}
            discount={discount}
            total={finalAmount}
            onPayConfirm={handlePayConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
