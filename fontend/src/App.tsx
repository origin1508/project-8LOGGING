import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "@/styles/globalStyle";
import Main from "@/components/pages/Main";
import Sidebar from "@/components/Sidebar/Sidebar";

function App() {
  return (
    <React.Fragment>
      <Sidebar />
      <div>
        <Main />
      </div>
      <GlobalStyle />
    </React.Fragment>
  );
}

export default App;
