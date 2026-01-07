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
import { AiSelect } from "./pages/AiSelect";
import { AppLogin } from "./pages/member/AppLogin";
import { ProductDetail } from "./pages/product/ProductDetail";
import { Cart } from "./pages/payment/CartPage";
import { Order } from "./pages";
import { FindAccount } from "./pages/member/FindAccount";
import { FindResult } from "./pages/member/FindResult";
import { Outer } from "./pages/product/Outer";
import { Top } from "./pages/product/Top";
import { Bottom } from "./pages/product/Bottom";
import { Acc } from "./pages/product/Acc";
import { FAQ } from "./pages/board/FAQ";
import { MemberManagement } from "./pages/admin/MemberManagement";
import { AdminHome } from "./pages/admin/AdminHome";
import { AdminPlaceholder } from "./pages/admin/AdminPlaceholder";
import { MemberDetail } from "./pages/admin/MemberDetail";
import { CommonCodeManagement } from "./pages/admin/CommonCodeManagement";
import { CommonCodeAdd } from "./pages/admin/CommonCodeAdd";
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

          <Route path="order/list" element={<AdminPlaceholder title="주문 조회" />} />
          <Route path="order/cancel" element={<AdminPlaceholder title="취소" />} />
          <Route path="order/exchange" element={<AdminPlaceholder title="교환" />} />
          <Route path="order/return" element={<AdminPlaceholder title="반품" />} />
          <Route path="order/refund" element={<AdminPlaceholder title="환불" />} />
          <Route path="order/payment" element={<AdminPlaceholder title="결제목록" />} />

          <Route path="product/register" element={<AdminPlaceholder title="상품 등록" />} />
          <Route path="product/list" element={<AdminPlaceholder title="상품 조회" />} />
          <Route path="product/edit" element={<AdminPlaceholder title="상품 수정" />} />
          <Route path="product/stock" element={<AdminPlaceholder title="재고 관리" />} />

          <Route path="delivery/ready" element={<AdminPlaceholder title="배송 준비중" />} />
          <Route path="delivery/manage" element={<AdminPlaceholder title="배송 관리" />} />

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
