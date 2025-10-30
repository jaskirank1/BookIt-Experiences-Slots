import React from "react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  id: string;
  imageUrl: string;
  title: string;
  state: string;
  description: string;
  price: string;
  onViewDetails: () => void;
}

const Card: React.FC<CardProps> = ({
  id,
  imageUrl,
  title,
  state,
  description,
  price,
}) => {
  const navigate = useNavigate();
  console.log(imageUrl);
  return (
    <div
      key={id}
      className="
        w-[280px] h-[320px]
        sm:w-[280px] sm:h-[320px]
        xs:w-[240px] xs:h-[300px]
        max-[320px]:w-[200px] max-[320px]:h-[260px]
        rounded-[12px] overflow-hidden shadow-md bg-white flex flex-col
      "
    >
      {/* Image */}
      <img
        src={imageUrl}
        alt={title}
        className="
          w-full h-[170px]
          max-[320px]:h-[120px]
          object-cover
        "
      />

      {/* Content */}
      <div
        className="
          w-full flex-1
          bg-[#F0F0F0] px-3 py-2 pb-3
          flex flex-col justify-between gap-2
        "
      >
        {/* Title + State */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h2
              className="
                text-[#161616] font-medium font-inter
                text-[16px] max-[320px]:text-[13px]
              "
            >
              {title}
            </h2>
            <span
              className="
                bg-[#D6D6D6] text-[#161616]
                text-[12px] max-[320px]:text-[10px]
                rounded px-2 py-[2px]
              "
            >
              {state}
            </span>
          </div>

          <p
            className="
              text-[14px] max-[320px]:text-[11px]
              text-[#161616] leading-[18px]
              overflow-hidden line-clamp-2
            "
          >
            {description}
          </p>
        </div>

        {/* Price & Button in one row */}
        <div className="flex justify-between items-center w-full mt-1">
          <div className="flex items-center gap-1">
            <span className="text-[#161616] text-[12px] max-[320px]:text-[10px]">
              From
            </span>
            <span
              className="
                text-[#161616] font-medium
                text-[20px] max-[320px]:text-[16px]
              "
            >
              {price}
            </span>
          </div>

          <button
            onClick={() => navigate(`/details/${id}`)}
            className="
              bg-[#FFD643] text-[#161616] font-medium rounded
              text-sm max-[320px]:text-[11px]
              px-2 py-[6px]
              w-[99px] h-[30px]
              max-[320px]:w-[80px] max-[320px]:h-[26px]
              hover:bg-[#f7cd3d] transition
              cursor-pointer
            "
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;