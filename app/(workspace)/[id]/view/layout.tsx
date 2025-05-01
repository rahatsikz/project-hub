import React from "react";
import ViewTabs from "./_components/view-tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProjectBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='font-sans h-screen grid grid-cols-12 bg-secondary/50'>
      <div className='col-span-2 hidden lg:block'>
        <div className='px-6 py-16'>Sidebar</div>
      </div>
      <div className=' col-span-12 lg:col-span-10 mx-4 mb-6 mt-12 rounded-xl bg-background  '>
        <ViewTabs />
        <ScrollArea className='px-8 py-6 h-[calc(100vh-140px)]'>
          {children}
        </ScrollArea>
      </div>
    </div>
  );
}
