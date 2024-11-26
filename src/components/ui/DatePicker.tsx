"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, CalendarPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Control } from "react-hook-form";

type DatePickerProps = {
  label?: string;
  formController: Control<any>;
  name: string;
  ref?: React.Ref<any>;
};

export function DatePicker({
  label,
  formController,
  name,
  ref,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <FormField
      control={formController}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          {label ? <FormLabel>{label}</FormLabel> : null}
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal border-0 shadow-none hover:ring-2 hover:ring-primary hover:bg-background max-w-36 bg-transparent",
                    "data-[state=open]:ring-2 data-[state=open]:ring-primary data-[state=open]:bg-muted",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    <span className='inline-flex gap-2 items-center'>
                      <CalendarIcon className='mr-1 size-4' />{" "}
                      {format(field.value, "MMM dd, yyyy")}
                    </span>
                  ) : (
                    <CalendarPlus className='size-4' />
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' ref={ref}>
              <Calendar
                mode='single'
                defaultMonth={field.value}
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date);
                  setIsOpen(false);
                }}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
