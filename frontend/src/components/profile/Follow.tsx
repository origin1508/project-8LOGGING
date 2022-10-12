import React, { useState, useEffect } from "react";
import { curUserState } from "@/recoil/atoms/authState";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import * as Api from "@/api/api";

export default function Follow() {
  const curUser = useRecoilValue(curUserState);
  const [followed, setFollowed] = useState(false);
  const curUserId = curUser._id;
  const handleFollowClick = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!followed) {
        await Api.post("/api/follow", { targetId: curUser._id });
        console.log("팔로우");
        setFollowed(true);
      } else {
        await Api.del("/api/follow", { targetId: curUser._id });
        console.log("팔로우취소");
        setFollowed(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (curUserId) {
      Api.get("/api/follow", curUserId).then((res) =>
        setFollowed(res.data.datas)
      );
    }
  });
  return (
    <FollowButton onClick={handleFollowClick} itemScope={followed}>
      Follow
    </FollowButton>
  );
}
const FollowButton = styled.button`
  ${GlobalTheme.buttons}
  background-color:${(props) =>
    props.itemScope ? GlobalTheme.colors.theme : "none"};
  color: ${(props) =>
    props.itemScope ? GlobalTheme.colors.white : GlobalTheme.colors.theme};
  border: 1px solid ${GlobalTheme.colors.theme};
  transition: all 0.3s;
  width: 50%;
  font-size: 1.5rem;
  padding: 1rem 2rem;
  cursor: pointer;
`;
