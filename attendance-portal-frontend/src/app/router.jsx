import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

import LateComerPage from "../features/latecomer/pages/LateComerPage";
import AbsenteesPage from "../features/absentees/pages/AbsenteesPage";
import LateEarlyOutPage from "../features/lateearlyout/pages/LateEarlyOutPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ HOME — NO NAVBAR */}
        <Route path="/" element={<Home />} />    

        {/* ✅ ALL MODULES — WITH NAVBAR */}
        <Route element={<MainLayout />}>
          <Route path="/late-comer" element={<LateComerPage />} />
          <Route path="/absentees" element={<AbsenteesPage />} />
          <Route path="/late-early-out" element={<LateEarlyOutPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
