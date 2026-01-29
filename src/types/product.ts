// 상품 관련 types
export interface Product {
    productIdx: number;
    productName: string;
    productPrice: number;
    discount: number;
    mainImageUrl: string;
    colors: string[];
    categoryIdx?: number;
    images?: { url?: string; imagePath?: string }[];
}

export interface ProductDetail extends Product {
    productDetailDesc: string;
    detailImages: string[];
    sizes: string[];
    averageRating: number;
    reviewCount: number;
    wishlistCount: number;
    colorCommonIdx: number[];
    sizeCommonIdx: number[];
}
