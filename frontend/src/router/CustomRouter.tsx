import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "@/components/Sidebar/Sidebar";
import Main from "@/components/pages/Main";
import Login from "@/components/pages/Login";
import ChannelForm from "@/components/recruitingChannel/ChannelForm";
import Footer from "@/components/pages/Footer";

const CustomRouter = () => {
  return (
    <React.Fragment>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/channels/create" element={<ChannelForm />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
};

export default CustomRouter;
