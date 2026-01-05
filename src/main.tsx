import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { BlankLayout, MainLayout } from "./layouts/index.ts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/SignUp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<App />} />
        </Route>
        <Route element={<BlankLayout />}>
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
