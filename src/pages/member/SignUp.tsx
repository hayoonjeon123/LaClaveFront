import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkIdDuplicate, checkEmailDuplicate, sendEmailAuth, verifyEmailCode } from "@/api/member/authApi";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddressSearch from "@/components/AddressSearch/addressSearch";
import type { SelectedAddress } from "@/types/address";
import { X } from "lucide-react";

const ID_REGEX = /^(?=.*\d)[A-Za-z\d@$!%*#?&]{4,20}$/;
const PW_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
const SignUp = () => {
  const navigate = useNavigate();
  const IS_DEV_MODE = false;
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [gender, setGender] = useState<number | null>(null);
  const [memberId, setMemberId] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [memberName, setMemberName] = useState("");
  const [birth, setBirth] = useState("");
  const [emailId, setEmailId] = useState<string>("");
  const [emailDomain, setEmailDomain] = useState<string>("");
  const [authCode, setAuthCode] = useState<string>("");
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const [isIdAvailable, setIsIdAvailable] = useState<boolean>(false);
  const [postCode, setPostCode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [isAddressSearchOpen, setIsAddressSearchOpen] = useState(false);
  const [idError, setIdError] = useState("");
  const [pwError, setPwError] = useState("");
  const [confirmPwError, setConfirmPwError] = useState("");
  const handleAgreeAll = (checked: boolean) => {
    setAgreeAll(checked);
    setAgreeTerms(checked);
    setAgreePrivacy(checked);
    setAgreeMarketing(checked);
  };

  useEffect(() => {
    if (agreeTerms && agreePrivacy && agreeMarketing) {
      setAgreeAll(true);
    } else {
      setAgreeAll(false);
    }
  }, [agreeTerms, agreePrivacy, agreeMarketing]);

  /* ================= 실시간 유효성 검사 로직 ================= */
  useEffect(() => {
    if (IS_DEV_MODE) {
      setIdError("");
      setIsIdAvailable(true);
      return;
    }

    if (memberId.length === 0) {
      setIdError("");
      setIsIdAvailable(false);
      return;
    }

    if (!ID_REGEX.test(memberId)) {
      setIdError("아이디는 영문, 숫자, 특수문자 포함 4~20자여야 합니다.");
      setIsIdAvailable(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        const isUsed = await checkIdDuplicate(memberId);
        if (isUsed) {
          setIdError("이미 사용 중인 아이디입니다.");
          setIsIdAvailable(false);
        } else {
          setIdError("");
          setIsIdAvailable(true);
        }
      } catch (error) {
        console.error("아이디 중복 확인 실패:", error);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [memberId, IS_DEV_MODE]);

  useEffect(() => {
    if (IS_DEV_MODE) {
      setPwError("");
      return;
    }
    if (memberPw.length > 0 && !PW_REGEX.test(memberPw)) {
      setPwError(
        "비밀번호는 8자 이상, 영문, 숫자, 특수문자를 모두 포함해야 합니다."
      );
    } else {
      setPwError("");
    }
  }, [memberPw, IS_DEV_MODE]);

  useEffect(() => {
    if (IS_DEV_MODE) {
      setConfirmPwError("");
      return;
    }
    if (confirmPw.length > 0 && memberPw !== confirmPw) {
      setConfirmPwError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPwError("");
    }
  }, [memberPw, confirmPw, IS_DEV_MODE]);

  const isRequiredAgreed = agreeTerms && agreePrivacy;

  const handleSendEmail = async () => {
    const fullEmail = `${emailId}@${emailDomain}`;
    if (!emailId || !emailDomain) {
      alert("이메일 주소를 완성해주세요.");
      return;
    }

    try {
      const isUsed = await checkEmailDuplicate(fullEmail);
      if (isUsed) {
        alert("이미 가입된 이메일입니다.");
        return;
      }

      await sendEmailAuth(fullEmail);
      alert("인증번호가 발송되었습니다.");
    } catch (error: any) {
      console.error("이메일 프로세스 실패:", error);
      const errorMsg = error.response?.data || "요청 처리에 실패했습니다.";
      alert(errorMsg);
    }
  };

  const handleVerifyEmail = async () => {
    const fullEmail = `${emailId}@${emailDomain}`;
    if (!authCode) {
      alert("인증번호를 입력해주세요.");
      return;
    }
    try {
      await verifyEmailCode({
        email: fullEmail,
        authCode: authCode,
      });

      alert("이메일 인증에 성공했습니다.");
      setIsEmailVerified(true);
    } catch (error: any) {
      console.error("인증 확인 실패:", error);
      alert(error.response?.data || "인증번호가 틀렸습니다.");
    }
  };

  const handleAddressComplete = (data: SelectedAddress) => {
    setPostCode(data.postCode);
    setAddress(data.address);
    setIsAddressSearchOpen(false);
  };


  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-[30px] font-semibold text-[#000000] mt-[20px]">
        회원가입
      </div>

      <div className="w-full max-w-md mt-[40px] flex flex-col">
        <div className="flex items-center">
          <label className="w-[120px] text-[16px] font-medium text-[#000000]">
            아이디
          </label>
          <input
            type="text"
            placeholder="영문, 숫자, 특수문자 / 4~20자리"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            className={`flex-1 h-[40px] px-[12px] text-[14px] 
                       border ${idError ? "border-red-500" : "border-[#5C4033]"
              } placeholder:text-[#A8A9AD]
                       focus:outline-none focus:ring-1 ${idError ? "focus:ring-red-500" : "focus:ring-[#5C4033]"
              }`}
          />
        </div>
        {idError && (
          <span className="ml-[120px] text-red-500 text-[12px] mt-[4px]">
            {idError}
          </span>
        )}
        {isIdAvailable && memberId.length > 0 && !idError && (
          <span className="ml-[120px] text-blue-500 text-[12px] mt-[4px]">
            ✓ 사용 가능한 아이디입니다.
          </span>
        )}
      </div>

      <div className="w-full max-w-md mt-[30px] flex flex-col">
        <div className="flex items-center">
          <label className="w-[120px] text-[16px] font-medium text-[#000000]">
            비밀번호
          </label>
          <input
            type="password"
            placeholder="영문 대소문자, 숫자, 특수문자 조합 / 8~16자리"
            value={memberPw}
            onChange={(e) => setMemberPw(e.target.value)}
            className={`flex-1 h-[40px] px-[12px] text-[14px]
                       border ${pwError ? "border-red-500" : "border-[#5C4033]"
              } placeholder:text-[#A8A9AD]
                       focus:outline-none focus:ring-1 ${pwError ? "focus:ring-red-500" : "focus:ring-[#5C4033]"
              }`}
          />
        </div>
        {pwError && (
          <span className="ml-[120px] text-red-500 text-[12px] mt-[4px]">
            {pwError}
          </span>
        )}
      </div>

      <div className="w-full max-w-md mt-[30px] flex flex-col">
        <div className="flex items-center">
          <label className="w-[120px] text-[16px] font-medium text-[#000000]">
            비밀번호 확인
          </label>

          <input
            type="password"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            className={`flex-1 h-[40px] px-[12px] text-[14px]
                       border ${confirmPwError ? "border-red-500" : "border-[#5C4033]"
              }
                       focus:outline-none focus:ring-1 ${confirmPwError
                ? "focus:ring-red-500"
                : "focus:ring-[#5C4033]"
              }`}
          />
        </div>
        {confirmPwError && (
          <span className="ml-[120px] text-red-500 text-[12px] mt-[4px]">
            {confirmPwError}
          </span>
        )}
      </div>

      <div className="w-full max-w-md mt-[30px] flex items-center">
        <label className="w-[120px] text-[16px] font-medium text-[#000000]">
          이름
        </label>
        <input
          type="text"
          value={memberName}
          onChange={(e) => setMemberName(e.target.value)}
          className="flex-1 h-[40px] px-[12px] text-[14px]
                     border border-[#5C4033]
                     focus:outline-none focus:ring-1 focus:ring-[#5C4033]"
        />
      </div>

      <div className="w-full max-w-md mt-[30px] flex items-center">
        <label className="w-[120px] text-[16px] font-medium text-[#000000]">
          성별
        </label>
        <div className="w-full flex max-w-md justify-center mt-[4px] gap-[20px]">
          <div className="flex items-center gap-[6px]">
            <Checkbox
              id="gender-man"
              checked={gender === 1}
              onCheckedChange={(checked) => checked && setGender(1)}
              className="data-[state=checked]:border border-[#5C4033] data-[state=checked]:bg-[#5C4033] data-[state=checked]:text-white"
            />
            <Label htmlFor="gender-man" className="text-[14px] cursor-pointer">
              Man
            </Label>
          </div>

          <div className="flex items-center gap-[6px]">
            <Checkbox
              id="gender-woman"
              checked={gender === 2}
              onCheckedChange={(checked) => checked && setGender(2)}
              className="data-[state=checked]:border border-[#5C4033] data-[state=checked]:bg-[#5C4033] data-[state=checked]:text-white"
            />
            <Label
              htmlFor="gender-woman"
              className="text-[14px] cursor-pointer"
            >
              Woman
            </Label>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md mt-[30px] flex items-center">
        <label className="w-[120px] text-[16px] font-medium text-[#000000]">
          생년월일
        </label>

        <input
          type="date"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
          className="flex-1 h-[40px] px-[12px] text-[14px]
                     border border-[#5C4033]
                     focus:outline-none focus:ring-1 focus:ring-[#5C4033]"
        />
      </div>

      <div className="w-full max-w-md mt-[30px] flex items-center">
        <label className="w-[120px] text-[16px] font-medium text-[#000000]">
          주소
        </label>

        <div className="flex gap-[8px] flex-1">
          <input
            type="text"
            placeholder="우편번호"
            value={postCode}
            readOnly
            className="flex-1 h-[44px] px-[12px] text-[14px]
                 border border-[#5C4033] bg-gray-50
                 focus:outline-none"
          />

          <button
            type="button"
            onClick={() => setIsAddressSearchOpen(true)}
            className="h-[44px] px-[16px] text-[14px] 
                 border border-[#5C4033] cursor-pointer
                 font-medium hover:bg-[#5C4033] hover:text-[#fff]"
          >
            주소검색
          </button>
        </div>
      </div>

      <div className="w-full max-w-md mt-[10px] flex items-center">
        <div className="w-[120px]" />
        <input
          type="text"
          placeholder="기본주소"
          value={address}
          readOnly
          className="flex-1 h-[40px] px-[12px] text-[14px]
                     border border-[#5C4033] placeholder:text-[#A8A9AD] bg-gray-50
                     focus:outline-none focus:ring-1 focus:ring-[#5C4033]"
        />
      </div>

      <div className="w-full max-w-md mt-[10px] flex items-center">
        <div className="w-[120px]" />
        <input
          type="text"
          placeholder="상세주소"
          value={addressDetail}
          onChange={(e) => setAddressDetail(e.target.value)}
          className="flex-1 h-[40px] px-[12px] text-[14px] 
                     border border-[#5C4033] placeholder:text-[#A8A9AD]
                     focus:outline-none focus:ring-1 focus:ring-[#5C4033]"
        />
      </div>

      {isAddressSearchOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setIsAddressSearchOpen(false)}
        >
          <div
            className="relative w-full max-w-[500px] bg-white p-6 shadow-2xl rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
              <h3 className="text-xl font-bold text-[#5C4033]">주소 검색</h3>
              <button
                onClick={() => setIsAddressSearchOpen(false)}
                className="text-gray-400 hover:text-black transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="w-full">
              <AddressSearch
                onComplete={handleAddressComplete}
                onClose={() => setIsAddressSearchOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-md mt-[40px] flex items-center relative">
        <label className="w-[135px] text-[16px] font-medium text-[#000000] ">
          이메일
        </label>
        <input
          type="email"
          placeholder="이메일"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          disabled={isEmailVerified}
          className="flex-1 h-[40px] px-[12px] text-[14px]
                 border border-[#5C4033]
                 focus:outline-none focus:ring-1 focus:ring-[#5C4033] disabled:bg-gray-100"
        />
        <span className="text-[14px] mx-[5px]">@</span>
        <Select
          value={emailDomain}
          onValueChange={setEmailDomain}
          disabled={isEmailVerified}
        >
          <SelectTrigger className="w-[150px] h-[40px] px-[8px] text-[14px] border border-[#5C4033] focus:ring-1 focus:ring-[#5C4033] rounded-none disabled:bg-gray-100">
            <SelectValue placeholder="선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="naver.com">naver.com</SelectItem>
            <SelectItem value="gmail.com">gmail.com</SelectItem>
            <SelectItem value="daum.net">daum.net</SelectItem>
            <SelectItem value="kakao.com">kakao.com</SelectItem>
          </SelectContent>
        </Select>{" "}
        <div className="absolute right-[-102px] top-0 flex flex-col gap-[12px]">
          <button
            type="button"
            onClick={handleSendEmail}
            disabled={isEmailVerified}
            className="w-[90px] h-[40px] cursor-pointer
               border border-[#5C4033] hover:bg-[#5C4033] hover:text-[#fff]
               text-[14px] font-medium disabled:bg-gray-100 disabled:text-gray-400"
          >
            인증번호
          </button>
          <button
            type="button"
            onClick={handleVerifyEmail}
            disabled={isEmailVerified}
            className="w-[90px] h-[40px] mt-[-2px]
               border border-[#5C4033] cursor-pointer
               text-[14px] font-medium hover:bg-[#5C4033] hover:text-[#fff] disabled:bg-gray-100 disabled:text-gray-400"
          >
            확인
          </button>
        </div>
      </div>
      <div className="w-full max-w-md mt-[10px] flex items-center">
        <div className="w-[120px]" />
        <input
          type="text"
          placeholder="인증번호"
          value={authCode}
          onChange={(e) => setAuthCode(e.target.value)}
          disabled={isEmailVerified}
          className="flex-1 h-[40px] px-[12px] text-[14px]
                     border border-[#5C4033] placeholder:text-[#A8A9AD]
                     focus:outline-none focus:ring-1 focus:ring-[#5C4033] disabled:bg-gray-100"
        />
      </div>
      {isEmailVerified && (
        <div className="w-full max-w-md mt-[10px] flex items-center">
          <div className="w-[120px]" />
          <p className="text-blue-600 text-[13px] font-bold">
            ✓ 이메일 인증이 완료되었습니다.
          </p>
        </div>
      )}

      <div className="w-full flex justify-center mt-[40px]">
        <div className="w-full max-w-[1000px]">
          <div className="flex items-center gap-3 border border-[#5C4033] px-4 py-3">
            <Checkbox
              id="agree-all"
              checked={agreeAll}
              onCheckedChange={(checked: boolean) => handleAgreeAll(checked)}
              className="data-[state=checked]: border border-[#5C4033] data-[state=checked]:bg-[#5C4033] data-[state=checked]:text-white"
            />
            <Label htmlFor="agree-all" className="text-[15px] cursor-pointer">
              이용 약관 및 개인정보 수집 및 이용, 쇼핑정보 수신(선택)에 모두
              동의합니다.
            </Label>
          </div>

          <div className="grid grid-cols-3 gap-[24px]">
            <div className="border border-[#5C4033] mt-[20px] flex flex-col h-[260px]">
              <div className="px-3 py-2 text-[14px] font-medium border-b border-[#5C4033]">
                [필수] 이용약관 동의
              </div>

              <div className="flex-1 px-3 py-2 text-[13px] overflow-y-auto leading-[1.6] whitespace-pre-line">
                <p>
                  제1조 (목적) 본 약관은 회사가 제공하는 서비스의 이용과
                  관련하여 회사와 회원 간의 권리, 의무 및 책임사항을 규정함을
                  목적으로 합니다.
                </p>
                <p>
                  제2조 (회원가입) 회원은 본 약관에 동의함으로써 회원가입을
                  신청할 수 있으며, 회사는 이에 대해 승낙함으로써 회원가입이
                  완료됩니다.
                </p>
                <p>
                  제3조 (회원의 의무) 회원은 관계 법령, 본 약관의 규정, 이용
                  안내 및 서비스와 관련하여 회사가 공지한 사항을 준수하여야
                  하며, 기타 회사의 업무에 방해되는 행위를 해서는 안 됩니다.
                </p>
                <p>
                  제4조 (서비스 이용 제한) 회사는 회원이 본 약관을 위반하거나
                  서비스의 정상적인 운영을 방해한 경우, 사전 통지 없이 서비스
                  이용을 제한하거나 회원자격을 박탈할 수 있습니다.
                </p>
                <p>
                  제5조 (책임의 제한) 회사는 천재지변, 불가항력적 사유로 인해
                  서비스를 제공할 수 없는 경우 책임을 지지 않습니다.
                </p>
              </div>

              <div className="flex justify-end items-center gap-2 px-3 py-2 border-t border-[#5C4033]">
                <Label
                  htmlFor="agree-terms"
                  className="text-[13px] cursor-pointer"
                >
                  동의함
                </Label>
                <Checkbox
                  id="agree-terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked: boolean) => setAgreeTerms(checked)}
                  className="data-[state=checked]:border border-[#5C4033] data-[state=checked]:bg-[#5C4033] data-[state=checked]:text-white"
                />
              </div>
            </div>

            <div className="border border-[#5C4033] mt-[20px] flex flex-col h-[260px]">
              <div className="px-3 py-2 text-[14px] font-medium border-b border-[#5C4033]">
                [필수] 개인정보 수집 및 이용 동의
              </div>

              <div className="flex-1 px-3 py-2 text-[13px] overflow-y-auto leading-[1.6]">
                <p>
                  회사는 회원가입 및 서비스 제공을 위해 아래와 같이 개인정보를
                  수집 및 이용합니다.
                </p>
                <p>
                  1. 수집 항목 - 필수 항목: 아이디, 비밀번호, 이름, 성별,
                  생년월일, 이메일, 주소
                </p>
                <p>
                  2. 수집 목적 - 회원 관리 및 본인 확인 - 서비스 제공 및 고객
                  지원 - 불법 이용 방지 및 서비스 안정성 확보
                </p>
                <p>
                  3. 보유 및 이용 기간 - 회원 탈퇴 시까지 보유하며, 관계 법령에
                  따라 일정 기간 보관할 수 있습니다.
                </p>
                <p>
                  4. 동의 거부 권리 - 개인정보 수집 및 이용에 대한 동의를 거부할
                  수 있으나, 동의하지 않을 경우 회원가입 및 서비스 이용이 제한될
                  수 있습니다.
                </p>
              </div>

              <div className="flex justify-end items-center gap-2 px-3 py-2 border-t border-[#5C4033]">
                <Label
                  htmlFor="agree-privacy"
                  className="text-[13px] cursor-pointer"
                >
                  동의함
                </Label>
                <Checkbox
                  id="agree-privacy"
                  checked={agreePrivacy}
                  onCheckedChange={(checked: boolean) =>
                    setAgreePrivacy(checked)
                  }
                  className="data-[state=checked]:border border-[#5C4033] data-[state=checked]:bg-[#5C4033] data-[state=checked]:text-white"
                />
              </div>
            </div>

            <div className="border border-[#5C4033] mt-[20px] flex flex-col h-[260px]">
              <div className="px-3 py-2 text-[14px] font-medium border-b border-[#5C4033]">
                [선택] 쇼핑정보 수신 동의
              </div>

              <div className="flex-1 px-3 py-2 text-[13px] overflow-y-auto leading-[1.6]">
                <p>
                  회사는 회원에게 다양한 혜택과 정보를 제공하기 위해 마케팅
                  정보를 발송할 수 있습니다.
                </p>
                <p>
                  1. 수신 정보 - 이벤트 및 할인 혜택 - 신규 서비스 및 상품 안내
                </p>
                <p>2. 발송 방법 - 이메일, 문자메시지(SMS) 등</p>
                <p>
                  3. 동의 철회 - 회원은 언제든지 마케팅 정보 수신 동의를 철회할
                  수 있으며, 철회 시 관련 정보 발송은 즉시 중단됩니다.
                </p>
                <p>
                  ※ 본 동의는 선택 사항이며, 동의하지 않더라도 서비스 이용에는
                  제한이 없습니다.
                </p>
              </div>

              <div className="flex justify-end items-center gap-2 px-3 py-2 border-t border-[#5C4033]">
                <Label
                  htmlFor="agree-marketing"
                  className="text-[13px] cursor-pointer"
                >
                  동의함
                </Label>
                <Checkbox
                  id="agree-marketing"
                  checked={agreeMarketing}
                  onCheckedChange={(checked: boolean) =>
                    setAgreeMarketing(checked)
                  }
                  className="data-[state=checked]:border border-[#5C4033] data-[state=checked]:bg-[#5C4033] data-[state=checked]:text-white"
                />
              </div>
            </div>
          </div>

          <div className="mt-[40px] mb-[60px]">
            <button
              type="button"
              onClick={() => {
                console.log("Next button clicked!");

                if (IS_DEV_MODE) {
                  navigate("/save-ai-info", {
                    state: {
                      memberId: memberId || "devuser_" + Date.now(),
                      memberPw: memberPw || "Dev1234!", // 특수문자 규칙 대응
                      memberName: memberName || "테스터",
                      email:
                        emailId && emailDomain
                          ? `${emailId}@${emailDomain}`
                          : `dev_${Date.now()}@naver.com`,
                      gender: gender || 1,
                      birth: birth || "1995-01-01",
                      postCode: postCode || "06159",
                      address: address || "서울 강남구 테헤란로 427",
                      addressDetail: addressDetail || "트레이드타워",
                      marketingAgree: agreeMarketing,
                    },
                  });
                  return;
                }

                if (!memberId || idError) {
                  window.alert("아이디를 올바르게 입력해주세요.");
                  return;
                }
                if (!memberPw || pwError) {
                  window.alert("비밀번호를 올바르게 입력해주세요.");
                  return;
                }
                if (memberPw !== confirmPw) {
                  window.alert("비밀번호가 일치하지 않습니다.");
                  return;
                }
                if (!memberName.trim()) {
                  window.alert("이름을 입력해주세요.");
                  return;
                }
                if (!gender) {
                  window.alert("성별을 선택해주세요.");
                  return;
                }
                if (!birth) {
                  window.alert("생년월일을 입력해주세요.");
                  return;
                }
                if (!postCode || !address) {
                  window.alert("주소를 입력해주세요.");
                  return;
                }
                if (!emailId || !emailDomain) {
                  window.alert("이메일을 입력해주세요.");
                  return;
                }
                if (!isRequiredAgreed) {
                  window.alert("필수 약관에 동의하셔야 가입이 가능합니다.");
                  return;
                }
                if (!isIdAvailable) {
                  window.alert("아이디를 올바르게 입력해주세요.");
                  return;
                }
                if (!isEmailVerified) {
                  window.alert("이메일 인증을 완료해주세요.");
                  return;
                }

                // 모든 검사가 끝나면 다음 페이지로 데이터와 함께 이동
                navigate("/save-ai-info", {
                  state: {
                    memberId,
                    memberPw,
                    memberName,
                    email: `${emailId}@${emailDomain}`,
                    gender,
                    birth,
                    postCode,
                    address,
                    addressDetail,
                    marketingAgree: agreeMarketing,
                  },
                });
              }}
              className={`w-full h-[52px] flex items-center justify-center border border-[#5C4033] text-[16px] font-medium hover:bg-[#5C4033] hover:text-white transition cursor-pointer`}
            >
              다음
            </button>

            {!isRequiredAgreed && (
              <p className="mt-3 text-[13px] text-red-500 text-center">
                필수 약관에 동의하셔야 가입이 가능합니다.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { SignUp };
