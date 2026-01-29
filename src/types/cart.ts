// 장바구니 관련 types
export interface CartItemRequest {
    productIdx: number;
    size: string;
    color: string;
    quantity: number;
    price: number;
    discountPrice: number;
}

export interface CartItemResponse {
    cartItemIdx: number;
    productIdx: number;
    productName: string;
    mainImageUrl: string;
    imageUrl?: string; // backend might send this, we will map it
    size: any; // backend returns object {commonIdx, codeName}
    color: any; // backend returns object {commonIdx, codeName}
    quantity: number;
    price: number;
    discountPrice: number;
    totalPrice: number;
    checked: boolean;
    // Optional fields for frontend processing
    colorName?: string;
    sizeName?: string;
    colorCommonIdx?: number;
    sizeCommonIdx?: number;
}
