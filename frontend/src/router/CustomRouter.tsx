import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import SidebarComponent from "@/components/commonLayout/sidebars/SidebarComponent";
import Footer from "@/components/commonLayout/footer/Footer";

const MainComponentPage = React.lazy(() => import("@/components/pages/Main"));
const LoginComponentPage = React.lazy(() => import("@/components/pages/Auth"));
const ChannelFormComponentPage = React.lazy(
  () => import("@/components/pages/ChannelForm")
);
const ProfileComponentPage = React.lazy(
  () => import("@/components/pages/Profile")
);
const ChannelListPageComponent = React.lazy(
  () => import("@/components/pages/ChannelList")
);

const CustomRouter = () => {
  return (
    <React.Fragment>
      <SidebarComponent />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainComponentPage />} />
          <Route path="/auth" element={<LoginComponentPage />} />
          <Route
            path="/channels/create"
            element={<ChannelFormComponentPage />}
          />
          <Route path="/profile" element={<ProfileComponentPage />} />
          <Route path="/profile/:id" element={<ProfileComponentPage />} />
          <Route path="/channels" element={<ChannelListPageComponent />} />
        </Routes>
      </Suspense>
      <Footer />
    </React.Fragment>
  );
};

export default CustomRouter;
