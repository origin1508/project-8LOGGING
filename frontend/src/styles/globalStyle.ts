import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import EliceDigitalBaeumOTF_Bold from "@/styles/fonts/EliceDigitalBaeumOTF_Bold.otf";
import EliceDigitalBaeumOTF_Regular from "@/styles/fonts/EliceDigitalBaeumOTF_Regular.otf";

const GlobalStyle = createGlobalStyle`
    ${normalize}
    @font-face {
        font-family: "eRegular";
        src: local("EliceDigitalBaeumOTF_Regular"), url(${EliceDigitalBaeumOTF_Regular}) format('opentype'); 
    }
    @font-face {
        font-family: "eBold";
        src: local("EliceDigitalBaeumOTF_Bold"), url(${EliceDigitalBaeumOTF_Bold}) format('opentype'); 
    }
    * { 
        margin: 0; 
        padding: 0; 
    } 
    html,
    body, 
    #root, 
    .App {
        font-family: "eRegular"; 
        width: 100%; 
        height: 100%; 
        box-sizing:border-box; 
        font-size: 62.5%; 
    }
    body{
        background-image: url("mainBg.png");
        background-size:cover;
        background-repeat: no-repeat;
    }
`;

export default GlobalStyle;
