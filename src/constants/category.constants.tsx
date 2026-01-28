
export const CLASS_CATEGORY = [
    { id: 1, label: "베스트", path: "best" },
    {
        id: 86,
        label: "상의",
        path: "category/top",
        subItems: [
            { id: 108, label: '맨투맨/후드' },
            { id: 109, label: '셔츠' },
            { id: 110, label: '니트' },
            { id: 111, label: '티셔츠' }
        ]
    },
    {
        id: 87,
        label: "하의",
        path: "category/bottom",
        subItems: [
            { id: 112, label: '슬랙스' },
            { id: 113, label: '데님' },
            { id: 114, label: '숏팬츠' },
            { id: 131, label: '트레이닝' },
        ]
    },
    {
        id: 88,
        label: "아우터",
        path: "category/outer",
        subItems: [
            { id: 133, label: '패딩' },
            { id: 134, label: '자켓' },
            { id: 135, label: '코트' },
            { id: 136, label: '가디건' }
        ]
    },
    {
        id: 90,
        label: "악세서리",
        path: "category/acc",
        subItems: [
            { id: 137, label: '모자' },
            { id: 138, label: '머플러/장갑' },
            { id: 139, label: '가방' },
            { id: 140, label: '벨트' },
            { id: 141, label: '쥬얼리' },
            { id: 142, label: '양말' }
        ]
    },
    { id: 7, label: "고객센터", path: "faq" },
]


export const ADMIN_CATEGORY = [
    { id: 1, label: "홈", path: "/admin" },
    {
        id: 2,
        label: "주문",
        subItems: [
            { label: '주문 조회', path: '/admin/order/list' },
            { label: '취소', path: '/admin/order/cancel' },
            { label: '교환', path: '/admin/order/exchange' },
            { label: '반품', path: '/admin/order/return' },
            { label: '환불', path: '/admin/order/refund' },
            { label: '결제목록', path: '/admin/order/payment' }
        ]
    },
    {
        id: 3,
        label: "상품",
        subItems: [
            { label: '상품 조회', path: '/admin/product/list' },
            { label: '상품 등록', path: '/admin/product/register' },
            { label: '상품 수정', path: '/admin/product/edit' },
            { label: '재고 관리', path: '/admin/product/stock' }
        ]
    },
    {
        id: 4,
        label: "배송",
        subItems: [
            { label: '배송 관리', path: '/admin/delivery/manage' },
            { label: '배송 준비중', path: '/admin/delivery/ready' }
        ]
    },
    { id: 5, label: "고객", path: "/admin/member" },
    { id: 6, label: "게시판", path: "/admin/board" },
    { id: 7, label: "공통코드", path: "/admin/code" },
]
