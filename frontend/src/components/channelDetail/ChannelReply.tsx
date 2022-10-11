import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";

const ChannelReply = () => {
  return (
    <ChannelReplyContainer>
      <ReplyList></ReplyList>
      <ReplyInput placeholder="댓글 달기"></ReplyInput>
      <ReplyButton>Post</ReplyButton>
    </ChannelReplyContainer>
  );
};

const ChannelReplyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5rem;
  position: relative;
`;
const ReplyList = styled.div`
  width: 105rem;
  height: 25rem;
  box-shadow: 1px 1px 3px ${GlobalTheme.colors.gray};
`;

const ReplyInput = styled.input`
  position: absolute;
  bottom: 0rem;
  width: 105rem;
  height: 4rem;
`;

const ReplyButton = styled.button`
  position: absolute;
  bottom: 1.5rem;
  right: 5rem;
`;

export default ChannelReply;
