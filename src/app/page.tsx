"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchItems,
  // addItem,
  // editItem,
  // removeItem,
} from "./slices/foldersSlice";
import { AppDispatch, RootState } from "./stores/store";
import { Flex, Layout, FloatButton, notification } from "antd";
import CardComponent from "./components/CardComponent";
import animation from "../public/Loading.json";
import dynamic from "next/dynamic";
import LinkButtonComponent from "./components/LinkButtonComponent";
import { AiOutlinePlus, AiOutlineUser } from "react-icons/ai";
import { NotificationPlacement } from "antd/es/notification/interface";
import AdminModal from "./components/modals/adminModal";
import InsertModal from "./components/modals/insertModal";
// Dynamically import Lottie and disable SSR
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
const { Content, Footer } = Layout;
type NotificationType = "success" | "info" | "warning" | "error";
interface INotification {
  placement?: NotificationPlacement;
  message: string;
  description: string;
  type: NotificationType;
}

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const folders = useSelector((state: RootState) => state.folders);
  const admin = useSelector((state: RootState) => state.admin);

  const [api, contextHolder] = notification.useNotification();
  const [showAnimation, setShowAnimation] = useState(true);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);

  useEffect(() => {
    const didMounted = async () => {
      await dispatch(fetchItems());

      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 1500);

      return () => clearTimeout(timer);
    };
    didMounted();
  }, [dispatch]);

  const openNotification = ({
    placement = "bottomLeft",
    message,
    description,
    type,
  }: INotification) => {
    api[type]({
      message: message,
      description: description,
      placement,
      duration: 2,
    });
  };

  const showAdminModal = () => {
    setIsAdminModalOpen(true);
  };

  const showDocModal = () => {
    setIsDocModalOpen(true);
  };

  const handleAdminOk = (match: boolean) => {
    setIsAdminModalOpen(false);
    let notiMessage: INotification;
    if (match) {
      notiMessage = {
        message: "การเข้าสู่ระบบ admin สำเร็จ",
        description: "เปิดใช้งานการแก้ไขของแอดมิน",
        type: "success",
      };
    } else {
      notiMessage = {
        message: "การเข้าสู่ระบบ admin ล้มเหลว",
        description: "คุณคือ admin ตัวปลอม!",
        type: "error",
      };
    }
    openNotification(notiMessage);
  };

  const handleDocOk = (match: boolean) => {
    let notiMessage: INotification;
    if (match) {
      notiMessage = {
        message: "เพิ่มข้อมูลสำเร็จ",
        description: "การเพิ่มข้อมูลสำเร็จแล้ว",
        type: "success",
      };
      setIsDocModalOpen(false);
    } else {
      notiMessage = {
        message: "เพิ่มข้อมูลล้มเหลว",
        description: "การเพิ่มข้อมูลล้มเหลว",
        type: "error",
      };
    }
    openNotification(notiMessage);
  };

  const handleAdminCancel = () => {
    setIsAdminModalOpen(false);
  };

  const handleDocCancel = () => {
    setIsDocModalOpen(false);
  };

  if (showAnimation)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Lottie
          animationData={animation}
          style={{ height: "300px", width: "300px" }}
        />
      </div>
    );

  return (
    <Layout className="bg-transparent min-h-screen px-6 pt-6 xl:px-24">
      {contextHolder}
      <Content className="bg-transparent w-full content-center self-center">
        <h1 className="text-3xl xl:text-5xl font-bold text-darkCornflowerBlue text-center">
          Cyber Community Board
        </h1>
        <Flex
          gap={"middle"}
          wrap
          justify="center"
          className="bg-transparent py-6"
        >
          {folders.data.map((folder, folderIndex) => (
            <CardComponent
              className="w-[300px] xl:w-[500px] min-h-[520px] max-h-[530px] flex flex-col"
              key={folderIndex}
              title={folder.category}
            >
              <div className="flex-1 overflow-y-auto">
                {folder.data.map((item, itemIndex) => (
                  <LinkButtonComponent
                    key={itemIndex}
                    title={item.title}
                    link={item.link}
                  />
                ))}
              </div>
            </CardComponent>
          ))}
        </Flex>
        <FloatButton
          icon={admin.adminMode ? <AiOutlinePlus /> : <AiOutlineUser />}
          onClick={admin.adminMode ? showDocModal : showAdminModal}
        />
        <AdminModal
          IsModalOpen={isAdminModalOpen}
          handleOnCancel={handleAdminCancel}
          handleOnOk={handleAdminOk}
        />
        <InsertModal
          IsModalOpen={isDocModalOpen}
          handleOnCancel={handleDocCancel}
          handleOnOk={handleDocOk}
        />
      </Content>
      <Footer className="bg-transparent text-xs xl:text-base text-cornflowerBlue text-center">
        หากมีข้อสงสัย: โปรดติดต่อแอดมิน E-MAIL strategydir.dev@gmail.com โทร. 02
        590 3175
      </Footer>
    </Layout>
  );
}
