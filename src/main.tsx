import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import App from "./App";
import { BlankLayout, MainLayout } from "./layouts";
import { SignUp } from "./pages/SignUp";
import MyPage from "./pages/myPage";
import MyOrders from "./pages/myOrders";
import { AiSelect } from "./pages/AiSelect";
import { LogIn } from "lucide-react";

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
        </Route>

        <Route element={<BlankLayout />}>
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
