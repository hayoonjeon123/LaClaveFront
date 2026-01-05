import { AppSidebar } from "@/components/common";
import { AdminSidebar } from "@/components/common/AdminSidebar";
import { Routes, Route } from "react-router-dom";
import MyPage from "./pages/myPage";
import MyOrders from "./pages/myOrders";
function App() {
  return (
    <div>
      <AppSidebar />
      <AdminSidebar />
      <Routes>
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/myOrders" element={<MyOrders />} />
      </Routes>
    </div>
  );
}
export default App;
