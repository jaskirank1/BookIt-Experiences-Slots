import { useNavigate, useLocation } from "react-router-dom";
import tickIcon from "../assets/tickMark.png";

const BookingConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const bookingId = location.state?.bookingId || "N/A";

  return (
    <div
      className="
        flex flex-col items-center w-full
        min-h-[calc(100vh-90px)] bg-white text-center
        py-8 sm:py-12 md:py-16 px-6 sm:px-10 md:px-20
        overflow-hidden
      "
    >
      {/* Tick Icon */}
      <img
        src={tickIcon}
        alt="Booking Confirmed"
        className="
          w-24 h-24 mb-6
          md:w-20 md:h-20
          sm:w-16 sm:h-16
          max-[420px]:w-14 max-[420px]:h-14
        "
      />

      {/* Title */}
      <h1
        className="
          text-[#161616] font-inter font-medium
          text-[32px] leading-[40px] mb-2
          md:text-[28px] md:leading-[36px]
          sm:text-[24px] sm:leading-[32px]
          max-[420px]:text-[20px] max-[420px]:leading-[26px]
        "
      >
        Booking Confirmed
      </h1>

      {/* Reference ID */}
      <p
        className="
          text-[#656565] text-[18px] mb-8
          md:text-[16px]
          sm:text-[14px]
          max-[420px]:text-[13px]
        "
      >
        Ref ID:{" "}
        <span className="font-medium text-[#161616]">{bookingId}</span>
      </p>

      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="
          bg-[#E3E3E3] text-[#656565] font-inter font-normal
          text-[16px] px-6 py-2 rounded-md transition hover:bg-[#d1d1d1]
          md:text-[15px] md:px-5 md:py-2
          sm:text-[14px] sm:px-4 sm:py-2
          max-[420px]:text-[13px] max-[420px]:px-3 max-[420px]:py-1.5
        "
      >
        Back to Home
      </button>
    </div>
  );
};

export default BookingConfirmationPage;
