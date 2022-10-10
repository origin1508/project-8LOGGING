import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import useModal from "@/hooks/useModal";
import { curUserState, curUserIdState } from "@/recoil/atoms/authState";
import User from "@/components/profile/User";
import Modal from "@/components/modal/Modal";
import UserImageUpdate from "@/components/profile/UserImageUpdate";
import ChannelHistory from "../profile/ChannelHistory";
import BasePageComponent from "@/components/hoc/BasePageComponent";
import { authProfileImageUpdate } from "@/api/authFetcher";
import * as Api from "../../api/api";
import Storage from "@/storage/storage";
import { imageResize } from "@/util/imageResizeUtil";

function Profile() {
  const navigate = useNavigate();
  const params = useParams();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [curUser, setCurUser] = useRecoilState(curUserState);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [image, setImage] = useState<Blob>();
  const [profileImagePreview, setProfileImagePreview] = useState<
    string | ArrayBuffer | null
  >();
  const curUserId = useRecoilValue(curUserIdState);

  const [
    isOpenModal,
    isAccepted,
    handleModalOpenButtonClick,
    handleAcceptButtonClick,
    handleModalCloseButtonClick,
  ] = useModal(false);

  const fetchProfileOwner = async (curUserId: string) => {
    const res = await Api.get("/api/users/userinfo", curUserId);
    const curUserData = res.data.datas;

    setCurUser(curUserData);
    setIsFetchCompleted(true);
  };

  const handleProfileImageUploadChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const compress = await imageResize(file);
      setImage(compress);
      const preview = new FileReader();
      preview.readAsDataURL(file);
      preview.onload = () => {
        setProfileImagePreview(preview.result);
      };
    }
  };

  const handleProfileImageUploadClick = async () => {
    if (image) {
      await authProfileImageUpdate("api/users/profpic", image);
      handleModalCloseButtonClick();
      setIsEditing(false);
      navigate("/profile", { replace: true });
    }
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
      <User
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onModalOpenButtonClickEvent={handleModalOpenButtonClick}
      />
      <ChannelHistory />
      <Modal
        isOpenModal={isOpenModal}
        isAlertModal={true}
        onModalCancelButtonClickEvent={handleModalCloseButtonClick}
      >
        <UserImageUpdate
          profileImagePreview={profileImagePreview}
          onChannelImageUploadClickEvent={handleProfileImageUploadChange}
          onProfileImageUploadClickEvent={handleProfileImageUploadClick}
        />
      </Modal>
    </BasePageComponent>
  );
}

export default Profile;
