import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft } from "lucide-react";
import downCoat from "../../assets/down_jacket.png";

export default function MyWishList() {
  const navigate = useNavigate();
  return (
    <div className="pb-10">
      {/* Header */}
      <div className="max-w-[1000px] mx-auto px-6 pt-10 flex items-center relative mb-8">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-[-40px] p-1.5 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft size={28} strokeWidth={1.5} />
        </button>
        <div className="flex-1 text-center">
          <h2 className="text-[30px] font-bold text-[#5C4033] tracking-tight">찜한 상품</h2>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex gap-10 justify-center">
          <div className="flex flex-col cursor-pointer">
            <div className="w-64 bg-white rounded-lg shadow-md overflow-hidden relative">
              {/* 하트 아이콘 */}
              <button className="absolute top-3 right-3 cursor-pointer">
                <Heart className="text-red-500 fill-red-500" />
              </button>

              {/* 상품 이미지 */}
              <img
                src={downCoat}
                alt="다운 자켓"
                className="w-full h-64 object-cover p-5"
              />

              {/* 상품 정보 */}
              <div className="p-4">
                <p className="text-sm text-gray-800 font-semibold">
                  슈페리어 다운 파카-BLAK
                </p>
                <p className="mt-1 text-lg font-bold">289,000원</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col cursor-pointer">
            <div className="w-64 bg-white rounded-lg shadow-md overflow-hidden relative">
              {/* 하트 아이콘 */}
              <button className="absolute top-3 right-3 cursor-pointer">
                <Heart className="text-red-500 fill-red-500" />
              </button>

              {/* 상품 이미지 */}
              <img
                src={downCoat}
                alt="다운 자켓"
                className="w-full h-64 object-cover p-5"
              />

              {/* 상품 정보 */}
              <div className="p-4">
                <p className="text-sm text-gray-800 font-semibold">
                  슈페리어 다운 파카-BLAK
                </p>
                <p className="mt-1 text-lg font-bold">289,000원</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col cursor-pointer">
            <div className="w-64 bg-white rounded-lg shadow-md overflow-hidden relative">
              {/* 하트 아이콘 */}
              <button className="absolute top-3 right-3 cursor-pointer">
                <Heart className="text-red-500 fill-red-500" />
              </button>

              {/* 상품 이미지 */}
              <img
                src={downCoat}
                alt="다운 자켓"
                className="w-full h-64 object-cover p-5"
              />

              {/* 상품 정보 */}
              <div className="p-4">
                <p className="text-sm text-gray-800 font-semibold">
                  슈페리어 다운 파카-BLAK
                </p>
                <p className="mt-1 text-lg font-bold">289,000원</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-10 justify-center mt-10">
          <div className="flex flex-col cursor-pointer">
            <div className="w-64 bg-white rounded-lg shadow-md overflow-hidden relative">
              {/* 하트 아이콘 */}
              <button className="absolute top-3 right-3 cursor-pointer">
                <Heart className="text-red-500 fill-red-500" />
              </button>

              {/* 상품 이미지 */}
              <img
                src={downCoat}
                alt="다운 자켓"
                className="w-full h-64 object-cover p-5"
              />

              {/* 상품 정보 */}
              <div className="p-4">
                <p className="text-sm text-gray-800 font-semibold">
                  슈페리어 다운 파카-BLAK
                </p>
                <p className="mt-1 text-lg font-bold">289,000원</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col cursor-pointer">
            <div className="w-64 bg-white rounded-lg shadow-md overflow-hidden relative">
              {/* 하트 아이콘 */}
              <button className="absolute top-3 right-3 cursor-pointer">
                <Heart className="text-red-500 fill-red-500" />
              </button>

              {/* 상품 이미지 */}
              <img
                src={downCoat}
                alt="다운 자켓"
                className="w-full h-64 object-cover p-5"
              />

              {/* 상품 정보 */}
              <div className="p-4">
                <p className="text-sm text-gray-800 font-semibold">
                  슈페리어 다운 파카-BLAK
                </p>
                <p className="mt-1 text-lg font-bold">289,000원</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col cursor-pointer">
            <div className="w-64 bg-white rounded-lg shadow-md overflow-hidden relative">
              {/* 하트 아이콘 */}
              <button className="absolute top-3 right-3 cursor-pointer">
                <Heart className="text-red-500 fill-red-500" />
              </button>

              {/* 상품 이미지 */}
              <img
                src={downCoat}
                alt="다운 자켓"
                className="w-full h-64 object-cover p-5"
              />

              {/* 상품 정보 */}
              <div className="p-4">
                <p className="text-sm text-gray-800 font-semibold">
                  슈페리어 다운 파카-BLAK
                </p>
                <p className="mt-1 text-lg font-bold">289,000원</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
