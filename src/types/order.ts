// 주문 관련 types
export interface OrderItemRequest {
    productIdx: number;
    productName: string;
    colorCode: number;
    sizeCode: number;
    quantity: number;
    price: number;
    discountPrice: number;
}

export interface OrderRequest {
    addrIdx: number;
    usedPoint: number;
    totalPrice: number;
    deliveryMsg: string;
    orderItems: OrderItemRequest[];
}

export interface OrderApprovalRequest {
    orderNo: string;
    externalTransaction: string;
    payWay: string;
    amount: number;
}

export interface OrderItem {
    id: number;
    cartItemIdx?: number;
    productIdx?: number;
    name: string;
    option: string;
    quantity: number;
    price: number;
    image: string;
    colorCommonIdx: number;
    sizeCommonIdx: number;
}
