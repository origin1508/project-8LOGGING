import React from "react";
import {
  BsPeopleFill,
  BsMapFill,
  BsCalendarDateFill,
  BsSearch,
} from "react-icons/bs";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import { FaUserFriends } from "react-icons/fa";
interface CustomIconProps {
  name: string;
  size: string;
  color: string;
}

const CustomIcon = ({ name, size, color }: CustomIconProps) => {
  function getIconComponent() {
    switch (name) {
      case "people":
        return <BsPeopleFill size={size} color={color} />;

      case "map":
        return <BsMapFill size={size} color={color} />;

      case "date":
        return <BsCalendarDateFill size={size} color={color} />;

      case "toggleDown":
        return <VscTriangleDown size={size} color={color}></VscTriangleDown>;

      case "toggleUp":
        return <VscTriangleUp size={size} color={color}></VscTriangleUp>;

      case "SeachIcon":
        return <BsSearch size={size} color={color}></BsSearch>;

      case "following":
        return <FaUserFriends size={size} color={color}></FaUserFriends>;
      default:
        console.log("Not implemented!");
        return;
    }
  }
  return <React.Fragment>{getIconComponent()}</React.Fragment>;
};

export default CustomIcon;
