import React from "react";

export default function ProjectBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='font-sans h-screen grid grid-cols-12 bg-primary-foreground '>
      <div className='col-span-2'>
        <div className='px-6 py-16'>Sidebar</div>
      </div>
      <div className='px-8 py-6 col-span-10 bg-secondary mx-4 mb-6 mt-12 rounded-xl'>
        {children}
      </div>
    </div>
  );
}
