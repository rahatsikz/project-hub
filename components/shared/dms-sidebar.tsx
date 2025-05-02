"use client";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
// import InfoIcon from "@/components/Svgs/InfoIcon";
// import undoIcon from "@/assets/images/backarrow.png";
// import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Building2 } from "lucide-react";

export default function DMSSidebar() {
  const pathname = usePathname();

  const [active, setActive] = useState(pathname);
  const { open, isMobile, setOpenMobile } = useSidebar();

  return (
    <>
      <Sidebar
        className={cn(
          "bg-background",
          isMobile && "rounded-none rounded-e-2xl"
        )}
        collapsible='icon'
        variant='sidebar'
      >
        {open ? <SidebarHeaderPart /> : null}

        <SidebarContent className={cn(open ? "" : "mt-[19px]")}>
          <SidebarGroupContent className='overflow-y-hidden'>
            <ScrollArea className='h-full'>
              <SidebarMenu className={cn(open && "px-3")}>
                {[
                  {
                    title: "Companies",
                    url: "/workspace/company",
                    icon: () => <Building2 />,
                  },
                ].map((item) => (
                  <SidebarMenuItem
                    className='flex items-center justify-center'
                    key={item.title}
                  >
                    <SidebarMenuButton
                      className={cn("hover:text-[#32BA55]")}
                      asChild
                      onMouseEnter={() => {
                        setActive(item.url);
                      }}
                      onMouseLeave={() => setActive(pathname)}
                      isActive={pathname === item.url}
                      onClick={() => isMobile && setOpenMobile(false)}
                    >
                      <Link
                        href={item.url}
                        className={cn(
                          active === item.url
                            ? "bg-muted-foreground/10 text-[#32BA55]"
                            : "",
                          "mx-0 w-full py-5 px-3"
                        )}
                      >
                        <item.icon
                        //   active={
                        //     active === item.url || pathname === item.url
                        //       ? "true"
                        //       : "false"
                        //   }
                        />
                        <span
                          className={cn(
                            "font-medium pl-1",
                            item.url === pathname && "text-[#32BA55]"
                          )}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarContent>
        <SidebarFooter className='mb-3 px-0'>
          <Separator />
          <SidebarMenu className='gap-0 px-2'>
            {[
              {
                title: "Settings",
                url: "/settings",
                icon: () => <></>,
              },
            ].map((item) => (
              <SidebarMenuItem
                className='flex items-center justify-center'
                key={item.title}
              >
                <SidebarMenuButton
                  className={cn("hover:text-[#32BA55]")}
                  asChild
                  onMouseEnter={() => {
                    setActive(item.url ?? "");
                  }}
                  onMouseLeave={() => setActive(pathname)}
                  isActive={pathname === item.url}
                >
                  <Link
                    href={item.url ?? ""}
                    className={cn(
                      active === item.url
                        ? "bg-muted-foreground/10 text-[#32BA55]"
                        : "",
                      "mx-0 w-full py-5"
                    )}
                  >
                    <item.icon
                    //   active={
                    //     active === item.url || pathname === item.url
                    //       ? "true"
                    //       : "false"
                    //   }
                    />
                    <span
                      className={cn(
                        "font-medium",
                        item.url === pathname && "text-[#32BA55]"
                      )}
                    >
                      {item.title}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}

const SidebarHeaderPart = () => {
  return (
    <SidebarHeader className={cn("mb-0.5 mt-2.5 px-0")}>
      <SidebarMenu className='gap-3.5'>
        <SidebarMenuItem className='px-3'>
          <div className='flex items-center gap-2 py-[5px]'>
            <div className='mt-0.5 self-start rounded-sm bg-[#F23553] px-1.5 py-1 text-[8px] font-bold text-white'>
              PATRON
            </div>
          </div>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Separator className='my-2' />
          <SidebarMenuButton
            asChild
            size={"sm"}
            className='hover:bg-transparent my-[9.5px]'
          >
            <Link href={"/"} className=' flex gap-1 pl-6 '>
              {/* <Image
                src={undoIcon.src}
                alt='go back'
                width={20}
                height={20}
                className='size-5'
              /> */}
              <h3 className='text-sm font-medium text-foreground/80'>
                Back to Home
              </h3>
            </Link>
          </SidebarMenuButton>
          <Separator className='mt-2' />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};
