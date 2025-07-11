import React, { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface PageWrapperProps {
  children: ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => (
  <div className="flex min-h-screen bg-gray-100">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Header />
      <main className="flex-1 p-6 overflow-y-auto bg-gray-50">{children}</main>
    </div>
  </div>
);

export default PageWrapper;
