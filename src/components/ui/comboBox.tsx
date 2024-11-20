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

export type OptionProps = {
  value: string;
  label: string;
};

export function ComboBox({
  options,
  label,
  icon,
  name,
  formControl,
}: {
  options: OptionProps[];
  label?: string;
  icon?: React.ReactNode;
  name: string;
  formControl: any;
  onChange?: (option: OptionProps | undefined) => void;
}) {
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
                <Button variant='outline' className='w-full justify-start'>
                  {field.value?.label ? (
                    <>
                      {icon} {field.value?.label}
                    </>
                  ) : (
                    <span className='text-muted-foreground flex items-center gap-2'>
                      {icon} {label ? label : "Select"}
                    </span>
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
                {item.label}
              </CommandItem>
            </PopoverClose>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
