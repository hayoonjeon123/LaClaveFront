import { Heart } from "lucide-react";
import downCoat from "../../assets/down_jacket.png";

export default function MyWishList() {
  return (
    <div className="my-10">
      <h2 className="text-center text-3xl font-bold text-[#5C4033] my-5">
        찜한 상품
      </h2>
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
