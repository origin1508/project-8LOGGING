import React from "react";
import { BsPeopleFill, BsMapFill, BsCalendarDateFill } from "react-icons/bs";

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

      default:
        console.log("Not implemented!");
        return;
    }
  }
  return <React.Fragment>{getIconComponent()}</React.Fragment>;
};

export default CustomIcon;
