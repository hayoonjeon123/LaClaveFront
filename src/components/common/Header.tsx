import Logo from "@/assets/Logo.png";
import { SearchIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// 사이드바 연결(하윤)
interface HeaderProps {
  onMenuClick?: () => void;
}

function Header({ onMenuClick }: HeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 스토리지에서 로그인 상태 확인
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      try {
        // 백엔드 로그아웃 API 호출
        await axios.post("/api/logout", {}, { withCredentials: true });
      } catch (error) {
        console.error("로그아웃 API 호출 실패:", error);
      }

      // localStorage 정리
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("memberId");
      setIsLoggedIn(false);
      alert("로그아웃 되었습니다.");
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <header className="w-[1420px] mx-auto bg-[#5C4033]">
      <div className="mx-auto max-w-[1280px] h-[100px] flex justify-between px-[24px] relative">
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
          {isLoggedIn ? (
            <>
              {/* 로그인 상태일 때 표시할 항목 */}
              <Link to="/myPage">
                <div className="text-white text-[14px] cursor-pointer">마이페이지</div>
              </Link>
              <Link to="/myWishList">
                <div className="text-white text-[14px] cursor-pointer">좋아요</div>
              </Link>
              <Link to="/cart">
                <div className="text-white text-[14px] cursor-pointer">장바구니</div>
              </Link>
              <div
                onClick={handleLogout}
                className="text-white text-[14px] cursor-pointer"
              >
                로그아웃
              </div>
            </>
          ) : (
            <>
              {/* 비로그인 상태일 때 표시할 항목 */}
              <Link to="/loginProc">
                <div className="text-white text-[14px] cursor-pointer">로그인</div>
              </Link>
              <Link to="/signup">
                <div className="text-white text-[14px] cursor-pointer">회원가입</div>
              </Link>
              <div
                onClick={() => {
                  alert("로그인이 필요한 서비스입니다.");
                  navigate("/loginProc");
                }}
                className="text-white text-[14px] cursor-pointer"
              >
                장바구니
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center w-[1280px] h-[40px] mx-auto bg-[#F5F5F5] mb-[20px] rounded-full px-[14px] border-[3px] border-[#A8A9AD]">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="flex-2 text-[14px] outline-none bg-transparent"
        />
        <SearchIcon size={17} />
      </div>
    </header>
  );
}

export { Header };
