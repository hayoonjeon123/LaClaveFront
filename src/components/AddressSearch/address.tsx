// types/address.ts (또는 해당 컴포넌트 파일 상단)
export interface AddressData {
    address: string;
    addressType: 'R' | 'J'; // R: 도로명, J: 지번
    bname: string;
    buildingName: string;
    zonecode: string; // 우편번호
}

export interface SelectedAddress {
    postCode: string;
    address: string;
}