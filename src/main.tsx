import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import { App } from "./App";
import { BlankLayout, MainLayout, AdminLayout } from "./layouts";
import { SignUp } from "./pages/member/SignUp";
import MyPage from "./pages/mypage/myPage";
import MyOrders from "./pages/mypage/myOrders";
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<App />} />
          <Route path="myPage" element={<MyPage />} />
          <Route path="myOrders" element={<MyOrders />} />
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

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="member" element={<MemberManagement />} />
          <Route path="home" element={<AdminHome />} />
        </Route>

        <Route element={<BlankLayout />}>
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
