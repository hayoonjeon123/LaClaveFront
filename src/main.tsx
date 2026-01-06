import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import { App } from "./App";
import { BlankLayout, MainLayout } from "./layouts";
import { SignUp } from "./pages/SignUp";
import MyPage from "./pages/mypage/myPage";
import MyOrders from "./pages/mypage/myOrders";
import { AiSelect } from "./pages/AiSelect";
import { LogIn } from "./pages/LogIn";
import { ProductDetail } from "./pages/product/ProductDetail";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<App />} />
          <Route path="myPage" element={<MyPage />} />
          <Route path="myOrders" element={<MyOrders />} />
          <Route path="aiselect" element={<AiSelect />} />
          <Route path="login" element={<LogIn />} />
          <Route path="product/:productId" element={<ProductDetail />} />
        </Route>

        <Route element={<BlankLayout />}>
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
