import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "@/components/commonLayout/Sidebar/Sidebar";
import Main from "@/components/pages/Main";
import Login from "@/components/pages/Login";
import ChannelForm from "@/components/recruitingChannel/ChannelForm";
import Profile from "@/components/profile/Profile";
import Footer from "@/components/commonLayout/footer/Footer";

const CustomRouter = () => {
  return (
    <React.Fragment>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/channels/create" element={<ChannelForm />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
};

export default CustomRouter;
