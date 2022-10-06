import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "@/components/commonLayout/Sidebar/Sidebar";
import Footer from "@/components/commonLayout/footer/Footer";

const MainComponentPage = React.lazy(() => import("@/components/pages/Main"));
const LoginComponentPage = React.lazy(() => import("@/components/pages/Auth"));
const ChannelFormComponentPage = React.lazy(
  () => import("@/components/pages/ChannelForm")
);
const ProfileComponentPage = React.lazy(
  () => import("@/components/pages/Profile")
);

const CustomRouter = () => {
  return (
    <React.Fragment>
      <Sidebar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainComponentPage />} />
          <Route path="/auth" element={<LoginComponentPage />} />
          <Route
            path="/channels/create"
            element={<ChannelFormComponentPage />}
          />
          <Route path="/profile" element={<ProfileComponentPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </React.Fragment>
  );
};

export default CustomRouter;
