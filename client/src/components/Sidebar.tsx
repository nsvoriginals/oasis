import React, { useState } from "react";
import { HiOutlineMegaphone } from "react-icons/hi2";
import { VscThreeBars } from "react-icons/vsc";
import { GoLink } from "react-icons/go";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { PiGameController } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import { LuSettings } from "react-icons/lu";
import { IoMicOffSharp, IoVideocamOff, IoPeopleOutline, IoMicOutline, IoVideocamOutline } from "react-icons/io5";
import { LuScreenShare } from "react-icons/lu";
import { MdOutlineFileUpload } from "react-icons/md";

interface SidebarIconProps {
  icon: React.ReactNode;
  text: string;
}

interface BotbarIconProps {
  icon: React.ReactNode;
  text: string;
}

const Sidebar: React.FC = () => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);

  return (
    <div
      className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col
                        bg-gray-900 text-white shadow-lg"
    >
      <SbarIcon icon={<VscThreeBars size="22" />} text="Menu" />
      <SbarIcon icon={<HiOutlineMegaphone size="22" />} text="Notice" />
      <SbarIcon icon={<GoLink size="22" />} text="Links" />
      <SbarIcon icon={<IoChatboxEllipsesOutline size="22" />} text="Chatting" />
      <SbarIcon icon={<PiGameController size="22" />} text="Minigames" />
      <div className="mt-auto">
        <SbarIcon icon={<LuSettings size="22" />} text="Settings" />
        <SbarIcon icon={<FaUserCircle size="22" />} text="My Profile" />
      </div>
      <div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg flex justify-around w-60"
      >
        <button
          onClick={() => setIsMicOn(!isMicOn)}
          className={`flex items-center justify-center hover:bg-purple-800 rounded-xl ${isMicOn ? "text-green-500" : "text-red-600"}`}
        >
          <BotbarIcon
            icon={isMicOn ? <IoMicOutline size="24" /> : <IoMicOffSharp size="24" />}
            text={isMicOn ? "Mic On" : "Mic Off"}
          />
        </button>

        <button
          onClick={() => setIsVideoOn(!isVideoOn)}
          className={`flex items-center justify-center hover:bg-purple-800 rounded-xl ${isVideoOn ? "text-green-500" : "text-red-600"}`}
        >
          <BotbarIcon
            icon={isVideoOn ? <IoVideocamOutline size="24" /> : <IoVideocamOff size="24" />}
            text={isVideoOn ? "Video On" : "Video Off"}
          />
        </button>

        <button className="flex items-center justify-center rounded-xl text-gray-400 hover:bg-purple-800 hover:text-gray-400">
          <BotbarIcon icon={<LuScreenShare size="21" />} text="ScreenShare" />
        </button>
        <Divider />
        <button className="flex items-center justify-center rounded-xl text-gray-400 hover:bg-purple-800 hover:text-gray-400">
          <BotbarIcon icon={<MdOutlineFileUpload size="21" />} text="FileUpload" />
        </button>
      </div>
      <div className="fixed top-4 right-4 bg-gray-800 flex items-center space-x-2 px-4 py-2 rounded-xl">
        <IoPeopleOutline size="20" className="text-gray-400" />

        <button
          className="border-2 border-purple-500 text-purple-500 rounded-md transition-colors duration-300 
                       hover:bg-purple-500 hover:text-white h-8 w-24"
        >
          Invite
        </button>
      </div>
    </div>
  );
};
const Divider: React.FC = () => (
    <div className="botbar-vr" style={{ width: '1px', height: '100%', backgroundColor: 'gray' }} />
  );

const SbarIcon: React.FC<SidebarIconProps> = ({ icon, text }) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-tooltip group-hover:scale-250">{text}</span>
  </div>
);

const BotbarIcon: React.FC<BotbarIconProps> = ({ icon, text }) => (
  <div className="Botbar-icon group">
    {icon}
    <span className="Botbar-tooltip group-hover:scale-250">{text}</span>
  </div>
);

export default Sidebar;