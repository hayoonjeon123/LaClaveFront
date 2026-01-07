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
import WriteReview from "./pages/mypage/writeReview";
import AddressList from "./pages/mypage/addressList";
import AddAddress from "./pages/mypage/addAddress";
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
import { MemberManagement } from "./pages/admin/MemberManagement";
import { AdminHome } from "./pages/admin/AdminHome";

import { MemberDetail } from "./pages/admin/MemberDetail";
import { CommonCodeManagement } from "./pages/admin/CommonCodeManagement";
import { CommonCodeAdd } from "./pages/admin/CommonCodeAdd";
import { MemberCancel } from "./pages/admin/MemberCancel";
import { MemberExchange } from "./pages/admin/MemberExchange";
import { MemberRefund } from "./pages/admin/MemberRefund";
import { MemberReturn } from "./pages/admin/MemberReturn";
import { ProductRegister } from "./pages/admin/ProductRegister";
import { ProductEdit } from "./pages/admin/ProductEdit";
import { ProductList } from "./pages/admin/ProductList";
import { OrderList } from "./pages/admin/OrderList";
import { PaymentList } from "./pages/admin/PaymentList";
import { ProductStock } from "./pages/admin/ProductStock";
import { DeliveryReady } from "./pages/admin/DeliveryReady";
import { DeliveryList } from "./pages/admin/DeliveryList";
import { InquiryList } from "./pages/admin/InquiryList";
import { Best } from "./pages/product/Best";
import { All } from "./pages/product/All";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<App />} />
          {/* 마이페이지 메인 */}
          <Route path="myPage" element={<MyPage />} />
          {/* 주문내역 */}
          <Route path="myOrders" element={<MyOrders />} />
          {/* 리뷰 */}
          <Route path="myReview" element={<MyReview />} />
          <Route path="writeReview" element={<WriteReview />} />
          <Route path="addressList" element={<AddressList />} />
          <Route path="addAddress" element={<AddAddress />} />
          {/* 문의내역 */}
          <Route path="myInquiryHistory" element={<MyInquiryHistory />} />
          {/* 최근 본 상품 */}
          <Route path="myRecent" element={<MyRecent />} />
          {/* 회원탈퇴 */}
          <Route path="myWithDraw" element={<MyWithDraw />} />
          {/* 쿠폰 */}
          <Route path="myCoupon" element={<MyCoupon />} />
          {/* 취소/반품/교환 */}
          <Route path="myClaim" element={<MyClaim />} />
          {/* 포인트 */}
          <Route path="myPoint" element={<MyPoint />} />
          {/* 찜목록 */}
          <Route path="myWishList" element={<MyWishList />} />
          <Route path="aiselect" element={<AiSelect />} />
          <Route path="login" element={<AppLogin />} />
          <Route path="product/:productId" element={<ProductDetail />} />
          <Route path="all" element={<All />} />
          <Route path="best" element={<Best />} />
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
          <Route index element={<AdminHome />} />
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
          <Route path="order/list" element={<OrderList />} />
          <Route path="order/payment" element={<PaymentList />} />
          <Route path="product/stock" element={<ProductStock />} />
          <Route path="delivery/ready" element={<DeliveryReady />} />
          <Route path="delivery/manage" element={<DeliveryList />} />

          <Route path="board" element={<InquiryList />} />
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
