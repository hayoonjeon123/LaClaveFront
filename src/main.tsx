import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import { App } from "./App";
import { BlankLayout, MainLayout, AdminLayout } from "./layouts";
import { SignUp } from "./pages/member/SignUp";
import MyPage from "./pages/mypage/myPage";
import MyOrders from "./pages/mypage/myOrders";
import MyReview from "./pages/mypage/myReview";
import MyInquiryHistory from "./pages/mypage/myInquiryHistory";
import MyRecent from "./pages/mypage/myRecent";
import MyWithDraw from "./pages/mypage/myWithDraw";
import MyCoupon from "./pages/mypage/myCoupon";
import MyClaim from "./pages/mypage/myClaim";
import MyPoint from "./pages/mypage/myPoint";
import MyWishList from "./pages/mypage/myWishList";
import { AiSelect } from "./pages/member/AiSelect";
import { AppLogin } from "./pages/member/AppLogin";
import { ProductDetail } from "./pages/product/ProductDetail";
import { Cart } from "./pages/payment/CartPage";
import { Order } from "./pages/payment/Order";
import { FindAccount } from "./pages/member/FindAccount";
import { FindResult } from "./pages/member/FindResult";
import { Outer } from "./pages/product/Outer";
import { Top } from "./pages/product/Top";
import { Bottom } from "./pages/product/Bottom";
import { Acc } from "./pages/product/Acc";
import { FAQ } from "./pages/board/FAQ";
import { MemberManagement } from "./pages/Admin/MemberManagement";
import { AdminHome } from "./pages/Admin/AdminHome";
import { AdminPlaceholder } from "./pages/Admin/AdminPlaceholder";
import { MemberDetail } from "./pages/Admin/MemberDetail";
import { CommonCodeManagement } from "./pages/Admin/CommonCodeManagement";
import { CommonCodeAdd } from "./pages/Admin/CommonCodeAdd";
import { MemberCancel } from "./pages/Admin/MemberCancel";
import { MemberExchange } from "./pages/Admin/MemberExchange";
import { MemberRefund } from "./pages/Admin/MemberRefund";
import { MemberReturn } from "./pages/Admin/MemberReturn";
import { ProductRegister } from "./pages/Admin/ProductRegister";
import { ProductEdit } from "./pages/Admin/ProductEdit";
import { ProductList } from "./pages/Admin/ProductList";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<App />} />
          <Route path="myPage" element={<MyPage />} />
          <Route path="myOrders" element={<MyOrders />} />
          <Route path="myReview" element={<MyReview />} />
          <Route path="myInquiryHistory" element={<MyInquiryHistory />} />
          <Route path="myRecent" element={<MyRecent />} />
          <Route path="myWithDraw" element={<MyWithDraw />} />
          <Route path="myCoupon" element={<MyCoupon />} />
          <Route path="myClaim" element={<MyClaim />} />
          <Route path="myPoint" element={<MyPoint />} />
          <Route path="myWishList" element={<MyWishList />} />
          <Route path="aiselect" element={<AiSelect />} />
          <Route path="login" element={<AppLogin />} />
          <Route path="product/:productId" element={<ProductDetail />} />
          <Route path="outer" element={<Outer />} />
          <Route path="top" element={<Top />} />
          <Route path="bottom" element={<Bottom />} />
          <Route path="acc" element={<Acc />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<Order />} />
          <Route path="findAccount" element={<FindAccount />} />
          <Route path="findResult" element={<FindResult />} />
          <Route path="faq" element={<FAQ />} />
        </Route>

        {/* 여기부터 관리자 */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="member" element={<MemberManagement />} />
          <Route path="member/:memberId" element={<MemberDetail />} />
          <Route path="home" element={<AdminHome />} />
          <Route path="order/cancel" element={<MemberCancel />} />
          <Route path="order/exchange" element={<MemberExchange />} />
          <Route path="order/refund" element={<MemberRefund />} />
          <Route path="order/return" element={<MemberReturn />} />
          <Route path="product/register" element={<ProductRegister />} />
          <Route path="product/edit" element={<ProductEdit />} />
          <Route path="product/list" element={<ProductList />} />
          <Route
            path="order/list"
            element={<AdminPlaceholder title="주문 조회" />}
          />

          <Route
            path="order/payment"
            element={<AdminPlaceholder title="결제목록" />}
          />

          <Route
            path="product/stock"
            element={<AdminPlaceholder title="재고 관리" />}
          />

          <Route
            path="delivery/ready"
            element={<AdminPlaceholder title="배송 준비중" />}
          />
          <Route
            path="delivery/manage"
            element={<AdminPlaceholder title="배송 관리" />}
          />

          <Route path="board" element={<AdminPlaceholder title="게시판" />} />
          <Route path="code" element={<CommonCodeManagement />} />
          <Route path="code/add" element={<CommonCodeAdd />} />
        </Route>

        {/* 여기부터 공통 */}
        <Route element={<BlankLayout />}>
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
