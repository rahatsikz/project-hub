"use client";

import * as React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { PopoverClose } from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export type OptionProps = {
  value: string;
  label: string;
  icon?: React.ReactNode;
};

export function ComboBox({
  options,
  label,
  icon,
  name,
  formControl,
  ...props
}: {
  options: OptionProps[];
  label?: string;
  icon?: React.ReactNode;
  name: string;
  formControl: any;
  onChange?: (option: OptionProps | undefined) => void;
} & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label ? <FormLabel>{label}</FormLabel> : null}
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className={cn(
                    "w-full justify-start border-0 shadow-none hover:ring-2 hover:ring-primary hover:bg-background",
                    props.className
                  )}
                  style={props.style}
                >
                  {field.value?.label ? (
                    <div className='flex items-center gap-2 '>
                      {field.value?.icon}
                      <span className='truncate'>{field.value?.label}</span>
                    </div>
                  ) : (
                    <span className='text-muted-foreground'>{icon}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-[200px] p-0' align='start'>
                <OptionList
                  onChange={(selectedOption) => field.onChange(selectedOption)}
                  options={options}
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function OptionList({
  onChange,
  options,
}: {
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
            <PopoverClose
              key={item.value}
              className='flex flex-col gap-4 w-full'
            >
              <CommandItem
                className='w-full'
                value={item.value}
                onSelect={(value) => {
                  onChange(
                    options.find((indvidual) => indvidual.value === value)
                  );
                  console.log(value);
                }}
              >
                {item.icon} {item.label}
              </CommandItem>
            </PopoverClose>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
