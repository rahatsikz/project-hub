import React from "react";
import ViewTabs from "./_components/view-tabs";

export default function ProjectBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='space-y-4'>
      <ViewTabs />
      <section className='px-8'>{children}</section>
    </div>
  );
}
