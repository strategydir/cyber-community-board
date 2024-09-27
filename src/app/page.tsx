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
import { Flex, Layout } from "antd";
import CardComponent from "./components/CardComponent";
import ButtonComponent from "./components/ButtonComponent";
import animation from "../public/Loading.json";
import dynamic from "next/dynamic";
// Dynamically import Lottie and disable SSR
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const { Content, Footer } = Layout;

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const folders = useSelector((state: RootState) => state.folders.data);
  const loading = useSelector((state: RootState) => state.folders.loading);

  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    dispatch(fetchItems());

    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [dispatch]);

  if (showAnimation || loading)
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
          {folders.map((folder, folderIndex) => (
            <CardComponent
              className="w-[300px] xl:w-[500px] min-h-[520px] max-h-[530px] flex flex-col"
              key={folderIndex}
              title={folder.category}
            >
              <div className="flex-1 overflow-y-auto">
                {folder.data.map((item, itemIndex) => (
                  <ButtonComponent key={itemIndex} title={item.title} />
                ))}
              </div>
            </CardComponent>
          ))}
        </Flex>
      </Content>
      <Footer className="bg-transparent text-xs xl:text-base text-cornflowerBlue text-center">
        หากมีข้อสงสัย: โปรดติดต่อแอดมิน E-MAIL strategydir.dev@gmail.com โทร. 02
        590 3175
      </Footer>
    </Layout>
  );
}
