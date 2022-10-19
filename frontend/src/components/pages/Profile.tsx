import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import useModal from "@/hooks/useModal";
import { curUserState, loginUserIdState } from "@/recoil/atoms/authState";
import User from "@/components/profile/User";
import Modal from "@/components/modal/Modal";
import DeleteAccountModal from "@/components/modal/Modal";
import UserImageUpdate from "@/components/profile/UserImageUpdate";
import UserDeleteAccount from "@/components/profile/UserDeleteAccount";
import ChannelHistory from "../profile/ChannelHistory";
import BasePageComponent from "@/components/hoc/BasePageComponent";
import {
  authProfileImageUpdate,
  deleteAccountRequest,
} from "@/api/authFetcher";
import { getAuthInformationById } from "@/api/authFetcher";
import Storage from "@/storage/storage";
import { imageResize } from "@/util/imageResizeUtil";

function Profile() {
  const navigate = useNavigate();
  const params = useParams();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [confirmCheck, setConfirmCheck] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [curUser, setCurUser] = useRecoilState(curUserState);
  const [image, setImage] = useState<Blob>();
  const [profileImagePreview, setProfileImagePreview] = useState<
    string | ArrayBuffer | null
  >();
  const loginUserId = useRecoilValue(loginUserIdState);

  const [
    isOpenModal,
    ,
    handleModalOpenButtonClick,
    ,
    handleModalCloseButtonClick,
  ] = useModal(false);

  const [
    isOpenDeleteAccountlModal,
    ,
    handleDeleteAccountModalOpenButtonClick,
    handleAcceptDeleteClick,
    handleDeleteAccountModalCloseButtonClick,
  ] = useModal(false);

  const fetchProfileOwner = async (curUserId: string) => {
    const res = await getAuthInformationById("/api/users/userinfo", curUserId);
    setCurUser(res);
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

  const handleDeleteAccountAcceptClick = async () => {
    if (curUser.email === confirmCheck) {
      await deleteAccountRequest("/api/auth/withdrawal");
      handleAcceptDeleteClick();
      Storage.clearToken();
      navigate("/", { replace: true });
    } else setConfirmMessage("올바른 이메일을 입력해주세요.");
    setConfirmCheck("");
  };

  const handleDeleteAccountCancelClick = () => {
    setConfirmMessage("");
    setConfirmCheck("");
    handleDeleteAccountModalCloseButtonClick();
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
      const userId = loginUserId;
      fetchProfileOwner(userId);
    }
  }, [params, navigate]);

  return (
    <BasePageComponent>
      <User
        isEditable={curUser._id === loginUserId}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onDeleteAccountModalOpenClickEvent={
          handleDeleteAccountModalOpenButtonClick
        }
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
      <DeleteAccountModal
        isOpenModal={isOpenDeleteAccountlModal}
        onModalAcceptButtonClickEvent={handleDeleteAccountAcceptClick}
        onModalCancelButtonClickEvent={handleDeleteAccountCancelClick}
      >
        <UserDeleteAccount
          confirmCheck={confirmCheck}
          setConfirmCheck={setConfirmCheck}
          confirmMessage={confirmMessage}
        ></UserDeleteAccount>
      </DeleteAccountModal>
    </BasePageComponent>
  );
}

export default Profile;
