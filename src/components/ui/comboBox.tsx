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

export type OptionProps = {
  value: string;
  label: string;
};

export function ComboBox({
  options,
  label,
  icon,
  onChange,
  value,
}: {
  options: OptionProps[];
  label?: string;
  icon?: React.ReactNode;
  onChange: (value: OptionProps | undefined) => void;
  value: OptionProps;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant='outline' className='w-full justify-start'>
            {value?.value?.length ? (
              <>
                {icon} {value.label}
              </>
            ) : (
              <span className='text-muted-foreground flex items-center gap-2'>
                {icon} {label ? label : "Select"}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0' align='start'>
          <StatusList setOpen={setOpen} onChange={onChange} options={options} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant='outline' className='w-full justify-start'>
          {value?.value?.length ? (
            <>
              {icon} {value.label}
            </>
          ) : (
            <span className='text-muted-foreground flex items-center gap-2'>
              {icon} {label ? label : "Select"}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='mt-4 border-t'>
          <StatusList setOpen={setOpen} onChange={onChange} options={options} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({
  setOpen,
  onChange,
  options,
}: {
  setOpen: (open: boolean) => void;
  onChange: (status: OptionProps | undefined) => void;
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
                onChange(
                  options.find((indvidual) => indvidual.value === value)
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
