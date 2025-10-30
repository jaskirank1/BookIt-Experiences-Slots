import React, { useState, useEffect } from "react";

interface Props {
  startsAt: string;
  basePrice: number;
  taxes: number;
  dateSelected: boolean;
  timeSelected: boolean;
  remainingSlots: number; 
  quantity: number;
  onQuantityChange: (q: number) => void;
  onConfirm: () => void;
}

const ExperienceSummaryCard: React.FC<Props> = ({
  startsAt,
  basePrice,
  taxes,
  dateSelected,
  timeSelected,
  remainingSlots,
  quantity,
  onQuantityChange,
  onConfirm,
}) => {
  const [subtotal, setSubtotal] = useState(basePrice);
  
  useEffect(() => {
    setSubtotal(basePrice * quantity);
  }, [quantity, basePrice]);

  const total = subtotal + taxes;
  const isConfirmEnabled = dateSelected && timeSelected;

  const handleIncrease = () => {
    if (quantity < remainingSlots) onQuantityChange(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) onQuantityChange(quantity - 1);
  };

  return (
  <div 
    className="
      bg-[#EFEFEF] rounded-[12px] p-6 flex flex-col justify-between
      w-[387px] h-[303px]

      /* Tablet & mobile scaling */
      max-w-full 
      sm:w-[340px] sm:h-[280px] sm:p-5

      /* Phones < 480px */
      max-[480px]:w-[320px] max-[480px]:h-[260px] max-[480px]:p-4

      /* Extra small phones < 360px */
      max-[360px]:w-[270px] max-[360px]:h-[235px] max-[360px]:p-3
    "
  >
    <div className="flex flex-col gap-4 w-full">
      {/* Starts At */}
      <div className="flex justify-between">
        <p className="text-sm sm:text-[15px] max-[480px]:text-[13px] text-[#656565] font-inter">
          Starts At
        </p>
        <p className="text-base sm:text-[17px] max-[480px]:text-[14px] text-[#161616] font-inter">
          {startsAt}
        </p>
      </div>

      {/* Quantity */}
      <div className="flex justify-between items-center">
        <p className="text-sm sm:text-[15px] max-[480px]:text-[13px] text-[#656565] font-inter">
          Quantity
          {remainingSlots > 0 && (
            <span className="text-[11px] max-[480px]:text-[9px] text-[#969696] ml-1">
              ({remainingSlots} left)
            </span>
          )}
        </p>

        <div className="flex items-center gap-2">
          {/* Decrease */}
          <button
            className="border border-[#C9C9C9] flex items-center justify-center cursor-pointer
            w-5 h-5 max-[480px]:w-4 max-[480px]:h-4"
            onClick={handleDecrease}
          >
            <div className="bg-[#161616] w-[9px] h-[1.3px] max-[480px]:w-[7px]" />
          </button>

          <span className="text-[12px] max-[480px]:text-[10px] text-[#161616]">
            {quantity}
          </span>

          {/* Increase */}
          <button
            className={`border border-[#C9C9C9] flex items-center justify-center cursor-pointer
            w-5 h-5 max-[480px]:w-4 max-[480px]:h-4 ${
              quantity >= remainingSlots ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleIncrease}
            disabled={quantity >= remainingSlots}
          >
            <div className="text-[#161616] text-[12px] max-[480px]:text-[10px] leading-none">
              +
            </div>
          </button>
        </div>
      </div>

      {/* Subtotal */}
      <div className="flex justify-between">
        <p className="text-sm sm:text-[15px] max-[480px]:text-[13px] text-[#656565] font-inter">
          Subtotal
        </p>
        <p className="text-[14px] max-[480px]:text-[12px] text-[#161616] font-inter">
          ₹{subtotal}
        </p>
      </div>

      {/* Taxes */}
      <div className="flex justify-between">
        <p className="text-sm sm:text-[15px] max-[480px]:text-[13px] text-[#656565] font-inter">
          Taxes
        </p>
        <p className="text-[14px] max-[480px]:text-[12px] text-[#161616] font-inter">
          ₹{taxes}
        </p>
      </div>
    </div>

    <div className="w-full h-[1px] bg-[#D9D9D9] my-2" />

    {/* Total */}
    <div className="flex justify-between items-center mb-2">
      <p className="text-lg sm:text-[18px] max-[480px]:text-[15px] font-medium text-[#161616]">
        Total
      </p>
      <p className="text-lg sm:text-[18px] max-[480px]:text-[15px] font-medium text-[#161616]">
        ₹{total}
      </p>
    </div>

    {/* Button */}
    <button
      className={`
        rounded-[8px] font-medium cursor-pointer
        w-full h-[44px] sm:h-[40px] max-[480px]:h-[36px]
        text-[16px] sm:text-[14px] max-[480px]:text-[13px]
        ${isConfirmEnabled 
          ? "bg-[#FFD643] text-[#161616]" 
          : "bg-[#D7D7D7] text-[#7F7F7F]"}
      `}
      disabled={!isConfirmEnabled}
      onClick={onConfirm}
    >
      Confirm
    </button>
  </div>
);


};

export default ExperienceSummaryCard;