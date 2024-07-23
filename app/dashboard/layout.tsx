import React from "react";
import SideNav from '@/app/ui/dashboard/sidenav';

// @ts-ignore
export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden justify-center ">
      <div className="w-full max-w-7xl flex flex-col md:flex-row">
        <div className="w-full md:w-64 flex-none">
          <SideNav/>
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      </div>
    </div>
  );
}