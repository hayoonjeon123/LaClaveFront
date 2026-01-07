export function AdminFooter() {
    return (
        <footer className="w-full bg-[#A8A9AD] py-8">
            <div className="w-full max-w-[1000px] mx-auto text-center space-y-2">
                <p className="text-[13px] font-bold text-[#1E1E1E] leading-relaxed">
                    ※ 이 페이지는 관리자 전용입니다. 무단 접근 시 법적 처벌을 받을
                    <br />
                    수 있습니다. 접속 기록을 위해 저장됩니다.
                </p>
                <p className="text-[11px] font-medium text-[#1E1E1E] pt-2">
                    © 2025 La Clave. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
