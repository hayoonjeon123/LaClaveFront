import React from "react";

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="w-full max-w-[1000px] mx-auto px-4 py-16 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-8">개인정보 처리방침</h1>

            <div className="w-full  border border-gray-200 rounded-lg p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">LaClave 개인정보 처리방침</h2>

                <div className="space-y-8 text-gray-700 leading-relaxed">
                    <p>
                        LaClave(이하 "회사")는 이용자의 개인정보를 보호하고 관련 법령을 준수하며, 이용자의 권익 보호를 위해 다음과 같은 개인정보 처리방침을 두고 있습니다.
                    </p>

                    <section>
                        <h3 className="text-lg font-bold mb-2">1. 수집하는 개인정보 항목</h3>
                        <p>회사는 회원가입, 원활한 고객상담, 서비스 제공을 위해 아래와 같은 개인정보를 수집하고 있습니다.</p>
                        <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                            <li>필수항목: 이름, 아이디, 비밀번호, 이메일, 휴대전화번호, 주소</li>
                            <li>선택항목: 성별, 생년월일, 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold mb-2">2. 개인정보의 수집 및 이용 목적</h3>
                        <ol className="list-decimal list-inside space-y-1">
                            <li>서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산</li>
                            <li>회원 관리 (회원제 서비스 이용에 따른 본인확인, 개인 식별, 불량회원의 부정 이용 방지와 비인가 사용 방지)</li>
                            <li>마케팅 및 광고에 활용 (신규 서비스 개발 및 특화, 이벤트 등 광고성 정보 전달)</li>
                        </ol>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold mb-2">3. 개인정보의 보유 및 이용 기간</h3>
                        <p>
                            회사는 이용자의 개인정보를 원칙적으로 고지 및 약정한 기간 동안 보유 및 이용하며, 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 관계법령에서 정한 일정 기간 동안 회원정보를 보관합니다.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold mb-2">4. 개인정보의 파기절차 및 방법</h3>
                        <p>회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.</p>
                        <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                            <li>파기절차: 이용자가 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라 일정 기간 저장된 후 파기됩니다.</li>
                            <li>파기방법: 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다. 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold mb-2">5. 이용자 및 법정대리인의 권리와 그 행사방법</h3>
                        <p>
                            이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 가입해지를 요청할 수도 있습니다.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold mb-2">6. 개인정보 자동 수집 장치의 설치, 운영 및 그 거부에 관한 사항</h3>
                        <p>
                            회사는 이용자에게 특화된 맞춤서비스를 제공하기 위해서 이용자의 정보를 수시로 저장하고 찾아내는 '쿠키(cookie)' 등을 운용합니다. 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold mb-2">7. 개인정보 보호책임자 및 상담신고</h3>
                        <p>
                            고객의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 회사는 개인정보보호책임자를 두고 있습니다.
                        </p>
                        <ul className="list-none space-y-1 ml-4 mt-2">
                            <li>개인정보 보호책임자: ○○○</li>
                            <li>이메일: privacy@laclave.com</li>
                            <li>전화번호: 051-000-0000</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
