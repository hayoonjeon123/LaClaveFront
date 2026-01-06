
export const CLASS_CATEGORY = [
    { id: 1, label: "전체" },
    { id: 2, label: "베스트" },
    { id: 3, label: "상의", subItems: ['맨투맨/후드', '셔츠', '니트', '티셔츠'] },
    { id: 4, label: "하의", subItems: ['슬랙스', '데님', '숏팬츠', '트레이닝', '팬츠'] },
    { id: 5, label: "아우터", subItems: ['패딩', '자켓', '코트', '가디건'] },
    { id: 6, label: "악세서리", subItems: ['모자', '머플러/장갑', '가방', '벨트', '쥬얼리', '양말', '신발'] },
    { id: 7, label: "고객센터" },
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
            { label: '상품 등록', path: '/admin/product/register' },
            { label: '상품 조회', path: '/admin/product/list' },
            { label: '상품 수정', path: '/admin/product/edit' },
            { label: '재고 관리', path: '/admin/product/stock' }
        ]
    },
    {
        id: 4,
        label: "배송",
        subItems: [
            { label: '배송 준비중', path: '/admin/delivery/ready' },
            { label: '배송 관리', path: '/admin/delivery/manage' }
        ]
    },
    { id: 5, label: "고객", path: "/admin/member" },
    { id: 6, label: "게시판", path: "/admin/board" },
    { id: 7, label: "공통코드", path: "/admin/code" },
]
