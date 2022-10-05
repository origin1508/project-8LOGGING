import React from "react";
import CustomRouter from "@/router/CustomRouter";
import GlobalStyle from "@/styles/globalStyle";

function App() {
  return (
    <React.Fragment>
      <CustomRouter />
      <GlobalStyle />
    </React.Fragment>
  );
}

export default App;
