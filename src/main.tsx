import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import App from "./App";
import { BlankLayout, MainLayout } from "./layouts";
import { SignUp } from "./pages/member/SignUp";
import MyPage from "./pages/mypage/myPage";
import MyOrders from "./pages/mypage/myOrders";
import { AiSelect } from "./pages/member/AiSelect";
import { AppLogin } from "./pages/member/AppLogin";
import ProductDetail from "./pages/product/ProductDetail";
import { FindAccount } from "./pages/member/FindAccount";
import { FindResult } from "./pages/member/FindResult";
import { Cart } from "./pages/payment/CartPage";

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
          <Route path="findaccount" element={<FindAccount />} />
          <Route path="findresult/:type" element={<FindResult />} />
          <Route path="cart" element={<Cart />} />
        </Route>

        <Route element={<BlankLayout />}>
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
