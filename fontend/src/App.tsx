import React from "react";
import styled from "styled-components";
import GlobalStyle from "@/styles/globalStyle";
import GlobalTheme from "@/styles/theme";
import Main from "@/pages/Main";
function App() {
  return (
    <React.Fragment>
      <Main />

      <GlobalStyle />
    </React.Fragment>
  );
}
// const CustomDiv = styled.div`
//   font-family: ${GlobalTheme.fontStyle.regular};
//   font-size: ${GlobalTheme.fontSize.moreBig};
// `;

// const CustomDiv2 = styled.div`
//   font-family: ${GlobalTheme.fontStyle.bold};
// `;

export default App;
