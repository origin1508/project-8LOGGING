import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import { curUserState, curUserIdState } from "@/recoil/atoms/authState";
import User from "../profile/User";
import ChannelHistory from "../profile/ChannelHistory";
import BasePageComponent from "@/components/hoc/BasePageComponent";
import * as Api from "../../api/api";
import Storage from "@/storage/storage";

function Profile() {
  const navigate = useNavigate();
  const params = useParams();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [curUser, setCurUser] = useRecoilState(curUserState);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const curUserId = useRecoilValue(curUserIdState);

  const fetchProfileOwner = async (curUserId: string) => {
    const res = await Api.get("/api/users/userinfo", curUserId);
    const curUserData = res.data.datas;

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
      const userId = curUserId;
      fetchProfileOwner(userId);
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
