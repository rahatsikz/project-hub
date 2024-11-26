"use client";

import * as React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
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
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Separator } from "./separator";
import { PopoverClose } from "@radix-ui/react-popover";

export type OptionProps = {
  value: string;
  label: string;
  acronym?: string;
  id: number;
};

export interface MultiSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  options: OptionProps[];
  label?: string;
  icon?: React.ReactNode;
  name: string;
  formControl: any;
}

export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  ({ options, label, icon, name, formControl, ...props }, ref) => {
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
                      "w-full justify-start border-0 shadow-none hover:ring-2 hover:ring-primary hover:bg-background bg-transparent",
                      "data-[state=open]:ring-2 data-[state=open]:ring-primary data-[state=open]:bg-muted",
                      props.className
                    )}
                    style={props.style}
                  >
                    {field.value &&
                    field.value.filter((item: any) => item.value !== undefined)
                      .length > 0 ? (
                      <div className='flex items-center gap-2 flex-wrap'>
                        {field.value
                          .filter((item: any) => item.value !== undefined)
                          .map((option: OptionProps, idx: number) => (
                            <span
                              key={idx}
                              className='text-xs bg-primary rounded-full size-7 flex items-center justify-center text-white'
                            >
                              {option.acronym || option.label}
                            </span>
                          ))}
                      </div>
                    ) : (
                      <span className='text-muted-foreground'>
                        {icon || "Select options"}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className='w-[200px] p-0'
                  align='start'
                  ref={ref}
                >
                  <OptionList
                    onChange={(selectedOptions) =>
                      field.onChange(selectedOptions)
                    }
                    options={options}
                    checkedState={
                      field.value?.filter(
                        (item: any) => item.value !== undefined
                      ) || []
                    }
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

MultiSelect.displayName = "MultiSelect";

function OptionList({
  onChange,
  options,
  checkedState,
}: {
  onChange: (item: OptionProps[] | undefined) => void;
  options: OptionProps[];
  checkedState: OptionProps[];
}) {
  //   const [selected, setSelected] = React.useState(checkedState);

  return (
    <Command>
      <CommandInput placeholder={`Filtering...`} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup>
          {options.map((item) => {
            const isSelected = checkedState.some(
              (selectedItem) =>
                selectedItem.id.toString() === item.id.toString()
            );

            return (
              <label key={item.id} htmlFor={item.value}>
                <CommandItem className='flex items-center justify-between cursor-pointer'>
                  <div className='flex items-center gap-2'>
                    <span className='text-xs bg-primary rounded-full size-7 flex items-center justify-center text-white'>
                      {item.acronym}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  <Checkbox
                    id={item.value}
                    checked={isSelected}
                    defaultChecked={isSelected}
                    onClick={() => {
                      if (isSelected) {
                        onChange(
                          checkedState.filter(
                            (selectedItem) =>
                              selectedItem.id.toString() !== item.id.toString()
                          )
                        );
                      } else {
                        onChange([...checkedState, item]);
                      }
                    }}
                    className='border-0 shadow-none data-[state=checked]:bg-transparent data-[state=checked]:text-secondary-foreground'
                  />
                </CommandItem>
              </label>
            );
          })}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup>
          <div className='flex items-center justify-between'>
            {checkedState.length > 0 && (
              <>
                <CommandItem
                  onSelect={() => {
                    onChange([]);
                  }}
                  className='w-full flex items-center justify-center'
                >
                  Clear
                </CommandItem>
                <Separator
                  orientation='vertical'
                  className='flex min-h-6 h-full'
                />
              </>
            )}
            <PopoverClose className='w-full'>
              <CommandItem className='w-full flex items-center justify-center'>
                Close
              </CommandItem>
            </PopoverClose>
          </div>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
