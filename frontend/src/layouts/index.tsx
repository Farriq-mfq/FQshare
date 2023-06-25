import React from "react";
import Header from "../components/Header";

interface ILayout {
  children: React.ReactNode;
}
const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <>
      {/* <Header /> */}
      {children}
    </>
  );
};

export default Layout;
