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
