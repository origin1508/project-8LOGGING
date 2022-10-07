import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import { curUserState, curUserIdState } from "@/recoil/atoms/authState";
import User from "../profile/User";
import ChannelHistory from "../profile/ChannelHistory";
import BasePageComponent from "@/components/hoc/BasePageComponent";
import * as Api from "@/api/authFetcher";
import Storage from "@/storage/storage";
function Profile() {
  const navigate = useNavigate();
  const params = useParams();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [curUser, setCurUser] = useRecoilState(curUserState);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const curUserId = useRecoilValue(curUserIdState);
  console.log(curUserId);
  const fetchProfileOwner = async (curUserId: any) => {
    const res = await Api.get("api/users/userinfo", curUserId);
    const curUserData = res.data;
    console.log("res", res);
    setCurUser(curUserData);
    setIsFetchCompleted(true);
  };
  useEffect(() => {
    if (!Storage.getToken()) {
      navigate("/auth", { replace: true });
      return;
    }
    if (params.userId) {
      const userId = params.userId;
      fetchProfileOwner(userId);
    } else {
      const userId = curUserId?.userId;
      fetchProfileOwner(userId);
    }

    console.log("curUser", curUser);
    console.log("storage", Storage.getToken());
  }, [params, navigate]);
  return (
    <BasePageComponent>
      <User isEditing={isEditing} setIsEditing={setIsEditing} />
      <ChannelHistory />
    </BasePageComponent>
  );
}

export default Profile;
