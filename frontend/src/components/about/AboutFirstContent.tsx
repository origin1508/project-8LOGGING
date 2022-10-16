import React, { useMemo } from "react";
import {
  TitleContainer,
  AboutTitle,
  AboutTitleContent,
  TitleHighlight,
  AboutImage,
  TextOne,
  TextTwo,
} from "@/styles/commonAboutStyle";
import { createAboutFirstConteent } from "@/static/aboutPloggingData";

const AboutFirstContent = () => {
  const content = useMemo(() => createAboutFirstConteent(), []);

  return (
    <React.Fragment>
      <TitleContainer itemProp="start">
        <AboutTitle>
          What is “<TitleHighlight>Plogging</TitleHighlight>”?
        </AboutTitle>
        <AboutTitleContent>
          <TextOne>
            {content[0]}
            <br />
            {content[1]}
          </TextOne>
          <TextTwo itemProp="left">
            {content[2]}
            <br />
            {content[3]}
          </TextTwo>
        </AboutTitleContent>
      </TitleContainer>
      <AboutImage src="/images/plogging-about-1.png" />
    </React.Fragment>
  );
};

export default AboutFirstContent;
