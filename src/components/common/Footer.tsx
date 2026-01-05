import { SiYoutube, SiInstagram } from "@icons-pack/react-simple-icons";

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
    <footer className="w-[1420px] mx-auto bg-[#5C4033] text-white py-8">
      <div className="max-w-[1280px] mx-auto px-[24px]">
        {/* 상단 영역 */}
        <div className="flex justify-between items-start">
          {/* 왼쪽 회사 정보 */}
          <div className="text-[14px] leading-[1.8]">
            <p className="font-semibold mb-2">상호명 | La Clavé</p>
            <p>대표자 | ○○○</p>
            <p>사업자등록번호 | 000-00-00000</p>
            <p>통신판매업신고번호 | 2025-부산○○-0000</p>
            <p>주소 | 부산시 ○○구 ○○로 ○○</p>
            <p className="mt-2">고객센터 | 051-000-0000 / help@laclave.com</p>
          </div>

          {/* 오른쪽 운영 시간 + 아이콘 */}
          <div className="text-right text-[14px] flex flex-col gap-6">
            {/* 운영 시간 */}
            <div className="leading-[1.8]">
              <p>평일 10:00 - 17:00</p>
              <p>점심 12:00 - 13:00</p>
              <p>주말/공휴일 휴무</p>
            </div>

            {/* 아이콘 */}
            <div className="flex justify-end gap-4">
              <SiInstagram className="w-5 h-5 fill-white cursor-pointer" />
              <SiYoutube className="w-5 h-5 fill-white cursor-pointer" />
              <MailIcon />
              <PhoneIcon />
            </div>
          </div>
        </div>

        {/* 하단 */}
        <div className="mt-8 text-center text-[13px] text-white/80">
          <p>© {new Date().getFullYear()} La Clavé. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
