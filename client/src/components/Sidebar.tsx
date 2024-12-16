import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useDispatch } from "react-redux";
import { setShowChat, setFocused } from "../stores/ChatStore";
import { getAvatarString, getColorByString } from "../util";
import CloseIcon from "@mui/icons-material/Close";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Avatar from "@mui/material/Avatar";
import { useAppSelector } from "../hooks";
import GamepadIcon from "@mui/icons-material/Gamepad";

// Styled components for the sidebar
const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 50px;
  height: 100%;
  background: linear-gradient(180deg, #8c51fe, rgb(83, 35, 179));
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
  font-family: "Heming";
`;

const SidebarButton = styled(IconButton)`
  color: #fff;
  margin: 10px 0;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Wrapper = styled.div`
  position: absolute;
  font-size: 16px;
  color: #eee;
  background: linear-gradient(180deg, #8c51fe, rgb(83, 35, 179));
  box-shadow: 0px 0px 5px #0000006f;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  left: 125%;
  bottom: 3%;
  flex-direction: column;
  align-items: flex-start;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;

  .close {
    position: absolute;
    top: 15px;
    right: 15px;
  }

  .tip {
    margin-left: 12px;
    fontsize: 26px;
  }
`;

const RoomName = styled.div`
  margin: 10px 20px;
  max-width: 460px;
  max-height: 150px;
  overflow-wrap: anywhere;
  overflow-y: auto;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;

  h3 {
    font-size: 24px;
    color: #fffff;
  }
`;

const RoomDescription = styled.div`
  margin: 0 20px;
  max-width: 460px;
  max-height: 150px;
  overflow-wrap: anywhere;
  overflow-y: auto;
  font-size: 16px;
  color: #fffff;
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
`;

const Sidebar = () => {
  const dispatch = useDispatch();

  //JUST TRYING TO HOT RELOAD THE PAGE
  const handleLinkClick = () => {
    window.location.reload();
  };

  const [showRoomInfo, setShowRoomInfo] = useState(false);
  const roomId = useAppSelector((state) => state.room.roomId);
  const roomName = useAppSelector((state) => state.room.roomName);
  const roomDescription = useAppSelector((state) => state.room.roomDescription);

  return (
    <SidebarContainer>
      <Tooltip title="Home" placement="right">
        <Link
          to="/docs"
          style={{ textDecoration: "none" }}
          onClick={handleLinkClick}
        >
          <SidebarButton>
            <HomeIcon />
          </SidebarButton>
        </Link>
      </Tooltip>

      <Tooltip title="Chat" placement="right">
        <SidebarButton
          onClick={() => {
            dispatch(setShowChat(true));
            dispatch(setFocused(true));
          }}
        >
          <ChatBubbleOutlineIcon />
        </SidebarButton>
      </Tooltip>

      <Tooltip title="MiniGames" placement="right">
        <SidebarButton>
          <GamepadIcon />
        </SidebarButton>
      </Tooltip>

      <Tooltip title="Info" placement="right">
        <SidebarButton
          style={{ marginTop: "auto" }}
          onClick={() => setShowRoomInfo((prev) => !prev)}
        >
          <InfoIcon />
        </SidebarButton>
      </Tooltip>

      {showRoomInfo && (
        <Wrapper>
          <IconButton
            className="close"
            onClick={() => setShowRoomInfo(false)}
            size="small"
          >
            <CloseIcon />
          </IconButton>
          <RoomName>
            <Avatar style={{ background: getColorByString(roomName) }}>
              {getAvatarString(roomName)}
            </Avatar>
            <h3>{roomName}</h3>
          </RoomName>
          <RoomDescription>
            <ArrowRightIcon /> ID: {roomId}
          </RoomDescription>
          <RoomDescription>
            <ArrowRightIcon /> Description: {roomDescription}
          </RoomDescription>
        </Wrapper>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
