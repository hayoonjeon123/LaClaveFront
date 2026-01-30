import { StrictMode } from "react";
import { SearchResult } from "./pages/product/SearchResult";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import { App } from "./App";
import { BlankLayout, MainLayout, AdminLayout } from "./layouts";
import { SignUp } from "./pages/member/SignUp";
import MyPage from "./pages/mypage/myPage";
import MyDeliveryList from "./pages/mypage/MyDeliveryList";
import MyOrders from "./pages/mypage/myOrders";
import MyReview from "./pages/mypage/myReview";
import MyInquiryHistory from "./pages/mypage/myInquiryHistory";
import MyRecent from "./pages/mypage/myRecent";
import MyWithDraw from "./pages/mypage/myWithDraw";
import MyCoupon from "./pages/mypage/myCoupon";
import MyDelivery from "./pages/mypage/myDelivery";
import MyClaim from "./pages/mypage/myClaim";
import MyMemberEdit from "./pages/mypage/MemberEdit";
import MyPwEdit from "./pages/mypage/PwEdit";
import WriteInquiry from "./pages/mypage/WriteInquiry";
import MyPoint from "./pages/mypage/myPoint";
import MyWishList from "./pages/mypage/myWishList";
import WriteReview from "./pages/mypage/writeReview";
import AddressList from "./pages/mypage/addressList";
import AddAddress from "./pages/mypage/addAddress";
import EditAddress from "./pages/mypage/EditAddress";
import EditInquiry from "./pages/mypage/EditInquiry";
import { AiSelect } from "./pages/member/AiSelect";
import MyAi from "./pages/mypage/myAi";
import { AppLogin } from "./pages/member/AppLogin";
import { ProductDetail } from "./pages/product/ProductDetail";
import { Cart } from "./pages/payment/CartPage";
import { Order } from "./pages/payment/Order";
import { OrderComplete } from "./pages/payment/OrderComplete";
import { FindAccount } from "./pages/member/FindAccount";
import { FindResult } from "./pages/member/FindResult";
import { ProductPage } from "./pages/product/ProductPage";
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
import TermsOfUse from "./pages/policy/TermsOfUse";
import PrivacyPolicy from "./pages/policy/PrivacyPolicy";
import ErrorPage from "./pages/error/ErrorPage";
import { JoinComplete } from "./pages/member/JoinComplete";
import { Best } from "./pages/product/Best";
import MyDeliveryPage from "./pages/mypage/myDelivery";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<App />} />
          <Route path="myPage" element={<MyPage />} />
          <Route path="MyDeliveryList" element={<MyDeliveryList />} />
          <Route path="myOrders" element={<MyOrders />} />
          <Route path="myReview" element={<MyReview />} />
          <Route path="writeReview" element={<WriteReview />} />
          <Route path="addressList" element={<AddressList />} />
          <Route path="/editAddress/:addressIdx" element={<EditAddress />} />
          <Route path="addAddress" element={<AddAddress />} />
          <Route path="myInquiryHistory" element={<MyInquiryHistory />} />
          <Route path="myRecent" element={<MyRecent />} />
          <Route path="myWithDraw" element={<MyWithDraw />} />
          <Route path="myCoupon" element={<MyCoupon />} />
          <Route path="myDelivery/:orderIdx" element={<MyDelivery />} />
          <Route
            path="/mypage/mydelivery/:orderIdx"
            element={<MyDeliveryPage />}
          />
          <Route path="myClaim" element={<MyClaim />} />
          <Route path="myMemberEdit" element={<MyMemberEdit />} />
          <Route path="myPwEdit" element={<MyPwEdit />} />
          <Route path="writeInquiry" element={<WriteInquiry />} />
          <Route path="myPoint" element={<MyPoint />} />
          <Route path="myWishList" element={<MyWishList />} />
          <Route path="editInquiry/:inquiryIdx" element={<EditInquiry />} />
          <Route path="save-ai-info" element={<AiSelect />} />
          <Route path="loginProc" element={<AppLogin />} />
          <Route path="product/:productIdx" element={<ProductDetail />} />
          <Route path="category/:categoryName" element={<ProductPage />} />
          <Route path="best" element={<Best />} />
          <Route path="search" element={<SearchResult />} />
          <Route path="myAi" element={<MyAi />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<Order />} />
          <Route path="order-complete" element={<OrderComplete />} />
          <Route path="findaccount" element={<FindAccount />} />
          <Route path="find-result/:type" element={<FindResult />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="termsofuse" element={<TermsOfUse />} />
          <Route path="privacypolicy" element={<PrivacyPolicy />} />
          <Route path="JoinComplete" element={<JoinComplete />} />
          <Route path="*" element={<ErrorPage />} />
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
  </StrictMode>,
);
