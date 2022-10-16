import React, { useMemo } from "react";
import {
  TitleContainer,
  AboutTitle,
  TitleHighlight,
  AboutTitleContent,
  TextOne,
  TextTwo,
} from "@/styles/commonAboutStyle";
import { createAboutFourthContent } from "@/static/aboutPloggingData";

const AboutFourthContent = () => {
  const content = useMemo(() => createAboutFourthContent(), []);

  return (
    <TitleContainer itemProp="center">
      <AboutTitleContent>
        <AboutTitle>
          Let’s go<TitleHighlight> 8logging!</TitleHighlight>
        </AboutTitle>
        <TextOne>{content[0]}</TextOne>
        <TextTwo itemProp="center">
          {content[1]}
          <br />
          {content[2]}
          <br />
          {content[3]}
        </TextTwo>
      </AboutTitleContent>
    </TitleContainer>
  );
};

export default AboutFourthContent;
