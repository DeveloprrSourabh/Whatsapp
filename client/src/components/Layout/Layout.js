import React from "react";
import Header from "./Header";
import toast, { Toaster } from "react-hot-toast";
const Layout = ({ children }) => {
  return (
    <>
      {/* <Header /> */}
      <Toaster />
      {children}
    </>
  );
};

export default Layout;
