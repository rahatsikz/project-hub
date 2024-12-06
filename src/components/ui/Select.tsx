"use client";

import * as React from "react";

import {
  Command,
  CommandGroup,
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

type PopoverAlignment = "start" | "center" | "end";

export interface ComboBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  options: OptionProps[];
  label?: string;
  icon?: React.ReactNode;
  name: string;
  formControl: any;
  boxAlignment?: PopoverAlignment;
  labelPosition?: "top" | "center" | "bottom";
}

export const Select = React.forwardRef<HTMLDivElement, ComboBoxProps>(
  (
    {
      options,
      label,
      icon,
      name,
      formControl,
      boxAlignment = "start",
      labelPosition = "top",
      ...props
    },
    ref
  ) => {
    return (
      <FormField
        control={formControl}
        name={name}
        render={({ field }) => (
          <FormItem>
            {label && labelPosition === "top" ? (
              <FormLabel>{label}</FormLabel>
            ) : null}
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    title={name.slice(0, 1).toUpperCase() + name.slice(1)}
                    variant='outline'
                    className={cn(
                      "justify-start shadow-none hover:bg-background hover:border-muted-foreground bg-transparent font-normal text-muted-foreground",
                      "data-[state=open]:ring-2 data-[state=open]:ring-primary data-[state=open]:bg-muted data-[state=open]:text-foreground",
                      props.className
                    )}
                    style={props.style}
                  >
                    <span className={cn(" flex items-center gap-2 ")}>
                      <span className='flex items-center gap-1'>
                        {icon} {labelPosition === "center" ? label : ""} :
                      </span>
                      <span>
                        {
                          options.find((item) => item.value === field.value)
                            ?.label
                        }
                      </span>
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className='w-[200px] p-0'
                  align={boxAlignment}
                  ref={ref}
                >
                  <OptionList
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption)
                    }
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
);

Select.displayName = "Select";

function OptionList({
  onChange,
  options,
}: {
  onChange: (selectedOption: string | undefined) => void;
  options: OptionProps[];
}) {
  return (
    <Command>
      <CommandList>
        <CommandGroup>
          {options.map((item) => (
            <PopoverClose
              key={item.value}
              className='flex flex-col gap-4 w-full'
            >
              <CommandItem
                className='w-full cursor-pointer'
                value={item.value}
                onSelect={(value) => {
                  onChange(
                    options.find((indvidual) => indvidual.value === value)
                      ?.value
                  );
                  console.log(value);
                }}
              >
                <span className='text-muted-foreground mr-0.5'>
                  {item.icon}
                </span>{" "}
                {item.label}
              </CommandItem>
            </PopoverClose>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
