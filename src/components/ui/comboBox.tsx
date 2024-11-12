"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/use-media-query";

type OptionProps = {
  value: string;
  label: string;
};

export function ComboBox({
  options,
  label,
  icon,
}: {
  options: OptionProps[];
  label?: string;
  icon?: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedStatus, setSelectedStatus] =
    React.useState<OptionProps | null>(null);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant='outline' className='w-[150px] justify-start'>
            {selectedStatus ? (
              <>
                {icon} {selectedStatus.label}
              </>
            ) : (
              <>
                {icon} {label ? label : "Select"}
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0' align='start'>
          <StatusList
            setOpen={setOpen}
            setSelectedStatus={setSelectedStatus}
            options={options}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant='outline' className='w-[150px] justify-start'>
          {selectedStatus ? (
            <>
              {icon} {selectedStatus.label}
            </>
          ) : (
            <>
              {icon} {label ? label : "Select"}
            </>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='mt-4 border-t'>
          <StatusList
            setOpen={setOpen}
            setSelectedStatus={setSelectedStatus}
            options={options}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({
  setOpen,
  setSelectedStatus,
  options,
}: {
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: OptionProps | null) => void;
  options: OptionProps[];
}) {
  return (
    <Command>
      <CommandInput placeholder={`Filtering...`} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {options.map((item) => (
            <CommandItem
              key={item.value}
              value={item.value}
              onSelect={(value) => {
                setSelectedStatus(
                  options.find((indvidual) => indvidual.value === value) || null
                );
                setOpen(false);
              }}
            >
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
