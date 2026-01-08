import React from "react";

const TermsOfUse: React.FC = () => {
    return (
        <div className="w-full max-w-[1000px] mx-auto px-4 py-16 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-8">이용약관</h1>

            <div className="w-full  border border-[#A8A9AD] rounded-lg p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">LaClave 이용약관</h2>

                <div className="space-y-8 text-gray-700 leading-relaxed">
                    <section>
                        <h3 className="text-lg font-bold mb-2">제1조(목적)</h3>
                        <p>
                            이 약관은 LaClave(이하 "몰")이 운영하는 온라인 쇼핑몰에서 제공하는 서비스의 이용과 관련하여
                            "몰"과 이용자의 권리, 의무, 책임사항을 규정함을 목적으로 합니다.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold mb-2">제2조(용어의 정의)</h3>
                        <ol className="list-decimal list-inside space-y-1">
                            <li>"몰"이란 LaClave가 상품 또는 서비스를 판매하기 위해 운영하는 온라인 상점을 말합니다.</li>
                            <li>"이용자"란 "몰"에 접속하여 이 약관에 따라 서비스를 이용하는 회원 및 비회원을 말합니다.</li>
                        </ol>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold mb-2">제3조(약관의 효력과 변경)</h3>
                        <ol className="list-decimal list-inside space-y-1">
                            <li>본 약관은 "몰" 사이트에 게시함으로써 효력이 발생합니다.</li>
                            <li>"몰"은 필요한 경우 관련 법령을 위배하지 않는 범위에서 약관을 변경할 수 있으며, 변경 시 사전 공지합니다.</li>
                        </ol>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold mb-2">제4조(서비스의 제공)</h3>
                        <p>"몰"은 다음과 같은 서비스를 제공합니다.</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>상품 정보 제공 및 구매 계약 체결</li>
                            <li>결제 및 배송 서비스</li>
                            <li>기타 "몰"이 정하는 서비스</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold mb-2">제5조(주문과 계약의 성립)</h3>
                        <ol className="list-decimal list-inside space-y-1">
                            <li>이용자는 "몰"에서 상품을 선택하고 결제함으로써 구매를 신청합니다.</li>
                            <li>"몰"은 결제 완료 시점에 계약이 성립된 것으로 봅니다.</li>
                        </ol>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold mb-2">제6조(배송과 환불)</h3>
                        <ol className="list-decimal list-inside space-y-1">
                            <li>"몰"은 주문 후 일정 기간 내에 상품을 배송합니다.</li>
                            <li>상품 하자 또는 품절 등의 사유로 인도할 수 없을 경우, 결제일로부터 3영업일 이내에 환불합니다.</li>
                            <li>단순 변심으로 인한 반품은 상품 수령 후 7일 이내에 신청할 수 있으며, 반품 배송비는 이용자가 부담합니다.</li>
                        </ol>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold mb-2">제7조(개인정보 보호)</h3>
                        <p>
                            "몰"은 이용자의 개인정보를 관련 법령에 따라 안전하게 관리하며, 개인정보처리방침에 따라 수집·이용·보관합니다.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold mb-2">제8조(이용자의 의무)</h3>
                        <p>이용자는 다음 행위를 해서는 안 됩니다.</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>허위 정보 입력</li>
                            <li>타인의 정보 도용</li>
                            <li>"몰"의 저작권 및 지식재산권 침해</li>
                            <li>"몰"의 운영을 방해하는 행위</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold mb-2">제9조(저작권)</h3>
                        <p>
                            "몰"에서 제공하는 콘텐츠(이미지, 텍스트 등)의 저작권은 "몰"에 귀속되며, 무단 복제나 배포를 금합니다.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold mb-2">제10조(분쟁 해결)</h3>
                        <ol className="list-decimal list-inside space-y-1">
                            <li>"몰"과 이용자 간 발생한 분쟁은 상호 협의로 해결을 원칙으로 합니다.</li>
                            <li>협의가 이루어지지 않을 경우, 관할 법원은 "몰" 소재지 관할 법원으로 합니다.</li>
                        </ol>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfUse;
