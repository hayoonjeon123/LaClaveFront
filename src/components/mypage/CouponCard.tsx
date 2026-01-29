type CouponCardProps = {
  title: string;
  discount: string;
  condition: string;
  expireDate: string;
  disabled?: boolean;
};

export default function CouponCard({
  title,
  discount,
  condition,
  expireDate,
  disabled = false,
}: CouponCardProps) {
  return (
    <div
      className={`flex justify-between items-center p-6 rounded-xl border shadow-sm
        ${
          disabled
            ? "bg-gray-100 border-gray-300 text-gray-400"
            : "bg-white border-[#E6C9A8]"
        }`}
    >
      <div>
        <p className="text-sm font-semibold text-[#5C4033]">{title}</p>
        <p className="text-3xl font-bold my-2">{discount}</p>
        <p className="text-sm">{condition}</p>
        <p className="text-xs mt-1">유효기간: {expireDate}</p>
      </div>

      <div>
        {disabled ? (
          <span className="text-sm font-semibold">사용 완료</span>
        ) : (
          <button className="px-4 py-2 text-sm font-semibold rounded-md bg-[#5C4033] text-white hover:opacity-90">
            사용하기
          </button>
        )}
      </div>
    </div>
  );
}
