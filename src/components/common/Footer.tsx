import { SiYoutube, SiInstagram } from "@icons-pack/react-simple-icons";
import { Link } from "react-router-dom";

function Footer() {
  const MailIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6 12 13 2 6" />
    </svg>
  );

  const PhoneIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2
             19.79 19.79 0 0 1-8.63-3.07
             19.5 19.5 0 0 1-6-6
             19.79 19.79 0 0 1-3.07-8.67
             A2 2 0 0 1 4.11 2h3
             a2 2 0 0 1 2 1.72
             12.84 12.84 0 0 0 .7 2.81
             2 2 0 0 1-.45 2.11L8.09 9.91
             a16 16 0 0 0 6 6l1.27-1.27
             a2 2 0 0 1 2.11-.45
             12.84 12.84 0 0 0 2.81.7
             a2 2 0 0 1 1.72 2z"
      />
    </svg>
  );

  return (
    <footer className="w-[1420px] mx-auto bg-[#5C4033] text-white py-12">
      <div className="max-w-[1280px] mx-auto px-[24px]">
        <div className="flex justify-between items-end">
          {/* 왼쪽 회사 정보 */}
          <div className="text-[13px] leading-[2.0] text-white/90">
            <p>상호명 | La Clavé</p>
            <p>대표자 | ○○○</p>
            <p>사업자등록번호 | 000-00-00000</p>
            <p>통신판매업신고번호 | 2025-부산○○-0000</p>
            <p>주소 | 부산시 ○○구 ○○로 ○○</p>
            <p>고객센터 | 051-000-0000 / help@laclave.com</p>
          </div>

          {/* 가운데 정책 및 카피라이트 */}
          <div className="text-center flex flex-col items-center gap-2 mb-1">
            <div className="flex items-center gap-2 text-[13px] text-white/90">
              <Link to="/privacypolicy" className="hover:text-white">개인정보처리방침</Link>
              <span className="text-white/40">|</span>
              <Link to="/termsofuse" className="hover:text-white">이용약관</Link>
              <span className="text-white/40">|</span>
              <Link to="/admin" className="hover:text-white">관리자</Link>
            </div>
            <p className="text-[12px] text-white/70">
              © {new Date().getFullYear()} La Clavé
            </p>
          </div>

          {/* 오른쪽 운영 시간 및 아이콘 */}
          <div className="text-right flex flex-col justify-between h-[160px]">
            <div className="text-[13px] leading-[1.8] text-white/90">
              <p>평일 10:00 - 17:00</p>
              <p>점심 12:00 - 13:00</p>
              <p>주말/공휴일 휴무</p>
            </div>

            <div className="flex justify-end gap-5">
              <SiInstagram className="w-6 h-6 fill-white cursor-pointer opacity-90 hover:opacity-100 transition-opacity" />
              <SiYoutube className="w-6 h-6 fill-white cursor-pointer opacity-90 hover:opacity-100 transition-opacity" />
              <MailIcon />
              <PhoneIcon />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
