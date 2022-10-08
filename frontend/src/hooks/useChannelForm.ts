import React, { useState } from "react";
import { ChannelFormInitialType } from "@/types/channel/channelTypes";

const useChannelForm = (initialValue: ChannelFormInitialType) => {
  const [channelForm, setChannelForm] = useState(initialValue);

  const handleChannelFormValueChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    if (name === "memberNum" && parseInt(value) < 1) return;
    setChannelForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return { channelForm, handleChannelFormValueChange };
};

export default useChannelForm;
