import Logo from "@/assets/Logo.png";
import { Link } from "react-router-dom";

// 사이드바 연결(하윤)
interface HeaderProps {
  onMenuClick?: () => void;
}

function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="w-[1420px] mx-auto bg-[#5C4033]">
      <div className="mx-auto max-w-[1280px] h-[120px] flex justify-between px-[24px] relative">
        {/* 왼쪽 */}
        <div className="flex mt-[20px] gap-[20px]">
          <span
            className="text-[28px] text-white cursor-pointer"
            onClick={onMenuClick}
          >
            ☰
          </span>
        </div>

        {/* 가운데 로고 */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link to="/">
            <img
              src={Logo}
              alt="logo"
              className="h-[40px] mt-[20px] cursor-pointer"
            />
          </Link>
        </div>

        {/* 오른쪽 */}
        <div className="ml-auto flex mt-[30px] gap-[20px]">
          <div className="text-white text-[14px] cursor-pointer ">
            마이페이지
          </div>
          <div className="text-white text-[14px] cursor-pointer">좋아요</div>
          <div className="text-white text-[14px] cursor-pointer">장바구니</div>
          <Link to="/login">
            <div className="text-white text-[14px] cursor-pointer">로그인</div>
          </Link>
        </div>
      </div>

      <div className="flex items-center w-[1280px] h-[40px] mx-auto bg-[#F5F5F5] mb-[20px] rounded-full px-[14px] border-[3px] border-[#A8A9AD]">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="flex-2 text-[14px] outline-none bg-transparent"
        />
        <span className="text-[18px] cursor-pointer"></span>
      </div>
    </header>
  );
}

export { Header };
