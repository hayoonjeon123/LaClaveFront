import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MOCK_ORDERS = [
  {
    id: 1,
    title: "리버서블 패딩 외 3건",
    date: "2025.04.26",
    price: "155,856원",
  },
  { id: 2, title: "캐시미어 니트", date: "2025.03.15", price: "89,000원" },
  {
    id: 3,
    title: "와이드 데님 팬츠 외 1건",
    date: "2025.02.10",
    price: "64,000원",
  },
];

export function MemberDetail() {
  const [gender, setGender] = useState("F");
  const [memberType, setMemberType] = useState("정상");
  const [grade, setGrade] = useState("VIP");

  return (
    <div className="w-full max-w-[1200px] mx-auto space-y-8 font-['Inter',sans-serif]">
      <div className="w-full bg-white rounded-[10px] border border-[#A8A9AD] p-8 mt-8">
        <h2 className="text-3xl font-normal text-black mt-2 ml-4">송은경님</h2>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* 왼쪽: 기본 정보 */}
        <div className="bg-white rounded-[10px] border border-[#A8A9AD] overflow-hidden">
          <div className="flex border-b border-[#A8A9AD] h-[64px] items-center">
            <div className="w-[120px] pl-6 font-bold">아이디 :</div>
            <div>laclave12</div>
          </div>
          <div className="flex h-[64px] items-center">
            <div className="w-[120px] pl-6 font-bold">생년월일 :</div>
            <div>2001년 10월 4일</div>
          </div>
        </div>

        {/* 오른쪽: 연락처 정보 */}
        <div className="bg-white rounded-[10px] border border-[#A8A9AD] overflow-hidden">
          <div className="flex border-b border-[#A8A9AD] h-[64px] items-center">
            <div className="w-[120px] pl-6 font-bold">이메일 :</div>
            <div>laclave12@naver.com</div>
          </div>
          <div className="flex h-[64px] items-center">
            <div className="w-[120px] pl-6 font-bold">주소 :</div>
            <div>부산광역시 수영과 광안동 송은경 - 4</div>
          </div>
        </div>
      </div>

      {/* 계정 상태 및 등급 */}
      <div className="grid grid-cols-3 gap-8">
        {/* 가입일자/탈퇴일자 */}
        <div className="bg-white rounded-[10px] border border-[#A8A9AD] overflow-hidden">
          <div className="flex border-b border-[#A8A9AD] h-[64px] items-center">
            <div className="w-[120px] pl-6 font-bold">가입일자 :</div>
            <div>2001년 10월 4일</div>
          </div>
          <div className="flex h-[64px] items-center">
            <div className="w-[120px] pl-6 font-bold">탈퇴일자 :</div>
            <div>2001년 10월 4일</div>
          </div>
        </div>

        {/* 회원 유형/등급 */}
        <div className="bg-white rounded-[10px] border border-[#A8A9AD] overflow-hidden">
          <div className="flex border-b border-[#A8A9AD] h-[64px] items-center pl-6 pr-6 justify-between">
            <div className="font-bold">회원 유형</div>
            <Select value={memberType} onValueChange={setMemberType}>
              <SelectTrigger className="w-[100px] h-[32px] border border-[#A8A9AD] rounded px-2 focus:ring-0">
                <SelectValue placeholder="회원 유형" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="정상">정상</SelectItem>
                <SelectItem value="탈퇴">탈퇴</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex h-[64px] items-center pl-6 pr-6 justify-between">
            <div className="font-bold">등급</div>
            <Select value={grade} onValueChange={setGrade}>
              <SelectTrigger className="w-[100px] h-[32px] border border-[#A8A9AD] rounded px-2 focus:ring-0">
                <SelectValue placeholder="등급" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="VIP">VIP</SelectItem>
                <SelectItem value="GOLD">GOLD</SelectItem>
                <SelectItem value="SILVER">SILVER</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 성별/적립금 */}
        <div className="bg-white rounded-[10px] border border-[#A8A9AD] overflow-hidden">
          <div className="flex border-b border-[#A8A9AD] h-[64px] items-center pl-6">
            <div className="font-bold mr-8">성별</div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="gender-man"
                  checked={gender === "M"}
                  onCheckedChange={(checked) => checked && setGender("M")}
                  className="data-[state=checked]:border border-[#5C4033] data-[state=checked]:bg-[#5C4033] data-[state=checked]:text-white"
                />
                <Label htmlFor="gender-man" className="cursor-pointer">남</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="gender-woman"
                  checked={gender === "F"}
                  onCheckedChange={(checked) => checked && setGender("F")}
                  className="data-[state=checked]:border border-[#5C4033] data-[state=checked]:bg-[#5C4033] data-[state=checked]:text-white"
                />
                <Label htmlFor="gender-woman" className="cursor-pointer">여</Label>
              </div>
            </div>
          </div>
          <div className="flex h-[64px] items-center pl-6">
            <div className="font-bold mr-4">보유 적립금 :</div>
            <div>13,000원</div>
          </div>
        </div>
      </div>

      {/* 주문 내역 */}
      <div className="w-full bg-white rounded-[10px] border border-[#A8A9AD] min-h-[300px] flex flex-col">
        <div className="h-[50px] border-b border-[#A8A9AD] flex items-center px-6 bg-gray-50/50">
          <span className="font-bold text-gray-700">주문내역</span>
        </div>
        <div className="p-6">
          {MOCK_ORDERS.map((order, index) => (
            <div
              key={order.id}
              className="grid grid-cols-[60px_300px_250px_250px] items-center py-4  last:border-0 text-gray-900 font-medium"
            >
              <span className="w-8 text-center">{index + 1}.</span>
              <span>{order.title}</span>
              <span className="text-center">{order.date}</span>
              <span className="text-center">{order.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
