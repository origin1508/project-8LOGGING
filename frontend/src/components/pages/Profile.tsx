import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import { isLoginState, curUserState } from "@/recoil/atoms/authState";
import User from "../profile/User";
import ChannelHistory from "../profile/ChannelHistory";
import BasePageComponent from "@/components/hoc/BasePageComponent";
import * as Api from "@/api/authFetcher";
function Profile() {
  const navigate = useNavigate();
  const params = useParams();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const isLogin = useRecoilValue(isLoginState);
  const [curUser, setCurUser] = useRecoilState(curUserState);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchPorfolioOwner = async (curUserId: any) => {
    const res = await Api.get("api/users", curUserId);
    const curUserData = res.data.data;
    setCurUser(curUserData);
    setIsFetchCompleted(true);
  };
  useEffect(() => {
    if (!isLogin) {
      navigate("/login", { replace: true });
      return;
    }
    if (params.userId) {
      const curUserID = params.userId;
      fetchPorfolioOwner(curUserID);
    } else {
      const curUserID = curUser?._id;
      fetchPorfolioOwner(curUserID);
    }
  }, [params, navigate]);
  return (
    <BasePageComponent>
      <User isEditing={isEditing} setIsEditing={setIsEditing} />
      <ChannelHistory />
    </BasePageComponent>
  );
}

export default Profile;
