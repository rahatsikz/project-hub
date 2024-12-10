import React from "react";

export default function ProjectBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='font-sans h-screen grid grid-cols-12 bg-secondary'>
      <div className='col-span-2 hidden lg:block'>
        <div className='px-6 py-16'>Sidebar</div>
      </div>
      <div className='px-8 py-6 col-span-12 lg:col-span-10 mx-4 mb-6 mt-12 rounded-xl bg-background h-[calc(100vh-72px)] overflow-y-auto'>
        {children}
      </div>
    </div>
  );
}
