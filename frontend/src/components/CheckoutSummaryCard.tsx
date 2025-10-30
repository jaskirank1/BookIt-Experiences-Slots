import React from "react";

interface CheckoutSummaryCardProps {
  experienceName: string;
  date: string;
  time: string;
  quantity: number;
  subtotal: number;
  taxes: number;
  discount?: number;
  total: number;
  onPayConfirm: () => void;
}

const CheckoutSummaryCard: React.FC<CheckoutSummaryCardProps> = ({
  experienceName,
  date,
  time,
  quantity,
  subtotal,
  taxes,
  discount = 0,
  total,
  onPayConfirm,
}) => {
  return (
    <div
      className="
        w-[387px] min-h-[349px] bg-[#EFEFEF] rounded-[12px] p-6 flex flex-col justify-between font-inter
        max-w-full sm:w-[360px] xs:w-full xs:p-4

        /* Below 416px */
        max-[416px]:w-[100%] max-[416px]:p-3 max-[416px]:rounded-[10px] 
        mx-auto max-[416px]:mx-auto
      "
    >
      {/* Top Section */}
      <div className="w-full flex flex-col gap-[10px] max-w-full max-[416px]:gap-[6px]">
        <div className="flex justify-between text-[16px] xs:text-[14px] max-[416px]:text-[13px]">
          <p className="text-[#656565]">Experience</p>
          <p className="text-[#161616]">{experienceName}</p>
        </div>

        <div className="flex justify-between text-[16px] xs:text-[14px] max-[416px]:text-[13px]">
          <p className="text-[#656565]">Date</p>
          <p className="text-[#161616]">{date}</p>
        </div>

        <div className="flex justify-between text-[16px] xs:text-[14px] max-[416px]:text-[13px]">
          <p className="text-[#656565]">Time</p>
          <p className="text-[#161616]">{time}</p>
        </div>

        <div className="flex justify-between text-[16px] xs:text-[14px] max-[416px]:text-[13px]">
          <p className="text-[#656565]">Qty</p>
          <p className="text-[#161616]">{quantity}</p>
        </div>
      </div>

      {/* Subtotal Section */}
      <div className="w-full flex flex-col gap-[10px] mt-4 max-w-full max-[416px]:gap-[6px]">
        <div className="flex justify-between text-[16px] xs:text-[14px] max-[416px]:text-[13px]">
          <p className="text-[#656565]">Subtotal</p>
          <p className="text-[#161616]">₹{subtotal}</p>
        </div>

        <div className="flex justify-between text-[16px] xs:text-[14px] max-[416px]:text-[13px]">
          <p className="text-[#656565]">Taxes</p>
          <p className="text-[#161616]">₹{taxes}</p>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-[16px] xs:text-[14px] max-[416px]:text-[13px]">
            <p className="text-[#2E7D32]">Discount</p>
            <p className="text-[#2E7D32]">-₹{discount}</p>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-[#D9D9D9] my-1 max-w-full max-[416px]:my-[6px]" />

      {/* Total */}
      <div className="w-full flex justify-between items-center mb-2 max-w-full">
        <p className="text-[20px] xs:text-[18px] max-[416px]:text-[15px] font-medium text-[#161616]">Total</p>
        <p className="text-[20px] xs:text-[18px] max-[416px]:text-[15px] font-medium text-[#161616]">₹{total}</p>
      </div>

      {/* Button */}
      <button
        onClick={onPayConfirm}
        className="
          w-full h-[44px] rounded-[8px] bg-[#FFD643] text-[#161616] cursor-pointer
          font-medium text-[16px] xs:text-[14px] hover:opacity-90 transition max-w-full

          max-[416px]:text-[13px] max-[416px]:h-[40px]
        "
      >
        Pay & Confirm
      </button>
    </div>
  );
};

export default CheckoutSummaryCard;
