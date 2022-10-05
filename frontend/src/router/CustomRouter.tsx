import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "@/components/Sidebar/Sidebar";
import Main from "@/components/pages/Main";
import Footer from "@/components/pages/Footer";

const CustomRouter = () => {
  return (
    <React.Fragment>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
};

export default CustomRouter;
