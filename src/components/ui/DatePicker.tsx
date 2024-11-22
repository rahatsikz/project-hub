"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
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
};

export function DatePicker({ label, formController, name }: DatePickerProps) {
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
                    "w-full justify-start text-left font-normal border-0 shadow-none hover:ring-2 hover:ring-primary hover:bg-background max-w-36",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className='mr-1 h-4 w-4' />
                  {field.value ? (
                    <span>{format(field.value, "MMM dd, yyyy")}</span>
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
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
